# Feature: Onboarding (first run)

## What it does
Takes a brand-new Pebble Band 2 owner from app launch to a set-up account with
daily targets, then hands off to Home. Nine screens in one self-contained file:

```
splash → sign-in → enter code → you're in
       → 1 profile → 2 activity level → 3 goal → 4 daily targets → Home (empty)
```

Lives in `onboarding.html`. Opens by double-clicking — no server, no build.
A control panel beside the phone reaches every state directly.

## Acceptance criteria
- [x] All colors/fonts come from `js/tokens.js` (mirrored into `:root`; no hex
      literal outside that block)
- [x] Opens standalone from `file://`
- [x] `prefers-reduced-motion` respected — no slide, shake or spinner rotation
- [x] No `box-shadow` used as a drop shadow, only `inset` rings
- [x] Every numeral is League Spartan with `tnum`; every unit beside one is the
      text face, uppercase, `ls .08em`
- [x] The spec's §4 example reproduces 8 000 / 5.5 / 500 exactly
- [x] Editing steps moves distance and vice versa; each tag flips to Reset on
      first manual edit and back on reset
- [x] Keyboard-only: whole flow completable, focus ring on every control, one
      tab stop per radio group, arrow keys move selection
- [x] No clipped labels at 200% type
- [x] Back from step 4 to step 1 and forward again preserves every entry
- [x] Renders at 360×780 in the existing `.phone` shell

## Implementation approach
- Shell: `.ob-stack` holds one `section.ob-screen` per screen; the 32px
  `.statusbar` overlay stays, so content starts 44px down as on every tab.
- Components added (all in terms of existing tokens): `.btn-primary` /
  `.btn-secondary` / `.btn-neutral` / `.btn-text`, `.optcard`, `.field`,
  `.seg` + `.seg--mini`, `.prog`, `.stepper`, `.otp`, `.ob-foot`, `.notice`.
- One `OnboardingController` in plain JS — same idiom as the existing tabs.
- State persists to `localStorage` after every step (falls back to memory when
  `file://` blocks it), so a killed app resumes where it stopped.
- Targets carry `source: 'suggested' | 'manual'`. Auto-refinement may only
  touch `suggested` ones — that is what "your manual edits are always
  respected" commits us to (D15).

## Dependencies / risks
- **Sign-in photos not in the repo yet.** Slots wired to
  `assets/onboarding/signin-1/2/3.png`; token gradients show until they land.
- The pebble mark and wordmark are code-drawn stand-ins for the real logo asset.
- `targets` is meant to write the **same record** the Activity tab's
  goal-setting sub-page reads (one record, two editors). In this standalone
  file it writes to `localStorage` only — wiring it to the shared record is a
  follow-up when the flow merges into `index.html`.

## Out of scope (marked `TODO(D20)` in the file where each attaches)
Band pairing screens · permission primers for motion / health / notifications ·
returning-user restore branch · timezone and week-start · full accessibility
audit. (Network / SMS-undelivered / rate-limit states were originally out of
scope too, but the owner asked for them, so they are built.)

## Open question carried forward
**D25 — selected option card: neutral or teal?** Built neutral. The teal
variant is a three-line swap in `:root`:
`--ob-selected-ring` / `--ob-selected-mark` / `--ob-selected-seg` →
`var(--metric-readiness)`. That switches the option-card ring, the option-card
check, the OTP current-box ring and the segmented-control thumb together.
