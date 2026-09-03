# Feature: Friends (was "Family Ranking")

Reference spec for the social comparison flow: the Home card, the leaderboard,
a friend's profile, and the invite/join routes.
Status: **UX proposed (rev 1, 2026-09-03). Not yet approved. UI not specified.**

> Read this file before writing any Friends code. It is the source of truth for
> structure, states and naming. It does **not** specify layout, spacing or type
> sizes — those come in step 2. Where this file is silent on visual detail,
> copy the nearest shipped component (Home / Activity / Sleep) rather than
> inventing. Where it conflicts with a screenshot of the legacy app or the
> current dev build, **this file wins** — both were inputs, not targets.

---

## 0 · Read first

| Order | File | Why |
|-------|------|-----|
| 1 | `CLAUDE.md` | how to work in this repo |
| 2 | `.claude/rules/design-system.md` | the five gates every change must pass |
| 3 | `js/tokens.js` | the only source of colour and font values |
| 4 | `components/button.html` | button tiers, geometry, states |
| 5 | `Homepage + measurel all + start workout flow.html` | Home's card order, Today's goals `.gbar` bars, the Workouts 40px icon chips |
| 6 | `Onboarding/onboarding.html` | the OTP code-entry component — **reused** for Join |
| 7 | `docs/feature-me-tab.md` | the sheet, empty-state and confirm patterns this spec inherits |
| 8 | `memory/session-handoff.md` | where the last session left off |

---

## 1 · What's wrong with the current build

Recorded so the redesign isn't re-litigated later. Numbered items map to the
hard rules in §2.

**Leaderboard (legacy screen 1)**

1. **You appear twice** — pinned at the top *and* again in the list at the same
   rank, with identical styling. It reads as a rendering bug, not a feature.
2. **Ranks are assigned to absent data.** Five members at 0 steps are still
   ranked 1–5. The order is arbitrary and the screen asserts a result it does
   not have.
3. **The figure has no unit and no timeframe.** `0` could be steps, points or
   minutes; today, this week or all time. A leaderboard without a period is
   not a leaderboard.
4. **The heart is ambiguous** — a count and a control in the same mark, with no
   pressed state, no limit, and no statement of what it does to the recipient.
5. **The photographic hero eats ~35% of the viewport** and carries no
   information. Nothing below it is visible without scrolling.
6. **The two header icons are unlabelled and near-identical in meaning**
   (share, add person) for two genuinely different actions — invite and join.
7. **No avatars.** `ankitkaushik` and `Ankit` are indistinguishable rows.
8. **No sense of your own standing** — no gap to the person above, no progress
   against the leader, nothing that would make a second visit worthwhile.

**Friend profile (legacy screen 2)**

9. **It is the same page as your own profile**, so a friend's page carries
   *your* affordances: the header reads "My Homepage" and a
   "Touch to set background" slot invites you to edit someone else's page.
10. **Their email address is the most prominent text on the screen.** It is not
    information anyone needs and it is the one field a leaderboard should not
    broadcast.
11. **The date strip is clipped** — `on M / Tue / ed W / ur T / Fri`. Labels are
    unreadable and the dots under them have no legend.
12. **It is a second, worse implementation of Home.** Different card order,
    different date control, different empty marks (`--` twice in one card) for
    the same metrics the app already renders well two tabs away.
13. **Nothing is comparative.** You navigated here from a ranking and the page
    never mentions the ranking, the rank, or how you compare.

**The thesis.** The current flow is a small parallel app bolted onto Pebble: its
own profile page, its own calendar, its own card style, its own vocabulary. The
fix is not to restyle it — it is to stop building a second app. A friend's
profile is **Home with a different data source**; the leaderboard is **a card on
Home that opens**; the code entry is **the OTP component from onboarding**.

---

## 2 · Hard rules

Invariants. Breaking one is a bug, not a variation.

1. **You appear exactly once.** Your row lives in the ranked list, highlighted.
   The sticky bar in §4.2 is a *scroll affordance* that exists only while your
   row is off-screen — it is never a second row and never renders alongside it.
