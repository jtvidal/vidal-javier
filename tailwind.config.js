/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxsm: "390px",
        xsm: "480px",
      },
      colors: {
        primary: "#41b57e",
      },
      fontFamily: {
        nunito: ["Nunito"],
        poppins: ["Poppins"],
      },
      animation: {
        smooth_to_br: "smooth_to_br 2s",
        jump: "jump 0.5s",
      },
      keyframes: {
        jump: {
          "0%": { transform: "translate(0px,0px)" },
          "50%": { transform: "translate(0px,-6px)" },
          "0%": { transform: "translate(0px,0px)" },
        },
        smooth_to_br: {
          "0%": {
            transform: "translate(0px, 0px)",
          },
          "50%": {
            transform: "translate(4px,-4px)",
          },
          "0%": {
            transform: "translate(0px,0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
