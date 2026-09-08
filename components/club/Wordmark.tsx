import Image from "next/image";

import { brand } from "@/lib/site";

type Props = {
  className?: string;
  /** Height of the lockup. Each variant keeps its own ratio. */
  size?: "sm" | "md" | "lg";
  /**
   * "light" is the dark-surface variant (the `-dark` artwork, whose red is
   * `#ff5c48` because the paper red loses contrast on black); "dark" is the
   * paper artwork, for light surfaces.
   */
  tone?: "light" | "dark";
  /**
   * "stacked" is ULTRA over ENDURANT — the default, and what to use anywhere
   * with room. "line" is the single-line cut for wide, shallow slots; it is
   * the only one that survives below 36px.
   */
  variant?: "stacked" | "line";
};

const HEIGHTS = { sm: 36, md: 48, lg: 68 } as const;

/**
 * The logo, placed from the artwork in `public/logo/` — which is copied from
 * `../Ultra Endurant/Logos/`, the generated source of truth.
 *
 * **Do not typeset this by hand.** The lockup's rules live with the artwork
 * (`Ultra Endurant/Logos/README.md`): ULTRA is tracked out to lock flush
 * against the wider ENDURANT, and the mark is "Overrun" — three ink lanes and
 * a fourth, red, running 64% past them, which is the whole idea of the name.
 * Setting the type here instead would drift from every other place the logo
 * appears. A new arrangement belongs in that folder's `build.py` so it stays
 * reproducible; then copy the export here.
 *
 * The type is outlined in the SVGs, so nothing depends on Roboto Condensed
 * being available.
 *
 * ⚠️ `w`/`h` below are the artwork's own viewBox, and they set the aspect
 * ratio the image is drawn at. Re-export the lockups and these numbers have to
 * be re-read from the new SVGs — a stale pair silently stretches the logo.
 */
const ART = {
  stacked: { w: 625.67, h: 152.14, file: "ultra-endurant-lockup" },
  line: { w: 797.0, h: 87.64, file: "ultra-endurant-lockup-line" },
} as const;

export default function Wordmark({
  className,
  size = "sm",
  tone = "light",
  variant = "stacked",
}: Props) {
  const art = ART[variant];
  const h = HEIGHTS[size];
  const w = Math.round(h * (art.w / art.h));

  return (
    <Image
      // `tone="light"` means a light mark for a dark surface — which is the
      // artwork's `-dark` twin, named for the surface rather than the ink.
      src={`/logo/${art.file}${tone === "light" ? "-dark" : ""}.svg`}
      alt={`${brand.name} — ultramarathon coaching with ${brand.coach}`}
      width={w}
      height={h}
      priority
      className={`h-auto w-auto ${className ?? ""}`}
      style={{ height: h }}
    />
  );
}
