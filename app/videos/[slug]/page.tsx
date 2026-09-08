import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SlashMark from "@/components/SlashMark";
import { ArrowIcon } from "@/components/icons";
import VideoCard from "@/components/videos/VideoCard";
import VideoEmbed from "@/components/videos/VideoEmbed";
import {
  categoryLabel,
  getVideo,
  isUnfilmed,
  libraryHasUnfilmed,
  videos,
} from "@/lib/videos";

type Params = { slug: string };

/** Every video gets a static page at build time — nothing renders on demand. */
export function generateStaticParams(): Params[] {
  return videos.map((v) => ({ slug: v.slug }));
}

/** Anything not in lib/videos.ts is a 404, not an empty page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) return {};

  const unfinished = isUnfilmed(video) || libraryHasUnfilmed;

  return {
    title: video.title,
    description: video.blurb,
    // Overrides the root layout's canonical, which otherwise points every page
    // at the homepage.
    alternates: { canonical: `/videos/${video.slug}` },
    robots: unfinished
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: video.title,
      description: video.blurb,
      url: `/videos/${video.slug}`,
      type: "video.other",
    },
  };
}

/**
 * One video, on its own URL — /videos/<slug> — which is the link Jonathan sends
 * an athlete. A real route rather than a query param or a modal, so the link
 * survives being pasted anywhere, carries its own title when shared, and lands
 * on the video itself instead of a grid the athlete has to search.
 */
export default async function VideoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  // Same category first, then anything else — enough to keep browsing without
  // going back to the hub, and it degrades sensibly in a one-category library.
  const related = videos
    .filter((v) => v.slug !== video.slug)
    .sort((a, b) => {
      const rank = (v: typeof a) => (v.category === video.category ? 0 : 1);
      return rank(a) - rank(b);
    })
    .slice(0, 3);

  return (
    <div className="club club-on-ink min-h-svh bg-ink pt-16 text-snow sm:pt-[4.5rem]">
      {/* pt above reserves the fixed site nav's height. The library used to
          carry a bar of its own because ClubNav's links were homepage-only
          anchors; they're absolute now, so the shared nav works here too. */}

      <main className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12">
        <Link
          href={`/videos?category=${video.category}`}
          className="club-label inline-flex items-center gap-2.5 text-snow-dim transition-colors hover:text-red-bright"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          All {categoryLabel(video.category).toLowerCase()} videos
        </Link>

        {/* Player. Capped so the title stays in view on a wide screen — a
            full-width 16:9 on a 1400px canvas is 787px tall and pushes
            everything below the fold. */}
        <div className="mt-6 max-w-[1000px]">
          <VideoEmbed video={video} />
        </div>

        <div className="mt-8 max-w-[1000px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="club-label text-red-bright">
              {categoryLabel(video.category)}
            </span>
            {video.duration ? (
              <span className="club-label text-snow-dim">
                {video.duration}
              </span>
            ) : null}
            {isUnfilmed(video) ? (
              <span className="club-label border border-snow/30 px-2 py-0.5 text-[0.6rem] text-snow-dim">
                Not filmed yet
              </span>
            ) : null}
          </div>

          <h1 className="font-club text-club-md mt-4 max-w-[24ch] text-snow">
            {video.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-snow-dim">
            {video.blurb}
          </p>

          {video.equipment ? (
            <p className="mt-6 border-l-2 border-red pl-4">
              <span className="club-label block text-snow-dim">
                What you need
              </span>
              <span className="mt-1.5 block text-snow">{video.equipment}</span>
            </p>
          ) : null}
        </div>

        {/* ---- Related ---------------------------------------------------- */}
        {related.length ? (
          <section className="mt-16 border-t border-snow/10 pt-10 sm:mt-20">
            <div className="flex items-center gap-3">
              <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
              <h2 className="club-label text-snow-dim">Watch next</h2>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>

            <Link
              href="/videos"
              className="btn-club btn-club-outline-light club-label group mt-10 inline-flex items-center justify-center px-8 py-4"
            >
              <span className="inline-flex items-center gap-3">
                Back to the library
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </section>
        ) : null}
      </main>
    </div>
  );
}
