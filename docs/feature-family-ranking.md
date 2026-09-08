# Feature: Friends (was "Family Ranking")

Reference spec for the social comparison flow: the Home card, the leaderboard,
a friend's profile, and the invite/join routes.
Status: **UX proposed (rev 2, 2026-09-03). Not yet approved.**
Prototype: **`Friends/friends.html`** — built to this spec, all nine F-states
and all eight components switchable from the control panel beside the phone.

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
| 8 | `Friends/friends.html` | the prototype this spec describes — open it before changing anything here |
| 9 | `memory/session-handoff.md` | where the last session left off |

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

1. **You appear exactly once in the list region.** Rev 2 keeps you out of the
   scrolling list entirely: the **sticky you-card** at the bottom of the
   leaderboard *is* your row — always on screen, never duplicated below.
   If you place in the top three you also appear on the podium; that is a
   placing celebrated in a different visual register, not a second list row,
   and it is the one intentional double appearance in the feature.
   *(Rev 1 made the card a scroll affordance that appeared only when your row
   scrolled away. The owner asked for it always-on, which is stronger: the one
   thing permanently on screen becomes the one thing you came to find out.)*
2. **Nobody is lost between the podium and the list.** The podium holds the top
   three *people*, not the ranks 1/2/3 — with a tie those are different things.
   Ranks 1, 2, 2 has no third place, and reserving a plinth for one drops the
   second second-placer off the screen entirely: too high for a list that
   starts at rank 4, with no plinth to stand on. Plinths carry each person's
   own rank numeral, which may repeat, and the list picks up from the fourth
   **person**.
3. **Never rank absent data.** A member with no synced figure for the selected
   period gets no rank numeral and no position. They sit in the Not synced
   break (§4.2) with their last-sync time. If **nobody** has synced, the screen
   says so; it does not order five zeroes.
4. **The period is always on screen.** Every figure on every Friends surface is
   qualified by the selected period, stated in the header, never implied.
5. **Every figure carries a unit.** `8,412 steps`, not `8,412`. On the
   leaderboard the unit is the **steps glyph** at the right end of the figure
   rather than the word — a glyph is a unit, a bare number is not.
6. **A friend's profile reuses Home's components.** Same cards, same order,
   same date control, same empty marks. If a metric card needs a change for
   this page, change it on Home too or don't change it.
7. **No self-affordances on someone else's page.** No background setter, no
   edit, no goal control, no email. A control that would write to your account
   does not render on a page about another person.
8. **The leaderboard never opens a second copy of your own data.** Tapping your
   own row routes to the Activity tab at the selected period (§5.3). Home and
   the Activity tab are already your profile; a third one is the bug in item 9.
9. **Cheering is an action with a state, not a counter.** It has idle, pending,
   done and at-limit states, and a stated per-period limit.
