/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: '#fff',
      black: '#000',
      orange: {
        600: '#FA5F0C',
      },
      gray: {
        200: '#E5E5E5',
        300: '#C4C4C4',
        600: '#494949',
        900: '#191919',
      },
    },
    fontFamily: {
      Avenir: ['Avenir'],
      Castle: ['Castle'],
    },
  },
  plugins: [],
}
