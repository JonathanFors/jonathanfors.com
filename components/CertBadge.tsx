type Props = {
  className?: string;
};

/**
 * Circular "UESCA Certified" seal. The outer text ring rotates slowly
 * (paused under prefers-reduced-motion, handled in globals.css via .seal-ring).
 * Inherits `currentColor` for the ring/lettering; the check uses the accent.
 */
export default function CertBadge({ className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="UESCA Certified Ultrarunning Coach"
    >
      <defs>
        <path
          id="cert-seal-path"
          fill="none"
          d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
        />
      </defs>

      <g className="seal-ring">
        <circle
          cx="100"
          cy="100"
          r="97"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
        <text
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="4"
          fill="currentColor"
        >
          <textPath href="#cert-seal-path" startOffset="0">
            UESCA CERTIFIED · ULTRARUNNING COACH ·
          </textPath>
        </text>
      </g>

      {/* Center mark (static) */}
      <path
        d="M85 97 l9 9 l19 -22"
        fill="none"
        stroke="var(--atlantic-bright)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        letterSpacing="2"
        fill="currentColor"
      >
        UESCA
      </text>
    </svg>
  );
}
