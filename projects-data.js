/* Verified content and asset provenance are recorded in PROJECTS_REVIEW.md. */
window.portfolioProjects = [
  {
    id: 'booking-os', name: 'Booking OS', category: 'Platforms', featured: true,
    eyebrow: 'OPERATIONS / BOOKING', monogram: 'B/', accent: 'lime',
    description: 'One workspace for bookings, teams, and the businesses behind them.',
    detail: 'An owner and staff platform for organizations running multiple venues. Manage resources, daily calendars, reservations, manual payment collections, and team permissions across sports facilities, pools, and party halls.',
    technologies: ['Flutter', 'Dart', 'Supabase'],
    highlights: ['Multi-location resource management', 'Calendars, bookings, and split payment records', 'Owner and staff access controls'],
    image: 'images/projects/booking-os.png', imageAlt: 'Booking OS public booking interface showing venue selection',
    imageCaption: 'Public booking interface · repository screenshot',
    links: [{label: 'View source', url: 'https://github.com/albinosiby/booking'}]
  },
  {
    id: 'shotify', name: 'Shotify.store', category: 'Commerce', featured: true,
    eyebrow: 'COMMERCE / STOREFRONTS', monogram: 'S.', accent: 'rose',
    description: 'From a store idea to a storefront that feels like your brand.',
    detail: 'A storefront platform for merchants to choose templates, manage products and collections, configure checkout, and publish to a custom domain. The public product site presents catalog, shipping, discounts, and order management features.',
    technologies: ['Next.js'],
    highlights: ['Storefront template library', 'Products, variants, and collections', 'Checkout and custom domains'],
    image: 'images/projects/shotify.png', imageAlt: 'Shotify.store public homepage and storefront template previews',
    imageCaption: 'Public homepage · captured October 31, 2026',
    links: [{label: 'Visit website', url: 'https://shotify.store'}]
  },
  {
    id: 'tradenest', name: 'TradeNest', category: 'Commerce', featured: true,
    eyebrow: 'COMMERCE / MARKETPLACE', monogram: 'T↗', accent: 'violet',
    description: 'A marketplace connecting product discovery with seller operations.',
    detail: 'A Flutter marketplace with product catalogs, carts, orders, seller listings, and chat. Previously downloaded content remains available offline, while checkout and other server actions require a connection. Shared inventory connects eligible products with Shotify.',
    technologies: ['Flutter', 'Dart'],
    highlights: ['Buyer and seller experiences', 'Offline catalog and draft recovery', 'Shared inventory with Shotify'],
    image: 'images/projects/tradenest.png', imageAlt: 'TradeNest mobile marketplace homepage from the existing landing page assets',
    imageCaption: 'Marketplace homepage · existing product asset',
    links: []
  },
  {
    id: 'neram', name: 'Neram', category: 'Platforms', featured: true,
    eyebrow: 'MOBILITY / TRANSIT', monogram: 'N↗', accent: 'blue',
    description: 'Make sense of the journey. Find your route with Neram.',
    detail: 'A responsive transit search experience with bus timetable search, stop autocomplete, time and operator filters, journey details, and English/Malayalam support. Metro station guides and archived railway timetables extend the route exploration experience. Timetable snapshots are not live service predictions.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Ordered-stop route search', 'Keyboard-accessible stop suggestions', 'Bus, Metro, and railway views'],
    image: 'images/projects/neram.png', imageAlt: 'Neram Transit route search interface with departure and destination fields',
    imageCaption: 'Web interface · captured from the repository locally',
    links: [{label: 'View source', url: 'https://github.com/albinosiby/neram'}]
  },
  {
    id: 'school-platform', name: 'School Platform', category: 'Platforms',
    eyebrow: 'EDUCATION', monogram: 'SP', accent: 'blue',
    description: 'A connected school experience for parents and teachers.',
    detail: 'The school-project repository contains separate parent and teacher Flutter apps alongside a website. The mobile modules include attendance, homework, marks, fees, timetables, notices, and messaging.',
    technologies: ['Flutter', 'Dart'],
    highlights: ['Parent and teacher apps', 'Attendance, homework, and marks', 'School notices and messaging'],
    image: null, imageAlt: '', imageCaption: '',
    links: [{label: 'View source', url: 'https://github.com/albinosiby/school-project'}]
  },
  ...[
    ['finance-tracker', 'Finance Tracker', 'FT'],
    ['coachtasks', 'CoachTasks', 'CT'],
    ['shortshifts', 'Shortshifts', 'SS'],
    ['voxdivini', 'VoxDivini', 'VV']
  ].map(([id, name, monogram]) => ({
    id, name, monogram, category: 'More projects', eyebrow: 'PROJECT', accent: 'neutral',
    description: 'Project details to follow.',
    detail: 'This project is included in the portfolio selection. A verified description, technology stack, screenshot, and public link have not been supplied yet.',
    technologies: [], highlights: [], image: null, imageAlt: '', imageCaption: '', links: [], pending: true
  }))
];
