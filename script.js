// script.js

// =========================
// i18n (pt-BR <-> en-US)
// - Não altera o HTML original: só traduz em runtime e consegue reverter.
// - Mantém tema/menu/animacoes intactos.
// =========================

const I18N_STORAGE_KEY = 'lang';
const LANG_PT_BR = 'pt-BR';
const LANG_EN_US = 'en-US';

function normalizeI18nKey(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim();
}

// Dicionário: chaves normalizadas em pt-BR -> en-US
// Obs: se um texto não estiver aqui, ele permanece em pt-BR.
const PT_TO_EN = {
    // Navegação / geral
    'Início': 'Home',
    'Home': 'Home',
    'Equipe': 'Team',
    'Serviços': 'Services',
    'Como Funciona': 'How It Works',
    'Como funciona': 'How it works',
    'Portfólio': 'Portfolio',
    'Dúvidas': 'FAQ',
    'Contato': 'Contact',
    'Legal': 'Legal',
    'Privacidade': 'Privacy',
    'Cookies': 'Cookies',
    'Termos de Uso': 'Terms of Use',
    'Newsletter': 'Newsletter',
    'Sitemap': 'Sitemap',

    // Botões / CTAs
    'Solicitar diagnóstico': 'Request a diagnostic',
    'Falar com a equipe': 'Talk to the team',
    'FALAR COM A EQUIPE': 'TALK TO THE TEAM',
    'FALAR NO WHATSAPP': 'CHAT ON WHATSAPP',
    'VER COMO FUNCIONA': 'SEE HOW IT WORKS',
    'VER O QUE ENTREGAMOS': 'SEE WHAT WE DELIVER',
    'Receber insights': 'Get insights',
    'Ver site': 'View site',
    'Ver trabalhos no Instagram': 'See work on Instagram',

    // Hero
    'Design e estratégia': 'Design and strategy',
    // O HTML do hero tem um <wbr> entre essas partes; aqui deixamos a 1ª parte mais longa
    // para evitar quebrar linha deixando "to turn" sozinho.
    'para transformar': 'to turn visits into',
    'visitas em clientes': 'customers',
    'Branding, sites, lojas virtuais, social media e criativos para anúncios, estratégias para criar autoridade, passar segurança e conquistar':
        'Branding, websites, online stores, social media, and ad creatives. Strategies to build authority, inspire confidence, and attract',
    'novos clientes': 'new customers',

    // Seções / headlines
    'Crescer com tranquilidade pede': 'Growing with peace of mind takes',
    'método': 'method',
    'Onde muita gente se perde, a gente': 'Where most people get lost, we',
    'organiza': 'organize',
    'Uma equipe completa': 'A full team',
    'Uma equipe completa para': 'A full team to',
    'planejar e entregar': 'plan and deliver',
    'Serviços com foco em': 'Services focused on',
    'clareza e resultado': 'clarity and results',
    'clareza': 'clarity',
    'básico bem feito': 'the basics done right',
    'processo': 'process',
    'frequentes': 'frequently asked',
    'Como funciona na prática': 'How it works in practice',
    'O que você pode esperar do': 'What you can expect from the',
    'processo': 'process',

    // Prova / cards
    'Projetos entregues': 'Projects delivered',
    'Satisfação': 'Satisfaction',
    'Experiência': 'Experience',
    '+7 anos': '+7 years',
    'anos': ' years',
    'Segmentos': 'Industries',
    'Mensagem clara': 'Clear message',
    'Site leve e organizado': 'Fast, well-structured site',
    'Medição de resultados': 'Results tracking',
    'Processo direto': 'Straightforward process',

    'Seu cliente entende rápido o que você faz, para quem é e como entrar em contato.':
        'Your customer quickly understands what you do, who it is for, and how to contact you.',
    'Carrega rápido, layout responsivo (computador e celular) e guia a pessoa até a ação (mensagem, orçamento ou compra).':
        'Loads fast, works great on desktop and mobile, and guides people to take action (message, quote, or purchase).',
    'Você acompanha o que acontece: visitas, cliques, mensagens e pedidos, sem mistério.':
        'You track what happens: visits, clicks, messages, and orders with clear reporting.',
    'Etapas claras, prazos combinados e comunicação objetiva para você não ficar no escuro.':
        'Clear steps, agreed timelines, and straightforward communication so you’re never left in the dark.',

    'A FUTURA DESIGN ajuda você a organizar a base: mensagem clara, visual profissional, site bem construído e medição de resultados. Assim, fica mais fácil atrair o público certo e transformar interesse em':
        'FUTURA DESIGN helps you organize the foundation: clear messaging, professional visuals, a well-built website, and results tracking. That makes it easier to attract the right audience and turn interest into',
    'mensagens, pedidos e vendas': 'messages, orders, and sales',

    // Problemas
    'Quando a mensagem não está clara e o site não ajuda, o cliente até visita, mas não entende, não confia e não entra em contato.':
        'When the message is not clear and the site does not help, people may visit. However, they do not understand, they do not trust, and they do not reach out.',
    'Muita visita, pouca mensagem': 'Lots of visits, few messages',
    'A pessoa entra, mas não entende o que fazer. Ajustamos texto, páginas e chamadas para ação.':
        'People arrive but don’t know what to do. We refine copy, pages, and calls to action.',
    'Site bonito, mas confuso': 'Nice-looking site, but confusing',
    'Deixamos a navegação simples, com prova, informações essenciais e um caminho claro para contato.':
        'We simplify navigation, add proof, keep only what matters, and create a clear path to contact.',
    'Falta credibilidade': 'Lack of credibility',
    'Organizamos a identidade e a comunicação para transmitir segurança e profissionalismo.':
        'We organize your identity and messaging to convey confidence and professionalism.',
    'Sem clareza de resultado': 'No clarity on results',
    'Configuramos a medição para você enxergar o que gera contatos e vendas.':
        'We set up tracking so you can see what generates contacts and sales.',

    // Quem somos
    'Design, desenvolvimento e estratégia juntos, com foco no que o seu cliente precisa entender para confiar e tomar uma decisão.':
        'Design, development, and strategy together. Focused on what your customer needs to understand to trust and make a decision.',
    'Desenvolvimento completo': 'Full-stack development',
    'Sites e sistemas bem feitos, com atenção a velocidade, segurança e estabilidade.':
        'Well-built websites and systems, with attention to speed, security, and stability.',
    'Marca e experiência': 'Brand and experience',
    'Visual profissional e organização de informação para deixar tudo simples de entender.':
        'Professional visuals and organized information that’s easy to understand.',
    'Sites e lojas': 'Websites and stores',
    'Experiências rápidas, organizadas e responsivas para transformar visitas em mensagens e pedidos.':
        'Fast, organized, responsive experiences that turn visits into messages and orders.',
    'Conteúdo e anúncios': 'Content and ads',
    'Peças e campanhas com objetivo claro e acompanhamento de resultado.':
        'Assets and campaigns with clear goals and performance tracking.',

    // Serviços
    'Serviços com foco em clareza e resultado': 'Services focused on clarity and results',
    'A escolha que faz sentido agora: melhorar a marca, arrumar o site/loja e organizar a divulgação para gerar contatos e vendas.':
        'The right move right now: strengthen your brand, fix your site/store, and organize your marketing to generate leads and sales.',
    'Marca e identidade': 'Brand and identity',
    'Visual profissional e mensagem clara para aumentar confiança e facilitar a decisão do cliente.':
        'Professional visuals and clear messaging to build trust and make decisions easier.',
    'Quando faz sentido': 'When it makes sense',
    'O que entregamos': 'What we deliver',
    'O que você ganha': 'What you get',

    'Quando a marca parece “genérica”, a comunicação confunde e o cliente não entende o valor.':
        'When the brand feels “generic,” communication gets confusing and customers don’t see the value.',
    'Mensagem e diferenciais (o que te separa do comum)':
        'Messaging and differentiators (what sets you apart)',
    'Identidade visual e guia simples de uso':
        'Visual identity and a simple usage guide',
    'Modelos para redes sociais e anúncios':
        'Templates for social media and ads',
    'Mais confiança, menos dúvida do cliente e uma apresentação coerente em todos os canais.':
        'More trust, fewer doubts, and a consistent presentation across all channels.',

    'Sites e lojas virtuais': 'Websites and online stores',
    'Um site simples de navegar, que explica bem e leva a pessoa até a ação (mensagem, orçamento, compra, agendamento).':
        'A site that’s easy to navigate, explains clearly, and leads people to action (message, quote, purchase, booking).',
    'Quando o site é lento, confuso ou não traz contatos e pedidos.':
        'When the site is slow, confusing, or doesn’t generate inquiries and orders.',
    'Landing pages e sites institucionais': 'Landing pages and company websites',
    'Layout pensado para celular e computador': 'Layout designed for mobile and desktop',
    'SEO básico e medição de resultados': 'Basic SEO and results tracking',
    'Mais pedidos e mensagens, com uma base pronta para divulgação sem desperdício.':
        'More inquiries and messages, with a solid base for marketing without waste.',

    'Anúncios e criativos': 'Ads and creatives',
    'Peças para anúncios e redes sociais, com objetivo claro e medição para saber o que funciona.':
        'Ad and social assets with clear goals and tracking to know what works.',
    'Quando você anuncia, mas recebe contatos fracos, ou não sabe o que trouxe resultado.':
        'When you run ads but receive low-intent inquiries, or you do not know what generated results.',
    'Pacotes de criativos para anúncios e redes sociais': 'Creative packs for ads and social media',
    'Organização da oferta e da mensagem': 'Offer and message structure',
    'Ajustes com base em mensagens, pedidos e vendas': 'Optimization based on messages, orders, and sales',
    'Mais previsibilidade e decisões mais seguras, sem depender de achismo.':
        'More predictability and more confident decisions, without relying on assumptions.',

    // Método
    'Como trabalhamos: clareza, base e melhorias contínuas':
        'How we work: clarity, foundation, and continuous improvement',
    // Título do método é dividido em spans (parte normal + parte com gradiente)
    'Como trabalhamos: clareza, base e': 'How we work: clarity, foundation, and',
    'melhorias contínuas': 'continuous improvement',
    'Um processo simples, sem complicação, para sair do improviso e ganhar consistência.':
        'A simple process. No unnecessary complexity. So you can stop improvising and build consistency.',
    'Diagnóstico': 'Discovery',
    'Entendemos seu objetivo, seu público e o que seria um bom resultado para você.':
        'We understand your goal, your audience, and what a good outcome looks like for you.',
    'Estratégia': 'Strategy',
    'Organizamos a mensagem, as provas e o caminho do cliente até o contato ou compra.':
        'We organize the message, proof, and the path to contact or purchase.',
    'Construção': 'Build',
    'Construímos a página, o site ou a loja, com texto claro e medição de resultado.':
        'We build the page, site, or store with clear copy and tracking.',
    'Aquisição': 'Acquisition',
    'Criamos peças e organizamos a divulgação para atrair pessoas com interesse real.':
        'We create assets and organize distribution to attract people with real intent.',
    'Otimização': 'Optimization',
    'Melhoramos o que for necessário para aumentar pedidos e reduzir desperdício.':
        'We improve what’s needed to increase orders and reduce waste.',

    // Sites
    'Sites, lojas': 'Websites, stores',
    'e landing pages que desenvolvemos': 'and landing pages we’ve built',
    'Clique em um projeto para visitar o site.': 'Click a project to visit the website.',

    // Sites (descrições/categorias dos cards)
    'Engenharia e reformas': 'Construction and renovations',
    'Landing de lançamento (suplemento)': 'Product launch landing page (supplement)',
    'Loja de suplementos': 'Supplement store',
    'Plataforma de cursos de programação': 'Programming courses platform',
    'Decoração e produção de eventos': 'Event decor and production',
    'Agência de marketing e performance': 'Performance marketing agency',
    'Loja online de calçados e esportes': 'Online footwear and sports store',
    'Psicoterapia e mentoria': 'Psychotherapy and coaching',
    'Landing de suplemento': 'Supplement landing page',
    'Marketing estratégico e conteúdo': 'Strategic marketing and content',
    'Sistema de gestão condominial': 'Condo management system',
    'Gráfica e soluções criativas': 'Print shop and creative solutions',
    'Reformas e obras de alto padrão': 'High-end renovations and construction',
    'Evento para adolescentes': 'Event for teenagers',
    'Landing de energético natural': 'Natural energy drink landing page',
    'Ofertas de hardware e tecnologia': 'Hardware and tech deals',
    'Consultoria de amamentação': 'Breastfeeding consulting',
    'Instituto e projetos sociais': 'Institute and social projects',
    'Bebidas premium': 'Premium spirits',
    'Guia de proteção e informação': 'Protection and information guide',
    'Soluções metálicas e automação': 'Metalwork solutions and automation',
    'Comunidade e eventos de networking': 'Community and networking events',
    'Seguro DIT (proteção de renda)': 'Disability income insurance (income protection)',
    'Evento beneficente (yoga e zumba)': 'Charity event (yoga and zumba)',
    'Mercado autônomo para condomínios': 'Self-service market for condos',
    'Consultoria tributária': 'Tax consulting',
    'Mentoria de desenvolvimento pessoal': 'Personal development coaching',
    'Academia e aulas fitness': 'Gym and fitness classes',
    'Mini curso de renda extra': 'Mini course on extra income',
    'Gestão condominial e jurídico': 'Condo management and legal',
    'Curso online para amamentação': 'Online breastfeeding course',
    'Regularização e laudos técnicos': 'Compliance and technical reports',
    'Agência de turismo e excursões': 'Tour and travel agency',

    // Portfólio / depoimentos
    'Portfólio e projetos': 'Portfolio and projects',
    // Título do portfólio é dividido em spans (ex.: "Portfólio" + "e projetos")
    'e projetos': 'and projects',
    'Quando mostramos um trabalho, mostramos o que importou: objetivo, o que foi feito e como isso ajudou o negócio.':
        'When we show a project, we show what mattered: the goal, what was done, and how it helped the business.',
    'O que você pode esperar do processo': 'What you can expect from the process',
    'Sem promessas milagrosas. O foco é clareza, entrega bem feita e acompanhamento do que importa.':
        'No miracle promises. The focus is clarity, great execution, and tracking what matters.',
    'Clareza de prioridade': 'Clear priorities',
    'Você passa a ter um plano simples: o que será feito primeiro, o que fica para depois e por quê.':
        'You get a simple plan: what happens first, what comes later, and why.',
    'Caminho claro para contato': 'Clear path to contact',
    'Seu site e sua comunicação deixam de ser “enfeite” e passam a orientar a pessoa até a ação.':
        'Your site and messaging stop being “decoration” and start guiding people to action.',
    'Medição sem complicação': 'Tracking without complexity',
    'Você acompanha os números do básico bem feito: visitas, cliques e mensagens, e ajusta com segurança.':
        'You track the key numbers: visits, clicks, and messages. Then you optimize with confidence.',
    'Como funciona na prática': 'How it works in practice',
    'Você explica o objetivo e o que precisa melhorar.': 'You explain your goal and what needs improvement.',
    'A gente define o que será entregue e o prazo.': 'We define what will be delivered and the timeline.',
    'Você aprova o texto e o visual antes de ir para o ar.': 'You approve the copy and visuals before launch.',
    'Colocamos no ar com medição de resultado.': 'We launch it with performance tracking.',
    'Ajustamos com base no que as pessoas fazem no site.': 'We optimize based on what people do on the site.',
    'Você tem um próximo passo claro, sem confusão.': 'You have a clear next step. No confusion.',

    // FAQ
    'Dúvidas frequentes': 'Frequently asked questions',
    'Respostas diretas, com transparência e método.': 'Straight answers, with transparency and method.',
    'Dá para começar com um orçamento menor?': 'Can we start with a smaller budget?',
    'Sim. O segredo é priorizar. A gente define um escopo enxuto (site, landing, loja ou criativos) e entrega o que destrava resultado agora, com base sólida para evoluir.':
        'Yes. The key is prioritization. We define a lean scope (site, landing page, store, or creatives) and deliver what unlocks results now, with a solid base to grow.',
    'Vocês garantem número de vendas ou de contatos?': 'Do you guarantee sales or lead numbers?',
    'Não prometemos números. Cada negócio tem mercado, oferta e ticket diferentes. O que garantimos é processo e qualidade: mensagem clara, páginas bem estruturadas e medição para otimizar com segurança.':
        'We do not promise numbers. Every business has a different market, offer, and price point. What we guarantee is process and quality: clear messaging, well-structured pages, and tracking to optimize safely.',
    'Já tenho site/identidade. Dá para melhorar o que existe?': 'I already have a site/identity. Can you improve what I have?',
    'Dá, e muitas vezes é o caminho mais inteligente. A gente ajusta posicionamento, organização, copy e visual para deixar mais claro, mais confiável e mais fácil de converter.':
        'Yes. In many cases, it is the most effective path. We refine positioning, structure, copy, and visuals to make it clearer, more trustworthy, and easier to convert.',
    'Como funciona o diagnóstico?': 'How does the diagnostic work?',
    'Você explica seu objetivo e seu momento, a gente analisa o cenário e devolve um plano prático: o que fazer primeiro, por quê, e qual próximo passo faz sentido.':
        'You explain your goal and where you are now, we analyze the situation and come back with a practical plan: what to do first, why, and the next step that makes sense.',
    'Em quanto tempo entrega?': 'How long does delivery take?',
    'Depende do escopo e do material disponível. No diagnóstico, você recebe prazo, etapas e o que precisamos da sua parte. Sem surpresas.':
        'It depends on scope and what materials are available. In the diagnostic, you get the timeline, steps, and what we need from you. No surprises.',

    // Contato
    'Se você quer melhorar sua presença digital, comece pelo':
        'If you want to improve your digital presence, start with',
    'Fale com a gente e descreva seu objetivo. Você sai com um caminho claro: o que ajustar primeiro e o que pode esperar.':
        'Talk to us and describe your goal. You’ll leave with a clear path: what to fix first and what can wait.',
    'Sem compromisso • Retorno em horário comercial • Conversa direta ao ponto':
        'No commitment • Reply during business hours • Straight to the point',
    'O que você recebe no diagnóstico': 'What you get in the diagnostic',
    'Entendimento do seu objetivo e do seu público': 'Understanding of your goal and audience',
    'Recomendação do que fazer primeiro (e o que pode esperar)': 'Recommendation of what to do first (and what can wait)',
    'Proposta de escopo com prazo e prioridade': 'Scope proposal with timeline and priorities',
    'Orientação de conteúdo: o que precisa de você': 'Content guidance: what we need from you',
    'Próximo passo claro, sem pressão': 'Clear next step, no pressure',

    // Footer
    'Sem spam. Conteúdo direto ao ponto.': 'No spam. Straight to the point.',
    'Branding, sites, lojas virtuais e criativos para anúncios, com':
        'Branding, websites, online stores, and ad creatives, with',
    'clareza': 'clarity',
    'e execução premium.': 'and premium execution.',
    '© 2026 FUTURA DESIGN. Clareza, entrega e acompanhamento. Sem promessas irreais.':
        '© 2026 FUTURA DESIGN. Clarity, delivery, and tracking. No unrealistic promises.',

    // Atributos / acessibilidade
    'Abrir menu': 'Open menu',
    'Fechar menu': 'Close menu',
    'Carrossel de sites (linha 1)': 'Website carousel (row 1)',
    'Carrossel de sites (linha 2)': 'Website carousel (row 2)',
    'Seu e-mail': 'Your email',
    'Alternar tema claro/escuro': 'Toggle light/dark theme',
    'FUTURA Logo': 'FUTURA Logo',
    'FUTURA DESIGN Logo': 'FUTURA DESIGN Logo',
    'Imagem de apoio do hero': 'Hero supporting image',
    'Equipe da Futura Design': 'Futura Design team',
    'Megafone': 'Megaphone',
    'Trabalho 01': 'Work 01',
    'Trabalho 02': 'Work 02',
    'Trabalho 03': 'Work 03',
    'Trabalho 04': 'Work 04',
    'Trabalho 05': 'Work 05',
    'Trabalho 06': 'Work 06',
    'Trabalho 07': 'Work 07',
    'Trabalho 08': 'Work 08',
    'Trabalho 09': 'Work 09',
    'Trabalho 10': 'Work 10',
    'Trabalho 11': 'Work 11',
    'Trabalho 12': 'Work 12',
    'Trabalho 13': 'Work 13',
    'Trabalho 14': 'Work 14',
    'Trabalho 15': 'Work 15'
};

