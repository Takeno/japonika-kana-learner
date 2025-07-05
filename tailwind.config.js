const {scopedPreflightStyles} = require('tailwindcss-scoped-preflight');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ['Noto Sans JP', 'sans-serif'],
        NotoSerif: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [
    scopedPreflightStyles({
      cssSelector: '#kana-quiz-container', // or .tailwind-preflight or even [data-twp=true] - any valid CSS selector of your choice
      mode: 'matched only', // it's the default
    }),
  ].concat(
    process.env.REM_SIZE
      ? require('tailwindcss-base-font-size')({
          baseFontSize: process.env.REM_SIZE,
        })
      : [],
  ),
};
