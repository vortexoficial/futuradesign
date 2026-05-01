(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  var container, camera, scene, renderer, uniforms;
  var rtTexture, rtTexture2;
  var newmouse = { x: 0, y: 0 };
  var divisor = 0.08;

  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  loader.load(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
    function (tex) {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.minFilter = THREE.LinearFilter;
      init(tex);
      requestAnimationFrame(animate);
    }
  );

  function init(texture) {
    container = document.getElementById('blob-bg');
    if (!container) return;

    camera = new THREE.Camera();
    camera.position.z = 1;
    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    rtTexture  = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);
    rtTexture2 = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);

    uniforms = {
      u_time:       { type: 'f',  value: 1.0 },
      u_resolution: { type: 'v2', value: new THREE.Vector2() },
      u_noise:      { type: 't',  value: texture },
      u_buffer:     { type: 't',  value: rtTexture.texture },
      u_mouse:      { type: 'v2', value: new THREE.Vector2() },
      u_renderpass: { type: 'b',  value: false }
    };

    var material = new THREE.ShaderMaterial({
      uniforms:         uniforms,
      vertexShader:     document.getElementById('blobVertexShader').textContent,
      fragmentShader:   document.getElementById('blobFragmentShader').textContent
    });
    material.extensions.derivatives = true;

    scene.add(new THREE.Mesh(geometry, material));

    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener('pointermove', function (e) {
      var ratio = window.innerHeight / window.innerWidth;
      newmouse.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
      newmouse.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
    });
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    rtTexture  = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);
    rtTexture2 = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);
  }

  function animate(delta) {
    requestAnimationFrame(animate);
    render(delta);
  }

  function renderTexture() {
    var odims = uniforms.u_resolution.value.clone();
    uniforms.u_resolution.value.x = window.innerWidth * 0.2;
    uniforms.u_resolution.value.y = window.innerHeight * 0.2;

    uniforms.u_buffer.value    = rtTexture2.texture;
    uniforms.u_renderpass.value = true;

    renderer.setRenderTarget(rtTexture);
    renderer.render(scene, camera, rtTexture, true);

    var buf = rtTexture;
    rtTexture  = rtTexture2;
    rtTexture2 = buf;

    uniforms.u_buffer.value     = rtTexture.texture;
    uniforms.u_resolution.value = odims;
    uniforms.u_renderpass.value = false;
    renderer.setRenderTarget(null);
  }

  function render(delta) {
    uniforms.u_mouse.value.x += (newmouse.x - uniforms.u_mouse.value.x) * divisor;
    uniforms.u_mouse.value.y += (newmouse.y - uniforms.u_mouse.value.y) * divisor;
    uniforms.u_time.value = delta * 0.0005;
    renderer.render(scene, camera);
    renderTexture();
  }
})();
