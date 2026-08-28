# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-28 (later) — Owner feedback round on the onboarding flow.
  Logo: dropped in the supplied pebble mark SVG and used it verbatim, on both
  the splash (96px) and the onboarding screen (48px, the size the comp
  specifies). FLAG: its fill is #5BBCB1, which is not a token — it sits
  between teal-300 (#76D4C3) and teal-400 (#45C7B3). Left as supplied; needs a
  decision on whether the brand mark pins to teal-400 or #5BBCB1 becomes its
  own token. Only the mark was supplied, so the "pebble" wordmark on the
  splash is still live text.
  Profile: gender is now a real dropdown (a styled menu with a check on the
  chosen row) instead of a native <select>. Height and weight became picked
  values rather than typed ones — they open the same bottom sheet the Workout
  tab uses for goal setting (X / title / check), with a SECOND scroll column
  for the unit to the right of the number column. The two columns scroll
  independently but share one selection band, so it reads as a single
  selector area. Units are cm/in and kg/lb; switching unit converts the value
  (165 cm -> 65 in, 65 kg -> 143 lb) rather than keeping the raw number.
  Fixed a real bug found in review: the picker columns were being filled while
  the sheet was still display:none, so scrollTop was a no-op and the wheel
  opened on its first value instead of the current one.
  STILL BLOCKED: the onboarding animation. The Claude Design canvas link
  (claude.ai/design/p/...) returns 403 — it is not an artifact URL and cannot
  be fetched. No animation from it is in the build; the flow still has only
  the 180ms cross-fade.

- 2026-08-28 — Built the onboarding flow as a new `onboarding.html`
  (9 screens: Splash, Onboarding, Phone number, OTP, Name, Profile, Activity
  level, Goal, Daily targets). Recreated from the Figma file "Pebble Phase 1"
  (xJtDA8DxHFdb9ipr5L2s5z) by pulling all 16 supplied node ids through the
  Figma MCP connection — real layout, copy and variables, not the frame-level
  CSS that was copied out of Figma first (that only carried width/height/
  background and would have produced 18 empty rectangles).
  The 16 frames collapse to 9 screens because 6 of them are OTP states and 3
  are Name states; both are built as one screen with real state instead of
  separate pages. The OTP screen runs its own 30s resend countdown, invalid
  state, resend toast and paste handling.
  NEW FILE, deviating from "the prototype lives in index.html" — index.html is
  178 KB and covers the signed-in app; onboarding runs before it and shares no
  chrome. It hands off to index.html on the final Continue. Flagged in-file;
  say the word and it folds back in.
  Tokens: added `surface.splash` (#012D46, the splash field — the one screen
  not on surface.app) to `js/tokens.js`. Flagged an unresolved conflict there
  too — tokens.js has text3 = #7B819C but the Figma variable `text/text-3` is
  #999FB9, one step lighter, and every onboarding screen uses the lighter one.
  Onboarding follows Figma; the global token is untouched so the shipped
  Activity/Sleep/Me screens do not shift. Needs an owner decision.
  Assets: the splash logo and onboarding hero could not be downloaded — this
  sandbox has no network egress to figma.com. Both are wired to
  `assets/onboarding/` with code-drawn stand-ins showing until the files land
  (same pattern as the Activity/Sleep backgrounds). The onboarding slot is a
  <video> with the still as its poster, because the owner says the real
  background is video.
  Verified by walking the whole flow in headless Chromium: no JS errors, every
  screen reachable, CTA enable/disable, OTP invalid vs valid, and the target
  steppers all behave.

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
