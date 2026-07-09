import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athlete Intake — Jonathan Fors",
  description:
    "Tell me about your running and your goals. A short intake form to get started with coaching.",
  robots: { index: false, follow: false },
};

const formSrc =
  "https://jonathanfors.notion.site/ebd/39851b7e1c7b802f8594eb51f62161ff";

export default function AthleteIntake() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-10 sm:py-14">
      <header className="mb-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-bright-snow"
        >
          Jonathan Fors
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-bright-snow sm:text-4xl">
          Athlete Intake
        </h1>
        <p className="mt-3 max-w-xl text-pale-slate">
          Tell me about your running, your history, and where you want to go. It
          takes a few minutes and helps me tailor everything to you.
        </p>
      </header>

      <iframe
        src={formSrc}
        title="Athlete intake form"
        className="w-full flex-1 rounded-2xl border border-border bg-surface/30"
        style={{ minHeight: 600 }}
        allowFullScreen
      />
    </main>
  );
}
