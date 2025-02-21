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
        'howitworks': "linear-gradient(90deg, #26183E 0%, #A26DFF 47.5%, #26183E 100%)",
      },
      backgroundImage: {
        'check-bg' : "url('/check-bg.svg')",
        'main-bg': "url('/background.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
