"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clubNav, siteLinks } from "@/lib/site";
import { lockBodyScroll } from "@/lib/scrollLock";
import { CloseIcon, MenuIcon } from "@/components/icons";
import SlashMark from "@/components/SlashMark";
import Wordmark from "@/components/club/Wordmark";

/**
 * Club nav — a full-width black bar, hard corners, the slash mark as the logo
 * lockup. Replaces the floating pill: the club language has no rounded shapes.
 * Hides on scroll down, reveals on scroll up.
 *
 * Mounted once, by the root layout, so it is the same bar on every page. Two
 * consequences of that: every href is absolute (see lib/site — a bare
 * "#approach" scrolls to nothing anywhere but home), and the two page links
 * carry an active state, because on /waitlist and /newsletter the nav has to
 * say where you already are.
 */
export default function ClubNav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

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
    // Shared, counted lock — the booking modal opens from inside this menu on
    // mobile, so both hold it at once. See lib/scrollLock.
    const releaseScroll = lockBodyScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      releaseScroll();
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
        <Link
          href="/"
          aria-label="Jonathan Fors — homepage"
          // The header stays visible above the open mobile menu, so this link
          // has to close it too or it covers the page it navigates to.
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center border-r-2 border-red/30 px-4 text-snow sm:px-6 lg:px-4 xl:px-6"
        >
          <Wordmark />
        </Link>

        {/* Desktop links — red block fills on hover. Five items, the wordmark
            and the CTA have to clear 1024px, where the bar first appears, so
            the cell padding is tight at lg and only opens up at xl. Measured
            at 1024 it leaves ~80px spare; the labels never wrap. */}
        <nav aria-label="Primary" className="hidden flex-1 items-stretch lg:flex">
          {clubNav.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`club-label flex shrink-0 items-center whitespace-nowrap px-4 transition-colors duration-200 hover:bg-red hover:text-ink xl:px-7 ${
                  current ? "text-red-bright" : "text-snow-dim"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-stretch justify-end lg:flex-none">
          {/* Primary CTA — the one red block in the bar */}
          <a
            href={siteLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="book-intro-call"
            data-cta-location="nav"
            className="club-label hidden shrink-0 items-center whitespace-nowrap bg-red px-5 text-ink transition-colors duration-200 hover:bg-snow sm:inline-flex xl:px-8"
          >
            Book a call
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

      {/* Mobile menu. max-h is the collapse animation's travel, so it has to
          clear the tallest the list gets — five rows plus the CTA. It also
          scrolls: the five rows plus the bar leave little room on a short
          phone in landscape. */}
      <div
        id="club-mobile-menu"
        className={`overflow-hidden bg-ink transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open
            ? "max-h-[calc(100svh-4rem)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-2 pt-1">
          {clubNav.map((item, i) => {
            const current = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${110 + i * 50}ms` : "0ms" }}
                  className={`font-club flex items-center gap-3 border-b border-snow/10 py-4 text-3xl transition-all duration-500 ease-out ${
                    current ? "text-red-bright" : "text-snow"
                  } ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                >
                  <SlashMark className="h-5 w-[1.4rem] shrink-0 text-red" />
                  {item.label}
                </Link>
              </li>
            );
          })}
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
          Book a call
        </a>
      </div>
    </div>
  );
}
