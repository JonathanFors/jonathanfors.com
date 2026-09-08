import Image from "next/image";
import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import { facts, record } from "@/lib/site";

/**
 * The running record — Jonathan as an accomplished runner, not just a coach.
 *
 * This used to be the Portugal band alone. Portugal is still here and still
 * ends on the failed first attempt, because a record that only lists wins
 * invites the reader to discount all of it. But the run is now the last of
 * three credentials rather than the whole case: ITRA and MDS say he races at a
 * level, Portugal says he can suffer at one.
 *
 * ⚠️ The ITRA and MDS claims are unsourced — see `record` in lib/site.ts.
 */
export default function ClubProofBand() {
  return (
    <section
      id="record"
      className="club club-on-ink relative scroll-mt-16 overflow-hidden bg-ink text-snow sm:scroll-mt-[4.5rem]"
      aria-label="Jonathan's running record"
    >
      <Image
        src="/images/run-coast.jpg"
        alt="Jonathan Fors running a coastal path with the Atlantic behind him."
        fill
        sizes="100vw"
        className="object-cover object-[42%_58%]"
      />
      {/* Scrim: heavy enough for text on the left, opens up to the photo right */}
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex items-center gap-3">
          <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red-bright" />
          <p className="club-label text-snow">The record</p>
        </Reveal>

        <Reveal className="mt-8">
          <h2 className="font-club text-club-lg max-w-[18ch] text-snow">
            I ask you to do it because{" "}
            <span className="text-red-bright">I&apos;ve done it.</span>
          </h2>
        </Reveal>

        {/* Record plates — the three credentials, largest type on the page
            after the headline. These are the claims, so they lead. */}
        <Reveal className="mt-12 sm:mt-14" delay={70}>
          <dl className="grid grid-cols-1 gap-px bg-snow/15 sm:grid-cols-3">
            {record.map(({ figure, label }) => (
              <div
                key={label}
                className="flex flex-col gap-2.5 bg-ink/85 px-6 py-8 backdrop-blur-sm"
              >
                <dt className="club-numeral text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-red-bright">
                  {figure}
                </dt>
                <dd className="club-label text-[0.66rem] leading-relaxed text-snow-dim">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Portugal, in full — the longest of the three, and the only one with
            a story attached. */}
        <Reveal className="mt-14 max-w-2xl sm:mt-16" delay={120}>
          <div className="flex items-center gap-3">
            <SlashMark className="h-3.5 w-[1rem] shrink-0 text-red-bright" />
            <p className="club-label text-snow">
              Project Portugal · {facts.ranDates}
            </p>
          </div>
          {/* No CountUp here. It animates from zero, so inside a sentence the
              first thing a reader sees is "49 km down the coastline" — the
              figure belongs in the plate above, where counting reads as a
              flourish rather than as the wrong number. */}
          <p className="mt-6 text-lg leading-relaxed text-snow-dim">
            The entire coastline of Portugal, in {facts.ranDays} days, for{" "}
            {facts.cause}, with Niki driving support. It was the second attempt.
            Two years earlier we set out on the same route and my immune system
            gave out at {facts.previousKm} km.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-snow-dim">
            The second one is the line on the page. The first one is the reason
            it&apos;s worth anything: I know what it is to do the work, do it
            properly, and still have to stop — and then to decide whether you go
            back.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
