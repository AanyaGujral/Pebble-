# Session Handoff

> **2026-08-27 — read this first.** New file: **`onboarding.html`** — the
> first-run flow (9 screens + a control panel), built to the owner's build
> spec. It is SEPARATE from `index.html` and self-contained; `index.html` is
> untouched by this work. Awaiting owner review.
>
> **What to pick up next, in order:**
> 1. **Sign-in photos.** The owner has three images to upload. Save them as
>    `assets/onboarding/signin-1.png`, `-2.png`, `-3.png` (a README in that
>    folder spells out the crop: subject in the upper two thirds, portrait
>    ~3:5). The slots are already wired — no code change needed. Token
>    gradients show until then.
> 2. **D25 is still the one open question.** Built neutral (raised fill +
>    neutral hairline ring). Show the owner both; the teal variant is a
>    three-line swap of `--ob-selected-ring` / `--ob-selected-mark` /
>    `--ob-selected-seg` in `:root`.
> 3. **Two things to confirm with the owner** (both flagged in code, not
>    decided silently): the navy splash ground uses `--sky-800` as brand
>    ground, which house rule 3 otherwise reserves for body signals; and the
>    sign-in headline stays on the h1 token (24/30) although their screenshot
>    is optically larger — going bigger needs a new type token in
>    `js/tokens.js` first, never a hard-coded size.
> 4. **The pebble mark and wordmark are code-drawn stand-ins.** A real
>    `assets/pebble-mark.svg` would drop straight in.
> 5. **When the flow merges into `index.html`**, `targets` must write the same
>    record the Activity tab's goal-setting sub-page reads — one record, two
>    editors (spec §5). Right now it only writes `localStorage`.
>
> Deliberately out of scope, with `TODO(D20)`-style markers where each
> attaches: band pairing, permission primers, returning-user restore,
> timezone/week-start, full a11y audit. The network / SMS-undelivered /
> rate-limit states were out of scope in the spec but the owner asked for
> them, so they are built and switchable from the panel.

> **2026-08-10 — read this first.** `index.html` is now the MERGED source of
> truth: it adopts the parallel session's build (metric details pages with a
> D/W/M/Y period switcher; control panel reduced to Default + No data and
> scoped to the Activity tab — Health/Sleep/Me tabs temporarily disabled in
> the tab bar) plus this session's StatTile feedback round (component-styled
> summary tiles, thousands formatting, one-line headers, DAY-11 best-day
> format, taller chart axis gap, no-data = headers + — + empty chart frames).
> The owner approved on 2026-08-10 and the branch is now PUSHED. The named
> snapshot lives in `Activity Tab/Workout Tab.html`; `index.html` stays the
> live working copy at the root. The background PNGs STILL have not arrived
> as files (three attempts, inline previews only), so the code-drawn
> stand-in scenes are what ship. Image slots are wired to
> `assets/backgrounds/activity-dusk.png` + `sleep-night.png` — dropping the
> real files in takes over automatically.

**Read this first when you (or Claude) pick up work.** It says what shipped,
what decisions were made, and the exact next steps.

## Current status

- `index.html` is now the full app prototype: Android phone mockup (360px)
  with 4 tabs — Health, Activity, Sleep, Me — and the bottom nav recreated
  from the supplied screenshot.
- Sleep and Activity tabs are recreated from the approved standalone
  prototypes (in `Sleep Tab/` and the uploaded Activity file): score rings,
  hypnogram, overnight vitals charts, today's goals, goals-met week rings,
  workouts list, nap, sleep continuity. Line/bar charts support press-drag
  scrubbing (value + timestamp swap into the card header).
- A control panel sits beside the phone and switches every data card between
  five states: **default, loading, syncing, watch-not-worn, empty**.
- `js/tokens.js` holds the real brand palette (crimson→orchid ramps,
  neutrals, metric aliases, League Spartan numerals + Google Sans Flex text).

## Decisions made (all flagged in code comments too)

- Token values are mirrored into CSS custom properties inside `index.html`
  because ES-module imports don't work over `file://` (the double-click
  requirement wins). If `js/tokens.js` changes, re-copy the values.
- Health and Me tabs have no approved spec — they are first-pass layouts
  reusing hero/tile/list patterns from the approved screens.
- The Activity hero's photographic backdrop was replaced with token
  gradients to keep the file small and colors tokenised.
- The full-month calendar from the standalone prototypes was simplified to
  a 7-day date dropdown in this build.
- 3-dot menu entries (About / Goal setting / Share) are visual-only here;
  the full subpages exist in the standalone prototypes.

## Exact next steps

1. Get the two background PNGs from the owner as file uploads and save them
   to `assets/backgrounds/activity-dusk.png` + `sleep-night.png` (slots are
   already wired; code-drawn stand-ins show until then).
2. Owner approval → push the pending local commits to
   `claude/pebble-app-tabs-prototype-jty6sh`.
3. Metric detail pages (tap a card → full-screen metric history).
4. Workout details page for the Activity tab.

## Done since first build (feedback round, 2026-08-07)

- Month-scroll history calendar modal (scroll up for earlier months) on all
  three data tabs; picking a day updates that tab's date label.
- About activity / About sleep read-only pages behind the 3-dot menus.
- Goal setting: activity (steps / distance / calories value sheet) and
  sleep (24 h bedtime dial, drag handles, 15-min snap, wake-up alarm toggle).
- Sleep continuity card expands to the "When you slept" 7-night timeline.
- All icons now Phosphor (path data embedded in index.html).
- Health tab: greeting "Good morning, Aanya", three nested rings
  (sleep / readiness / activity) + legend chips.
- Me tab rebuilt after the owner's settings screenshot: PBL Qore 2 device
  card (MAC, firmware, Unbind, status), working toggles, grouped rows —
  all colors/type from tokens.

## Known limitations

- Google Sans Flex / League Spartan load from the Google Fonts CDN; offline
  the prototype falls back to system sans (layout still holds).
- Chart data is invented sample data shaped to match the numbers shown in
  the approved prototypes.
