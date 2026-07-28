"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  className?: string;
  /** Rendered before/after the number, e.g. "~" or " km". */
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts up to `value` once it scrolls into view. Static under reduced motion. */
export default function CountUp({
  value,
  className,
  prefix = "",
  suffix = "",
  durationMs = 1500,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dur = reduce ? 0 : durationMs;

    let raf = 0;
    let start = 0;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = dur === 0 ? 1 : Math.min((ts - start) / dur, 1);
      setDisplay(Math.round(easeOut(p) * value));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    const begin = () => {
      raf = requestAnimationFrame(run);
    };

    // Reduced motion (or no IO): jump straight to the final value.
    if (reduce || typeof IntersectionObserver === "undefined") {
      begin();
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0]?.isIntersecting) {
          begin();
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
