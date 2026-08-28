# Session Handoff

> **2026-08-28 — read this first.** New file `onboarding.html` holds the
> pre-login flow (Splash -> Onboarding -> Phone -> OTP -> Name -> Profile ->
> Activity level -> Goal -> Daily targets), rebuilt from the Figma "Pebble
> Phase 1" file through the Figma MCP connection. It is standalone, opens by
> double-clicking, and hands off to `index.html` on the last Continue.
> `index.html` is unchanged and is still the signed-in app.
>
> **Blocked on the owner — nothing else can close these:**
>   1. Goal screen copy is stand-in text, not signed-off product copy.
>   2. The "pebble" wordmark on the splash — only the mark SVG was supplied,
>      so the wordmark is live text.
>
> **Closed since:** the onboarding backdrop animation landed (sent as a zip;
> the Claude Design canvas link is not fetchable from a session). The three
> photos ship at `assets/onboarding/onb-1..3.jpg`. The "three Onboarding
> frames" question is answered — they are three backgrounds behind one
> screen, not three slides.
>   4. No designed screens for: country picker, DOB picker, or a
>      completion/success screen after the final Continue.
>   5. The onboarding ANIMATION. The Claude Design canvas link 403s — it is
>      not an artifact URL and cannot be fetched from a session. Needs to be
>      pasted or attached as a file.
>
> **Settled 2026-08-28 — do not re-raise:** the text-3 split (onboarding
> #999FB9 vs app #7B819C) is deliberate; the mark's #5BBCB1 stays
> hard-coded; height reads as total inches, not feet+inches.
> The full list of 16 open questions is in a comment at the bottom of
> `onboarding.html`.

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
