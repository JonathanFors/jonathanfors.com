// Single source of truth for links + hard facts.
// Keep numbers/dates in sync with ../CONTEXT.md — if one changes, change both.

// ---- Brand -----------------------------------------------------------
/**
 * The business name and the person behind it — deliberately two fields.
 *
 * Renamed from "Jonathan Fors" to **Ultra Endurant** in September 2026. The
 * offer did not change with it: one coach, writing every plan himself. So the
 * two are not interchangeable in copy, and swapping one for the other is a
 * meaning change, not a find-and-replace:
 *
 * - `name` is the business — tab titles, the wordmark, the copyright line, the
 *   trading name on the legal pages, anything a company would sign.
 * - `coach` is the human — photo captions, the JSON-LD `Person`, a byline, and
 *   anywhere the copy speaks about who an athlete actually works with.
 *
 * `attribution` is the line that keeps the first from swallowing the second.
 */
export const brand = {
  name: "Ultra Endurant",
  coach: "Jonathan Fors",
  domain: "ultraendurant.com",
  url: "https://ultraendurant.com",
  /**
   * The athlete-facing app, at app.ultraendurant.com. Formerly "Shuffle Hub".
   * Not built or linked yet — here so the name has one home when it is.
   */
  app: "Ultra Endurant App",
  appUrl: "https://app.ultraendurant.com",
  /**
   * Printed wherever the brand name could read as a company of coaches. A
   * business name is the one thing that can make a one-person practice look
   * like a marketplace, which is the opposite of what's being sold.
   */
  attribution: "Ultra Endurant is one coach: Jonathan Fors.",
} as const;

/**
 * What the Ultra Endurant App gives an athlete — the homepage's app section.
 *
 * Every athlete works through it, 1:1 and group alike, so it is part of the
 * offer rather than a bonus. `aiStance` is deliberately separated from the
 * feature list: the interesting thing about the AI is what it is *forbidden*
 * to do, and folding that into a bullet would sell it as a feature instead of
 * the safety position it actually is.
 *
 * ⚠️ Nothing about the app's build — stack, hosting, ship date — has been
 * stated. This describes what it does for an athlete and nothing more; don't
 * add screenshots, platform badges or a launch date without asking.
 */
export const appFeatures = [
  [
    "Your schedule",
    "Every session, in order, with the week laid out — so what's next is never a question.",
  ],
  [
    "Workout analysis",
    "Finished sessions get read back to you: what the numbers did, and what changed since last time.",
  ],
  [
    "Calls, live",
    "Weekly video calls happen in the app. Nothing to install, no link to lose.",
  ],
  [
    "Everything said, kept",
    "Notes and transcripts from every call and WhatsApp thread, searchable. You never have to remember what we agreed.",
  ],
  [
    "Your links, together",
    "Plans, races, forms, whatever the week needs — in one place instead of five.",
  ],
] as const;

/**
 * The app's AI stance, printed as its own callout in the app section.
 * This is a position, not a disclaimer — say it in Jonathan's voice.
 */
export const aiStance = {
  heading: "The AI doesn't give advice. That's deliberate.",
  body: "It reads your completed sessions and tells you what happened in them. It will not tell you to push, to back off, to run through something, or to change your plan — that's my job, and I think handing health advice to a model is genuinely dangerous. The analysis is a mirror, not a coach.",
} as const;

export const siteLinks = {
  /**
   * The intro call, now booked in the Ultra Endurant App rather than TidyCal
   * (changed 2026-09-08). `BookingModal` embeds this same booking as an iframe;
   * this URL is what the CTAs carry as their href, so it is the no-JS and
   * middle-click fallback and has to work as a standalone page.
   *
   * ⚠️ The old TidyCal links are superseded but not dead:
   * `meet.jonathanfors.com/discovery` is in published copy and
   * `meet.jonathanfors.com/20` went out in a newsletter edition. Both need to
   * redirect here or keep working.
   */
  booking:
    "https://app.ultraendurant.com/book/e345304d-b105-4f02-8bcc-fef52b727904",
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
  instagram: "https://www.instagram.com/jonathans.pov/",
  linkedin: "https://www.linkedin.com/in/jonathanfors/",
  // ⚠️ Moved to the new domain with the Sept 2026 rename. The old address —
  // coach@ on the old domain — is printed in the published terms, in the privacy
  // policy and in every email Jonathan has already sent, so it has to keep
  // forwarding here indefinitely. It is not a redirect that can be retired.
  email: "jonathan@ultraendurant.com",
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
 * Jonathan's racing record — what the achievements band prints.
 *
 * ⚠️ **Supplied by Jonathan on 2026-09-08 and not yet sourced.** There is no
 * ITRA profile URL and no MDS result page on file, so none of this is linked to
 * anything a reader could check. These are the strongest credibility claims on
 * the site and the easiest to challenge, so get a link for each before leaning
 * on them harder than this.
 *
 * ⚠️ `mds` is deliberately worded as Jonathan phrased it ("placed among
 * elites"), which can mean *finished among the elite field* or *raced in it*.
 * Confirm the actual placing before making it more specific — a wrong number
 * here is worse than a vague one.
 */
export const record = [
  {
    figure: "Top 5%",
    label: "Ranked worldwide on ITRA",
  },
  {
    figure: "MDS",
    label: "Placed among the elites, Legendary",
  },
  {
    figure: "744 km",
    label: "Longest run — Portugal's coast",
  },
] as const;

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
  /**
   * Printed on the homepage as social proof, so it has to stay true.
   *
   * **Rounded down on purpose.** beehiiv reported **266** active subscribers on
   * 2026-09-08; this says 250 so that ordinary churn can't turn the claim
   * false between deploys. Re-check beehiiv before raising it, and never round
   * up to the next hundred — most of these arrived through the group-coaching
   * waitlist rather than the newsletter form, and one list is what they share.
   */
  subscribers: 250,
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
 * The trading name on the site is `brand.name` ("Ultra Endurant"); the
 * contracting party and the GDPR data controller is the company. Both legal
 * pages name the company, so the name and address live here rather than being
 * typed twice.
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
  updated: "9 September 2026",
  privacy: "/privacy",
  terms: "/terms",
} as const;

/** The two legal pages, for the footers that list them. */
export const legalPages = [
  { label: "Privacy", href: legal.privacy },
  { label: "Terms", href: legal.terms },
] as const;
