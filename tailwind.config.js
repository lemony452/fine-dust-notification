/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    "./node_modules/flowbite/**/*.js",
  ],
  mode: "jit",
}
