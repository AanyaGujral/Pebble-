# Docs — feature status

A table of every screen/feature and its state. Keeps work unambiguous.

| Feature | File | Status | Notes |
|---------|------|--------|-------|
| Sleep   | `index.html` | Prototype (placeholder tokens) | First screen; static demo data |
| Activity | — | Not started | |
| Health metrics (HR · HRV · Stress · Skin temp · SpO₂) | `docs/feature-health-metrics.md` + `Health Metrics/health-metrics.html` | Prototype built (2026-09-08) — UX not yet reviewed | Home + Sleep entry points, D/W/M/Y, range bars, time in range, 4 states. No metric-to-metric tabs |
| Health / Peak score | — | Not started | |
| Me tab | `docs/feature-me-tab.md` | UX approved (rev 3) — UI not specified | 14 inner pages, 10 tab states. Read the spec before writing any Me-tab code |
| Friends (was Family Ranking) | `docs/feature-family-ranking.md` + `Friends/friends.html` | Prototype built to rev 2 — UX not yet approved | Codes make links, not groups. First-use teaching state, podium + list + sticky you-card, friend profile, share/enter a code, friends list. 6 screens, 9 F-states, 10 components |

When you start a feature, create `docs/feature-<name>.md` with: what it does,
acceptance criteria (checkboxes), implementation approach, and dependencies.
When a feature ships, move its summary into `memory/changelog.md`.
