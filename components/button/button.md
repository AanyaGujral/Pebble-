# Button

Four tiers, one geometry. **Hierarchy comes from colour, never from size.**

Load `button.css` after the design-system token stylesheet. The component defines no tokens of its own.

---

## Picking a tier

Ask what the action *is*, not how important it feels.

| The action is… | Use | Example labels |
| --- | --- | --- |
| the one thing this screen exists for | `.btn--primary` | `Pair Now`, `Save Goal`, `Start Workout` |
| a real alternative route to the same outcome | `.btn--secondary` | `Enter Manually`, `Scan Code` |
| leaving, skipping, deferring, cancelling | `.btn--tertiary` | `I'll Do It Later`, `Skip For Now`, `Not Now` |
| removing the user's data | `.btn--destructive` | `Delete Workout`, `Remove Device` |

`.btn--secondary` is the tier most often reached for wrongly. If the second action leads somewhere *different* (a different flow, a different input method) it is secondary. If it just declines the primary, it is tertiary.

---

## Pairing

```
primary + tertiary      ← the default pair, use this unless there's a reason not to
primary + secondary     ← only when the second action is a real parallel route
tertiary alone          ← a screen with no committing action
```

**Never stack two teal buttons.** Two primaries, or a primary above a secondary that isn't a genuine alternative, leaves the eye with nowhere to land. There is exactly one teal element per screen.

Stack buttons vertically with a `12px` gap, full width, primary on top.

---

## Labels

- **Title Case**, one to three words.
- Name the outcome: `Pair Now`, not `Continue`. `Delete Workout`, not `Confirm`.
- Every button carries a label. **No icon-only buttons.**
- The label after the action should match the label on it — a button that says `Publish` produces a toast that says `Published`.

---

## Geometry — do not vary

| | |
| --- | --- |
| height | `52px` · `44px` with `.btn--m` |
| border-radius | `var(--radius-full)` — 999 |
| padding | `0 24px` |
| width | `100%` |
| box-shadow | `none` — the system has no shadows |
| label type | `p1` · 15 / 22 |

`.btn--m` exists for dense rows and bottom sheets. It is **not** a way to demote an action — if an action needs to be quieter, change its tier.

---

## States

Opacity only. No shrink, no glow, no scale, no new colours.

| Tier | Hover | Active | Disabled |
| --- | --- | --- | --- |
| primary | `.9` | `.8` | `.45` |
| secondary | `.75` | `.6` | `.45` |
| tertiary | `.7` | `.55` | `.45` |
| destructive | `.7` | `.55` | `.45` |

`[disabled]` also sets `cursor: default`. Motion is `opacity 120ms ease` and nothing else; it drops to zero under `prefers-reduced-motion: reduce`.

---

## Markup

Default pair:

```html
<button class="btn btn--primary" type="button">Pair Now</button>
<button class="btn btn--tertiary" type="button">I'll Do It Later</button>
```

Two real routes:

```html
<button class="btn btn--primary" type="button">Pair Now</button>
<button class="btn btn--secondary" type="button">Enter Manually</button>
```

Destructive, in a sheet:

```html
<button class="btn btn--destructive btn--m" type="button">Delete Workout</button>
<button class="btn btn--tertiary btn--m" type="button">Cancel</button>
```

Always set `type="button"` unless the button submits a form — an unset `type` inside a `<form>` defaults to `submit`.

---

## Token gaps

Three values in this component have no token to point at. Flagging rather than inventing:

1. **`52px` / `44px`** are off the spacing scale (…40, 48, 64). Deliberate, but untokenised.
2. **The primary label colour** uses `--neutral-900` directly. It equals `--surface-app`, but semantically it is a foreground on teal — there is no on-primary alias. Every teal-filled control will hit this.
3. **`--surface-raised`** is used across the app but is absent from the token export. Its value matches `neutral.700` (and `semantic.neutral.bg`). Not used by this component, but worth reconciling.
