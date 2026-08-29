"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowIcon, ChevronDownIcon } from "@/components/icons";
import { beehiivMagicLink, experienceLevels } from "@/lib/site";

type Props = {
  /** Button label — the only word that changes between the two forms. */
  action: string;
  /** `utm_medium` value: what tells the two forms apart in beehiiv. */
  utmMedium: string;
  /**
   * Ask the two waitlist questions — first name, and running experience —
   * alongside the address.
   *
   * On for the group coaching waitlist, off for the newsletter. The waitlist
   * ends in a draw, five personal emails and groups that have to be matched on
   * level, so both answers do work there; the newsletter only ever needs
   * somewhere to send an edition.
   *
   * Both are required where they appear. An optional question on a three-field
   * form is mostly left blank, and a half-filled list can't be segmented on,
   * which is the whole point of asking. They ride along to beehiiv as custom
   * fields — see `app/api/subscribe/route.ts` and `beehiivFields` in
   * `lib/site.ts`.
   */
  waitlistDetails?: boolean;
  /**
   * Click-tracking label, when one page carries the same form more than once.
   * Defaults to `utmMedium`, which is all a single-form page needs.
   */
  location?: string;
  /**
   * Reassurance under the field ("no payment details", "unsubscribe whenever").
   * Rendered only before the signup goes through — once it has, it's answering
   * a question the reader has stopped asking.
   */
  note?: string;
  /** Extra line under the confirmation — what happens next, if it's worth saying. */
  successNote?: string;
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
 * working in every case; only the nicest path needs the key. Note the magic
 * link takes an address and nothing else, so on that path the two waitlist
 * answers are lost — the address, which is the thing that can't be recovered
 * later, always gets through.
 */
export default function SubscribeForm({
  action,
  utmMedium,
  waitlistDetails = false,
  location,
  note,
  successNote,
  tone = "ink",
  className,
}: Props) {
  const [state, setState] = useState<State>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const onInk = tone === "ink";

  /**
   * Shared field styling — the name, the level and the address are all the
   * same control.
   *
   * text-base, not text-sm: iOS zooms the page in on focus for anything under
   * 16px.
   */
  const fieldClass = `min-w-0 border-2 px-4 py-3.5 text-base outline-none transition-colors ${
    onInk
      ? "border-snow/30 bg-transparent text-snow placeholder:text-snow-dim focus:border-red"
      : "border-ink/25 bg-paper text-ink placeholder:text-ink-faint focus:border-red"
  }`;

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

    const fields = new FormData(event.currentTarget);
    const email = fields.get("email");
    if (typeof email !== "string" || !email) return;

    // Only present on the waitlist forms. The newsletter forms send neither,
    // and the endpoint then leaves both custom fields alone.
    const firstName = fields.get("first_name");
    const experience = fields.get("experience_level");

    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          utmMedium,
          firstName: typeof firstName === "string" ? firstName : undefined,
          experience: typeof experience === "string" ? experience : undefined,
        }),
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

  /**
   * Announce a completed signup to the rest of the page. A page carrying the
   * form more than once needs to know it has been filled in — the sticky bar
   * on /waitlist retires itself on this rather than following someone down the
   * page asking for details they have already given.
   *
   * Same vendor-free CustomEvent pattern as CtaTracker.
   */
  useEffect(() => {
    if (state !== "done") return;
    window.dispatchEvent(
      new CustomEvent("subscribe:success", {
        detail: { utmMedium, location: location ?? utmMedium },
      }),
    );
  }, [state, utmMedium, location]);

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
        {successNote && (
          <p
            className={`mt-3 text-sm leading-relaxed ${
              onInk ? "text-snow-dim" : "text-ink-faint"
            }`}
          >
            {successNote}
          </p>
        )}
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
        data-cta-location={location ?? utmMedium}
        className="flex w-full flex-col gap-2.5"
      >
        {waitlistDetails && (
          // Name and level share a row from 640px up: two short answers, and
          // stacking them would put three full-width rows above the button.
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <label htmlFor={`${id}-name`} className="sr-only">
              First name
            </label>
            <input
              id={`${id}-name`}
              type="text"
              name="first_name"
              required
              autoComplete="given-name"
              // beehiiv stores this as free text; the cap is only here so a
              // paste-bomb can't reach the API. Matches the server's.
              maxLength={80}
              placeholder="First name"
              className={`${fieldClass} sm:flex-1`}
            />

            <div className="relative sm:flex-1">
              <label htmlFor={`${id}-experience`} className="sr-only">
                Running experience
              </label>
              <select
                id={`${id}-experience`}
                name="experience_level"
                required
                defaultValue=""
                // `invalid:` is the empty first option still being selected —
                // the same greyed-out reading a placeholder gives a text field,
                // which a <select> has no way to express on its own.
                className={`${fieldClass} w-full appearance-none pr-11 ${
                  onInk ? "invalid:text-snow-dim" : "invalid:text-ink-faint"
                }`}
              >
                <option value="" disabled>
                  Experience level
                </option>
                {experienceLevels.map((level) => (
                  // Coloured explicitly: the open dropdown is drawn by the OS,
                  // which won't inherit the field's colours on a dark surface.
                  <option key={level} value={level} className="bg-paper text-ink">
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${
                  onInk ? "text-snow-dim" : "text-ink-faint"
                }`}
              />
            </div>
          </div>
        )}

        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:gap-0">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            aria-invalid={state === "error"}
            className={`${fieldClass} flex-1 sm:border-r-0`}
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
        </div>
        {/* Only read on the no-JavaScript path; the fetch sends its own copy. */}
        <input type="hidden" name="utm_medium" value={utmMedium} />
      </form>

      {note && (
        <p
          className={`mt-4 text-sm leading-relaxed ${
            onInk ? "text-snow-dim" : "text-ink-faint"
          }`}
        >
          {note}
        </p>
      )}

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
