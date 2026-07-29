"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";

const TIDYCAL_SRC = "https://asset-tidycal.b-cdn.net/js/embed.js";
const TIDYCAL_PATH = "jonathanfors/discovery";

/**
 * Global booking popup. Instead of wiring every CTA, this listens for clicks
 * on any `[data-cta="book-intro-call"]` element, cancels the navigation, and
 * opens a modal that lazy-loads the TidyCal embed on first open. The triggers
 * keep their href, so modified/middle clicks and no-JS still reach the booking
 * page in a new tab.
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
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
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
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 sm:p-6 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close booking dialog"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-night/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        className={`relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-rule bg-paper shadow-2xl transition-[transform,opacity] duration-300 ease-out ${
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-rule px-5 py-4">
          <div>
            <p className="text-kicker text-ink-faint">Free · 30 minutes</p>
            <h2 className="mt-1 font-display-tight text-xl text-ink">
              Book an intro call
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors hover:border-atlantic hover:text-atlantic"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5">
          <div className="relative min-h-[560px]">
            {/* Fallback text sits behind; the TidyCal iframe covers it once loaded */}
            <p className="absolute inset-0 -z-10 flex items-center justify-center text-sm text-ink-faint">
              Loading the calendar…
            </p>
            {/* React keeps this empty; TidyCal injects the calendar here */}
            <div ref={embedRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
