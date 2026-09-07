# Device photographs

The Me tab shows real product shots for the connected device and for every
paired device in the list. These are the editable versions.

| File | Product | Source in this repo |
|------|---------|---------------------|
| `pebble-prime.png` | Pebble Prime — the round watch | `images (1).jpeg` |
| `pebble-band.png` | the band (PBL Qore 2, Pebble Arc) | `0_3_7796ffda-3063-4c6a-b848-2b5bfd5ab5ea.webp` |

Both are the original photographs with their studio backdrop cut away —
black behind the watch, white behind the band — so each one sits on a Pebble
surface instead of in a coloured box. 320x320, transparent, product centred
with a 4% margin so it never touches the edge of the tile it sits in.

## How they get into the prototype

`Me Tab/me-tab.html` does **not** link to these files. It carries them as
`data:` URIs inside `DEVICE_SHOT` (script section 2b), for two reasons:

1. the published artifact blocks images from every other origin, so a linked
   file never appears there at all;
2. the prototype has to open by double-clicking, and a page on `file://`
   cannot always reach a sibling folder either.

An earlier draft used `src="../assets/devices/..."` and was silently broken
in both places.

## Replacing a photograph

Drop a better shot in here, then re-embed it. The cut-out is a flood fill
inward from the border, so only the backdrop actually *connected* to the edge
is removed — that is what stops it eating the watch's own black bezel or the
band's chrome ring. Any enclosed pocket of backdrop bigger than a specular
highlight (the hole inside a strap loop) gets its own fill.

```
python3 - <<'PY'
from PIL import Image
import base64, io
im = Image.open('assets/devices/pebble-prime.png')
buf = io.BytesIO(); im.save(buf, 'WEBP', quality=86, method=6)
print('data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode())
PY
```

Paste the result over the matching entry in `DEVICE_SHOT`. WebP at quality 86
keeps both photographs to about 43 KB in total.
