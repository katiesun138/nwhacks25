/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#272727",
        'primary-dark': "#131212",
        "secondary": "#292525",
        'text:': "#211C1C",
      }
    },
  },
  plugins: [],
}

