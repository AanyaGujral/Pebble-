# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-10 — Activity-only flow: new nav, one no-data state (owner
  feedback, round 3) — Bottom nav replaced with the owner's "pebblenav"
  component: floating 328×60 pill, background blur, 24px icons (regular
  idle / fill selected), 10px labels; icon markup copied verbatim from the
  supplied file. This flow now lands on Activity, and Health / Sleep / Me
  are visible but non-clickable (their screens will be integrated
  separately). Watch-not-worn state removed everywhere — "No data" (the
  old empty) is the only no-data state; loading / syncing removed from the
  control panel but their plumbing is kept for later integration. History
  calendar: future days are now completely empty — day number only, no
  ring (a zero-length dash with round caps had been rendering as a small
  green dot).

- 2026-08-10 — Activity empty states + calendar polish (owner feedback,
  round 2) — In the "empty" card state on the Activity tab: the steps /
  distance / calories charts now keep their frame (gridlines + axis labels)
  with the data marks hidden instead of the generic "no data yet" cover;
  Today's goals shows its three rows zeroed (0 / goal, bars empty); Goals
  met swaps to a no-data week — dotted rings on past days and today, three
  empty rings on future days (matches the owner's reference images); the
  Workouts card hides entirely. Scrubbing is disabled while a chart shows
  no data. History calendar: fade overlay halved to 68px and the month
  scroll gets extra bottom padding, so the sheet opens with the previous
  month's last ring row tucked under the fade and the current month sitting
  higher.

- 2026-08-10 — Activity tab fix round (owner feedback) — (1) Steps bar chart
  scrub now picks the bar by slot (floor(x/slot), same rule as the approved
  bar-chart component — the old round() rule grabbed the wrong bar near slot
  edges) and shows the component's dotted guide line from the touched bar's
  top to the top of the chart; other bars dim to 0.4 like the component.
  (2) Goal-setting sheet: the unit (steps / km / kcal) now shows only next to
  the focal (selected) value, not on every row. (3) History calendar: added a
  fade-out overlay at the top of the month scroll, sized so only the previous
  month's last ring row peeks through it — the current month reads front and
  center. (4) Bottom-nav Activity icon swapped from Phosphor "sneaker" to
  "sneaker-move" (owner-supplied), regular + fill weights.

- 2026-08-10 — Recovered the latest prototype from the published artifact —
  the previous session's last two commits (full-bleed backgrounds + feedback
  round: month calendar, goal sheets, About pages, bedtime dial) were never
  pushed and were lost with that session's machine. Rebuilt `index.html` from
  the published artifact by reversing the publish transform (fonts back to
  Google Fonts links, `data-state` back on `<body>`, background `<img>` slots
  re-added ahead of the SVG stand-ins). Lesson: push work-in-progress to the
  feature branch — an unpushed commit only lives on one machine.

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
