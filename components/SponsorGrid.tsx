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

export default function SponsorGrid({ email }: { email: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (index: number) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers without clipboard API / insecure contexts
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
            aria-label={`Become a sponsor — copy ${email} to clipboard`}
            className="group flex min-h-52 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center transition-colors hover:border-slate-grey hover:bg-surface/70 focus:outline-none focus-visible:border-slate-grey focus-visible:ring-2 focus-visible:ring-slate-grey"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                copied
                  ? "border-bright-snow text-bright-snow"
                  : "border-border text-slate-grey group-hover:border-slate-grey group-hover:text-bright-snow"
              }`}
            >
              {copied ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </span>
            <span
              className={`text-sm font-medium transition-colors ${
                copied
                  ? "text-bright-snow"
                  : "text-pale-slate-2 group-hover:text-bright-snow"
              }`}
            >
              {copied ? "Email copied!" : "Become a sponsor"}
            </span>
            <span
              className={`text-xs transition-opacity ${
                copied ? "text-slate-grey opacity-100" : "opacity-0"
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
