/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#d5dae1",
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235",
        },
        blue: {
          500: "#2b77e7",
        },
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0px 1px 2px 0px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
