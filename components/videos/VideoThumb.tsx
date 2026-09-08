import Image from "next/image";
import SlashMark from "@/components/SlashMark";
import { thumbnailUrl, type TrainingVideo } from "@/lib/videos";

/**
 * Four arrangements of the slash field for the generated artwork. A grid where
 * every placeholder is pixel-identical reads as a broken image loop rather than
 * as art, so each card picks one from its slug — deterministic, so it's stable
 * between server and client render and doesn't shuffle as the grid filters.
 */
const ARTWORK = [
  "-right-6 -top-8 h-[130%] w-[70%] [--bar:9px] [--gap:30px]",
  "-left-8 -bottom-10 h-[140%] w-[60%] [--bar:12px] [--gap:38px]",
  "-right-10 -bottom-8 h-[150%] w-[80%] [--bar:7px] [--gap:24px]",
  "-left-4 -top-10 h-[135%] w-[52%] [--bar:15px] [--gap:44px]",
] as const;

function artworkFor(slug: string): string {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return ARTWORK[hash % ARTWORK.length];
}

/**
 * The 16:9 face of a card. All videos are shot horizontal, so the ratio is
 * fixed rather than per-video — a mixed grid of ratios is the main thing that
 * makes a library like this hard to scan.
 *
 * Three states, in order of preference: a real still (local poster or YouTube's
 * own), or generated club artwork when there's no picture to show. The artwork
 * isn't a grey box on purpose — a placeholder that looks like the brand reads as
 * "not filmed yet", where a grey box reads as "broken".
 */
export default function VideoThumb({
  video,
  priority = false,
}: {
  video: TrainingVideo;
  priority?: boolean;
}) {
  const src = thumbnailUrl(video);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <>
          {/* Generated artwork: slash field bled off the corner, same motif as
              the hero and the 404. */}
          <span
            aria-hidden="true"
            className={`club-slashes absolute text-red/[0.16] ${artworkFor(video.slug)}`}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <SlashMark className="h-10 w-11 text-snow/[0.13]" />
          </span>
        </>
      )}

      {/* Play affordance. Sits on every state so the card reads as a video
          before the title is even read. */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center bg-red text-ink transition-colors duration-300 group-hover:bg-snow"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
          <path d="M8 5l12 7-12 7z" />
        </svg>
      </span>

      {video.duration ? (
        <span className="club-label absolute bottom-3 right-3 bg-ink/85 px-2 py-1 text-[0.65rem] text-snow">
          {video.duration}
        </span>
      ) : null}
    </div>
  );
}
