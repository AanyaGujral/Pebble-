# Docs — feature status

A table of every screen/feature and its state. Keeps work unambiguous.

| Feature | File | Status | Notes |
|---------|------|--------|-------|
| Sleep   | `index.html` | Prototype (placeholder tokens) | First screen; static demo data |
| Activity | — | Not started | |
| Stress  | — | Not started | |
| Health / Peak score | — | Not started | |
| Me tab | `docs/feature-me-tab.md` | UX approved (rev 3) — UI not specified | 14 inner pages, 10 tab states. Read the spec before writing any Me-tab code |
| Friends (was Family Ranking) | `docs/feature-family-ranking.md` | UX proposed (rev 1) — not approved, UI not specified | Home card + leaderboard + friend profile + invite/join. 6 screens, 9 F-states. Read the spec before writing any Friends code |

When you start a feature, create `docs/feature-<name>.md` with: what it does,
acceptance criteria (checkboxes), implementation approach, and dependencies.
When a feature ships, move its summary into `memory/changelog.md`.
