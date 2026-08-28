import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import SubscribeForm from "@/components/club/SubscribeForm";
import { InstagramIcon, MailIcon } from "@/components/icons";
import { facts, shuffleClub, siteLinks, subscribeSource } from "@/lib/site";

/**
 * Shuffle Club — a standalone landing page for one action: getting an email
 * address onto the newsletter list. Same reasoning as /waitlist: this is the
 * link for a bio, a post, or the foot of an edition, where the homepage would
 * bury the signup under three other sections.
 *
 * Coaching still isn't sold here. The page carries the site nav (from the root
 * layout) but no coaching CTA of its own, and the footer stays one line rather
 * than the full ClubFooter — the newsletter is free, so a €200/mo offer at the
 * foot of it would only interrupt.
 *
 * The form posts `utm_medium: newsletter`, the same value as the homepage
 * block, so both entry points land on one beehiiv segment; the two are told
 * apart by `data-cta-location` and in Vercel Analytics by route.
 */

const title = "Shuffle Club — the newsletter";
const shareImage = "/images/hero-coast-road.jpg";
const shareImageAlt =
  "A runner on a winding coastal road above the Atlantic in Portugal.";
const description =
  "Three editions a week from an ultra-endurance coach, free forever. Tuesday the science, Friday my take on it, Sunday your questions — one subject a week, from three sides. One email to subscribe.";

