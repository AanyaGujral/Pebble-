# Sign-in background images

`onboarding.html` crossfades three photos behind the sign-in screen, one every
5 seconds. Drop the files in **this folder** with **exactly these names**:

| File | Used by |
|---|---|
| `signin-1.png` | first slide |
| `signin-2.png` | second slide |
| `signin-3.png` | third slide |

No code change is needed — the slots are already wired. Until the files land,
each slide falls back to a token gradient (a different one per slide, so the
loop is still visibly working).

Notes for the photos:
- The card and the legal line sit over the **bottom ~45%**, and a scrim darkens
  that area, so keep the subject in the **upper two thirds**.
- Portrait, roughly 3:5 (e.g. 1080×1800). They are `background-size:cover`, so
  anything portrait crops sensibly.
- JPG works too — rename the reference in the `.ob-photo .s1/.s2/.s3` rules if
  you use a different extension.
