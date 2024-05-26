/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        'xxsm':'390px',
        'xsm': '480px'
      },
      colors:{
        'primary': '#41b57e'
      },
      fontFamily:{
        'nunito':['Nunito'],
        'poppins':['Poppins']
      }
    },
  },
  plugins: [],
};