10. **The card slot on Home never changes footprint.** Friends, none, or one —
   the Friends card occupies the same height so nothing below it moves (same
   rule as the Me tab's pairing CTA). The height is **fixed**, not a minimum:
   a state whose copy wraps to an extra line has copy that is too long, not a
   card that may grow.
11. **Tokens only.** No hex values, no font names, no raw px colours. If a token
    is missing, add it to `js/tokens.js` first and flag it in a comment.
12. **Flag, don't decide.** Anything §9 leaves open gets a code comment at the
    point of decision, not a silent choice.

---

## 3 · The model — codes make links, not groups

Settled with the owner, 2026-09-03, and it governs every string in the feature.

**v1 creates no group.** A code is a personal handle. When someone enters your
code, the two of you are linked: they appear on your leaderboard and you appear
on theirs. Nothing is created that both of you belong to.

Four consequences, none of them cosmetic:

1. **Leaderboards are personal and they differ.** If Rashmi and Ankit both
   enter your code, your board has both of them; their boards each have only
   you. Your rank on your board is not your rank on theirs. No copy may imply
   one shared standing — "you're 2nd" is always *on your leaderboard*.
2. **There is nothing to leave.** Rev 1 had a Leave-circle action and a
   consequence sheet for it. Both are cut. You remove friends one at a time,
   and **removal is mutual** — you drop off their board as they drop off
   yours. The remove confirm has to say so; someone who thinks they are only
   tidying their own list will be surprised otherwise.
3. **Sharing and entering a code are the same act from two ends.** Both produce
   an identical link. First use presents them as two ways in, not two features.
4. **The disclosure is symmetrical**, which is also what makes the exchange
   feel fair: *you'll each be able to see the other's activity, heart rate,
   sleep and blood oxygen*. Rev 1's one-directional wording described a group
   handover that does not happen.

> **Open, and load-bearing (§9):** if Rashmi and Ankit both use *your* code, do
> they see each other? This spec says **no** — a code creates one link per use,
> which is what the owner's description says. If the answer is yes, the code is
> a group id, this section is wrong, and the join preview must name everyone
> the new person is about to become visible to, not just the code's owner.

---

## 3b · Naming

The legacy surface is called **Family Ranking** and the join unit is a *family*.
Neither survives contact with the feature: you swap a six-character code with
anyone, and the app's own copy elsewhere ("Good morning, Aanya") is personal,
not familial.

**The feature is Friends.** There is no group noun, because there is no group
(§3) — people are your **friends**, the thing they appear on is **your
leaderboard**, and the code is **your code**. The verb is **cheer**, not like.

> Rev 1 proposed *circle*. Cut: it names a bounded thing everyone shares and
> sees identically, which is the one thing v1 does not build. Every string that
> used it was quietly asserting the wrong model.

Vocabulary to retire, wherever it appears in strings: *Family*, *Family
Ranking*, *circle*, *group*, *member*, *join* (as in joining a thing — you
enter a code), *leave*, *My Homepage* (as a title on another person's page),
*like*.

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

**First use (F2).** The card slot holds the same footprint with a one-line
explanation and a way through to the educational screen. The teaching happens
on S02, not in a card two thirds of the way down Home.

**Card content, populated state (F4):**

```
┌────────────────────────────────────────────┐
│ Friends                      Today      ›  │   card-head + period
│                                            │
│  1  ◍ Koms                    12,480 👣    │   leader
│  2  ◍ Ankit                    9,106 👣    │   ← the person above you
│  4  ◍ You                      7,240 👣    │   highlighted
│                                            │
│  1,866 steps behind Rashmi                 │   the reason to come back
└────────────────────────────────────────────┘
```

No bars here either: these are miniature leaderboard rows and must not teach a
different reading from the screen they open.

Rules for the card: it shows **at most three rows** — the leader, the person
directly above you, and you. If you *are* the leader, it shows you, second and
third. The closing line always states the nearest actionable gap (the person
above you, or "You're leading by N steps"). Tapping anywhere opens S02.

### 4.2 Leaderboard — S02

No photographic hero: the podium is what makes the top of this screen worth
looking at, and unlike a stock photo it is about the people on it. Header, then
the period control pinned under it, then podium, list, sticky card.

```
‹   Friends                          [ ↑ ]  [ + ]  [ ⋯ ]
                                      share  code  friends

  [ Today ]  [ 7 days ]                        ← segmented, pinned
  6 of 8 synced · updated 14:20                ← honest state line

── podium · the top three people ─────────────────────────
              ( K )
     ( M )    Koms      ( R )
     Meera   12,480 👣  Rashmi
    10,420 👣           9,106 👣
     ┌───┐   ┌─────┐   ┌───┐
     │ 2 │   │  1  │   │ 3 │            ← each plinth carries that
     └───┘   └─────┘   └───┘               person's own rank

── the list · from the fourth person ─────────────────────
  3  ◍  Ankit                         9,106 👣        ♡ 1
  6  ◍  Dev                           4,180 👣        ♡ 0

── not synced ────────────────────────────────────────────
     ◍  Shashank                          — 👣        ♡ 0
        last synced Tue
     ◍  ankitkaushik                      — 👣        ♡ 0
        hasn't set up a band

              [ Share your code ]

  ┌──────────────────────────────────────────────────┐
  │ 5  ◍  You                          7,240 👣      │   ← sticky, always
  │       1,866 steps behind Ankit                   │
  └──────────────────────────────────────────────────┘
```

**Rows carry no progress bar** (rev 2, owner). The figure sits at the right end
with the steps glyph as its unit. The bars were doing comparison work that the
podium now does better: five bars all sitting at roughly 70% of the leader told
you less than five numbers do, and they made a list you scan look like a chart
you read.

**Ties share a rank and the next rank skips** (1, 2, 2, 4) — and the podium
takes the first three *people*, so a tie fills all three plinths and strands
nobody (hard rule 2).

**The Not synced break has no rank numerals**, figures are `—`, and each row
states why in `--text-3`.

**The sticky you-card** is always present and you are not in the list above it.
It carries your rank, your figure and the gap sentence, so the one thing
permanently on screen is the one thing you came to find out. When you have
nothing synced it says so rather than showing a zero.

**Period control.** `Today` (default) and `7 days`. On `7 days` the figure is
the total across the last seven days and the state line names the range
(`Aug 28 – Sep 3`). Ranks recompute. Nothing else changes.

**Two actions on the right of the header** (rev 2, owner): **share your code**
and **enter a friend's code** — the two ends of the same link (§3), which is
why they sit together. A third, quieter `⋯` opens your friends list.

> **Flagged:** rev 1 deliberately collapsed these into one `+` because the
> legacy screen's two unlabelled header icons were indistinguishable (item 6 of
> §1). Two icons are back at the owner's request, so the risk returns and has
> to be managed rather than ignored: the app's Phosphor set has no
> `share-network` or `sign-in`, which are the glyphs this pair actually wants.
> The prototype uses `arrow-circle-up` and `plus`, the closest it carries, and
> they are **not** distinguishable enough — a person cannot tell from the icons
> alone which hands out a code and which takes one. Add the two real glyphs to
> the icon set before this ships. Until then both buttons carry an aria-label
> and both destinations name themselves in their first line.

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

### 4.4 Share your code — S04, and enter a code — S05

Two ends of one act (§3), reachable from either header icon and from first use.

```
   Share your code                              ✕

   Anyone who enters this sees your steps
   ⓘ You'll each be able to see the other's
     activity, heart rate, sleep and blood
     oxygen — for any day, not just today.      ← required disclosure

        K 7 M 4 Q 2
        [ Share ]     Copy

   ───────────────────────────────────────
   Have a code?
   [ Enter a friend's code ]                    ← tertiary → S05
```

**S05 · Enter a code** reuses the **OTP component from onboarding** — same
boxes, same paste handling, same error treatment. Once the code resolves it
previews **the one person** it belongs to, not a group, restates the mutual
disclosure, and only then offers the confirm. The sixth character is never the
commit.

Error states worth naming: your own code (offer Share instead), an expired
code, and a person you are already linked to.

### 4.5 Your friends — S06

A flat list of the people on your leaderboard, each with a trailing **Remove**.
You are not in it — it is a list of your friends, not of a group's members.

There is **no Leave action**, because there is nothing to leave (§3). Remove
uses the *consequence* variant of the confirm sheet (Me tab §5.6) and its copy
must state that removal is mutual: they disappear from your leaderboard and you
disappear from theirs.

The page also holds your code, with **Share** and **Rotate**. Rotating stops the
old code working while existing friends stay — see §9, a permanent code that
grants health-data access can never be un-shared.

### 4.6 First use — the educational state

Nobody has used this before and the model is not guessable, so S02 teaches it
before asking for anything.

```
   Compare your steps
   Swap codes with friends and family.
   Everyone keeps their own leaderboard.       ← the model, in one line

   ① Share your code. Anyone who enters it shows up on
     your leaderboard, and you show up on theirs.
   ② Or enter a friend's code. Same result — it works
     from either side.
   ③ You'll each see the other's day — activity, heart
     rate, sleep and blood oxygen, for any date. Remove
     someone and you both disappear from each other's list.

   YOUR CODE
        K 7 M 4 Q 2                            ← in the open, not behind a sheet

   [ Share your code ]                         ← primary
     Enter a friend's code                     ← tertiary
```

Three things this has to get right, and the legacy build got none of them
because it had no empty state at all:

- **It names the unit of the thing.** Not "invite people to a group" — a code,
  and what happens when someone uses it.
- **It says sharing and entering are equivalent** (§3), so nobody hunts for the
  "right" one.
- **It states the cost before the ask.** Step 3 is the disclosure, in the
  educational flow rather than only in a sheet that a person may skim. Removal
  being mutual is stated here too, because it is a property of the link, and
  first use is when the link is being explained.

The code is on the screen rather than behind the share button: the entire
first-use task is getting it to someone.

---

## 5 · Screen inventory

Naming convention follows the shipped prototypes: inner pages are
`id="p-<slug>"`, `class="page"`.

### S01 · Friends card (on Home) → `card-friends`
`populated` · `solo` · `first-use (CTA)` · `nobody-synced` · `skeleton`
· `stale` · `offline` — all at one fixed height

### S02 · Leaderboard → `p-friends`
`ranked` · `partial (some not synced)` · `nobody-synced` · `solo`
· `first-use (the educational state, §4.6)` · `loading`
· `offline — last known` · `refresh-failed`

### S03 · Friend profile → `p-friend`
`day-with-data` · `day-no-data` · `not-synced-today` · `no-band`
· `left-the-circle (row goes read-only, then out)` · `loading` · `offline`

### S04 · Share your code → `sheet-share`
`default` · `code-loading` · `code-refresh-failed` · `share-unavailable`

### S05 · Enter a code → `p-join`
`empty` · `partial` · `validating` · `resolved (person preview + disclosure)`
· `invalid-code` · `expired-code` · `your-own-code` · `already-linked`
· `offline`

### S06 · Your friends → `p-circle`
`list` · `nobody-yet` · `removing (pending)` · `remove-failed`
· `remove (confirm, consequence — states that removal is mutual)`

---

## 6 · Tab-level state modifiers

Build these as **independent modifiers**, not as fixed layouts — they combine
(an offline account can also have nobody synced). Reuse the existing
convention: `data-state` on the page root, `.stateful` on anything that reacts,
and the control-panel pattern from the Activity and Sleep prototypes so every
state is switchable for review.

| ID | Trigger | Home card | Leaderboard | Friend profile |
|----|---------|-----------|-------------|----------------|
| **F1** first load | leaderboard not resolved | skeleton rows at full footprint | skeleton rows, no podium, no sticky card, period control live | skeleton cards |
| **F2** first use | no friends yet | one-line explanation + a way through, same footprint | the educational state (§4.6) in place of the list; no sticky card | n/a |
| **F3** solo | one friend, nothing on their side | your figure + "Share your code to compare" | sticky card only, no podium, share promoted to primary | n/a |
| **F4** populated | baseline | 3 rows + gap line | podium + list + sticky card | full |
| **F5** nobody synced | everyone `—` | "Nothing to rank yet" | no podium; Not-synced break only; sticky card says nothing is synced | n/a |
| **F6** partial sync | some stale | ranks from synced members only; state line counts them | ranked + Not synced breaks | last-sync caption in the identity block |
| **F7** offline | no network | last-known figures, stale marker, no ranks recomputed | last-known + retry; **cheers queue and show pending** | last-known; cheer queues |
| **F8** your band offline | your own data stale | your row marked stale, still ranked on last-known | same | n/a |
| **F9** friend has no band | they never paired | they sit in Not synced permanently | row states "hasn't set up a band" | profile shows the band-required empty state, not blank cards |

The sticky you-card is present in every state that has a leaderboard (F3–F9)
and absent in the two that do not (F1, F2).

**F6 is the dominant secondary state.** In a five-person circle, someone is
almost always unsynced. Build the Not-synced break properly and early — it is
what stops hard rule 2 from being quietly broken.

---

## 7 · Components

Ten components. Everything in the flow is assembled from them; a state missing
here is a state missing several times over. Build these first (§8 slice 1) with
every state switchable.

### 7.1 Leaderboard row — the workhorse
`ranked` · `not-synced` (no numeral, `—`, reason caption) · `stale`
· `pressed` (opacity only, per the button spec) · `skeleton`.
There is no `you` state: you are never a row in this list (hard rule 1).

Anatomy, left → right, on one line: rank numeral (`--type-num-s`, `--text-3`)
· avatar (40px chip, following the Workouts card convention; initial letter on
`--surface-raised` when there's no photo) · name (`--type-p1`) · figure
(`--type-num-m`) with the **steps glyph** as its unit at the right end · cheer
control. A second line appears only to carry a reason (`stale`, `not-synced`).

### 7.2 ~~Relative bar~~ — cut in rev 2
Leaderboard rows and the Home card carry no bar. The one place a bar survives
is the compare strip (7.6), where there are exactly two values and the bars are
the picture its sentence describes.

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

### 7.9 Podium — 1 instance
`three` · `two (third plinth empty)` · `tie (two 2nds, no 3rd)` · `you-placed`
· `absent (fewer than two figures)`.
Holds the top three **people**. Plinth height carries the placing, the numeral
names each person's own rank. Tiles tap through like rows; your own tile routes
per hard rule 8.

### 7.10 Sticky you-card — 1 instance
`ranked` · `leading` · `only-figure` · `not-synced` · `hidden (F1, F2)`.
Always on when there is a leaderboard, and the only place you appear in the
list region. Carries rank, figure and the gap sentence.

### 7.11 First-use education — 1 instance
`default` · `code-loading` · `code-unavailable`.
Three numbered lines, the code in the open, and the two ways in.

### 7.8 Empty / member-required state — reused across S02, S03, S06
`nobody-synced` · `friend-has-no-band` · `friend-left` · `nobody-yet` (S06).
First use is **not** one of these — it is its own component (7.11), because an
empty state that has to teach a model is a different job from one that reports
an absence. Same shape as the Me tab's
band-required empty state (§5.5 there) — do not invent a second empty-state
component.

**Reused, not rebuilt:** the OTP boxes (onboarding), the month-scroll calendar
(Activity/Sleep), the confirm sheet `#sheetTitle` / `#sheetRows` /
`#sheetConfirm` (Me tab), the button tiers (`components/button.html`), the
`.seg4` pill (metric detail pages), the `.gbar` bar (Today's goals — compare
strip only now), the 40px icon/avatar chip (Workouts card).

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
- [ ] **Is there a cap?** Under the link model nothing can be "full", so a cap
      would be a limit on how many people may hold a working code — a different
      question, and one that decides whether the leaderboard needs pagination.
- [ ] **Is a code transitive?** The one that matters most. If Rashmi and Ankit
      both use *your* code, do they see each other? §3 says no — one link per
      use. If the answer is yes, the code is a group id, §3 is wrong, and the
      join preview has to name everyone the new person becomes visible to.
- [ ] **Does everyone get one code, or one per friend?** One code is simpler and
      is what rev 2 assumes. Per-friend codes make revocation surgical instead
      of all-or-nothing, which matters given what a code shares.
- [ ] **Two header icons.** Restored at the owner's request. The app has no
      `share-network` / `sign-in` glyph, and the closest two it carries are not
      distinguishable enough — see the flag in §4.2. Add the real glyphs, or
      accept a labelled two-button row instead of icons.

**Privacy — needs an owner decision, not a default**
- [ ] **The disclosure is load-bearing.** Rev 1 shares all metrics (owner's
      call, 2026-09-03), so joining by code exposes resting heart rate and sleep
      to whoever holds it. The invite and join sheets must say so before the
      code is accepted. Sign off on that copy specifically.
- [ ] **Codes should expire and be revocable.** A permanent code that grants
      health-data access can't be un-shared. Rev 1 assumes a rotatable code —
      confirm, and decide the lifetime.
- [ ] **Does a removed friend lose historical access?** Drives the S06 remove
      confirm copy and whether a friend profile can show a date from before you
      linked.
- [ ] **Is removal really mutual?** Rev 2 says yes, because the link is one
      object. A one-sided removal would mean they still see you while you no
      longer see them, which is the worst of both. Confirm.
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

- [ ] You are never a row in the scrolling list; the sticky card is your row
- [ ] The sticky card is present in F3–F9 and absent in F1 and F2
- [ ] Every person with a figure appears exactly once — on the podium or in the
      list — in every state, ties included
- [ ] No rank numeral is ever attached to a member with no figure for the period
- [ ] The period is visible on every Friends surface without scrolling
- [ ] Every figure has a unit
- [ ] The friend profile uses Home's metric cards, in Home's order, read-only
- [ ] No email, background setter, share icon or edit control on a friend's page
- [ ] Tapping your own row does not open a second copy of your own profile
- [ ] The Home card is the same height in all six of its states — a fixed
      height, so no state can push it
- [ ] Cheer has pending, failed and at-limit states, and a stated limit
- [ ] Ties share a rank and the next rank skips, and fill all three plinths
- [ ] No leaderboard row or Home card row carries a progress bar
- [ ] Every figure on the leaderboard carries the steps glyph
- [ ] The words circle, group, member and leave appear nowhere in the UI
- [ ] The remove confirm states that removal is mutual
- [ ] First use states the model, shows the code, and offers both ways in
- [ ] The invite and join sheets state what a member will be able to see,
      before the code is accepted
- [ ] All nine F-states switchable from the control panel
- [ ] All ten §7 components built with every listed state
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

*Rev 2 — 2026-09-03. Supersedes rev 1 of the same day. Changes: §3 settles that
v1 creates no group — a code makes a mutual link — which retires "circle" and
the Leave action and makes removal mutual and the disclosure symmetrical; §4.6
adds an educational first-use state; §4.2 adds the podium, drops the row bars in
favour of a figure plus the steps glyph, makes the you-card always-on and takes
you out of the list, and restores two header actions (share / enter a code) with
the icon-legibility risk flagged rather than assumed away. Hard rule 2 is new and
came out of building it: the podium must hold the top three people, not the ranks
1/2/3, or a tie silently drops someone off the screen.*

*Rev 1 — 2026-09-03. Superseded the legacy Family Ranking screens (leaderboard +
"My Homepage" profile), which were inputs, not targets. Reversed the rev-3 Me-tab
cut of Family Ranking by relocating it to Home rather than restoring the Me-tab
row. Step 2 will add UI: layout, spacing, type sizes and per-screen component
specs.*
