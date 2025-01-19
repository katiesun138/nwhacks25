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
        'primary-light': "#2F2E2E",
        "secondary": "#292525",
        'text:': "#1D1A1A",
        "bg-primary": "#F5F5F5",
        "bg-dark": "#F0ECEC",
        "bg-light": "#EDEDED",
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 25% 25%, #f5f5f5, #FFEAEA)',
      },
    },
  },
  plugins: [],
}

