// legal.js
// JS exclusivo para as páginas legais (termos/privacidade/cookies)

// 1) Marca que JS está ativo (usado por alguns estilos)
document.documentElement.classList.add('js');

// 2) Tema + i18n independentes (sem depender do script.js principal)

const LEGAL_THEME_KEY = 'theme';
const LEGAL_LANG_KEY = 'lang';
const LANG_PT_BR = 'pt-BR';
const LANG_EN_US = 'en-US';

const THEME_BUTTON_ID = 'theme-toggle-btn';
const THEME_SUN_ID = 'theme-toggle-sun';
const THEME_MOON_ID = 'theme-toggle-moon';
const LANG_BUTTON_ID = 'language-toggle-btn';

const ATTRS_TO_TRANSLATE = ['aria-label', 'placeholder', 'title', 'alt'];
const _originalTextByNode = new WeakMap();
const _originalAttrsByEl = new WeakMap();

function normalizeKey(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

// Traduções específicas e suficientes para as 3 páginas legais atuais
const PT_TO_EN = {
  'Legal': 'Legal',
  'Termos': 'Terms',
  'Privacidade': 'Privacy',
  'Cookies': 'Cookies',
  'Voltar ao site': 'Back to the website',
  'Termos de Uso': 'Terms of Use',
  'Política de Privacidade': 'Privacy Policy',
  'Política de Cookies': 'Cookie Policy',
  'Última atualização:': 'Last updated:',

  'Estes Termos descrevem as regras básicas para uso do nosso site. A ideia é simples: transparência, respeito e clareza.':
    'These Terms describe the basic rules for using our website. The goal is simple: transparency, respect, and clarity.',
  'Resumo': 'Summary',
  'Ao navegar, você concorda com estes Termos. Se não concordar, recomendamos não usar o site.':
    'By browsing, you agree to these Terms. If you do not agree, we recommend that you do not use the website.',

  'Transparência sobre dados: o que coletamos, por que coletamos e como você pode solicitar remoção.':
    'Transparency about data: what we collect, why we collect it, and how you can request removal.',

  'Uma visão objetiva: o que são cookies, o que usamos hoje e como você gerencia isso no navegador.':
    'A straightforward overview: what cookies are, what we use today, and how you manage it in your browser.',
  'Cookies ajudam a lembrar preferências e, em alguns casos, medir uso. Aqui você vê como isso se aplica ao nosso site.':
    'Cookies help remember preferences and, in some cases, measure usage. Here you can see how this applies to our website.',

  'Conteúdo': 'Content',
  'Propriedade intelectual': 'Intellectual property',
  'Links externos': 'External links',
  'Limitação de responsabilidade': 'Limitation of liability',
  'Contato': 'Contact',
  'Quais dados coletamos': 'What data we collect',
  'Para que usamos': 'How we use it',
  'Armazenamento e segurança': 'Storage and security',
  'Serviços de terceiros': 'Third-party services',
  'Seus direitos': 'Your rights',
  'O que usamos neste site': 'What we use on this website',
  'Terceiros': 'Third parties',
  'Como gerenciar': 'How to manage',

  'Estes Termos de Uso regulam o acesso e uso do site da FUTURA DESIGN. Ao navegar neste site, você concorda com estes termos.':
    'These Terms of Use govern access to and use of the FUTURA DESIGN website. By browsing this website, you agree to these terms.',
  'O conteúdo do site é informativo e pode ser atualizado sem aviso. Não garantimos que todo conteúdo estará sempre completo ou atual em tempo real.':
    'Website content is informational and may be updated without notice. We do not guarantee all content will always be complete or up to date in real time.',
  'Textos, imagens, marcas e materiais presentes no site podem ser protegidos por direitos autorais e/ou marcas. Não é permitido copiar, reproduzir ou distribuir sem autorização.':
    'Texts, images, trademarks, and materials on the website may be protected by copyright and/or trademarks. You may not copy, reproduce, or distribute them without authorization.',
  'Podemos disponibilizar links para sites de terceiros. Não nos responsabilizamos por conteúdo, políticas ou práticas desses sites.':
    'We may provide links to third-party websites. We are not responsible for the content, policies, or practices of those websites.',
  'Na medida permitida pela lei, não nos responsabilizamos por danos indiretos decorrentes do uso ou impossibilidade de uso do site.':
    'To the extent permitted by law, we are not liable for indirect damages arising from the use of, or inability to use, the website.',
  'Para dúvidas sobre estes Termos, entre em contato pelos canais informados no site.':
    'If you have questions about these Terms, contact us through the channels listed on the website.',

  'Esta Política explica como tratamos dados quando você navega no site e quando envia seu e-mail pela Newsletter.':
    'This Policy explains how we handle data when you browse the website and when you submit your email through the Newsletter.',
  'Quando você se cadastra na Newsletter, coletamos o e-mail informado e dados técnicos básicos enviados pelo navegador (por exemplo, página e idioma) para registrar o contexto do envio.':
    'When you subscribe to the Newsletter, we collect the email address you provide and basic technical data sent by your browser (for example, page and language) to record the context of the submission.',
  'Usamos o e-mail para enviar comunicações relacionadas à Newsletter e, quando aplicável, responder solicitações. Não vendemos seus dados.':
    'We use your email to send Newsletter-related communications and, when applicable, to respond to requests. We do not sell your data.',
  'Adotamos medidas razoáveis para proteger as informações. Ainda assim, nenhum sistema é 100% livre de riscos.':
    'We take reasonable measures to protect information. However, no system is 100% risk-free.',
  'O cadastro da Newsletter é processado via Google Apps Script (Google). O uso desses serviços pode envolver tratamento de dados conforme as políticas do provedor.':
    'Newsletter subscriptions are processed via Google Apps Script (Google). Using these services may involve data handling under the provider’s policies.',
  'Você pode solicitar atualização ou remoção do seu e-mail da lista entrando em contato pelos canais do site.':
    'You may request an update or removal of your email from the list by contacting us through the website’s channels.',

  'Cookies são pequenos arquivos armazenados no navegador para lembrar preferências e, em alguns casos, medir uso do site.':
    'Cookies are small files stored in your browser to remember preferences and, in some cases, measure website usage.',
  'No momento, o site usa principalmente armazenamento local do navegador (localStorage) para salvar preferências como tema (claro/escuro) e idioma. Isso não é o mesmo que cookie.':
    'At the moment, the website primarily uses your browser’s local storage (localStorage) to save preferences such as theme (light/dark) and language. This is not the same as a cookie.',
  'O site carrega recursos de terceiros (por exemplo, CDNs e fontes). Esses provedores podem coletar dados técnicos (como endereço IP) conforme as políticas deles. Se futuramente adicionarmos ferramentas de analytics ou anúncios, esta página será atualizada.':
    'The website loads third-party resources (for example, CDNs and fonts). These providers may collect technical data (such as IP address) under their own policies. If we add analytics or advertising tools in the future, this page will be updated.',
  'Você pode gerenciar cookies nas configurações do seu navegador. Para preferências armazenadas em localStorage, você pode limpar os dados do site no navegador.':
    'You can manage cookies in your browser settings. For preferences stored in localStorage, you can clear website data in your browser.',

  'Observação: este texto é um modelo geral e não substitui orientação jurídica.':
    'Note: this text is a general template and does not replace legal advice.',

  'Alternar tema claro/escuro': 'Toggle light/dark theme',
  'FUTURA DESIGN Logo': 'FUTURA DESIGN Logo',
};

function getStoredTheme() {
  try {
    return localStorage.getItem(LEGAL_THEME_KEY);
  } catch (e) {
    return null;
  }
}

function storeTheme(value) {
  try {
    localStorage.setItem(LEGAL_THEME_KEY, value);
  } catch (e) {}
}

function applyThemeFromStorage() {
  try {
    const theme = getStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark');
      if (document.body) document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (document.body) document.body.classList.remove('dark');
    }
  } catch (e) {}
}

