"use client";

import { useEffect, useRef } from "react";

type Props = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function ParallaxHero({
  image,
  eyebrow,
  title,
  subtitle,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Progress of the section across the viewport: -1 (below) → 1 (above)
      const progress =
        (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
      // Subtle parallax: shift the image up to ~8% of its extra height.
      const shift = -progress * 60;
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.15)`;
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden h-[70vh] min-h-[440px] md:h-[85vh]"
      aria-label={title}
    >
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform bg-carbon-black"
        style={{
          backgroundImage: `url(${image}), url(/images/hero-placeholder.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          transform: "scale(1.15)",
        }}
      />
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-black/40 via-carbon-black/20 to-carbon-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-pale-slate">
          {eyebrow}
        </p>
        <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-bright-snow drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-5 max-w-xl text-base text-platinum/90 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
