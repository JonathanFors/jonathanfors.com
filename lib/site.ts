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

  instagramHandle: "@jonathans.pov",
  instagramFollowers: "11.1k",
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

// Anchor targets for the redesigned (club) page. Separate from `nav` below,
// which the current live page still needs — its sections haven't moved yet.
export const clubNav = [
  { label: "Approach", href: "#approach" },
  { label: "How it works", href: "#coaching" },
  { label: "Coaching", href: "#coaching-options" },
  { label: "Newsletter", href: "#newsletter" },
] as const;

// Anchor targets used by the nav + in-page links.
export const nav = [
  { label: "Approach", href: "#approach" },
  { label: "How it works", href: "#coaching" },
  { label: "Portugal 2026", href: "#portugal" },
  { label: "Sponsors", href: "#sponsors" },
] as const;
