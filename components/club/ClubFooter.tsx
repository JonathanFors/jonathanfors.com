import Wordmark from "@/components/club/Wordmark";
import { InstagramIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { clubNav, facts, siteLinks } from "@/lib/site";

export default function ClubFooter() {
  return (
    <footer className="club club-on-ink bg-ink text-snow">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <Wordmark size="md" />
            <p className="mt-6 max-w-xs leading-relaxed text-snow-dim">
              Ultra-endurance running coach, {facts.certification}. Coaching
              built around the whole athlete.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <p className="club-label text-snow-dim">Page</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {clubNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-snow transition-colors hover:text-red-bright"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="club-label text-snow-dim">Start</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={siteLinks.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="book-intro-call"
                    data-cta-location="footer"
                    className="text-snow transition-colors hover:text-red-bright"
                  >
                    Book a 1:1 call
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteLinks.email}`}
                    className="inline-flex items-center gap-2 text-snow transition-colors hover:text-red-bright"
                  >
                    <MailIcon className="h-4 w-4" />
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="club-label text-snow-dim">Elsewhere</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={siteLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-snow transition-colors hover:text-red-bright"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={siteLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-snow transition-colors hover:text-red-bright"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t-2 border-snow/15 pt-6 text-xs text-snow-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jonathan Fors. All rights reserved.</p>
          <p>
            {facts.ranKm} km down the coast of Portugal for {facts.cause}.
          </p>
        </div>
      </div>
    </footer>
  );
}
