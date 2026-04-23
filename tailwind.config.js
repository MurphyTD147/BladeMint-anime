/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mint-black': '#050505',
        'mint-gray': '#121212',
        'mint-accent': '#00ffa3',
        'knight-steel': '#a1a1aa',
      },
    },
  },
  plugins: [],
}