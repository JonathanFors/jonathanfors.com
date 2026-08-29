"use client";

import { useEffect, useState } from "react";
import SlashMark from "@/components/SlashMark";
import { ArrowIcon } from "@/components/icons";
import { groupCoaching } from "@/lib/site";

/**
 * The waitlist prompt, pinned to the bottom of the viewport on /waitlist.
 *
 * The point of the page is one action, and a reader who has scrolled past the
 * hero shouldn't have to hunt for it. Three rules keep it from being the
 * nagging bar every landing page has:
 *
 * 1. **It only appears when no form is on screen.** It watches every element
 *    marked `data-waitlist-anchor` and stays hidden while one of them is
 *    visible — so it never sits under a field the reader is already looking
 *    at, and never covers the page's own bottom form.
 * 2. **It retires as soon as the signup lands.** It listens for the
 *    `subscribe:success` event that SubscribeForm fires, from any form on the
 *    page, and doesn't come back for the rest of the visit.
 * 3. **It's inert while hidden.** It stays mounted so it can slide rather than
 *    pop, but nothing in it is focusable or read out until it's actually up.
 *
 * It carries a button back to the form rather than a copy of the form itself.
 * The waitlist asks three questions now — name, level, address — and a bar
 * deep enough to hold them is a bar that covers a third of a phone screen.
 * Sending the reader to the field they were going to have to fill in anyway
 * keeps the bar one line tall and the form in one place.
 *
 * No JavaScript means no bar — the two forms in the page body are the real
 * signup path, and both work without it.
 */
export default function StickyWaitlistBar() {
  /** True when none of the page's own signup forms are on screen. */
  const [formsOffScreen, setFormsOffScreen] = useState(false);
  /** Retired for the rest of the visit. */
  const [retired, setRetired] = useState(false);

  const show = !retired && formsOffScreen;

  useEffect(() => {
    const anchors = Array.from(
      document.querySelectorAll("[data-waitlist-anchor]"),
    );
    if (anchors.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setFormsOffScreen(onScreen.size === 0);
      },
      // A sliver counts as on screen: a form half out of the viewport is still
      // one the reader can reach without the bar.
      { threshold: 0 },
    );

    // Nothing extra is needed for resize or rotation: intersections are
    // recomputed as part of the browser's rendering steps, which a viewport
    // change triggers.
    anchors.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (retired) return;
    const onSuccess = () => setRetired(true);
    window.addEventListener("subscribe:success", onSuccess);
    return () => window.removeEventListener("subscribe:success", onSuccess);
  }, [retired]);

  if (retired) return null;

  /**
   * Take the reader to the form and put the cursor in its first field, so the
   * bar hands over a form ready to type in rather than just a view of one.
   * Focus is moved with `preventScroll` — left to itself it jumps the page,
   * which would undo the smooth scroll it was given.
   */
  const goToForm = () => {
    const target = document.querySelector("[data-waitlist-anchor]");
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
    target
      .querySelector<HTMLInputElement>("input:not([type='hidden'])")
      ?.focus({ preventScroll: true });
  };

  return (
    <div
      // `inert` rather than `hidden`: the bar stays in the layout so it can
      // slide, but while it's off screen it's out of the tab order and out of
      // the accessibility tree.
      inert={!show}
      aria-label="Join the group coaching waitlist"
      className={`club club-on-ink fixed inset-x-0 bottom-0 z-40 border-t-2 border-red bg-ink transition-transform duration-300 ease-out motion-reduce:transition-none ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-3.5">
        {/* The reason to go back to the form, restated at the width it has.
            The full sentence only appears where there's room for it beside the
            button; the phone gets the short version. */}
        <p className="flex min-w-0 items-center gap-2.5 text-sm text-snow-dim">
          <SlashMark className="h-3.5 w-[1rem] shrink-0 text-red" />
          <span className="sm:hidden">
            {groupCoaching.freeSpots} free places, drawn at random
          </span>
          <span className="hidden sm:inline">
            {groupCoaching.freeSpots} places free forever, drawn at random when
            the group opens at the {groupCoaching.launch}.
          </span>
        </p>

        <button
          type="button"
          onClick={goToForm}
          data-cta="waitlist-sticky"
          data-cta-location="waitlist-sticky"
          className="club-label group inline-flex shrink-0 items-center justify-center gap-2.5 border-2 border-red bg-red px-5 py-2.5 text-ink transition-colors duration-200 hover:border-snow hover:bg-snow hover:text-ink sm:ml-auto"
        >
          Join the waitlist
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
