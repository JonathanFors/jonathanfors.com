import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import SubscribeForm from "@/components/club/SubscribeForm";
import StickyWaitlistBar from "@/components/club/StickyWaitlistBar";
import { InstagramIcon, MailIcon } from "@/components/icons";
import {
  facts,
  groupCoaching,
  legal,
  legalPages,
  siteLinks,
  subscribeSource,
} from "@/lib/site";

/**
 * Group coaching waitlist — a standalone landing page for one action: getting an
 * email address onto the waitlist. This is the link for a bio or a post, where
 * the homepage would bury the waitlist under four other sections.
 *
 * It carries the site nav (from the root layout) but not ClubFooter: the footer
 * here is one line, because the page has one action and a full sitemap under it
 * is four more ways to leave without taking it. The email field is still the
 * first thing below the nav.
 *
 * The signup posts the same `utm_medium` as the homepage form
 * (`group-coaching-waitlist`) on purpose — the draw is run off one beehiiv
 * segment, and splitting it by entry point would put half the waitlist outside
 * it. Traffic to this page is measured in Vercel Analytics instead, by route.
 */

const title = "Group coaching waitlist";
const shareImage = "/images/hero-coast-road.jpg";
const shareImageAlt =
  "A runner on a winding coastal road above the Atlantic in Portugal.";
const description = `Five athletes get my group coaching free, forever — drawn at random from the waitlist when the group opens at the ${groupCoaching.launch}. Everyone else pays ${groupCoaching.price}${groupCoaching.period}. Three questions to join.`;

