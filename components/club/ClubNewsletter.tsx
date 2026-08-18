import Image from "next/image";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import SubscribeForm from "@/components/club/SubscribeForm";
import { shuffleClub, subscribeSource } from "@/lib/site";

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
            04
          </span>
          <span className="club-label shrink-0 text-snow">The newsletter</span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 lg:mt-14 lg:grid-cols-12">
          {/* Left: the pitch */}
          <div className="lg:col-span-6 lg:col-start-1">
            {/* Dark-surface variant of the Shuffle Club lockup — red type kept,
                the black slashes and "CLUB" recoloured to snow. */}
            <Reveal>
              <Image
                src="/images/shuffle-club-light.png"
                alt="Shuffle Club"
                width={597}
                height={318}
                sizes="(min-width: 640px) 20rem, 15rem"
                className="h-auto w-60 sm:w-80"
              />
            </Reveal>

            <Reveal className="mt-9" delay={60}>
              <h2 className="font-club text-club-md max-w-[20ch] text-snow">
                Three editions a week.{" "}
                <span className="text-red-bright">Free forever.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-snow-dim">
                Every week takes one subject and works it from three sides — the
                research, my own read on it from the road, and whatever you ask.
                No fee, no upsell, no plans to change that.
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
              <p className="club-label text-snow">Subscribe</p>
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
