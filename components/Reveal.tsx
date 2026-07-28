"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger, in ms. */
  delay?: number;
  id?: string;
  "aria-label"?: string;
};

/**
 * Fades + lifts its content into view once, using IntersectionObserver.
 * The transition itself lives in globals.css ([data-reveal]); this only
 * toggles `.is-in`. Reduced-motion users get the content shown immediately
 * (handled in CSS), and a <noscript> fallback keeps it visible without JS.
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  ...rest
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as object) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
