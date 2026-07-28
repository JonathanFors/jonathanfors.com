import Link from "next/link";
import type { Metadata } from "next";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Athlete Intake",
  description:
    "Tell me about your running and your goals. A short intake form to get started with coaching.",
  robots: { index: false, follow: false },
};

const formSrc =
  "https://jonathanfors.notion.site/ebd/39851b7e1c7b802f8594eb51f62161ff";

export default function AthleteIntake() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-faint transition-colors hover:text-atlantic"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          Jonathan Fors
        </Link>
        <h1 className="mt-6 font-display text-display-sm text-ink">
          Athlete intake
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Tell me about your running, your history, and where you want to go. It
          takes a few minutes and helps me tailor everything to you.
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
