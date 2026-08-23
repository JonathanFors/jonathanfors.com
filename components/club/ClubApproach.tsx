import Image from "next/image";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";

const WHO = [
  "Runners going from a first ultra up to a hundred-miler.",
  "People with real jobs, families, and not enough hours in the week.",
  "Anyone who has watched a training plan fall apart in month two.",
];

export default function ClubApproach() {
  return (
    <section
      id="approach"
      className="club relative scroll-mt-16 bg-paper sm:scroll-mt-[4.5rem]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        {/* Index row: hollow numeral, label, slash rule running to the edge */}
        <Reveal className="flex items-center gap-5">
          <span className="club-numeral club-hollow shrink-0 text-6xl text-ink sm:text-7xl">
            01
          </span>
          <span className="club-label shrink-0 text-ink">The approach</span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <h2 className="font-club text-club-lg max-w-[22ch] text-ink">
            Everything else first. The training comes{" "}
            <span className="club-tape">last.</span>
          </h2>
        </Reveal>

        {/* Broken grid: black manifesto panel + squad list on the left, a tall
            portrait on the right. col-start is explicit on both children —
            with only one positioned, auto-placement pushes the other past it
            into implicit columns. */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <Reveal className="club-on-ink">
              <div className="club-cut-br bg-ink p-8 text-snow sm:p-12 lg:py-14">
                <p className="club-label text-red-bright">Holistic health</p>
                <div className="prose prose-invert mt-6 text-lg">
                  <p>
                    Most plans start with the schedule and expect your life to
                    bend around it. I start at the other end. Your work, your
                    family, the worries you&apos;re already carrying — all of it
                    changes how your body handles training, so all of it gets
                    counted before a single session is written.
                  </p>
                  <p>
                    Rest, and everything else off the road, is part of the work
                    rather than a gap in it.{" "}
                    <strong>
                      A week you can repeat is worth more than a perfect week
                      you manage once.
                    </strong>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Who this is for — a squad list, hard-ruled */}
            <Reveal className="mt-12" delay={60}>
              <h3 className="club-label text-ink-faint">Who this is for</h3>
              <ul className="mt-5 border-t-2 border-ink">
                {WHO.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-5 border-b border-ink/15 py-5"
                  >
                    <span className="flex shrink-0 items-center gap-2.5">
                      <SlashMark className="h-3.5 w-[1rem] shrink-0 text-red" />
                      <span className="club-numeral text-lg text-ink">
                        0{i + 1}
                      </span>
                    </span>
                    <p className="text-ink-soft">{item}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-faint">
                And who it isn&apos;t for: if what you want is a plan file and
                no conversation, I&apos;m not your coach — there are cheaper
                ways to get one.
              </p>
            </Reveal>
          </div>

          <Reveal
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1"
            delay={90}
          >
            <figure className="club-cut-tl relative aspect-[4/3] overflow-hidden bg-paper-dim sm:aspect-[16/10] lg:aspect-[3/4]">
              <Image
                src="/images/coach-trail.jpg"
                alt="Jonathan Fors standing on a coastal path above a beach, the Atlantic behind him."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[52%_62%]"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
