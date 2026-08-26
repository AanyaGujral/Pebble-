# Docs — feature status

A table of every screen/feature and its state. Keeps work unambiguous.

| Feature | File | Status | Notes |
|---------|------|--------|-------|
| Sleep   | `index.html` | Prototype (placeholder tokens) | First screen; static demo data |
| Activity | — | Not started | |
| Stress  | — | Not started | |
| Health / Peak score | — | Not started | |
| AI card loading animation | `components/ai-card-loading.html` | Component built | 3 s teal loader for AI insight cards; transparent bg, dark + blurred end frame. Not yet wired into `index.html`. See `docs/feature-ai-card-loading.md` |

When you start a feature, create `docs/feature-<name>.md` with: what it does,
acceptance criteria (checkboxes), implementation approach, and dependencies.
When a feature ships, move its summary into `memory/changelog.md`.
