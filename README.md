# Fitness Prototype

A design-engineering workspace for building interactive prototypes of a
health/fitness app. Inspired by a professional design-system workflow, trimmed
down to what one person actually needs to get started.

## What lives where

| Folder / file        | What it's for |
|----------------------|---------------|
| `index.html`         | The live prototype. Open it in a browser to see your app. |
| `js/tokens.js`       | **Single source of truth** for colors and fonts. Change here, everything updates. |
| `CLAUDE.md`          | Instructions for Claude so it works consistently in this repo. |
| `memory/`            | Running log of what changed and where to pick up next time. |
| `docs/`              | Specs for each feature/screen you build. |
| `.claude/rules/`     | Rules Claude should follow (design gates, code style). |

## How to work

1. Open `index.html` in your browser to see the current prototype.
2. To change something, edit `js/tokens.js` (for colors/fonts) or `index.html`
   (for layout/content) — or ask Claude to do it.
3. After each meaningful change, add a line to `memory/changelog.md`.
4. Commit and push with GitHub Desktop.

## Growing this later

The professional version adds: multiple screen files, a review system,
multi-agent handoffs, and pinned external skills. Add those only when you feel
the need — this skeleton is designed to grow into them.
