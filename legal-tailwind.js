// legal-tailwind.js
// Configuração do Tailwind CDN exclusiva para as páginas legais.
// Precisa ser carregado ANTES de: https://cdn.tailwindcss.com

var tailwind = {
  config: {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Michroma', 'sans-serif'],
        },
        colors: {
          futura: {
            primary: '#D300C5',
            secondary: '#240090',
            accent: '#00E5FF',
            dark: '#050515',
            card: '#0F0F25',
            light: '#F8F9FA',
          },
        },
        boxShadow: {
          soft: '0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 5px 20px -5px rgba(0, 0, 0, 0.3)',
          glow: '0 0 40px rgba(211, 0, 197, 0.2), 0 0 15px rgba(36, 0, 144, 0.1)',
          neon: '0 0 15px rgba(211, 0, 197, 0.4), 0 0 30px rgba(211, 0, 197, 0.1)',
        },
        backgroundImage: {
          'universe-dark': 'linear-gradient(to bottom, rgba(2, 2, 8, 0.85), rgba(2, 2, 8, 0.98))',
          'clean-light': 'linear-gradient(to bottom, #F8F9FA, #FFFFFF)',
        },
      },
    },
  },
};
