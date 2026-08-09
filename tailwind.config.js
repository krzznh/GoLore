/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens. Each resolves through a CSS custom
        // property (see src/index.css :root / .dark) so the same class
        // names (bg-paper, text-ink, border-line, ...) automatically adapt
        // between light and dark mode without needing dark: variants
        // sprinkled through every component.
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        paper2: "rgb(var(--color-paper2) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        ink2: "rgb(var(--color-ink2) / <alpha-value>)",
        drift: "rgb(var(--color-drift) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        signal: "rgb(var(--color-signal) / <alpha-value>)",
        signal2: "rgb(var(--color-signal2) / <alpha-value>)",
        clay: "rgb(var(--color-clay) / <alpha-value>)",
        moss: "rgb(var(--color-moss) / <alpha-value>)",
        sun: "rgb(var(--color-sun) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'General Sans'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        hand: ["'Caveat'", "cursive"],
      },
      letterSpacing: {
        tightish: "-0.02em",
        widey: "0.14em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(28,27,24,0.06), 0 12px 32px -16px rgba(28,27,24,0.25)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
