# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-14 (round 5) — Health monitor replaced with the owner's v4
  component (components/measure-all-cell.html). The in-grid "Measure All"
  cell and its 11-state machine are gone; v4 ships five metric cards, then
  Measure All as a full-width 48px teal pill below the grid (the Start
  Workout pattern) with three states — idle → measuring (the button is its
  own progress surface, 700ms per metric) → 49s cooldown countdown — plus
  the readings sheet that opens on completion (teal wash, blurred reading
  rows, cascade at 3s, outlined Done). Sheet is scoped .hm-sheet/.hm-scrim
  because the app already has .sheet/.scrim for the goal editor, and it sits
  inside .screen so it stays in the phone mockup. Both section headings are
  now 17/22 at medium (headingH3Medium) — flagged: the owner called it a
  paragraph token, but no paragraph style is 17px.
  Token audit against js/tokens.js, missing entries added there and mirrored
  into index.html's :root: metric.stress (the Stress card now reads
  --metric-stress instead of the raw aqua hue — value is still the Figma
  placeholder, no aqua ramp exists yet), radiusRole (card/sheet/row/pill),
  size.ctaHeight, blur.card, motion (durations + easings), layout
  (screen/gutter/card pad + gap), opacity.stateInactive. Flagged in the file:
  tokens.js says "generated, do not hand-edit", so the additions are grouped
  below a marked line for folding back into tokens-final.json.

- 2026-08-14 (round 4) — Home feedback round on the owner's v2 Measure All
  component (replaces v1 at components/measure-all-cell.html — fixed 132px
  cells, tighter rail spacing, idle copy "All 5 metrics · Measure now", CTA
  teal-400 via the --metric-readiness alias, superseding round 3's
  teal-300/11px). Ring scores now League Spartan semibold at 32px (flagged:
  32 isn't on the numeric size scale — owner's explicit spec). Section
  headers sentence-cased ("Health monitor" per owner; "Activity monitor"
  matched for consistency, flagged) and given 24px top spacing. Right-side
  header meta ("Updated 14:20", "64 active mins") pulled in 16px from the
  card edge (owner saw it escaping the page padding). Start Workout is now
  teal-400 with neutral-900 text (9.6:1) at 48px height, and the workout
  card merged under the Activity monitor heading — order: progress card,
  workouts card, then the CTA (separate "Workout" header removed, resolving
  the doubled-title flag).

- 2026-08-14 (round 3) — Home polish from owner feedback: 3-dot menu removed
  from the home header; greeting stepped down to h2 medium (20/26, 500);
  ring scores up to num-xl size (42px) at medium weight — flagged: no
  numeric token pairs 42px with 500, weight overridden from the fontWeight
  scale — with line-height:1 keeping them centered in the rings; hero copy
  made generic ("You're set up for a good day", no sleep reference);
  Health Monitor "Updated 14:20" center-aligned against the heading
  (measurement showed it already sat on the 16px padding — the off look was
  baseline alignment); "Averages from 42 readings today" footer removed;
  Measure All CTA reduced to p3 (11px) and settled on teal-300 for contrast
  (11.4:1 on the cell's surface-app vs 9.6:1 teal-400 / 6.5:1 teal-500) —
  synced into components/measure-all-cell.html too.

- 2026-08-14 (later) — Home page round 2, from the owner's reference image:
  the AI summary is now a plain centered headline + body over the hero
  background (the bordered "Insight of the Day" card is gone); the top
  section gets a code-drawn background — quiet green-teal wash with faint
  speckles fading out exactly at the metrics divide (paintScene 'home',
  no image slot — owner said gradient only). Plugged in the owner's Measure
  All component (saved at components/measure-all-cell.html): five metric
  cards + the Measure All cell with its full state machine, replacing the
  placeholder tiles. ONE requested change applied: the CTA line is teal-400
  instead of the component's green (changed in the component copy AND the
  integrated styles). App no-data state shows the component's first-run
  mode. Ring order / simple-tiles decisions from the earlier round stand
  (owner kept ring order + swapped tiles for this component). Flag: the
  Stress card still uses the component's --aqua-400 placeholder — no stress
  token exists in js/tokens.js yet.

- 2026-08-14 — Rebuilt the Health tab as the HOME page from the owner's
  wireframe: greeting + date picker, then THREE side-by-side score rings
  (sleep / readiness / activity — replacing the nested-rings hero), then the
  AI "Insight of the Day" card; that whole top block sits on the hero
  background (gradient only — owner said no image for this tab). Below, the
  separated card stack: Health Monitor section (simple tiles kept as a
  PLACEHOLDER — the real sparkline-card component is being built separately
  and plugs in here), Activity Monitor card (steps / distance / calories
  progress rows, same data as the Activity tab), a Start Workout pill button
  (visual only), and the approved WorkoutsCard reused verbatim. No chevrons
  or tap-throughs on rings/tiles (owner request). All four nav tabs are now
  clickable and the flow lands on Home. Flags in code: Activity ring is
  lime per tokens (wireframe shows yellow); scores use this prototype's
  sample data, not the wireframe placeholders; insight copy greets Aanya,
  not the wireframe's "Komal"; sparkle/play icons are hand-drawn stand-ins.

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
