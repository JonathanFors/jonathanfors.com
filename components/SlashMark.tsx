import type { SVGProps } from "react";

/**
 * The logo mark: three leaning bars. Inherits `currentColor`, so it works on
 * paper (black) and on ink (paper or red) without variants.
 */
export default function SlashMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 44 40"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 0h8L8 40H0z" />
      <path d="M23 0h8L21 40h-8z" />
      <path d="M36 0h8L34 40h-8z" />
    </svg>
  );
}
