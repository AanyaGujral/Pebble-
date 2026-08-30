/**
 * Design tokens — health app
 * Generated from tokens-final.json. Do not hand-edit; regenerate from source.
 * Scales: color steps 0 (lightest) -> 900 (darkest), primary at 400.
 * neutral[800] = card background, neutral[900] = app background.
 */

export const color = {
  crimson: {
    '0': '#FFEAED',
    '100': '#FFC2C9',
    '200': '#FD99A5',
    '300': '#F26E83',
    '400': '#E43A62',
    '500': '#C02D50',
    '600': '#9E2040',
    '700': '#7C142F',
    '800': '#5D0820',
    '900': '#3F0112'
  },
  terracotta: {
    '0': '#FFEEE5',
    '100': '#FDCEBE',
    '200': '#F2AF98',
    '300': '#E68F72',
    '400': '#D96F4A',
    '500': '#B65A3A',
    '600': '#93472B',
    '700': '#73341D',
    '800': '#532210',
    '900': '#361104'
  },
  tangerine: {
    '0': '#FFF0DF',
    '100': '#FFDCBA',
    '200': '#FDC894',
    '300': '#FAB36C',
    '400': '#F59E3B',
    '500': '#CA8028',
    '600': '#A16315',
    '700': '#7A4700',
    '800': '#552D00',
    '900': '#331500'
  },
  gold: {
    '0': '#FBF3DE',
    '100': '#F9E8BE',
    '200': '#F7DD9C',
    '300': '#F5D278',
    '400': '#F2C64B',
    '500': '#C6A034',
    '600': '#9C7C1C',
    '700': '#735901',
    '800': '#4D3900',
    '900': '#2A1B00'
  },
  lime: {
    '0': '#EEF8E0',
    '100': '#DCEEBF',
    '200': '#CAE39D',
    '300': '#B8D978',
    '400': '#A6CE4E',
    '500': '#86A839',
    '600': '#688424',
    '700': '#4B620F',
    '800': '#304100',
    '900': '#172300'
  },
  emerald: {
    '0': '#E6F9EC',
    '100': '#C0E8CE',
    '200': '#9BD7B0',
    '300': '#73C693',
    '400': '#43B476',
    '500': '#329560',
    '600': '#22774A',
    '700': '#125B36',
    '800': '#034023',
    '900': '#002611'
  },
  teal: {
    '0': '#E4F9F4',
    '100': '#C1EDE4',
    '200': '#9EE0D3',
    '300': '#76D4C3',
    '400': '#45C7B3',
    '500': '#31A492',
    '600': '#1D8173',
    '700': '#076155',
    '800': '#004239',
    '900': '#00261F'
  },
  sky: {
    '0': '#E7F6FF',
    '100': '#C4E3FA',
    '200': '#A2CFF1',
    '300': '#7EBCE8',
    '400': '#58A8DF',
    '500': '#458ABA',
    '600': '#336E96',
    '700': '#215273',
    '800': '#113952',
    '900': '#032134'
  },
  violet: {
    '0': '#F1F1FF',
    '100': '#D6D4FF',
    '200': '#BBB7FC',
    '300': '#A29AF5',
    '400': '#8A7CEC',
    '500': '#7266C6',
    '600': '#5B50A2',
    '700': '#453C7F',
    '800': '#30295E',
    '900': '#1D163E'
  },
  orchid: {
    '0': '#FEEDFF',
    '100': '#F1CFFA',
    '200': '#E4B1F2',
    '300': '#D692E8',
    '400': '#C873DE',
    '500': '#A65DB9',
    '600': '#864896',
    '700': '#663474',
    '800': '#492053',
    '900': '#2D0E35'
  }
};

export const neutral = {
  '0': '#EFF1F9',
  '100': '#D5D9EA',
  '200': '#B8BDD3',
  '300': '#999FB9',
  '400': '#7B819C',
  '500': '#5E637D',
  '600': '#42465B',
  '700': '#282B39',
  '800': '#0F111B',
  '900': '#07080C'
};

export const surface = {
  app: '#07080C',
  card: '#0F111B'
};

export const textColor = {
  text1: '#EFF1F9',
  text2: '#B8BDD3',
  text3: '#7B819C'
};

/** Metric aliases — components should reference these, never raw hues. */
export const metric = {
  heartRate: '#E43A62',
  hrv: '#D96F4A',
  calories: '#F59E3B',
  steps: '#F2C64B',
  activity: '#A6CE4E',
  distance: '#43B476',
  readiness: '#45C7B3',
  spo2: '#58A8DF',
  sleep: '#8A7CEC',
  skinTemp: '#C873DE'
};

