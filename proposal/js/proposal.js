// proposal.js
// Comportamentos da página de proposta:
// - Menu mobile
// - Troca de logo conforme tema ativo
// - Animação sutil on-scroll
// - Accordion FAQ
// - Calculadora de preços
// - Download PDF (window.print)

(function () {
  const THEME_KEY = 'theme';

  // =========================
  // Utilitários
  // =========================
  function formatBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  }

  // =========================
  // Tema + logos
  // =========================
  function updateLogos() {
    const isDark = document.documentElement.classList.contains('dark');
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
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}

    updateLogos();
  }

  // =========================
  // Menu mobile
  // =========================
  function initMobileMenu() {
    const openBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!openBtn || !closeBtn || !overlay) return;

    function openMenu() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // =========================
  // Animação on-scroll
  // =========================
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

  // =========================
  // Accordion FAQ (apenas 1 aberto por vez)
  // =========================
  function initFaqAccordion() {
    const faq = document.getElementById('faq-list');
    if (!faq) return;

    const items = Array.from(faq.querySelectorAll('details'));
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  // =========================
  // Calculadora de preços
  // =========================
  function initPricingCalculator() {
    const corporateRadios = Array.from(document.querySelectorAll('input[name="site-corporate"]'));
    const kidsRadios = Array.from(document.querySelectorAll('input[name="site-kids"]'));
    const adsChecks = Array.from(document.querySelectorAll('.ads-platform'));

    const oneTimeEl = document.getElementById('summary-onetime');
    const monthlyEl = document.getElementById('summary-monthly');

    if (!corporateRadios.length || !kidsRadios.length || !adsChecks.length || !oneTimeEl || !monthlyEl) return;

    function selectedRadioValue(radios) {
      const selected = radios.find((item) => item.checked);
      return selected ? Number(selected.value) : 0;
    }

    function selectedAdsTotal(checks) {
      return checks.reduce((sum, item) => (item.checked ? sum + Number(item.value) : sum), 0);
    }

    function updateTotals() {
      const corporateSite = selectedRadioValue(corporateRadios);
      const kidsSite = selectedRadioValue(kidsRadios);
      const oneTimeTotal = corporateSite + kidsSite;

      const adsMonthly = selectedAdsTotal(adsChecks);

      oneTimeEl.textContent = `Investimento - Único: ${formatBRL(oneTimeTotal)}`;
      monthlyEl.textContent = `Gestão mensal: ${formatBRL(adsMonthly)} + Redes sociais (conforme tabela de criativos)`;
    }

    [...corporateRadios, ...kidsRadios].forEach((radio) => {
      radio.addEventListener('change', updateTotals);
    });

    adsChecks.forEach((check) => {
      check.addEventListener('change', updateTotals);
    });

    updateTotals();
  }

  // =========================
  // PDF / Print
  // =========================
  function initPrintButton() {
    const button = document.getElementById('download-pdf-btn');
    if (!button) return;

    button.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================
  // Init geral
  // =========================
  document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();
    initMobileMenu();
    initRevealOnScroll();
    initFaqAccordion();
    initPricingCalculator();
    initPrintButton();

    const year = document.getElementById('year');
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  });
})();
