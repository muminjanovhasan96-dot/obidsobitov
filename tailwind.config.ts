import type { Config } from "tailwindcss";

/**
 * OBID SOBITOV — Design tokens.
 *
 * Quiet-luxury palette. Use the gold accent SPARINGLY (thin lines, small
 * labels, button hovers, active states). No bright or saturated colors.
 *
 * If the client wants to adjust the brand colors, edit the `colors` block
 * below — every component reads from these tokens.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-swapped neutrals (light ivory / dark emerald) — driven by the
        // CSS variables in globals.css so a single [data-theme] flip re-skins.
        base: "rgb(var(--c-base) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        // Fixed warm ivory — for text/icons that sit on dark surfaces in BOTH
        // themes (footer, image overlays, primary buttons).
        ivory: "rgb(247 245 239 / <alpha-value>)",
        // Brand emerald green — fixed in both themes (structure, buttons)
        emerald: {
          DEFAULT: "#0E3B2E",
          deep: "#0A2A21",
        },
        // Metallic gold / champagne — ACCENT ONLY, fixed
        gold: {
          DEFAULT: "#C2A15A",
          hover: "#D8BE86",
        },
        // Hairlines swap tone with the theme
        hairline: "var(--c-hairline)",
        line: "var(--c-line)",
        "line-strong": "var(--c-line-strong)",
      },
      fontFamily: {
        // Refined serif for headings — mapped to a CSS variable set by next/font
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        // Body / UI sans
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        // Wide tracking for uppercase eyebrow labels / nav
        label: "0.22em",
        wider2: "0.3em",
      },
      maxWidth: {
        shell: "1440px",
      },
      borderRadius: {
        // Minimal rounded corners across the system
        DEFAULT: "3px",
        sm: "2px",
        md: "4px",
      },
      boxShadow: {
        // Deliberately subtle — no heavy drop shadows on the light theme
        card: "0 1px 2px 0 rgba(26,33,30,0.04)",
        lift: "0 30px 60px -40px rgba(14,59,46,0.25)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 2.2s linear infinite",
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "marquee-reverse": "marquee-reverse 46s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
