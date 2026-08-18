import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SlashMark from "@/components/SlashMark";
import { facts } from "@/lib/site";

/**
 * Portugal as social proof, not a project — one full-bleed band instead of the
 * old pinned route section. The run is done; this is the credential.
 */
export default function ClubProofBand() {
  return (
    <section
      className="club club-on-ink relative overflow-hidden bg-ink text-snow"
      aria-label="Running the coast of Portugal"
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
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex items-center gap-3">
          <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red-bright" />
          <p className="club-label text-snow">Done, not planned</p>
        </Reveal>

        <Reveal className="mt-8">
          <h2 className="font-club text-club-lg max-w-[16ch] text-snow">
            I ran the coast of Portugal.
          </h2>
        </Reveal>

        <Reveal className="mt-8 max-w-xl" delay={70}>
          <p className="text-lg leading-relaxed text-snow-dim">
            Two years earlier the same route stopped me at {facts.previousKm} km.
            In {facts.ranDates} I went back and finished it — {facts.ranKm} km in{" "}
            {facts.ranDays} days, for {facts.cause}, with Niki driving support.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-snow-dim">
            That&apos;s the standard I coach from: not theory, but what actually
            holds up when the week falls apart.
          </p>
        </Reveal>

        {/* Result plates */}
        <Reveal className="mt-14" delay={120}>
          <dl className="grid grid-cols-2 gap-px bg-snow/15 sm:grid-cols-4">
            {[
              [<CountUp key="km" value={facts.ranKm} />, "Kilometres"],
              [facts.ranDays, "Days on the road"],
              [facts.previousKm, "Km, first attempt"],
              ["1–10 Aug", "2026"],
            ].map(([figure, label], i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 bg-ink/85 px-5 py-6 backdrop-blur-sm"
              >
                <dt className="club-numeral text-3xl text-snow sm:text-4xl">
                  {figure}
                </dt>
                <dd className="club-label text-[0.62rem] text-snow-dim">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
