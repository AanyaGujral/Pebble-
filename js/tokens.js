/*
 * tokens.js — SINGLE SOURCE OF TRUTH for colors, fonts, spacing.
 *
 * This is the most important file in the repo. Every screen pulls its colors,
 * fonts, and spacing from here. Change a value here and the whole prototype updates.
 *
 * HOW TO USE:
 *   - A flat color:      T.bg, T.brand, T.textPrimary
 *   - A step in a scale: T.purple[600], T.green[100]
 *   - Spacing/radius:    T.space[4], T.radius.card
 *
 * Hex codes look like "#1a2b3c". Fonts are just font names as text.
 */

window.T = {
  // --- App-level surfaces ---
  bg: "#EFFAFF",          // app background (your chosen page bg)
  surface: "#FCFEFF",     // card / panel background
  border: "#DDE6EC",      // hairline borders (light, derived from neutrals)

  // --- Brand + hero ---
  brand: "#012D46",       // primary brand / hero color (dark navy)
                          // also used as primary text (see textPrimary below)

  // --- Text hierarchy (3 levels) ---
  textPrimary: "#012D46",   // main text — darker than the darkest neutral
  textSecondary: "#3F4D54", // labels, sub-headings (darkest neutral)
  textMuted: "#6A7D86",     // dimmed text, units, captions

  // --- Neutrals / greys (10 steps, from your palette, light → dark) ---
  neutral: {
    "50":  "#FCFEFF",
    "100": "#EFFAFF",
    "200": "#E3F6FF",
    "300": "#CEE3ED",
    "400": "#B3C9D3",
    "500": "#9AAFB9",
    "600": "#8296A0",
    "700": "#6A7D86",
    "800": "#54656D",
    "900": "#3F4D54",
  },

  // --- Purple (brand-adjacent accent). primary 7765E3 / light D9D4F7 ---
  purple: {
    "50":  "#F0EEFC",
    "100": "#D9D4F7",
    "200": "#CAC3F4",
    "300": "#B7ADF0",
    "400": "#A397EC",
    "500": "#8D7DE7",
    "600": "#7765E3",
    "700": "#6253BA",
    "800": "#4C4191",
    "900": "#362D66",
  },

  // --- Green = GOOD / success. primary 136F63 / light B3F6DE ---
  green: {
    "50":  "#E1FBF2",
    "100": "#B3F6DE",
    "200": "#9BE2CC",
    "300": "#7BC7B3",
    "400": "#5BAC9A",
    "500": "#368D7E",
    "600": "#136F63",
    "700": "#105B51",
    "800": "#0C473F",
    "900": "#09322D",
  },

  // --- Orange = CAUTION. primary FE724D / light FFD7CC ---
  orange: {
    "50":  "#FFEFEB",
    "100": "#FFD7CC",
    "200": "#FFC8B9",
    "300": "#FFB4A0",
    "400": "#FE9F86",
    "500": "#FE8869",
    "600": "#FE724D",
    "700": "#D05D3F",
    "800": "#A34931",
    "900": "#723323",
  },

  // --- Blue = INFO. primary 2C82D8 / light D4E6F7 ---
  blue: {
    "50":  "#EEF5FC",
    "100": "#D4E6F7",
    "200": "#BBD7F2",
    "300": "#99C3EC",
    "400": "#78AFE6",
    "500": "#5198DF",
    "600": "#2C82D8",
    "700": "#246BB1",
    "800": "#1C538A",
    "900": "#143A61",
  },

  // --- Semantic status colors (point at scale steps above) ---
  // Change the mapping here, not the raw hex, so status stays consistent.
  good: "#136F63",     // green 600
  caution: "#FE724D",  // orange 600
  info: "#2C82D8",     // blue 600

  // --- Spacing scale (in px). Use for padding, gaps, margins. ---
  // T.space[4] = 16px is your default comfortable unit.
  space: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
  },

  // --- Corner radius ---
  radius: {
    sm: "8px",
    card: "16px",  // default card corner
    lg: "24px",
    pill: "999px", // fully rounded (toggles, chips)
  },

  // --- Fonts ---
  // Geist is your chosen font. The stack ensures something sensible shows
  // before Geist loads. (Make sure the screen loads Geist via a <link>.)
  sans: "'Geist', system-ui, -apple-system, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};