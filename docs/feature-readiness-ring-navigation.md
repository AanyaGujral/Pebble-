# Home ring navigation — specification

**Pebble · Information architecture · rev 1 · 2026-09-10**

Scope: what the three Home rings (Sleep · Readiness · Activity) do when tapped, and the
structure of the Readiness page that follows from it.

Verified against `Homepage  measurel all  start workout flow.html`,
`Workout Tab.html`, `js/tokens.js`, `button.html`, `StatTile_preview.html`.
Every value below traces to one of those files; anything without a token is flagged in §9.

---

## 1. The rule

> **A ring navigates to its metric's canonical day-detail. It never creates a second one.**

The deciding factor is not the metric — it is whether a destination already exists.

The Activity and Sleep tab roots *are already* day-detail views: Activity opens today's
breakdown, Sleep opens last night's. Giving either ring its own summary page would put the
same screen at two addresses — two scroll positions, two date cursors, two places for a bug
to live, and a user who cannot tell which one they are on.

Readiness gets a page for exactly one reason: nothing in the navigation owns it.

So the asymmetry is not a compromise. It is the correct read of *one metric, one day-detail
address*.

---

## 2. Destinations

| Ring | Owns a tab | Destination | Transition | Nav bar after tap |
|---|---|---|---|---|
| Sleep | Yes | Sleep tab root (`#page-sleep`) | Tab switch | Sleep lit |
| Readiness | No | Readiness page (`#sub-readiness`) | Push over Health | Health stays lit |
| Activity | Yes | Activity tab root (`#page-activity`) | Tab switch | Activity lit |

Ring order on Home is Sleep · Readiness · Activity, left to right (`.ring3row`), and the
destination order matches. Do not reorder one without the other.

---

## 3. Both primitives already exist — no new mechanism

This is the part worth knowing before anyone estimates the work. The codebase already has
exactly the two navigation behaviours this spec needs.

**Tab switch** — `showTab(name)`:

```js
$$('[data-goto]').forEach(t => t.addEventListener('click', () => showTab(t.dataset.goto)));
```

`showTab()` sets `aria-current="page"` on the matching `.pebble-tab`, toggles `.page.active`,
resets that page's `scrollTop`, closes menus, and hides every `.subpage`. The Home metric
tiles already use it (`data-goto="sleep"`, `data-goto="activity"`).

**Push** — `data-open` / `data-back`:

```js
$$('[data-open]').forEach(el => el.addEventListener('click', e => {
  if (e.target.closest('[data-mount]')) return;   // a press on a chart is a scrub, not a tap
  const sub = $('#' + el.dataset.open);
  sub.hidden = false;
  sub.scrollTop = 0;
}));
```

`.subpage` sits at `z-index:30` over the tab content, so the nav bar (`z-index:55`) stays
visible and Health stays lit. That is why Readiness is a `.subpage` and **not** a
`.page` with its own id: `showTab()` matches `#page-<name>` against the nav buttons, so a
`page-readiness` would leave the nav bar with nothing marked current — an unlit nav reads as
a bug.

### Wiring

| Element | Change |
|---|---|
| `.r3` (Sleep) | `div` → `button type="button"`, add `data-goto="sleep"` |
| `.r3` (Readiness) | `div` → `button type="button"`, add `data-open="sub-readiness"` |
| `.r3` (Activity) | `div` → `button type="button"`, add `data-goto="activity"` |

No JS changes. Both listeners are already bound at load.

Reset `button` UA styles on `.r3` while keeping its layout:

```css
.r3{
  display:flex; flex-direction:column; align-items:center;   /* unchanged */
  background:none; border:0; padding:0; margin:0;
  font-family:inherit; cursor:pointer;
  -webkit-tap-highlight-color:transparent;
}
```

---

## 4. The shared date model — required, not optional

This is the one real consequence of §1, and it is a change to existing behaviour.

**Current state.** Each tab keeps its own date cursor:

```js
const selDate = { health:{...TODAY}, activity:{...TODAY}, sleep:{...TODAY} };
```

and picking a day writes only to that tab:

```js
selDate[tab] = { y, m, d };
$('#page-' + tab + ' [data-datelabel]').textContent = dateLabelFor(tab);
```

Today that is invisible, because nothing crosses between tabs. The moment a ring does, it
becomes a defect: Home on Aug 3, tap the Activity ring, Activity shows Aug 6 — silently,
with no indication anything is wrong.

**Required.** One app-level selected date, shared by Home, Activity, Sleep and Readiness:

```js
let selDate = {...TODAY};                    // one value, not one per tab

// on date pick
selDate = { y, m, d };
$$('[data-datelabel]').forEach(el => el.textContent = dateLabel());   // every surface
```

Rules:

1. **Cold launch** resets to today.
2. **A tab switch never resets it** — including a switch caused by a ring tap. The date the
   user was looking at on Home is the date Activity opens on.
