/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ['Noto Sans JP', 'sans-serif'],
        NotoSerif: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [],
};
