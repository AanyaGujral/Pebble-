# CLAUDE.md — how to work in this repo

You are helping build interactive HTML prototypes of a health/fitness app.

## Core principles

1. **Tokens are the single source of truth.** All colors and fonts come from
   `js/tokens.js`. Never hard-code a color like `#3366ff` directly in a screen —
   pull it from the tokens object instead. If a needed token is missing, add it
   to `js/tokens.js` first, then use it.

2. **One self-contained file to start.** The prototype lives in `index.html`.
   Keep CSS and JS in that one file for now so it opens by double-clicking, with
   no build step or server needed.

3. **Flag, don't silently decide.** If a request is ambiguous or conflicts with
   what's already built, note the decision in a code comment (e.g.
   `/* Owner asked for teal here, tokens say blue — using teal, flagged */`)
   rather than choosing silently.

4. **Update memory after changes.** After a meaningful change, add a dated line
   to `memory/changelog.md`: what changed and why.

5. **Plain-English comments.** The owner is learning to code. Comment sections
   so they can read what each part does.

## Design gates (check before finishing)

- [ ] All colors/fonts reference `js/tokens.js`, nothing hard-coded.
- [ ] Screen works when opened directly in a browser (no server required).
- [ ] Respects `prefers-reduced-motion` for any animation.
- [ ] Changelog updated.

## File map

- `index.html` — the prototype
- `js/tokens.js` — colors + fonts
- `memory/changelog.md` — dated log of changes
- `memory/session-handoff.md` — read first when resuming work
- `docs/` — per-feature specs
