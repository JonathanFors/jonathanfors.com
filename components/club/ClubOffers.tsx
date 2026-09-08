import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import SubscribeForm from "@/components/club/SubscribeForm";
import { ArrowIcon } from "@/components/icons";
import { groupCoaching, oneToOne, siteLinks, subscribeSource } from "@/lib/site";

const GROUP_POINTS = [
  "Kept small — around 5 athletes",
  "Matched on goals and constraints",
  "Mixed on level, on purpose",
] as const;

/**
 * The two ways to work with Jonathan.
 *
 * **1:1 leads.** It used to be the other way round — group was the full-width
 * black block and 1:1 a slim bar under it — on the reasoning that group is the
 * lower-friction way in. That undersold the thing that's actually open and
 * actually pays: group hasn't launched, and a visitor ready to start today was
 * being shown a waitlist first. So 1:1 takes the ink block and the size, and
 * group sits beside it as the alternative for people who aren't ready.
 *
 * The waitlist form stays inline here rather than becoming a link. This block
 * and `/waitlist` are the two entry points to the same beehiiv segment, told
 * apart in analytics by route, and the draw is run off that segment.
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
            05
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
            Two ways to work <span className="club-tape">together.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 sm:mt-14 lg:grid-cols-12">
          {/* ---- 1:1 — the primary offer ------------------------------ */}
          <Reveal className="club-on-ink lg:col-span-7 lg:col-start-1">
            <div className="club-cut-br bg-ink text-snow">
              {/* Top bar — red, so this block reads as the recommended one */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 bg-red px-6 py-4 text-ink sm:px-10">
                <SlashMark className="h-4 w-[1.1rem] shrink-0" />
                <p className="club-label">1:1 Coaching</p>
                <p className="club-label ml-auto text-[0.6rem]">Open now</p>
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span className="club-numeral text-[clamp(3.5rem,8vw,6rem)] leading-none text-snow">
                    {oneToOne.price}
                  </span>
                  <span className="club-numeral text-2xl text-snow-dim">
                    {oneToOne.period}
                  </span>
                  <span className="club-label ml-2 text-[0.66rem] text-snow-dim">
                    No minimum period
                  </span>
                </div>

                <p className="mt-8 max-w-xl text-lg leading-relaxed text-snow-dim">
                  We set the goals together — ones that fit your life and the
                  direction you want it to go — then work at them week by week.
                  A call every week, and me on WhatsApp in between for the days
                  that don&apos;t go to plan. First ultra or hundredth.
                </p>

                <ul className="mt-9 border-t border-snow/20">
                  {oneToOne.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3.5 border-b border-snow/15 py-3.5"
                    >
                      <SlashMark className="h-3 w-[0.85rem] shrink-0 translate-y-0.5 text-red-bright" />
                      <span className="text-snow-dim">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <a
                    href={siteLinks.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="book-intro-call"
                    data-cta-location="one-to-one"
                    className="btn-club btn-club-red club-label group inline-flex w-full items-center justify-center gap-3 px-8 py-4 sm:w-auto"
                  >
                    <span className="inline-flex items-center gap-3">
                      Start 1:1 coaching
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                  <p className="club-label mt-3 text-[0.6rem] text-snow-dim">
                    Starts with a free 30-minute call
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- Group — the alternative ------------------------------ */}
          <Reveal
            className="lg:col-span-5 lg:col-start-8"
            delay={80}
            id="group"
          >
            <div className="border-2 border-ink bg-paper">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b-2 border-ink px-6 py-4">
                <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
                <p className="club-label text-ink">Group coaching</p>
                <p className="club-label ml-auto text-[0.6rem] text-ink-faint">
                  {groupCoaching.launch}
                </p>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="club-numeral text-[clamp(2.25rem,4.5vw,3rem)] leading-none text-ink">
                    {groupCoaching.price}
                  </span>
                  <span className="club-numeral text-xl text-ink-faint">
                    {groupCoaching.period}
                  </span>
                </div>
                {/* "Free … then €50/mo" reads as a trial. The €50 names who
                    pays — everyone else — never when. */}
                <p className="mt-3 leading-relaxed text-ink-soft">
                  <strong className="text-ink">
                    Free forever for {groupCoaching.freeSpots} athletes
                  </strong>
                  , drawn at random from the waitlist when the group opens.
                  Signing up early is no advantage — it just puts you in the
                  draw.
                </p>

                <ul className="mt-6 border-t border-ink/15">
                  {GROUP_POINTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-ink/15 py-3"
                    >
                      <SlashMark className="h-3 w-[0.85rem] shrink-0 translate-y-0.5 text-red" />
                      <span className="text-sm text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <p className="club-label text-ink">Join the waitlist</p>
                  <SubscribeForm
                    action="Notify me"
                    utmMedium={subscribeSource.groupWaitlist}
                    waitlistDetails
                    className="mt-5"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Said plainly rather than left for the reader to notice: the practice
            is new and there are no testimonials to show yet. */}
        <Reveal className="mt-10" delay={120}>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-faint">
            Worth saying plainly: I certified in 2026 and I&apos;m building this
            practice now, so there are no testimonials on this page. I&apos;d
            rather show you the running I&apos;ve actually done and let you
            judge the coaching on a conversation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
