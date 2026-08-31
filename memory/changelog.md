# Changelog

A running log of what changed and why. Add a new line at the top after each
meaningful change. Format: `[date] — what changed — why/notes`

---

- 2026-08-30 (button overflow fix) — Fixed a regression from the button
  refactor earlier the same day: every form-screen CTA was rendering 360px
  wide from left:16, hanging 16px off the right edge of the screen.
  Cause: `.btn` sets `width:100%`, and on an absolutely positioned box a
  non-auto width makes the `right` offset ignored — so the button sized to
  the full containing block instead of the 328px that left:16/right:16 was
  meant to give it. When `.cta` carried its own width this could not happen;
  reducing it to positioning only exposed it. `.cta` now sets `width:auto`
  explicitly, with a comment saying why it is load-bearing.
  The onboarding CTA never showed the bug because it sets an explicit 316px,
  which is why a spot check missed it.
  Verified by sweeping ALL 14 screens and measuring every button, field,
  card, tile and text block against the screen bounds — zero overflow, and
  CTA widths now read 328 on every form screen (316 on onboarding, as
  designed). Hidden elements are excluded so the recovery sheet's Try Again
  does not register as a false positive.

- 2026-08-30 (button kit + pairing) — Three changes.
  BUTTON: the updated component (components button spec) is inlined verbatim
  and `.cta` is reduced to positioning only, so the flow's buttons and the
  component can no longer drift apart. All eight CTAs are now
  `.btn.btn--primary`; the pairing declines are `.btn--tertiary`, per the
  component's own rule that a decline is never secondary and only one teal
  element may sit on a screen.
  ** CONFLICT, FLAGGED IN THE FILE ** the component defines disabled as
  opacity .45 on the tier's own colour, so a disabled primary is now teal at
  45% — this REPLACES the neutral-700 disabled fill the owner asked for on
  2026-08-28. Applied because the instruction was to take the component's
  logic; raised because it overrides an explicit earlier request. One line in
  .cta[disabled] reverts it.
  Also added the two tokens the component needs and js/tokens.js lacked:
  `controlHeight` (l 52 / m 44 — deliberately off the spacing scale) and
  `textColor.onAccent` (#07080C, the label on a filled accent).
  DOTS: the onboarding slide dots are removed. Swipe and the auto-advance
  stay; onbShown still tracks position for the swipe.
  PAIRING: five stages plus a recovery sheet, ported from the owner's "Pebble
  Pairing Flow" artifact and now running after Daily targets — Pair,
  Searching, Found, Connecting, Success, with the not-found sheet over a
  dimmed search. Success hands off to index.html; "I'll Do It Later" skips
  with a toast. The search outcome (multiple / one / none) is switchable from
  the jump panel so all three endings are reviewable.
  Two real bugs found and fixed while wiring it:
   1. The ambient .glow is position:absolute with an OPAQUE background, so it
      painted over the pairing screens entirely — they lay out in normal flow,
      unlike every other screen, whose content is absolutely positioned and so
      paints above it by DOM order. Fixed with explicit z-index.
   2. The pairing subtitles inherited the form screens' global
      `.sub{position:absolute;top:206px}`, dropping the text into the middle
      of the device list. Overridden back to static.
  Timers are cancelled on leaving any pairing screen, so a stale one cannot
  yank the flow forward from wherever you have navigated to.

- 2026-08-30 — The splash is now the owner's video (assets/onboarding/
  splash.mp4, 1080x1080 square, 4.07s, H.264+AAC). Set to the screen's full
  360px width, so 360x360, centred on both axes; the video carries its own
  padding around the mark, so insetting or cropping it would fight the
  composition. The flow now leaves the splash when the video ENDS rather
  than on the invented 1.6s timer, with a duration-based timeout as a
  backstop in case autoplay is blocked or 'ended' never fires.
  SCREEN COLOUR: sampled from the video at runtime rather than typed in.
  Neither Chromium build here nor the bundled ffmpeg carries an H.264
  decoder, so the true background could not be read at build time. Instead
  the page draws the first frame to a canvas, reads the four extreme corners
  (always background, since the mark sits inside a square frame) and takes
  the per-channel median, then paints that on the splash screen. Falls back
  to --surface-splash (#012D46) if the read throws. This is self-correcting:
  swap the video and the colour follows.
  Fallback: if the video cannot play, the static lockup shows instead.
  Triggered by an error event OR by readyState still being 0 after 900ms —
  the second case matters because a browser without the codec fires no error
  at all, which is exactly what happens in this sandbox. Verified both
  paths, and that the flow still advances to onboarding either way.
  Container metadata was read by parsing the MP4 boxes directly (mvhd/tkhd),
  since no probe tool here could open the file.

- 2026-08-28 (regression fix + polish) — FIXED A REGRESSION I INTRODUCED last
  round: Get Started stopped working, and so did the slide dots. The swipe
  handler was calling setPointerCapture on the onboarding view at
  pointerdown, which redirects every later pointer event to the view and so
  stops any child button from ever receiving its click. My own test had
  asserted too weakly to catch it (it clicked dot 0 while dot 0 was already
  active). The gesture now refuses to start on a button or link at all, and
  only captures the pointer once the finger has travelled more than 12px, so
  a stationary tap always reaches what is underneath. Verified this round
  against all three: dots, swipe, and Get Started.
  Brand badge: the 1px teal ring outlines are gone. The concentric rings are
  now drawn as a second, denser radial wash inside the first, so they still
  read as concentric with no hard edge anywhere.
  Phone and OTP land with their first field already focused (200ms, after the
  screen fade, otherwise the caret arrives while the view is still
  transparent). Both carry inputmode="numeric", so a real device opens the
  number keypad rather than the full keyboard.
  STILL PENDING: the three new photographs. They arrived as inline images in
  the conversation rather than as files, so they are visible but not
  writable to disk. I checked the animation zip's uploads/ folder in case
  they were already there — those are only earlier variants of the OLD set.
  Need them as actual file uploads or a zip.

- 2026-08-28 (badge + 3-slide onboarding) — Two owner-approved changes.
  BRAND BADGE on every screen after onboarding (all seven form screens):
  concentric rings with a light-teal radial gradient and the mark centred, at
  64px. The owner's cap was 64-72px and 64 is what lets the Activity, Goal
  and Daily targets screens still clear their four cards. It pushes content
  down as the reference shows, so every screen below it moved +70px: title
  106->176, subtitle 136->206, phone/name field 174->244, OTP boxes 192->262
  (and its error/resend rows), profile fields 202/294/386/478 ->
  272/364/456/548, and both card grids 201 -> 271. Verified by measuring:
  zero collisions with the CTA on any of the seven screens.
  ONBOARDING is now three slides — "Your health, your way", "Sleep. Move.
  Recover." and "Live better, every day." Each headline rides its own
  photograph's opacity through the same layerState() the backdrop uses, so
  headline and image can never fall out of step. Added tappable dots and
  pointer swipe on top of the existing auto-advance (owner's choice of all
  three); Get Started always exits to the phone screen rather than stepping
  the carousel. Under reduced motion the loop stops but dots and swipe still
  reach all three slides.
  Fixed a real bug found while testing the swipe: dragging across a
  photograph started a native image drag, which swallowed pointerup so the
  gesture never completed. Images are now draggable="false" and the view
  takes pointer capture on pointerdown.
  STILL PENDING: the three NEW photographs. The screens currently show the
  OLD set (pickleball / cable / press) behind the new headlines — the new
  images were only supplied as a composite screenshot, which is not a usable
  asset. Drop three files at assets/onboarding/onb-1..3.jpg and they take
  over with no code change.

- 2026-08-28 (colour pass) — Three owner overrides of the Figma values:
  disabled CTA drops from neutral-600 to neutral-700; the selected/focus
  border on every field goes from neutral-400 to teal-400 (applies to the
  plain fields, the phone combo and the OTP boxes alike — the Figma
  Name_typing frame had used neutral-400); and the daily-goal +/- steppers go
  from text-1 to teal-400. All three flagged at the point of change as
  deliberate overrides, not drift from the comp.
  Still pending on the same round: the concentric-circle logo badge, and the
  onboarding's move to three images with three headlines — both waiting on
  the owner (new photo files needed, plus a decision on which screens carry
  the badge and whether the headlines auto-advance).

- 2026-08-28 (choice screens) — Activity level and Goal no longer arrive with
  a card preselected. The Figma frames showed Sedentary and Lose Weight
  already highlighted, but a pre-picked answer is one the person never gave,
  so both start null and only select on tap.
  Consequence, flagged in the file: Continue on those two screens is now
  disabled until a card is chosen, matching how the phone and name screens
  already gate. Without it the flow would let someone skip an answer the daily
  targets are meant to be derived from. Easy to ungate if the owner prefers.
  Goal descriptions: the four "Lorem ipsum" placeholders are replaced with
  stand-in copy written to the right length and voice — "A daily calorie
  target below what you burn", "Hold your current weight and routine", "A
  daily calorie target above what you burn", "Move and sleep better, with no
  weight target". Still stand-ins, not signed-off product copy.

- 2026-08-28 (animation landed) — The onboarding backdrop animation is IN.
  The owner sent the Claude Design composition as a zip (the canvas link was
  never fetchable from a session — 403, and it is not an artifact URL).
  Ported from `onboarding-bg.jsx` + `Onboarding Animation.dc.html`: three
  photographs, each held 1.5s then cross-faded over 1.5s on a 9s loop, with a
  slow Ken Burns drift. Every number is from the composition, none invented —
  base scale 1.03, zoom 0.08, alternateDirection on, transform-origin
  50% 42%, easeInOutSine on opacity, linear on drift. Driven by
  requestAnimationFrame, and it only runs while the onboarding screen is
  actually on show. Under prefers-reduced-motion it holds the first
  photograph with no fade and no drift (verified).
  RESOLVED, a question open since the first session: the three Figma frames
  named "Onboarding" are these three BACKGROUNDS behind one screen, not three
  content slides with their own copy. The slide-dot carousel built on that
  wrong assumption is removed and Get Started now goes straight to the phone
  screen.
  Assets: the zip carried the three photos at 1080x2385 PNG (4.0 MB total).
  Downscaled to 720x1590 JPEG q78 via Chromium's canvas — 168 KB for all
  three, a 96% saving, at 2x the display size. They live at
  assets/onboarding/onb-1..3.jpg.
  Dropped the separate CSS scrim: the exported photos already have the dark
  gradient baked into their lower half, and the composition draws them with
  no overlay. Keeping both double-darkened the headline. Flagged in the file
  in case the photos are ever re-exported without it.
  The 438x656 media plate from the static Figma frame is gone too — the
  animation composition is full-bleed 360x795 and is the newer source.

- 2026-08-28 (date picker + sheet corrections) — Added the date-of-birth
  picker, matching the two-mode calendar in the owner's reference shots: a
  month grid (SUN-SAT header, selected day as a filled teal circle, prev/next
  month arrows), and a month+year wheel behind the month name. Tapping the
  month label flips between the two and hides the arrows, as in the
  reference. The wheel REUSES the .picker component the unit selector already
  uses, so there is one scroll implementation rather than two. DOB is now
  picked, not typed; the field still reads back DD/MM/YYYY.
  Corrected two things the owner spotted against the Workout tab's goal
  setter, which this sheet is supposed to copy exactly:
    - .iconbtn is now 36x36 with a filled surface-raised CIRCLE behind the
      cross and the tick (it had been a 28px square with hover-only fill).
      Copied verbatim from the goal setter, incl. the surface-fill hover.
    - the unit label no longer grows on selection. The goal setter keeps the
      unit at a constant 11px/0.08em/uppercase and only changes its colour;
      the picker's unit column now does the same.
  Also fixed the month wheel rendering month NAMES in League Spartan (the
  numeral face) — words take the text face, numbers keep the numeral face.
  Year range is 1920..current year; flagged that no minimum age is enforced.

- 2026-08-28 (decisions) — Owner settled three open flags. All three were
  "keep what is built", so no behaviour changed; the code comments were
  rewritten from "needs a decision" to "settled, do not re-raise" so the next
  session does not reopen them.
  1. text-3 split is DELIBERATE. Onboarding follows the Figma variable
     (#999FB9); the rest of the app follows js/tokens.js (#7B819C). Both
     files now say so.
  2. The pebble mark's #5BBCB1 fill stays hard-coded and untokenised — the
     one deliberate exception to the tokens-only rule.
  3. Height reads as total inches, not feet+inches, so the value picker
     stays two columns (number | unit) rather than growing a third.
  Also published a preview artifact of the flow.

- 2026-08-28 (later) — Owner feedback round on the onboarding flow.
  Logo: dropped in the supplied pebble mark SVG and used it verbatim, on both
  the splash (96px) and the onboarding screen (48px, the size the comp
  specifies). FLAG: its fill is #5BBCB1, which is not a token — it sits
  between teal-300 (#76D4C3) and teal-400 (#45C7B3). Left as supplied; needs a
  decision on whether the brand mark pins to teal-400 or #5BBCB1 becomes its
  own token. Only the mark was supplied, so the "pebble" wordmark on the
  splash is still live text.
  Profile: gender is now a real dropdown (a styled menu with a check on the
  chosen row) instead of a native <select>. Height and weight became picked
  values rather than typed ones — they open the same bottom sheet the Workout
  tab uses for goal setting (X / title / check), with a SECOND scroll column
  for the unit to the right of the number column. The two columns scroll
  independently but share one selection band, so it reads as a single
  selector area. Units are cm/in and kg/lb; switching unit converts the value
  (165 cm -> 65 in, 65 kg -> 143 lb) rather than keeping the raw number.
  Fixed a real bug found in review: the picker columns were being filled while
  the sheet was still display:none, so scrollTop was a no-op and the wheel
  opened on its first value instead of the current one.
  STILL BLOCKED: the onboarding animation. The Claude Design canvas link
  (claude.ai/design/p/...) returns 403 — it is not an artifact URL and cannot
  be fetched. No animation from it is in the build; the flow still has only
  the 180ms cross-fade.

- 2026-08-28 — Built the onboarding flow as a new `onboarding.html`
  (9 screens: Splash, Onboarding, Phone number, OTP, Name, Profile, Activity
  level, Goal, Daily targets). Recreated from the Figma file "Pebble Phase 1"
  (xJtDA8DxHFdb9ipr5L2s5z) by pulling all 16 supplied node ids through the
  Figma MCP connection — real layout, copy and variables, not the frame-level
  CSS that was copied out of Figma first (that only carried width/height/
  background and would have produced 18 empty rectangles).
  The 16 frames collapse to 9 screens because 6 of them are OTP states and 3
  are Name states; both are built as one screen with real state instead of
  separate pages. The OTP screen runs its own 30s resend countdown, invalid
  state, resend toast and paste handling.
  NEW FILE, deviating from "the prototype lives in index.html" — index.html is
  178 KB and covers the signed-in app; onboarding runs before it and shares no
  chrome. It hands off to index.html on the final Continue. Flagged in-file;
  say the word and it folds back in.
  Tokens: added `surface.splash` (#012D46, the splash field — the one screen
  not on surface.app) to `js/tokens.js`. Flagged an unresolved conflict there
  too — tokens.js has text3 = #7B819C but the Figma variable `text/text-3` is
  #999FB9, one step lighter, and every onboarding screen uses the lighter one.
  Onboarding follows Figma; the global token is untouched so the shipped
  Activity/Sleep/Me screens do not shift. Needs an owner decision.
  Assets: the splash logo and onboarding hero could not be downloaded — this
  sandbox has no network egress to figma.com. Both are wired to
  `assets/onboarding/` with code-drawn stand-ins showing until the files land
  (same pattern as the Activity/Sleep backgrounds). The onboarding slot is a
  <video> with the still as its poster, because the owner says the real
  background is video.
  Verified by walking the whole flow in headless Chromium: no JS errors, every
  screen reachable, CTA enable/disable, OTP invalid vs valid, and the target
  steppers all behave.

- 2026-08-10 — Moved the named snapshot into `Activity Tab/Workout Tab.html`
  (folder layout mirrors `Sleep Tab/`). `index.html` stays the live working
  copy at the repo root. Pushed as is at the owner's request.
  Background PNG: still NOT in the repo — the owner's image has come through
  as an inline preview three times without a file landing on disk, so the
  code-drawn stand-in scene is what ships. The `<img>` slots in both heroes
  still point at `assets/backgrounds/activity-dusk.png` and
  `sleep-night.png`; drop the real files there and they take over with no
  code change. A half-finished rework of the stand-in artwork was reverted
  (owner asked to ship as is) — redo it from scratch if the PNGs never come.

- 2026-08-10 — Owner approved the prototype. Saved a named snapshot as
  `Workout Tab.html` (self-contained, opens by double-clicking; title
  "Pebble — Workout Tab") and pushed the branch to GitHub. `index.html`
  remains the live working copy — edit there, re-save the snapshot when a
  new named version is requested.

- 2026-08-10 (later still) — Detail-page tiles: "Active hours" label
  shortened to "Active hrs" so it stops truncating (applied to distance too,
  same tile), with the now-redundant "hrs" unit dropped from the value;
  hairline borders removed from all detail-page metric tiles. Activity-tab
  chips keep their hairline.

- 2026-08-10 (later) — Detail-page stat tiles switched to the Activity-tab
  chip format (three equal tiles across, 20px radius, hairline border,
  overline label, num-m value, small light unit) per owner screenshot; long
  figures now abbreviate to K/M via `fmtTile` so nothing spills (900,000 →
  900K, 2,739,650 → 2.7M, week 52,240 → 52.2K). W/M/Y chart header reads
  "Average" instead of "Daily average". Activity tab's Workouts card
  replaced with the owner's approved WorkoutsCard component (40px icon
  chips, button rows, Spartan durations, Phosphor carets), reading this
  file's global tokens instead of the component's scoped copies.

- 2026-08-10 — Merged the two working copies: adopted the parallel session's
  version (metric details pages with D/W/M/Y switcher, two-state control
  panel scoped to the Activity tab, goal lines, dotted bar-scrub) as the
  base, then applied the StatTile feedback round: detail summaries now use
  the approved StatTile component (one-line headers, small-light unit text,
  equal-width tiles), steps ≥10k shown in thousands (25.2K-style), Goals
  met as "7 of 30" with a small "of", Active hours on one line ("17 HRS"),
  Best day as small-DAY + big number ("DAY 11"); extra space added between
  detail plots and their X-axis labels (Activity tab as reference); no-data
  state on detail pages keeps tile headers with — and chart frames empty.

- 2026-08-07 (later) — Feedback round: ported the month-scroll history
  calendar, About pages, and goal-setting flows (activity value sheet +
  sleep bedtime dial with draggable handles) from the standalone prototypes;
  added the sleep-continuity expand state ("When you slept" timeline);
  switched all icons to the Phosphor set (path data embedded); Health tab
  now greets "Good morning, Aanya" with three nested rings (sleep /
  readiness / activity); rebuilt the Me tab after the supplied settings
  screenshot (device card, toggles, grouped rows) using tokens throughout.
  Status bar floats over full-bleed tab backgrounds (PNG slots still
  awaiting the owner's image files). Not pushed — awaiting owner approval.

- 2026-08-07 — Rebuilt `index.html` as the full 4-tab app prototype — Android
  phone mockup at 360px with the bottom nav from the supplied screenshot
  (Health / Activity / Sleep / Me). Sleep and Activity recreated from the
  approved standalone prototypes (score rings, hypnogram, vitals line charts,
  goals, week rings, workouts, continuity pills, chart scrubbing, date +
  3-dot menus). Health and Me are first-pass layouts (flagged in comments —
  no spec yet). Added a control panel beside the phone that switches every
  data card between five states: default, loading, syncing, watch-not-worn
  and empty. Colors/fonts mirror js/tokens.js as CSS variables (flagged:
  inlined because file:// blocks module imports).

- 2026-07-19 — Initial skeleton created — set up folder structure, tokens.js
  with placeholder palette, and a minimal Sleep screen in index.html that reads
  all colors from tokens. Starting point for a solo prototyper.