2. **Never rank absent data.** A member with no synced figure for the selected
   period gets no rank numeral and no position. They sit in the Not synced
   break (§4.2) with their last-sync time. If **nobody** has synced, the screen
   says so; it does not order five zeroes.
3. **The period is always on screen.** Every figure on every Friends surface is
   qualified by the selected period, stated in the header, never implied.
4. **Every figure carries a unit.** `8,412 steps`, not `8,412`.
5. **A friend's profile reuses Home's components.** Same cards, same order,
   same date control, same empty marks. If a metric card needs a change for
   this page, change it on Home too or don't change it.
6. **No self-affordances on someone else's page.** No background setter, no
   edit, no goal control, no email. A control that would write to your account
   does not render on a page about another person.
7. **The leaderboard never opens a second copy of your own data.** Tapping your
   own row routes to the Activity tab at the selected period (§5.3). Home and
   the Activity tab are already your profile; a third one is the bug in item 9.
8. **Cheering is an action with a state, not a counter.** It has idle, pending,
   done and at-limit states, and a stated per-period limit.
9. **The card slot on Home never changes footprint.** Circle, no circle, or
   solo — the Friends card occupies the same height so nothing below it moves.
   (Same rule as the Me tab's pairing CTA.)
10. **Tokens only.** No hex values, no font names, no raw px colours. If a token
    is missing, add it to `js/tokens.js` first and flag it in a comment.
11. **Flag, don't decide.** Anything §9 leaves open gets a code comment at the
    point of decision, not a silent choice.

---

## 3 · Naming

The legacy surface is called **Family Ranking** and the join unit is a *family*.
Neither survives contact with the feature: you join by sharing a six-character
code with anyone, and the app's own copy elsewhere ("Good morning, Aanya") is
personal, not familial.

**Proposed:** the feature is **Friends**. The group noun is a **circle** —
"your circle", "join a circle", "3 people in your circle". The verb is
**cheer**, not like.

Vocabulary to retire, wherever it appears in strings: *Family*, *Family
Ranking*, *My Homepage* (as a title on another person's page), *like*.

> Naming may be pinned by backend strings or an OEM contract — see §9. If it is,
> keep `Family` in the API and translate at the view layer; do not push the API
> vocabulary into the UI.

---

## 4 · Structure

### 4.1 Entry point — the Friends card on Home

Home's order runs: greeting → three rings → **Health monitor** section →
**Activity monitor** section (Today's goals, Workouts, Start Workout). The
Friends card joins the Activity monitor section **after Workouts, before the
Start Workout button**.

**Why there.** Home runs *you → your data → your day → other people*. Nothing
about someone else outranks your own numbers, and the card sits directly under
the two surfaces whose figure it ranks. Placing it above Today's goals was
considered and rejected — it makes the first thing you see in the morning a
comparison. *(Flagged: if the team wants the social surface higher for
engagement reasons, that is a product call, not a structural one — see §9.)*

```
── Activity monitor ──────────────────────────────────────
  Today's goals        steps · distance · calories
  Workouts             list + Start Workout
  Friends card         rank · top rows · your gap        → S02
```

**Card content, populated state (F4):**

```
┌────────────────────────────────────────────┐
│ Friends                      Today      ›  │   card-head + period
│                                            │
│  1  ◍ Koms          12,480 steps  ▓▓▓▓▓▓▓  │   leader
│  2  ◍ Rashmi         9,106 steps  ▓▓▓▓▓    │   ← the row above you
│  3  ◍ You            7,240 steps  ▓▓▓▓     │   highlighted
│                                            │
│  1,866 steps behind Rashmi                 │   the reason to come back
└────────────────────────────────────────────┘
```

Rules for the card: it shows **at most three rows** — the leader, the person
directly above you, and you. If you *are* the leader, it shows you, second and
third. The closing line always states the nearest actionable gap (the person
above you, or "You're leading by N steps"). Tapping anywhere opens S02.

### 4.2 Leaderboard — S02

No photographic hero. The header is the app's standard inner-page header
(back · title · action), and the period control sits directly under it, pinned.

```
‹   Friends                                    [ + ]

  [ Today ]  [ 7 days ]                        ← segmented, pinned
  3 of 5 synced · updated 14:20                ← honest state line

── ranked ────────────────────────────────────────────────
  1  ◍  Koms                          12,480 steps    ♡ 2
        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  2  ◍  Rashmi                         9,106 steps    ♥ 4
        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  3  ◍  You                            7,240 steps
        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                  ← --surface-raised

── not synced ────────────────────────────────────────────
     ◍  Ankit                                   —      last synced Tue
     ◍  ankitkaushik                            —      hasn't synced yet

              [ Invite someone ]                        ← primary, one per screen
```

- **Bars are relative to the leader**, using the `.gbar` fill pattern from
  Today's goals. They are what makes five numbers readable as a ranking.
- **Ties share a rank** and the next rank skips (1, 2, 2, 4).
- **The Not synced break has no rank numerals**, values are `—`, and each row
  states why in `--text-3`.
- **Sticky you-bar**: when your row scrolls out of view, a one-line bar docks to
  the bottom of the viewport with your rank, figure and gap. Tapping it scrolls
  your row back into view. It disappears the moment your row is visible again.
  It is never a second row (hard rule 1).
- **`+` opens one sheet**, S04 — not two icons (§4.4).

**Period control.** `Today` (default) and `7 days`. On `7 days` the figure is the
total across the last seven complete days plus today, and the state line names
the range (`Aug 28 – Sep 3`). Ranks recompute. Nothing else changes.

### 4.3 Friend profile — S03

The same page Home is, minus everything that writes to an account.

```
‹   Rashmi                                     [ ⋯ ]     ← their name, never "My Homepage"

  ◍  Rashmi
     #2 today · 9,106 steps                              ← the rank you came from
     Synced 14:06

  ── compare ────────────────────────────────────
     Rashmi   9,106  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     You      7,240  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     1,866 steps ahead of you                            ← one sentence, no maths

  ── date ───────────────────────────────────────
     the month-scroll calendar component from the
     Activity / Sleep tabs — not a clipped 7-day strip

  ── their day ──────────────────────────────────
     Activity        steps · distance · calories         ← Home's card, Home's order
     Health monitor  HR · SpO₂ · stress · skin temp · HRV
     Sleep           duration · stages

                    [ ♡ Cheer ]                          ← the page's one primary action
```

- **Card order matches Home exactly** (hard rule 5). The legacy order
  (activity → HR → sleep → SpO₂) is dropped; two pages showing the same metrics
  in two orders teaches two structures.
- **Every metric card is read-only.** Same component, `data-readonly` — no goal
  rings you can tap to edit, no "Measure all", no 3-dot menus that open your
  settings.
- **No email, no background setter, no share icon** (hard rules 6 and item 10).
  Identity is avatar + name + last sync.
- **The `⋯` menu** holds: Mute cheers from Rashmi · Remove from circle
  (destructive, confirm sheet) · Report. Nothing else.
- **The compare strip is the reason this page exists.** It is the first thing
  under the identity block and it restates in words what the two bars show.

**Scope note.** Per the owner's decision (2026-09-03), a circle member sees the
full metric set — activity, heart rate, sleep and SpO₂ — as the legacy build
does. There is no per-metric sharing control in rev 1. The consequence is
recorded in §9 rather than argued here: joining a circle by code hands over
resting heart rate and sleep to whoever holds that code, so the **join and
invite sheets must state plainly what a member will be able to see** before the
code is accepted. That statement is not optional copy.

### 4.4 Invite and Join — S04, S05

One entry point (`+`), one sheet, two clearly different tiers.

```
   Add people                                   ✕

   Invite someone to your circle
   They'll see your activity, heart rate,
   sleep and blood oxygen.                      ← required disclosure

        K 7 M 4 Q 2                             ← your code, --font-number
        [ Share ]     [ Copy ]

   ───────────────────────────────────────

   Have a code?
   [ Join a circle ]                            ← tertiary → S05
```

**S05 · Join** reuses the **OTP code-entry component from onboarding** — same
boxes, same paste handling, same error treatment. It restates the disclosure
above the boxes, keyed to the circle being joined once the code resolves
("Joining Koms's circle · 4 people · they'll see your activity, heart rate,
sleep and blood oxygen"), and the confirm action is the last step, never the
sixth character.

### 4.5 Circle members — S06

Reached from the leaderboard's `⋯` (or `+` sheet footer — see §9). A flat list
of members with a trailing remove for each, and **Leave circle** at the bottom
as a destructive tertiary row. Leaving uses the *consequence* variant of the
confirm sheet (Me tab §5.6): it names exactly what is lost and what the others
stop seeing.

---

## 5 · Screen inventory

Naming convention follows the shipped prototypes: inner pages are
`id="p-<slug>"`, `class="page"`.

### S01 · Friends card (on Home) → `card-friends`
`populated` · `solo` · `no-circle (CTA)` · `nobody-synced` · `skeleton`
· `stale` · `offline`

### S02 · Leaderboard → `p-friends`
`ranked` · `partial (some not synced)` · `nobody-synced` · `solo` · `no-circle`
· `loading` · `offline — last known` · `refresh-failed`

### S03 · Friend profile → `p-friend`
`day-with-data` · `day-no-data` · `not-synced-today` · `no-band`
· `left-the-circle (row goes read-only, then out)` · `loading` · `offline`

### S04 · Add people sheet → `sheet-add-people`
`default` · `code-loading` · `code-refresh-failed` · `share-unavailable`
· `at-cap`

### S05 · Join a circle → `p-join`
`empty` · `partial` · `validating` · `resolved (circle preview + disclosure)`
· `invalid-code` · `expired-code` · `already-a-member` · `circle-full`
· `offline`

### S06 · Circle members → `p-circle`
`list` · `removing (pending)` · `remove-failed` · `leave (confirm, consequence)`
· `you-are-the-last-member`

---

## 6 · Tab-level state modifiers

Build these as **independent modifiers**, not as fixed layouts — they combine
(an offline account can also have nobody synced). Reuse the existing
convention: `data-state` on the page root, `.stateful` on anything that reacts,
and the control-panel pattern from the Activity and Sleep prototypes so every
state is switchable for review.

| ID | Trigger | Home card | Leaderboard | Friend profile |
|----|---------|-----------|-------------|----------------|
| **F1** first load | circle not resolved | skeleton rows at full footprint | skeleton rows, no ranks, period control live | skeleton cards |
| **F2** no circle | never joined / left | CTA in the card slot, same footprint | invite/join screen in place of the list | n/a |
| **F3** solo | circle of one | your figure + "Invite someone to compare" | your row, no ranks, invite CTA promoted | n/a |
| **F4** populated | baseline | 3 rows + gap line | ranked list | full |
| **F5** nobody synced | all members `—` | figure + "Nothing to rank yet" | Not-synced break only, no ranked section | n/a |
| **F6** partial sync | some stale | ranks from synced members only; state line counts them | ranked + Not synced breaks | last-sync caption in the identity block |
| **F7** offline | no network | last-known figures, stale marker, no ranks recomputed | last-known + retry; **cheers queue and show pending** | last-known; cheer queues |
| **F8** your band offline | your own data stale | your row marked stale, still ranked on last-known | same | n/a |
| **F9** friend has no band | they never paired | they sit in Not synced permanently | row states "hasn't set up a band" | profile shows the band-required empty state, not blank cards |

**F6 is the dominant secondary state.** In a five-person circle, someone is
almost always unsynced. Build the Not-synced break properly and early — it is
what stops hard rule 2 from being quietly broken.

---

## 7 · Components

Eight components. Everything in the flow is assembled from them; a state missing
here is a state missing several times over. Build these first (§8 slice 1) with
every state switchable.

### 7.1 Leaderboard row — the workhorse
`ranked` · `you` (`--surface-raised` fill, name reads "You") · `leader`
· `not-synced` (no numeral, `—`, reason caption) · `stale` · `pressed`
(opacity only, per the button spec)

Anatomy, left → right: rank numeral (`--type-num-s`, `--text-3`) · avatar
(40px chip, following the Workouts card convention; initial letter on
`--surface-raised` when there's no photo) · name (`--type-p1`) over the relative
bar · figure (`--type-num-m` + unit in `--type-p3`, `--text-3`) · cheer control.

### 7.2 Relative bar
The `.gbar` fill from Today's goals, scaled to the leader's figure, edge-to-edge
within the row. `filled` · `you` · `zero` · `stale`. Fill uses
`--metric-steps`; your own row uses the same fill (you are not a different
metric).

### 7.3 Cheer control — one per row, plus the profile's primary
`idle` (regular-weight heart, `--text-3`, transparent chip) · `pending`
(optimistic, rolls back on failure) · `cheered` (fill-weight heart, `--text-1`,
`--surface-raised` chip) · `failed` (reverted + inline reason) · `at-limit`
(`--text-3`, non-interactive, reason on tap) · `queued` (offline)

> *Flagged:* a coloured filled heart wants `--metric-heartRate`, but metric
> aliases are for metrics, not social glyphs. Rev 1 is monochrome. If the team
> wants colour here, add a `--social-cheer` alias to `js/tokens.js` first —
> do not borrow the heart-rate hue.

Anything writing to the server **must** have the pending state. Never let a
cheer look settled while a write is in flight.

### 7.4 Friends card (Home) — 1 instance, fixed footprint
`populated` · `solo` · `no-circle` · `nobody-synced` · `skeleton` · `stale`.
All six render at the same height (hard rule 9).

### 7.5 Period control
`today` · `7-days` · `disabled` (offline — last-known is one period only).
Segmented, pinned under the header, never scrolls away (hard rule 3).

### 7.6 Compare strip — friend profile
`ahead` · `behind` · `level` · `no-data-either-side`. Two bars plus one
sentence. The sentence is the component, the bars are the illustration.

### 7.7 Code sheet
`invite` variant (code + Share + Copy + disclosure) · `join` variant (OTP
component + resolved-circle preview + disclosure). States per S04/S05.

### 7.8 Empty / member-required state — reused across S02, S03, S06
`no-circle` (what a circle does, routes to S04) · `nobody-synced`
· `friend-has-no-band` · `friend-left`. Same shape as the Me tab's
band-required empty state (§5.5 there) — do not invent a second empty-state
component.

**Reused, not rebuilt:** the OTP boxes (onboarding), the month-scroll calendar
(Activity/Sleep), the confirm sheet `#sheetTitle` / `#sheetRows` /
`#sheetConfirm` (Me tab), the button tiers (`components/button.html`), the
`.gbar` bar (Today's goals), the 40px icon/avatar chip (Workouts card).

---

## 8 · Build order

Four slices, each independently reviewable. Do not start a slice before its
dependencies are approved.

**1 · Components + the Home card.** All eight §7 components with every state
switchable, plus S01 at fixed footprint across its six states. No real data, no
navigation.
*Unblocks everything. Reuse the control-panel pattern from the Activity and
Sleep prototypes.*

**2 · Leaderboard, all nine F-states.** S02 with the ranked and Not-synced
breaks, the sticky you-bar, the period control, ties, and F1–F9 from the control
panel.
*Depends on 1. This is where hard rules 1 and 2 get proven or revised.*

**3 · Friend profile.** S03 against Home's actual card components in read-only
mode, plus the compare strip and the month-scroll calendar.
*Depends on 1. Can run parallel with 2. Will surface any Home card that can't
take a `readonly` flag — expect small changes on Home, and make them there.*

**4 · Invite, join, membership.** S04, S05, S06 and the confirm sheets. The
disclosure copy (§4.3) is written and reviewed in this slice, not improvised.
*Depends on 2.*

### Cross-surface dependency — do not discover this late
Slice 3 makes Home's metric cards render **someone else's data**. Every card in
the Activity monitor and Health monitor sections needs (a) a read-only mode that
drops its own controls, and (b) a data source it doesn't assume is you. That
work is not in the Friends flow but is created by it. If a card can't take a
read-only flag cleanly, that is a signal the card is holding state it shouldn't.

---

## 9 · Open — ask before building

Do not resolve these silently. If a build step needs one of them, flag it in a
code comment and ask.

**Product calls**
- [ ] **Naming.** Is `Family` fixed by backend strings or an OEM contract? If
      yes, the API keeps it and the view layer translates (§3). If no, rename
      end-to-end.
- [ ] **Card placement on Home.** This spec puts Friends last in the Activity
      monitor section on the "your data first" principle. Engagement may argue
      for higher. Decide once — moving it later moves it in every screenshot.
- [ ] **Ranking metric.** Steps only, or an activity score? Steps is legible and
      already the app's goal metric; a score is fairer across body types. Rev 1
      assumes steps.
- [ ] **Period.** `Today` + `7 days` proposed. Is there a case for a resetting
      weekly competition (Mon–Sun) rather than a rolling 7 days? They behave
      very differently on a Monday morning.
- [ ] **Member cap.** Decides whether `+` disappears at the cap, whether S05 has
      a `circle-full` state, and whether the leaderboard ever needs pagination.
- [ ] **One circle or many?** Rev 1 assumes exactly one. If a person can be in
      several, the Home card needs a selector and §4.1 changes shape.

**Privacy — needs an owner decision, not a default**
- [ ] **The disclosure is load-bearing.** Rev 1 shares all metrics (owner's
      call, 2026-09-03), so joining by code exposes resting heart rate and sleep
      to whoever holds it. The invite and join sheets must say so before the
      code is accepted. Sign off on that copy specifically.
- [ ] **Codes should expire and be revocable.** A permanent code that grants
      health-data access can't be un-shared. Rev 1 assumes a rotatable code —
      confirm, and decide the lifetime.
- [ ] **Does a removed member lose historical access?** Drives the S06 remove
      confirm copy and whether a friend profile can show a date from before
      you joined.
- [ ] **Report / block.** The `⋯` menu lists Report. Is there a route behind it,
      or should it come out of rev 1?
- [ ] **Minors.** If a child account can join a circle, the disclosure and the
      default sharing set both need a second look before this ships.

**Mechanics**
- [ ] **Cheer limit and effect.** One per person per period? Does the recipient
      get a push? An un-cheer? Without a limit the count is meaningless (item 4).
- [ ] **Overtaken notifications.** Out of scope for rev 1, but if they're
      planned, the period decision above constrains them.
- [ ] **No band, no data.** Does the app read phone step counts as a fallback?
      If not, F9 is permanent for those members and the copy must say so.
- [ ] **Tapping your own row** routes to the Activity tab at the selected period
      (hard rule 7). Confirm the back behaviour returns to the leaderboard.

---

## 10 · Acceptance criteria

- [ ] You render exactly once on the leaderboard; the sticky bar never
      coexists with your row
- [ ] No rank numeral is ever attached to a member with no figure for the period
- [ ] The period is visible on every Friends surface without scrolling
- [ ] Every figure has a unit
- [ ] The friend profile uses Home's metric cards, in Home's order, read-only
- [ ] No email, background setter, share icon or edit control on a friend's page
- [ ] Tapping your own row does not open a second copy of your own profile
- [ ] The Home card is the same height in all six of its states
- [ ] Cheer has pending, failed and at-limit states, and a stated limit
- [ ] Ties share a rank and the next rank skips
- [ ] The invite and join sheets state what a member will be able to see,
      before the code is accepted
- [ ] All nine F-states switchable from the control panel
- [ ] All eight §7 components built with every listed state
- [ ] OTP boxes, month-scroll calendar, confirm sheet, button tiers, `.gbar` and
      the 40px chip are reused, not reimplemented
- [ ] All colours and fonts from `js/tokens.js`; no hex, no font names
- [ ] Every numeral uses `--font-number` + `var(--num-features)`
- [ ] Destructive actions (leave, remove) are label-coloured, never red-filled
- [ ] Opens by double-clicking, no server
- [ ] `prefers-reduced-motion` respected
- [ ] Open items in §9 flagged in code comments, not silently decided
- [ ] `memory/changelog.md` updated

---

*Rev 1 — 2026-09-03. Supersedes the legacy Family Ranking screens (leaderboard +
"My Homepage" profile), which were inputs, not targets. Reverses the rev-3 Me-tab
cut of Family Ranking by relocating it to Home rather than restoring the Me-tab
row. Step 2 will add UI: layout, spacing, type sizes and per-screen component
specs.*
