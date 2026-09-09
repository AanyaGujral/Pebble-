# Feature — Health metrics detail pages

**File:** `Health Metrics/health-metrics.html` (standalone; opens by double-click)
**Status:** Prototype built to the owner's 2026-09-08 brief — awaiting UX review
**Entry points:** Home tab → Health monitor cards · Sleep tab → overnight vitals cards

## What it does

Five metric pages — Heart rate, Heart rate variability (HRV), Stress, Skin
temperature, Blood oxygen (SpO₂) — each with:

1. **D / W / M / Y period switcher** (the homepage's `.seg4` pill). Pages
   always open on Day.
2. **Date selector** — under the period pill: ‹ › step one day / week /
   month / year back or forward (forward stops at today); the label opens the
   onboarding profile's date-of-birth calendar in four modes: a month grid
   for Day, the same grid with tap-a-day → its Mon–Sun week for Week, a 3×4
   month grid for Month, a 3×4 year grid for Year. The month title flips the
   day / week grid to the month + year wheel (the drum picker). ✓ confirms,
   ✕ discards.
3. **Chart card** — the Activity tab's Steps / Distance card layout: title
   on the left (`Today's average`, `Week's average`, `Month's average`,
   `Year's average`; `Last night's average` on the Sleep Day view) with the
   zone status pill under it, the figure + unit on the right with a trend
   line giving the period and its min–max range (`Today · 53 – 126 bpm`).
   No healthy band or legend on any chart (owner, 2026-09-08).
4. **Chart** — Day is a line chart with the metric's area fill (the homepage's
   `drawLine`); Week / Month / Year are range bars per the owner's reference
   screenshot: grey low→high bar, zone-coloured average tick, dotted line at
   the overall average, three y labels (top · average · bottom).
5. **Press-drag scrubbing** — reads the value under the finger into the
   header (Day: value + time; W/M/Y: that bar's average + its range). Line
   charts light a dashed guide + dot; range bars dim the rest and run the
   dotted line from the bar top (as the approved bar-chart component).
6. **Stat tiles** — the Activity tab's three StatTile chips (label above
   value, 20px radius, no hairline):
   - Heart rate: Resting · Average · Max
   - HRV: Average · Highest · Lowest
   - Stress: Average · Highest · Time relaxed
   - Skin temperature: Average · Baseline · Deviation
   - SpO₂: Average · Lowest · Below 95%
7. **Time in range** — one continuous bar whose sections fill by share (no
   gaps, no rule under the bar), then one row per zone with its percentage.
8. **Measure button** — at the bottom of every page, the design-system
   button (components/button.html) in the SECONDARY tier so it sits below
   the charts in emphasis, label in Title Case ("Measure Heart Rate"): idle →
   measuring (the outline fills for the length of the reading while the
   homepage's reading scene plays over the blurred page) → the readings
   sheet with this metric's row and Done → a 49 s disabled cooldown
   ("Measure Again in 00:49") → idle. The scene CSS is the homepage's block
   verbatim; the one-reading sheet hugs its row.
9. **3-dot menu** — *About <metric>* (how it is measured, what the zones
   mean, one thing worth knowing) and *Measurement settings*, built on the
   Me tab's Health Monitor page: the sensor's on/off switch with its sampling
   interval (inert when off); heart rate also gets the warning switch and
   the upper limit (120–200 bpm). Values are picked in the onboarding
   profile's drum sheet (number column + unit column) and shared across pages.

**Removed on purpose:** the bottom tabs that let a reader jump from one
metric's page to another (owner, 2026-09-08). Back → tap is the only route.

## Sleep-tab scope

Pages opened from the Sleep tab carry a "During sleep" chip and show the
sleep window only: Day = 23:00–07:00, W/M/Y = one range bar per night
(overlines read `7-NIGHT AVERAGE`, `30-NIGHT AVERAGE`). Stress has no
overnight card, so it has no sleep entry.

## States (control panel beside the phone)

| State | Home / Sleep cards | Detail page |
|---|---|---|
| Default | Live figures | Full page |
| Partial data | Live figures | Sensor gap in the Day line (dotted bridge), missing bars in W/M/Y, note "5 of 7 days measured" |
| No data | — and "No readings yet"; CTA "Take your first reading" | — headline, empty chart frame (gridlines + labels), — tiles, empty range bar |
| Loading | Skeleton figures, "Syncing…" | Skeleton header, chart, tiles and rows |

## Zones (sample thresholds — flagged for review)

| Metric | Zones (best first) |
|---|---|
| Heart rate | Good < 75 · Elevated 75–90 · High ≥ 90 bpm |
| HRV | Good ≥ 56 · Fair 40–56 · Low < 40 ms |
| Stress | Low < 40 · Medium 40–70 · High ≥ 70 |
| Skin temperature | Normal 36.0–37.2 · Below < 36.0 · Above ≥ 37.2 °C |
| SpO₂ | Normal ≥ 95 · Low 90–95 · Very low < 90 % |

## Acceptance criteria

- [x] Tapping any Health monitor card opens its page on Day
- [x] Tapping a Sleep-tab vitals card opens the same page scoped to the sleep window
- [x] D / W / M / Y switch the chart; Day line, W/M/Y range bars
- [x] Scrubbing reads into the header and snaps back on release
- [x] Stat strip and Time in range recompute per period and scope
- [x] Default · Partial · No data · Loading states on every screen
- [x] Date selector per period with calendar / list pickers
- [x] Measure CTA with the homepage's reading scene and readings sheet
- [x] 3-dot menu → About and Measurement settings pages
- [x] No metric-to-metric tabs on the detail page
- [x] All colours and fonts from `js/tokens.js` (mirrored as CSS variables)
- [x] Opens standalone; `prefers-reduced-motion` disables the skeleton pulse, the page slide and the bar transition
- [ ] Owner review of zone thresholds, tile order and the semantic-colour exception (see flags below)

## Decisions flagged in code

- Zone ticks and the Time-in-range bar use the semantic *icon* steps — a
  deliberate exception to "semantic colours never on chart fills", limited to
  status marks, because the reference screenshot encodes zone by colour.
- The chart card, chart height and tiles follow the Activity tab (owner call,
  2026-09-08) rather than the reference screenshot's large-figure header;
  the zone pill is the one element the Activity pages do not have.
- Skin temperature uses the Home card's 36.x °C scale everywhere; the Sleep
  tab card's 33.2 °C is untouched and inconsistent.
- Home's Measure All stays visual-only; the per-metric Measure CTA runs the
  ported scene. A fresh reading shows the Home card's figure and does not
  alter the charts (sample data).
- Earlier dates show the present series nudged by a seeded factor (sample
  data), so stepping back visibly changes the page.
- Every metric's settings page gets a switch + interval; only heart rate has
  the alert + upper limit, per the Me tab's page.
- Measure uses the secondary tier although the component reserves it for a
  parallel route; tertiary reads as dismiss / skip, so secondary is the
  closest fit for a de-emphasised action.
- The calendar starts the week on Monday (the reference starts on Sunday) so
  a picked week is one unbroken row; day numbers use numS 13/16 instead of
  the reference's off-scale 16/20.
- The date pill radius is the 12px token; the homepage's is 14px (no token).
- `metric.stress` added to `js/tokens.js` (it was referenced but missing).

## Dependencies

- `js/tokens.js` (values mirrored inline)
- Chart geometry and scrub behaviour from `components/Charts/line-chart.html`
  and `bar-chart.html`; Health monitor card markup from the homepage file.
