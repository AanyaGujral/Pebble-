# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-26 (feedback round) — Workout flow, first round of owner fixes.
  * Choose activity overlay: close X has no circle behind it, title is
    sentence case, the section labels lost the hairline running out to the
    edge, activity glyphs switched to Phosphor FILL weight, and activity
    names are now paragraph p1 regular (15/22, weight 400) instead of
    heading h3 semibold.
  * Live screen: the three sub-metrics are three separate boxes with the
    label uppercase on top and the figure under it, per the owner's stat-box
    screenshot — not one card split by hairlines.
  * Workout details rebuilt to the approved Workout details screen
    (artifact 1a19949a): sticky blurred header (back · icon chip · name +
    time · share), stat tiles at radius 24 with uppercase labels, and one
    heart-rate card holding the smoothed crimson chart — press and drag to
    scrub, the header swaps to that reading — over five zone rows with bpm
    ranges, percentages, mm:ss and goal-bar rails. The Session Summary card,
    the calories hero and the hairline-divided stat grid from the first pass
    are gone. Everything still reads from the session that just ran.
    Tiles extend the approved four to six so the activity's own metric
    shows: GPS gets distance / duration / avg pace / calories / max HR /
    effort, everything else gets its third metric / duration / calories /
    avg HR / max HR / effort.
  * Map (GPS activities only, on the live screen and the saved session):
    redrawn in the Google Maps idiom — land, built-up blocks, side streets,
    through roads, an arterial, a park and the river, all from neutral and
    hue-900/700 tokens — with the route in teal-400 and a hairline
    neutral-700 border on the card.
    A real Google Maps tile CANNOT load here: an artifact page can only
    reach Google Fonts (CSP), the Static Maps API needs a key, and every
    tile host is blocked by this environment's proxy. So the card carries an
    <img> slot pointed at `assets/maps/route-newdelhi.png` — drop a real
    map screenshot there and it takes over the basemap automatically, with
    the teal route still drawn on top (same pattern as the hero PNGs).
  * Also: Android gesture bar added to the phone chrome; the details page
    scrolls under a floating nav pill rather than sitting above a docked one.

- 2026-08-26 — Built the workout flow as a new standalone prototype,
  `Workout Tab/Workout Flow.html` (owner's call: the Pebble Home artifact
  stays untouched, so this ships as its own link). Screens: Home stub with
  the Start Workout CTA -> Choose Activity (search filters by name, empty
  state reads "No results found") -> 3-2-1 countdown (each number lands large
  and settles smaller) -> live workout -> pause (Discard / End & Save appear
  at the top) -> discard confirmation -> workout details.
  Decisions and deviations, all flagged in the file too:
  * Heart rate is the live screen's hero, in neutral text-1 on the app
    background (owner's call) — NOT the crimson HR hue, and not the timer the
    screenshot made the hero. Duration, calories and the per-activity third
    metric sit in a card below it.
  * 26 activities, A–Z, each with its own third metric: km for the distance
    ones, reps/poses for strength and mat work, rounds for HIIT and boxing,
    laps, floors, steps, breaths, routes. Most recent seeds with the five from
    the owner's screenshot and re-orders as sessions are saved.
  * Teal-400 carries the flow's controls (countdown numeral, pause/play,
    End & Save, dialog primary) because the spec names teal for the discard
    dialog. The owner's screenshots show a mint green — tokens won.
  * Walking, running, cycling, hiking, skiing and snowboarding get a
    code-drawn GPS map on both the live screen and the saved session; the
    route reveals in step with elapsed time. Nothing is fetched, so it works
    offline.
  * The details page reuses the approved Workout Details structure (identity,
    gold Session Summary, calories + stat grid, HR chart, five zones) but
    every number is read back from the session that just ran: averages, max,
    zone split, chart trace, pace. Zone times switch to seconds under five
    minutes so a short session doesn't read "0 min". Summary copy is
    templated from those numbers, not a model call.
  * Zone bpm ranges were dropped from the zone rows — at 360px the longest
    zone name plus a range can't hold one line.
  * Nav bar keeps the supplied component's Health / Activity / Sleep / Me
    labels, not the Today / Sleep / Activity / Me in the details screenshot.
  * Discard returns to the home screen (the spec doesn't say where it lands).
  * A preview-only panel beside the phone switches the workout clock between
    real time and 1 second = 1 minute, so the details page can be reviewed
    with a full-length session.
  Icons are Phosphor (regular + fill path data embedded). Published as an
  artifact: https://claude.ai/code/artifact/7009c1af-96d6-4a17-bfd1-16f3b3620bc3

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
