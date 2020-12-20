const tailwindsUi = require('@tailwindcss/ui');

// tailwind.config.js
module.exports = {
  future: {},
  purge: {
    mode: 'all',
    content: ['./views/**/*.hbs'],
  },
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Fira Sans', 'sans-serif'],
      },
      colors: {
        gray: {
          100: '#F7F7F7',
          200: '#E1E1E1',
          300: '#CFCFCF',
          400: '#B1B1B1',
          500: '#9E9E9E',
          600: '#7E7E7E',
          700: '#626262',
          800: '#515151',
          900: '#3B3B3B',
        },
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
  plugins: [tailwindsUi],
};
