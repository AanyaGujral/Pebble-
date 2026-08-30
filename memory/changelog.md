# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-30 (later still, 2) — Two owner tweaks to the pairing flow:
  * Button labels are TITLE CASE — "Pair Now", "I'll Do It Later",
    "Try Again" ("Cancel" is unchanged, one word). Flag: the workout flow's
    own labels ("End & Save", "Discard") are ambiguous between title and
    sentence case, so this does not contradict it, but if the system settles
    on sentence case later this is the one place to change.
  * Concentric rings lose their hairline stroke on the STATIC screens (pair,
    devices found) and are fills only. The stroke stays on the two animated
    screens (searching, connecting), where it gives the travelling waves a
    defined edge to read against. The centre disc follows the same rule, so
    each state is either fully strokeless or fully stroked rather than mixed.

- 2026-08-30 (later still) — Real Pebble mark dropped into the pairing flow.
  The owner said they had added "pebble logo.svg" to the repo; it is not on
  any branch (nothing named *logo* exists anywhere), so that upload did not
  land. Searching instead turned up the genuine article already committed:
  `assets/onboarding/pebble-mark.svg` on `claude/onboarding-figma-css-8wcynq`,
  which that branch's changelog records as the owner-SUPPLIED SVG, used
  verbatim. Copied to `assets/pebble-mark.svg` on this branch and inlined into
  the flow (inlining is required: the file must open over file://, and the
  published artifact's CSP blocks external images).
  The code-drawn stand-in and its flag are gone from both the prototype and
  the artifact.
  FLAG carried forward, not resolved: the supplied file hard-codes its fill as
  #5BBCB1, which is not a token — it sits between teal-300 (#76D4C3) and
  teal-400 (#45C7B3). The onboarding branch left it hard-coded and raised the
  same question on 2026-08-28. Here the path takes `currentColor` instead, so
  the mark inherits --accent (teal-400) from the ring it sits in and matches
  the rings around it. Still needs an owner decision: does the brand mark pin
  to teal-400, or does #5BBCB1 become its own token? Whichever way it goes,
  this flow changes in one place.

- 2026-08-30 (later) — Corrected the pairing flow against the owner's own
  prototypes (Homepage/start-workout, Workout Tab, tokenised Sleep Tab). The
  first pass invented a CTA pattern; the app already had one and I had not
  found it. Now taken verbatim from the workout flow's `#wf .btn`:
  * Buttons are 48px full-width PILLS (`--cta-height` / `--radius-pill`), not
    52px 16px-radius rectangles.
  * Labels are SENTENCE CASE at 15/22 semibold (paragraphP1Semibold) —
    "Pair now", "I'll do it later", "Cancel", "Try again". The uppercase +
    0.08em tracking is the overline style and was wrong here.
  * Primary = `--accent` (teal-400) fill with an `--on-accent` (neutral-900)
    label, 9.6:1. Secondary = transparent with teal-400 TEXT and a teal-400
    hairline border — previously a neutral outline with white text.
  * Accent custom properties renamed to the system's own names
    (`--accent` / `--accent-press` / `--on-accent`), matching Start Workout,
    Measure All and the discard dialog.
  * The "Let's connect your device" tips block is now a standard card —
    `--surface-card`, `--radius-card` (20px), 16px padding — with neutral
    numerals (text-3) and body copy (text-2). All caution/yellow colour is
    gone, including the unused caution custom properties.
  * `js/tokens.js`: `brand.onAccent` corrected to neutral-900 `#07080C`
    (was teal-900), `accentPressed` renamed `accentPress`, and a new
    `control` export records the CTA geometry (48px, 999px, sentence case).
  Logo: searched all three prototypes plus their embedded assets — there is
  no Pebble mark anywhere in them (all 158 "logo" matches are Phosphor icon
  class names, and the two embedded SVGs are the Phosphor icon fonts). The
  code-drawn mark stays, still flagged, until the real SVG is supplied.

- 2026-08-30 — Built the device-pairing flow as a standalone prototype at
  `Device Pairing/pairing.html`, recreating the owner's light-theme reference
  sheet in the app's current dark language. Five stages — Pair, Searching,
  Devices found, Connecting, Success — plus a "no device found" bottom sheet
  carrying the setup tips and a TRY AGAIN primary CTA. A panel beside the
  phone jumps between stages and picks what the search turns up (multiple /
  one / nothing), so every state is reachable without waiting.
  Decisions, all flagged in code comments too:
  * Added `export const brand` to `js/tokens.js` (accent / accentPressed /
    accentSoft / onAccent). The flow needed a primary-button fill and no such
    token existed. Teal already appears as `metric.readiness`, but that alias
    means "the readiness body signal" — reusing it for a button would say the
    wrong thing, so the brand accent got its own name despite matching hex.
  * This repo had no primary/secondary CTA pattern, so this pair defines it:
    primary = solid brand accent (PAIR NOW, TRY AGAIN), secondary = hairline
    outline with no fill (I'LL DO IT LATER, CANCEL). Uppercase + 0.08em
    tracking matches both the reference and index.html's small-label idiom.
  * No device imagery anywhere — the owner asked for a generic flow covering
    many devices, so the ring set with the Pebble mark carries the moments
    the reference gave to a watch illustration.
  * The reference's pale-yellow instructions panel became a warm tint
    (`--caution-bg` cut with the card surface) rather than a solid slab: at
    full strength the dark-theme equivalent reads as a warning, which is
    wrong for setup help. Numerals keep the full caution colour.
  * The Pebble mark is a code-drawn interpretation of the logo in the
    reference image — swap in the real asset when the owner supplies the SVG.
  * Searching motion is rings pulsing outward from the logo. Every animated
    element is authored so its BASE state is the correct still frame, so the
    reduced-motion gate leaves a complete composition, not a frozen one.
  Verified in Chromium: all five stages plus the sheet render, the full flow
  runs end to end for all three search outcomes, and a stage jumped to by
  hand can't be yanked away by a still-pending timer.

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
