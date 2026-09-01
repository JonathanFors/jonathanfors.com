import type { Metadata } from "next";
import Link from "next/link";
import SlashMark from "@/components/SlashMark";
import { ArrowIcon, InstagramIcon, MailIcon } from "@/components/icons";
import { legalPages, siteLinks } from "@/lib/site";

/**
 * 404, in the club design language: black sheet, slash field, the hollow
 * numeral treatment the section indexes use — blown up to fill the page.
 *
 * It carries the site nav (from the root layout) — which is exactly what this
 * page used to fake with a wordmark bar of its own. The nav's section links are
 * absolute ("/#approach"), so they lead home from a URL that doesn't exist
 * rather than landing on nothing. ClubFooter is still deliberately not here:
 * the one-line footer keeps the page a single black sheet.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="club club-on-ink flex min-h-svh flex-col bg-ink text-snow">
      {/* Padding, not a spacer element: the sheet is min-h-svh, so reserving
          the fixed nav's height on <main> keeps the total exactly one viewport
          instead of one viewport plus a nav. */}
      <main className="relative flex flex-1 items-center overflow-hidden pt-16 sm:pt-[4.5rem]">
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
              <span>Book a free call</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="shrink-0 border-t-2 border-snow/15">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-6 text-xs text-snow-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              © {new Date().getFullYear()} Jonathan Fors. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex items-center gap-4">
              {legalPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="transition-colors hover:text-red-bright"
                >
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>
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
