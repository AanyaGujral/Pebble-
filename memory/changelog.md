# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-09-01 — Pulled the "No device found" state out of
  `Pebble Onboarding.html` into `Onboarding/no-device-found.html`, so the one
  screen can be looked at without walking the pairing flow to reach it. Worth
  knowing what it actually is: not its own page, but a recovery bottom sheet
  that drops OVER the dimmed "Searching…" screen after the 3.2s search finds
  nothing — cancelling it leaves you where you were, which is why the rings
  are still behind the scrim. Tokens, CSS and markup are copied verbatim from
  the flow file (no new colours or type); the flow file stays the source of
  truth for the flow. Two flagged deviations, both because it is one screen on
  its own: the section starts already visible, and back / Cancel / X close the
  sheet to the plain Searching state instead of returning to the "Let's
  connect your device" screen, which does not exist here. "Try Again" behaves
  exactly as in the flow — search 3.2s, find nothing, sheet returns.

- 2026-08-30 — Onboarding revision round 1 (`Onboarding/onboarding.html`, new
  standalone prototype; nothing in index.html touched). Three changes off the
  review of the Figma frames: (1) the concentric arcs moved from top-right to
  sit behind the logo mark at top-left so the mark and the ambient glow share
  one origin, and the outer arc now doubles as the onboarding step indicator
  (n of 7) — the flow had no progress cue; (2) the mark now appears on every
  onboarding screen and the H1 is pinned to a fixed Y, so the title no longer
  jumps ~65px between step 1 and step 2 (content flows below the subtitle
  rather than being pinned too, so a 2–3 line subtitle can't collide with the
  first card); (3) the disabled CTA rebuilt on --surface-raised (neutral-700,
  the existing alias for the owner's suggested step) with a --text-3 label at
  3.65:1, and the goal cards lifted onto --surface-card + a hairline
  neutral-700 border so they read as surfaces. A BEFORE/AFTER switch in the
  control panel isolates exactly these three deltas; a step slider previews
  any of the 7 steps. Flagged in the file header: teal-300 vs teal-400 for the
  CTA (tokens.js says primary is 400, the Figma frames are 300); --pad set to
  20 from a measurement, not the source file; goal screen assumed to be step 7;
  the logo path is a hand-traced placeholder. No tokens added. The three-ring
  goal preview (each ring on its own metric token) is a PROPOSAL for the empty
  lower half of the goal screen and is toggled off by default.

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
