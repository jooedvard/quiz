/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      deep: '#192a2e',
      ocean: '#327c80',
      tahiti: "#bf9442",
      white: "#fff",
      green: "#1db954",
      transparent: "transparent",
      oceanwhite: "#caf0f8",
      gold: "#f0f3bd",
      finish: "#02c39a"
    },
    fontSize: {
      px_32: '32px',
      px_26: '26px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}