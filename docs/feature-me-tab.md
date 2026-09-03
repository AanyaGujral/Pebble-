# Feature: Me tab

Reference spec for building the Me tab and its 14 inner pages.
Status: **UX approved (rev 3, 2026-09-02). UI not yet specified.**

> Read this file before writing any Me-tab code. It is the source of truth for
> structure, states and naming. It does **not** specify layout, spacing or type
> sizes — those come in step 2. Where this file is silent on visual detail,
> copy the nearest shipped component (Activity / Sleep tabs) rather than
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
| 5 | `components/pebble-nav.html` | bottom nav (Me is tab 4) |
| 6 | `Activity Tab/Workout Tab.html` | reference for `.card.stateful` + `data-state` |
| 7 | `memory/session-handoff.md` | where the last session left off |

---

## 1 · Hard rules

These are invariants. Breaking one is a bug, not a variation.

1. **Only the connected device exposes band functions.** Health Monitor,
   Health Reminder, Find Device, Take Picture, Firmware Update, Goal Setting
   and DND all act on the connected band. A second paired band is *dormant*
   and has no functions until it becomes connected. **Never build a device
   picker inside a band page.** The device card is the only place in the tab
   where a device is named.
2. **Flat list. No group headers.** The tab has no section labels. Structure
   comes from five silent card breaks (§3). Do not add `QUICK SETTINGS` /
   `BAND` / `APP` headers back in — the legacy app and dev build both had
   them and they were removed on purpose.
3. **Band rows stay live with no band paired.** Never disable, dim or hide a
   band row. It stays tappable and opens its own band-required empty state.
4. **The pairing CTA occupies the device card's slot**, at the same footprint.
   Nothing below it may shift position when a band is paired or unpaired.
5. **Low battery prompt is not user-configurable.** It always fires. If the
   row is shown at all it is a locked on-state with a visible reason.
6. **Tokens only.** No hex values, no font names, no raw px colours. If a
   token is missing, add it to `js/tokens.js` first and flag it in a comment.
7. **Flag, don't decide.** Anything this spec leaves open (§8) gets a code
   comment at the point of decision, not a silent choice.

---

## 2 · Token vocabulary

Use these names. Do not invent aliases, do not reach for a primitive ramp
where an alias exists.

**Surfaces** `--surface-app` (tab background) · `--surface-card` (rows, cards)
· `--surface-raised` (chips, disabled control fill) · `--surface-fill`
· `--divider` (row separators)

**Text** `--text-1` (row labels, values) · `--text-2` (secondary, trailing
values) · `--text-3` (captions, hints)

**Accent** `--metric-readiness` — the product teal. Primary buttons, active
toggles, selected states. One primary action per screen.

**Semantic** `--positive-{bg,fill,icon,text}` (Connected, success)
· `--caution-{...}` (update available, stale, warnings)
· `--negative-{...}` (disconnected, low battery, destructive labels)
· `--neutral-{...}` (dormant, not worn, inert)

> Never use a red *fill* for a destructive action. Destructive = tertiary
> button shape with a `--negative-text` label. See `components/button.html`.

**Type** `--type-p1` / `--type-p2` / `--type-p3` (row labels, body)
· `--type-overline` (11/16, 600 — small labels)
· `--type-caption` · `--type-h1..h3` (page titles)
· `--type-num-xs..2xl` (any figure: battery %, version, MAC, counts)

**Fonts** `--font-text` (Google Sans Flex — all prose) · `--font-number`
(League Spartan — every numeral, always with `font-feature-settings:
var(--num-features)`)

**Other** `--radius-card` · `--duration-fast|base|slow` · `--gridline`

**Icons** Phosphor only, inline SVG on a 256 viewBox. Existing convention:
`<span class="phi" data-ph="<name>" data-weight="fill|regular">`. Row icons
follow the Workouts card pattern — 20px glyph in a 40px chip — where a row
has an icon at all.

---

## 3 · Tab structure

Exact row order. Five silent breaks = five `.card`-style surfaces with no
labels between them.

