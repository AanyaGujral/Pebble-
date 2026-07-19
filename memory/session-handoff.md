# Session Handoff

**Read this first when you (or Claude) pick up work.** It says what shipped,
what decisions were made, and the exact next steps.

## Current status

- Repo skeleton created. One screen exists: Sleep (in `index.html`).
- `js/tokens.js` still holds PLACEHOLDER colors and fonts — not real brand yet.
- Not yet pushed to GitHub / not yet deployed.

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
