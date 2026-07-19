/*
 * tokens.js — SINGLE SOURCE OF TRUTH for colors and fonts.
 *
 * This is the most important file in the repo. Every screen pulls its colors
 * and fonts from here. Change a value here and the whole prototype updates.
 *
 * Replace the placeholder values below with YOUR brand colors and fonts.
 * Hex codes look like "#1a2b3c". Fonts are just font names as text.
 */

window.T = {
  // --- Core palette (replace these with your brand colors) ---
  bg: "#0f1115", // page background
  surface: "#1a1d24", // cards / panels sitting on the background
  text: "#f5f6f8", // main text color
  muted: "#9aa0ab", // secondary/dimmed text
  border: "#2a2e37", // hairline borders

  // --- Brand + accents ---
  brand: "#4f8cff", // your primary brand color
  accent: "#ff6b6b", // a highlight/accent color

  // --- Semantic status colors ---
  green: "#3ecf8e", // good / success (e.g. "status OK")
  yellow: "#ffd166", // caution
  red: "#ff5d5d", // alert / high

  // --- Chart colors (used for data visualizations) ---
  chart: {
    primary: "#4f8cff",
    secondary: "#a78bfa",
    tertiary: "#3ecf8e",
  },

  // --- State moods (the PDF used relaxed/focused/stressed) ---
  relaxed: "#3ecf8e",
  focused: "#4f8cff",
  stressed: "#ff6b6b",

  // --- Fonts ---
  // Use Google Font names, or a system fallback. The stack ensures something
  // sensible shows even before a custom font loads.
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};
