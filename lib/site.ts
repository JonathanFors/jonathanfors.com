// Single source of truth for links + hard facts.
// Keep numbers/dates in sync with ../CONTEXT.md — if one changes, change both.

export const siteLinks = {
  booking: "https://meet.jonathanfors.com/discovery",
  // The athlete-intake page is intentionally NOT linked anywhere on the site
  // (noindex). Jonathan sends this URL manually to athletes he has spoken to.
  intake: "/athlete-intake",
  // Standalone group-coaching waitlist landing page. Public and indexed —
  // this is the link to put in a bio or a post, not the homepage anchor.
  waitlist: "/waitlist",
  // Standalone Shuffle Club landing page. Public and indexed — the link to put
  // in a bio or at the end of an edition, where the homepage anchor buries the
  // signup under three other sections.
  newsletter: "/newsletter",
  // The number the sticky WhatsApp module opens — the same one 1:1 athletes
  // text. `wa.me` prefills the message, so the first thing Jonathan sees is
  // where the question came from.
  whatsapp:
    "https://wa.me/351932286853?text=Hi%20Jonathan%2C%20I%20have%20a%20question",
  instagram: "https://www.instagram.com/jonathans.pov/",
  linkedin: "https://www.linkedin.com/in/jonathanfors/",
  email: "coach@jonathanfors.com",
  sponsorPdf: "/project-portugal-2026.pdf",
} as const;

export const facts = {
  routeKm: 900, // ~900 km — the planned route. Only the live page still uses this.
  previousKm: 480, // reached ~480 km on the first attempt
  startDate: "1 August 2026",
  startDateISO: "2026-08-01",
  cause: "men's mental health",
  certification: "UESCA-certified",

  // The run as it actually happened — completed 10 August 2026. The redesign
  // treats Portugal as social proof, not an upcoming project.
  ranKm: 744, // exactly 744 km
  ranDays: 10,
  ranDates: "1–10 August 2026",

} as const;

/**
 * beehiiv "magic link" — a GET endpoint that subscribes the address in `email`.
 * Used as a plain form action so the signup field can be built natively instead
 * of iframed, which is what the embed forced.
 *
 * Both forms share the link; `utm_medium` is what tells them apart in beehiiv.
 */
export const beehiivMagicLink =
  "https://magic.beehiiv.com/v1/7acd9c66-dec5-40ec-990a-bfd12f0e29e0";

/** The `utm_medium` value each signup form reports. */
export const subscribeSource = {
  newsletter: "newsletter",
  groupWaitlist: "group-coaching-waitlist",
} as const;

/**
 * The two beehiiv custom fields the group waitlist writes to, and the exact
 * values allowed in each.
 *
 * These are matched by beehiiv on the display name, and a list field only
 * accepts the options defined on it — so **these strings have to match beehiiv
 * → Audience → Custom fields character for character**. Rename one there and
 * it has to be renamed here, or the value is refused and dropped.
 */
export const beehiivFields = {
  firstName: "First Name",
  experience: "Experience level",
} as const;

/** The options on beehiiv's "Experience level" list field, in its order. */
export const experienceLevels = [
  "Beginner",
  "Average",
  "Experienced",
  "Professional",
] as const;

// 1:1 coaching — the main offer.
export const oneToOne = {
  price: "€200",
  period: "/mo",
  includes: [
    "24/7 access to me on WhatsApp",
    "A weekly 1:1 call",
    "No template workouts — every session written for you",
    "Extra calls whenever you need them",
    "No minimum period. Cancel anytime",
  ],
} as const;

// Group coaching — not launched yet.
export const groupCoaching = {
  freeSpots: 5,
  price: "€50",
  period: "/mo",
  /** Launches end of September 2026. */
  launch: "end of September",
  /**
   * The free places are drawn at random from the waitlist — deliberately not
   * given to the first five to sign up, so signing up early is no advantage.
   * Any copy about them has to avoid implying a race.
   */
  freeSpotsAreRandom: true,
  /**
   * The five drawn places are free for as long as the athlete stays in the
   * group — not a free trial and not a discounted first month. Copy has to say
   * so outright, because "Free … then €50/mo" reads as a trial otherwise.
   */
  freeSpotsAreForever: true,
  beehiivFormId: "e13cc671-c933-430e-be05-8e185c4ee9d2", // waitlist
} as const;

// Newsletter — three editions a week, free.
export const shuffleClub = {
  name: "Shuffle Club",
  beehiivFormId: "5d6e4078-8f3a-49cc-9ce5-fc272223ffbd",
  editions: [
    ["Tuesday", "The science", "What the research actually says."],
    ["Friday", "My take", "The same subject from the road, in my own words."],
    ["Sunday", "Your questions", "Reader questions, answered."],
  ],
} as const;

// ---- Navigation ------------------------------------------------------
// The nav is rendered by the root layout, so it is the same bar on every page.
// That is why every href here is absolute: a bare "#approach" scrolls to
// nothing on /waitlist. Separate from `nav` below, which the retired page
// components still import.

/** Homepage sections — what the coaching is. These jump home from any page. */
export const clubSections = [
  { label: "Approach", href: "/#approach" },
  { label: "How it works", href: "/#coaching" },
  { label: "Coaching", href: "/#coaching-options" },
] as const;

/**
 * The two standalone signup pages. Real routes rather than anchors, so these
 * are the only nav items that can be the current page — the nav marks them
 * with aria-current, the section anchors above can never match.
 */
export const clubPages = [
  { label: "Group waitlist", href: siteLinks.waitlist },
  { label: "Newsletter", href: siteLinks.newsletter },
] as const;

/** The nav bar in order: what the coaching is, then where to sign up. */
export const clubNav: readonly { label: string; href: string }[] = [
  ...clubSections,
  ...clubPages,
];

// Anchor targets used by the nav + in-page links.
export const nav = [
  { label: "Approach", href: "#approach" },
  { label: "How it works", href: "#coaching" },
  { label: "Portugal 2026", href: "#portugal" },
  { label: "Sponsors", href: "#sponsors" },
] as const;

// ---- Legal -----------------------------------------------------------
/**
 * The company behind the coaching, and the two legal pages.
 *
 * The trading name on the site is "Jonathan Fors"; the contracting party and
 * the GDPR data controller is the company. Both legal pages name the company,
 * so the name and address live here rather than being typed twice.
 *
 * ⚠️ No Estonian registry code (`registrikood`) yet — it belongs on both pages
 * and in the footer once Jonathan supplies it.
 */
export const legal = {
  company: "Jon Corp OÜ",
  address: "Sepapaja tn 6, 15551 Tallinn, Estonia",
  country: "Estonia",
  /** Estonian Data Protection Inspectorate — where a GDPR complaint goes. */
  supervisor: "Andmekaitse Inspektsioon",
  supervisorEn: "the Estonian Data Protection Inspectorate",
  supervisorUrl: "https://www.aki.ee/en",
  /**
   * Shown on both pages as "Last updated". Hard-coded rather than derived from
   * the build date: a legal page that silently re-dates itself on every deploy
   * tells the reader nothing. Change it when the wording changes.
   */
  updated: "1 September 2026",
  privacy: "/privacy",
  terms: "/terms",
} as const;

/** The two legal pages, for the footers that list them. */
export const legalPages = [
  { label: "Privacy", href: legal.privacy },
  { label: "Terms", href: legal.terms },
] as const;
