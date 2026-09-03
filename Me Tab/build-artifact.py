#!/usr/bin/env python3
"""
Derive the shareable copy of the Me tab prototype from the prototype itself.

Why this exists
---------------
`Me Tab/Me Tab.html` is the prototype: it opens by double-clicking, with no
server and no build step, which is design gate 2. Publishing it as a web link
needs two small changes it must NOT carry locally:

  1. The publishing wrapper supplies <!doctype>, <html>, <head> and <body>,
     so the shared copy ships without them.
  2. Someone opening a link has none of the surrounding conversation, so the
     shared copy gets a masthead saying what the page is and how far along
     the build is, plus narrow-screen handling for reading it on a phone.

Keeping those in a script rather than a second checked-in HTML file means the
two can never drift: the prototype stays the only place the tab is edited.

Run it:   python3 "Me Tab/build-artifact.py"
Output:   Me Tab/me-tab-artifact.html   (git-ignored — it is generated)
"""

import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE / "Me Tab.html"
OUT = HERE / "me-tab-artifact.html"

MASTHEAD = """<header class="masthead">
  <div class="mh-in">
    <p class="mh-eyebrow">Pebble &middot; prototype review</p>
    <h1 class="mh-t">The Me tab</h1>
    <p class="mh-s">Build slice&nbsp;1 of&nbsp;5 &mdash; the tab shell and all six components, every state. There is no real data and nothing navigates yet; the fourteen inner pages and the ten tab states arrive in slices&nbsp;2&ndash;5.</p>
    <p class="mh-s mh-how">Use the panel to switch the device slot, the number of dormant bands, and the confirm sheet. <strong>Component bench</strong> shows every component state at once.</p>
  </div>
</header>

"""

EXTRA_CSS = """
/* ==========================================================================
   13. PUBLISHED-ARTIFACT CHROME
   --------------------------------------------------------------------------
   Added by Me Tab/build-artifact.py. Everything above this block is the
   prototype, byte for byte.

   Single theme on purpose: Pebble is a dark product and these are its real
   tokens, so the page commits to one visual world rather than inventing a
   light palette the design system does not have. Every colour is painted
   explicitly, so the page holds on either host background.
   ========================================================================== */
.masthead{flex:1 1 100%;display:flex;justify-content:center;padding:8px 0 0}
/* 664 = panel 248 + gap 32 + phone box 384. The phone's 6px outline paints
   outside its layout box, so matching the visible width instead would push
   the masthead 6px off the panel's left edge. */
.mh-in{width:100%;max-width:664px}
.mh-eyebrow{
  margin:0;font-size:11px;line-height:16px;font-weight:600;
  letter-spacing:0.08em;text-transform:uppercase;color:var(--metric-readiness);
}
.mh-t{
  margin:6px 0 0;font-size:24px;line-height:30px;font-weight:500;
  letter-spacing:-0.01em;color:var(--text-1);text-wrap:balance;
}
.mh-s{
  margin:8px 0 0;max-width:62ch;
  font-size:13px;line-height:20px;font-weight:400;color:var(--text-2);
}
.mh-how{color:var(--text-3)}
.mh-how strong{color:var(--text-2);font-weight:500}

/* Narrow screens: the panel drops above the phone, and the 396px device
   mockup scales to fit rather than pushing the page sideways. transform
   leaves the layout box at full size, so the negative margin reclaims the
   gap it leaves underneath. */
@media (max-width:460px){
  body{padding:20px 8px 32px;gap:16px}
  .panel{position:static;width:100%;max-height:none}
  .phone{transform:scale(0.86);transform-origin:top center;margin-bottom:-118px}
}
</style>"""

# (find, replace, how many times it must match)
EDITS = [
    ('<!DOCTYPE html>\n<html lang="en">\n<head>\n', "", 1),
    ('<meta charset="utf-8">\n', "", 1),
    ('<meta name="viewport" content="width=device-width,initial-scale=1">\n', "", 1),
    ("</head>\n<body>\n", "", 1),
    ("\n</body>\n</html>\n", "\n", 1),
    # a name that reads as the screen, not a caption
    ("<title>Me tab · slice 1 — shell + components</title>",
     "<title>Pebble Me Tab</title>", 1),
    ("\n<!-- ======================= REVIEW PANEL =======================",
     "\n" + MASTHEAD + "<!-- ======================= REVIEW PANEL =======================", 1),
    ("\n</style>", EXTRA_CSS, 1),
]


def main() -> int:
    if not SRC.exists():
        print(f"error: cannot find {SRC}", file=sys.stderr)
        return 1

    doc = SRC.read_text()
    for find, replace, expected in EDITS:
        found = doc.count(find)
        if found != expected:
            # The prototype changed shape underneath this script. Fail loudly
            # rather than publishing something half-transformed.
            print(f"error: expected {expected} match for {find[:48]!r}, found {found}",
                  file=sys.stderr)
            return 1
        doc = doc.replace(find, replace, expected)

    for tag in ("<html", "<head>", "</body>", "</html>"):
        if tag in doc:
            print(f"error: {tag} survived the transform", file=sys.stderr)
            return 1

    OUT.write_text(doc)
    print(f"wrote {OUT.relative_to(HERE.parent)}  ({len(doc):,} bytes)")
    print("publish it as an Artifact; the prototype itself stays the thing you edit.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
