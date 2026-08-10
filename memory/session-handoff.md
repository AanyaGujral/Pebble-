# Session Handoff

**Read this first when you (or Claude) pick up work.** It says what shipped,
what decisions were made, and the exact next steps.

## Current status

- `index.html` is now an **Activity-only flow**: it lands on the Activity
  tab, and Health / Sleep / Me are visible in the nav but non-clickable
  (owner: the 4 tabs are built one at a time and will be integrated
  separately — their page markup is still in the file, just unreachable).
- Bottom nav is the owner's "pebblenav" component: floating 328×60 pill
  with background blur, Phosphor icons regular-idle / fill-selected
  (Activity = "sneaker-move"), 10px labels, `aria-current` marks the
  selected tab.
- Card states are down to two: **Default** and **No data** (the old
  "empty"). Watch-not-worn was REMOVED for good; loading / syncing were
  taken out of the control panel but their CSS/JS plumbing is kept for
  later integration.
- Sleep and Activity tabs are recreated from the approved standalone
  prototypes: score rings, hypnogram, overnight vitals charts, today's
  goals, goals-met week rings, workouts list, nap, sleep continuity.
  Line/bar charts support press-drag scrubbing (value + timestamp swap into
  the card header; bars get the component's dotted top guide line).
- Flows: date pill → full month-scroll history calendar modal (newest month
  at the bottom, scroll up for the past, per-tab ring colors, fade overlay
  keeps the current month focal); 3-dot menus → About activity / About
  sleep read-only pages; Goal setting → activity value-picker sheet (unit
  only on the focal value) and sleep 24h bedtime dial (draggable handles,
  15-min snap, 3h minimum, alarm toggle).
- A control panel sits beside the phone and switches every data card between
  five states: **default, loading, syncing, watch-not-worn, empty**.
- `js/tokens.js` holds the real brand palette (crimson→orchid ramps,
  neutrals, metric aliases, League Spartan numerals + Google Sans Flex text).

## How this state got here (2026-08-10)

The previous session's last two commits were never pushed and were lost with
that session's machine. The current `index.html` was recovered from the
published artifact (which was built from that exact state) and then the
owner's Activity-tab fix round was applied on top. **Push the working branch
after every meaningful commit — an unpushed commit only lives on one
machine.**

## Decisions made (all flagged in code comments too)

- Token values are mirrored into CSS custom properties inside `index.html`
  because ES-module imports don't work over `file://` (the double-click
  requirement wins). If `js/tokens.js` changes, re-copy the values.
- Health and Me tabs have no approved spec — they are first-pass layouts
  reusing hero/tile/list patterns from the approved screens.
- Status bar is a transparent overlay so tab backgrounds run edge-to-edge to
  the top, with scrims for legibility.
- Activity / Sleep tab backgrounds: the owner's PNGs never arrived as file
  uploads, so `<img>` slots point at `assets/backgrounds/activity-dusk.png`
  and `assets/backgrounds/sleep-night.png` with code-drawn SVG stand-ins
  showing until the files exist. Ask the owner to re-attach the PNGs as
  file uploads.

## Exact next steps

1. Get the two background PNGs as actual file uploads → save to
   `assets/backgrounds/`, verify they cover the stand-ins.
2. Metric detail pages (tap a card → full-screen metric history).
3. Workout details page for the Activity tab.
4. Possible third background for the Health tab (only two were supplied).
5. Review Health and Me layouts with the owner and turn them into specs
   under `docs/`.

## Known limitations

- Google Sans Flex / League Spartan load from the Google Fonts CDN; offline
  the prototype falls back to system sans (layout still holds).
- Chart data is invented sample data shaped to match the numbers shown in
  the approved prototypes.
