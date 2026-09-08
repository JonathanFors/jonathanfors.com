import SlashMark from "@/components/SlashMark";
import { embedUrl, type TrainingVideo } from "@/lib/videos";

/**
 * The player on a video's own page. Fixed 16:9 — every video here is shot
 * horizontal — and capped in height so a landscape phone or a short laptop
 * screen still shows the title underneath.
 *
 * A placeholder entry (no `source`) gets a stand-in of the same size instead of
 * an empty iframe, so the page layout is the real one and nothing shifts when
 * the video is added.
 */
export default function VideoEmbed({ video }: { video: TrainingVideo }) {
  if (!video.source) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-night-2">
        <span
          aria-hidden="true"
          className="club-slashes absolute inset-0 text-red/[0.09] [--bar:14px] [--gap:48px]"
        />
        <div className="relative flex flex-col items-center px-6 text-center">
          <SlashMark className="h-8 w-9 text-red" />
          <p className="club-label mt-5 text-snow">Video coming</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-snow-dim">
            This one hasn&apos;t been filmed yet. The player will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink">
      <iframe
        src={embedUrl(video.source)}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