export const metadata: Metadata = {
  title,
  description,
  // Set explicitly: the root layout's canonical is "/" and would otherwise be
  // inherited, pointing this page at the homepage.
  alternates: { canonical: siteLinks.waitlist },
  // Next replaces `openGraph` / `twitter` wholesale rather than merging into the
  // root layout's, so the share image has to be repeated here — without it a
  // link pasted into Instagram or WhatsApp previews with no picture at all.
  openGraph: {
    title: `${title} — Jonathan Fors`,
    description,
    url: `https://jonathanfors.com${siteLinks.waitlist}`,
    siteName: "Jonathan Fors",
    type: "website",
    locale: "en_US",
    images: [{ url: shareImage, width: 1200, height: 630, alt: shareImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
};

/** The three things a reader needs to believe before typing an address. */
const TERMS = [
  {
    figure: "Free",
    title: "Free forever",
    body: "The five drawn places never pay. Not a free trial, not a discounted first month — free for as long as you stay in the group.",
  },
  {
    figure: `0${groupCoaching.freeSpots}`,
    title: "Drawn at random",
    body: "Not the first five to sign up. Everyone on the waitlist when the group opens has the same chance, so joining now and joining tonight are worth exactly the same.",
  },
  {
    figure: "Sept",
    title: "Opens end of September",
    body: `That's when the group starts and the draw happens. If you're not one of the five, it's ${groupCoaching.price}${groupCoaching.period} and you can walk away — nothing is owed for being on a list.`,
  },
] as const;

/**
 * What surrounds the plan, week to week. The plan itself isn't in here — it
 * leads the section in its own panel, because it's the core of the offer and a
 * fourth cell in a row of equals would read as one feature among several.
 */
const INCLUDED = [
  {
    index: "02",
    title: "A live group call, every week",
    body: "The whole group on a call, once a week — the week behind you and the week ahead. Questions get answered in front of everyone, because the answer to yours is usually the answer to someone else's.",
  },
  {
    index: "03",
    title: "Me on WhatsApp, directly",
    body: "The same number my 1:1 athletes text. A question about tomorrow's session on a Tuesday night doesn't have to sit until the next call.",
  },
  {
    index: "04",
    title: "A private channel for the group",
    body: "A space that's only the group — where the runs get posted and the questions get asked between calls. A lot of what makes a group work happens here rather than on the call.",
  },
] as const;

/**
 * How the groups are built. Expanded from the three points on the homepage
 * with the group size, and moved here out of the section above so the page
 * doesn't say "kept small" twice.
 */
const GROUP_POINTS = [
  [
    "Around five of you",
    "Small enough that I know what your week looks like, and that everyone in the group knows your name.",
  ],
  [
    "Matched on purpose",
    "Grouped with runners whose goals and constraints look like yours, so the conversation is actually about you.",
  ],
  [
    "Mixed on level",
    "Deliberately not all at the same standard. Close enough to relate to, far enough apart to pull each other along — and far enough that some weeks you're the one doing the pulling.",
  ],
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://jonathanfors.com${siteLinks.waitlist}#group-coaching`,
  name: "Group ultra-running coaching",
  serviceType: "Ultra-endurance running coaching",
  description:
    "Small-group ultra-running coaching, built around the athlete's whole life. Five places are free, drawn at random from the waitlist.",
  provider: {
    "@type": "Person",
    name: "Jonathan Fors",
    jobTitle: "Ultra-Endurance Running Coach",
    url: "https://jonathanfors.com",
  },
  areaServed: "Worldwide (remote)",
  offers: {
    "@type": "Offer",
    price: "50",
    priceCurrency: "EUR",
    availability: "https://schema.org/PreOrder",
    url: `https://jonathanfors.com${siteLinks.waitlist}`,
  },
};

export default function WaitlistPage() {
  return (
    <div className="club club-on-ink pt-16 sm:pt-[4.5rem] bg-ink text-snow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ---- Hero: the offer, then the field ------------------------- */}
        <section className="relative overflow-hidden">
          {/* Slash field, top-right — the logo mark blown up as texture. */}
          <div
            aria-hidden="true"
            className="club-slashes pointer-events-none absolute -right-16 -top-16 h-[50vw] max-h-[34rem] w-[55vw] max-w-[40rem] text-red/[0.13] [--bar:12px] [--gap:40px] sm:-right-28 sm:[--bar:20px] sm:[--gap:66px]"
          />

          <div className="relative mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 sm:py-14">
            <div className="flex items-center gap-3">
              <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
              <p className="club-label text-snow-dim">
                Waitlist · Opens {groupCoaching.launch}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                {/* The taped line carries its own leading: .club-tape draws the
                    red block to the inline box, and the display line-height of
                    0.84 leaves that box shorter than the glyphs, so the tops of
                    the caps fall outside the red — invisible, ink on ink. It
                    also can't wrap, so it's sized to hold one line at 320px. */}
                <h1 className="font-club text-[clamp(2.5rem,7vw,4.25rem)] text-snow">
                  <span className="block">
                    {groupCoaching.freeSpots} people get
                  </span>
                  <span className="mt-2.5 block text-[clamp(2.1rem,6.4vw,4rem)] leading-[1.2]">
                    <span className="club-tape">coached free.</span>
                  </span>
                  <span className="mt-2.5 block">Forever.</span>
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-relaxed text-snow-dim">
                  Group coaching opens at the {groupCoaching.launch}. Five
                  places are free — drawn at random from this waitlist, and free
                  for as long as those five athletes want them. Everyone else
                  pays {groupCoaching.price}
                  {groupCoaching.period}.
                </p>

                {/* Form, high and on the reading side. */}
                {/* data-waitlist-anchor: while this is on screen the sticky
                    bar stays down — it exists for the scroll past this point,
                    not to sit under a field the reader is already looking at. */}
                <div
                  data-waitlist-anchor
                  className="mt-7 max-w-xl border-2 border-snow/25 p-5 sm:p-6"
                >
                  <p className="club-label text-snow">Join the waitlist</p>
                  <SubscribeForm
                    action="Join"
                    utmMedium={subscribeSource.groupWaitlist}
                    waitlistDetails
                    location="waitlist-hero"
                    note="Your name, roughly where you're at, and an email — that's the whole signup. No payment details, no commitment — unsubscribe whenever you like."
                    successNote={`You're on the list. The draw happens when the group opens at the ${groupCoaching.launch} — I'll email you either way, and nothing before then.`}
                    className="mt-4"
                  />
                </div>
              </div>

              {/* The number, as the graphic. Hollow numeral, same treatment as
                  the section indexes on the homepage. */}
              <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
                <div className="border-2 border-red/40 p-6 sm:p-8">
                  <p
                    aria-hidden="true"
                    className="club-numeral club-hollow text-[clamp(5rem,17vw,11rem)] text-red-bright"
                    style={{ WebkitTextStrokeWidth: "clamp(2px, 0.4vw, 4px)" }}
                  >
                    0{groupCoaching.freeSpots}
                  </p>
                  <p className="club-label mt-4 text-[0.66rem] text-snow-dim">
                    Free places, drawn at random
                  </p>
                  <p className="mt-4 border-t border-snow/20 pt-4 text-sm leading-relaxed text-snow-dim">
                    Free means free. Those five never pay for group coaching,
                    for as long as they stay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- The terms, said plainly --------------------------------- */}
        <section className="club border-t-2 border-red bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="flex items-center gap-4">
              <span className="club-label shrink-0 text-ink">
                What you&apos;re joining
              </span>
              <span
                aria-hidden="true"
                className="club-slashes h-6 flex-1 text-red [--bar:5px] [--gap:13px]"
              />
            </Reveal>

            <dl className="mt-10 grid grid-cols-1 border-t-2 border-ink sm:grid-cols-3">
              {TERMS.map(({ figure, title: term, body }, i) => (
                <Reveal
                  key={term}
                  delay={i * 80}
                  className={`flex flex-col gap-3 py-8 sm:px-7 sm:first:pl-0 ${
                    i > 0
                      ? "border-t-2 border-ink/15 sm:border-l-2 sm:border-t-0"
                      : ""
                  }`}
                >
                  <dt className="club-numeral text-[2.75rem] leading-none text-red">
                    {figure}
                  </dt>
                  <dd>
                    <p className="font-club-upright text-lg text-ink">{term}</p>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">
                      {body}
                    </p>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- What the coaching actually is --------------------------- */}
        <section className="bg-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <h2 className="font-club text-club-md max-w-[24ch] text-snow">
                A few people training for the same kind of thing,{" "}
                <span className="text-red-bright">at the same time.</span>
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={60}>
              <p className="max-w-2xl text-lg leading-relaxed text-snow-dim">
                The same approach as my 1:1 work — training built around your
                job, your family and the week you actually have — with a few
                other runners doing it alongside you. Training for something
                long is a lot of solitary hours, and having other people inside
                the same week changes that.
              </p>
            </Reveal>

            {/* Who's coaching — a bordered callout rather than another
                paragraph. A reader deciding whether to hand over an email wants
                to see who's asking, and a face does that faster than prose. The
                faint snow fill lifts it off the black without introducing a
                fourth surface colour. */}
            <Reveal className="mt-12" delay={80}>
              <div className="club-cut-br border-2 border-snow/20 bg-snow/[0.04] p-5 sm:p-7">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                  {/* 3/4 at every width, so the crop is identical everywhere
                      and only the display size changes. The shot is a full
                      standing figure against sky and sea — it needs a real
                      column to read, not an avatar-sized square, and the
                      vertical position keeps both his head and his feet in. */}
                  <figure className="club-cut-br relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-night-2 sm:w-52 lg:w-60">
                    <Image
                      src="/images/coach-trail.jpg"
                      alt="Jonathan Fors standing on a coastal path above a beach, the Atlantic behind him."
                      fill
                      sizes="(min-width: 1024px) 15rem, (min-width: 640px) 13rem, 100vw"
                      className="object-cover object-[52%_50%]"
                    />
                  </figure>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <SlashMark className="h-3.5 w-[1rem] shrink-0 text-red" />
                      <p className="club-label text-[0.66rem] text-snow-dim">
                        Who&apos;s coaching
                      </p>
                    </div>

                    <p className="font-club-upright mt-3 text-2xl text-snow sm:text-3xl">
                      Jonathan Fors
                    </p>
                    <p className="club-label mt-2 text-[0.66rem] text-red-bright">
                      {facts.certification} · Ultra-endurance running coach
                    </p>

                    <p className="mt-5 leading-relaxed text-snow-dim">
                      I coach runners training for a first ultra, or a next
                      hundred-miler — most of them with jobs, families and not
                      enough hours in the week. In August 2026 I ran the
                      coastline of Portugal, {facts.ranKm} km in{" "}
                      {facts.ranDays} days, for {facts.cause}. Two years
                      earlier the same route stopped me at{" "}
                      {facts.previousKm} km, which is the more useful half of
                      the experience.
                    </p>

                    {/* The reason the places are free, given its own weight —
                        it's the line that makes the offer read as a real one
                        rather than a gimmick. */}
                    <p className="mt-5 border-l-2 border-red pl-4 leading-relaxed text-snow">
                      I&apos;m building this practice now, which is why five of
                      these places are free. I&apos;d rather fill the first
                      group with people who want to be in it than with people
                      who could afford it.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- How it works, week to week ----------------------------- */}
        <section className="club border-t-2 border-red bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="flex items-center gap-4">
              <span className="club-label shrink-0 text-ink">How it works</span>
              <span
                aria-hidden="true"
                className="club-slashes h-6 flex-1 text-red [--bar:5px] [--gap:13px]"
              />
            </Reveal>

            <Reveal className="mt-8" delay={60}>
              <h2 className="font-club text-club-md max-w-[22ch] text-ink">
                Written for you.{" "}
                <span className="text-red">Not for everyone.</span>
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={100}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
                The plan is the core of it — yours, written by me, changed when
                your life changes. The group is what gets you through the weeks
                it&apos;s hard.
              </p>
            </Reveal>

            {/* The plan, given its own panel above the row of three. It's the
                part of the offer people are actually buying, and a fourth cell
                in a row of equals would read as one feature among several. */}
            <Reveal className="mt-10" delay={140}>
              <div className="club-cut-br border-2 border-ink bg-ink/[0.03] p-5 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                  <p
                    aria-hidden="true"
                    className="club-numeral shrink-0 text-[2.75rem] leading-none text-red lg:text-[4rem]"
                  >
                    01
                  </p>
                  <div className="min-w-0">
                    <p className="font-club-upright text-xl text-ink sm:text-2xl">
                      A training plan, written for you
                    </p>
                    <p className="mt-3.5 max-w-2xl text-lg leading-relaxed text-ink-soft">
                      Every session in it is written by me, for you. Not
                      generated, not a template with your name typed into it,
                      not last year&apos;s plan for somebody else. And it gets
                      rewritten as you go — when your week changes, the plan
                      changes.
                    </p>
                    <p className="mt-5 max-w-2xl border-l-2 border-red pl-4 leading-relaxed text-ink">
                      And a video for every movement in it — each exercise your
                      plan names, filmed being done properly, so you&apos;re
                      never guessing at a name you haven&apos;t seen before.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <dl className="mt-10 grid grid-cols-1 border-t-2 border-ink sm:grid-cols-3">
              {INCLUDED.map(({ index, title: item, body }, i) => (
                <Reveal
                  key={item}
                  delay={i * 80}
                  className={`flex flex-col gap-3 py-8 sm:px-7 sm:first:pl-0 ${
                    i > 0
                      ? "border-t-2 border-ink/15 sm:border-l-2 sm:border-t-0"
                      : ""
                  }`}
                >
                  <dt className="club-numeral text-[2.75rem] leading-none text-red">
                    {index}
                  </dt>
                  <dd>
                    <p className="font-club-upright text-lg text-ink">{item}</p>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">
                      {body}
                    </p>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- Who's in the group with you ---------------------------- */}
        <section className="bg-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="flex items-center gap-4">
              <span className="club-label shrink-0 text-snow">
                Who you&apos;re in it with
              </span>
              <span
                aria-hidden="true"
                className="club-slashes h-6 flex-1 text-red [--bar:5px] [--gap:13px]"
              />
            </Reveal>

            <Reveal className="mt-8" delay={60}>
              <h2 className="font-club text-club-md max-w-[26ch] text-snow">
                Close enough to relate to.{" "}
                <span className="text-red-bright">
                  Far enough apart to pull you along.
                </span>
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={100}>
              <p className="max-w-2xl text-lg leading-relaxed text-snow-dim">
                Groups are built rather than filled. Around five runners, put
                together so the conversation is actually about you — alike
                enough in level and in life that you recognise each
                other&apos;s week, far enough apart that there&apos;s always
                someone a little further down the road.
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-snow/20">
              {GROUP_POINTS.map(([term, body], i) => (
                <Reveal
                  as="li"
                  key={term}
                  delay={i * 70}
                  className="flex flex-col gap-1.5 border-b border-snow/15 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="font-club-upright shrink-0 text-base text-snow sm:w-52">
                    {term}
                  </span>
                  <span className="text-snow-dim">{body}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- The field again, for anyone who read to the bottom ------ */}
        <section className="club border-t-2 border-red bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid grid-cols-1 items-center gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal>
                  {/* leading-[1.2], like the hero: .club-tape draws its red
                      block to the inline box, and the display line-height of
                      0.84 leaves that box shorter than the glyphs, so the caps
                      would poke out above the red. 1.15 is the threshold.
                      It has to sit on a child element: .font-club is unlayered
                      CSS, so on the same element it outranks a Tailwind
                      utility no matter the order. */}
                  <h2 className="font-club text-club-md max-w-[16ch] text-ink">
                    <span className="block leading-[1.2]">
                      Get in the <span className="club-tape">draw.</span>
                    </span>
                  </h2>
                </Reveal>
                <Reveal className="mt-5" delay={60}>
                  <p className="max-w-md leading-relaxed text-ink-soft">
                    Five free places, drawn when the group opens at the{" "}
                    {groupCoaching.launch}. Signing up early is no advantage —
                    it just puts you in the draw.
                  </p>
                </Reveal>
              </div>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
                {/* Anchor on the wrapper rather than on Reveal, whose props are
                    a closed type. Same job: the sticky bar stays down while
                    this form is on screen, so it never covers it. */}
                <div data-waitlist-anchor>
                  <SubscribeForm
                    action="Join the waitlist"
                    utmMedium={subscribeSource.groupWaitlist}
                    waitlistDetails
                    location="waitlist-footer"
                    tone="paper"
                    successNote={`You're on the list — I'll email you when the group opens at the ${groupCoaching.launch}.`}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <StickyWaitlistBar />

      {/* Footer — minimal. The 1:1 route is here rather than higher up: it's
          the answer for someone who doesn't want to wait, not a competing CTA. */}
      <footer className="border-t-2 border-snow/15 bg-ink">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 py-8 text-sm text-snow-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            Don&apos;t want to wait?{" "}
            <Link
              href="/#coaching-options"
              className="text-snow underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red-bright"
            >
              1:1 coaching is open now
            </Link>
            .
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteLinks.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-red-bright"
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-red-bright"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-5 pb-8 text-xs text-snow-dim/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} Jonathan Fors. All rights reserved. —{" "}
            {legal.company}, {legal.address}
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            {legalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="transition-colors hover:text-red-bright"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
