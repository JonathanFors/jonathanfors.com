"use client";

import { useEffect, useState } from "react";
import { nav, siteLinks } from "@/lib/site";
import { ArrowIcon, CloseIcon, MenuIcon } from "@/components/icons";

export default function StickyNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Flip from transparent (over the dark hero) to a solid paper bar.
  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open.
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

  const light = !solid && !open; // light text over the dark hero

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open
          ? "bg-paper/95 backdrop-blur-sm border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8"
      >
        {/* Wordmark */}
        <a
          href="#top"
          aria-label="Jonathan Fors — back to top"
          className={`font-display-tight text-lg tracking-tight transition-colors ${
            light ? "text-snow" : "text-ink"
          }`}
        >
          Jonathan&nbsp;Fors
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  light
                    ? "text-snow/80 hover:text-snow"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Primary CTA — always reachable */}
          <a
            href={siteLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="book-intro-call"
            data-cta-location="nav"
            className={`btn group hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex ${
              light ? "btn-snow" : "btn-atlantic"
            }`}
          >
            Book an intro call
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${
              light ? "text-snow" : "text-ink"
            }`}
          >
            {open ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-rule bg-paper px-5 pb-8 pt-4 md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-rule py-4 font-display-tight text-2xl text-ink"
                >
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
            className="btn btn-atlantic mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
          >
            Book an intro call
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
