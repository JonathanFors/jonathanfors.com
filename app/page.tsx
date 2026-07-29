import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import RouteScroll from "@/components/RouteScroll";
import SponsorGrid from "@/components/SponsorGrid";
import StickyNav from "@/components/StickyNav";
import MobileCtaBar from "@/components/MobileCtaBar";
import CtaTracker from "@/components/CtaTracker";
import BookingModal from "@/components/BookingModal";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import CertBadge from "@/components/CertBadge";
import {
  ArrowIcon,
  CalendarIcon,
  DownloadIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";
import { facts, siteLinks } from "@/lib/site";

/* -------------------------------------------------------------------------
 * "Reasons to work with me" — stands in for testimonials until real athlete
 * stories are collected. When they are, this section can swap back to quotes
 * (the layout is the same three-up grid). See PLACEHOLDERS.md.
 * ---------------------------------------------------------------------- */
const reasons = [
  {
    title: "Your life leads",
    body: "Training is built around your work, your family, and the stress you already carry. The plan bends to your week — not the other way around.",
  },
  {
    title: "A coach who does the distance",
    body: "UESCA-certified, and out running the coastline of Portugal himself. The methods are tested on the road, not just written on paper.",
  },
  {
    title: "Honest, never hyped",
    body: "No motivational noise and no one-size plans. Just clear structure, steady adjustment, and the work that actually moves you forward.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jonathanfors.com/#jonathan",
      name: "Jonathan Fors",
      jobTitle: "Ultra-Endurance Running Coach",
      description:
        "UESCA-certified ultra-endurance running coach. Holistic coaching that builds training around an athlete's whole life.",
      url: "https://jonathanfors.com",
      email: `mailto:${siteLinks.email}`,
      sameAs: [siteLinks.instagram, siteLinks.linkedin],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "UESCA Ultrarunning Coach Certification",
      },
    },
    {
      "@type": "Service",
      "@id": "https://jonathanfors.com/#coaching",
      serviceType: "Ultra-endurance running coaching",
      provider: { "@id": "https://jonathanfors.com/#jonathan" },
      areaServed: "Worldwide (remote)",
      description:
        "One-to-one ultramarathon coaching, from a first ultra to a hundred-miler, structured around the athlete's life.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: siteLinks.booking,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StickyNav />
      <CtaTracker />
      <BookingModal />
      <MobileCtaBar />

      <main>
        {/* 1 — HERO */}
        <Hero />

        {/* 2 — APPROACH / holistic thesis */}
        <section
          id="approach"
          className="relative border-b border-rule bg-paper"
        >
          <div className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
            <Reveal className="flex items-baseline gap-5">
              <span className="numeral text-3xl text-atlantic sm:text-4xl">
                01
              </span>
              <span className="text-kicker text-ink-faint">The approach</span>
            </Reveal>

            <Reveal className="mt-10 lg:mt-14">
              <h2 className="font-display text-display-sm max-w-[18ch] text-ink">
                Training fits around your life. Not the other way around.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
              {/* Portrait — spills slightly left of the column on large screens */}
              <Reveal className="lg:col-span-5 lg:-ml-4">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-dim">
                  <Image
                    src="/images/coach-portrait.jpg"
                    alt="Jonathan Fors, smiling, in a running vest on a grey coastal day."
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[50%_30%]"
                  />
                </figure>
              </Reveal>

              {/* Body + who it's for — offset downward for the broken grid */}
              <div className="lg:col-span-6 lg:col-start-7 lg:mt-16">
                <Reveal className="prose text-lg">
                  <p>
                    Most training plans assume your life will bend to the
                    schedule. Mine assumes the opposite. We start with your
                    work, your family, and the stress you&apos;re already
                    carrying — then build the training to fit inside it.
                  </p>
                  <p>
                    That&apos;s <strong>holistic health</strong>: the whole
                    athlete comes first. Consistency you can actually sustain
                    beats a perfect week you can only manage once.
                  </p>
                </Reveal>

                <Reveal className="mt-10" delay={80}>
                  <h3 className="text-kicker text-ink-faint">Who this is for</h3>
                  <ul className="mt-5 divide-y divide-rule border-y border-rule">
                    {[
                      "Runners going from a first ultra up to a hundred-miler.",
                      "Ambitious adults with real jobs, families, and not enough hours.",
                      "People who distrust hype and want a coach who does the work.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 py-4 text-ink-soft"
                      >
                        <ArrowIcon className="mt-1 h-4 w-4 shrink-0 text-atlantic" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Full-bleed texture band */}
        <section
          aria-hidden="true"
          className="relative h-[42vh] min-h-64 w-full overflow-hidden bg-night"
        >
          <Image
            src="/images/horses-road.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_55%]"
          />
          <div className="absolute inset-0 bg-night/30" />
        </section>

        {/* 3 — HOW COACHING WORKS */}
        <section id="coaching" className="border-b border-rule bg-paper">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
            <Reveal className="flex items-baseline gap-5">
              <span className="numeral text-3xl text-atlantic sm:text-4xl">
                02
              </span>
              <span className="text-kicker text-ink-faint">
                How coaching works
              </span>
            </Reveal>

            <Reveal className="mt-10 lg:mt-14">
              <h2 className="font-display text-display-sm max-w-[16ch] text-ink">
                A plan built for your week — and rebuilt when it changes.
              </h2>
            </Reveal>

            {/* Process steps */}
            <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "The intro call",
                  "A free, no-pressure conversation about where you are and where you want to go.",
                ],
                [
                  "Your full picture",
                  "A short intake covers your running history, your life, and your constraints — not just your splits.",
                ],
                [
                  "A plan that fits",
                  "Structured training mapped onto your real schedule, with the load and recovery balanced for you.",
                ],
                [
                  "Ongoing adjustment",
                  "The plan moves when life moves. We adapt as work, travel, and fatigue shift week to week.",
                ],
              ].map(([title, body], i) => (
                <Reveal
                  key={title}
                  as="li"
                  delay={i * 70}
                  className="flex flex-col gap-4 bg-paper p-7"
                >
                  <span className="numeral text-2xl text-atlantic">
                    0{i + 1}
                  </span>
                  <h3 className="font-display-tight text-lg text-ink">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
                </Reveal>
              ))}
            </ol>

            {/* What you get + funnel to the call.
                TODO:CONTENT — concrete deliverables, communication cadence,
                tools, and pricing are set per athlete and confirmed on the
                call. Fill specifics here when ready (see PLACEHOLDERS.md). */}
            <Reveal className="mt-14">
              <div className="flex flex-col items-start justify-between gap-6 rounded-sm border border-rule bg-paper-dim/60 p-8 sm:flex-row sm:items-center sm:p-10">
                <div className="max-w-xl">
                  <h3 className="font-display-tight text-xl text-ink">
                    Programs are tailored, not off-the-shelf.
                  </h3>
                  <p className="mt-2 text-ink-soft">
                    What that looks like — and what it costs — depends on you and
                    your race. We&apos;ll map it out together on the call.
                  </p>
                </div>
                <a
                  href={siteLinks.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="book-intro-call"
                  data-cta-location="coaching"
                  className="btn btn-atlantic group inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Book an intro call
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 900 km lead-in band into the Portugal proof */}
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 py-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-24">
            <div className="flex items-end gap-4">
              <CountUp
                value={facts.routeKm}
                className="numeral text-[clamp(4.5rem,16vw,13rem)] leading-[0.8] text-ink"
              />
              <span className="mb-4 font-display-tight text-2xl text-ink-faint sm:mb-6">
                km
              </span>
            </div>
            <p className="max-w-xs text-ink-soft sm:text-right">
              What the coaching is built on: a coach who is out there doing the
              distance himself.
            </p>
          </div>
        </section>

        {/* 4 — PROOF: Project Portugal 2026 (pinned horizontal route) */}
        <RouteScroll />

        {/* 5 — REASONS TO WORK WITH ME (testimonials stand-in) */}
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
            <Reveal className="flex items-baseline gap-5">
              <span className="numeral text-3xl text-atlantic sm:text-4xl">
                03
              </span>
              <span className="text-kicker text-ink-faint">
                Reasons to work with me
              </span>
            </Reveal>

            <Reveal className="mt-10 lg:mt-14">
              <h2 className="font-display text-display-sm max-w-[16ch] text-ink">
                What you&apos;re actually signing up for.
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-3">
              {reasons.map((r, i) => (
                <Reveal
                  key={r.title}
                  delay={i * 80}
                  className="flex flex-col gap-4 bg-paper p-8"
                >
                  <span className="numeral text-2xl text-atlantic">
                    0{i + 1}
                  </span>
                  <h3 className="font-display-tight text-xl text-ink">
                    {r.title}
                  </h3>
                  <p className="leading-relaxed text-ink-soft">{r.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — PARTNERS & SPONSORS */}
        <section id="sponsors" className="border-b border-rule bg-paper">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <span className="numeral text-3xl text-atlantic sm:text-4xl">
                  04
                </span>
                <h2 className="mt-6 font-display text-display-sm max-w-[12ch] text-ink">
                  Back the run.
                </h2>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7" delay={80}>
                <p className="max-w-xl text-lg text-ink-soft">
                  Project Portugal 2026 reaches a community that understands
                  going the distance. The deck below covers the project, the
                  route, and the ways we can work together. Have a read, then
                  get in touch.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={siteLinks.sponsorPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    data-cta="sponsor-pdf"
                    data-cta-location="sponsors"
                    className="btn btn-ink inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download the sponsor deck
                    <span className="opacity-60">(PDF)</span>
                  </a>
                  <a
                    href={`mailto:${siteLinks.email}?subject=Project%20Portugal%202026%20sponsorship`}
                    data-cta="sponsor-email"
                    data-cta-location="sponsors"
                    className="btn btn-ghost-light inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    <MailIcon className="h-4 w-4" />
                    {siteLinks.email}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-14">
              <SponsorGrid email={siteLinks.email} />
            </Reveal>
          </div>
        </section>

        {/* 7 — FINAL CONVERSION */}
        <section className="on-night relative overflow-hidden bg-night">
          <Image
            src="/images/summit-stand.jpg"
            alt="Jonathan standing on a headland looking out over the Atlantic."
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-night/72" />
          <CertBadge className="absolute right-8 top-1/2 z-10 hidden h-40 w-40 -translate-y-1/2 text-snow lg:block" />
          <div className="relative mx-auto w-full max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
            <Reveal>
              <p className="text-kicker text-atlantic-bright">
                {facts.certification}
              </p>
              <h2 className="mt-6 font-display text-display max-w-[13ch] text-snow">
                Let&apos;s find your distance.
              </h2>
              <p className="mt-6 max-w-lg text-lg text-snow-dim">
                Start with a free intro call. If it&apos;s a fit, we build from
                there. If it&apos;s not, you&apos;ll still leave with a clearer
                idea of your next step.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={siteLinks.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="book-intro-call"
                  data-cta-location="final"
                  className="btn btn-snow group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Book a free intro call
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href={siteLinks.intake}
                  data-cta="athlete-intake"
                  data-cta-location="final"
                  className="btn btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
                >
                  Start the athlete intake
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8 — FOOTER */}
        <footer className="bg-paper">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8">
            <div className="flex flex-col justify-between gap-10 md:flex-row">
              <div>
                <p className="font-display-tight text-2xl text-ink">
                  Jonathan Fors
                </p>
                <p className="mt-2 max-w-xs text-sm text-ink-faint">
                  Ultra-endurance running coach. {facts.certification}. Coaching
                  built around the whole athlete.
                </p>
              </div>

              <nav
                aria-label="Footer"
                className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3"
              >
                <a
                  href={siteLinks.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="book-intro-call"
                  data-cta-location="footer"
                  className="text-ink-soft transition-colors hover:text-atlantic"
                >
                  Book a call
                </a>
                <Link
                  href={siteLinks.intake}
                  className="text-ink-soft transition-colors hover:text-atlantic"
                >
                  Athlete intake
                </Link>
                <a
                  href={`mailto:${siteLinks.email}`}
                  className="text-ink-soft transition-colors hover:text-atlantic"
                >
                  Email
                </a>
                <a
                  href={siteLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-atlantic"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={siteLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-atlantic"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </nav>
            </div>

            <div className="mt-14 flex flex-col gap-2 border-t border-rule pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Jonathan Fors. All rights reserved.</p>
              <p>Running the coastline of Portugal for {facts.cause}.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
