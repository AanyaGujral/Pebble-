# Session Handoff

> **2026-08-26 — read this first.** The workout flow now exists as its own
> prototype: `Workout Tab/Workout Flow.html`, published at
> https://claude.ai/code/artifact/7009c1af-96d6-4a17-bfd1-16f3b3620bc3
> It is deliberately SEPARATE from the home prototype — the owner asked for a
> standalone flow artifact, so the Pebble Home link
> (claude.ai/code/artifact/808df696-db16-4695-9052-38e4fc40abff) is untouched
> and its Start Workout CTA is still visual-only. Two things follow from that:
> (1) the flow file carries its own Home *stub* purely to hold the CTA, and
> (2) if the owner later wants one prototype, the flow's screens and script
> drop into `index.html` — everything reads the same mirrored tokens.
>
> Note also that `index.html` in this repo is BEHIND the published Pebble Home
> artifact: that artifact contains a later home rebuild (greeting + three
> rings, Health monitor v4 / Measure All, Activity monitor, Start Workout CTA)
> that never landed as a commit. Pull it back into the repo before editing
> `index.html`, or the rebuild gets overwritten. `action: "read"` on the
> artifact URL returns the full file.
>
> The flow's own next steps and open questions are at the end of this file.

> **2026-08-10 — read this first.** `index.html` is now the MERGED source of
> truth: it adopts the parallel session's build (metric details pages with a
> D/W/M/Y period switcher; control panel reduced to Default + No data and
> scoped to the Activity tab — Health/Sleep/Me tabs temporarily disabled in
> the tab bar) plus this session's StatTile feedback round (component-styled
> summary tiles, thousands formatting, one-line headers, DAY-11 best-day
> format, taller chart axis gap, no-data = headers + — + empty chart frames).
> The owner approved on 2026-08-10 and the branch is now PUSHED. The named
> snapshot lives in `Activity Tab/Workout Tab.html`; `index.html` stays the
> live working copy at the root. The background PNGs STILL have not arrived
> as files (three attempts, inline previews only), so the code-drawn
> stand-in scenes are what ship. Image slots are wired to
> `assets/backgrounds/activity-dusk.png` + `sleep-night.png` — dropping the
> real files in takes over automatically.

**Read this first when you (or Claude) pick up work.** It says what shipped,
what decisions were made, and the exact next steps.

## Current status

- `index.html` is now the full app prototype: Android phone mockup (360px)
  with 4 tabs — Health, Activity, Sleep, Me — and the bottom nav recreated
  from the supplied screenshot.
- Sleep and Activity tabs are recreated from the approved standalone
  prototypes (in `Sleep Tab/` and the uploaded Activity file): score rings,
  hypnogram, overnight vitals charts, today's goals, goals-met week rings,
  workouts list, nap, sleep continuity. Line/bar charts support press-drag
  scrubbing (value + timestamp swap into the card header).
- A control panel sits beside the phone and switches every data card between
  five states: **default, loading, syncing, watch-not-worn, empty**.
- `js/tokens.js` holds the real brand palette (crimson→orchid ramps,
  neutrals, metric aliases, League Spartan numerals + Google Sans Flex text).

## Decisions made (all flagged in code comments too)

- Token values are mirrored into CSS custom properties inside `index.html`
  because ES-module imports don't work over `file://` (the double-click
  requirement wins). If `js/tokens.js` changes, re-copy the values.
- Health and Me tabs have no approved spec — they are first-pass layouts
  reusing hero/tile/list patterns from the approved screens.
- The Activity hero's photographic backdrop was replaced with token
  gradients to keep the file small and colors tokenised.
- The full-month calendar from the standalone prototypes was simplified to
  a 7-day date dropdown in this build.
- 3-dot menu entries (About / Goal setting / Share) are visual-only here;
  the full subpages exist in the standalone prototypes.

## Exact next steps

1. Get the two background PNGs from the owner as file uploads and save them
   to `assets/backgrounds/activity-dusk.png` + `sleep-night.png` (slots are
   already wired; code-drawn stand-ins show until then).
2. Owner approval → push the pending local commits to
   `claude/pebble-app-tabs-prototype-jty6sh`.
3. Metric detail pages (tap a card → full-screen metric history).
4. Workout details page for the Activity tab.

## Done since first build (feedback round, 2026-08-07)

- Month-scroll history calendar modal (scroll up for earlier months) on all
  three data tabs; picking a day updates that tab's date label.
- About activity / About sleep read-only pages behind the 3-dot menus.
- Goal setting: activity (steps / distance / calories value sheet) and
  sleep (24 h bedtime dial, drag handles, 15-min snap, wake-up alarm toggle).
- Sleep continuity card expands to the "When you slept" 7-night timeline.
- All icons now Phosphor (path data embedded in index.html).
- Health tab: greeting "Good morning, Aanya", three nested rings
  (sleep / readiness / activity) + legend chips.
- Me tab rebuilt after the owner's settings screenshot: PBL Qore 2 device
  card (MAC, firmware, Unbind, status), working toggles, grouped rows —
  all colors/type from tokens.

## Known limitations

- Google Sans Flex / League Spartan load from the Google Fonts CDN; offline
  the prototype falls back to system sans (layout still holds).
- Chart data is invented sample data shaped to match the numbers shown in
  the approved prototypes.

## Workout flow — open questions / next steps (2026-08-26)

0. Round 1 of owner feedback is applied (see the changelog entry for
   2026-08-26 feedback round). Still open from it: whether the details
   page's stat tiles should be three across rather than two — the "3 boxes
   not 1" note was read as the LIVE screen's three metrics, which is where
   it was applied; the details tiles follow the approved details screen's
   2-up grid. One `grid-template-columns` value if that was wrong.
   And the map: real Google imagery can't be fetched in this environment,
   so the basemap is drawn. `assets/maps/route-newdelhi.png` is wired as an
   override — drop a screenshot in and it takes over.
1. Accent colour: the flow uses teal-400 for the countdown numeral,
   pause/play, End & Save and the dialog's primary button, because the spec
   names teal for discard. The owner's screenshots show a mint green
   (closest tokens: emerald-300 `#73C693`, or semantic positive-icon
   `#4ADE80`). One line change if teal is wrong — `--accent` in the file.
2. Third metric per activity is a first pass (steps for court sports,
   breaths for meditation, routes for climbing). Worth a read-through.
3. Walking and hiking are treated as distance activities (km + GPS map), per
   the spec's "km for all distance related stuff". Say if walking should show
   steps instead.
4. Discard currently returns to the home screen. Confirm, or send it back to
   the activity list.
5. Not built: editing a saved session, a workout-in-progress notification
   when you leave the screen, lap/split controls, and the real Most-recent
   list (it seeds with the five in the screenshot and re-orders in-session
   only — nothing persists).
6. The activity list keeps the name left-aligned beside its icon, as in the
   reference card. If "single center aligned text" meant the name centred in
   the row, that's a small CSS change.
