import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import { siteLinks } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";

const STEPS = [
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
] as const;

/* Staircase indent — each row steps further right, like a fixture list. */
const INDENT = ["lg:pl-0", "lg:pl-10", "lg:pl-20", "lg:pl-30"] as const;

export default function ClubProcess() {
  return (
    <section
      id="coaching"
      className="club club-on-ink relative scroll-mt-16 overflow-hidden bg-ink text-snow sm:scroll-mt-[4.5rem]"
    >
      {/* Slash field, bottom-left */}
      <div
        aria-hidden="true"
        className="club-slashes pointer-events-none absolute -bottom-40 -left-32 h-[34rem] w-[34rem] text-snow/[0.045] [--bar:18px] [--gap:54px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex items-center gap-5">
          <span className="club-numeral club-hollow shrink-0 text-6xl text-snow sm:text-7xl">
            02
          </span>
          <span className="club-label shrink-0 text-snow">The program</span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <h2 className="font-club text-club-lg max-w-[20ch] text-snow">
            A plan built for your week — and{" "}
            <span className="text-red-bright">rebuilt</span> when it changes.
          </h2>
        </Reveal>

        {/* Team-sheet rows: red wipes up on hover, text flips to ink */}
        <ol className="mt-16 border-t-2 border-snow/20">
          {STEPS.map(([title, body], i) => (
            <Reveal
              key={title}
              as="li"
              delay={i * 60}
              className="border-b-2 border-snow/20"
            >
              <div
                className={`club-row group flex flex-col gap-4 px-4 py-8 transition-colors duration-300 sm:flex-row sm:items-baseline sm:gap-10 sm:px-6 sm:py-10 ${INDENT[i]}`}
              >
                <span className="club-numeral club-hollow shrink-0 text-5xl text-red-bright transition-colors duration-300 group-hover:text-ink sm:w-28 sm:text-6xl">
                  0{i + 1}
                </span>
                <h3 className="font-club-upright shrink-0 text-club-sm text-snow transition-colors duration-300 group-hover:text-ink sm:w-64">
                  {title}
                </h3>
                <p className="max-w-2xl leading-relaxed text-snow-dim transition-colors duration-300 group-hover:text-ink">
                  {body}
                </p>
                <SlashMark
                  className="hidden h-5 w-[1.4rem] shrink-0 text-snow/20 transition-all duration-300 group-hover:translate-x-2 group-hover:text-ink sm:ml-auto sm:block"
                />
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Callout — the one solid red block in the section.
            TODO:CONTENT — concrete deliverables, cadence and pricing are set
            per athlete and confirmed on the call (see PLACEHOLDERS.md). */}
        <Reveal className="mt-16">
          <div className="club-cut-br flex flex-col items-start justify-between gap-8 bg-red p-8 text-ink sm:flex-row sm:items-center sm:p-12">
            <div className="max-w-2xl">
              <h3 className="font-club text-club-md">
                Programs are tailored, not off-the-shelf.
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed">
                What that looks like — and what it costs — depends on you and
                your race. We map it out together on the call.
              </p>
            </div>
            <a
              href={siteLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="book-intro-call"
              data-cta-location="coaching"
              className="btn-club btn-club-ink club-label group inline-flex shrink-0 items-center gap-3 px-8 py-4"
            >
              <span className="inline-flex items-center gap-3">
                Book 1:1 call
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
