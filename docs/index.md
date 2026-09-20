# Docs — feature status

A table of every screen/feature and its state. Keeps work unambiguous.

| Feature | File | Status | Notes |
|---------|------|--------|-------|
| Sleep   | `index.html` | Prototype (placeholder tokens) | First screen; static demo data |
| Activity | — | Not started | |
| Stress  | — | Not started | |
| Health / Peak score | — | Not started | |
| Me tab | `docs/feature-me-tab.md` | UX approved (rev 3) — UI not specified | 14 inner pages, 10 tab states. Read the spec before writing any Me-tab code |
| Friends (was Family Ranking) | `docs/feature-family-ranking.md` + `Friends/friends.html` | Prototype built to rev 2 — UX not yet approved | Codes make links, not groups. First-use teaching state, podium + list + sticky you-card, friend profile, share/enter a code, friends list. 6 screens, 9 F-states, 10 components |
| AI coach chat | `docs/feature-ai-coach.md` + `AI Coach/ai-coach.html` | Prototype built (rev 1.1, owner round 1 folded in) — UX not yet approved | Half-screen sheet from the dock's AI unit: typed summary, text / voice / photo composer, handle drag, thinking + filling states. 10 review states, 10 open questions |

When you start a feature, create `docs/feature-<name>.md` with: what it does,
acceptance criteria (checkboxes), implementation approach, and dependencies.
When a feature ships, move its summary into `memory/changelog.md`.
