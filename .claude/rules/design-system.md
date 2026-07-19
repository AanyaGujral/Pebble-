# Design system rules — the gates

Every change must pass these gates before it's considered done.

1. **Tokens only.** No hard-coded colors or fonts anywhere. Everything comes
   from `js/tokens.js`. Missing token? Add it there first.

2. **Opens standalone.** `index.html` must work by double-clicking it in a
   browser — no server, no build step required.

3. **Reduced motion respected.** Any animation must be disabled under
   `@media (prefers-reduced-motion: reduce)`.

4. **Flag, don't silently decide.** Ambiguities and deviations from the spec are
   recorded as code comments at the point of decision, not resolved silently.

5. **Memory updated.** `memory/changelog.md` gets a dated line after each
   meaningful change.
