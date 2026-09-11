# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-09-11 (round 4) — `Readiness/Readiness flow.html` created: the homepage
  flow file with the bottom nav bar removed (owner request). Nav markup kept
  hidden so showTab() still marks Home current; the 96px reserved for the bar
  drops to 32px. Source of truth stays the homepage flow file — regenerate
  this one after edits there. Preview artifact now serves this build.

- 2026-09-11 (round 3) — Readiness hero checked against the Workout Tab
  hero ring (Activity Tab/Workout Tab.html): geometry, stroke, gradient,
  glow and numeral already identical; the cap under the number now reads
  SCORE like that ring (spec §5 had READINESS — flagged in code). Hero →
  card-stack handoff made visible as on the Workout page: the readiness
  ground lifts to a deep teal (teal-900 at 55% over neutral-900) in its lower
  half so the stack's 24px rounded top reads against it; the bottom scrim
  is dropped there because it faded to surface-app and erased the edge.
  FLAG: the Figma frame is flat neutral-900 to the bottom — this lift is the
  minimum that shows the edge the owner asked for.

- 2026-09-11 (later) — Readiness page, feedback round 2. (1) Health and
  activity monitor rebuilt as the Home Health-monitor tiles (.hm .card, 2-up,
  132px, dot + overline label, 24px numeral, unit in caps — BPM / MS / °C —
  caret or neutral dot, 13px footer). (2) Trend chart now runs on the app's
  chart engine (drawLine + attachScrub, the port of
  components/Charts/line-chart.html): press-and-drag reads that day's score
  and date into the card header and snaps back; the dashed window average is
  drawGoal, unlabelled on the plot (the header's "avg N" names it; a plot
  label sat on the line wherever the data crossed the average). drawGoal
  gained an optional cfg.goalLabelAt:'start'; default unchanged. Window
  pills shrunk to 32px / 13px. (3) Calibrating state added to the control
  panel (day 3 of 7): hero copy swaps on Home and Readiness ("Getting to know
  you" / "Still learning your baseline"), a calibrating chip (same component
  as the syncing chip) appears under the summary, the confidence line reads
  "Low confidence · baseline still forming", a callout card with a 7-segment
  day meter tops the stack, the trend shows only the 3 recorded days with the
  pills parked. setState() now swaps hero copy for any state that has copy,
  not only empty.

- 2026-09-11 — Readiness page, owner feedback round 1 (preview artifact
  published). Header: calendar icon removed; 3-dot menu added top right with
  About readiness (Related card at the bottom removed). Background rebuilt to
  the Figma "Home page bg" frame (node 927:4897): flat neutral-900 — the
  Figma fill #07080C is that token exactly — plus one teal glow top-right.
  FLAG: the glow vector could not be downloaded from this environment, so it
  is a token radial-gradient matched by eye; an <img> slot at
  assets/backgrounds/home-page-bg.svg takes over when the export is dropped
  in. What shaped today's score: icons are fills in the Home workout card's
  chip (.wo-chip 40px / .wo-glyph 20px neutral-100). Numbers are never
  coloured now — a caret (Home's hmTri soft triangle, positive/negative tone)
  sits to the right of every number, a neutral dot (.dot-flat) when
  unchanged; the hero delta uses the same caret. "Since yesterday" renamed
  "Health and activity monitor" with today's value + caret. How to use today:
  circle removed, sparkle alone with a teal-300→teal-500 gradient fill,
  padding 20px, three grey tags on one line (Go easy · Walk 20 min · Early
  night — static, not toggles). Audit against created designs: trend axis
  labels now use the shipped .axis (10px) instead of 13px; title-less cards
  drop the hairline above their first row; menu offset for the shorter
  .sub-head. Preview: https://claude.ai/code/artifact/2207ff9c-444e-4cbb-8935-c6c8e9ff292d
  (opens on the Readiness page; rest of the prototype intact).

- 2026-09-10 (later) — Readiness page rebuilt to the owner's wireframes,
  modelled on the Sleep/Activity tab heroes: painted background (the Home
  teal scene reused via paintScene, own gradient id), 136px ring, band chip +
  "↑ 5 vs yesterday", AI headline + summary, "Medium confidence · day 14".
  Header is back · date · calendar — the date opens the SHARED month calendar
  (new CAL_CFG.readiness, teal chrome) and writes the one global date.
  FLAG: spec §4.5 said no picker on Readiness; wireframe shows one, so it is
  in, but it never holds a private date. New cards: Last 30 days trend
  (7d/14d/30d pills, dashed window average, max/min labels, line in readiness
  teal — wireframe had white, flagged), What shaped today's score (four rows
  with icon tile, reason line and toned sub-score — replaces the six bar rows
  from spec §5.1, wireframe wins), Since yesterday (RHR / HRV / skin temp /
  steps with toned deltas), How to use today (tinted guidance card, plan chips
  as toggles — flagged, wireframe shows static pills). Related + About rows
  kept at the bottom (spec §5.2/5.3, not in the wireframe — flagged).
  FLAG: sample numbers are 73 / Good, not the wireframe's 40 / Rest, because
  Home shows 73 and one metric must show one value everywhere. Three Phosphor
  glyphs (pulse, calendar-blank, sparkle) added from memory — re-copy from
  the package before shipping. No-data: ring --, trend line hides (frame and
  labels stay), scores and values to —, guidance card hidden.

