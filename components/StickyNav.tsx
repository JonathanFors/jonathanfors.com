"use client";

import { useEffect, useRef, useState } from "react";
import { nav, siteLinks } from "@/lib/site";
import { ArrowIcon, CloseIcon, MenuIcon } from "@/components/icons";
import ContourMark from "@/components/ContourMark";

export default function StickyNav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Solid/transparent + hide-on-scroll-down / reveal-on-up.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;

      setSolid(y > vh * 0.75);

      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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

  const light = !solid && !open; // light treatment over the dark hero

  return (
    // Wrapper handles the surrounding space + the smooth slide.
    <div
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:px-5 sm:pt-4 ${
        hidden && !open ? "-translate-y-[135%]" : "translate-y-0"
      }`}
    >
      <header
        className={`mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 rounded-full border pl-4 pr-2 shadow-lg transition-colors duration-300 sm:h-16 sm:pl-6 sm:pr-3 ${
          light
            ? "border-white/15 bg-night/40 text-snow shadow-black/20 backdrop-blur-md"
            : "border-rule bg-paper/85 text-ink shadow-black/5 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex flex-1 items-center justify-between gap-4"
        >
          {/* Logo lockup */}
          <a
            href="#top"
            aria-label="Jonathan Fors — back to top"
            className="group flex items-center gap-2.5"
          >
            <ContourMark className="h-7 w-7 transition-transform duration-500 ease-out group-hover:rotate-[14deg]" />
            <span className="flex flex-col leading-none">
              <span className="font-display-tight text-[0.95rem] tracking-tight sm:text-base">
                Jonathan Fors
              </span>
              <span
                className={`mt-0.5 text-[0.56rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
                  light ? "text-snow/55" : "text-ink-faint"
                }`}
              >
                Ultra Coach
              </span>
            </span>
          </a>

          {/* Desktop links — animated underline */}
          <ul className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-atlantic-bright after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
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
        </nav>

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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden"
        >
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile menu — floating panel below the pill; always mounted so it can slide */}
      <div
        id="mobile-menu"
        className={`mx-auto w-full max-w-[1180px] overflow-hidden transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "mt-2 max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-3xl border border-rule bg-paper px-5 pb-6 pt-2 shadow-lg shadow-black/10">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  className={`flex items-center justify-between border-b border-rule py-4 font-display-tight text-2xl text-ink transition-all duration-500 ease-out ${
                    open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                  }`}
                >
                  {item.label}
                  <ArrowIcon className="h-5 w-5 text-atlantic" />
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
            style={{
              transitionDelay: open ? `${120 + nav.length * 55}ms` : "0ms",
            }}
            className={`btn btn-atlantic mt-5 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-500 ease-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            Book an intro call
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
