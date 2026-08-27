# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-27 — Built the first-run onboarding flow as `onboarding.html`
  (self-contained, opens by double-clicking). Nine screens: splash → sign-in →
  enter code → you're in → 4 profile steps → mock Home hand-off, plus a
  control panel beside the phone for every state (OTP wrong/expired, resend
  running/at-zero/60s lockout, CTA loading, step-1 validation, and the
  delivery states — no network / SMS undelivered / rate limited).
  Built to the owner's build spec (D01–D27). Owner decisions taken up front:
  (1) splash + sign-in follow the OWNER'S design — navy splash with the mark
  and wordmark, photo-loop sign-in with the floating card, "Your health, your
  way", one country+number pill — but keep the spec's copy rules, so the CTA
  reads `Continue`, not `Get OTP` (D21); the spec's rings, indeterminate track
  and version line are dropped. (2) The three-image 5-second loop runs on the
  SIGN-IN SCREEN ONLY. (3) The delivery/network states were built even though
  spec §9 listed them out of scope. (4) `Finish setup` hands off to a mock
  Home empty state inside the same file, band-pairing card pinned at the top.
  D25 built the NEUTRAL way (raised fill + neutral hairline ring, no tint);
  the teal variant is a three-line swap via `--ob-selected-ring` /
  `--ob-selected-mark` / `--ob-selected-seg`.
  Maths reproduces the spec's example exactly — female, 165 cm, 61 kg, born
  12 Apr 1998, lightly active, maintain → BMR 1340 · 8 000 steps · 5.5 km ·
  500 kcal ACTIVE BURN (not the wireframe's 1 840, which is a TDEE intake
  budget — D16). Verified in Chromium across all nine screens: no page errors,
  every numeral League Spartan with tnum, every unit text-face uppercase,
  focus ring on every control, one tab stop per radio group with arrow keys,
  no slide/shake/spinner under reduced motion, and no clipping at 200% type.
  Flagged in code rather than decided silently: the navy splash ground uses
  `--sky-800` as brand ground, which house rule 3 otherwise reserves ("nothing
  else in the chrome takes a hue"); the spec's own §2.3 vs §3.4 conflict over
  Google/Apple buttons resolved to `.btn-neutral` per §2.3's stated reason;
  the sign-in headline stays on the h1 token (24/30) although the owner's
  screenshot is optically larger — a bigger display size needs a new token in
  `js/tokens.js` first; the pebble mark and wordmark are code-drawn stand-ins;
  steps derived from a distance edit round to the nearest 100.
  Sign-in photos are NOT in the repo yet — slots are wired to
  `assets/onboarding/signin-1/2/3.png` (see the README there); token gradients
  show until the files land.

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
