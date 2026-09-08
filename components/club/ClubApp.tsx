import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import { aiStance, appFeatures, brand } from "@/lib/site";

/**
 * The Ultra Endurant App — where the coaching actually happens.
 *
 * Every athlete uses it, 1:1 and group alike, so this sits before the offers
 * rather than inside one of them: it's the shape of the work, not a perk of a
 * tier. There is no screenshot and no launch date here on purpose — nothing
 * about the app's build has been stated, so this describes what it does for an
 * athlete and stops there.
 *
 * The AI stance gets the one red block in the section. It's the only claim on
 * the page that's an argument rather than a feature, and burying it in the
 * list would sell it as a capability instead of the limit it is.
 */
export default function ClubApp() {
  return (
    <section
      id="app"
      className="club club-on-ink relative scroll-mt-16 overflow-hidden bg-ink text-snow sm:scroll-mt-[4.5rem]"
    >
      {/* Slash field, top-left */}
      <div
        aria-hidden="true"
        className="club-slashes pointer-events-none absolute -left-32 -top-32 h-[30rem] w-[34rem] text-snow/[0.045] [--bar:16px] [--gap:52px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex items-center gap-5">
          <span className="club-numeral club-hollow shrink-0 text-6xl text-snow sm:text-7xl">
            02
          </span>
          <span className="club-label shrink-0 text-snow">The app</span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <h2 className="font-club text-club-lg max-w-[20ch] text-snow">
            Everything in{" "}
            <span className="text-red-bright">one place.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-snow-dim">
            Every athlete I coach works through the {brand.app}. It&apos;s where
            the plan lives, where we talk, and where everything we&apos;ve
            already said stays findable.
          </p>
        </Reveal>

        {/* Feature grid. The gaps are the container's background showing
            through 1px seams, so an unfilled cell reads as a grey hole rather
            than as empty space — with five cards that happens on both the
            2-column and the 3-column layout. The last card spans the remainder
            instead, which fills the row at every breakpoint. */}
        <ul className="mt-14 grid grid-cols-1 gap-px bg-snow/15 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {appFeatures.map(([title, body], i) => (
            <Reveal
              key={title}
              as="li"
              delay={i * 50}
              className={`flex flex-col gap-3 bg-ink p-7 sm:p-8 ${
                i === appFeatures.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <SlashMark className="h-3.5 w-[1rem] shrink-0 text-red" />
                <h3 className="font-club-upright text-club-sm text-snow">
                  {title}
                </h3>
              </div>
              <p className="leading-relaxed text-snow-dim">{body}</p>
            </Reveal>
          ))}
        </ul>

        {/* The AI position — the one solid red block in the section */}
        <Reveal className="mt-12 sm:mt-14" delay={120}>
          <div className="club-cut-br bg-red p-8 text-ink sm:p-12">
            <p className="club-label">Where the AI stops</p>
            <h3 className="font-club text-club-md mt-5 max-w-[24ch]">
              {aiStance.heading}
            </h3>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed">
              {aiStance.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
