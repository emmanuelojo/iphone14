/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        lockscreen: "url('https://wallpaperaccess.com/full/4720926.png')",
      },
      colors: {
        "n-black-10%": "rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
