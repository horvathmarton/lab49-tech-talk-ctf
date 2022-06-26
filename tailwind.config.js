/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./static/**/*.{html,js}", "./templates/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["forest"],
  },
};
