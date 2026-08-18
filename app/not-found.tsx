import type { Metadata } from "next";
import Link from "next/link";
import SlashMark from "@/components/SlashMark";
import Wordmark from "@/components/club/Wordmark";
import { ArrowIcon, InstagramIcon, MailIcon } from "@/components/icons";
import { siteLinks } from "@/lib/site";

/**
 * 404, in the club design language: black sheet, slash field, the hollow
 * numeral treatment the section indexes use — blown up to fill the page.
 *
 * Deliberately standalone rather than wrapped in ClubNav / ClubFooter. It has
 * to work from any URL, including ones the club page doesn't exist on, so the
 * nav's in-page anchors (#approach, #newsletter) would land on nothing. A
 * wordmark home link and two real destinations are the whole job here.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="club club-on-ink flex min-h-svh flex-col bg-ink text-snow">
      {/* Header bar — same proportions and red rule as the site nav */}
      <header className="flex h-16 shrink-0 items-stretch border-b-2 border-red sm:h-[4.5rem]">
        <Link
          href="/"
          aria-label="Jonathan Fors — homepage"
          className="flex shrink-0 items-center border-r-2 border-red/30 px-4 sm:px-6"
        >
          <Wordmark />
        </Link>
        <p className="club-label ml-auto flex items-center px-5 text-snow-dim sm:px-8">
          Error 404
        </p>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden">
        {/* Slash field, top-right — the logo mark blown up as texture. Sized in
            vw with a rem cap, like the hero: a fixed rem square is wider than a
            phone viewport and floods the page instead of sitting in the corner. */}
        <div
          aria-hidden="true"
          className="club-slashes pointer-events-none absolute -right-16 -top-20 h-[55vw] max-h-[36rem] w-[58vw] max-w-[40rem] text-red/[0.12] [--bar:12px] [--gap:40px] sm:-right-28 sm:[--bar:20px] sm:[--gap:66px]"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
          {/* The numeral is the graphic. Stroke width is set inline because
              -webkit-text-stroke has no utility class, and the class default
              (2px) reads as a hairline at this size. */}
          <p
            aria-hidden="true"
            className="club-numeral club-hollow text-[clamp(5.5rem,24vw,17rem)] text-red-bright"
            style={{ WebkitTextStrokeWidth: "clamp(2px, 0.55vw, 5px)" }}
          >
            404
          </p>

          <div className="mt-10 flex items-center gap-3 sm:mt-12">
            <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
            <p className="club-label text-snow-dim">Page not found</p>
          </div>

          {/* Red emphasis rather than the red tape: on an ink surface the tape
              puts black type on red, and .club-tape's box is shorter than the
              glyphs, so the overflow goes black-on-black and the letterforms
              lose their tops. The other ink sections (02, 04) emphasise with
              red-bright for the same reason. */}
          <h1 className="font-club text-club-lg mt-6 max-w-[18ch] text-snow">
            You&apos;ve run{" "}
            <span className="text-red-bright">off the map.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-snow-dim">
            This page isn&apos;t here — it may have moved, or the link that
            brought you may be wrong. Nothing&apos;s broken. Head back and start
            from the top.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="btn-club btn-club-red club-label group inline-flex items-center justify-center px-8 py-4"
            >
              <span className="inline-flex items-center gap-3">
                Back to the homepage
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <a
              href={siteLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="book-intro-call"
              data-cta-location="404"
              className="btn-club btn-club-outline-light club-label inline-flex items-center justify-center px-8 py-4"
            >
              <span>Book 1:1 call</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="shrink-0 border-t-2 border-snow/15">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-6 text-xs text-snow-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Jonathan Fors. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteLinks.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-red-bright"
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-red-bright"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
