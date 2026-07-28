// Single source of truth for links + hard facts.
// Keep numbers/dates in sync with ../CONTEXT.md — if one changes, change both.

export const siteLinks = {
  booking: "https://meet.jonathanfors.com/discovery",
  intake: "/athlete-intake",
  instagram: "https://www.instagram.com/jonathans.pov/",
  linkedin: "https://www.linkedin.com/in/jonathanfors/",
  email: "coach@jonathanfors.com",
  sponsorPdf: "/project-portugal-2026.pdf",
} as const;

export const facts = {
  routeKm: 900, // ~900 km — coastline of Portugal
  previousKm: 480, // reached ~480 km on the first attempt
  startDate: "1 August 2026",
  startDateISO: "2026-08-01",
  cause: "men's mental health",
  certification: "UESCA-certified",
} as const;

// Anchor targets used by the nav + in-page links.
export const nav = [
  { label: "Approach", href: "#approach" },
  { label: "Coaching", href: "#coaching" },
  { label: "Portugal 2026", href: "#portugal" },
  { label: "Sponsors", href: "#sponsors" },
] as const;
