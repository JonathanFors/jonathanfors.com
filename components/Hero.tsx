"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteLinks } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import CertBadge from "@/components/CertBadge";

export default function Hero() {
  const imgWrap = useRef<HTMLDivElement>(null);

  // Subtle parallax: drift the image slower than the scroll. Skipped for
  // reduced-motion and cheap (transform only, rAF-throttled).
  useEffect(() => {
    const el = imgWrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      el.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0) scale(1.12)`;
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

  return (
    <section
      id="top"
      className="on-night relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night"
      aria-label="Jonathan Fors — ultra-endurance running coach"
    >
      {/* Full-bleed photograph */}
      <div ref={imgWrap} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-coast-road.jpg"
          alt="A lone runner on a winding road high above the Atlantic coastline of Portugal, under heavy grey sky."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_42%]"
        />
      </div>
      {/* Legibility wash — heavier at the bottom where the type sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/20" />
      <div className="absolute inset-0 bg-night/15" />

      {/* Certification seal — social proof, prominent on every size */}
      <CertBadge className="absolute right-4 top-20 z-10 h-[clamp(74px,11vw,132px)] w-[clamp(74px,11vw,132px)] text-snow sm:right-8 sm:top-auto sm:bottom-24" />

      {/* Content — pinned low and to the left, off the center column */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="text-kicker text-snow/70">
          Ultra-Endurance Running Coach · UESCA-Certified
        </p>

        <h1 className="mt-5">
          <span className="font-display text-display block text-snow lg:whitespace-nowrap">
            Train for the ultra.
          </span>
          <span className="font-display text-display block text-atlantic-bright lg:whitespace-nowrap">
            Keep your life.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-snow/85 sm:text-lg">
          Holistic coaching for ambitious runners with jobs, families, and a
          long race on the horizon. The training is built to fit your life —
          not the other way around.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={siteLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="book-intro-call"
            data-cta-location="hero"
            className="btn btn-snow group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
          >
            Book a free intro call
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#approach"
            data-cta="see-approach"
            data-cta-location="hero"
            className="btn btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
          >
            See the approach
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="relative z-10 mx-auto mb-6 hidden w-full max-w-[1400px] px-8 sm:block"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.3em] text-snow/45">
          Scroll
        </span>
      </div>
    </section>
  );
}
