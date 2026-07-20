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
  brand: "#002D46",       // OFFICIAL brand navy — primary CTA + hero color
                          // also used as primary text (see textPrimary below)
  teal: "#00B9AA",        // OFFICIAL brand teal — ACCENT ONLY (splash, active
                          // tab indicator, brand moments). NOT a domain color.

  // --- Text hierarchy (3 levels) ---
  textPrimary: "#002D46",   // main text — the brand navy, darker than any neutral
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
  // Express these as small dots/labels/ring-fill — NOT by recoloring whole cards.
  good: "#136F63",     // green 600
  caution: "#FE724D",  // orange 600
  info: "#2C82D8",     // blue 600

  // --- Domain colors (which TAB / metric family a thing belongs to) ---
  // Domain is DOMINANT: a card's identity comes from its domain color.
  // Green is intentionally NOT a domain — it is reserved for "good" semantics.
  domain: {
    sleep: "#2C82D8",     // blue 600  — cool, nighttime
    activity: "#FE724D",  // orange 600 — warm, energetic
    health: "#002D46",    // navy      — calm hero, metrics carry the color
    settings: "#002D46",  // navy      — structural, no accent
  },

  // --- Sleep stage ramp (one blue family + grey for awake) ---
  sleepStage: {
    deep:  "#1C538A",   // blue 800
    light: "#5198DF",   // blue 500
    rem:   "#99C3EC",   // blue 300
    awake: "#B3C9D3",   // neutral 400 (desaturated — awake isn't sleep)
  },

  // --- Health sub-scores (recovery = rest/green, strain = effort/orange) ---
  recovery: "#136F63",  // green 600 — wellness/rest signal
  strain:   "#FE724D",  // orange 600 — exertion (intense, not "bad")

  // --- Sleep-tab metric graphs (HR / SpO2 / HRV / Temp during the night) ---
  // On the SLEEP tab these stay in the blue family (context = "your night"),
  // but each takes a DIFFERENT step so the four graphs stay distinguishable.
  // Line = the step below; area fill = same hue at low opacity; axis = neutral.
  // Semantics (a low SpO2 dip, high HR) show as a small dot/band, not a recolor.
  sleepMetric: {
    hr:   "#2C82D8",  // blue 600 — strongest (most-looked-at)
    hrv:  "#5198DF",  // blue 500
    spo2: "#78AFE6",  // blue 400
    temp: "#99C3EC",  // blue 300 — lightest (Qore 2-Band only)
  },

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

  // --- Button hierarchy ---
  // primary = the one main action per screen (navy fill, white text).
  // secondary = supporting action (navy outline, transparent fill).
  // subtle = low-emphasis / tertiary (light neutral fill, navy text).
  // Don't make everything primary — one primary per screen keeps it calm.
  button: {
    primary:     { bg: "#002D46", text: "#FFFFFF", border: "#002D46" },
    secondary:   { bg: "transparent", text: "#002D46", border: "#002D46" },
    subtle:      { bg: "#E3F6FF", text: "#002D46", border: "transparent" },
    disabledBg:  "#CEE3ED",
    disabledText:"#8296A0",
  },

  // --- Fonts ---
  // Geist is your chosen font. The stack ensures something sensible shows
  // before Geist loads. (Make sure the screen loads Geist via a <link>.)
  sans: "'Geist', system-ui, -apple-system, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};