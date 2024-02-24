/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '180px',
      },
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
        'error': "#FF0000",
        'white': "#f6eae0",
        'white-gradient': "#d7c5ca",
        'orange': "#f29680",
        'orange-gradient': "#dc705d",
        'magenta': "#c64473",
        'magenta-gradient': "#9a3968", 
      }
    },
  },
  plugins: [],
}