- 2026-09-10 — Readiness page + Home ring navigation, built to the owner's
  spec (`docs/feature-readiness-ring-navigation.md`, rev 1) in
  `Homepage + measurel all + start workout flow.html` — the file the spec
  was verified against (index.html untouched; flagged, since CLAUDE.md names
  index.html as the prototype).
  (1) The three Home rings are now `<button>`s: Sleep → Sleep tab, Activity →
  Activity tab (`data-goto`), Readiness → new `#sub-readiness` page
  (`data-open`, pushed over Health so Health stays lit). No new JS — both
  listeners already existed. aria-label carries the score and switches to
  "not available" in the no-data state; a ring always navigates. FLAG: this
  reverses the 2026-08-14 "no tap-through" decision, deliberately per spec
  §9.1 — the old markup comment was rewritten in the same change.
  (2) `#sub-readiness`: back header, read-only date line (overline, text-3),
  136px teal ring with 56px numeral + READINESS cap, headline/summary,
  Contributors card (six .goalrow + .gbar rows: sleep, HRV, resting HR, skin
  temp, SpO₂, previous-day activity — colour dots in the icon column, flagged:
  no Phosphor pulse/drop glyphs in the file), Overnight vitals 2×2 StatTile
  grid, Related rows to Sleep / Activity (data-goto closes the page too) and
  an About readiness row. No D/W/M/Y switcher on purpose.
  (3) `#sub-about-readiness` added AFTER `#sub-readiness` in the DOM (stacking
  is document order) — back twice returns to Home.
  (4) Shared date model: `selDate` collapsed from one cursor per tab to one
  app-level value; picking a day updates every `[data-datelabel]` and the new
  Sleep night note ("Night of Aug 5–6" — the night ENDING on the selected
  date; copy flagged as new, spec §9.6). Calendar chrome per entry point is
  unchanged.
  (5) No-data state for Readiness: `--` at text-3 in the ring, bars at zero
  width, headline/summary swapped via the existing setState() mechanism
  (heroRest now also collects `#sub-readiness`).
  Verified headless: date back 3 days on Home → each ring lands on that date;
  Readiness → Sleep cross-link → back returns to Home, not Readiness.
  Still open (need owner): --state-press token for the .8 press opacity; one
  global focus treatment (nav vs button); whether the hero date line is
  preferred over a date-btn in .sub-head (spec §9.2, §9.3, §9.7).

