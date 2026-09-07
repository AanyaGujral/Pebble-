#!/usr/bin/env python3
"""Wrap the artifact source into a standalone, double-clickable HTML file.

Why two files exist
-------------------
`me-tab.html` is the ARTIFACT source. It deliberately carries no doctype and
no <html>/<head>/<body> of its own, because the artifact host supplies all
four when it publishes. Putting them there would nest one document inside
another.

But opened straight off disk, that same file has no doctype either — so a
browser renders it in QUIRKS MODE, with a different box model from the
published page. It happens to survive, because every rule in the prototype
sets box-sizing explicitly, but "happens to survive" is not a guarantee.

So: edit `me-tab.html`, then run this to refresh `Pebble Me Tab.html`.
Never hand-edit both.

    python3 "Me Tab/build-standalone.py"
"""
import io, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(HERE, "me-tab.html")
OUT  = os.path.join(HERE, "Pebble Me Tab.html")

# The <title> moves into <head>, so it is not declared twice.
BODY_TITLE = "<title>Pebble Me Tab</title>\n"

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pebble &mdash; Me Tab</title>

<!-- The Me tab of the Pebble app: its header, the device slot and the five
     silent row groups, all six shared components in every state, and two full
     inner pages - Profile, and Firmware Update with the whole download,
     install and restart flow. The panel on the left switches every state so
     each one can be seen without having to reach it.

     Double-click this file. It needs no server and no build step.

     GENERATED - do not hand-edit. It is "Me Tab/me-tab.html" wrapped in a
     real HTML document; edit that file and re-run "Me Tab/build-standalone.py",
     which explains why the two exist. -->

<style>
/* Mirrors the small reset the artifact host injects, so the file you
   double-click and the published page render identically rather than nearly.
   The host's own background and text colour are left out on purpose: this
   prototype paints both from js/tokens.js a few rules further down, which is
   also why there is no hex value anywhere in here. */
body{margin:0;padding:0;font-size:14px}
img{max-width:100%}
[hidden]:not([hidden=until-found]){display:none!important}
</style>
"""

def main():
    src = io.open(SRC, encoding="utf-8").read()
    if src.count(BODY_TITLE) != 1:
        sys.exit("expected exactly one %r in me-tab.html" % BODY_TITLE.strip())
    body = src.replace(BODY_TITLE, "", 1).lstrip("\n")
    io.open(OUT, "w", encoding="utf-8").write(HEAD + body + "\n</body>\n</html>\n")
    print("wrote %s (%d KB)" % (os.path.basename(OUT), os.path.getsize(OUT) // 1024))

if __name__ == "__main__":
    main()
