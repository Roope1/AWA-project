/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mountain': "url('./images/mountain.jpg')"
      },
      colors: { //https://coolors.co/273043-9197ae-94aeb8-a1e8af-94c595
        transparent: 'transparent',
        current: 'currentColor',
        'main': "#011627",
        'secondary': "#9197AE",
        'background': "#94AEB8",
        'accent': "#A1E8AF",
        'accent-secondary': "#94C595",
        'error': "#FF0000"
      }
    },
  },
  plugins: [],
}