3. **`CAL_CFG` keeps its per-entry-point chrome.** The calendar's title and ring hue still
   come from where it was opened (`health` → teal, `activity` → lime, `sleep` → violet).
   Only the *value* it writes becomes global.
4. **Sleep resolves the date to a night.** The Sleep tab shows the night *ending* on the
   selected date. Selecting Aug 6 on Home and tapping the Sleep ring shows the night of
   Aug 5–6. State this in the Sleep header copy so the mapping is never ambiguous.
5. **Readiness has no picker of its own** (see §5). It reads the shared date and displays it
   read-only. The date is changed on Home.

---

## 5. The Readiness page

`#sub-readiness`, a `.subpage`. A one-day score breakdown — deliberately *not* a section:
there is no `.seg4` D/W/M/Y switcher and no history. That switcher is what separates a
detail page from a tab, and adding it later is the signal that Readiness has outgrown this
page and wants a nav slot.

Built to match the Sleep and Activity heroes, inside the subpage container.

```
.subpage#sub-readiness
├── .sub-head                    back chevron + "Readiness"
├── hero block
│   ├── date line               read-only, overline token, --text-3, centered
│   ├── .ringwrap > .ringbox    136px ring, --metric-readiness, matching the tab heroes
│   │   └── .score / .score-cap 56px numeral + "READINESS"
│   ├── .headline               17/22 semibold, --text-1
│   └── .summary                13/18 regular, --text-2
└── .sub-body
    ├── card — Contributors     .goalrow + .gbar rows, one per input
    ├── card — Overnight vitals StatTile 2×2 or .listrow, per Health-tab precedent
    └── card — Related          .listrow cross-links (§5.2)
```

### 5.1 Contributors

One card, one `.goalrow` + `.gbar` row per input — the same pattern as Today's Goals on the
Activity tab. No chevrons: these rows explain the score, they do not navigate.

| Row | Bar fill token |
|---|---|
| Sleep | `--metric-sleep` |
| HRV | `--metric-hrv` |
| Resting heart rate | `--metric-heart-rate` |
| Skin temperature | `--metric-skin-temp` |
| Blood oxygen | `--metric-spo2` |
| Previous-day activity | `--metric-activity` |

Track is `--surface-raised` with the shipped `inset 0 0 0 0.5px var(--neutral-500)`.
Six rows is the upper bound; drop the weakest inputs rather than paginating.

### 5.2 Related — cross-links

Readiness is built from sleep and activity data, so the page should hand the user onward
rather than dead-end. Two `.listrow` rows with `.chev`:

- **Sleep** → `data-goto="sleep"`
- **Activity** → `data-goto="activity"`

These need no new code. `showTab()` already hides every `.subpage`, so tapping one switches
tabs *and* closes Readiness — leaving no stale page behind the user. Both land on the shared
selected date.

### 5.3 About readiness

Add `#sub-about-readiness` for parity with `sub-about-activity` and `sub-about-sleep`,
reached from the Readiness page's own row or 3-dot menu.

**Constraint:** `.subpage` stacking is DOM order, not z-index — every `.subpage` is
`z-index:30`, and `data-back` hides only `closest('.subpage')`. So `#sub-about-readiness`
must appear **after** `#sub-readiness` in the document for the stack to read correctly, and
back must be pressed twice to return to Home. That is consistent with how the metric detail
pages behave today.

---

## 6. Header patterns — already distinct, already correct

The system already separates a tab root from a pushed page, and Readiness needs no new
component.

| | Tab root | Pushed page |
|---|---|---|
| Container | `.screen-head` | `.sub-head` |
| Padding | `44px 16px 0` | `40px 16px 0` |
| Title | `.screen-title` — 24/30, weight 500 (`headingH1Medium`) | `.sub-head .t` — 20/26, weight 500 (`headingH2Medium`) |
| Back | none | `.backbtn`, 40×40, `margin-left:-12px`, `caret-left` at 20px |
| Date | `.date-btn` + `.caret` | none |
| Overflow | `.dots-btn` → `.menu` | none |

Home is the exception that already exists: `.screen-title.greet` drops to 20/26 because it
carries a greeting rather than a tab name.

So the back-header pattern I flagged as missing in the earlier discussion **is already
built** — `.sub-head` with `.backbtn` and `data-back`. Readiness uses it verbatim.

---

## 7. Ring interaction

**Hit target.** `.r3` as a button is 92px wide (`.r3box`) by ~116px tall (92 + 8px gap +
16px label). Comfortably past the 44px minimum, and the label is inside the target.

Three separate rings in a row is what makes this workable. The nested three-ring treatment in
`Workout Tab.html` (`r=61/46/31`, 11px strokes) cannot carry three independent tap targets —
an 11px band is under a quarter of the minimum. If the nested treatment ever returns to Home,
this spec does not survive it, and the tap targets have to move to the `.chips` row below.

