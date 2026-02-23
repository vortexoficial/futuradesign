// script.js

// 0. FUNÇÃO PARA TROCAR LOGOS (LIGHT/DARK)
function updateLogos() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Caminhos das logos da Futura Design
    // Certifique-se de ter uma versão preta (logop.png) e uma branca (logob.png) na pasta img/
    const logoLight = "img/logop.png"; // Logo PRETA (Para fundo claro)
    const logoDark  = "img/logob.png"; // Logo BRANCA (Para fundo escuro)
    
    const targetLogo = isDark ? logoDark : logoLight;
    
    const logoElements = document.querySelectorAll('.theme-logo');
    logoElements.forEach(img => {
        img.src = targetLogo;
    });
}

// CARROSSEL (MARQUEE) DE SITES
function initSitesMarquee() {
    const source = document.getElementById('sites-track-source');
    if (!source) return;

    const cards = Array.from(source.querySelectorAll('.site-card'));
    if (cards.length === 0) return;

    const topTrack = document.querySelector('[data-marquee-track="sites-top"]');
    const bottomTrack = document.querySelector('[data-marquee-track="sites-bottom"]');
    if (!topTrack || !bottomTrack) return;

    const topItems = [];
    const bottomItems = [];

    // Alterna itens para manter as 2 linhas com quantidade parecida
    cards.forEach((card, index) => {
        (index % 2 === 0 ? topItems : bottomItems).push(card);
    });

    const fillTrack = (trackEl, items) => {
        trackEl.innerHTML = '';

        const speed = Number(trackEl.dataset.marqueeSpeed);
        if (!Number.isNaN(speed) && speed > 0) {
            trackEl.style.setProperty('--marquee-duration', `${speed}s`);
        }

        const appendClones = () => {
            items.forEach((item) => {
                const clone = item.cloneNode(true);
                clone.classList.add('shrink-0');
                trackEl.appendChild(clone);
            });
        };

        // Duplica o conteúdo para o loop ficar contínuo (CSS anima até -50%)
        appendClones();
        appendClones();
    };

    fillTrack(topTrack, topItems.length ? topItems : cards);
    fillTrack(bottomTrack, bottomItems.length ? bottomItems : cards);
}

// FAQ (Acordeão): ao abrir um item, fecha os outros
function initFaqAccordion() {
    const faqSection = document.getElementById('faq');
    if (!faqSection) return;

    const items = Array.from(faqSection.querySelectorAll('details.faq-item'));
    if (items.length < 2) return;

    items.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;

            items.forEach((other) => {
                if (other !== item && other.open) {
                    other.open = false;
                }
            });
        });
    });
}

// 2. INICIALIZAÇÃO
(function() {
    try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {}
})();

window.addEventListener('load', () => {
    updateLogos();
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
            });
        }, 1500); 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    updateLogos();

    // 2.5. CARROSSEL DE SITES
    initSitesMarquee();

    // 2.6. FAQ (abrir um, fechar o outro)
    initFaqAccordion();

    // 3. MENU MOBILE
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    
    if (hamburgerBtn && closeMenuBtn && mobileMenu) {
        const toggleMenu = (show) => {
            if (show) {
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            }
        };
        hamburgerBtn.addEventListener('click', () => toggleMenu(true));
        closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    }

    // 4. FADE IN (Observer para animar seções ao rolar)
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: parar de observar após aparecer a primeira vez
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 }); // Gatilho um pouco mais tarde para suavidade
    sections.forEach(section => observer.observe(section));

    // 5. DARK MODE TOGGLE
    const themeBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');

    const updateIcon = () => {
        if (document.documentElement.classList.contains('dark')) {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        updateLogos(); // Chama update logos sempre que trocar ícone/tema
    };

    if (themeBtn) {
        updateIcon();
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            updateIcon();
        });
    }
});