/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        "background-fill": "#374151",
        "tab-fill": "#0d1117",
        "orange-primary": "#F9A03C",
      },
      height: {
        150: "80vh",
      },
    },
  },
  plugins: [],
};
