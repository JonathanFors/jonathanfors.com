import type { Metadata } from "next";
import LegalPage, {
  A,
  dl,
  h,
  note,
  p,
  ul,
  type LegalSection,
} from "@/components/legal/LegalPage";
import { legal, siteLinks } from "@/lib/site";

/**
 * Privacy policy.
 *
 * Written to describe what the site and the coaching actually do, not from a
 * generator — every processor named below is one this codebase really talks to
 * (beehiiv in `app/api/subscribe/route.ts`, Meta in `components/MetaPixel.tsx`,
 * TidyCal in `components/BookingModal.tsx`, Notion in `app/athlete-intake`,
 * YouTube in `components/videos/VideoEmbed.tsx`, Vercel as the host). If a
 * vendor is added or dropped, §5 and §6 change with it.
 *
 * §4 says outright that there is no cookie banner. That is deliberate: it is
 * the true description of what happens on arrival, and a policy that implied
 * otherwise would be worse than one that doesn't mention it. Adding a banner
 * that gates the pixel is the open item — see PROJECT_UPDATES.md.
 *
 * The wording is mirrored in `COPY.md` §14.
 */

const title = "Privacy policy";
const description =
  "What Jonathan Fors coaching collects, why, who it goes to, and how to get it back or have it deleted. Written in plain English rather than boilerplate.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: legal.privacy },
  openGraph: {
    title: `${title} — Jonathan Fors`,
    description,
    url: `https://jonathanfors.com${legal.privacy}`,
    siteName: "Jonathan Fors",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title, description },
};

