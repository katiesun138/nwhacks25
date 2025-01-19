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
        'primary-light': "#403E3E",
        "secondary": "#292525",
        'text:': "#211C1C",
        "bg-primary": "#F5F5F5",
        "bg-dark": "#E5E5E5",
        "bg-light": "#EDEDED",
      }
    },
  },
  plugins: [],
}

