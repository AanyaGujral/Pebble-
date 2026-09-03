# Session Handoff

> **2026-09-03 — read this first.** Work has moved to the **Me tab**.
> `Me Tab/Me Tab.html` is a NEW standalone prototype holding **build slice 1
> of 5** from `docs/feature-me-tab.md` (rev 3): the tab shell (header, device
> slot, five silent breaks in the exact §3 row order) plus a "component
> bench" view with all six §5 components in every listed state. Open it by
> double-clicking; the panel on the left switches the device slot, the
> dormant-band count and the confirm sheet.
>
> **Awaiting owner review.** Do not start slice 2 (device card across
> T1–T10, the pairing CTA in context, S03, S04) until slice 1 is approved —
> §7 of the spec makes the slices gated on purpose.
>
> Owner calls already made, so do not re-ask: break 4 is only Do Not Disturb
> + Call notification (low battery prompt -> S03, analytics + AI insights ->
> About); two bands is the tested case not a cap, so break 1 is a list and
> "+" never hides; DND stays a toggle; no new tokens without asking.
>
> Still open and flagged in the code, not decided: sign out, delete account,
> Cycle, Edit Cards, the System Setting leftovers (language, screen timeout),
> whether band history survives an unbind, whether FAQ articles are bundled
> or fetched, and where the user lands after switching bands.
>
> The earlier Activity/Sleep note still applies: `index.html` is the merged
> app prototype and its Me tab is the OLD first-pass layout — it has not been
> touched, and should be replaced from this file once the slices are done.
> Background PNGs still have not arrived.

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
