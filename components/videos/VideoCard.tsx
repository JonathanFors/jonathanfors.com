import Link from "next/link";
import VideoThumb from "@/components/videos/VideoThumb";
import { categoryLabel, isUnfilmed, type TrainingVideo } from "@/lib/videos";

/**
 * One video in the grid. The whole card is a single link — not a thumbnail link
 * plus a title link — so there's one target per video on the page and nothing
 * to miss on a phone.
 */
export default function VideoCard({
  video,
  priority = false,
}: {
  video: TrainingVideo;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/videos/${video.slug}`}
      className="club-cut-br group flex flex-col bg-night-2 outline-offset-2 transition-colors duration-300 hover:bg-night-2/60"
    >
      <VideoThumb video={video} priority={priority} />

      <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="club-label text-red-bright">
            {categoryLabel(video.category)}
          </span>
          {isUnfilmed(video) ? (
            <span className="club-label border border-snow/30 px-2 py-0.5 text-[0.6rem] text-snow-dim">
              Not filmed yet
            </span>
          ) : null}
        </div>

        <h3 className="font-club-upright mt-3 text-xl leading-tight text-snow">
          {video.title}
        </h3>

        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-snow-dim">
          {video.blurb}
        </p>
      </div>
    </Link>
  );
}
