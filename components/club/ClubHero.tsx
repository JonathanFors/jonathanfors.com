import Image from "next/image";
import { facts, siteLinks } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import SlashMark from "@/components/SlashMark";

/* Stat plates — a club-sheet rail across the foot of the hero. Facts only. */
const PLATES = [
  { figure: "UESCA", label: "Certified ultrarunning coach" },
  {
    figure: `${facts.ranKm} km`,
    label: `Portugal's coast in ${facts.ranDays} days`,
  },
  { figure: "1:1", label: "Remote coaching, worldwide" },
];

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
        aria-label="Jonathan Fors — ultra-endurance running coach"
      >
        {/* Slash field, top-right — the logo mark blown up as texture. */}
        <div
          aria-hidden="true"
          className="club-slashes pointer-events-none absolute -right-16 -top-10 h-[45vw] max-h-[34rem] w-[52vw] max-w-[40rem] text-red/[0.13] [--bar:12px] [--gap:40px] sm:-right-32 sm:-top-20 sm:[--bar:20px] sm:[--gap:66px]"
        />

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-center px-5 pb-0 pt-28 sm:px-8 sm:pt-32">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
            <p className="club-label text-snow-dim">
              Ultra-endurance running coach · UESCA-certified
            </p>
          </div>

          {/* Headline — full width, scale-stepped across three lines */}
          <h1 className="font-club relative z-10 mt-8 text-snow sm:mt-10">
            <span className="block text-club-xl">Train for</span>
            <span className="block text-club-xl">the ultra.</span>
            {/* Sized below text-club-lg: the tape can't wrap, so this line has
                to fit the narrowest viewport on one line. */}
            <span className="mt-3 block text-[clamp(1.95rem,6.6vw,5.75rem)] sm:mt-4">
              <span className="club-tape">Keep your life.</span>
            </span>
          </h1>

          {/* Copy + CTAs on the left; portrait rises into the type void right */}
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-1">
              <p className="max-w-xl text-lg leading-relaxed text-snow-dim">
                Holistic coaching for ambitious runners with jobs, families, and
                a long race on the horizon. The training is built to fit your
                life — not the other way around.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={siteLinks.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="book-intro-call"
                  data-cta-location="hero"
                  className="btn-club btn-club-red club-label group inline-flex items-center justify-center gap-3 px-8 py-4"
                >
                  <span className="inline-flex items-center gap-3">
                    Book 1:1 call
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                <a
                  href="#coaching"
                  data-cta="how-it-works"
                  data-cta-location="hero"
                  className="btn-club btn-club-outline-light club-label inline-flex items-center justify-center px-8 py-4"
                >
                  <span>How it works</span>
                </a>
              </div>
            </div>

            {/* Portrait — pulled up beside the short third headline line */}
            <figure className="relative sm:max-w-sm lg:col-span-4 lg:col-start-9 lg:-mt-[19rem] lg:max-w-none lg:self-start">
              <div className="club-cut-br relative aspect-[4/5] overflow-hidden bg-night-2 lg:aspect-[3/4]">
                <Image
                  src="/images/coach-hero.jpg"
                  alt="Jonathan Fors in a running top and visor, smiling, on a sunlit coastal trail."
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover object-[55%_42%]"
                />
              </div>
              {/* Bib plate over the bottom-left corner */}
              <figcaption className="absolute -bottom-4 left-0 flex items-center gap-3 bg-red px-4 py-2.5 text-ink lg:-left-6">
                <SlashMark className="h-4 w-[1.1rem] shrink-0" />
                <span className="club-label">Coach · Est. 2026</span>
              </figcaption>
            </figure>
          </div>

          {/* Stat rail — hard-divided plates, flush to the foot of the hero */}
          <dl className="mt-20 grid grid-cols-1 border-t-2 border-snow/15 sm:grid-cols-3">
            {PLATES.map(({ figure, label }, i) => (
              <div
                key={label}
                className={`flex flex-col gap-1.5 py-7 sm:px-6 sm:first:pl-0 ${
                  i > 0 ? "border-t-2 border-snow/15 sm:border-l-2 sm:border-t-0" : ""
                }`}
              >
                <dt className="club-numeral text-4xl text-snow sm:text-5xl">
                  {figure}
                </dt>
                <dd className="club-label text-[0.68rem] text-snow-dim">
                  {label}
                </dd>
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
