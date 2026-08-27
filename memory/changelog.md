# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-27 — Pulled the home (Health) screen out of the published "Pebble
  Home" artifact into `Home Tab/Home Tab.html` as a standalone screen, so the
  updated homepage can be merged back into the prototype, and applied the
  owner's three fixes.

  **Type tokens sourced from `Activity Tab/Workout Tab.html`** (owner asked
  for these specific two, pulled from that file rather than invented):
  - Ring labels (`.r3lab`) now use the same token as "SCORE" inside that
    file's hero ring (`.hero .score-cap`) — overlineMedium (11/16, weight
    500, +0.08em, uppercase) on `text-2`. Was paragraphP2Medium (13/18,
    sentence case). `text-transform:uppercase` is part of the overline token,
    so the labels now read SLEEP / READINESS / ACTIVITY — owner confirmed the
    casing change before it went in.
  - Health-monitor unit words (`.hm .unit` / `.hm-sheet .unit`: MS, BPM, °C,
    %) now use the same token as KM and KCAL on that file's Steps · Distance
    · Calories tiles (`.card-metric .unit` / `.stattile .unit`) —
    overlineMedium on `text-3`. Only change was weight 600 → 500; the
    supplied component shipped one weight step heavy. Owner confirmed "metric
    words" meant the units, not the metric names.

  **Health-monitor dots now all read system tokens.** Four already did (HRV,
  Heart Rate, Skin Temp, SpO₂). Stress was the exception: it read
  `--metric-stress`, which resolved to a raw `--aqua-400` (#3DD2F3) Figma
  placeholder with no 0–900 ramp and no entry in `js/tokens.js` at all.
  Stress is now `emerald-400` per the owner, added properly as
  `metric.stress` to BOTH `tokens.json` (the source) and `js/tokens.js` (the
  generated mirror the prototypes read).
  FLAG: `emerald-400` is already `metric.distance`, so two body signals now
  share one hue, against the system's one-hue-per-signal rule. The owner
  chose emerald knowingly; Distance never appears on this screen, so the two
  are never side by side here. Revisit if they ever meet.

  **Two defects found in the artifact and fixed on the way through** (not
  requested, but they were shipping):
  - The artifact had a stray `</style>` mid-file, and the CARD STATES +
    MOTION SAFETY sections were duplicated after it — so ~75 lines of CSS
    were rendering as visible text at the top of the page instead of being
    applied. Kept the copy that was inside `<style>`, dropped the leak.
  - `html{background:#07080C}` was a raw-hex copy of `neutral-900`; now reads
    the token.

  **What was dropped, since this is the homepage only:** the Activity / Sleep
  / Me tabs, the sub-pages, the history calendar, the goal-edit sheets, the
  workout flow, the prototype control panel, and the chart engine. The
  Measure All flow (progress → orb → readings sheet → cooldown) is KEPT — it
  belongs to the Health monitor component on this screen. Also dropped the
  `--gmap-*` palette (raw Google Maps hex, the file's one self-declared
  exception to tokens-only) because only the workout map read it, and trimmed
  `paintScene()` to the home wash alone. Result: no hard-coded colours
  outside the token declarations.

  Consequence of dropping the control panel: the no-data ("empty") state and
  its CSS are still in the file but nothing switches into them. The date
  button under the greeting and the four nav tabs are visual only here.

  Verified in Chromium over `file://`: no console or page errors, all three
  fixes confirmed against computed styles, hero art painted, icons injected,
  and the Measure All flow runs through to the readings sheet.

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
