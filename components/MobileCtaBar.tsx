"use client";

import { useEffect, useState } from "react";
import { siteLinks } from "@/lib/site";
import { ArrowIcon, CalendarIcon } from "@/components/icons";

/**
 * Phone-only pinned CTA. The nav's inline CTA is hidden below the `sm`
 * breakpoint, so this keeps booking one tap away once past the hero.
 */
export default function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <a
        href={siteLinks.booking}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="book-intro-call"
        data-cta-location="mobile-bar"
        className="btn btn-atlantic flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        <CalendarIcon className="h-4 w-4" />
        Book a free intro call
        <ArrowIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
