"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { facts, siteLinks } from "@/lib/site";
import CountUp from "@/components/CountUp";
import { ArrowIcon, DownloadIcon } from "@/components/icons";

/**
 * The Project Portugal 2026 centerpiece.
 *
 * Desktop + motion-OK: the panels are laid out in a horizontal track that is
 * driven left as the user scrolls the pinned section (a "route" you travel).
 * Mobile or prefers-reduced-motion: the exact same panels stack into a plain
 * vertical story. Content lives in the DOM identically either way, so it stays
 * readable and indexable.
 */
export default function RouteScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"v" | "h">("v");

  // Decide layout mode from viewport width + motion preference.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setMode(wide.matches && !reduce.matches ? "h" : "v");
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  // Drive the horizontal translate from scroll position.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (mode !== "h") {
      section.style.height = "";
      track.style.transform = "";
      return;
    }

    let frame = 0;
    const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
    const setHeight = () => {
      section.style.height = `${window.innerHeight + distance()}px`;
    };
    const update = () => {
      frame = 0;
      const total = section.offsetHeight - window.innerHeight;
      const progress =
        total > 0
          ? Math.min(Math.max(-section.getBoundingClientRect().top / total, 0), 1)
          : 0;
      track.style.transform = `translate3d(${(-progress * distance()).toFixed(1)}px, 0, 0)`;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      setHeight();
      update();
    };

    setHeight();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode]);

  const h = mode === "h";
  const panel = `relative shrink-0 ${
    h
      ? "h-screen w-[92vw] max-w-[1180px] border-r border-night-rule"
      : "w-full min-h-[85svh] border-b border-night-rule"
  }`;

  return (
    <section
      ref={sectionRef}
      id="portugal"
      aria-label="Project Portugal 2026"
      className="on-night relative bg-night text-snow"
    >
      <div className={h ? "sticky top-0 h-screen overflow-hidden" : ""}>
        <div
          ref={trackRef}
          className={
            h
              ? "flex h-screen will-change-transform"
              : "flex flex-col"
          }
        >
          {/* Panel 1 — Title */}
          <div className={panel}>
            <div className="flex h-full flex-col justify-center px-6 py-24 sm:px-14">
              <p className="text-kicker text-atlantic-bright">
                The Proof · Project Portugal 2026
              </p>
              <h2 className="mt-6 font-display text-display max-w-[14ch]">
                {facts.routeKm} km down the Atlantic edge of Portugal.
              </h2>
              <p className="mt-8 max-w-md text-lg text-snow-dim">
                On {facts.startDate}, Jonathan sets out to run the entire
                coastline of Portugal on foot — a solo ultra to raise awareness
                and funds for {facts.cause}.
              </p>
              {h && (
                <p className="mt-10 inline-flex items-center gap-2 text-sm text-snow/50">
                  Scroll to travel the route
                  <ArrowIcon className="h-4 w-4" />
                </p>
              )}
            </div>
          </div>

          {/* Panel 2 — Full-bleed coastline */}
          <div className={panel}>
            <Image
              src="/images/cliff-figure.jpg"
              alt="A runner on a coastal road with the Atlantic and a lighthouse headland behind."
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 sm:p-14">
              <p className="font-display-tight text-2xl sm:text-4xl">
                The whole coastline. On foot. In one push.
              </p>
            </div>
          </div>

          {/* Panel 3 — The first attempt / the numbers */}
          <div className={panel}>
            <Image
              src="/images/thermal-blanket.jpg"
              alt="Jonathan wrapped in a thermal blanket, lit red, resting after stopping the first attempt."
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className="object-cover object-[60%_50%]"
            />
            <div className="absolute inset-0 bg-night/70" />
            <div className="relative flex h-full flex-col justify-center px-6 py-24 sm:px-14">
              <p className="text-kicker text-snow/60">A second attempt</p>
              <div className="mt-4 flex items-end gap-4">
                <CountUp
                  value={facts.previousKm}
                  className="numeral text-[clamp(4rem,14vw,11rem)] leading-none text-snow"
                />
                <span className="mb-3 text-2xl text-snow-dim sm:mb-5">km</span>
              </div>
              <p className="mt-6 max-w-md text-lg text-snow-dim">
                Two years ago, Jonathan and his partner Niki set out on the same
                route. They reached roughly {facts.previousKm} km before immune
                issues forced a stop. That taught them more than a clean finish
                could have.
              </p>
            </div>
          </div>

          {/* Panel 4 — What's different this time */}
          <div className={panel}>
            <div className="flex h-full flex-col justify-center px-6 py-24 sm:px-14">
              <p className="text-kicker text-atlantic-bright">
                What&apos;s different this time
              </p>
              <ul className="mt-8 max-w-xl space-y-6">
                {[
                  [
                    "Time off, fully",
                    "Last time Jonathan coached throughout. This time he steps away from work entirely to give the run everything.",
                  ],
                  [
                    "Backed by partners",
                    "Brand partners are supporting the effort — from nutrition to recovery to the miles in between.",
                  ],
                  [
                    "A smarter route",
                    "The line has been re-drawn to work with the terrain rather than fight it.",
                  ],
                ].map(([title, body], i) => (
                  <li key={title} className="flex gap-5">
                    <span className="numeral text-2xl text-atlantic-bright">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display-tight text-xl text-snow">
                        {title}
                      </h3>
                      <p className="mt-1 text-snow-dim">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Panel 5 — Niki / the support engine.
              NOTE: uses an empty coastal road rather than the van-interior
              photo, whose driver couldn't be confirmed as Niki. Swap in a real
              photo of Niki here if one is available (see PLACEHOLDERS.md). */}
          <div className={panel}>
            <Image
              src="/images/coast-road.jpg"
              alt="An empty road tracing the cliffs above the Atlantic — the support route."
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/50 to-transparent" />
            <div className="relative flex h-full flex-col justify-center px-6 py-24 sm:px-14">
              <p className="text-kicker text-snow/60">The support engine</p>
              <p className="mt-5 max-w-md font-display-tight text-2xl leading-snug sm:text-4xl">
                Niki drives the van, runs the logistics, and keeps morale up
                when the coastline doesn&apos;t.
              </p>
            </div>
          </div>

          {/* Panel 6 — Why: men's mental health + CTA */}
          <div className={panel}>
            <Image
              src="/images/embrace.jpg"
              alt="Jonathan embracing a friend, a raw moment of relief and connection."
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-night/72" />
            <div className="relative flex h-full flex-col justify-center px-6 py-24 sm:px-14">
              <p className="text-kicker text-atlantic-bright">Why run it</p>
              <h3 className="mt-5 font-display text-display-sm max-w-[14ch]">
                For the men who carry it in silence.
              </h3>
              <p className="mt-6 max-w-md text-lg text-snow-dim">
                The run raises awareness and funds for {facts.cause} — proof
                that people are capable of far more than they assume, and that
                asking for support is part of going the distance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="follow-portugal"
                  data-cta-location="portugal"
                  className="btn btn-snow group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Follow the run
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={siteLinks.sponsorPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="sponsor-pdf"
                  data-cta-location="portugal"
                  className="btn btn-ghost-dark inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Sponsor deck
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal progress line */}
        {h && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-night-rule">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-atlantic-bright"
            />
          </div>
        )}
      </div>
    </section>
  );
}
