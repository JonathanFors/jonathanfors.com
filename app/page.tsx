import ParallaxHero from "@/components/ParallaxHero";
import SponsorGrid from "@/components/SponsorGrid";
import { CalendarIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { siteLinks } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* 1 — Coach intro hero */}
      <section className="relative border-b border-border">
        <div className="mx-auto w-full max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-slate-grey">
            Ultra Endurance Running Coach
          </p>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-bright-snow sm:text-6xl">
            Jonathan Fors
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pale-slate sm:text-xl">
            I coach runners chasing distances that scare them. From your first
            ultra to a hundred-miler, I build training that balances load,
            recovery, and mindset — so you reach the start line ready and the
            finish stronger than you thought possible.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={siteLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-bright-snow px-6 py-3 text-sm font-medium text-carbon-black transition-colors hover:bg-platinum"
            >
              <CalendarIcon className="h-4 w-4" />
              Book an intro call
            </a>
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-platinum transition-colors hover:border-slate-grey hover:text-bright-snow"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-platinum transition-colors hover:border-slate-grey hover:text-bright-snow"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* 2 — Full-bleed parallax image */}
      <ParallaxHero
        image="/images/2024_11_29_FTC_Jules_Jonathan-20.jpeg"
        eyebrow="A 900km run for men's mental health"
        title="Project Portugal 2026"
        subtitle="Running the entire coastline of Portugal — starting August 1st."
      />

      {/* 3 — Project description (narrow rich text) */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-2xl px-6 py-20 sm:py-28">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-slate-grey">
            The Project
          </p>
          <div className="prose text-lg">
            <p>
              In August 2026, I&apos;m setting out to run the entire coastline of
              Portugal — <strong>roughly 900 kilometres</strong> — beginning on
              the 1st of August.
            </p>
            <p>
              This is a second attempt. Two years ago, my girlfriend Niki and I
              set out to do the very same thing. We made it around{" "}
              <strong>480 kilometres</strong>
              {" "}before immune system issues forced
              us to stop. That outcome taught us more than any clean success
              could have, and we&apos;ve spent the time since recalibrating —
              training harder, resting smarter, and rebuilding the plan from the
              ground up.
            </p>
            <p>
              This time we&apos;ve made deliberate changes to give us the best
              possible shot.{" "}
              <strong>I&apos;m taking time off work entirely</strong>
              {" "}— last time I was coaching throughout — we&apos;re collaborating with brand
              partners to support the effort, and we&apos;ve adjusted the route to
              work with the terrain rather than against it. Niki drives the
              support vehicle, keeps the logistics running, and supplies an
              endless stream of good vibes along the way.
            </p>
            <p>
              I&apos;m doing this to push my own limits, and to prove something I
              believe deeply: that humans are capable of going far further than
              most people think. But this run is about more than distance.
              I&apos;m using the project to raise awareness — and funds — for{" "}
              <strong>men&apos;s mental health</strong>, something far too many
              carry in silence.
            </p>
            <p>900 kilometres. One coastline. Let&apos;s go further.</p>
          </div>
        </div>
      </section>

      {/* 4 — Sponsors */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-10 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-grey">
              Partners &amp; Sponsors
            </p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-bright-snow sm:text-3xl">
              Back the run. Reach a community that goes the distance.
            </h2>
          </div>

          <SponsorGrid email={siteLinks.email} />
        </div>
      </section>

      {/* 5 — Footer */}
      <footer className="mt-auto">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-10">
          <nav className="flex items-center gap-6 text-sm">
            <a
              href={siteLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pale-slate-2 transition-colors hover:text-bright-snow"
            >
              Book a call
            </a>
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pale-slate-2 transition-colors hover:text-bright-snow"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pale-slate-2 transition-colors hover:text-bright-snow"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
