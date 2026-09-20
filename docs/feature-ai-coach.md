# Feature: AI coach chat

Rev 1.1 — prototype built 2026-09-20 to the owner's brief; owner's first round
of answers folded in the same day. UX not yet approved.
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
      badge, optional note; photo sent state: image turn in the log with the
      note and a "Sent · time" line.
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
- The coach's presence is the Measure All orb (halo, two counter-rotating
  crescents, core) at avatar scale, on CSS keyframes. It sits in the header
  and in the thinking row; it goes still when the coach is done. The second
  crescent carries the orchid hint.
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

## Dependencies / risks — still open
1. **Icons.** Microphone, arrow-up (send) and image glyphs are written from
   memory of Phosphor regular (no network this session). Verify against
   `@phosphor-icons/core` before shipping.
2. **Sheet motion.** Open / snap use `duration-slow` (240 ms). A half-screen
   sheet arguably wants ~320 ms; that would be a new motion token.
3. **Numerals in prose** stay in the text face rather than Spartan, so the
   reading line isn't broken. The recording timer and the "Sent" time do use
   Spartan.
4. **Photo bubble.** Should a photo without a note still show the "Sent"
   line?
5. **Other tabs.** The sheet opens over the current tab without changing it;
   the summary is the same everywhere for now.
6. **Dock component.** `components/pebble-nav.html` is the 390 cut; re-cut it
   to 360 (pill 256 / tabs 58) once the owner confirms the tab width.
