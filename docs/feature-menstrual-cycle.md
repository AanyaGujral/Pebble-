# Feature: Menstrual cycle

Status: **Prototype built (rev 4, 2026-09-11, after three owner reviews) — UX not yet approved.**
Prototype: `Homepage + measurel all + start workout flow.html` — the Home tab's
**Menstrual cycle** card, the cycle calendar page, the log-a-period sheet and
the Cycle settings page. Reference: the owner's two screenshots of the legacy
app (the Ovulation calendar and its Setting page).

## What it does
A card on Home tells you which day of your cycle it is and which phase you are
in ("Cycle Day 8 │ Follicular Phase · Next period in: 21 days", the WHOOP
header the owner supplied; the card's top-right corner carries a wash of the
current phase's colour). Tapping it opens a month calendar where runs of
days in one phase share a tinted bubble in that phase's colour and only the
predicted period days carry a dotted ring. Tapping a day selects it: the
header switches to that day's cycle day and phase and four body-signal cards
(skin temp, resting HR, HRV, readiness) switch to that day. The + button then
offers "+ Add period" for the selected day, or "− Remove period" when that
day is a logged start; adding gets a check step only when the date is odd,
removing always asks. A settings page holds the three numbers the
prediction runs on (period length, cycle length, last period start) and the
watch reminders.

## Acceptance criteria
- [x] Home card sits after Start Workout and **above Family ranking**, titled
      "Menstrual cycle", reads "Cycle Day n │ <Phase> Phase" over "Next period
      in: n days", washes its top-right corner in the phase colour, and keeps
      one height in its set-up (no-data) state so the card below never moves.
- [x] Calendar gives each of the four phases its own colour as a bubble over
      each run of days; numerals sit in the phase colour; only predicted
      period days carry the dotted ring; today is ringed in text-1.
- [x] Tap a day to select it (ring); the header and the four body-signal
      cards follow the selection. The + button offers "+ Add period" /
      "− Remove period" for that day; a future day cannot be logged.
- [x] Adding a period on an odd date (replaces a nearby log, or lands under
      21 days after the previous one) gets a check step; removing always
      asks and names the log predictions fall back to.
- [x] Settings apply on pick — no Save. Last period start opens the Me-tab
      date calendar (month grid, month/year wheel behind the title).
- [x] Settings page carries every row in the reference: period length, cycle
      length, last period start, watch-reminders toggle, period reminder,
      ovulation reminder, reminder time, the footnote, and Save — rows on the
      Workouts card row (chip · label · value · caret), questions in the
      pop-ups, the Me-tab switch, the drum picker for every value.
- [x] All colours and fonts come from `js/tokens.js` (four `cycle` tokens and
      the `avatar` tints added there first).
- [x] Opens by double-clicking; reduced-motion gate covers the new controls.
- [ ] Owner review of the flagged decisions below.

## Implementation approach
- **Model** — `CYC.starts` (logged period start dates), `periodLen`,
  `cycleLen`, reminder settings. A day's phase is its day-number in the cycle
  that began at the latest logged start on or before it: menstrual 1…P,
  follicular until the ovulation window opens, ovulation = 5 days before to 4
  days after the ovulation day (`cycleLen − 14`), luteal to the end. Days after
  today, before the first log, or beyond the last logged cycle are "estimated"
  → dotted.
- **Card** — `.card` + `.card-head` with the chevron the Family ranking card
  uses; "Cycle Day n │ Phase" at headingH3Medium with a hairline divider,
  the phase in its colour; 14px, then the four-segment phase strip with a
  tick at today; 12px, then the next-period line; a radial wash of the
  phase colour from the top-right corner, set through `--ph`.
- **Cycle page** — `.subpage` / `.sub-head` with the app's 3-dot menu on the
  right (Cycle settings · About cycle tracking); the same 17px header for
  the SELECTED day with one 13px line under it ("Today · Next period in:
  21 days"); calendar card with ‹ MONTH › on the left and the + button on
  the right (its one-entry `.menu`), legend, 40px day cells whose `::before`
  paints the bubble (start / mid / end / solo of a run, phase colour at 22%
  over the card), numerals nudged 0.1em down to sit on the circle's centre
  (League Spartan's descender space, as `.r3num`); "Body signals" — four
  Health monitor cards via `hmMetricCard()`, sample readings per day; "This
  cycle" on the Workouts card with a plain phase dot; About page.
- **Action sheet** — one goal-edit `.sheet` frame rendered per use by
  `openCycAct()`: X · title · ✓ (only with a wheel), the Me-tab `.sub` line
  and `.conseq` lines with tone glyphs, the drum picker, stacked actions in
  the button tiers. Every step of log / move / remove and every settings
  picker goes through it.
- **Settings** — rows are the Workouts card row (`.wo-row` / `.wo-chip` /
  `.wo-glyph` / `.wo-caret`) with the glyph in neutral-100, a trailing value
  and the caret; the Me-tab `.switch` on the Watch reminders row; dependent
  rows dimmed at `--state-inactive` while off. Numbers and times open the
  drum picker (value and unit meet in the middle); Last period start opens
  the Me-tab date calendar. Every pick applies at once; no Save. Footnote
  left-aligned.
- **Icons** — Phosphor drop and clock (fill) copied from the Me-tab
  prototype's table; arrows-clockwise for cycle length.

## Decisions flagged in code (owner to confirm)
1. **Phase colours share hues with metric aliases** (crimson/heart rate,
   violet/sleep, sky/SpO₂, orchid/skin temp). Crimson is the reference's red
   period; the other three are the cool half of the ramp per the owner
   ("blues / purples"); see `js/tokens.js` `cycle`.
2. **Two tones on the calendar** — period and ovulation days are fully
   filled, follicular and luteal days tinted at 22% with a coloured numeral,
   so every day carries its phase without a wall of colour.
3. **Sample period length is 5 days**, not the reference's 6, so the
   follicular band is visible (with a 10-day ovulation window a 6-day period
   leaves two follicular days in a 28-day cycle). The reference's "Last Time
   10 Sep 2026" is in the prototype's future and was not copied; sample starts
   are 2 Jul and 30 Jul 2026, so today (6 Aug) is day 8.
4. **Family ranking card ported** into this file (static F4 state from the
   Friends prototype rev 2.2) because the owner placed the cycle card "above
   family ranking" and this file's Home tab had no such card. Its chevron goes
   nowhere here; it does not follow the control panel's no-data state.
5. **No section head** above the two cards (the Friends card never had one);
   a 12px extra margin gives a section-sized break.
6. **Reference copy reworded** — the three question lines and the footnote.
7. **Body Temperature card** from the reference not built (not in the brief;
   skin temperature already lives in Health monitor).
8. **No confirm on Back** from settings — edits are silently discarded.
9. **Re-logging** — a start within one period length of an existing one
   replaces it (a correction), rather than recording two periods.
10. **About page added** so the 3-dot menu has the two entries the app's
    other 3-dot menus have; it documents the phase rules.
11. **Save stays a header text action** (as on the reference) rather than a
    button-component pill; every pill button is Title Case.
12. **Add guardrails** — a start within one period length of an existing log
    replaces it and a gap under 21 days is flagged as unusually short; either
    brings up the check step, otherwise "+ Add period" logs at once. A
    future day's entry reads "Can't log a future day" and is inert.
13. **Bubble tint is 22%** of the phase colour over the card, numerals in the
    phase colour at semibold — chosen for legibility of violet and orchid on
    the dark surface; the WHOOP reference paints the current phase solid,
    which is not done here.

## Owner review, 2026-09-11 (rev 1 → rev 2)
Settings text → 3-dot icon · button component + Title Case · Me-tab switch ·
follicular off yellow, into blues/purples · card header after the WHOOP
screen · phase-colour wash top-right · settings rows on the workout-card row,
icons not green, questions moved into the pop-ups · drum picker for values.
All applied; published as an artifact the same day.

## Owner review, 2026-09-11 (rev 2 → rev 3)
Card header one step smaller (17px) with the phase strip back · page header
one step smaller (20px) · calendar as WHOOP-style bubbles per phase, dotted
ring only on predicted period days · a proper log flow from the bottom CTA
with a check step, plus Change Date / Remove Log with confirms · This cycle
(and the new Logged periods) on the Workouts card so spacing matches the
other flows. All applied; artifact republished.

## Owner review, 2026-09-11 (rev 3 → rev 4)
Card spacing opened up · page header and line smaller · calendar numerals
centred · ‹ month › left, + right; tapping a day selects it (ring, header
follows), + offers Add / Remove period for that day; no CTA · This cycle rows
back to a plain dot · Logged periods card removed · four body-signal cards for
the selected day · Last period start on the Me-tab date calendar · Save
removed (settings apply on pick) · footnote left-aligned · reminder picker
spacing (value + unit centred, sub line clear of the X and ✓), default 3 days.
All applied; artifact republished.

## Dependencies / risks
- Reminder rows are settings only; nothing schedules a reminder.
- Cycle-length prediction is a single number from settings; it does not yet
  average the logged cycles. When it should, `cycInfo()` is the one place.
- Whether the flow needs an "irregular / late" state (today past the predicted
  next start with nothing logged) — currently it rolls into a projected next
  cycle, dotted.
