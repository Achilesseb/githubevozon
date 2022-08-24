/** @type {import('tailwindcss').Config} */
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "error-404": "url('../src/Content/error-background.jpg')",
      },
      colors: {
        "background-fill": "#374151",
        "tab-fill": "#0d1117",
        "orange-primary": "#F9A03C",
        Other: () => {
          var letters = "0123456789ABCDEF";
          let colors = [];
          var color = "#";
          for (var i = 0; i < 6; i++) {
            colors.push((color += letters[Math.floor(Math.random() * 16)]));
          }
          console.log(colors);
          return colors;
        },
      },
      height: {
        150: "80vh",
      },
    },
  },
  plugins: [],
};
