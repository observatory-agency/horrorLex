// tailwind.config.js
module.exports = {
  future: {},
  purge: {
    mode: 'all',
    content: ['./views/partials/**/*.hbs'],
  },
  theme: {
    extend: {
      colors: {
        blackDark: '#171717',
        blackMedium: '#1E1E1E',
        blackLight: '#222222',
        primaryRed: '#950A10',
        primaryOrange: '#A0410D',
        primaryOrangeDark: '#772C03',
      },
      maxWidth: {
        full: '1440px',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
};
