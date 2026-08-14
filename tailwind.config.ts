import type { Config } from "tailwindcss";

// Colors resolve to CSS custom properties (defined per-theme in globals.css)
// so switching light/dark never requires touching a className anywhere —
// only the variable values change.
function themeColor(name: string) {
  return `rgb(var(--color-${name}) / <alpha-value>)`;
}

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: themeColor("ink"),
        surface: themeColor("surface"),
        "surface-hi": themeColor("surface-hi"),
        hair: themeColor("hair"),
        fg: themeColor("fg"),
        muted: themeColor("muted"),
        faint: themeColor("faint"),
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-devanagari)"],
        body: ["var(--font-body)", "var(--font-devanagari)"],
        mono: ["var(--font-mono)", "var(--font-devanagari)"],
      },
      backgroundImage: {
        "grid-schema":
          "linear-gradient(to right, rgb(var(--color-fg) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-fg) / 0.05) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
