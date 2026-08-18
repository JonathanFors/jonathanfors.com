import Image from "next/image";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";

const WHO = [
  "Runners going from a first ultra up to a hundred-miler.",
  "Ambitious adults with real jobs, families, and not enough hours.",
  "People who distrust hype and want a coach who does the work.",
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
            Training fits around{" "}
            <span className="club-tape">your life.</span> Not the other way
            around.
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
                    Most training plans assume your life will bend to the
                    schedule. Mine assumes the opposite. We start with your
                    work, your family, and the stress you&apos;re already
                    carrying — then build the training to fit inside it.
                  </p>
                  <p>
                    The whole athlete comes first.{" "}
                    <strong>
                      Consistency you can actually sustain beats a perfect week
                      you can only manage once.
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
