# Feature — Health metrics detail pages

**File:** `Health Metrics/health-metrics.html` (standalone; opens by double-click)
**Status:** Prototype built to the owner's 2026-09-08 brief — awaiting UX review
**Entry points:** Home tab → Health monitor cards · Sleep tab → overnight vitals cards

## What it does

Five metric pages — Heart rate, Heart rate variability (HRV), Stress, Skin
temperature, Blood oxygen (SpO₂) — each with:

1. **D / W / M / Y period switcher** (the homepage's `.seg4` pill). Pages
   always open on Day.
2. **Chart card** — the Activity tab's Steps / Distance card layout
   (owner, 2026-09-08): title on the left (`Latest` on the Home Day view,
   `Last night` on the Sleep Day view, `Average` otherwise) with the zone
   status pill under it, the figure + unit on the right with a trend line
   giving the period and its min–max range (`Last 12 months · 40 – 66 ms`).
3. **Chart** — Day is a line chart with the metric's area fill (the homepage's
   `drawLine`); Week / Month / Year are range bars per the owner's reference
   screenshot: grey low→high bar, zone-coloured average tick, dotted line at
   the overall average, shaded healthy band with a legend
   ("Healthy 50–90 ms"), three y labels (top · average · bottom).
4. **Press-drag scrubbing** — reads the value under the finger into the
   header (Day: value + time; W/M/Y: that bar's average + its range). Line
   charts light a dashed guide + dot; range bars dim the rest and run the
   dotted line from the bar top (as the approved bar-chart component).
5. **Stat tiles** — the Activity tab's three StatTile chips (label above
   value, 20px radius, no hairline):
   - Heart rate: Resting · Average · Max
   - HRV: Average · Highest · Lowest
   - Stress: Average · Highest · Time relaxed
   - Skin temperature: Average · Baseline · Deviation
   - SpO₂: Average · Lowest · Below 95%
6. **Time in range** — one continuous bar whose sections fill by share (no
   gaps, no rule under the bar), then one row per zone with its percentage.

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

## Zones and bands (sample thresholds — flagged for review)

| Metric | Zones (best first) | Healthy band |
|---|---|---|
| Heart rate | Good < 75 · Elevated 75–90 · High ≥ 90 bpm | 50–75 bpm |
| HRV | Good ≥ 56 · Fair 40–56 · Low < 40 ms | 50–90 ms |
| Stress | Low < 40 · Medium 40–70 · High ≥ 70 | 0–40 |
| Skin temperature | Normal 36.0–37.2 · Below < 36.0 · Above ≥ 37.2 °C | 36.0–37.2 °C |
| SpO₂ | Normal ≥ 95 · Low 90–95 · Very low < 90 % | 95–100 % |

## Acceptance criteria

- [x] Tapping any Health monitor card opens its page on Day
- [x] Tapping a Sleep-tab vitals card opens the same page scoped to the sleep window
- [x] D / W / M / Y switch the chart; Day line, W/M/Y range bars
- [x] Scrubbing reads into the header and snaps back on release
- [x] Stat strip and Time in range recompute per period and scope
- [x] Default · Partial · No data · Loading states on every screen
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
- Measure All is visual-only in this file; the reading scene lives in the
  homepage file.
- `metric.stress` added to `js/tokens.js` (it was referenced but missing).

## Dependencies

- `js/tokens.js` (values mirrored inline)
- Chart geometry and scrub behaviour from `components/Charts/line-chart.html`
  and `bar-chart.html`; Health monitor card markup from the homepage file.
