"use client";

import { useEffect } from "react";

/**
 * Conversion instrumentation, vendor-free.
 *
 * Any element carrying `data-cta="<name>"` is tracked on click via event
 * delegation, so CTAs stay as plain server-rendered anchors. When an analytics
 * tool is wired later it can either read `window.dataLayer` (GTM-style) or
 * listen for the `cta:click` CustomEvent — no markup changes needed.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cta]",
      );
      if (!el) return;

      const detail = {
        cta: el.dataset.cta,
        location: el.dataset.ctaLocation ?? null,
        href: el.getAttribute("href"),
        ts: Date.now(),
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "cta_click", ...detail });
      window.dispatchEvent(new CustomEvent("cta:click", { detail }));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
