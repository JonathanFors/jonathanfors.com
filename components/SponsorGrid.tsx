"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/icons";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Open sponsor slots. Each is a placeholder — TODO:CONTENT swap for real
 * partner logos as they come on board. Clicking copies the contact email.
 */
export default function SponsorGrid({ email }: { email: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (index: number) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedIndex(index);
    window.setTimeout(
      () => setCopiedIndex((current) => (current === index ? null : current)),
      2000,
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => {
        const copied = copiedIndex === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleCopy(i)}
            data-cta="become-a-sponsor"
            data-cta-location="sponsors"
            aria-label={`Become a sponsor — copy ${email} to clipboard`}
            className="group flex min-h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-rule bg-paper-dim/50 p-8 text-center transition-colors hover:border-atlantic hover:bg-paper-dim focus:outline-none"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                copied
                  ? "border-atlantic bg-atlantic text-snow"
                  : "border-rule text-ink-faint group-hover:border-atlantic group-hover:text-atlantic"
              }`}
            >
              {copied ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </span>
            <span
              className={`text-sm font-semibold transition-colors ${
                copied ? "text-atlantic" : "text-ink group-hover:text-atlantic"
              }`}
            >
              {copied ? "Email copied" : "Your brand here"}
            </span>
            <span
              className={`text-xs transition-opacity ${
                copied ? "text-ink-faint opacity-100" : "opacity-0"
              }`}
            >
              {email}
            </span>
          </button>
        );
      })}
    </div>
  );
}