```
Header            Me                                    [ + ]

── break 1 · the device ──────────────────────────────────
  Device card     image · name · status chip · battery %   → S03
  [Connect row]   dormant band, only when 2 paired        → S04

── break 2 · you ─────────────────────────────────────────
  Profile                                                 → S01
  Goal Setting                                            → S05

── break 3 · what the band does ──────────────────────────
  Health Monitor                                          → S06
  Health Reminder                                         → S07
  Find Device                                             → S08
  Take Picture                                            → S09
  Firmware Update            [badge]                      → S10

── break 4 · switches (nothing navigates) ────────────────
  Do Not Disturb             [toggle]
  Call notification          [toggle]
  Low battery prompt         [toggle, locked on]
  Usage analytics            [toggle]
  AI insights                [toggle]

── break 5 · app and help ────────────────────────────────
  Units & Format             Metric                       → S11
  Apple Health                                            → S12
  FAQs                                                    → S13
  About                      v2.0.1                       → S14
```

**Why this order** (needed if a new row has to be placed): the tab runs
object → you → what the band does → what it tells you → the app. Frequency
falls monotonically down the tab; reversibility rises. Nothing near the top is
destructive, nothing near the bottom is urgent.

**Break 4 exists to make the affordance self-evident.** Toggle rows must not
be mixed among navigation rows — the user has to be able to predict whether a
tap navigates or flips something without reading a label.

