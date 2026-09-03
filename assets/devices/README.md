# Device product shots

Drop the real product renders here. The Me tab picks them up with no code
change — the device card and every dormant band row layer an `<img>` over a
Phosphor watch glyph, so the photograph covers the glyph the moment the file
exists, and the glyph shows through while it does not.

| File | Used by |
|------|---------|
| `pebble-prime.png` | the connected device card, and the "Pebble Prime (work)" dormant row |
| `pbl-qore-2.png`   | the "PBL Qore 2" dormant row |
| `pebble-arc.png`   | the "Pebble Arc" dormant row |

**What to supply.** Square, transparent or dark background, the band shot
straight on. The card crops with `object-fit: cover` at 96×96 and the dormant
rows at 32×32, so keep the watch face centred and leave a little margin — a
render that fills its canvas edge to edge loses its strap corners at 32px.
Retina wants 2x, so 192px and 64px minimum; one 512px square covers both.

**Status, 2026-09-03.** The owner has shared the Pebble Prime render in chat
several times but it has not arrived as an uploadable file, so nothing is
here yet and every device falls back to the glyph. This is the same situation
as the tab background PNGs — see `memory/session-handoff.md`.
