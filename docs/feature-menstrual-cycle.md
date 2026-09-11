# Feature: Menstrual cycle

Status: **Prototype built (rev 1, 2026-09-11) — UX not yet approved.**
Prototype: `Homepage + measurel all + start workout flow.html` — the Home tab's
**Menstrual cycle** card, the cycle calendar page, the log-a-period sheet and
the Cycle settings page. Reference: the owner's two screenshots of the legacy
app (the Ovulation calendar and its Setting page).

## What it does
A card on Home tells you which day of your cycle it is and which phase you are
in ("Day 8 · Follicular phase"). Tapping it opens a month calendar where every
day carries its phase colour — solid for days lived since a logged period
start, a dotted ring for predicted days — and where a past day can be logged
as the start of a period. A settings page holds the three numbers the
prediction runs on (period length, cycle length, last period start) and the
watch reminders.

## Acceptance criteria
- [x] Home card sits after Start Workout and **above Family ranking**, titled
      "Menstrual cycle", reads "DAY n · <PHASE> PHASE", and keeps one height in
      its set-up (no-data) state so the card below never moves.
- [x] Calendar gives each of the four phases its own colour, marks every day,
      and draws predicted days (after today, or projected beyond a logged
      cycle) as dotted rings — tentative period dates included.
- [x] A period start can be logged from the calendar (tap a past day → sheet
      → Log) and from a "Log period start today" button.
- [x] Settings page carries every row in the reference: period length, cycle
      length, last period start, watch-reminders toggle, period reminder,
      ovulation reminder, reminder time, the footnote, and Save.
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
  uses; DAY-numeral format from the Activity detail tiles; a four-segment
  phase strip on `.gbar` geometry with a tick at today; next-period line.
- **Cycle page** — `.subpage` / `.sub-head` with a text action ("Settings")
  on the right; hero in the Activity/Sleep headline pattern; calendar card
  with month nav (`.iconbtn` carets), legend, 44px day buttons with 34px
  circles; "This cycle" phase list on `.listrow`.
- **Log sheet** — the goal-edit `.sheet` frame, one primary button.
- **Settings** — `.settings-group` / `.setrow` / `.itile` with a question
  line above each label; `.switch` for reminders; dependent rows dimmed at
  `--state-inactive` while off; values picked on the goal sheet through a
  small generalisation (`openPickSheet`, callback on confirm). Edits are a
  draft; Save applies, Back discards.
- **Icons** — Phosphor drop and clock (fill) copied from the Me-tab
  prototype's table; arrows-clockwise for cycle length.

## Decisions flagged in code (owner to confirm)
1. **Phase colours share hues with metric aliases** (crimson/heart rate,
   gold/steps, sky/SpO₂, violet/sleep). Chosen after the reference's red
   period and blue ovulation; see `js/tokens.js` `cycle`.
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

## Dependencies / risks
- Reminder rows are settings only; nothing schedules a reminder.
- Cycle-length prediction is a single number from settings; it does not yet
  average the logged cycles. When it should, `cycInfo()` is the one place.
- Whether the flow needs an "irregular / late" state (today past the predicted
  next start with nothing logged) — currently it rolls into a projected next
  cycle, dotted.
