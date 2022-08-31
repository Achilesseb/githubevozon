/** @type {import('tailwindcss').Config} */
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// const fill

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "error-404": "url('../src/Content/error-background.jpg')",
      },
      keyframes: {
        fillPercent: { "100%": { "stroke-dashoffset": 20 } },
      },
      colors: {
        "repo-blue": "text-blue-400",
        "background-fill": "#374151",
        "tab-fill": "#0d1117",
        "orange-primary": "#42A5F5",
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
      boxShadow: {
        "3xl": "0 4px 10px 7px #374151",
        
      },
    },
  },
  plugins: [],
};
