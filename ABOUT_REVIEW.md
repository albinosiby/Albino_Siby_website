# About section redesign

Implemented on `about-redesign`, based on the Projects redesign already pushed to main.

- Reuses the existing portrait and verified biography, employment duration, skills, and education.
- Adds a responsive portrait/introduction layout and cards for skills, experience, and education, matching Projects typography, dark surfaces, pink accents, and rounded borders.
- Keeps earlier education accessible through a native keyboard-operated disclosure; all other About content is visible without JavaScript.
- Adds links to Projects and the existing résumé PDF, hover effects, focus outlines, and reduced-motion support.
- Removes the unused inline About tab script. Home, Projects, and Contact remain unchanged.
- Adds the scoped `about.css` to the static build and lint command. No new dependencies.

Validation: static build and lint pass; all 8 existing desktop/mobile Projects tests pass. About passed Axe accessibility and section overflow checks at 320, 390, 768, 1024, and 1440 px. Keyboard opening/closing of education history, portrait loading, Projects navigation, and the résumé asset (HTTP 200) were checked. Desktop and mobile screenshots were visually reviewed. Browser testing used Chromium viewport emulation, not physical devices.

Local preview: `npm run dev`, then open `http://localhost:4173/#about`.

Generated screenshots: `preview/about-desktop.png`, `preview/about-mobile.png`, and `preview/about-mobile-full.png` (ignored by Git).

No remote push, merge, or deployment was performed for this update.
