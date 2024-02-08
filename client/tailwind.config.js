/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mountain': "url('./images/mountain.jpg')"
      }
    },
    colors: { //https://coolors.co/273043-9197ae-eff6ee-f02d3a-dd0426
      transparent: 'transparent',
      current: 'currentColor',
      'main': "#011627",
      'secondary': "#92DCE5",
      'background': "#EEE5E9",
      'accent-secondary': "#7C7C7C",
      'accent': "#DD0426"
    }
  },
  plugins: [],
}

