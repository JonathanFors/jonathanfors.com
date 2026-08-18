import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import SubscribeForm from "@/components/club/SubscribeForm";
import { ArrowIcon } from "@/components/icons";
import { groupCoaching, oneToOne, siteLinks, subscribeSource } from "@/lib/site";

const GROUP_POINTS = [
  [
    "Kept small",
    "Small enough that you're coached, not processed — and that everyone knows who you are.",
  ],
  [
    "Matched on purpose",
    "Runners whose goals and constraints look like yours, so the conversation stays relevant.",
  ],
  [
    "Mixed on level",
    "Close enough to relate, far enough apart to pull each other along.",
  ],
] as const;

/**
 * The two ways to work with Jonathan. Group leads — it's the lower-friction way
 * in — as the full-width black block; 1:1 sits under it as a slimmer premium
 * bar that books a call.
 */
export default function ClubOffers() {
  return (
    <section
      id="coaching-options"
      className="club relative scroll-mt-16 overflow-hidden bg-paper sm:scroll-mt-[4.5rem]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex items-center gap-5">
          <span className="club-numeral club-hollow shrink-0 text-6xl text-ink sm:text-7xl">
            03
          </span>
          <span className="club-label shrink-0 text-ink">
            Ways to work with me
          </span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <h2 className="font-club text-club-lg max-w-[18ch] text-ink">
            Start with a{" "}
            <span className="club-tape">small group.</span>
          </h2>
        </Reveal>

        {/* ---- GROUP — the headline offer ------------------------------ */}
        <Reveal className="club-on-ink mt-12 sm:mt-14" id="group">
          <div className="club-cut-br bg-ink text-snow">
            {/* Top bar */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-snow/20 px-6 py-5 sm:px-10 sm:py-6">
              <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
              <p className="club-label text-snow">Group coaching</p>
              <p className="club-label bg-red px-3 py-1.5 text-[0.6rem] text-ink">
                Coming soon
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-10 p-6 sm:p-10 lg:grid-cols-12">
              {/* Left: price + pitch */}
              <div className="lg:col-span-7 lg:col-start-1">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span className="club-numeral text-[clamp(3.5rem,8vw,6rem)] leading-none text-red-bright">
                    Free
                  </span>
                  <span className="club-label text-[0.7rem] text-snow-dim">
                    For the first {groupCoaching.freeSpots} athletes
                  </span>
                </div>
                <p className="club-label mt-4 text-[0.7rem] text-snow-dim">
                  Then {groupCoaching.price}
                  {groupCoaching.period}
                </p>

                <p className="mt-8 max-w-xl text-lg leading-relaxed text-snow-dim">
                  Same structure and the same holistic approach as the 1:1 work,
                  with people around you doing it at the same time. The easiest
                  way in — and for the first five, it costs nothing.
                </p>

                <ul className="mt-9 border-t border-snow/20">
                  {GROUP_POINTS.map(([title, body]) => (
                    <li
                      key={title}
                      className="flex flex-col gap-1.5 border-b border-snow/15 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="font-club-upright shrink-0 text-base text-snow sm:w-52">
                        {title}
                      </span>
                      <span className="text-snow-dim">{body}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: waitlist */}
              <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
                <div className="border-2 border-snow/25 p-6 sm:p-7">
                  <p className="club-numeral text-[clamp(3rem,7vw,5rem)] leading-none text-snow">
                    0{groupCoaching.freeSpots}
                  </p>
                  <p className="club-label mt-3 text-[0.66rem] text-snow-dim">
                    Free spots, first come
                  </p>

                  <div className="mt-6 border-t border-snow/20 pt-6">
                    <p className="club-label text-snow">Join the waitlist</p>
                    <p className="mt-3 text-sm leading-relaxed text-snow-dim">
                      The free spots go in the order people sign up.
                    </p>
                    <SubscribeForm
                      action="Notify me"
                      utmMedium={subscribeSource.groupWaitlist}
                      className="mt-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- 1:1 — the premium bar underneath ------------------------ */}
        <Reveal className="mt-6" delay={80}>
          <div className="flex flex-col gap-8 border-2 border-ink bg-paper p-6 sm:p-9 lg:flex-row lg:items-center lg:gap-12">
            <div className="lg:max-w-md">
              <div className="flex items-center gap-3">
                <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
                <p className="club-label text-ink">1:1 Coaching</p>
              </div>
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="club-numeral text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-ink">
                  {oneToOne.price}
                </span>
                <span className="club-numeral text-xl text-ink-faint">
                  {oneToOne.period}
                </span>
              </div>
              <p className="mt-5 leading-relaxed text-ink-soft">
                The premium option. We set goals that fit your life and the
                direction you want it to go, then work at them together — week by
                week, adjusting as things change. First ultra or hundredth.
              </p>
            </div>

            <ul className="grid flex-1 grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {oneToOne.includes.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <SlashMark className="h-3 w-[0.85rem] shrink-0 translate-y-0.5 text-red" />
                  <span className="text-sm text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>

            <div className="shrink-0 lg:self-center">
              <a
                href={siteLinks.booking}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="book-intro-call"
                data-cta-location="one-to-one"
                className="btn-club btn-club-outline-dark club-label group inline-flex items-center justify-center px-8 py-4"
              >
                <span className="inline-flex items-center gap-3">
                  Book a 1:1 call
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <p className="club-label mt-3 text-center text-[0.6rem] text-ink-faint">
                Free · 30 minutes
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
