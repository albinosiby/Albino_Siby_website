# Projects redesign review

Branch: `portfolio-redesign`, based on `main` at `b831a96`.

The original site is a static HTML/CSS portfolio with inline navigation/tab scripts and a Font Awesome kit. It had three older project cards, no package manifest, no build or lint commands, and no automated tests. This implementation retains that architecture: there are no new browser dependencies and no framework migration.

## Implementation

- `index.html`: replacement Projects section, preserved `#potfolio` navigation anchor, native detail dialog, older projects archive, and three local stylesheet/script references.
- `projects.css`: scoped responsive styling, hover interactions, entry transitions, reduced-motion support, focus outlines, and modal styles.
- `projects-data.js`: editable catalog for the seven current projects.
- `projects.js`: category filtering, live result count, detail rendering, modal keyboard behavior and focus restoration.
- Home, About, Contact, existing assets, original stylesheet, and existing navigation/tab scripts are preserved. The older Bus Booking System link is corrected to the verified `bus_ticket_JDBC` repository.
- Development tooling is optional. The site still runs as static files without npm at runtime. The build validates local assets and catalog URLs, then copies the site to `dist/`.

## Verified content and image provenance

| Project | Evidence | Image |
| --- | --- | --- |
| Booking OS | `albinosiby/booking`, README: owner/staff Flutter app, multi-business booking and team operations | Existing `docs/screenshots/public-booking-desktop.png` copied from that repository; no UI fabricated |
| Shotify.store | Public `https://shotify.store` homepage, returned HTTP 200; Next.js confirmed by served assets and response headers | Screenshot of that public homepage, captured October 31, 2026 |
| TradeNest | Accessible `albinosiby/muilti-vendor`, README and `docs/SHARED_INVENTORY.md`: Flutter marketplace and Shotify integration | Existing `tradenest-landing/public/homepage-phone.png`; explicitly described as a product asset, not a new screenshot |
| Neram | `albinosiby/neram`, README and committed `dist/` frontend | Screenshot of the committed web interface served locally; no live data or service availability invented |
| School Platform | `albinosiby/school-project`, separate parent/teacher Flutter clients and modules for attendance, homework, marks, fees, timetables and messages | Omitted; design exports were not represented as product screenshots |
| CoachTasks | Owner-provided `https://tatoscoachos.web.app/`; public Coach OS page describes coach/client workspaces for workouts, meals, progress, sessions and chat | Screenshot of the public homepage, October 31, 2026 |
| Shortshifts | Owner-provided `https://shortshifts-eb044.web.app/`; public ShortShifts page describes worker/host shift discovery, coordination and payout visibility | Screenshot of the public homepage, October 31, 2026 |

Finance Tracker and VoxDivini have been removed at the owner’s request. TradeNest has no public link because its source repository is private and no public product URL was verified.

Screenshots are stored locally, so visiting the portfolio does not query the featured products. Shotify's screenshot was rendered from its public source through curl-backed browser interception to preserve the environment's configured CA/proxy trust; TLS verification remained enabled. Neram's screenshot shows the initial search screen, not a simulated search result.

## Local preview

```sh
npm ci
npm run build
npm run lint
npm test
npm run dev
```

Open `http://localhost:4173/#potfolio` for the interactive preview. No deployment is needed. The Playwright configuration defaults to `/usr/bin/chromium`; set `CHROMIUM_PATH` to your local Chromium executable when needed.

Visual review artifacts are in `preview/desktop.png`, `preview/mobile.png`, `preview/projects-full.png`, and `preview/project-detail-mobile.png`. These generated screenshots and `dist/` are intentionally ignored by Git.

## Verification

The user story is: open Projects → filter the local catalog → open a project → read the detail view → follow a verified external link or close the view and return to the initiating control. There is no API, database, authentication or environment configuration in this feature.

- `npm run build`: static asset references, project count/unique IDs, external HTTPS URL formats, and static output generation.
- `npm run lint`: ESLint on new JavaScript, tooling and browser tests; Stylelint on the new stylesheet. Existing inline scripts and original styles are outside the new lint scope.
- `npm test`: **8 passed**, desktop Chromium (1440 px) and touch/mobile emulation (390 px), including filtering counts/pressed state, loaded screenshots, safe external links, keyboard opening, focus wrapping, Escape, close button, focus restoration, missing-content handling, and Axe checks on Projects and the open dialog.
- Responsive overflow checks at 320, 360, 390, 768, 1024 and 1440 px, including open detail dialogs; reduced-motion behavior verified.
- All seven project/archive external URLs returned HTTP 200 during read-only checks on October 31, 2026. Link availability can change after review.
- Desktop and mobile screenshots visually inspected. These are browser emulation checks, not physical-device or Safari/Firefox certification.
- The existing third-party Font Awesome kit is blocked in automated tests so tests do not depend on that external service; the redesigned Projects section uses local SVG icons.

## Release boundary

No main-branch files were changed, no merge was performed, and no deployment was requested. Work is retained on the local `portfolio-redesign` branch. Per the owner’s follow-up, testing and preview remain local and the owner will handle Render. No remote push is performed. A live preview server and downloadable static preview are sufficient for review without updating production.

## Confirmed project links update

CoachTasks and Shortshifts now have owner-confirmed public website links, descriptions and highlights derived from those pages, and captured homepage screenshots in their detail dialogs. Both websites serve Next.js assets, which verify the website technology tag; no mobile framework or backend stack is inferred. Both pages were retrieved successfully over HTTPS. CoachTasks and Shortshifts appear under Platforms. Finance Tracker and VoxDivini were subsequently removed, along with the empty More projects filter. The original four featured projects remain unchanged. This update is local on `project-links-update` and has not been pushed or deployed.
