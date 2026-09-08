import Image from "next/image";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import SubscribeForm from "@/components/club/SubscribeForm";
import { shuffleClub, subscribeSource } from "@/lib/site";
import { MailIcon } from "@/components/icons";

/**
 * The Shuffle Club newsletter block.
 *
 * The previous version opened on a 320px-wide Shuffle Club lockup and the
 * headline "Three editions a week" — which reads as a magazine, a podcast or a
 * club before it reads as an email. Two changes fix that: the word
 * **newsletter** is now in the eyebrow, the headline and the subscribe panel,
 * and the logo is reduced to a byline-sized mark beside it. Shuffle Club is a
 * sub-brand under Ultra Endurant, so it shouldn't out-shout the section it
 * sits in either.
 *
 * The subscriber count is real and rounded down — see `shuffleClub.subscribers`.
 */
export default function ClubNewsletter() {
  return (
    <section
      id="newsletter"
      className="club club-on-ink relative scroll-mt-16 overflow-hidden bg-ink text-snow sm:scroll-mt-[4.5rem]"
    >
      {/* Slash field, top-right */}
      <div
        aria-hidden="true"
        className="club-slashes pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[30rem] text-red/[0.1] [--bar:16px] [--gap:52px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex items-center gap-5">
          <span className="club-numeral club-hollow shrink-0 text-6xl text-snow sm:text-7xl">
            06
          </span>
          <span className="club-label shrink-0 text-snow">
            The free newsletter
          </span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 lg:mt-14 lg:grid-cols-12">
          {/* Left: the pitch */}
          <div className="lg:col-span-6 lg:col-start-1">
            {/* The lockup, byline-sized. It used to run at 320px and dominate
                the section; here it names the newsletter and gets out of the
                way. Dark-surface variant — red type kept, black slashes and
                "CLUB" recoloured to snow. */}
            <Reveal className="flex items-center gap-4">
              <Image
                src="/images/shuffle-club-light.png"
                alt="Shuffle Club"
                width={597}
                height={318}
                sizes="7rem"
                className="h-auto w-28 shrink-0"
              />
              <span className="club-label text-snow-dim">
                An email newsletter
              </span>
            </Reveal>

            <Reveal className="mt-8" delay={60}>
              <h2 className="font-club text-club-md max-w-[22ch] text-snow">
                Three emails a week.{" "}
                <span className="text-red-bright">Free forever.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-snow-dim">
                One subject a week, from three sides: what the research actually
                says, what I think about it after running on it, and whatever
                you send back. It lands in your inbox — no fee, nothing to buy
                at the end of it, and one click to leave.
              </p>
            </Reveal>

            {/* Subscriber count — the only social proof on the page that isn't
                about Jonathan's own running. */}
            <Reveal className="mt-8" delay={90}>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="club-numeral text-4xl text-red-bright sm:text-5xl">
                  {shuffleClub.subscribers}+
                </span>
                <span className="club-label text-[0.66rem] text-snow-dim">
                  Runners already reading
                </span>
              </p>
            </Reveal>

            {/* The week */}
            <Reveal className="mt-10" delay={110}>
              <ol className="border-t-2 border-snow/20">
                {shuffleClub.editions.map(([day, title, body]) => (
                  <li
                    key={day}
                    className="flex flex-col gap-1 border-b border-snow/15 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="club-label flex shrink-0 items-center gap-2.5 text-red-bright sm:w-40">
                      <SlashMark className="h-3.5 w-[1rem] shrink-0" />
                      {day}
                    </span>
                    <span className="font-club-upright shrink-0 text-base text-snow sm:w-44">
                      {title}
                    </span>
                    <span className="text-snow-dim">{body}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Right: the signup */}
          <Reveal
            className="lg:col-span-5 lg:col-start-8 lg:self-center"
            delay={90}
          >
            <div className="border-2 border-snow/25 p-7 sm:p-9">
              <p className="club-label flex items-center gap-3 text-snow">
                <MailIcon className="h-4 w-4 shrink-0 text-red-bright" />
                Get it by email
              </p>
              <p className="mt-4 text-snow-dim">
                Tuesdays, Fridays and Sundays. Unsubscribe whenever you like.
              </p>
              <SubscribeForm
                action="Subscribe"
                utmMedium={subscribeSource.newsletter}
                className="mt-7"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
