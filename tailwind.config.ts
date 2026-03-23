import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
      },
      animation: {
        "blob": "blob 7s infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "border-spin": "border-spin 4s linear infinite",
        "aurora-1": "aurora-1 20s ease-in-out infinite",
        "aurora-2": "aurora-2 25s ease-in-out infinite alternate",
        "aurora-3": "aurora-3 30s ease-in-out infinite alternate",
        "blink": "blink 1s step-end infinite",
        "float-up": "float-up 15s linear infinite",
        "packet-travel": "packet-travel 4s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(-15vh) translateX(15vw) scale(1.2)" },
          "66%": { transform: "translateY(15vh) translateX(-15vw) scale(0.8)" }
        },
        "aurora-2": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(15vh) translateX(-15vw) scale(0.9)" },
          "66%": { transform: "translateY(-15vh) translateX(15vw) scale(1.3)" }
        },
        "aurora-3": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(-15vh) translateX(-15vw) scale(1.1)" },
          "66%": { transform: "translateY(15vh) translateX(15vw) scale(0.9)" }
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(0, 255, 65, 0.2)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)" },
        },
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "float-up": {
          "0%": { transform: "translateY(100vh)", opacity: "0" },
          "10%": { opacity: "0.4" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translateY(-20vh)", opacity: "0" },
        },
        "packet-travel": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
