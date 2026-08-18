import Image from "next/image";

type Props = {
  className?: string;
  /** Height of the lockup. The logo keeps its own 718:176 ratio. */
  size?: "sm" | "md" | "lg";
  /**
   * "light" is the dark-surface variant (tagline and slash bars in snow);
   * "dark" is the original artwork, for paper surfaces.
   */
  tone?: "light" | "dark";
};

const HEIGHTS = { sm: 36, md: 48, lg: 68 } as const;
const RATIO = 718 / 176;

/**
 * The logo, from the artwork in public/images. Two files, same lockup: the
 * original (red + black) for paper, and a recoloured copy (red + snow) for
 * ink surfaces, since the tagline and bars are black in the original.
 */
export default function Wordmark({
  className,
  size = "sm",
  tone = "light",
}: Props) {
  const h = HEIGHTS[size];
  return (
    <Image
      src={tone === "light" ? "/images/logo-jonathan-light.png" : "/images/logo-jonathan.png"}
      alt="Jonathan — Ultra Running Coach"
      width={Math.round(h * RATIO)}
      height={h}
      priority
      className={`h-auto w-auto ${className ?? ""}`}
      style={{ height: h }}
    />
  );
}