- 2026-09-03 (rev 2.2) — Owner round of eight on the leaderboard.
  (1) Hero band is now the Pebble green — built from the teal ramp
  (teal.400 wash over a teal.500 → surface.card gradient) rather than the
  metric.readiness alias, because the aliases stand for body signals and this
  is brand chrome; flagged in code and in §9.
  (2) Today / 7 days segmented control removed — this build has no period
  switch. S.period is pinned to 'today'. FLAG: the week figures and the
  "7 days" labels on the friend profile still exist in the model.
  (3) Placings are ordinal — 1 · 2 · 3 down the board, never 1 · 2 · 2. Rev 2
  shared a rank between equal figures, which left the podium with no third
  place. FLAG: equal figures now take adjacent numbers and the order between
  them comes from the sort, which is arbitrary; a real tie-break needs a field
  in the model (sync time is the obvious one).
  (4) Steps glyph on the Home card is white (text.1), not the steps hue.
  (5) Fixed the sticky you-card surviving onto Home: the back tap hid the
  subpage without telling the card, so it floated over the Health tab. Back
  now calls renderYouCard(). The card is leaderboard-only, as specced.
  (6) "Friends" → "Family ranking" everywhere it is user-facing: page title,
  sub-header, Home card title, the solo-state card.
  (7) The date row replaces the period pill — "Today · 4 of 4 synced ·
  updated 14:20" with a chevron on the right; the whole row opens the
  month-scroll calendar the other tabs already use.
  (8) Leaderboard row rebuilt as one flex line. The row was a two-row grid
  and both the avatar and the cheer button spanned both rows, so row 2 existed
  even with no reason line and rank / name / figure sat 13px above the row's
  real middle — measured, not guessed. Everything now centres on one line, the
  reason line moved inside .who under the name, and the chip is the shipped
  28px .av.sm ("profile circle can be smaller") — no new size added. The
  you-card took the same 28px chip so your row matches the others.
  Row height is still set by the cheer control's heart-over-count stack
  (50px); left as specced rather than laid out horizontally, since that would
  change component 7.3.
  Not touched: docs/feature-family-ranking.md still describes the period
  control, the shared-rank tie rule and no hero band — three deltas to fold in
  when the spec next gets a pass.

