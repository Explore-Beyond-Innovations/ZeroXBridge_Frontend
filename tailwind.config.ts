import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background-light, #FFFFFF)",
          dark: "var(--background-dark, #09050E)",
        },
        foreground: {
          DEFAULT: "var(--foreground-light, #1F2937)",
          dark: "var(--foreground-dark, #F3F4F6)",
        },
        primary: {
          DEFAULT: "var(--primary-light, #A26DFF)",
          dark: "var(--primary-dark, #A26DFF)",
        },
        purple: {
          DEFAULT: "var(--purple-light, #A26DFF)",
          dark: "var(--purple-dark, #A26DFF)",
        },
        white: {
          DEFAULT: "var(--white-light, #FFFFFF)",
          dark: "var(--white-dark, #1E1E1E)",
        },
        "white-2": {
          DEFAULT: "var(--white-2-light, #F3F4F6)",
          dark: "var(--white-2-dark, #2D2D2D)",
        },
        "dark-bg": "rgba(9, 5, 14, 1)",
        "white-style": "rgba(139, 139, 139, 1)",
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
        "grid-pattern": "url('/small-grid.svg')",
        "grid-pattern-2": "url('/large-grid.svg')",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        manrope: ["var(--font-manrope)"],
        "roboto-serif": ["var(--font-roboto-serif)"],
      },
      boxShadow: {
        "custom-purple": "0 0 4px 2px rgba(162, 109, 255, 0.25)",
      },
      animation: {
        slowSpin: "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