**Not on this tab** (deliberate cuts, do not re-add):
Family Ranking · add-mobile-number promo · One-Key Measurement (it's on Home)
· Developer (7 taps on the version in About) · a separate Temperature Unit row
(merged into Units & Format) · a Notifications page (DND + Call notification
toggles cover it) · Edit Cards · Cycle · My Devices list · System Setting
(folded into S03).

---

## 4 · Tab-level state modifiers

Build these as **independent modifiers**, not as ten fixed layouts. They
combine — a two-band account can be offline with an update pending.

Reuse the existing convention: `data-state` on the tab root, `.stateful` on
anything that reacts, and the control panel pattern from the Activity/Sleep
prototypes so every state is switchable for review.

| ID | Trigger | Device card | Band rows | Everything else |
|----|---------|-------------|-----------|-----------------|
| **T1** first load | device not resolved | skeleton; no chip, no battery | render immediately (static labels) | toggles render from local state — no skeleton |
| **T2** no band | pairing skipped at onboarding | replaced by pairing CTA, same footprint | all 5 live → band-required empty state | DND + Call notification show band-required; the 2 consent toggles stay live |
| **T3** connected | baseline | image, name, Connected chip, battery % | all live | baseline |
| **T4** disconnected | out of range / BT off / band off | Disconnected chip; battery `—`; last sync relative | all 5 → reconnect-first. Goal Setting still accepts edits and queues them | band toggles show last-known, marked stale |
| **T5** syncing | transfer in progress | Syncing chip + progress; last-known values held | Firmware Update not tappable | unchanged |
| **T6** two paired | second band added | card + connect row for the dormant band; `+` hidden (cap) | unchanged — they always mean the connected band | unchanged |
| **T7** switching | user taps the dormant band | both entries pending; disconnect then connect | non-interactive until settled | **app-wide reload** — see §7 |
| **T8** update available | newer firmware on server | update badge | dot badge on Firmware Update | unchanged |
| **T9** low battery | below threshold | battery in `--negative-text` + caution line | Firmware Update blocks: "charge above 30% first" | prompt has already fired |
| **T10** offline | no network | band state is Bluetooth-local — card works fully | Firmware Update blocks on network; other 4 unaffected | FAQs blocks *if* articles are fetched; Apple Health unaffected |

**T4 is the dominant secondary state** — five rows plus two toggles resolve to
the same reconnect-first treatment. Build that component properly and early.

---

## 5 · Components

Six components. Everything in the tab is assembled from them; a state missing
here is a state missing a dozen times over. Build these first (§7 slice 1)
with every state switchable.

### 5.1 Navigation row — 12 instances
`default` · `value` (trailing value, e.g. Metric) · `badge` (dot, firmware)
· `pressed` (opacity only, per the button spec) · `needs-band` (still
tappable — opens the empty state)

### 5.2 Toggle row — 5 instances
`on` · `off` · `pending` (optimistic, rolls back on failure) · `failed`
(reverted + inline reason) · `stale` (last-known, band disconnected)
· `fixed-on` (low battery prompt — locked, with a visible reason)
· `blocked` (OS permission missing, links out to system settings)

Anything writing to the band **must** have the pending state. Never let a
toggle look settled while a write is in flight.

### 5.3 Device card
`connected` · `disconnected` · `syncing` · `updating` (locked, cannot
navigate away) · `low-battery` · `not-worn` · `skeleton` · plus the
`dormant-row` variant for the second band

Content: product image, device name, status chip, battery %. Battery is
**always** visible when known — it is the primary way a user learns the level.

### 5.4 Pairing CTA
`default` (what a band adds + one primary action) · `bluetooth-off`
(fix-this-first variant). Occupies the device card's slot at the same footprint.

### 5.5 Band-required empty state — 12 instances, 2 variants
`no-band` (what the page does once paired, routes to S02)
· `reconnect` (band exists but is offline, offers retry)

### 5.6 Confirm sheet — 4 destructive actions
`standard` (restart) · `consequence` (names exactly what is lost — unbind,
factory reset) · `in-progress` (non-dismissable) · `failed` (reason + retry)

Reuse the existing sheet pattern (`#sheetTitle` / `#sheetRows` /
`#sheetConfirm`) rather than a new one.

---

## 6 · Screen inventory

14 pages. Naming convention: follow the shipped prototypes — tab roots are
`id="page-me"`, inner pages are `id="p-<slug>"`, both `class="page"`.

### S01 · Profile → `p-profile`
One page: body metrics that feed the algorithms, then account details. Mobile
is verified at onboarding, so there is **no verification flow here** — editing
only.
`view` · `editing` · `validation-error` · `saving` · `save-failed / offline`
· `unsaved-changes exit guard` · `no-avatar` · `incomplete — affects accuracy`

### S02 · Pair a device → `p-pair`
Entered from `+`, from the CTA in the card slot, or from any band row's empty
state. **Reuse the onboarding pairing component — do not rebuild it.**
`scanning` · `devices-found` · `none-found` · `pairing` · `success` · `failed`
· `bluetooth-off` · `permission-denied` · `cap-reached`

### S03 · Device detail → `p-device`
Tap the card. Battery, firmware version, MAC, last sync — **and** the
destructive block the legacy app kept under System Setting: restart, factory
reset, unbind.
`connected` · `disconnected` · `syncing` · `low-battery` · `not-worn`
· `dormant — read-only` · `unbind (confirm + data warning)`
· `factory-reset (confirm)`

### S04 · Connect the other band → `p-switch`
Only exists when two bands are paired. Disconnects the current one, connects
the other, re-points the app's data source.
`confirm (first time for a given pair only)` · `switching` · `connected`
· `failed — rolled back` · `target-unreachable`

### S05 · Goal Setting → `p-goals`
Steps, distance, calories. **Already built** in onboarding and reachable from
the Activity tab — same component, third entry point.
`default` · `edited` · `saving-to-band` · `queued — band offline`
· `needs-band`

### S06 · Health Monitor → `p-monitor`
Per-metric continuous sampling: HR, SpO₂, stress, skin temp, HRV. Each costs
battery — say so on the page.
`all-on` · `mixed` · `all-off` · `writing-to-band` · `write-failed`
· `reconnect-first` · `needs-band` · `battery-impact note`

### S07 · Health Reminder → `p-reminders`
Sedentary, hydration, alarms, high and low HR alerts.
`empty` · `list` · `add/edit sheet` · `schedule-conflict` · `at-limit`
· `reconnect-first` · `needs-band`

### S08 · Find Device → `p-find`
Rings the connected band. **Distinct from `+`**, which pairs a new one — give
them different icons so they don't read as the same action.
`ready` · `searching` · `ringing (stop)` · `out-of-range` · `reconnect-first`
· `needs-band`

### S09 · Take Picture → `p-shutter`
Band acts as a remote shutter. Needs camera permission and a live connection.
`ready` · `camera-permission-denied` · `shutter-armed` · `reconnect-first`
· `needs-band`

### S10 · Firmware Update → `p-firmware`
**Highest-risk page in the tab.** An interrupted flash bricks a band, so every
guard state below is required, not optional. Build it last (§7 slice 5).
`up-to-date` · `update-available` · `downloading` · `installing (do not close)`
· `complete` · `failed` · `battery-too-low` · `connection-lost-mid-flash`
· `offline` · `needs-band`

### S11 · Units & Format → `p-units`
Distance, weight, **temperature**, time format, week start, date format.
`metric` · `imperial` · `mixed/custom` · `propagating-to-band`

### S12 · Apple Health → `p-health-sync`
One row, two platform implementations — Health Connect on Android. Per-data-
type read and write toggles.
`not-connected` · `connected` · `partial — some types denied`
· `permission-revoked at OS level` · `first-sync`

### S13 · FAQs → `p-faq`
States only needed if articles are fetched rather than bundled — decide before
building (§8).
`list` · `search-results` · `no-results` · `article` · `offline`

### S14 · About → `p-about`
Version, build, legal, open-source licences. Only fully static page in the tab,
and the home of the 7-tap developer unlock on the version number.
`default` · `developer-unlocked`

---

## 7 · Build order

Five slices, each independently reviewable. Do not start a slice before its
dependencies are approved.

**1 · Tab shell + components.** Device card slot and the five silent breaks as
static structure, plus all six §5 components with every state switchable. No
real data, no navigation.
*Unblocks everything. Reuse the control-panel pattern from the Activity and
Sleep prototypes.*

**2 · Device card, all ten tab states.** T1–T10 from the control panel: zero /
one / two bands, connected, disconnected, syncing, low battery, update pending,
offline. Plus the pairing CTA, the dormant-band row, S03, S04.
*Depends on 1. This is where hard rule 1 gets proven or revised.*

**3 · Band-independent pages.** S01, S11, S12, S13, S14. No band dependency, so
they build fast and establish the inner-page template.
*Depends on 1. Can run parallel with 2.*

**4 · Band pages.** S05–S09, each with `needs-band` and `reconnect-first`. S02
reuses the onboarding component. The five toggles wire up here.
*Depends on 2 and 3.*

**5 · Firmware Update.** S10 alone. Held back on purpose — the only page whose
failure state is a dead band, so it is built against a confirm-sheet and error
pattern that four other pages have already exercised.
*Depends on 4.*

### Cross-tab dependency — do not discover this late
Slice 2 changes the other three tabs. Once connecting the second band
re-points the data source, Health, Activity and Sleep each need (a) a way to
say which band recorded what they are showing, and (b) a reload state for the
moment the source changes. That work is not in the Me tab but is created by
it. Recommendation for T7: a blocking confirm the first time a given pair is
switched, silent thereafter.

---

## 8 · Open — ask before building

Do not resolve these silently. If a build step needs one of them, flag it in a
code comment and ask.

**Rows not in the approved list — cut, or oversight?**
- [ ] **Sign out** — in the current dev build. If it stays it goes at the very
      bottom, below About, as its own break. If it's out, how does someone
      change accounts on a shared phone?
- [ ] **Privacy Policy + delete account** — not a preference call: app stores
      and GDPR both require a reachable policy and an in-app deletion route.
      If not on this tab they need a home; About is the natural one.
- [ ] **Cycle** — in the dev build, absent from the approved list. If in, it
      slots into break 5 next to Units.
- [ ] **Edit Cards** — if cut, Home's card order is fixed. Fine, but should be
      a decision rather than a gap.
- [ ] **System Setting** — assumed folded into S03 (restart / factory reset /
      unbind). The legacy app also had language, time format and screen
      timeout in there; those need a home or a reason for going.

**Questions the page specs need**
- [ ] Is two bands a hard cap, or just the tested case? Decides whether break
      1 is a fixed two-slot layout or a list, and whether `+` disappears at two.
- [ ] What happens to a band's history when it's unbound — kept and browsable,
      or deleted with the pairing? Drives the S03 unbind confirm copy.
- [ ] Are FAQ articles bundled or fetched? Bundled removes four states and the
      offline case.
- [ ] After connecting the other band, where does the user land — back on the
      tab they came from with fresh data, or held in Me until it settles?
- [ ] DND is a toggle with no schedule. Most bands eventually want a DND
      window; adding one turns this row into a page. Confirm it stays a toggle.

---

## 9 · Acceptance criteria

- [ ] Row order matches §3 exactly; no group headers anywhere
- [ ] No device picker inside any band page (hard rule 1)
- [ ] Pairing CTA and device card occupy the same footprint — nothing below
      shifts between T2 and T3
- [ ] All ten T-states switchable from the control panel
- [ ] All six §5 components built with every listed state
- [ ] Every band row reachable with no band paired, opening the empty state
- [ ] Low battery prompt has no working off-state, and says why
- [ ] All colours and fonts from `js/tokens.js`; no hex, no font names
- [ ] Every numeral uses `--font-number` + `var(--num-features)`
- [ ] Destructive actions are label-coloured, never red-filled
- [ ] Opens by double-clicking, no server
- [ ] `prefers-reduced-motion` respected
- [ ] Open items in §8 flagged in code comments, not silently decided
- [ ] `memory/changelog.md` updated

---

*Rev 3 — 2026-09-02. Supersedes rev 1 (8 group headers) and rev 2 (4 group
headers). Step 2 will add UI: layout, spacing, type sizes and per-screen
component specs.*

---

## Addendum A — S01 Profile, build decisions (2026-09-03)

Rev 3 above is unchanged and still the source of truth for structure. This
addendum records what was decided when S01 was actually built, so the next
session does not re-open settled questions. Built in `Me Tab/Me Tab.html`
alongside the slice-1 tab shell.

### Decided by the owner

| Question | Decision |
|----------|----------|
| Shape | **Full inner page** (`p-profile`), content in `.group` card surfaces. Not a card that expands on the tab. |
| Editing | **Per-field sheets, batched into one Save.** A sheet returns a *draft*; nothing reaches the account until "Save changes". |
| Fields | Date of birth, gender, height, weight · name + avatar · activity level + fitness goal. |
| Daily targets | **Not on this page.** They are S05 Goal Setting, which already has its own row in break 2 and its own screen in onboarding and the Activity tab. |
| Phone | **Read-only**, shown with a Verified chip and no chevron. |

### How the states fall out

There are two copies of the profile: `saved` (what the account holds) and
`drafted` (what you are looking at). Every §6 state is a comparison of the two —
this is why the batched model was chosen over save-on-confirm.

| State | Trigger |
|-------|---------|
| `view` | nothing differs — **no save bar at all** |
| `editing` | any field differs; changed rows show the value in the accent plus a dot, so a batched save can be audited before it commits |
| `validation-error` | empty or over-long name, or a future date of birth; row shows the reason, Save is disabled (not hidden) |
| `saving` | rows and the avatar badge go inert; the button shows a spinner |
| `save-failed / offline` | a negative banner above the save bar; **the draft is kept**, so retry costs nothing |
| `unsaved-changes exit guard` | back or Discard with a difference → the §5.6 confirm sheet |
| `no-avatar` | initials monogram, never a stock silhouette |
| `incomplete` | any of the four body metrics unset → caution banner naming which ones and what they cost; those rows read "Add" in caution, never blank |

### Additions not in rev 3, flagged rather than assumed

- **Age and BMI** in the hero, both derived and never typed. BMI reads an em
  dash the moment height or weight is missing, which is what makes the
  incomplete state legible. Recalculates off the *draft*, so you see the
  consequence of a change before committing it. Cut BMI if unwanted — age
  alone still works.
- **Avatar** is a real file picker (`<input type=file>` → data URL), because
  nothing in onboarding collects a photo. The review panel's "Photo" option
  is a code-drawn stand-in in token colours; no photograph has been supplied.
- The three sheet bodies — wheel, calendar, choice list — are **ported from
  `Onboarding/onboarding.html`**, not rewritten, so the control you met at
  setup is the control you meet here.

### Still open — ask before resolving

- [ ] **No route to change a phone number anywhere in the app.** Read-only
      honours §6 literally, but the number is now unchangeable. Either an
      S15 change-number page that owns the OTP, or this row reusing
      onboarding's OTP component.
- [ ] **Minimum age.** The calendar refuses a future date; nothing enforces a
      floor. Carried over from onboarding, still unanswered.
- [ ] **Unit ownership.** The height/weight wheel has its own unit column, as
      onboarding does. S11 Units & Format owns the app-wide default and should
      propagate into it — wire that when S11 is built.
- [ ] **Goal Setting overlap.** S05 sets daily targets from these values. If
      a profile change should re-derive the targets, that is a cross-screen
      behaviour neither spec covers yet.
