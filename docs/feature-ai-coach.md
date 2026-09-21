# Feature: AI coach chat

Rev 1.3 — prototype built 2026-09-20 to the owner's brief; owner rounds 1–3
folded in (2026-09-20 / 21). UX not yet approved.
Prototype: `AI Coach/ai-coach.html` (opens by double-clicking).

## What it does
The AI unit in the navigation dock opens a half-screen chat sheet over the
current tab. The coach reads your day and types a summary letter by letter;
you reply by typing, by voice, or by sending a photo. A handle bar drags the
sheet between half and full height, or away.

## Acceptance criteria
- [x] Tapping the AI unit opens a sheet at half the screen; the app behind
      blurs and dims, as in the Measure All reading scene.
- [x] On open, the coach shows a "reading your day" state (the orb), then the
      summary types out letter by letter.
- [x] Composer: text field, hold-free tap-to-record voice, add / take a photo.
- [x] Voice recording state: waveform, elapsed time, cancel, stop-and-use.
- [x] Photo attached (draft) state: thumbnail in the composer with a remove
      badge, optional note; photo sent state: image bubble in the log with
      the note. No delivery line under the user's turns.
- [x] Coach reply: thinking state (orb + shimmer caption), then the answer
      fills in letter by letter with a caret.
- [x] Handle drag: follows the finger; snaps to half / full; dragging or
      flicking down past half closes. Tap on the handle toggles half / full.
      Esc and the scrim also close.
- [x] Top section of the sheet carries a teal gradient with a hint of orchid.
- [x] Reduced motion: no slide, spin, shimmer, caret or waveform motion; text
      lands in one go.
- [x] All colors/fonts come from `js/tokens.js` (mirrored as CSS variables).
- [ ] Owner review of the open questions below.

## Implementation approach
- One self-contained file; tokens mirrored as CSS custom properties (the
  file:// rule), as in every other standalone prototype.
- Frame is the app's 360 × 780; the dock is re-cut to fit (pill 256, tabs 58,
  no gap, 12px padding; AI unit untouched).
- Sheet geometry is one custom property `--sheet-h`; half = 50% of the
  screen (390px), full = screen − 56px. Pointer events on the header do the drag;
  release snaps by position and velocity.
- The sheet header is 60px: 10px, handle, 14px, one 24px line with the
  Pebble logomark (the dock's glow behind it) and "Health Coach", 8px. No
  date line, no close button; the handle, the scrim and Esc close. Replies
  start at least 16px below it. The coach's text runs to within 32px of the
  right edge; the user's bubble caps at 84%.
- The coach's presence is the Measure All orb (halo, two counter-rotating
  crescents, core) at avatar scale, on CSS keyframes, in the thinking row of
  each reply. The second crescent carries the orchid hint.
- The top gradient is 40% of the sheet's height so it follows the drag, and
  sits a notch quieter at half height than at full.
- Typewriter fill is a timer per character (14 ms base, longer at
  punctuation); reduced motion switches it off. Thinking holds ~1.6 s.
- Voice and camera are simulated: the waveform animates and the timer counts;
  stop "transcribes" a scripted sentence into the field. "Take photo" drops in
  a code-drawn bowl (tokens); "Choose photo" opens the real file picker, so a
  real photo can be tried over file://.
- Replies are scripted by keyword (sleep / workout / food / stress / steps)
  with a photo-specific reply and a fallback. Figures match the homepage's
  sample day (78 / 73 / 68).
- Control panel beside the phone jumps to ten states for review, plus a
  typing-speed switch.

## Decisions (owner, 2026-09-20)
- **Frame:** 360 wins. The dock is re-cut in the prototype; the component
  file still carries the 390 cut and needs the same re-cut.
- **Voice:** tap-to-record with stop-and-use stays. No hold-to-talk.
- **Suggestion chips:** kept.
- **Colour:** more orchid, less teal. Top gradient is now teal-600 at 40%
  → teal-700 at 28% onto surface-card, orchid-400 radial at 34% top-right and
  orchid-500 at 16% low-left (was teal-500 52%, orchid 18% / 8%).
- **Opening summary:** short — one paragraph, under 30 words.

## Decisions (owner, 2026-09-21 — round 2)
- **Name:** "Health Coach", not "Pebble AI".
- **Header:** the orb replaced by the Pebble logomark; date line removed;
  height halved (72 → 40px); close button removed since a 36px circle no
  longer balanced the one-line header. Handle / scrim / Esc close.
- **Teal balance:** collapsed state read too teal, expanded was fine. The
  gradient now scales with the sheet (40% of its height) and is 28% quieter
  at half.
- **User turns:** no "Sent · time · tick" line.

## Dependencies / risks — still open
1. **Icons.** Microphone, arrow-up (send) and image glyphs are written from
   memory of Phosphor regular (no network this session). Verify against
   `@phosphor-icons/core` before shipping.
2. **Sheet motion.** Open / snap use `duration-slow` (240 ms). A half-screen
   sheet arguably wants ~320 ms; that would be a new motion token.
3. **Numerals in prose** stay in the text face rather than Spartan, so the
   reading line isn't broken. The recording timer does use Spartan.
4. **Closing without a button.** The sheet now relies on the handle, the
   scrim and Esc. Fine for a native-feeling sheet; say if a close control
   should come back in another form.
5. **Other tabs.** The sheet opens over the current tab without changing it;
   the summary is the same everywhere for now.
6. **Dock component.** `components/pebble-nav.html` is the 390 cut; re-cut it
   to 360 (pill 256 / tabs 58) once the owner confirms the tab width.
