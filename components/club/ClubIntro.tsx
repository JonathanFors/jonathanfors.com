import Image from "next/image";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import { brand, facts } from "@/lib/site";

/**
 * The introduction — Jonathan in the first person, once, at length.
 *
 * This carries the `#approach` anchor the nav has always pointed at. It
 * replaces the old two-column "The approach" section, whose holistic-health
 * panel is now a hero key and whose "who this is for" list grew into its own
 * section. What's left is the part that only works in his own voice, so it's
 * set as one long statement with a byline rather than broken into panels —
 * the format is the point: a person talking, not a company describing itself.
 */
export default function ClubIntro() {
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
          <span className="club-label shrink-0 text-ink">Who you&apos;d work with</span>
          <span
            aria-hidden="true"
            className="club-slashes h-7 flex-1 text-red [--bar:5px] [--gap:13px]"
          />
        </Reveal>

        <div className="mt-10 sm:mt-12 lg:mx-auto lg:max-w-4xl">
          {/* The section needs a real heading, not just the index label: the
              nav's "Approach" link lands here, and a section whose only
              landmark is an eyebrow gives a screen-reader user nothing to
              arrive at. It compresses the thesis the paragraph then argues. */}
          <Reveal>
            <h2 className="font-club text-club-lg max-w-[18ch] text-ink">
              You&apos;re a person, not a{" "}
              <span className="club-tape">plan.</span>
            </h2>
          </Reveal>

          <Reveal className="mt-10 sm:mt-12">
            {/* Set larger than body copy and narrower than the grid — this is
                the one block on the page meant to be read straight through. */}
            <div className="text-[1.2rem] leading-[1.65] text-ink-soft sm:text-[1.35rem]">
              <p>
                <strong className="text-ink">
                  {brand.name} is run by me, {brand.coach}
                </strong>{" "}
                — a {facts.certification} coach with years of lived experience
                behind the certificate. There are plenty of coaches out there.
                Few of them see a person as a whole person with a life to live.
              </p>
              <p className="mt-6">
                Most plans start with the schedule and expect your life to bend
                around it. I start at the other end. Your work, your family, the
                worries you&apos;re already carrying — all of it changes how
                your body handles training, so all of it gets counted before a
                single session is written. Rest, and everything else off the
                road, is part of the work rather than a gap in it.
              </p>
              <p className="mt-6">
                I know what the other way costs. I&apos;ve run{" "}
                {facts.ranKm} km down the coast of Portugal, and I&apos;ve
                stopped at {facts.previousKm} km on the same route two years
                earlier because my body had had enough of being overruled. The
                second one is the line on the page. The first one is the reason
                any of this is worth listening to.
              </p>
              <p className="mt-6 text-ink">
                <strong>
                  A week you can repeat is worth more than a perfect week you
                  manage once.
                </strong>{" "}
                That&apos;s the whole method. Everything else is detail.
              </p>
            </div>
          </Reveal>

          {/* Byline — portrait, name, role. Deliberately at the end: it reads
              as a signature on a statement rather than a headshot beside a bio. */}
          <Reveal className="mt-12" delay={70}>
            <div className="flex items-center gap-5 border-t-2 border-ink pt-7">
              <Image
                src="/images/coach-portrait.jpg"
                alt="Jonathan Fors on a road in a running vest, hills behind him."
                width={72}
                height={72}
                sizes="72px"
                className="h-18 w-18 shrink-0 object-cover object-[50%_28%]"
              />
              <div>
                <p className="font-club-upright text-club-sm text-ink">
                  {brand.coach}
                </p>
                <p className="club-label mt-1.5 flex items-center gap-2.5 text-ink-faint">
                  <SlashMark className="h-3 w-[0.85rem] shrink-0 text-red" />
                  Coach · {brand.name}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
