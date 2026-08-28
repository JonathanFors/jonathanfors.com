"use client";

import { useEffect, useRef, useState } from "react";
import SubscribeForm from "@/components/club/SubscribeForm";
import SlashMark from "@/components/SlashMark";
import { groupCoaching, subscribeSource } from "@/lib/site";

/**
 * The waitlist field, pinned to the bottom of the viewport on /waitlist.
 *
 * The point of the page is one action, and a reader who has scrolled past the
 * hero shouldn't have to scroll back to take it. Three rules keep it from
 * being the nagging bar every landing page has:
 *
 * 1. **It only appears when no other form is on screen.** It watches every
 *    element marked `data-waitlist-anchor` and stays hidden while one of them
 *    is visible — so it never sits under a field the reader is already looking
 *    at, and never covers the page's own bottom form.
 * 2. **It retires as soon as the address is in.** It listens for the
 *    `subscribe:success` event that SubscribeForm fires, from any form on the
 *    page. If the bar was on screen it holds its own confirmation for a beat
 *    first; if the signup happened in a form the reader was looking at, it just
 *    goes.
 * 3. **It's inert while hidden.** It stays mounted so it can slide rather than
 *    pop, but nothing in it is focusable or read out until it's actually up.
 *
 * No JavaScript means no bar — the two forms in the page body are the real
 * signup path, and both work without it.
 */

/** How long the bar holds its confirmation before sliding away, in ms. */
const CONFIRMATION_MS = 6000;

export default function StickyWaitlistBar() {
  /** True when none of the page's own signup forms are on screen. */
  const [formsOffScreen, setFormsOffScreen] = useState(false);
  /** Signup landed while the bar was up — hold the confirmation, then go. */
  const [confirming, setConfirming] = useState(false);
  /** Retired for the rest of the visit. */
  const [retired, setRetired] = useState(false);

  const show = !retired && (confirming || formsOffScreen);

  // Read inside the success handler, which would otherwise close over the value
  // from the render it was registered in. Synced in an effect rather than
  // written during render.
  const showRef = useRef(show);
  useEffect(() => {
    showRef.current = show;
  }, [show]);

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

    const onSuccess = () => {
      if (!showRef.current) {
        // The reader signed up in a form they were looking at — it shows its
        // own confirmation. Nothing for the bar to do but stay away.
        setRetired(true);
        return;
      }
      setConfirming(true);
    };

    window.addEventListener("subscribe:success", onSuccess);
    return () => window.removeEventListener("subscribe:success", onSuccess);
  }, [retired]);

  useEffect(() => {
    if (!confirming) return;
    const timer = window.setTimeout(() => setRetired(true), CONFIRMATION_MS);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  if (retired) return null;

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
        {/* The reason to type an address, restated at the width it has. The
            full sentence only appears where there's room for it beside the
            field; the phone gets the short version. */}
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

        <div className="w-full shrink-0 sm:ml-auto sm:w-[26rem]">
          <SubscribeForm
            action="Join"
            utmMedium={subscribeSource.groupWaitlist}
            location="waitlist-sticky"
            size="compact"
          />
        </div>
      </div>
    </div>
  );
}
