"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import SlashMark from "@/components/SlashMark";
import { lockBodyScroll } from "@/lib/scrollLock";

const TIDYCAL_SRC = "https://asset-tidycal.b-cdn.net/js/embed.js";
const TIDYCAL_PATH = "jonathanfors/discovery";

/**
 * Global booking popup, in the club language: full-screen black sheet, hard
 * corners, red rules. Instead of wiring every CTA, this listens for clicks on
 * any `[data-cta="book-intro-call"]` element, cancels the navigation, and opens
 * the dialog, lazy-loading the TidyCal embed on first open. The triggers keep
 * their href, so modified/middle clicks and no-JS still reach the booking page
 * in a new tab.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const loaded = useRef(false);

  // Inject the TidyCal embed + script once, on first open.
  const ensureEmbed = useCallback(() => {
    if (loaded.current || !embedRef.current) return;
    loaded.current = true;

    const embed = document.createElement("div");
    embed.className = "tidycal-embed";
    embed.setAttribute("data-path", TIDYCAL_PATH);
    embedRef.current.appendChild(embed);

    const script = document.createElement("script");
    script.src = TIDYCAL_SRC;
    script.async = true;
    document.body.appendChild(script);
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
      ensureEmbed();
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [ensureEmbed]);

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
         This sheet stays mounted to keep the TidyCal iframe loaded, and both
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

        {/* Calendar — the embed brings its own light styling, so it sits on a
            paper sheet rather than straight on the black.
            TidyCal sizes its own iframe to its content and expects the page to
            scroll. Forcing the iframe to the sheet height just cropped it, so
            the iframe keeps its natural height and this panel scrolls instead.
            `overscroll-contain` stops the scroll chaining to the page behind. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-paper">
          <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-6 sm:py-8">
            <div className="relative min-h-[32rem] [&_iframe]:!w-full">
              {/* Fallback sits behind; the TidyCal iframe covers it once loaded */}
              <p className="club-label absolute inset-0 -z-10 flex items-center justify-center text-ink-faint">
                Loading the calendar…
              </p>
              {/* React keeps this empty; TidyCal injects the calendar here */}
              <div ref={embedRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
