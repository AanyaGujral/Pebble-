# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-11 — **Second Activity-tab cross-check: header geometry, icon sizing
  and the phone mock** (owner).
  • Share button pull -12px → **-4px** (spacing.12 → spacing.4). Measured, not
    eyeballed: the back caret's ink lands 19.6px from the left screen edge, but
    the share glyph's landed 17.1px from the right and read as crowding — a
    chevron is optically narrow so it needs the bigger pull, while the share
    glyph fills its box. At -4px its ink lands at 25.1px, matching the Activity
    tab's right-edge control (`.dots-btn`, 24.5px).
  • The preview files now use the **Activity tab's phone mock verbatim** —
    360×780 screen, 10px bezel, 40px/32px radii, 6px neutral-800 outline,
    punch-hole camera — plus the floating nav and gesture bar, so the preview
    finally shows what the real screen shows. Screen bottom padding raised to
    96px to clear the nav, same as `.subpage`. The mock zooms to 0.86 below
    440px so the page never scrolls sideways.
  • Renamed the preview's header buttons `.iconbtn` → `.hdrbtn`. `.iconbtn` is
    already a different component in index.html (36px filled button used in the
    sheets), so the old name would have collided the moment the block was
    pasted in. index.html itself was never affected — it uses `.backbtn` and
    `.wd-share`.
  Confirmed matching, no change needed: the status bar is identical, and the
  header's first content pixel sits at 44px — 32px status strip + 12px — which
  is exactly `.screen-head`'s 44px top padding on the Activity tab.
  Still different, reported to the owner rather than changed: the right-edge
  hit area is 40×40 here vs `.dots-btn`'s 44×44, and `.wd-head`'s gap is 8px
  vs `.sub-head`'s 4px.

- 2026-08-11 — **Cross-checked the workout details page against the Activity
  tab's card-header system** (owner) and corrected three things. The heart
  rate card's number (numL), BPM unit (overlineMedium) and "Average" sublabel
  (paragraphP3Medium, 4px top) already matched `.card-metric` exactly, as did
  the header's flex-start / space-between / 8px gap — no change needed there.
  What changed:
  • `.lc-title` 15/22 → **17/22** (paragraphP1Medium → headingH3Medium), plus
    `white-space:nowrap`. `.card-title` is 17/22 in all 22 places it appears
    and tokens.json describes heading.h3 as "Card titles". Line-height is
    unchanged, so the 216px chart card does not move.
  • Workout stat tile labels and units 600 → **500** (overlineSemibold →
    overlineMedium), matching the Activity-tab chips and the metric
    detail-page tiles. The tile VALUE stays at numL (24/28) rather than the
    chips' numM — owner's call: a 2x2 grid has the width, and the details page
    should read as a bigger moment than a chip on a tab.
  • `.wo-title` on the Workouts card 15/22 → **17/22** + nowrap (owner), so
    every card header in the app is one size. `Activity Tab/Workout Tab.html`
    is deliberately left at 15/22 — it is a snapshot of what was approved on
    2026-08-10 and records that moment.
  Zone names are the one place still at overlineSemibold; they are their own
  component with no Activity-tab equivalent, so they were left as supplied.

- 2026-08-11 — Effort now reads **"Moderate"** (owner), not a 6.4 / 10 figure.
  Strength training is Moderate, Morning run is Vigorous. That makes the tile
  value a word, and `typeNumeric.numL` is the Spartan face, which tokens.js
  scopes to numerals ("tabular lining figures") — so a word cannot take it.
  Added a `.value.word` variant at `typeText.headingH2Semibold`: same -0.005em
  tracking as numL and one size down, which is right for a word beside a
  figure and keeps the row's optical weight even. Flagged in both files.
  Still open: nothing in the system defines the effort bands or the heart-rate
  ranges that produce them — worth pinning down before this ships.

- 2026-08-11 — Workout details header is now **sticky** (owner). The block is
  96px tall and splits in two: the top 32px (spacing.32) is the strip the
  status bar floats over, the 64px below (spacing.64) is the header proper.
  `padding-top:32px` reserves the strip so the header's content box is exactly
  64px and the back button, chip, title and share button centre inside it. The
  header paints `surface-app` instead of sitting transparent, so cards scroll
  cleanly underneath without showing through the clock or the title; the app's
  status bar is z-index 50 and stays above it. Applied to both `index.html`
  (`.wd-head`) and the standalone `Activity Tab/Workout Details.html`, which
  gained a real 32px status bar so the reserved strip is visible. Both verified
  in Chromium at 96 / 32 / 64. Open question for the owner: the header cuts
  content off flat as it passes under — say the word if you want a hairline or
  a fade at the boundary.

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
