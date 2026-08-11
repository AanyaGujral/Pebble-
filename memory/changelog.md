# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-11 — Added `Activity Tab/Workout Details.html` — a standalone,
  **tokenised** preview of the workout details screen, for reviewing it
  against the design system. Opens by double-clicking. Every hard-coded value
  the two supplied components arrived with (`#0F111B`, `24px`, `0.5px`…) is
  now a custom property named after its path in `tokens.json`, with that path
  in a comment on the declaration. A panel beside the phone lists every token
  the screen uses, its value and where it lands. Also has a switcher for the
  two workouts. Four things on the screen have no token and are called out
  rather than absorbed: the 11px numeric style (between numeric.num-xs and
  num-s — used for zone ranges, zone percentages and the scrub timestamp, and
  needed so the header does not jump on press); the 2px x-axis pill corner
  (the component asks for "radius.4 / 2"); `color.neutral.100` on the chip
  glyph where `color.semantic.neutral.icon` (neutral.300) is the token that
  should apply — matched to what index.html does rather than silently
  corrected, owner's call; and the motion durations, since tokens.json has no
  motion scale. Verified in Chromium: no console errors, every `var()`
  resolves, both workouts render and scrub.

- 2026-08-11 — Added the **workout details page** (`#sub-workout` in
  `index.html`), the last of the "exact next steps". Tapping either row in the
  Workouts card on the Activity tab opens it. Header: back button + 40px
  activity icon chip (same chip/glyph as the Workouts rows) + activity name
  with the start–end time beneath + a Phosphor `share-network` button on the
  right; the header frame, the 40px back button and the 20px caret are taken
  from the existing sub-page header unchanged. Then the owner's
  WorkoutStatsTiles component as a 2×2 grid — Duration / Calories / Max HR /
  Effort — then the owner's HeartRateCard (line chart + five zone rows), with
  press-and-drag scrubbing kept.
  Decisions, all flagged in code comments at the point of decision:
  • Header title stepped from 20/26 down to headingH3Medium 17/22 — at 20/26
    the two-line stack out-grows the 40px icon chip and makes this header
    taller than every other sub-head.
  • The two supplied components disagreed on the sample session (tiles said
    max 136, the HR card's curve peaks at 158). Average and max HR are now
    read back off the plotted series, so the tiles, the chart and the zone
    rows cannot drift apart.
  • Tiles come in at radius.24 and the HR card at radius.20 — both as the
    owner supplied them, so the difference is kept rather than harmonised.
  • Calories and Effort cannot be derived from heart rate; they are plausible
    stand-ins awaiting real values. Effort is shown on a 1–10 scale — the
    brief named the tile but not its unit.
  • No recording was supplied for Morning run, so its curve is drawn from a
    fixed warm-up / interval / cool-down profile and its zone times are
    counted off that curve. Strength training keeps the owner's series and
    the owner's hand-counted zone seconds verbatim.
  `share-network` added to the embedded Phosphor set. Verified in Chromium:
  both workouts render, scrub works, and the page scrolls clear of the nav.

- 2026-08-10 — Moved the named snapshot into `Activity Tab/Workout Tab.html`
  (folder layout mirrors `Sleep Tab/`). `index.html` stays the live working
  copy at the repo root. Pushed as is at the owner's request.
  Background PNG: still NOT in the repo — the owner's image has come through
  as an inline preview three times without a file landing on disk, so the
  code-drawn stand-in scene is what ships. The `<img>` slots in both heroes
  still point at `assets/backgrounds/activity-dusk.png` and
  `sleep-night.png`; drop the real files there and they take over with no
  code change. A half-finished rework of the stand-in artwork was reverted
  (owner asked to ship as is) — redo it from scratch if the PNGs never come.

- 2026-08-10 — Owner approved the prototype. Saved a named snapshot as
  `Workout Tab.html` (self-contained, opens by double-clicking; title
  "Pebble — Workout Tab") and pushed the branch to GitHub. `index.html`
  remains the live working copy — edit there, re-save the snapshot when a
  new named version is requested.

- 2026-08-10 (later still) — Detail-page tiles: "Active hours" label
  shortened to "Active hrs" so it stops truncating (applied to distance too,
  same tile), with the now-redundant "hrs" unit dropped from the value;
  hairline borders removed from all detail-page metric tiles. Activity-tab
  chips keep their hairline.

- 2026-08-10 (later) — Detail-page stat tiles switched to the Activity-tab
  chip format (three equal tiles across, 20px radius, hairline border,
  overline label, num-m value, small light unit) per owner screenshot; long
  figures now abbreviate to K/M via `fmtTile` so nothing spills (900,000 →
  900K, 2,739,650 → 2.7M, week 52,240 → 52.2K). W/M/Y chart header reads
  "Average" instead of "Daily average". Activity tab's Workouts card
  replaced with the owner's approved WorkoutsCard component (40px icon
  chips, button rows, Spartan durations, Phosphor carets), reading this
  file's global tokens instead of the component's scoped copies.

- 2026-08-10 — Merged the two working copies: adopted the parallel session's
  version (metric details pages with D/W/M/Y switcher, two-state control
  panel scoped to the Activity tab, goal lines, dotted bar-scrub) as the
  base, then applied the StatTile feedback round: detail summaries now use
  the approved StatTile component (one-line headers, small-light unit text,
  equal-width tiles), steps ≥10k shown in thousands (25.2K-style), Goals
  met as "7 of 30" with a small "of", Active hours on one line ("17 HRS"),
  Best day as small-DAY + big number ("DAY 11"); extra space added between
  detail plots and their X-axis labels (Activity tab as reference); no-data
  state on detail pages keeps tile headers with — and chart frames empty.

- 2026-08-07 (later) — Feedback round: ported the month-scroll history
  calendar, About pages, and goal-setting flows (activity value sheet +
  sleep bedtime dial with draggable handles) from the standalone prototypes;
  added the sleep-continuity expand state ("When you slept" timeline);
  switched all icons to the Phosphor set (path data embedded); Health tab
  now greets "Good morning, Aanya" with three nested rings (sleep /
  readiness / activity); rebuilt the Me tab after the supplied settings
  screenshot (device card, toggles, grouped rows) using tokens throughout.
  Status bar floats over full-bleed tab backgrounds (PNG slots still
  awaiting the owner's image files). Not pushed — awaiting owner approval.

- 2026-08-07 — Rebuilt `index.html` as the full 4-tab app prototype — Android
  phone mockup at 360px with the bottom nav from the supplied screenshot
  (Health / Activity / Sleep / Me). Sleep and Activity recreated from the
  approved standalone prototypes (score rings, hypnogram, vitals line charts,
  goals, week rings, workouts, continuity pills, chart scrubbing, date +
  3-dot menus). Health and Me are first-pass layouts (flagged in comments —
  no spec yet). Added a control panel beside the phone that switches every
  data card between five states: default, loading, syncing, watch-not-worn
  and empty. Colors/fonts mirror js/tokens.js as CSS variables (flagged:
  inlined because file:// blocks module imports).

- 2026-07-19 — Initial skeleton created — set up folder structure, tokens.js
  with placeholder palette, and a minimal Sleep screen in index.html that reads
  all colors from tokens. Starting point for a solo prototyper.
