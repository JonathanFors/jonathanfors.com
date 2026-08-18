"use client";

import { useId, useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons";
import { beehiivMagicLink } from "@/lib/site";

type Props = {
  /** Button label — the only word that changes between the two forms. */
  action: string;
  /** `utm_medium` value: what tells the two forms apart in beehiiv. */
  utmMedium: string;
  /** Surface it sits on. Drives the input's colours, nothing else. */
  tone?: "ink" | "paper";
  className?: string;
};

type State = "idle" | "sending" | "done" | "error";

/**
 * Newsletter / waitlist signup.
 *
 * Submits to our own /api/subscribe, which talks to beehiiv server-side, so the
 * signup completes in place — no redirect to beehiiv's confirmation page.
 *
 * The markup is still a real <form> pointed at beehiiv's magic link, and that
 * link is used two ways: as the no-JavaScript path, and as the fallback if the
 * API call fails (no key configured, beehiiv down). Signups therefore keep
 * working in every case; only the nicest path needs the key.
 */
export default function SubscribeForm({
  action,
  utmMedium,
  tone = "ink",
  className,
}: Props) {
  const [state, setState] = useState<State>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const onInk = tone === "ink";

  /** Hands off to the magic link in a new tab — the original behaviour. */
  const fallbackToMagicLink = () => {
    const form = formRef.current;
    if (!form) return;
    form.target = "_blank";
    form.submit();
    setState("done");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;

    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !email) return;

    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, utmMedium }),
      });
      if (res.ok) {
        setState("done");
        return;
      }
      if (res.status === 400) {
        setState("error");
        return;
      }
      // Not configured, or beehiiv refused — send them the long way round.
      fallbackToMagicLink();
    } catch {
      fallbackToMagicLink();
    }
  };

  if (state === "done") {
    return (
      <div className={className}>
        <p
          aria-live="polite"
          className={`flex items-center gap-3 border-2 px-4 py-3.5 ${
            onInk
              ? "border-red bg-red/10 text-snow"
              : "border-red bg-red/10 text-ink"
          }`}
        >
          <ArrowIcon className="h-4 w-4 shrink-0 text-red" />
          <span className="club-label text-[0.68rem]">
            You&apos;re in — check your inbox
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        ref={formRef}
        action={beehiivMagicLink}
        method="get"
        rel="noopener noreferrer"
        onSubmit={onSubmit}
        data-cta="newsletter-subscribe"
        data-cta-location={utmMedium}
        className="flex w-full flex-col gap-2.5 sm:flex-row sm:gap-0"
      >
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          aria-invalid={state === "error"}
          className={`min-w-0 flex-1 border-2 px-4 py-3.5 text-base outline-none transition-colors sm:border-r-0 ${
            onInk
              ? "border-snow/30 bg-transparent text-snow placeholder:text-snow-dim focus:border-red"
              : "border-ink/25 bg-paper text-ink placeholder:text-ink-faint focus:border-red"
          }`}
        />
        {/* Squared off, not the skewed club button: it sits flush to the input. */}
        <button
          type="submit"
          disabled={state === "sending"}
          className="club-label group inline-flex shrink-0 items-center justify-center gap-2.5 border-2 border-red bg-red px-6 py-3.5 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : action}
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        {/* Only read on the no-JavaScript path; the fetch sends its own copy. */}
        <input type="hidden" name="utm_medium" value={utmMedium} />
      </form>

      {state === "error" && (
        <p
          aria-live="polite"
          className={`mt-3 text-sm ${onInk ? "text-red-bright" : "text-red"}`}
        >
          That email doesn&apos;t look right — check it and try again.
        </p>
      )}
    </div>
  );
}
