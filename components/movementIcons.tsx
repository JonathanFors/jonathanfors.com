import type { SVGProps } from "react";

/**
 * Small line-art glyphs for the hero's background icon grid — one per
 * movement/workout. Same convention as icons.tsx (24x24, currentColor,
 * 1.6 stroke). Placeholder set — swap for sourced icons via MOVEMENT_ICONS
 * below without touching Hero.tsx.
 */

function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function RunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 16.2c0-1.3 1.3-1.9 2.9-2.3l3.8-1.4c.9-1.6 2.6-2.8 4.7-2.8 1.9 0 3.3 1.1 3.8 2.3.8.1 1.9.6 1.9 1.9 0 1.4-1.4 2.3-3.3 2.3H6.2c-1.6 0-3.2-.4-3.2-1.9Z" />
      <path d="M9.2 12.2 10 13.7M11.5 11.3l.9 1.9M13.8 11l.7 2.1" />
    </svg>
  );
}

export function BikeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="17" r="3.1" />
      <circle cx="18" cy="17" r="3.1" />
      <path d="M6 17 10 9h3.5L18 17M10 9h3M14.3 9 17.6 17M9 17h5" />
    </svg>
  );
}

export function SwimIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 9c1.4-1.5 2.9-1.5 4.3 0s2.9 1.5 4.3 0 2.9-1.5 4.3 0 2.9 1.5 4.3 0" />
      <path d="M3 14c1.4-1.5 2.9-1.5 4.3 0s2.9 1.5 4.3 0 2.9-1.5 4.3 0 2.9 1.5 4.3 0" />
      <path d="M3 19c1.4-1.5 2.9-1.5 4.3 0s2.9 1.5 4.3 0 2.9-1.5 4.3 0 2.9 1.5 4.3 0" />
    </svg>
  );
}

export function StrengthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="2.3" y="9.3" width="3" height="5.4" rx="1" />
      <rect x="18.7" y="9.3" width="3" height="5.4" rx="1" />
      <path d="M5.3 12h13.4" />
      <path d="M8 10v4M16 10v4" />
    </svg>
  );
}

export function StretchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="4.6" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 7v6M12 9.2 7.3 6.4M12 9.2l4.7-2.8M12 13l-4 6.4M12 13l4 6.4" />
    </svg>
  );
}

export function RopeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="5" cy="6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1.3" fill="currentColor" stroke="none" />
      <path d="M5 6c10 1 12 5 12 6s-2 5-12 6" />
    </svg>
  );
}

export function PulseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 12h3.4l1.8-5.5L11.4 18l2-9 1.3 3H21" />
    </svg>
  );
}

export function StopwatchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5V9" />
      <path d="M9.3 2.5h5.4M12 2.5V4.6" />
      <path d="m18.6 6 1.3-1.3" />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="m15 9-2 6-6 2 2-6 6-2Z"
        fill="currentColor"
        stroke="none"
        opacity="0.9"
      />
    </svg>
  );
}

export function PeaksIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M2.3 18.5 8 8l3.4 5.6L14 10l7.7 8.5Z" />
      <path d="m8 8 1.7 2.8" />
    </svg>
  );
}

export function ElevationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 18 7 12l3 3 5-8 6 11" />
      <path d="m17 8 3-.3.3 3" />
    </svg>
  );
}

export function TrailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 20c3-1 3-4 6-4s2 4 5 4 2-5 5-5 2 3 4 2" />
      <circle cx="20" cy="6" r="2" />
      <path d="M20 8v3" />
    </svg>
  );
}

export const MOVEMENT_ICONS = [
  RunIcon,
  BikeIcon,
  SwimIcon,
  StrengthIcon,
  StretchIcon,
  RopeIcon,
  PulseIcon,
  StopwatchIcon,
  CompassIcon,
  PeaksIcon,
  ElevationIcon,
  TrailIcon,
];
