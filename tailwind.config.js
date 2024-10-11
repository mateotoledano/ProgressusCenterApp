/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customTextGreen: "#5B8C00", 
        customButtonGreen: "#5B8C00", 
        customNavBar : "#7CB305",
        customBlue : "#E6F7FF",
        customTextBlue : "#1890FF"
   
      },
    },
  },
  plugins: [animations],
};
