import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // Default breakpoints
      sm: "640px",
      md: "768px",
      lg: "1172px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",

      // Custom laptop breakpoints
      "win-laptop": "1366px", // Common Windows laptop (HD)
      "win-laptop-lg": "1920px", // Windows laptop (Full HD)
      "mac-13": "1280px", // 13" MacBook
      "mac-14": "1512px", // 14" MacBook Pro
      "mac-16": "1728px", // 16" MacBook Pro
      "4k": "2500px",
      "4k-large": "3200px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        purple: "var(--purple)",
        white: "var(--white)",
        "white-2": "var(--white-2)",
        "dark-bg": "rgba(9, 5, 14, 1)",
        "white-style": "rgba(139, 139, 139, 1)",
        "custom-purple": "rgba(162, 109, 255, 1)",
      },
      backgroundImage: {
        "check-bg": "url('/check-bg.svg')",
        "main-bg": "url('/background.svg')",
        howitworks:
          "linear-gradient(90deg, #26183E 0%, #A26DFF 47.5%, #26183E 100%)",
        "join-community":
          "url('/join-community/grid.svg'), linear-gradient(102.75deg, #09050E 64.15%, #462B74 129.88%)",
        "community-cta":
          "linear-gradient(180deg, rgba(162, 109, 255, 0.9) 0%, rgba(162, 109, 255, 0) 90%)",
        "gradient-purple":
          "linear-gradient(90deg, rgba(6,6,6,0.01) 0%, rgba(154,128,207,0.01) 49%, rgba(4,1,8,1) 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(162, 109, 255, 0.25), rgba(72, 61, 139, 0.5))",
        "gradient-pink": "linear-gradient(90deg, #FF779A 50%, #99485D 86.57%)",
        "grid-pattern": "url('/small-grid.svg')",
        "grid-pattern-2": "url('/large-grid.svg')",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        manrope: ["var(--font-manrope)"],
        "roboto-serif": ["var(--font-roboto-serif)"],
        inter: ["var(--font-inter)"],
      },
      boxShadow: {
        "custom-purple": "0 0 4px 2px rgba(162, 109, 255, 0.25)",
        glow: "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(162, 109, 255, 0.6)",
      },
      animation: {
        slowSpin: "spin 3s linear infinite",
        spinSlow: "spin 20s linear infinite",
        glowSlow: "glow 4s cubic-bezier(0.6, 0.8, 0.6, 1) infinite",
        jiggle: "jiggle 0.4s ease-in-out",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            filter:
              "brightness(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))",
          },
          "50%": {
            filter:
              "brightness(1.3) drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))",
          },
        },
        jiggle: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-3px)" },
          "50%": { transform: "translateX(3px)" },
          "75%": { transform: "translateX(-2px)" },
          "100%": { transform: "translateX(0)" },
        },
        pulse: {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
            boxShadow: "0 0 0 0 rgba(162, 109, 255, 0.7)",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "1",
            boxShadow: "0 0 0 10px rgba(162, 109, 255, 0)",
          },
          "100%": {
            transform: "scale(0.8)",
            opacity: "0",
            boxShadow: "0 0 0 0 rgba(162, 109, 255, 0)",
          },
        },
      },
      scale: {
        150: "1.5",
      },
      transform: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};

export default config;
