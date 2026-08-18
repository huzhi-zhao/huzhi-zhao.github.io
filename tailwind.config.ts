import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        elevated: "#181818",
        card: "#1c1c1c",
        faint: "#6f6f6f",
        muted: "#9a9a9a",
        accent: "#1dbf73",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: { container: "1180px" },
      animation: {
        pulseRing: "pulseRing 2s infinite",
        blink: "blink 1s step-end infinite",
        meteor: "meteor 5s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(29,191,115,.55)" },
          "70%": { boxShadow: "0 0 0 7px rgba(29,191,115,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(29,191,115,0)" },
        },
        blink: { "50%": { opacity: "0" } },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 0.5rem))" },
        },
        scroll: {
          to: { transform: "translateX(calc(-50% - 0.375rem))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
