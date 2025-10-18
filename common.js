(function () {
  'use strict';

  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
  const VANTA_URL = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
  const PLACEHOLDER_BG_HEX = 0x40404;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="' + src + '"]')) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  function destroyVanta() {
    if (window.__VANTA_NET_EFFECT && typeof window.__VANTA_NET_EFFECT.destroy === 'function') {
      try { window.__VANTA_NET_EFFECT.destroy(); } catch (e) { /* ignore */ }
      window.__VANTA_NET_EFFECT = null;
    }
  }

  function initVanta() {
    const targetEl = document.querySelector('#vanta-bg') || document.body;
    if (!targetEl) return;

    // If effect already exists on same element do nothing
    if (window.__VANTA_NET_EFFECT && window.__VANTA_NET_EFFECT.el === targetEl) return;

    // Destroy previous effect (if any)
    destroyVanta();

    if (!window.VANTA || !window.VANTA.NET) {
      console.warn('Vanta not available yet.');
      return;
    }

    window.__VANTA_NET_EFFECT = window.VANTA.NET({
      el: targetEl,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: PLACEHOLDER_BG_HEX
    });
  }

  // Public helpers
  window.setVantaBackground = initVanta;
  window.destroyVantaBackground = destroyVanta;

  // Load libs then init
  document.addEventListener('DOMContentLoaded', function () {
    loadScript(THREE_URL)
      .then(() => loadScript(VANTA_URL))
      .then(initVanta)
      .catch(() => { /* fail silently if CDN blocked */ });
  });

  // Clean up before unload
  window.addEventListener('beforeunload', destroyVanta);
})();