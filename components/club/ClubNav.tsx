"use client";

import { useEffect, useRef, useState } from "react";
import { clubNav, siteLinks } from "@/lib/site";
import { CloseIcon, MenuIcon } from "@/components/icons";
import SlashMark from "@/components/SlashMark";
import Wordmark from "@/components/club/Wordmark";

/**
 * Club nav — a full-width black bar, hard corners, the slash mark as the logo
 * lockup. Replaces the floating pill: the club language has no rounded shapes.
 * Hides on scroll down, reveals on scroll up.
 */
export default function ClubNav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={`club club-on-ink fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <header className="flex h-16 items-stretch border-b-2 border-red bg-ink text-snow sm:h-[4.5rem]">
        {/* Logo lockup */}
        <a
          href="#top"
          aria-label="Jonathan Fors — back to top"
          className="flex shrink-0 items-center border-r-2 border-red/30 px-4 text-snow sm:px-6"
        >
          <Wordmark />
        </a>

        {/* Desktop links — red block fills on hover */}
        <nav aria-label="Primary" className="hidden flex-1 items-stretch lg:flex">
          {clubNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="club-label flex items-center px-5 text-snow-dim transition-colors duration-200 hover:bg-red hover:text-ink lg:px-7"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-1 items-stretch justify-end lg:flex-none">
          {/* Primary CTA — the one red block in the bar */}
          <a
            href={siteLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="book-intro-call"
            data-cta-location="nav"
            className="club-label hidden items-center bg-red px-6 text-ink transition-colors duration-200 hover:bg-snow sm:inline-flex lg:px-8"
          >
            Book 1:1 Call
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="club-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex w-16 items-center justify-center border-l-2 border-red/30 text-snow lg:hidden"
          >
            {open ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="club-mobile-menu"
        className={`overflow-hidden bg-ink transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-2 pt-1">
          {clubNav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${110 + i * 50}ms` : "0ms" }}
                className={`font-club flex items-center gap-3 border-b border-snow/10 py-4 text-3xl text-snow transition-all duration-500 ease-out ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                <SlashMark className="h-5 w-[1.4rem] shrink-0 text-red" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={siteLinks.booking}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="book-intro-call"
          data-cta-location="mobile-menu"
          onClick={() => setOpen(false)}
          className="club-label flex items-center justify-center bg-red py-5 text-ink"
        >
          Book 1:1 Call
        </a>
      </div>
    </div>
  );
}