function getStoredLang() {
  try {
    const stored = localStorage.getItem(LEGAL_LANG_KEY);
    return stored === LANG_EN_US ? LANG_EN_US : LANG_PT_BR;
  } catch (e) {
    return LANG_PT_BR;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem(LEGAL_LANG_KEY, lang);
  } catch (e) {}
}

function getTranslationPtToEn(ptText) {
  const key = normalizeKey(ptText);
  return PT_TO_EN[key] || null;
}

function ensureOriginalAttrs(el) {
  if (_originalAttrsByEl.has(el)) return _originalAttrsByEl.get(el);
  const record = {};
  ATTRS_TO_TRANSLATE.forEach((attr) => {
    if (el.hasAttribute && el.hasAttribute(attr)) {
      const val = el.getAttribute(attr);
      if (val != null) record[attr] = val;
    }
  });
  _originalAttrsByEl.set(el, record);
  return record;
}

function applyLanguage(lang) {
  const toEnglish = lang === LANG_EN_US;
  document.documentElement.lang = lang;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node || !node.nodeValue) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    if (!_originalTextByNode.has(node)) _originalTextByNode.set(node, node.nodeValue);
    const original = _originalTextByNode.get(node);
    if (!toEnglish) {
      node.nodeValue = original;
      return;
    }
    const translated = getTranslationPtToEn(original);
    if (translated) node.nodeValue = translated;
  });

  const elements = Array.from(document.querySelectorAll('*'));
  elements.forEach((el) => {
    if (!el || !el.getAttribute) return;
    const originalAttrs = ensureOriginalAttrs(el);
    ATTRS_TO_TRANSLATE.forEach((attr) => {
      const originalVal = originalAttrs[attr];
      if (originalVal == null) return;
      if (!toEnglish) {
        el.setAttribute(attr, originalVal);
        return;
      }
      const translatedVal = getTranslationPtToEn(originalVal);
      if (translatedVal) el.setAttribute(attr, translatedVal);
    });
  });
}

