# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-10 — Built Workout Details screen (`Workout Tab/Workout Details.html`)
  — new standalone page from the owner's wireframes: back/date/share top bar,
  Strength Training header, gold-outlined AI Session Summary card, calories +
  2×2 stat grid (StatTile pattern), and a Heart Rate card with an SVG trace and
  five HR-zone rows (colored bar on hatched track, per the zone reference
  screenshot). Tokens duplicated as CSS variables verbatim from `js/tokens.js`
  because ES-module imports don't work over `file://` (same approach as the
  StatTile preview). Flagged in-file: zone colors have no tokens yet (used a
  heat scale of primitive 400s), zone BPM ranges are invented sample data, and
  the chart trace is white per the wireframe rather than the heart-rate metric
  hue. Placed in its own folder following the existing `Sleep Tab/` convention
  rather than inside `index.html`.

- 2026-07-19 — Initial skeleton created — set up folder structure, tokens.js
  with placeholder palette, and a minimal Sleep screen in index.html that reads
  all colors from tokens. Starting point for a solo prototyper.
