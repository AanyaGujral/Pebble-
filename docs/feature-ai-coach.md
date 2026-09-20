# Feature: AI coach chat

Rev 1 — prototype built 2026-09-20 to the owner's brief. UX not yet approved.
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
- Sheet geometry is one custom property `--sheet-h`; half = 50% of the
  screen, full = screen − 56px. Pointer events on the header do the drag;
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

## Dependencies / risks — open questions for the owner
1. **Frame size.** The dock component is cut for a 390-wide screen; the app
   prototypes are 360. This file uses 390 so the dock stays untouched. Which
   wins?
2. **Icons.** Microphone, arrow-up (send) and image glyphs are written from
   memory of Phosphor regular (no network this session). Verify against
   `@phosphor-icons/core` before shipping.
3. **Suggestion chips** under the summary are a proposal, not in the brief.
4. **Voice UX.** Tap-to-record with stop-and-use is built; hold-to-talk (press
   and hold the mic, release to send) is the other common pattern. Say which.
   Real transcription would stream while speaking.
5. **Summary content.** What should the opening summary actually cover and
   how long should it be? The sample is ~60 words in two paragraphs.
6. **Sheet motion.** Open / snap use `duration-slow` (240 ms). A half-screen
   sheet arguably wants ~320 ms; that would be a new motion token.
7. **Orchid amount.** 18% top-right and 8% low-left. Dial up or down?
8. **Numerals in prose** stay in the text face rather than Spartan, so the
   reading line isn't broken. The recording timer and the "Sent" time do use
   Spartan.
9. **Photo bubble.** Max 220 px, radius 16 with the bubble's 6 px corner.
   Should a photo without a note still show the "Sent" line?
10. **What does the coach do on the other tabs?** The sheet opens over the
    current tab without changing it; the summary is the same everywhere for
    now.