**Press state.** Opacity only, per the button spec's "states are opacity only, never a new
colour":

```css
.r3{ transition:opacity var(--duration-fast) ease; }
.r3:active{ opacity:.8; }
```

`.8` is the literal the button sheet uses for primary `:active`. No token names it — see §9.

**Focus.** Match the nav bar, not the button:

```css
.r3:focus-visible{ outline:2px solid var(--neutral-0); outline-offset:-2px; }
```

Rings sit on the photographic hero the way the nav sits over scrolling content, and the
button's `--metric-readiness` focus ring would collide with the readiness ring's own hue.

**Reduced motion.** Already covered by the file-level hard gate
(`*{transition:none !important}`); no per-component handling needed.

**Accessibility.** Each ring button needs an accessible name that carries the score, since
the visible text is a bare numeral plus a label:

```html
<button class="r3" type="button" data-goto="sleep" aria-label="Sleep score 78. Open sleep.">
```

---

## 8. States

| State | Ring | Tap |
|---|---|---|
| Default | score + arc | navigates |
| No data | `.value-dash` (`--`), arc hidden via `.live` | **still navigates**, to the destination's own no-data state |
| Syncing | `.statechip.sync` in the hero, `.hero-media` at `.75` | navigates |
| Partial day | Activity ring mid-day is legitimately incomplete | navigates |

A ring always navigates. A dead tap on a visible control is worse than an empty state that
explains itself, and both tab roots already have an owner-specified no-data treatment
(charts keep their frame, goals zero out, workouts card hides).

Readiness with no data: hero shows `--` at `--text-3` (the existing
`#app[data-state="empty"] .hero.stateful .score` rule), contributor bars at zero width, and
the `.summary` swapped to no-data copy.

**Sleep before the night is recorded** is genuinely absent, not merely incomplete — it needs
different copy from a mid-day Activity ring. Do not share one empty state between them.

---

## 9. Flags and open decisions

1. **This reverses a recorded decision.** `Homepage.html` line 1786 reads: *"No chevrons and
   no tap-through — owner request, 2026-08-14."* This spec makes the rings tap-through. The
   reversal is deliberate and needs your explicit sign-off before build; the comment should
   be updated in the same commit rather than left contradicting the code.
2. **No press/hover state tokens exist.** The button sheet hardcodes `.9/.8/.75/.6/.7/.55`;
   the nav uses `transform:scale(.92)`. `--state-dim`, `--state-plot-dim` and
   `--state-inactive` exist in the tokens CSS but are chart-scrub values marked
   `@kind other`. The `.8` in §7 is borrowed from the button sheet, not tokenised. Worth a
   `--state-press` token covering both.
3. **Two focus treatments are already in the wild.** `2px --metric-readiness` at `+4px`
   offset (button) vs `2px --neutral-0` at `-2px` (nav). §7 picks the nav's. This should be
   settled globally rather than per component.
4. **The `--type-*` shorthands are unused by the app.** `StatTile_preview.html` defines
   `--type-overline`, `--type-num-l` and the rest, but `Homepage.html` and `Workout Tab.html`
   inline the raw values with the token name in a comment. Not introduced by this spec, but
   the Readiness page will inherit whichever convention you settle on.
5. **32px ring numeral is off the numeric scale.** `.r3num` is 32px/600, between `numL` (24)
   and `numXl` (42). Already flagged in the source as your explicit pick — carried forward
   unchanged. The Readiness page hero uses 56px (`num2xl`), matching the tab heroes.
6. **Date scoping in the Sleep header** needs copy. Rule 4 in §4 requires the Sleep tab to
   say which night it is showing; there is no shipped string for it.
7. **The Readiness date line is a new element**, though it uses only existing tokens
   (overline, `--text-3`). It is not a `.sub-head` variant — it sits in the hero, below the
   header — so no component changes. Confirm you would rather have this than a `.date-btn`
   inside `.sub-head`, which *would* be a variant.

---

## 10. Build checklist

- [ ] `.r3` → `button`, UA reset, `data-goto` / `data-open` on the three rings
- [ ] `aria-label` per ring carrying the score
- [ ] `:active` opacity, `:focus-visible` outline
- [ ] `selDate` collapsed to a single value; all `[data-datelabel]` updated on pick
- [ ] Sleep night-boundary mapping + header copy
- [ ] `#sub-readiness` built per §5
- [ ] `#sub-about-readiness` added *after* `#sub-readiness` in the DOM
- [ ] `#sub-readiness` no-data state
- [ ] Line 1786 comment in `Homepage.html` updated
- [ ] Verify: Home → date back 3 days → each ring → correct date on arrival
- [ ] Verify: Readiness → Sleep cross-link → back returns to Home, not to Readiness
