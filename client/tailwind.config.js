/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'main': "#273043",
      'secondary': "#9197AE",
      'background': "#EFF6EE",
      'accent': "#F02D3A",
      'accent-secondary': "#DD0426"
    }
  },
  plugins: [],
}