const email = (
  <A href={`mailto:${siteLinks.email}`}>{siteLinks.email}</A>
);

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      p(
        <>
          The site you&apos;re reading is <strong>jonathanfors.com</strong>, the
          coaching practice of Jonathan Fors. The company behind it — and the
          data controller responsible for the personal data described here — is{" "}
          <strong>{legal.company}</strong>, registered at {legal.address}.
        </>,
      ),
      p(
        <>
          &quot;We&quot; and &quot;us&quot; below mean that company.
          &quot;I&quot; means Jonathan, because most of what follows is one
          person reading your email and writing your training plan. For anything
          about your data, write to {email} — it reaches him directly, and
          there&apos;s no separate privacy desk to route it through.
        </>,
      ),
    ],
  },
  {
    id: "what-this-covers",
    heading: "What this policy covers",
    blocks: [
      p(
        <>This policy covers everything we run:</>,
      ),
      ul([
        <>
          The website at <strong>jonathanfors.com</strong>, including the{" "}
          <A href={siteLinks.waitlist}>group coaching waitlist</A> and the{" "}
          <A href={siteLinks.newsletter}>Shuffle Club newsletter</A> pages.
        </>,
        <>The Shuffle Club newsletter itself.</>,
        <>The intro call booking page and the athlete intake form.</>,
        <>
          Coaching — one-to-one and group — including the messages, calls and
          training data that come with it.
        </>,
      ]),
      p(
        <>
          It does not cover other people&apos;s sites we link to. Instagram,
          LinkedIn and anywhere else you might follow along are governed by
          their own policies.
        </>,
      ),
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect, and why",
    blocks: [
      p(
        <>
          Grouped by what you did, because that&apos;s how it actually arrives.
          Nothing here is collected speculatively — if a field isn&apos;t on a
          form, we don&apos;t have it.
        </>,
      ),
      dl([
        {
          term: "Reading the site",
          body: (
            <>
              Page views, the page you came from, and rough location by country —
              collected by Vercel Web Analytics, which sets no cookies and
              doesn&apos;t identify you. Separately, the Meta Pixel records the
              pages you visit along with your IP address and browser, and sets a
              cookie. See §4.
            </>
          ),
        },
        {
          term: "Subscribing to the newsletter",
          body: (
            <>
              Your email address, and nothing else — that&apos;s the whole form.
              We also record which page you signed up from, so we can tell the
              newsletter apart from the waitlist.
            </>
          ),
        },
        {
          term: "Joining the group waitlist",
          body: (
            <>
              Your email address, your first name and your running experience
              level. The name is so a message doesn&apos;t open &quot;Hi
              there&quot;; the level is so groups can be matched by ability,
              which is the point of the waitlist. If you refer someone, we also
              record that a referral came from you, so the extra entry in the
              draw can be credited.
            </>
          ),
        },
        {
          term: "Booking an intro call",
          body: (
            <>
              Your name, email address, the slot you chose and anything you type
              into the booking form. This is handled by TidyCal, which also
              creates the calendar entry.
            </>
          ),
        },
        {
          term: "The athlete intake form",
          body: (
            <>
              Your running history, current training, goals, past injuries and
              any health information you choose to share. This is the most
              sensitive thing we hold, and it exists for one reason: a coach who
              doesn&apos;t know about your knee will write you a plan that hurts
              it. The form is hosted by Notion.
            </>
          ),
        },
        {
          term: "Being coached",
          body: (
            <>
              WhatsApp messages, notes from our calls, the training you log,
              how sessions went, and whatever you tell me about sleep, stress,
              work and injury along the way. Payment records too — though card
              details are handled by the payment provider and never reach us.
            </>
          ),
        },
        {
          term: "Emailing us",
          body: (
            <>
              Whatever&apos;s in the email, kept in the mailbox like any other
              correspondence.
            </>
          ),
        },
      ]),
      note(
        <>
          Some of this is <strong>health information</strong> — injuries,
          conditions, medication, how your body is holding up. Under the GDPR
          that&apos;s a special category of data, and we only hold it because
          you chose to tell us and gave explicit consent by sending it. You can
          withdraw that consent at any time, though it&apos;s worth saying
          plainly: without it, coaching you safely is guesswork.
        </>,
      ),
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    blocks: [
      h("What sets a cookie"),
      ul([
        <>
          <strong>The Meta Pixel.</strong> It loads on every page and reports
          your visit to Meta, along with your IP address, browser and the page
          you&apos;re on. It also reports when someone completes a signup, so we
          can tell whether an advert led to one. It sets cookies —{" "}
          <code className="text-sm">_fbp</code> and friends — which Meta can use
          to link your visit here to your Facebook or Instagram account.
        </>,
        <>
          <strong>TidyCal</strong>, but only once you open the booking popup.
          Nothing loads from it until you click.
        </>,
        <>
          <strong>YouTube</strong>, on the training video pages, and only when
          you press play. The embeds use the no-cookie domain, so simply loading
          the page sends nothing.
        </>,
      ]),
      h("What doesn't"),
      p(
        <>
          Vercel Web Analytics — the thing that tells us a page was read — sets
          no cookies and stores no identifiers. Our own fonts are served from
          this domain, so nothing goes to Google to render the page.
        </>,
      ),
      note(
        <>
          <strong>There is currently no cookie banner on this site.</strong> The
          Meta Pixel therefore loads as soon as a page does, before you&apos;ve
          been asked. We&apos;d rather say so here than let a policy imply a
          consent step that doesn&apos;t exist. Until that changes, the controls
          below are how to stop it.
        </>,
      ),
      h("How to refuse it"),
      ul([
        <>
          Block third-party cookies in your browser, or use its tracking
          protection — Safari, Firefox and Brave block the pixel by default.
        </>,
        <>
          Turn off off-Facebook activity and ad personalisation in your{" "}
          <A href="https://accountscenter.meta.com/" external>
            Meta account settings
          </A>
          .
        </>,
        <>
          Use any content blocker. Nothing on this site needs the pixel to work
          — every page, form and booking link works fine without it.
        </>,
      ]),
    ],
  },
  {
    id: "legal-bases",
    heading: "Why we're allowed to hold it",
    blocks: [
      p(
        <>
          The GDPR needs a legal basis for each use. Ours, in plain terms:
        </>,
      ),
      dl([
        {
          term: "Consent",
          body: (
            <>
              The newsletter, the waitlist, and the Meta Pixel&apos;s
              advertising use. You gave it by typing your address in or by
              browsing with tracking allowed, and you can take it back at any
              time — there&apos;s an unsubscribe link at the foot of every
              email.
            </>
          ),
        },
        {
          term: "Explicit consent",
          body: (
            <>
              Health and injury information, under Article 9(2)(a). You choose
              what to tell us.
            </>
          ),
        },
        {
          term: "Performing a contract",
          body: (
            <>
              Everything needed to actually coach you: your plan, your training
              data, our messages, your invoices.
            </>
          ),
        },
        {
          term: "Legitimate interests",
          body: (
            <>
              Site analytics, keeping the site secure, and keeping records of
              who we&apos;ve worked with. We&apos;ve weighed these against your
              privacy; they involve no profiling and no decisions about you.
            </>
          ),
        },
        {
          term: "Legal obligation",
          body: (
            <>
              Accounting records, which Estonian law requires us to keep for a
              set period whatever anyone would prefer.
            </>
          ),
        },
      ]),
    ],
  },
  {
    id: "who-sees-it",
    heading: "Who else sees it",
    blocks: [
      p(
        <>
          We don&apos;t sell your data and we don&apos;t trade lists. We do use
          other companies to run the practice, and they process data on our
          instructions:
        </>,
      ),
      dl([
        {
          term: "beehiiv",
          body: (
            <>
              United States. Runs the newsletter and both signup lists — holds
              your email address, first name and experience level, and the
              referral tracking.
            </>
          ),
        },
        {
          term: "Vercel",
          body: (
            <>
              United States, serving from Europe. Hosts the site and provides
              the cookieless analytics; server logs pass through it.
            </>
          ),
        },
        {
          term: "Meta",
          body: (
            <>
              Ireland and the United States. The pixel described in §4, and
              WhatsApp, which is how coaching conversations happen.
            </>
          ),
        },
        {
          term: "TidyCal",
          body: <>United States. Intro call bookings and the calendar entry.</>,
        },
        {
          term: "Notion",
          body: <>United States. Hosts the athlete intake form and its answers.</>,
        },
        {
          term: "Google",
          body: (
            <>
              United States. YouTube hosts the training videos, and Google
              Workspace the mailbox and calendar.
            </>
          ),
        },
        {
          term: "Accountants and advisers",
          body: (
            <>
              Estonia. Invoices and payment records, where the law or a genuine
              dispute requires it.
            </>
          ),
        },
      ]),
      p(
        <>
          If a court or a regulator legitimately requires us to hand something
          over, we will. Otherwise your data stays where it is.
        </>,
      ),
    ],
  },
  {
    id: "transfers",
    heading: "Sending data outside Europe",
    blocks: [
      p(
        <>
          Several of the companies above are based in the United States, so some
          of your data leaves the European Economic Area. Where it does, the
          transfer relies on the European Commission&apos;s standard contractual
          clauses, or on the EU–US Data Privacy Framework where the company is
          certified under it.
        </>,
      ),
      p(
        <>
          We&apos;re not going to pretend that&apos;s the same as your data
          never leaving Europe. It&apos;s the honest state of using ordinary
          tools to run a small coaching practice, and it&apos;s why the list
          above is short and why nothing sensitive goes into an advertising
          platform.
        </>,
      ),
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    blocks: [
      dl([
        {
          term: "Newsletter",
          body: (
            <>
              Until you unsubscribe, and then a record that you did so — which
              is how we avoid adding you back.
            </>
          ),
        },
        {
          term: "Group waitlist",
          body: (
            <>
              Until the group programme has launched and the draw has been run,
              and for up to twelve months after that in case a place opens up.
              Ask to come off it sooner and you&apos;ll come off it sooner.
            </>
          ),
        },
        {
          term: "Intake forms",
          body: (
            <>
              Twelve months, if you don&apos;t go on to be coached. If you do,
              it becomes part of your coaching record.
            </>
          ),
        },
        {
          term: "Coaching records",
          body: (
            <>
              For as long as we&apos;re working together, and two years after
              that — coming back to running after a break is common, and your
              history is the most useful thing in the room when you do.
            </>
          ),
        },
        {
          term: "Invoices and accounts",
          body: (
            <>
              Seven years, as Estonian accounting law requires. This one
              isn&apos;t ours to shorten.
            </>
          ),
        },
        {
          term: "Analytics and pixel data",
          body: (
            <>
              Held by Vercel and Meta on their own schedules — around two years
              in Meta&apos;s case.
            </>
          ),
        },
      ]),
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    blocks: [
      p(
        <>
          Under the GDPR you can ask us to do all of the following, and we
          won&apos;t make it difficult:
        </>,
      ),
      ul([
        <>
          <strong>See it.</strong> A copy of everything we hold about you.
        </>,
        <>
          <strong>Correct it.</strong> If something&apos;s wrong, we&apos;ll fix
          it.
        </>,
        <>
          <strong>Delete it.</strong> Bearing in mind we can&apos;t delete an
          invoice the tax authority requires us to keep.
        </>,
        <>
          <strong>Take it with you.</strong> Your data in a portable format,
          including your training history.
        </>,
        <>
          <strong>Restrict or object.</strong> Including objecting to anything
          we do on the basis of legitimate interests.
        </>,
        <>
          <strong>Withdraw consent.</strong> At any time, without giving a
          reason. It doesn&apos;t undo what was done while consent was in place.
        </>,
      ]),
      p(
        <>
          Email {email} and say what you want. We&apos;ll answer within a month,
          and there&apos;s no charge. We may ask you to confirm you&apos;re you
          — which is a protection for you, not an obstacle.
        </>,
      ),
      p(
        <>
          If we get it wrong, you can complain to{" "}
          <A href={legal.supervisorUrl} external>
            {legal.supervisor}
          </A>{" "}
          ({legal.supervisorEn}), or to the data protection authority in the
          country where you live. We&apos;d rather you told us first, but
          it&apos;s your call.
        </>,
      ),
    ],
  },
  {
    id: "security",
    heading: "Keeping it safe",
    blocks: [
      p(
        <>
          The site is served over HTTPS. Accounts that hold your data are
          protected with two-factor authentication and a password manager. The
          beehiiv API key that handles signups lives on the server and never
          reaches your browser. Access is limited to the people who need it,
          which in practice means Jonathan.
        </>,
      ),
      p(
        <>
          No system is perfect. If something happened that put your data at
          real risk, we&apos;d tell you and the regulator rather than hope
          nobody noticed.
        </>,
      ),
    ],
  },
  {
    id: "decisions",
    heading: "Automated decisions",
    blocks: [
      p(
        <>
          We don&apos;t profile you and nothing about you is decided by a
          machine. Your training plan is written by a person — that&apos;s the
          offer, not a footnote.
        </>,
      ),
      p(
        <>
          The five free group coaching places are drawn <strong>at random</strong>{" "}
          from the waitlist. Nothing about you affects the outcome: not your
          experience level, not how early you signed up. Referring someone earns
          one extra entry, and that&apos;s the only thing that changes the odds.
        </>,
      ),
    ],
  },
  {
    id: "children",
    heading: "Children",
    blocks: [
      p(
        <>
          Coaching is for adults. The services here aren&apos;t intended for
          anyone under 18 and we don&apos;t knowingly collect their data. If you
          think a child has signed up, tell us at {email} and we&apos;ll remove
          it.
        </>,
      ),
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      p(
        <>
          When this changes, the date at the top changes with it. If a change
          actually matters — a new company handling your data, a new use for it
          — we&apos;ll say so in the newsletter rather than quietly editing the
          page.
        </>,
      ),
      p(
        <>
          Questions about any of it: {email}. A real person reads that address.
        </>,
      ),
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy"
      titleAccent="policy."
      intro={
        <>
          <p>
            What we collect, why we have it, who else sees it, and how to get it
            back or have it deleted. Written to be read rather than to cover us
            — if a sentence here needed a lawyer to decode, it&apos;s the wrong
            sentence.
          </p>
          <p className="mt-4">
            The short version: an email address for the newsletter, a name and
            an experience level for the waitlist, whatever you tell me about
            your running if I coach you. It isn&apos;t sold, it isn&apos;t
            traded, and you can have it deleted by asking.
          </p>
        </>
      }
      sections={sections}
      other={{ label: "the terms of service", href: legal.terms }}
    />
  );
}
