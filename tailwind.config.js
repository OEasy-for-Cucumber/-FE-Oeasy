import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "like-custom": "1px 1px 14px 2px rgba(255, 69, 58, 0.64)",
        "hate-custom": "1px 1px 14px 0px rgba(255, 69, 58, 0.64);"
      },
      zIndex: {
        50: "50",
        10: "10"
      },
      colors: {
        grayoe: {
          50: "#D9D9D9",
          100: "#C4C4C4",
          200: "#9E9E9E",
          300: "#757575",
          400: "#5A5A5A",
          500: "#4F4F4F",
          600: "#454545",
          700: "#383838",
          800: "#2E2E2E",
          900: "#262626",
          950: "#1C1C1C"
        },
        greenoe: {
          50: "#eefff4",
          100: "#d7ffe7",
          200: "#b2ffd1",
          300: "#76ffad",
          400: "#33f583",
          500: "#09de61",
          600: "#00c853",
          700: "#049140",
          800: "#0a7136",
          900: "#0a5d2f",
          950: "#052210"
        },
        redoe: {
          50: "#fff2f1",
          500: "#ff453a"
        }
      },
      fontFamily: {
        LuckiestGuy: ["Luckiest Guy"],
        SBAggroB: ["SBAggroB"]
      },
      backgroundImage: {
        mobile_cucumber: "url(./public/img/mobile_group.png)",
        web_cucumber: "url(./public/img/web_group.png)",
        recipes_btn_bg: "url(./public/img/button_bg_cucumber.png)",
        noisy_gradients: "url(./public/img/noisy-gradients.png)"
      },
      backgroundSize: {
        "81%": "81%",
        "50%": "50%"
      },
      backgroundPosition: {
        mobile_cucumber: "-65% 0%",
        web_cucumber: "-7% 0%"
      }
    },
    animation: {
      "mobile-move": "backgroundMove 6s linear infinite",
      "web-move": "webMove 5s linear infinite",
      "move-left": "moveLeft 40s linear infinite",
      "main-title-move": "mainTitle 0.9s ease-in-out"
    },
    keyframes: {
      backgroundMove: {
        "0%": { backgroundPositionY: "10%" },
        "50%": { backgroundPositionY: "19%" },
        "100%": { backgroundPositionY: "10%" }
      },
      webMove: {
        "0%": { backgroundPositionY: "10%" },
        "50%": { backgroundPositionY: "24%" },
        "100%": { backgroundPositionY: "10%" }
      },
      moveLeft: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" }
      },
      mainTitle: {
        "0%": { opacity: 0.8, transform: "translateY(50%)" },
        "100%": { opacity: 1, transform: "translateY(0)" }
      }
    }
  },
  screens: {
    xl: { min: "1440px" }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".font-h1": {
          fontSize: "48px",
          lineHeight: "62px",
          fontWeight: "700"
        },
        ".font-h2": {
          fontSize: "40px",
          lineHeight: "48px",
          fontWeight: "700"
        },
        ".font-h3": {
          fontSize: "32px",
          lineHeight: "40px",
          fontWeight: "600"
        },
        ".font-h4": {
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: "600"
        },
        ".font-h5": {
          fontSize: "20px",
          lineHeight: "28px",
          fontWeight: "600"
        },
        ".font-h6": {
          fontSize: "18px",
          lineHeight: "24px",
          fontWeight: "600"
        },
        ".font-b1-semibold": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600"
        },
        ".font-b1-regular": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "400"
        },
        ".font-b2-semibold": {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: "600"
        },
        ".font-b2-regular": {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: "400"
        },
        ".font-c1": {
          fontSize: "13px",
          lineHeight: "16px",
          fontWeight: "400"
        },
        ".font-c2": {
          fontSize: "12px",
          lineHeight: "16px",
          fontWeight: "400"
        },
        ".primary": { color: "#00c853" },
        ".primary-light": { color: "#eefff4" },
        ".redoe": { color: "#ff453a" },
        ".red-light": { color: "#fff2f1" },
        ".blueoe": { color: "#0a84ff" },
        ".blue-light": { color: "#edf9ff" }
      });
    })
  ]
};