/** Semantic states — glyphs and badges only, never chart lines or fills. */
export const semantic = {
  positive: {
    bg: '#0E2A1B',
    fill: '#1E5B38',
    icon: '#4ADE80',
    text: '#8AF0B0'
  },
  negative: {
    bg: '#331109',
    fill: '#6E2418',
    icon: '#F4604C',
    text: '#FF9184'
  },
  caution: {
    bg: '#2E2103',
    fill: '#6B4E0E',
    icon: '#EFB428',
    text: '#F5CE6F'
  },
  neutral: {
    bg: '#282B39',
    fill: '#42465B',
    icon: '#999FB9',
    text: '#B8BDD3'
  }
};

export const fontFamily = {
  text: "'Google Sans Flex', 'Google Sans', sans-serif",
  numeric: "'Spartan', 'League Spartan', sans-serif",
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};

/** Text styles — Google Sans Flex. Sizes/lineHeights in px. */
export const typeText = {
  headingH1Medium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: '-0.01em'
  },
  headingH1Semibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: '-0.01em'
  },
  headingH1Bold: {
    fontFamily: 'text',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: '-0.01em'
  },
  headingH2Medium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: '-0.005em'
  },
  headingH2Semibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: '-0.005em'
  },
  headingH2Bold: {
    fontFamily: 'text',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: '-0.005em'
  },
  headingH3Medium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: '0'
  },
  headingH3Semibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: '0'
  },
  headingH3Bold: {
    fontFamily: 'text',
    fontWeight: 700,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: '0'
  },
  paragraphP1Regular: {
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: '0'
  },
  paragraphP1Medium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: '0'
  },
  paragraphP1Semibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: '0'
  },
  paragraphP2Regular: {
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: '0'
  },
  paragraphP2Medium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: '0'
  },
  paragraphP2Semibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: '0'
  },
  paragraphP3Regular: {
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: '0'
  },
  paragraphP3Medium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: '0'
  },
  paragraphP3Semibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: '0'
  },
  captionRegular: {
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: '0.01em'
  },
  captionMedium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: '0.01em'
  },
  overlineMedium: {
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: '0.08em'
  },
  overlineSemibold: {
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: '0.08em'
  }
};

/** Numeric styles — Spartan, tabular lining figures.
 *  Apply: fontFeatureSettings: "'tnum' 1, 'lnum' 1" */
export const typeNumeric = {
  num2xl: {
    fontFamily: 'numeric',
    fontWeight: 700,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: '-0.01em'
  },
  numXl: {
    fontFamily: 'numeric',
    fontWeight: 700,
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: '-0.01em'
  },
  numL: {
    fontFamily: 'numeric',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: '-0.005em'
  },
  numM: {
    fontFamily: 'numeric',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: '0'
  },
  numS: {
    fontFamily: 'numeric',
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: '0'
  },
  numXs: {
    fontFamily: 'numeric',
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: '0.01em'
  }
};

export const radius = {
  '4': 4,
  '8': 8,
  '12': 12,
  '16': 16,
  '20': 20,
  '24': 24,
  '28': 28,
  '32': 32,
  '36': 36,
  full: 999
};

export const spacing = {
  '2': 2,
  '4': 4,
  '8': 8,
  '12': 12,
  '16': 16,
  '20': 20,
  '24': 24,
  '32': 32,
  '36': 36,
  '40': 40,
  '48': 48,
  '64': 64
};

export const borderWidth = {
  hairline: 0.5,
  thin: 1.0
};

/**
 * Brand / interactive accent — Pebble teal.
 * These are the values the app's CTAs already use; the workout flow and the
 * Start Workout / Measure All buttons spell them as the CSS custom properties
 * --accent / --accent-press / --on-accent. Naming them here makes that trio
 * part of the system rather than something each prototype re-declares.
 * Flag: teal also appears as metric.readiness, but that alias means "the
 * readiness body signal" — a button referencing it would say the wrong thing,
 * so the accent gets its own name even though the hex matches.
 * Use for buttons, focus and connection states — never for chart data.
 */
export const brand = {
  accent: '#45C7B3',       // teal[400] — primary fill, secondary text + border
  accentPress: '#31A492',  // teal[500] — hover / pressed
  onAccent: '#07080C'      // neutral[900] — label on an accent fill, 9.6:1
};

/** CTA geometry — one pill button, used at this size everywhere. */
export const control = {
  ctaHeight: 48,
  ctaRadius: 999,
  ctaText: 'paragraphP1Semibold'   // 15/22, weight 600, sentence case
};

const tokens = {
  color, neutral, surface, textColor, metric, semantic, brand, control,
  fontFamily, fontWeight, typeText, typeNumeric,
  radius, spacing, borderWidth,
};

export default tokens;
