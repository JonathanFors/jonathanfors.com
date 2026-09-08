import type { Metadata } from "next";
import SlashMark from "@/components/SlashMark";
import VideoLibrary, { type Filter } from "@/components/videos/VideoLibrary";
import {
  CATEGORIES,
  libraryHasUnfilmed,
  videos,
  type CategoryId,
} from "@/lib/videos";

export const metadata: Metadata = {
  title: "Training videos",
  description:
    "Strength work, core, mobility drills and stretches — one clip per movement, for the athletes I coach.",
  alternates: { canonical: "/videos" },
  // While anything in the library is still unfilmed, keep the whole hub out of
  // search. Filling in every `source` in lib/videos.ts lifts this on its own —
  // see libraryHasUnfilmed.
  robots: libraryHasUnfilmed
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

/**
 * The training video hub. Dark surface throughout: the page is mostly 16:9
 * stills and players, and they sit better on black than on paper.
 *
 * The grid is server-rendered from lib/videos.ts, already narrowed to whatever
 * ?q= and ?category= asked for, so a filtered link is correct in the HTML and
 * the page works with JavaScript off. VideoLibrary takes over from there.
 */
export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[] }>;
}) {
  const params = await searchParams;

  // Query params are arbitrary input: take the first value if a key is
  // repeated, and ignore a category that isn't one of ours rather than
  // rendering an empty grid for a typo'd or stale link.
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const rawCategory = first(params.category);
  const initialCategory: Filter = CATEGORIES.some((c) => c.id === rawCategory)
    ? (rawCategory as CategoryId)
    : "all";
  const initialQuery = (first(params.q) ?? "").slice(0, 100);

  return (
    <div className="club club-on-ink min-h-svh bg-ink pt-16 text-snow sm:pt-[4.5rem]">
      {/* pt above reserves the fixed site nav's height. The library used to
          carry a bar of its own because ClubNav's links were homepage-only
          anchors; they're absolute now, so the shared nav works here too. */}

      {/* ---- Title block ------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-snow/10">
        <span
          aria-hidden="true"
          className="club-slashes pointer-events-none absolute -right-10 -top-16 h-[40vw] max-h-[22rem] w-[45vw] max-w-[30rem] text-red/[0.10] [--bar:10px] [--gap:34px] sm:-right-20 sm:[--bar:16px] sm:[--gap:54px]"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex items-center gap-3">
            <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
            <p className="club-label text-snow-dim">For my athletes</p>
          </div>

          <h1 className="font-club text-club-lg mt-6 max-w-[20ch] text-snow">
            The video <span className="text-red-bright">library.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-snow-dim">
            One movement per clip — strength work, core, mobility drills and
            stretches. Not whole sessions: these are the exercises your plan
            names, so you can see one done properly before you do it. Search it,
            or filter by what you&apos;re looking for.
          </p>

          {libraryHasUnfilmed ? (
            <div className="mt-8 max-w-xl border-l-2 border-red bg-night-2 px-5 py-4">
              <p className="club-label text-red-bright">Not filmed yet</p>
              <p className="mt-2 text-sm leading-relaxed text-snow-dim">
                The {videos.length}{" "}
                movements below are the list — none of them are filmed yet, so
                every card is still empty. This page stays hidden from search
                until they are.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <VideoLibrary
        initialQuery={initialQuery}
        initialCategory={initialCategory}
      />
    </div>
  );
}
