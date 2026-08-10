# Session Handoff

**Read this first when you (or Claude) pick up work.** It says what shipped,
what decisions were made, and the exact next steps.

## Current status

- Repo skeleton created. Screens: Sleep (old skeleton in `index.html`, richer
  version in `Sleep Tab/`), Workout Details (`Workout Tab/Workout Details.html`).
- `js/tokens.js` now holds the real Pebble tokens (color ramps, metric aliases,
  Google Sans Flex / Spartan type scales, spacing, radius).
- Note: `js/tokens.js` is an ES module, so standalone screens copy the tokens
  in as CSS variables (see the comment at the top of the Workout Details page).
  `index.html` still expects the old `window.T` placeholder shape, so it no
  longer restyles correctly — migrate or retire it.

## Decisions made

- Kept everything in a single `index.html` for now (no build step, no server).
  Easier for a novice; split into multiple screen files later if it grows.
- Using Inter font as a placeholder until real brand fonts are supplied.

## Exact next steps

1. Replace placeholder values in `js/tokens.js` with real brand colors + fonts.
2. Open `index.html` in a browser and confirm it restyles from the new tokens.
3. Push to GitHub with GitHub Desktop, then enable GitHub Pages for a live URL.
4. Build the next screen (Activity or Stress) reusing the same tokens.

## Known limitations

- Only one screen. No navigation between screens yet.
- No icons system yet (the PDF had an icon registry; add when needed).
