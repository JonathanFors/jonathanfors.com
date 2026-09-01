import type { Metadata } from "next";
import Link from "next/link";
import { legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Athlete Intake",
  description:
    "Tell me about your running and your goals. A short intake form to get started with coaching.",
  robots: { index: false, follow: false },
};

const formSrc =
  "https://jonathanfors.notion.site/ebd/39851b7e1c7b802f8594eb51f62161ff";

/**
 * Athlete intake. Still unlinked and noindex — Jonathan sends the URL by hand —
 * but it now sits under the site nav like every other page, which replaces the
 * "← Jonathan Fors" back-link this page used to carry. The padding reserves the
 * fixed nav's height; the page itself is still on the old editorial styles.
 */
export default function AthleteIntake() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28">
      <header className="mb-8">
        <h1 className="font-display text-display-sm text-ink">
          Athlete intake
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Tell me about your running, your history, and where you want to go. It
          takes a few minutes and helps me tailor everything to you.
        </p>
        {/* The most sensitive form on the site — injuries, conditions, health —
            so the policy is linked here as well as in the footers. The form
            itself is hosted by Notion, which §6 of the policy names. */}
        <p className="mt-4 text-sm text-ink-faint">
          Your answers are used to coach you and nothing else. What happens to
          them is set out in the{" "}
          <Link
            href={legal.privacy}
            className="underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-ink"
          >
            privacy policy
          </Link>
          .
        </p>
      </header>

      <iframe
        src={formSrc}
        title="Athlete intake form"
        className="w-full flex-1 rounded-sm border border-rule bg-paper-dim/40"
        style={{ minHeight: 600 }}
        allowFullScreen
      />
    </main>
  );
}
