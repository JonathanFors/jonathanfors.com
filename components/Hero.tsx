"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { siteLinks } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import { MOVEMENT_ICONS } from "@/components/movementIcons";

// Placeholder — swap for real results once Jonathan has a list.
const ACHIEVEMENTS = [
  "Achievement 01",
  "Achievement 02",
  "Achievement 03",
  "Achievement 04",
  "Achievement 05",
  "Achievement 06",
];

// Deterministic pseudo-random — integer-only bit mixing (no Math.sin/cos),
// so the result is bit-identical on the server and the client. Transcendental
// functions like Math.sin can differ by a ULP between JS engines, which is
// enough to break SSR hydration once you're multiplying by 10000.
function rand(seed: number) {
  let x = (seed | 0) + 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  x = x ^ (x >>> 16);
  return (x >>> 0) / 4294967296;
}

const GRID_COLS = 7;
const GRID_ROWS = 4;

const ICON_GRID = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => {
  const col = i % GRID_COLS;
  const row = Math.floor(i / GRID_COLS);
  const cellW = 100 / GRID_COLS;
  const cellH = 100 / GRID_ROWS;
  const left = col * cellW + cellW / 2 + (rand(i * 2 + 1) - 0.5) * cellW * 0.55;
  const top = row * cellH + cellH / 2 + (rand(i * 2 + 2) - 0.5) * cellH * 0.55;
  const rotate = (rand(i * 3 + 1) - 0.5) * 32;
  const size = 26 + rand(i * 4 + 1) * 16;
  const Icon = MOVEMENT_ICONS[Math.floor(rand(i * 5 + 1) * MOVEMENT_ICONS.length)];
  const dur = 5 + rand(i * 6 + 1) * 4;
  const delay = rand(i * 7 + 1) * 8;
  return { i, left, top, rotate, size, Icon, dur, delay };
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  // Cursor-follow reveal — desktop / real pointers only. Touch relies on the
  // CSS ambient-glow loop instead (see .hero-icon-layer in globals.css).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const setPos = (x: number, y: number) => {
      frame.current = 0;
      section.style.setProperty("--hero-mx", `${x}px`);
      section.style.setProperty("--hero-my", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => setPos(x, y));
      }
    };
    const onLeave = () => setPos(-9999, -9999);

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper"
      style={{ "--hero-mx": "-50%", "--hero-my": "-50%" } as CSSProperties}
      aria-label="Jonathan Fors — ultra-endurance running coach"
    >
      {/* Background icon grid — revealed near the cursor on desktop,
          ambiently glowing on a loop on touch devices. */}
      <div
        aria-hidden="true"
        className="hero-icon-layer pointer-events-none absolute inset-0 text-ink"
      >
        {ICON_GRID.map(({ i, left, top, rotate, size, Icon, dur, delay }) => (
          <Icon
            key={i}
            className="hero-icon absolute"
            style={
              {
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                "--dur": `${dur}s`,
                "--delay": `${delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Content — centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-36">
        <p className="eyebrow text-red">
          Ultra-Endurance Running Coach · UESCA-Certified
        </p>

        <h1 className="mt-6 font-display text-display text-balance text-ink">
          1:1 coaching for ultra runners
        </h1>

        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ink-soft">
          Holistic coaching for ambitious runners with jobs, families, and a
          long race on the horizon. The training is built to fit your life —
          not the other way around.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={siteLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="book-intro-call"
            data-cta-location="hero"
            className="btn btn-red btn-label group inline-flex items-center justify-center gap-2 rounded-[2px] border border-transparent px-6 py-3.5"
          >
            Book 1:1 call
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#coaching"
            data-cta="how-it-works"
            data-cta-location="hero"
            className="btn btn-ink-outline btn-label inline-flex items-center justify-center gap-2 rounded-[2px] border px-6 py-3.5"
          >
            How does it work
          </a>
        </div>
      </div>

      {/* Achievements marquee — placeholder content */}
      <div className="no-scrollbar relative z-10 overflow-hidden border-t border-rule py-5">
        <div className="marquee-track flex w-max items-center gap-10">
          {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap"
            >
              <span className="eyebrow text-ink-faint">{item}</span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-red"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
