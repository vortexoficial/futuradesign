(function () {
  'use strict';

  if (window.FuturaAudioPlayer) return;

  window.futuraMusicPlaylist = window.futuraMusicPlaylist || [
    {
      title: 'Trilha 01',
      file: 'assets/audio/audio1.mp3'
    },
    {
      title: 'Trilha Futura 01',
      file: 'assets/audio/trilha-01.mp3'
    },
    {
      title: 'Trilha Futura 02',
      file: 'assets/audio/trilha-02.mp3'
    }
  ];

  var config = Object.assign(
    {
      toastVisibleMs: 4800
    },
    window.futuraAudioPlayerConfig || {}
  );

  var STORAGE_KEY = 'futuraAudioPlayerState:v3';
  var scriptUrl = getCurrentScriptUrl();
  var playlist = Array.isArray(window.futuraMusicPlaylist) ? window.futuraMusicPlaylist : [];
  var state = readState();
  var shell;
  var player;
  var audio;
  var playBtn;
  var toast;
  var saveTimer = 0;
  var hasLoadedAudio = false;

  function icon(name) {
    if (name === 'pause') {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="4.5" width="4" height="15" rx="1"></rect><rect x="13.5" y="4.5" width="4" height="15" rx="1"></rect></svg>';
    }

    return '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="8 5 18 12 8 19 8 5"></polygon></svg>';
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getCurrentScriptUrl() {
    var current = document.currentScript;
    if (current && current.src) return current.src;

    var scripts = document.querySelectorAll('script[src*="futura-audio-player.js"]');
    var script = scripts[scripts.length - 1];
    return script && script.src ? script.src : window.location.href;
  }

  function getProjectRootUrl() {
    try {
      return new URL('../../', scriptUrl).href;
    } catch (error) {
      return window.location.href;
    }
  }

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {}
  }

  function normalizeIndex(index) {
    if (!playlist.length) return 0;
    var normalized = index % playlist.length;
    return normalized < 0 ? normalized + playlist.length : normalized;
  }

  function getTrack() {
    return playlist[normalizeIndex(state.index)] || null;
  }

  function readState() {
    var fallback = {
      index: 0,
      currentTime: 0,
      volume: 0.72,
      wasPlaying: false
    };

    try {
      var saved = JSON.parse(safeStorageGet(STORAGE_KEY) || '{}');
      return {
        index: Number.isFinite(saved.index) ? saved.index : fallback.index,
        currentTime: Number.isFinite(saved.currentTime) ? saved.currentTime : fallback.currentTime,
        volume: Number.isFinite(saved.volume) ? clamp(saved.volume, 0, 1) : fallback.volume,
        wasPlaying: Boolean(saved.wasPlaying)
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveState(immediate) {
    var persist = function () {
      var payload = {
        index: state.index,
        currentTime: audio && Number.isFinite(audio.currentTime) ? audio.currentTime : state.currentTime,
        volume: audio ? audio.volume : state.volume,
        wasPlaying: audio ? !audio.paused && !audio.ended : state.wasPlaying
      };

      safeStorageSet(STORAGE_KEY, JSON.stringify(payload));
      saveTimer = 0;
    };

    if (immediate) {
      if (saveTimer) window.clearTimeout(saveTimer);
      persist();
      return;
    }

    if (!saveTimer) {
      saveTimer = window.setTimeout(persist, 700);
    }
  }

  function resolveTrackFile(file) {
    if (!file) return '';

    if (/^(https?:)?\/\//i.test(file) || /^(data|blob):/i.test(file)) {
      return file;
    }

    if (file.charAt(0) === '/') {
      return new URL(String(file).replace(/^\/+/, ''), getProjectRootUrl()).href;
    }

    return new URL(String(file).replace(/^\.?\//, ''), getProjectRootUrl()).href;
  }

  function updateButtonTitle(text) {
    if (!playBtn) return;
    var track = getTrack();
    playBtn.setAttribute('title', text || (track && track.title) || 'Player de música');
  }

  function updatePlayButton(isPlaying) {
    if (!playBtn || !player) return;
    playBtn.innerHTML = isPlaying ? icon('pause') : icon('play');
    playBtn.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproduzir música');
    playBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    player.classList.toggle('is-playing', isPlaying);
  }

  function ensureAudioSource() {
    var track = getTrack();
    if (!track) return false;

    var src = resolveTrackFile(track.file);
    if (!src) return false;

    if (audio.getAttribute('src') !== src) {
      audio.setAttribute('src', src);
      hasLoadedAudio = true;

      if (state.currentTime > 0) {
        audio.addEventListener(
          'loadedmetadata',
          function restoreTime() {
            try {
              audio.currentTime = Math.min(state.currentTime, audio.duration || state.currentTime);
            } catch (error) {}
          },
          { once: true }
        );
      }
    }

    return true;
  }

  function playCurrentTrack() {
    if (!playlist.length || !ensureAudioSource()) {
      updateButtonTitle('Adicione arquivos MP3');
      return;
    }

    audio.volume = state.volume;
    audio.loop = false;

    var promise = audio.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(function () {
        state.wasPlaying = false;
        updatePlayButton(false);
        saveState(true);
      });
    }
  }

  function pauseCurrentTrack() {
    audio.pause();
    state.currentTime = audio.currentTime || state.currentTime;
    state.wasPlaying = false;
    updatePlayButton(false);
    saveState(true);
  }

  function showToast() {
    if (!toast) return;

    window.setTimeout(function () {
      toast.classList.add('is-visible');
    }, 220);

    window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, config.toastVisibleMs);
  }

  function waitForLoaderThenReveal() {
    var loader = document.getElementById('loader');
    var revealed = false;

    function reveal() {
      if (revealed || !shell) return;
      revealed = true;
      shell.classList.add('is-visible');
      showToast();
    }

    if (!loader) {
      window.setTimeout(reveal, 420);
      return;
    }

    var computed = window.getComputedStyle(loader);
    if (computed.display === 'none' || computed.visibility === 'hidden' || loader.classList.contains('loader-hidden')) {
      window.setTimeout(reveal, 360);
      return;
    }

    loader.addEventListener(
      'transitionend',
      function () {
        window.setTimeout(reveal, 180);
      },
      { once: true }
    );

    var observer = new MutationObserver(function () {
      var style = window.getComputedStyle(loader);
      if (style.display === 'none' || style.visibility === 'hidden' || loader.classList.contains('loader-hidden')) {
        observer.disconnect();
        window.setTimeout(reveal, 220);
      }
    });

    observer.observe(loader, { attributes: true, attributeFilter: ['class', 'style'] });

    window.addEventListener(
      'load',
      function () {
        window.setTimeout(reveal, 2600);
      },
      { once: true }
    );

    window.setTimeout(reveal, 3200);
  }

  function isElementVisible(element) {
    if (!element) return false;
    var rect = element.getBoundingClientRect();
    var style = window.getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  }

  function updateFloatingOffsets() {
    if (!shell) return;

    var sideFloating = Array.prototype.some.call(
      document.querySelectorAll('#theme-toggle-btn, .theme-toggle-btn, #language-toggle-btn, .theme-btn'),
      isElementVisible
    );
    var bottomBar = Array.prototype.some.call(
      document.querySelectorAll('#sticky-accept-cta, [data-futura-audio-bottom-bar]'),
      isElementVisible
    );

    shell.dataset.sideFloating = sideFloating ? 'true' : 'false';
    shell.dataset.bottomBar = bottomBar ? 'true' : 'false';
  }

  function buildPlayer() {
    if (!document.body || document.getElementById('futura-audio-shell')) return;

    shell = document.createElement('div');
    shell.id = 'futura-audio-shell';
    shell.className = 'futura-audio-shell';
    shell.innerHTML = [
      '<div class="futura-audio-toast" role="status" aria-live="polite">Ouça música enquanto navega</div>',
      '<section class="futura-audio-player" aria-label="Player de música Futura Design">',
      '<audio class="futura-audio-element" preload="none"></audio>',
      '<button class="futura-audio-button futura-audio-button--play" type="button" aria-label="Reproduzir música" aria-pressed="false">' + icon('play') + '</button>',
      '</section>'
    ].join('');

    document.body.appendChild(shell);

    audio = shell.querySelector('audio');
    player = shell.querySelector('.futura-audio-player');
    playBtn = shell.querySelector('.futura-audio-button--play');
    toast = shell.querySelector('.futura-audio-toast');

    state.index = normalizeIndex(state.index);
    audio.preload = 'none';
    audio.volume = state.volume;
    audio.loop = false;
    updateButtonTitle();

    if (!playlist.length) {
      playBtn.disabled = true;
      updateButtonTitle('Adicione arquivos MP3');
    }

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        playCurrentTrack();
      } else {
        pauseCurrentTrack();
      }
    });

    audio.addEventListener('play', function () {
      state.wasPlaying = true;
      updatePlayButton(true);
      saveState(true);
    });

    audio.addEventListener('pause', function () {
      state.currentTime = audio.currentTime || state.currentTime;
      state.wasPlaying = false;
      updatePlayButton(false);
      saveState(true);
    });

    audio.addEventListener('timeupdate', function () {
      state.currentTime = audio.currentTime || 0;
      saveState(false);
    });

    audio.addEventListener('ended', function () {
      state.currentTime = 0;
      state.wasPlaying = false;
      try {
        audio.currentTime = 0;
      } catch (error) {}
      updatePlayButton(false);
      saveState(true);
    });

    audio.addEventListener('error', function () {
      updateButtonTitle('Arquivo MP3 não encontrado');
      updatePlayButton(false);
      state.wasPlaying = false;
      saveState(true);
    });

    window.addEventListener('beforeunload', function () {
      saveState(true);
    });

    updateFloatingOffsets();
    window.addEventListener('resize', updateFloatingOffsets, { passive: true });
    window.setTimeout(updateFloatingOffsets, 700);
    waitForLoaderThenReveal();
  }

  function init() {
    buildPlayer();
  }

  window.FuturaAudioPlayer = {
    init: init,
    play: playCurrentTrack,
    pause: pauseCurrentTrack
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
