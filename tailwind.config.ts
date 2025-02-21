import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        purple: "var(--purple)",
        white: "var(--white)",
        "white-2": "var(--white-2)",
      },
      backgroundImage: {
        howitworks:
          "linear-gradient(90deg, #26183E 0%, #A26DFF 47.5%, #26183E 100%)",
        "check-bg": "url('/check-bg.svg')",
        "main-bg": "url('/background.svg')",
        "join-community":
          "url('/join-community/grid.svg'), linear-gradient(102.75deg, #09050E 64.15%, #462B74 129.88%)",
        "community-cta":
          "linear-gradient(180deg, rgba(162, 109, 255, 0.9) 0%, rgba(162, 109, 255, 0) 90%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
