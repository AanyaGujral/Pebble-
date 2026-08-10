# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-10 — Steps / Distance / Calories detail pages added to the Activity
  tab — each chart card now taps through to an internal page with a D/W/M/Y
  switcher, one chart card (same format, colors and scrub/hover states as the
  Activity-tab cards), a dashed daily-goal line on the week/month/year views,
  and a three-block summary row reusing the Activity-tab stat chips
  (Total / Best hour / Active hours on Day; Total / Best day / Goal met on
  Week and Month; Year total / Best month / Goal met on Year). Week shows 7
  axis labels (M–S), month 30 bars with 8 labels, year 12 bars/points (J–D).
  The wireframes' Steps/Distance/Calories pill switcher and bottom explainer
  text were dropped per owner request. Also: `index.html` now holds the full
  Pebble app prototype (previously it was the placeholder single Sleep card;
  the real prototype had only lived in the Claude artifact until now).

- 2026-07-19 — Initial skeleton created — set up folder structure, tokens.js
  with placeholder palette, and a minimal Sleep screen in index.html that reads
  all colors from tokens. Starting point for a solo prototyper.