function updateLogos() {
  const isDark = document.documentElement.classList.contains('dark');
  const logoLight = 'img/logop.webp';
  const logoDark = 'img/logob.webp';
  const target = isDark ? logoDark : logoLight;
  document.querySelectorAll('.theme-logo').forEach((img) => {
    try {
      img.src = target;
    } catch (e) {}
  });
}

function ensureThemeButton() {
  const existing = document.getElementById(THEME_BUTTON_ID);
  if (existing) return existing;

  const btn = document.createElement('button');
  btn.id = THEME_BUTTON_ID;
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Alternar tema claro/escuro');
  btn.className = 'fixed bottom-3 right-3 z-50 w-12 h-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform';
  btn.innerHTML = `
    <i id="${THEME_SUN_ID}" class="fas fa-sun"></i>
    <i id="${THEME_MOON_ID}" class="fas fa-moon hidden text-futura-accent"></i>
  `;
  document.body.appendChild(btn);
  return btn;
}

function updateThemeIcon() {
  const sun = document.getElementById(THEME_SUN_ID);
  const moon = document.getElementById(THEME_MOON_ID);
  if (!sun || !moon) return;

  if (document.documentElement.classList.contains('dark')) {
    moon.classList.remove('hidden');
    sun.classList.add('hidden');
  } else {
    sun.classList.remove('hidden');
    moon.classList.add('hidden');
  }
}

function ensureLanguageButton(themeBtn) {
  const existing = document.getElementById(LANG_BUTTON_ID);
  if (existing) return existing;
  if (!themeBtn) return null;

  const btn = document.createElement('button');
  btn.id = LANG_BUTTON_ID;
  btn.type = 'button';
  btn.className = themeBtn.className.replace(/\brounded-full\b/g, 'rounded-xl');
  btn.style.right = '0.75rem';
  btn.style.bottom = 'calc(0.75rem + 3rem + 0.75rem)';
  btn.style.overflow = 'hidden';
  themeBtn.insertAdjacentElement('beforebegin', btn);
  return btn;
}

function updateLanguageButtonUI(btn, lang) {
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
}

// Pré-carrega tema (evita flash)
applyThemeFromStorage();

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = ensureThemeButton();
  const languageBtn = ensureLanguageButton(themeBtn);

  updateThemeIcon();
  updateLogos();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      document.body.classList.toggle('dark', document.documentElement.classList.contains('dark'));
      storeTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      updateThemeIcon();
      updateLogos();
    });
  }

  let currentLang = getStoredLang();
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
