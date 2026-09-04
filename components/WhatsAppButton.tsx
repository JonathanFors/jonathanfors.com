"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/icons";
import { siteLinks } from "@/lib/site";

/**
 * Sticky WhatsApp module — bottom-right, on every page.
 *
 * An ink card rather than a paper one: it sits on top of the page rather than
 * in it, and the dark surface is what separates the two. Same rules as the
 * footer, the site's other ink surface — snow text, `red-bright` for the
 * accent, since CP.03 red loses contrast on black.
 *
 * The card is the link; the ✕ is a sibling, not nested inside it. Dismissing
 * sets a one-hour cookie, so it comes back on a later visit but doesn't
 * re-appear the moment you change page. The cookie is read through
 * `useSyncExternalStore` rather than an effect: it's only legible on the
 * client, so the server snapshot is "dismissed" and the card renders nothing
 * until we actually know — which is also what stops it flashing in on load.
 *
 * It lifts out of the way of a page-level bottom bar — /waitlist has one, and
 * both are pinned to the same corner — by listening for the height that bar
 * broadcasts. Translated rather than re-positioned so the two slide together.
 */
export default function WhatsAppButton() {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => true);
  /** Height of a page-level bottom bar, when one is up. 0 when none is. */
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const onBar = (event: Event) => {
      const { height } = (event as CustomEvent<{ height: number }>).detail ?? {
        height: 0,
      };
      setBarHeight(typeof height === "number" ? height : 0);
    };
    window.addEventListener("bottombar:height", onBar);
    return () => window.removeEventListener("bottombar:height", onBar);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className="club club-on-ink fixed bottom-4 right-4 z-40 transition-transform duration-300 ease-out motion-reduce:transition-none sm:bottom-6 sm:right-6"
      style={barHeight ? { transform: `translateY(-${barHeight}px)` } : undefined}
    >
      {/* night-2 rather than pure ink, plus a hairline: the page has
          full-bleed ink sections of its own, and on those a black card with a
          black shadow has no edge at all. */}
      <div className="relative border border-night-rule bg-night-2 text-snow shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
        <a
          href={siteLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3.5 border-l-2 border-red-bright py-3.5 pl-4 pr-11 transition-colors hover:bg-ink"
          aria-label="Message Jonathan on WhatsApp"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-red-bright text-ink transition-colors group-hover:bg-red">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="club-label block text-[0.6875rem] text-snow">
              WhatsApp me
            </span>
            <span className="mt-1 block text-xs leading-snug text-snow-dim">
              I usually reply in a few minutes.
            </span>
          </span>
        </a>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-1 top-1 inline-flex h-7 w-7 items-center justify-center text-snow-dim transition-colors hover:text-snow"
          aria-label="Dismiss"
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ---- Dismissal, as an external store ---------------------------------
   The state lives in a cookie, not in React, so it's read and written where
   it lives and subscribers are told by hand. One hour: long enough not to
   nag, short enough that a later visit sees the card again. */

const DISMISS_COOKIE = "whatsapp_dismissed";
const DISMISS_SECONDS = 3600;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function isDismissed() {
  return getCookie(DISMISS_COOKIE) === "true";
}

function dismiss() {
  setCookie(DISMISS_COOKIE, "true", DISMISS_SECONDS);
  for (const listener of listeners) listener();
}

function setCookie(name: string, value: string, seconds: number) {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  for (const raw of document.cookie.split(";")) {
    const cookie = raw.trim();
    if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
  }
  return null;
}
