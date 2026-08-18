import Reveal from "@/components/Reveal";
import SlashMark from "@/components/SlashMark";
import { ArrowIcon, InstagramIcon } from "@/components/icons";
import { facts, siteLinks } from "@/lib/site";

/**
 * Slim social-proof strip — a light beat between the Portugal band and the
 * programme section. The whole row is the link; red wipes up on hover.
 */
export default function ClubInstagram() {
  return (
    <section className="club bg-paper" aria-label="Follow along on Instagram">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <a
            href={siteLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="instagram"
            data-cta-location="social-proof"
            className="club-row group flex flex-col gap-6 border-y-2 border-ink px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-6 sm:py-9"
          >
            <span className="flex items-center gap-3.5">
              <InstagramIcon className="h-6 w-6 shrink-0 text-red transition-colors duration-300 group-hover:text-ink" />
              <span className="club-label text-ink">As seen on Instagram</span>
            </span>

            <span className="flex items-baseline gap-3">
              <span className="club-numeral text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-ink">
                {facts.instagramFollowers}
              </span>
              <span className="club-label text-[0.68rem] text-ink-faint transition-colors duration-300 group-hover:text-ink">
                Followers
              </span>
            </span>

            <span className="flex items-center gap-3.5">
              <SlashMark className="hidden h-4 w-[1.1rem] shrink-0 text-red transition-colors duration-300 group-hover:text-ink sm:block" />
              <span className="font-club-upright text-club-sm text-ink">
                {facts.instagramHandle}
              </span>
              <ArrowIcon className="h-5 w-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
