# Changelog

- 2026-09-03 (later) — **S10 Firmware Update built** — the Me tab's second
  inner page, and the first band row that navigates. Twelve states, all
  switchable from the review panel: `up-to-date`, `update-available`
  (release notes, download size, release date, how long it takes, and a
  pre-flight checklist), `downloading` (cancellable — nothing has reached the
  band yet), `installing` (locked: the back button is gone and the action bar
  is empty, because leaving is the thing that breaks a band), `complete`,
  `failed`, `battery-too-low` (blocked with a disabled Update now and the
  band's real 12%), `connection-lost-mid-flash`, `offline` (says the band is
  unaffected — Bluetooth is local), plus `needs-band` and `reconnect`.
  "Update now" runs the real sequence — download → install → restart — with a
  progress ring, a three-step tracker, and a live byte count; when it lands,
  the installed version moves up and the tab's badge dot clears itself.
  Three additions beyond §6, each flagged at its definition: a `checking`
  state (the up-to-date page offers "Check for updates", and a button with no
  visible result is a button nobody trusts), the `reconnect` variant (§5.5
  and T4 both require it on every band page), and the three-step tracker so a
  stall says WHERE it stalled rather than just "failed". §5.3's `updating`
  card state is now driven from this page, so break 1 shows the install too
  and the tab cannot claim the band is idle while it is being flashed. Also
  flagged: §7 holds S10 back to slice 5 — building it now means S05–S09 must
  be checked against its error vocabulary rather than the reverse.

- 2026-09-03 (later) — The Me-tab prototype is now IN THE REPO at
  `Me Tab/me-tab.html`. It had only ever existed as a published artifact (the
  script that generated it never landed), so the repo had no copy at all. One
  file serves both: it opens by double-clicking and publishes as-is.

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-09-03 — Wrote `docs/feature-family-ranking.md` (rev 1, UX proposed): a
  restructure of the legacy Family Ranking flow into **Friends**. Diagnosed the
  two legacy screens (duplicated you-row, ranks assigned to zeroed data,
  unitless figures with no period, ambiguous heart, decorative hero, a friend's
  profile that is your own page complete with "My Homepage" and a
  background-setter). Core move: stop building a parallel app — the entry point
  becomes a fixed-footprint card on Home at the end of the Activity monitor
  section, the friend profile becomes Home's own metric cards in read-only mode
  in Home's order, and the join code reuses the onboarding OTP component. Adds
  eleven hard rules (you appear once; never rank absent data; period always on
  screen; every figure carries a unit; no self-affordances on someone else's
  page; the leaderboard never opens a second copy of your own data), six
  screens, nine combinable F-states, eight components, a four-slice build order
  and a flagged cross-surface dependency (Home's cards need a read-only mode).
  Owner decisions recorded: entry point = Home, sharing scope = all metrics as
  today. That scope makes the invite/join disclosure copy load-bearing, so it is
  specified as a requirement and raised in §9 rather than left to build time.
  Reverses the rev-3 Me-tab cut of Family Ranking by relocating the feature to
  Home, not by restoring the Me-tab row — `docs/feature-me-tab.md` is unchanged
  and still correct. Spec only; no code written.

- 2026-09-02 — Me tab UX spec approved and written to
  `docs/feature-me-tab.md` (rev 3). Structure: flat list, no group headers,
  five silent card breaks; device card leads the tab (image, name, status,
  battery) with the pairing CTA taking its slot when unpaired. Hard rule:
  only the *connected* band exposes band functions, so no device pickers
  anywhere — a second paired band is dormant. 12 nav rows, 5 toggles,
  14 inner pages (S01–S14), 10 tab-level state modifiers (T1–T10), 6
  shared components. Low battery prompt made non-optional (locked on, with
  a reason) — battery discoverability is the device card's job, the prompt's
  job is catching a dying band outside the app. Cut: Family Ranking,
  add-mobile promo (mobile is mandatory at onboarding), One-Key Measurement,
  Developer row, separate Temperature Unit row, Notifications page.
  Flagged as open, not decided: Sign out, Privacy Policy + delete account,
  Cycle, Edit Cards, and the legacy System Setting's language/screen rows.

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