- 2026-09-03 (rev 2.1) — Leaderboard UI pass on owner feedback ("the rows are
  crammed", "make the top half a background colour that works for dark mode",
  "make the list distinct with spacing"), with two reference boards supplied.
  Three changes: (1) new `.lb-hero` band holds the header, period control and
  podium on one tinted surface — surface.raised → surface.card gradient with a
  radial wash of metric.steps at 17%, curving off at radius.sheet so the list
  reads as a separate region (the references use a flat bright fill; at that
  brightness in dark mode it would fight every numeral on it, so the band is
  the same idea one notch down, and the hue is the metric the board ranks on).
  (2) Podium columns now stretch to equal height, so avatar/name/figure land
  on one baseline and the winner's figure no longer collides with the plinth
  beside it; plinths 68/56/48 and nearly touching, first place marked by a
  metric.steps ring on the avatar as well as the plinth. (3) Every list row is
  its own surface.card card at 14px padding with 10px between them (`.lb-list`),
  not-synced rows a step quieter, and the sticky you-card carries a
  metric.readiness tint so your own row is findable without reading it — the
  green "You" row in the reference. Podium moved to its own mount (#lb-podium)
  so the band can own its background. All colours mixed from tokens; no new
  token added.

- 2026-09-03 (rev 2) — Reworked the Friends flow after an owner review, and
  updated `docs/feature-family-ranking.md` to rev 2 alongside the prototype so
  the two do not drift.

  The change that drove the rest: **v1 creates no group.** A code is a personal
  handle — someone who enters yours appears on your leaderboard and you appear
  on theirs, and nothing exists that you both belong to. So "circle" is out
  everywhere, along with "group", "member", "join a…" and "leave". Consequences
  written into §3: leaderboards are personal and two friends' boards differ, so
  no copy may imply one shared standing; there is nothing to leave, so the Leave
  action and its confirm sheet are cut and removal is instead **mutual**, which
  the remove confirm now says out loud; sharing a code and entering one are the
  same act from two ends; and the disclosure is symmetrical ("you'll each be
  able to see…"), which is also what makes the exchange feel fair. Rev 1's
  join preview announced "Koms's circle · 5 people" — it asserted a group the
  product does not have and would have set the wrong expectation about who can
  see you. It now previews the one person the code belongs to.

  Also from the review: an **educational first-use state** (§4.6) that teaches
  the model in three numbered lines, puts the user's code in the open rather
  than behind a sheet, and offers both ways in; a **1-2-3 podium** at the top of
  the leaderboard, replacing the legacy decorative photo hero; **no progress
  bars** on leaderboard or Home card rows — figure plus the steps glyph at the
  right end instead, the glyph acting as the unit; the **sticky you-card is now
  always on** rather than appearing only when your row scrolled away, and you
  are no longer rendered in the scrolling list at all, so the card *is* your
  row; and **two header actions** (share your code / enter a friend's code)
  restored on the right of the leaderboard header.

  Two things flagged rather than quietly accepted. Rev 1 collapsed those two
  header icons into one on purpose, because the legacy screen's pair was
  indistinguishable; the app's Phosphor set has no `share-network` or `sign-in`,
  and the closest glyphs it carries (`arrow-circle-up`, `plus`) are not
  distinguishable enough — both buttons carry aria-labels and both destinations
  name themselves, but the real glyphs need adding before this ships. And
  whether a code is transitive — if two people use mine, do they see each other?
  — is now the top open item in §9, because the join preview copy depends on it.

  New hard rule 2, found by building it: **the podium holds the top three
  people, not the ranks 1/2/3.** With a tie those are different things. Ranks
  1, 2, 2 has no third place, and reserving a plinth for one dropped the second
  second-placer off the screen entirely — too high for a list starting at rank
  4, with no plinth to stand on. Plinths now carry each person's own rank
  numeral, which may repeat, and the list picks up from the fourth *person*.
  The headless pass now asserts that every person with a figure appears exactly
  once across podium, list and sticky card, in every state, ties included;
  that check is what caught it.

  Other fixes from the same pass: the Home card's fixed footprint was a
  `min-height`, so the solo state's copy wrapped to an extra line and pushed it
  18px taller — it is a fixed height now, since hard rule 10 means copy has to
  fit the card rather than the reverse; "You" was showing in the friends list
  (and as "You (you)"), which stopped making sense once there was no group to
  be a member of; and the 1st-place plinth's tinted fill read as olive-brown
  over the near-black surface, so height and the larger avatar carry the placing
  and the plinth only names it. Not pushed.

- 2026-09-03 (later) — Built `Friends/friends.html`, the prototype of the
  Friends flow, to `docs/feature-family-ranking.md` rev 1. Six screens (Home
  with the Friends card at the end of the Activity monitor section, leaderboard,
  friend profile, add-people sheet, join, circle members), eight components with
  every state, and a control panel that switches all nine F-states. Reuses
  rather than rebuilds: `.card`/`.card-head`, the `.gbar` bar from Today's
  goals, `.listrow`/`.chev`, the `.seg4` period pill, the 40px chip from the
  Workouts card, the month-scroll calendar, the onboarding OTP boxes, the Me-tab
  sheet pattern, and the four button tiers. Phosphor path data copied verbatim
  from the Homepage prototype; the regular-weight heart is the only new glyph
  and is flagged for verification against @phosphor-icons/core.

  Verified against §10 of the spec with a headless-browser pass rather than by
  eye: exactly one you-row in all seven states that have a circle, zero rank
  numerals on not-synced rows, ties rendering 1-2-2-4, the Friends card at 246px
  in all six of its states, the period control pinned at full scroll, cheer
  going idle → pending → done, your own row not opening a friend profile, no
  email or self-affordance anywhere on a friend's page, and no hex value outside
  the token block.

  Six real bugs found and fixed in that pass: (1) grid places definite-row items
  before auto-placed ones, so the cheer button was claiming column 3 and
  dropping each name on top of its figure — every leaderboard cell now names its
  column; (2) the identity block and the resolved-circle preview stacked their
  lines as inline spans, running name, rank and sync together; (3) inner-page
  content sat under the floating nav; (4) "you" was a data state, so in F5 your
  own row lost its highlight in the Not synced break — it is now an identity
  flag that composes with the data state; (5) the you-bar was a child of the
  scrolling page, so `bottom:88px` measured from the content box and the bar
  scrolled away — it now belongs to the screen and docks above the nav pill,
  and its visibility test uses the page's own scroll geometry instead of
  viewport rects; (6) the scroll listener that drives it was lost when the
  script was written in chunks, so the bar had never once appeared. Also
  demoted two teal buttons that broke the one-primary-per-screen rule (the
  Home no-circle CTA and Copy in the invite sheet) and named the real
  `--metric-stress` / `--metric-skin-temp` tokens instead of borrowing
  neighbouring aliases. Sample data carries a deliberate tie and two unsynced
  members so those rules are visible rather than asserted. Spec's §9 open items
  are flagged in code comments at the point of decision. Not pushed.

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