export const metadata: Metadata = {
  title,
  description,
  // Set explicitly: the root layout's canonical is "/" and would otherwise be
  // inherited, pointing this page at the homepage.
  alternates: { canonical: siteLinks.newsletter },
  // Next replaces `openGraph` / `twitter` wholesale rather than merging into
  // the root layout's, so the share image has to be repeated here — without it
  // a link pasted into Instagram or WhatsApp previews with no picture at all.
  openGraph: {
    title: `${title} — Jonathan Fors`,
    description,
    url: `https://jonathanfors.com${siteLinks.newsletter}`,
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

/**
 * The week, expanded from the three lines on the homepage. Same slots, same
 * order — a dedicated page has room to say what each edition actually does.
 */
const WEEK = [
  {
    day: "Tuesday",
    title: "The science",
    body: "One idea from the research, explained properly — the mechanism, not just the takeaway. Grounded in the coaching course material rather than whatever crossed my feed that week.",
  },
  {
    day: "Friday",
    title: "My take",
    body: "The same subject from the road: what I actually do about it, and why. Marked as opinion, so you always know which half you're reading.",
  },
  {
    day: "Sunday",
    title: "Your questions",
    body: "A real question from a subscriber, answered in full. Reply to any edition and yours goes in the pile.",
  },
] as const;

/** The three things worth knowing before typing an address in. */
const TERMS = [
  {
    figure: "Free",
    title: "Free forever",
    body: "No paid tier, no course at the end of it, nothing held back for people who pay. The newsletter is the whole thing.",
  },
  {
    figure: "03",
    title: "Three a week, not three a year",
    body: "Tuesday, Friday and Sunday. Each one is a few minutes on a phone — short enough to actually read, long enough to be worth reading.",
  },
  {
    figure: "01",
    title: "One subject a week",
    body: "All three editions take the same theme from a different side, so a week adds up to something instead of arriving as three unrelated tips.",
  },
] as const;

export default function NewsletterPage() {
  return (
    <div className="club club-on-ink pt-16 sm:pt-[4.5rem] bg-ink text-snow">

      <main>
        {/* ---- Hero: what it is, then the field ------------------------ */}
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
                {shuffleClub.name} · Tuesdays, Fridays, Sundays
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                {/* Dark-surface variant of the Shuffle Club lockup — red type,
                    with the slashes and "CLUB" in off-white. */}
                <Reveal>
                  <Image
                    src="/images/shuffle-club-light.png"
                    alt={shuffleClub.name}
                    width={597}
                    height={318}
                    sizes="(min-width: 640px) 20rem, 15rem"
                    className="h-auto w-56 sm:w-72"
                    priority
                  />
                </Reveal>

                {/* The taped line carries its own leading: .club-tape draws the
                    red block to the inline box, and the display line-height of
                    0.84 leaves that box shorter than the glyphs, so the tops of
                    the caps fall outside the red — invisible, ink on ink. It
                    also can't wrap, so it's sized to hold one line at 320px. */}
                <h1 className="mt-8 font-club text-[clamp(2.5rem,7vw,4.25rem)] text-snow">
                  <span className="block">Three editions a week.</span>
                  <span className="mt-2.5 block text-[clamp(2.3rem,6.6vw,4rem)] leading-[1.2]">
                    <span className="club-tape">Free forever.</span>
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-relaxed text-snow-dim">
                  One subject a week, from three sides: what the research
                  actually says, what I think about it after running on it, and
                  whatever you send back. No fee, and nothing to buy at the end
                  of it.
                </p>

                {/* Form, high and on the reading side — the first interactive
                    thing on the page. */}
                <div className="mt-7 max-w-xl border-2 border-snow/25 p-5 sm:p-6">
                  <p className="club-label text-snow">Subscribe</p>
                  <SubscribeForm
                    action="Subscribe"
                    utmMedium={subscribeSource.newsletter}
                    location="newsletter-hero"
                    note="One field, and that's the whole signup. Unsubscribe whenever you like — there's a link at the foot of every edition."
                    successNote="You're in. The next edition lands on Tuesday, Friday or Sunday, whichever comes first."
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
                    03
                  </p>
                  <p className="club-label mt-4 text-[0.66rem] text-snow-dim">
                    Editions every week
                  </p>
                  <p className="mt-4 border-t border-snow/20 pt-4 text-sm leading-relaxed text-snow-dim">
                    Free means free. No paid tier, and nothing sold at the end
                    of an edition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- The week ------------------------------------------------ */}
        <section className="club border-t-2 border-red bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="flex items-center gap-4">
              <span className="club-label shrink-0 text-ink">Your week</span>
              <span
                aria-hidden="true"
                className="club-slashes h-6 flex-1 text-red [--bar:5px] [--gap:13px]"
              />
            </Reveal>

            <Reveal className="mt-8" delay={60}>
              <h2 className="font-club text-club-md max-w-[22ch] text-ink">
                The same subject, <span className="text-red">three times.</span>
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={100}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
                Knees one week, heat the next. Tuesday explains it, Friday
                argues with it, Sunday answers what you asked about it.
              </p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-1 border-t-2 border-ink sm:grid-cols-3">
              {WEEK.map(({ day, title: slot, body }, i) => (
                <Reveal
                  key={day}
                  delay={i * 80}
                  className={`flex flex-col gap-3 py-8 sm:px-7 sm:first:pl-0 ${
                    i > 0
                      ? "border-t-2 border-ink/15 sm:border-l-2 sm:border-t-0"
                      : ""
                  }`}
                >
                  <dt className="club-label flex items-center gap-2.5 text-red">
                    <SlashMark className="h-3.5 w-[1rem] shrink-0" />
                    {day}
                  </dt>
                  <dd>
                    <p className="font-club-upright text-lg text-ink">{slot}</p>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">
                      {body}
                    </p>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- Where it comes from, and who writes it ------------------ */}
        <section className="bg-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <h2 className="font-club text-club-md max-w-[24ch] text-snow">
                Written by a coach.{" "}
                <span className="text-red-bright">Not by a feed.</span>
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={60}>
              <p className="max-w-2xl text-lg leading-relaxed text-snow-dim">
                Tuesday&apos;s science comes out of the coaching course material
                I certified on, with the studies behind it named. Friday is my
                own opinion and it says so — you shouldn&apos;t have to guess
                which of the two you&apos;re reading. Every term gets explained
                the first time it turns up, because a newsletter you have to
                look things up to follow isn&apos;t worth the three minutes.
              </p>
            </Reveal>

            {/* Who's writing it — a bordered callout rather than another
                paragraph. A reader deciding whether to hand over an email
                wants to see who's asking, and a face does that faster than
                prose. */}
            <Reveal className="mt-12" delay={80}>
              <div className="club-cut-br border-2 border-snow/20 bg-snow/[0.04] p-5 sm:p-7">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                  {/* 3/4 at every width, so the crop is identical everywhere
                      and only the display size changes. */}
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
                        Who&apos;s writing it
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
                      earlier the same route stopped me at {facts.previousKm}{" "}
                      km, which is the more useful half of the experience — and
                      a fair amount of what ends up in here.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- The terms, said plainly, then the field again ----------- */}
        <section className="club border-t-2 border-red bg-paper text-ink">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="flex items-center gap-4">
              <span className="club-label shrink-0 text-ink">
                What you&apos;re signing up for
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

            <div className="mt-14 grid grid-cols-1 items-center gap-x-12 gap-y-8 lg:grid-cols-12">
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
                      Start on <span className="club-tape">Tuesday.</span>
                    </span>
                  </h2>
                </Reveal>
                <Reveal className="mt-5" delay={60}>
                  <p className="max-w-md leading-relaxed text-ink-soft">
                    One email address is the whole signup. If it turns out not
                    to be for you, the unsubscribe link is at the foot of every
                    edition and I won&apos;t hold it against you.
                  </p>
                </Reveal>
              </div>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
                <SubscribeForm
                  action="Subscribe"
                  utmMedium={subscribeSource.newsletter}
                  location="newsletter-footer"
                  tone="paper"
                  successNote="You're in. The next edition lands on Tuesday, Friday or Sunday, whichever comes first."
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — minimal, and deliberately without a coaching CTA. There is
          one action on this page. */}
      <footer className="border-t-2 border-snow/15 bg-ink">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 py-8 text-sm text-snow-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            {shuffleClub.name} — the newsletter from{" "}
            <Link
              href="/"
              className="text-snow underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red-bright"
            >
              jonathanfors.com
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
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-8 text-xs text-snow-dim/70 sm:px-8">
          <p>© {new Date().getFullYear()} Jonathan Fors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