const _i18nOriginalTextByNode = new WeakMap();
const _i18nOriginalAttrsByEl = new WeakMap();

function getStoredLang() {
    try {
        const stored = localStorage.getItem(I18N_STORAGE_KEY);
        return stored === LANG_EN_US ? LANG_EN_US : LANG_PT_BR;
    } catch (e) {
        return LANG_PT_BR;
    }
}

function storeLang(lang) {
    try {
        localStorage.setItem(I18N_STORAGE_KEY, lang);
    } catch (e) {}
}

function getTranslationPtToEn(ptText) {
    const key = normalizeI18nKey(ptText);
    return PT_TO_EN[key] || null;
}

function ensureOriginalAttrCache(el) {
    let cache = _i18nOriginalAttrsByEl.get(el);
    if (!cache) {
        cache = new Map();
        _i18nOriginalAttrsByEl.set(el, cache);
    }
    return cache;
}

function applyLanguage(lang) {
    const target = lang === LANG_EN_US ? LANG_EN_US : LANG_PT_BR;
    document.documentElement.lang = target === LANG_EN_US ? 'en-US' : 'pt-BR';

    const root = document.body;
    if (!root) return;

    // 1) Text nodes
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node || !node.nodeValue) return NodeFilter.FILTER_REJECT;
                // ignora nós só de whitespace
                if (!node.nodeValue.replace(/\s+/g, '')) return NodeFilter.FILTER_REJECT;
                const parent = node.parentNode;
                if (!parent || parent.nodeType !== Node.ELEMENT_NODE) return NodeFilter.FILTER_REJECT;
                const tag = parent.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
                // não mexer em SVG (ícones)
                if (parent.closest && parent.closest('svg')) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    let textNode;
    while ((textNode = walker.nextNode())) {
        if (!_i18nOriginalTextByNode.has(textNode)) {
            _i18nOriginalTextByNode.set(textNode, textNode.nodeValue);
        }

        const original = _i18nOriginalTextByNode.get(textNode);
        if (target === LANG_PT_BR) {
            textNode.nodeValue = original;
            continue;
        }

        const match = /^([\s\u00A0]*)(.*?)([\s\u00A0]*)$/s.exec(original);
        const core = match ? match[2] : original;
        const translated = getTranslationPtToEn(core);
        if (!translated) continue;
        const left = match ? match[1] : '';
        const right = match ? match[3] : '';
        textNode.nodeValue = `${left}${translated}${right}`;
    }

    // 2) Element attributes (aria/placeholder/alt/title + alguns data-attrs usados em UI)
    const attrNames = ['aria-label', 'placeholder', 'alt', 'title', 'data-suffix'];
    const selector = attrNames.map((a) => `[${a}]`).join(',');
    root.querySelectorAll(selector).forEach((el) => {
        const cache = ensureOriginalAttrCache(el);
        for (const attr of attrNames) {
            if (!el.hasAttribute(attr)) continue;
            if (!cache.has(attr)) {
                cache.set(attr, el.getAttribute(attr));
            }
            if (target === LANG_PT_BR) {
                const orig = cache.get(attr);
                if (orig != null) el.setAttribute(attr, orig);
                continue;
            }
            const currentOriginal = cache.get(attr);
            const translated = getTranslationPtToEn(currentOriginal);
            if (translated) {
                el.setAttribute(attr, translated);
            }
        }
    });

    // 3) WhatsApp links (param text=...)
    document.querySelectorAll('a[href*="api.whatsapp.com/send"], a[href*="wa.me/"]').forEach((a) => {
        const cache = ensureOriginalAttrCache(a);
        if (!cache.has('href')) {
            cache.set('href', a.getAttribute('href') || a.href);
        }
        const originalHref = cache.get('href');

        if (target === LANG_PT_BR) {
            if (originalHref) a.setAttribute('href', originalHref);
            return;
        }

        try {
            const url = new URL(originalHref, window.location.href);
            if (!url.searchParams.has('text')) return;
            const ptText = url.searchParams.get('text') || '';
            const translated = getTranslationPtToEn(ptText);
            if (!translated) return;
            url.searchParams.set('text', translated);
            a.setAttribute('href', url.toString());
        } catch (e) {
            // ignora
        }
    });
}

