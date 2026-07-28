type Props = { className?: string };

/**
 * The topographic-contour brandmark (same motif as the favicon), drawn with
 * no tile so it can sit on any background: the rings inherit `currentColor`
 * and only the summit dot keeps the fixed Atlantic accent.
 */
export default function ContourMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        transform="rotate(-14 50 50)"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      >
        <rect x="20" y="26" width="60" height="48" rx="24" />
        <rect x="32" y="37" width="36" height="26" rx="13" />
      </g>
      <circle cx="50" cy="50" r="6.5" fill="#39b6c8" />
    </svg>
  );
}
