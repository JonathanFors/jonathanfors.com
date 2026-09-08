import { brand, facts, siteLinks } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import SlashMark from "@/components/SlashMark";

/**
 * Three reasons to stay, directly under the fold.
 *
 * These are claims, not numerals — the old hero ran a stat rail here (UESCA /
 * 744 km / 1:1) and the figures are still on the page, in the achievements
 * band. Facts told you what Jonathan has done; these tell you what the coaching
 * is like, which is the question someone actually arrives with.
 */
const KEYS = [
  [
    "Science-backed coaching",
    "Your coach is UESCA-certified with years behind him, and he doesn't only go on what worked for him — the practice is grounded in the research.",
  ],
  [
    "Holistic approach",
    "You're a whole person with a life to live. Family, work, illness and time off are counted from day one, not treated as things that got in the way.",
  ],
  [
    "Direct WhatsApp access",
    "You get Jonathan's number. Message your coach when something comes up, rather than saving it for a weekly slot.",
  ],
] as const;

/* Ticker — everything here is a plain fact about the coaching. */
const TICKER = [
  "1:1 Ultra Coaching",
  "UESCA Certified",
  "First Ultra to 100 Miles",
  "Holistic Health First",
  `${facts.ranKm} km Across Portugal`,
  "Remote — Worldwide",
];

export default function ClubHero() {
  return (
    <>
      <section
        id="top"
        className="club club-on-ink relative overflow-hidden bg-ink text-snow"
        aria-label={`${brand.name} — ultra-endurance running coaching`}
      >
        {/* Slash field, top-right — the logo mark blown up as texture. */}
        <div
          aria-hidden="true"
          className="club-slashes pointer-events-none absolute -right-16 -top-10 h-[45vw] max-h-[34rem] w-[52vw] max-w-[40rem] text-red/[0.13] [--bar:12px] [--gap:40px] sm:-right-32 sm:-top-20 sm:[--bar:20px] sm:[--gap:66px]"
        />

        {/* min-h is on the type block rather than the whole section: the key
            cards now sit inside the hero, so pinning the section to the
            viewport would push them a full screen down on a laptop. */}
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          {/* min-h fills the fold on a laptop; max-h stops it doing the same on
              a tall monitor, where 72svh would centre the type in a screen and
              a half and push the keys out of sight behind an empty band. */}
          <div className="flex min-h-[max(30rem,72svh)] max-h-[44rem] flex-col items-center justify-center text-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
              <p className="club-label text-snow-dim">
                Ultra-endurance running coach · UESCA-certified
              </p>
            </div>

            <h1 className="font-club relative z-10 mt-8 text-snow sm:mt-10">
              <span className="block text-club-xl">Train for the ultra.</span>
              {/* The tape can't wrap — it's one skewed box — so this line is
                  sized below text-club-xl to hold on the narrowest viewport.
                  The leading override is what makes the tape cover the whole
                  word: .club-tape draws the red block to the inline box, and
                  the display line-height of 0.84 makes that box shorter than
                  the glyphs, dropping caps and tails outside the red. 1.15 is
                  the threshold; 1.2 leaves a margin. */}
              <span className="mt-3 block text-[clamp(1.95rem,6.6vw,5.75rem)] leading-[1.2] sm:mt-4">
                <span className="club-tape">Keep your life.</span>
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-snow-dim">
              I coach runners training for a first ultra, or a next
              hundred-miler. Most of them have jobs, families and not enough
              hours in the week. We build the training around that life instead
              of asking you to clear space for it.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={siteLinks.booking}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="book-intro-call"
                data-cta-location="hero"
                className="btn-club btn-club-red club-label group inline-flex items-center justify-center gap-3 px-8 py-4"
              >
                <span className="inline-flex items-center gap-3">
                  Start 1:1 coaching
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a
                href={siteLinks.waitlist}
                data-cta="join-group-coaching"
                data-cta-location="hero"
                className="btn-club btn-club-outline-light club-label inline-flex items-center justify-center px-8 py-4"
              >
                <span>Join group coaching</span>
              </a>
            </div>
          </div>

          {/* Three keys — hard-divided plates across the foot of the hero */}
          <dl className="mt-16 grid grid-cols-1 border-t-2 border-snow/15 sm:mt-20 sm:grid-cols-3">
            {KEYS.map(([title, body], i) => (
              <div
                key={title}
                className={`flex flex-col gap-3 py-8 sm:px-7 sm:first:pl-0 ${
                  i > 0
                    ? "border-t-2 border-snow/15 sm:border-l-2 sm:border-t-0"
                    : ""
                }`}
              >
                <dt className="flex items-center gap-3">
                  <SlashMark className="h-3.5 w-[1rem] shrink-0 text-red" />
                  <span className="font-club-upright text-club-sm text-snow">
                    {title}
                  </span>
                </dt>
                <dd className="leading-relaxed text-snow-dim">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Red ticker band — the seam between hero and page */}
      <div className="relative overflow-hidden bg-red py-3.5 text-ink">
        {/* Four copies, animated by -50%: each half must be wider than the
            viewport or a gap opens at the end of the loop on large screens. */}
        <div className="club-ticker-track flex w-max items-center">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="club-label px-6">{item}</span>
              <SlashMark aria-hidden="true" className="h-3.5 w-[1rem] shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
