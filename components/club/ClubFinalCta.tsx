import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import { ArrowIcon } from "@/components/icons";
import { facts, siteLinks } from "@/lib/site";

export default function ClubFinalCta() {
  return (
    <section className="club relative overflow-hidden bg-red text-ink">
      {/* Slash field in black, low opacity — the tape texture at full bleed */}
      <div
        aria-hidden="true"
        className="club-slashes pointer-events-none absolute inset-0 text-ink/[0.07] [--bar:26px] [--gap:80px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex items-center gap-3">
          <SlashMark className="h-4 w-[1.1rem] shrink-0 text-ink" />
          <p className="club-label">{facts.certification}</p>
        </Reveal>

        <Reveal className="mt-8">
          <h2 className="font-club text-club-xl max-w-[14ch]">
            Let&apos;s find your distance.
          </h2>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" delay={70}>
          <p className="max-w-lg text-lg leading-relaxed">
            Start with a free intro call. If it&apos;s a fit, we build from
            there. If it&apos;s not, you&apos;ll still leave with a clearer idea
            of your next step.
          </p>
          <a
            href={siteLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="book-intro-call"
            data-cta-location="final"
            className="btn-club btn-club-ink club-label group inline-flex shrink-0 items-center justify-center px-10 py-5"
          >
            <span className="inline-flex items-center gap-3">
              Book a free 1:1 call
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
