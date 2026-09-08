"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import SlashMark from "@/components/SlashMark";
import { lockBodyScroll } from "@/lib/scrollLock";
import { siteLinks } from "@/lib/site";

/**
 * The origin the booking iframe is served from, and the only origin whose
 * height messages are honoured. `postMessage` is broadcast to every listener on
 * the page, so without this check any embedded frame — or any script that can
 * reach `window` — could resize the panel at will.
 */
const BOOKING_ORIGIN = "https://app.ultraendurant.com";

/** Height before the frame reports its own, matching the embed's default. */
const DEFAULT_HEIGHT = 760;

/** Bounds on a reported height, so a bad value can't collapse or explode it. */
const MIN_HEIGHT = 320;
const MAX_HEIGHT = 20000;

/**
 * Global booking popup, in the club language: full-screen black sheet, hard
 * corners, red rules. Instead of wiring every CTA, this listens for clicks on
 * any `[data-cta="book-intro-call"]` element, cancels the navigation and opens
 * the dialog. The triggers keep their href, so modified/middle clicks and no-JS
 * still reach the booking page in a new tab.
 *
 * The calendar is the Ultra Endurant App's own booking page in an iframe
 * (2026-09-08, replacing TidyCal — which needed a third-party script from a CDN
 * and rendered a vendor-styled widget). It sizes itself: the app posts
 * `ultra-endurant:booking-height` as its content grows, and the frame is set to
 * that height. The surrounding panel still scrolls, so the booking works even
 * if no message ever arrives.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  /**
   * The iframe is mounted on first open and never unmounted, so reopening the
   * dialog doesn't reload the calendar and lose a half-filled form.
   */
  const [mounted, setMounted] = useState(false);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Height reports from the booking frame.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== BOOKING_ORIGIN) return;
      const data: unknown = e.data;
      if (
        typeof data !== "object" ||
        data === null ||
        (data as { type?: unknown }).type !== "ultra-endurant:booking-height"
      ) {
        return;
      }
      const next = Number((data as { height?: unknown }).height);
      if (!Number.isFinite(next)) return;
      setHeight(Math.min(Math.max(next, MIN_HEIGHT), MAX_HEIGHT));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Intercept booking CTAs anywhere on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Let modified / non-primary clicks fall through to the real link.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const trigger = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cta="book-intro-call"]',
      );
      if (!trigger) return;

      e.preventDefault();
      lastFocused.current = trigger;
      setMounted(true);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Scroll lock, Escape to close, and focus management while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Shared, counted lock. On mobile this modal is reached through the nav
    // menu, so it opens while the menu still holds the lock — writing
    // body.style.overflow directly here used to strand the page unscrollable.
    const releaseScroll = lockBodyScroll();
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      releaseScroll();
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a free intro call"
      aria-hidden={!open}
      /* `invisible` when closed, not just transparent + pointer-events-none.
         This sheet stays mounted to keep the booking iframe loaded, and both
         transitions here promote it to its own compositing layer — a
         full-viewport composited layer holding a cross-origin iframe is exactly
         what iOS Safari fails to let touches through, pointer-events or not.
         visibility:hidden takes the whole subtree out of hit-testing (and out
         of the a11y tree). allow-discrete holds the flip to hidden until the
         fade has finished, so the close animation survives; browsers without it
         just lose the fade-out rather than breaking. */
      className={`club club-on-ink fixed inset-0 z-[60] transition-[opacity,visibility] [transition-behavior:allow-discrete] duration-300 ${
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
      }`}
    >
      {/* Full-screen sheet — no backdrop gap, no rounded corners */}
      <div
        className={`flex h-full w-full flex-col bg-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "translate-y-4"
        }`}
      >
        {/* Header bar, mirroring the site nav */}
        <div className="flex shrink-0 items-stretch border-b-2 border-red">
          <div className="flex flex-1 items-center gap-4 px-5 py-4 sm:px-8 sm:py-5">
            <SlashMark className="h-6 w-[1.65rem] shrink-0 text-red" />
            <div>
              <p className="club-label text-red-bright">Free · 30 minutes</p>
              <h2 className="font-club mt-1.5 text-2xl text-snow sm:text-3xl">
                Book an intro call
              </h2>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="club-label inline-flex shrink-0 items-center gap-2.5 border-l-2 border-red/30 px-5 text-snow transition-colors duration-200 hover:bg-red hover:text-ink sm:px-8"
          >
            <CloseIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* Calendar. This panel used to be `bg-paper`, because TidyCal rendered
            a light widget and needed a light sheet under it. The Ultra Endurant
            booking page is dark, so paper left a cream border framing a black
            calendar — it's ink now, and the embed runs edge to edge.
            The frame reports its own height and can grow past the sheet, so it
            keeps that height and this panel scrolls instead of cropping it.
            `overscroll-contain` stops the scroll chaining to the page behind. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-ink">
          <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-6 sm:py-8">
            <div className="relative min-h-[32rem]">
              {/* Fallback sits behind; the iframe covers it once loaded */}
              <p className="club-label absolute inset-0 -z-10 flex items-center justify-center text-snow-dim">
                Loading the calendar…
              </p>
              {mounted ? (
                /* Square, not the embed snippet's 12px radius: every panel,
                   button and plate in the club system has hard corners. */
                <iframe
                  title="Book an intro call"
                  src={siteLinks.booking}
                  loading="lazy"
                  allow="clipboard-write"
                  style={{ height }}
                  className="w-full border-0"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
