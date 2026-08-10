# Session Handoff

**Read this first when you (or Claude) pick up work.** It says what shipped,
what decisions were made, and the exact next steps.

## Current status

- `index.html` now holds the FULL Pebble app prototype (phone mockup with
  Health / Activity / Sleep / Me tabs, state-machine control panel, embedded
  fonts). It opens by double-clicking — no server needed.
- Real brand tokens are in `js/tokens.js` (the prototype inlines them as CSS
  custom properties because ES-module imports don't work over `file://`;
  if tokens change, re-copy the values into the `:root` block).
- Newest feature: Steps / Distance / Calories detail pages on the Activity
  tab — tap a chart card to open its internal page with a D/W/M/Y switcher,
  chart, goal line (W/M/Y) and a three-chip summary row.

## Decisions made (latest work)

- Detail chart cards reuse the approved chart-card format and scrub/hover
  states from the Activity tab (`drawBars` / `drawLine` / `attachScrub`);
  the wireframes contributed only the D/W/M/Y tabs, axis label counts
  (7 week, 8 month, 12 year) and the summary information.
- Summary blocks reuse the Activity-tab stat chips, which put the label
  above the value (the wireframes show value above label) — flagged in a
  code comment next to `.sumchips`.
- The wireframes' Steps/Distance/Calories pill switcher and the explainer
  text under the summary were dropped (owner request, 2026-08-10).
- All detail data is sample data, kept consistent with the Activity tab's
  "today" (7,240 steps · 5.1 km · 420 kcal) and the goals from Goal setting
  (10,000 steps · 8 km · 600 kcal).

## Exact next steps

1. Owner review of the three detail pages (chip label/value order OK?).
2. Workout details page is still pending (rows on Activity are visual-only).
3. Health and Me tabs still have placeholder content in places.

## Known limitations

- Goal edits in Goal setting only update the label, not the charts.
- Detail pages don't participate in the loading/empty state machine
  (scrubbing is simply disabled in those states).
