"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import VideoCard from "@/components/videos/VideoCard";
import { CloseIcon } from "@/components/icons";
import {
  filterVideos,
  usedCategories,
  videos,
  type CategoryId,
} from "@/lib/videos";

const CATEGORY_OPTIONS = usedCategories();

export type Filter = CategoryId | "all";

/**
 * The filter bar + grid.
 *
 * Filters live in the URL (?q=…&category=…) so a filtered view is itself a
 * link — "here's everything on fuelling" is a URL Jonathan can paste, without
 * needing a page per category.
 *
 * The starting values are resolved on the server (app/videos/page.tsx reads
 * `searchParams` and passes them in) rather than read from `window` after
 * mount. That way an incoming filtered link is already filtered in the HTML:
 * no flash of the full library, nothing to reconcile at hydration, and the grid
 * still works with JavaScript switched off.
 *
 * Changes are written back with history.replaceState rather than a router
 * push: no navigation, no scroll jump, and no history entry per keystroke, so
 * Back leaves the library instead of replaying what was typed.
 */
export default function VideoLibrary({
  initialQuery = "",
  initialCategory = "all",
}: {
  initialQuery?: string;
  initialCategory?: Filter;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<Filter>(initialCategory);
  const searchRef = useRef<HTMLInputElement>(null);

  // Mirror the current filters into the address bar. The URL is the external
  // system here — state flows one way, into it.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    if (category !== "all") params.set("category", category);
    else params.delete("category");
    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}`,
    );
  }, [query, category]);

  const results = useMemo(
    () => filterVideos(query, category),
    [query, category],
  );

  const filtered = query.trim() !== "" || category !== "all";
  const clear = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <>
      {/* ---- Filter bar ------------------------------------------------
          Sticky under the header so the filters stay reachable while scrolling
          a long grid. Offset matches the header height at each breakpoint. */}
      <div className="sticky top-16 z-30 border-b-2 border-snow/15 bg-ink/95 backdrop-blur sm:top-[4.5rem]">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-4 sm:px-8 sm:py-5">
          {/* Search */}
          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-snow-dim"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5 21 21" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault();
                  setQuery("");
                }
              }}
              placeholder="Search the library"
              aria-label="Search training videos"
              aria-describedby="video-result-count"
              className="w-full border-2 border-snow/25 bg-night-2 py-3.5 pl-12 pr-11 text-base text-snow placeholder:text-snow-dim/70 focus:border-red focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-snow-dim transition-colors hover:text-red-bright"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {/* Categories. One row, scrolled sideways on small screens rather
              than wrapped to three lines — keeps the bar a predictable height
              so the sticky offset never covers the first row of cards. */}
          <div
            role="group"
            aria-label="Filter by category"
            // The pills are skewed, so the first one's top-left corner sits
            // ~9px left of its layout box. Without the extra left padding the
            // scroll container clips that corner; with it, the pill's leftmost
            // point lines up with the search field above.
            className="-mx-5 mt-3 flex gap-2 overflow-x-auto pb-1 pl-7 pr-5 sm:-mx-8 sm:pl-10 sm:pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <FilterPill
              active={category === "all"}
              onClick={() => setCategory("all")}
            >
              All
            </FilterPill>
            {CATEGORY_OPTIONS.map((c) => (
              <FilterPill
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </FilterPill>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Results ---------------------------------------------------- */}
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-8 sm:px-8 sm:pb-28 sm:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* aria-live so a screen reader hears the count change as the grid
              narrows — otherwise typing silently rewrites the page. */}
          <p
            id="video-result-count"
            aria-live="polite"
            className="club-label text-snow-dim"
          >
            {results.length} {results.length === 1 ? "video" : "videos"}
            {filtered ? ` of ${videos.length}` : ""}
          </p>
          {filtered ? (
            <button
              type="button"
              onClick={clear}
              className="club-label inline-flex items-center gap-2 text-snow transition-colors hover:text-red-bright"
            >
              <CloseIcon className="h-3.5 w-3.5" />
              Clear filters
            </button>
          ) : null}
        </div>

        {results.length ? (
          <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((video, i) => (
              <VideoCard key={video.slug} video={video} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="club-cut-br mt-8 bg-night-2 px-6 py-16 text-center sm:px-10">
            <p className="font-club-upright text-2xl text-snow">
              Nothing matches that.
            </p>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-snow-dim">
              Try a shorter phrase, or clear the filters and browse the whole
              library.
            </p>
            <button
              type="button"
              onClick={clear}
              className="btn-club btn-club-red club-label mt-8 inline-flex items-center justify-center px-8 py-4"
            >
              <span>Show all videos</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/** A category button. Skewed like the site's buttons; label stays upright. */
function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`btn-club club-label shrink-0 whitespace-nowrap px-5 py-2.5 transition-colors ${
        active
          ? "bg-red text-ink"
          : "border-2 border-snow/25 text-snow-dim hover:border-snow/60 hover:text-snow"
      }`}
    >
      <span>{children}</span>
    </button>
  );
}
