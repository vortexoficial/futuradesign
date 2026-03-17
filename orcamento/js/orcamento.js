// orcamento.js
// Comportamentos da proposta pronta:
// - aplica tema atual do projeto e atualiza logos
// - controla menu mobile e animacoes suaves de entrada
// - controla interacoes principais da proposta

(function () {
  const THEME_KEY = 'theme';

  function isDarkTheme() {
    return document.documentElement.classList.contains('dark');
  }

  function updateLogos() {
    const isDark = isDarkTheme();
    const targetRelative = isDark ? '../img/logob.webp' : '../img/logop.webp';
    const targetAbsolute = isDark ? '/img/logob.webp' : '/img/logop.webp';

    document.querySelectorAll('.theme-logo').forEach((img) => {
      img.onerror = () => {
        img.onerror = null;
        img.src = targetAbsolute;
      };
      img.src = targetRelative;
    });
  }

  function applyStoredTheme() {
    try {
      const theme = localStorage.getItem(THEME_KEY);
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}

    updateLogos();
  }

  function updateThemeToggleIcon() {
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');
    if (!sunIcon || !moonIcon) return;

    if (isDarkTheme()) {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    updateThemeToggleIcon();

    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem(THEME_KEY, isDarkTheme() ? 'dark' : 'light');
      } catch (e) {}
      updateLogos();
      updateThemeToggleIcon();
    });
  }

  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      updateLogos();
      setTimeout(() => {
        loader.classList.add('loader-hidden');
        loader.addEventListener(
          'transitionend',
          () => {
            loader.style.display = 'none';
          },
          { once: true }
        );
      }, 1500);
    });
  }

  function initMobileMenu() {
    const openBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!openBtn || !closeBtn || !overlay) return;

    function openMenu() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  function initRevealOnScroll() {
    const blocks = document.querySelectorAll('.reveal-on-scroll');
    if (!blocks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    blocks.forEach((block) => observer.observe(block));
  }

  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const statusEl = document.getElementById('newsletter-status');
    const submitBtn = form?.querySelector('button[type="submit"]');

    if (!form || !emailInput || !statusEl || !submitBtn) return;

    const setStatus = (text, tone) => {
      statusEl.textContent = text || '';
      statusEl.classList.remove('is-success', 'is-error');
      if (tone === 'success') {
        statusEl.classList.add('is-success');
      }
      if (tone === 'error') {
        statusEl.classList.add('is-error');
      }
    };

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const endpoint = String(form.dataset.endpoint || '').trim();
      if (!endpoint) {
        setStatus('Configuracao pendente: informe a URL do Google Apps Script no site.', 'error');
        return;
      }

      const email = String(emailInput.value || '').trim();
      if (!validateEmail(email)) {
        setStatus('Digite um e-mail valido.', 'error');
        emailInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      setStatus('Enviando…');

      const payload = {
        email,
        page: window.location.href,
        lang: document.documentElement.lang || 'pt-BR',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        setStatus('Cadastro realizado. Obrigado!', 'success');
        form.reset();
      } catch (e) {
        setStatus('Nao foi possivel cadastrar agora. Tente novamente.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();
    initThemeToggle();
    initMobileMenu();
    initRevealOnScroll();
    initNewsletterForm();

    const year = document.getElementById('year');
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  });

  initLoader();
})();