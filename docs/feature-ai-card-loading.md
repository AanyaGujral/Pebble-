# Feature: AI card loading animation

## What it does
While an AI insight card is waiting on generated copy, a 3-second animation
plays inside the card. Teal streaks fly in from beyond the card's edges and
gather at the centre; the centre swells and flashes once as they land; then
everything settles, leaving the middle of the card darkened and slightly
blurred with a soft teal glow. The generated text then fades in on top of that
settled patch, which is what keeps it readable.

The overlay's own background is transparent, so the same element drops onto any
screen — flat cards, cards over photography, the hero areas — without carrying
a background of its own.

## Acceptance criteria
- [x] Runs for 3 seconds, then holds its final frame (no flicker if the request
      takes longer).
- [x] Data gathers in the centre; the end frame is darker and blurred there,
      fading out to untouched pixels at the card edges.
- [x] Teal only — teal 400/500 for the streaks and arcs, teal 200/300 for the
      hot centre, teal-0 for the pip. teal-400 is `--metric-readiness`.
- [x] Overlay background is transparent.
- [x] Scales down for compact cards (`--ai-size`).
- [x] All colors/fonts come from `js/tokens.js`.
- [x] Respects `prefers-reduced-motion` — falls back to the static end frame.
- [x] Opens by double-clicking, no server or build step.
- [x] Ignores pointer events; card carries `aria-busy` while loading.

## Implementation approach
`components/ai-card-loading.html` — standalone preview page plus the drop-in
component, marked with "COPY ME" blocks. Six stacked layers inside one
absolutely-positioned `.ai-load` element:

| Layer | What it does |
|---|---|
| `.ai-load__blur` | `backdrop-filter` blur, radially masked so it dissolves before the card edge |
| `.ai-load__wash` | radial neutral-900 wash — the darkening |
| `.ai-load__field` | the streaks; per-streak `--a` angle, `--d` distance, `--l` length, `--sd` duration, `--t` delay |
| `.ai-load__ring` ×2 | hairline conic-gradient arcs sweeping and contracting |
| `.ai-load__core` | the soft centre glow, with a small hot pip |
| `.ai-load__wave` | one ring that pops outward at impact (1.95 s) |

CSS only — no JavaScript is needed on a real screen. `.is-running` starts the
clock; every animation runs once with `animation-fill-mode: forwards` so the
end frame sticks. `.is-settled` jumps straight to that end frame.
`--ai-dur`, `--ai-size`, `--ai-blur` and `--ai-dark` are the per-instance knobs.

Card content goes in `.ai-card__content`, which sits above the overlay so the
dark blurred centre acts as a backdrop rather than smearing the text. Leaving
that class off makes the loader frost stale data instead — both readings are
supported.

## Dependencies / risks
- The Pinterest reference the owner supplied could not be opened from the build
  environment (pinterest.com is blocked by the network proxy). The motion is
  built from the written brief instead; if the reference showed something
  different this is the piece to re-cut.
- Animating `backdrop-filter` works in Chromium and Safari. Where it doesn't,
  the layer stays unblurred and the dark wash carries the end frame alone.
- `color-mix()` is used so no rgba values are hand-written; it needs
  Chrome 111+ / Safari 16.2+.
- Not yet wired into `index.html` — the AI insight cards it belongs to don't
  exist there yet.
