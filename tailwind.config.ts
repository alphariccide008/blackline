import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Poppins Fallback", "system-ui", "sans-serif"],
      },
      colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          card: {
            DEFAULT: "var(--card)",
            foreground: "var(--card-foreground)",
          },
          primary: {
            DEFAULT: "var(--primary)",
            foreground: "var(--primary-foreground)",
            light: "var(--primary-light)",
          },
          muted: {
            DEFAULT: "var(--muted)",
            foreground: "var(--muted-foreground)",
          },
          border: "var(--border)",
          input: "var(--input)",
          ring: "var(--ring)",
          accentAlt: "var(--accent-alt)",
          // Map Tailwind's blue utilities to the brand primary (Muted Gold)
          blue: {
            50: "var(--primary-light)",
            100: "var(--primary-light)",
            200: "var(--primary-light)",
            300: "var(--primary)",
            400: "var(--primary)",
            500: "var(--primary)",
            600: "var(--primary)",
            700: "var(--primary)",
            800: "var(--primary)",
            900: "var(--primary)",
          },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "slide-up":           "slide-up 0.7s ease-out forwards",
        "slide-down":         "slide-down 0.4s ease-out forwards",
        "slide-in-left":      "slide-in-left 0.7s ease-out forwards",
        "slide-in-right":     "slide-in-right 0.7s ease-out forwards",
        "fade-in":            "fade-in 0.7s ease-out forwards",
        "fade-in-up":         "fade-in-up 0.7s ease-out forwards",
        "scale-in":           "scale-in 0.5s ease-out forwards",
        "scroll-infinite":    "scroll-infinite 38s linear infinite",
        "zoom-in-out":        "zoom-in-out 10s ease-in-out infinite",
        "spin":               "spin 1s linear infinite",
        "loader-spin":        "loader-spin 0.9s linear infinite",
        "pulse-dot":          "pulse-dot 1.4s ease-in-out infinite",
        "ken-burns":          "ken-burns 7s ease-in-out alternate infinite",
        "orb-pulse":          "orb-pulse 5s ease-in-out infinite",
        "cube-spin":          "cube-spin 14s linear infinite",
      },
      keyframes: {
        "slide-up":        { from: { opacity: "0", transform: "translateY(30px)" },  to: { opacity: "1", transform: "translateY(0)" } },
        "slide-down":      { from: { opacity: "0", transform: "translateY(-16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-in-left":   { from: { opacity: "0", transform: "translateX(-50px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "slide-in-right":  { from: { opacity: "0", transform: "translateX(50px)" },  to: { opacity: "1", transform: "translateX(0)" } },
        "fade-in":         { from: { opacity: "0" },                                 to: { opacity: "1" } },
        "fade-in-up":      { from: { opacity: "0", transform: "translateY(24px)" },  to: { opacity: "1", transform: "translateY(0)" } },
        "scale-in":        { from: { opacity: "0", transform: "scale(0.94)" },       to: { opacity: "1", transform: "scale(1)" } },
        "scroll-infinite": { "0%": { transform: "translateX(0)" },                   "100%": { transform: "translateX(-50%)" } },
        "zoom-in-out":     { "0%,100%": { transform: "scale(1)" },                   "50%": { transform: "scale(1.06)" } },
        "spin":            { to: { transform: "rotate(360deg)" } },
        "loader-spin":     { "0%": { transform: "rotate(0deg)" },                    "100%": { transform: "rotate(360deg)" } },
        "pulse-dot":       { "0%,100%": { transform: "scale(1)", opacity: "0.6" },   "50%": { transform: "scale(1.3)", opacity: "1" } },
        "ken-burns":       { "0%": { transform: "scale(1)" },                         "100%": { transform: "scale(1.08)" } },
        "orb-pulse":       { "0%,100%": { opacity: "0.6", transform: "scale(1)" },   "50%": { opacity: "1", transform: "scale(1.06)" } },
        "cube-spin":       { from: { transform: "rotateX(0deg) rotateY(0deg)" },      to: { transform: "rotateX(360deg) rotateY(360deg)" } },
      },
    },
  },
  plugins: [],
}
export default config