// 0. FUNÇÃO PARA TROCAR LOGOS (LIGHT/DARK)
function updateLogos() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Caminhos das logos da Futura Design
    // Certifique-se de ter uma versão preta (logop.png) e uma branca (logob.png) na pasta img/
    const logoLight = "img/logop.webp"; // Logo PRETA (Para fundo claro)
    const logoDark  = "img/logob.webp"; // Logo BRANCA (Para fundo escuro)
    
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

// NEWSLETTER (Google Apps Script)
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const emailInput = form.querySelector('input[name="email"]');
    const statusEl = document.getElementById('newsletter-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!emailInput || !statusEl || !submitBtn) return;

    const getLang = () => (document.documentElement.lang || 'pt-BR').toLowerCase();
    const isEnglish = () => getLang().startsWith('en');

    const messages = {
        pt: {
            missingEndpoint: 'Configuração pendente: informe a URL do Google Apps Script no site.',
            invalidEmail: 'Digite um e-mail válido.',
            sending: 'Enviando…',
            success: 'Cadastro realizado. Obrigado!',
            error: 'Não foi possível cadastrar agora. Tente novamente.'
        },
        en: {
            missingEndpoint: 'Setup required: add the Google Apps Script URL to the website.',
            invalidEmail: 'Please enter a valid email address.',
            sending: 'Sending…',
            success: 'Subscription saved. Thank you.',
            error: 'We could not subscribe you right now. Please try again.'
        }
    };

    const setStatus = (text, tone) => {
        statusEl.textContent = text || '';
        statusEl.classList.remove('text-red-500', 'text-green-600', 'dark:text-green-400', 'text-gray-500', 'dark:text-gray-500');
        if (tone === 'success') {
            statusEl.classList.add('text-green-600', 'dark:text-green-400');
        } else if (tone === 'error') {
            statusEl.classList.add('text-red-500');
        } else {
            statusEl.classList.add('text-gray-500', 'dark:text-gray-500');
        }
    };

    const validateEmail = (value) => {
        const email = String(value || '').trim();
        // Validação simples (suficiente para formulário)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const endpoint = String(form.dataset.endpoint || '').trim();
        const langKey = isEnglish() ? 'en' : 'pt';
        const t = messages[langKey];

        if (!endpoint || endpoint.includes('REPLACE_ME')) {
            setStatus(t.missingEndpoint, 'error');
            return;
        }

        const email = String(emailInput.value || '').trim();
        if (!validateEmail(email)) {
            setStatus(t.invalidEmail, 'error');
            emailInput.focus();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        setStatus(t.sending, 'info');

        const payload = {
            email,
            page: window.location.href,
            lang: document.documentElement.lang || 'pt-BR',
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        try {
            // Apps Script costuma exigir no-cors em sites estáticos (CORS).
            await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            setStatus(t.success, 'success');
            form.reset();
        } catch (e) {
            setStatus(t.error, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
        }
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

    // 2.7. Newsletter
    initNewsletterForm();

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

    // 6. LANGUAGE TOGGLE (pt-BR <-> en-US)
    // Botão é injetado via JS ao lado do botão de tema (não altera HTML).
    const languageBtnId = 'language-toggle-btn';
    let currentLang = getStoredLang();

    const updateLanguageButtonUI = (btn, lang) => {
        if (!btn) return;
        const isEnglish = lang === LANG_EN_US;
        btn.innerHTML = `
            <span class="flex flex-col items-center justify-center leading-none" aria-hidden="true">
                <i class="fas fa-language text-sm"></i>
                <span class="font-display font-bold text-[10px] mt-1">${isEnglish ? 'PT' : 'EN'}</span>
            </span>
        `;
        btn.setAttribute('aria-label', isEnglish ? 'Switch to Portuguese' : 'Translate to English');
        btn.setAttribute('title', isEnglish ? 'Português' : 'English');
    };

    const ensureLanguageButton = () => {
        if (document.getElementById(languageBtnId)) {
            return document.getElementById(languageBtnId);
        }
        if (!themeBtn) return null;

        const btn = document.createElement('button');
        btn.id = languageBtnId;
        btn.type = 'button';
        // Reaproveita o mesmo visual do botão de tema para não “mexer no site” visualmente
        btn.className = themeBtn.className;
        // Ajuste visual: botão de idioma em formato retangular com cantos arredondados (não circular)
        btn.className = btn.className.replace(/\brounded-full\b/g, 'rounded-xl');
        // Posiciona via style para ficar ACIMA do botão de tema, no canto inferior direito.
        // (12px bottom/right = 0.75rem; tamanho do botão = 3rem; gap = 0.75rem)
        btn.style.right = '0.75rem';
        btn.style.bottom = 'calc(0.75rem + 3rem + 0.75rem)';
        btn.style.overflow = 'hidden';

        updateLanguageButtonUI(btn, currentLang);

        // Insere antes do botão de tema para ficar ao lado
        themeBtn.insertAdjacentElement('beforebegin', btn);
        return btn;
    };

    const languageBtn = ensureLanguageButton();
    // Aplica idioma inicial (depois de initSitesMarquee, FAQ, etc.)
    applyLanguage(currentLang);
    updateLanguageButtonUI(languageBtn, currentLang);

    if (languageBtn) {
        languageBtn.addEventListener('click', () => {
            currentLang = currentLang === LANG_EN_US ? LANG_PT_BR : LANG_EN_US;
            storeLang(currentLang);
            applyLanguage(currentLang);
            updateLanguageButtonUI(languageBtn, currentLang);
        });
    }
});
