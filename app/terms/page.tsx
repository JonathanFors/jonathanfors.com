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
import {
  facts,
  groupCoaching,
  legal,
  oneToOne,
  shuffleClub,
  siteLinks,
} from "@/lib/site";

/**
 * Terms of service.
 *
 * Prices, the group coaching terms and the draw rules are read from
 * `lib/site.ts` rather than typed here, so a price change in one place can't
 * leave the legal page contradicting the offer it governs.
 *
 * Three clauses carry real weight and were written rather than borrowed: §5
 * (coaching is not medical care), §7 (risk and liability) and §10 (the draw,
 * which has to say plainly that signing up early is no advantage — the whole
 * point of drawing at random).
 *
 * ⚠️ Open: no payment provider is named in §8, because none has been confirmed
 * — the clause says "the method we agree" instead. Confirm it and name it.
 *
 * Note `groupCoaching.launch` is already "end of September" — the month is in
 * the value, so it takes a bare year after it, not "of September 2026".
 *
 * The wording is mirrored in `COPY.md` §15.
 */

const title = "Terms of service";
const description =
  "The terms for coaching, the group programme, the waitlist draw and the Shuffle Club newsletter — including the part where coaching is not medical advice.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: legal.terms },
  openGraph: {
    title: `${title} — Jonathan Fors`,
    description,
    url: `https://jonathanfors.com${legal.terms}`,
    siteName: "Jonathan Fors",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title, description },
};

const email = <A href={`mailto:${siteLinks.email}`}>{siteLinks.email}</A>;

const sections: LegalSection[] = [
  {
    id: "who-you-deal-with",
    heading: "Who you're dealing with",
    blocks: [
      p(
        <>
          Coaching, the newsletter and this website are provided by{" "}
          <strong>{legal.company}</strong>, registered at {legal.address},
          trading as Jonathan Fors. That company is who you contract with;
          Jonathan is who you&apos;ll actually talk to.
        </>,
      ),
      p(
        <>
          Contact for anything in these terms: {email}.
        </>,
      ),
    ],
  },
  {
    id: "agreeing",
    heading: "Agreeing to these terms",
    blocks: [
      p(
        <>
          By using this site, subscribing to the newsletter, joining the
          waitlist or starting coaching, you accept these terms. If you
          don&apos;t, the answer is simply not to use them — nothing here is
          buried in a checkbox.
        </>,
      ),
      p(
        <>
          They work alongside the{" "}
          <A href={legal.privacy}>privacy policy</A>, which covers what happens
          to your data.
        </>,
      ),
    ],
  },
  {
    id: "who-can-use",
    heading: "Who can use it",
    blocks: [
      p(
        <>
          You need to be 18 or over. Coaching involves training decisions and a
          contract, and neither is something to do on a parent&apos;s behalf.
        </>,
      ),
      p(
        <>
          Coaching is delivered remotely and in English. It doesn&apos;t matter
          where you live, as long as we can find an hour that works for a call.
        </>,
      ),
    ],
  },
  {
    id: "what-is-on-offer",
    heading: "What's on offer",
    blocks: [
      dl([
        {
          term: "Intro call",
          body: (
            <>
              A free 30-minute call, booked through the{" "}
              <A href={siteLinks.booking} external>
                booking page
              </A>
              . No obligation on either side, and no sales script. It exists so
              we can both decide whether this is worth doing.
            </>
          ),
        },
        {
          term: "1:1 coaching",
          body: (
            <>
              {oneToOne.price}
              {oneToOne.period}, no minimum period. Sessions written for you
              rather than pulled from a template, a weekly call, extra calls when
              you need them, and access to me on WhatsApp.
            </>
          ),
        },
        {
          term: "Group coaching",
          body: (
            <>
              {groupCoaching.price}
              {groupCoaching.period}, launching {groupCoaching.launch} 2026.
              Around five athletes per group, each with a plan
              written personally for them, a weekly live group call, a private
              group channel, direct WhatsApp access, and a video for every
              movement in the plan. {groupCoaching.freeSpots} places are free —
              see §10.
            </>
          ),
        },
        {
          term: shuffleClub.name,
          body: (
            <>
              The newsletter. Three editions a week, free, no paid tier. See
              §13.
            </>
          ),
        },
        {
          term: "The video library",
          body: (
            <>
              Training videos for the movements a plan names, shared with the
              athletes being coached. One clip per movement, and the link to a
              given movement is meant to stay valid.
            </>
          ),
        },
      ]),
      p(
        <>
          Prices and what&apos;s included are as stated on this site at the time
          you start. If they change later, your arrangement carries on at the
          price you agreed — a price rise applies to new athletes, not to you
          mid-flow.
        </>,
      ),
    ],
  },
  {
    id: "not-medical-advice",
    heading: "Coaching is not medical care",
    blocks: [
      p(
        <>
          This is the most important clause on the page, so it&apos;s said
          straight. Jonathan is a{" "}
          <strong>{facts.certification} running coach</strong>. He is not a
          doctor, a physiotherapist, a dietitian or a psychologist, and nothing
          he provides is medical diagnosis, treatment or a substitute for
          professional healthcare.
        </>,
      ),
      ul([
        <>
          A training plan is coaching guidance, not a prescription. It&apos;s
          based on what you&apos;ve told us and what we can see from your
          training — not on an examination.
        </>,
        <>
          Anything said about nutrition, sleep, pain, fuelling or recovery is
          general endurance-coaching guidance, and applies to a healthy adult.
        </>,
        <>
          Opinions in the newsletter are opinions, marked as such. The science
          editions cite their sources, and none of it is advice about your
          particular body.
        </>,
      ]),
      note(
        <>
          <strong>Before you start, talk to a doctor</strong> — especially if
          you have a heart condition, a chronic illness, an existing injury,
          are pregnant, are on medication, or have been away from training for a
          long time. If something hurts in a way that isn&apos;t ordinary
          training discomfort, stop and get it looked at by someone qualified to
          look at it. Nothing in a plan is worth doing through a real injury,
          and no session matters more than that.
        </>,
      ),
      p(
        <>
          In an emergency, call your local emergency number. We are not a
          medical service and cannot respond as one.
        </>,
      ),
    ],
  },
  {
    id: "your-part",
    heading: "Your part in it",
    blocks: [
      p(
        <>
          Coaching only works on accurate information, and the athlete is the
          only source of it. So:
        </>,
      ),
      ul([
        <>
          Tell us your real training history, injuries, conditions and
          medication — including the awkward parts. A plan built on a flattering
          version of your history is a plan built wrong.
        </>,
        <>
          Tell us when something changes: an injury, an illness, a work crisis,
          a bad run of sleep. The plan is meant to move around your life, which
          it can only do if we know.
        </>,
        <>
          Use your own judgement on the day. You decide whether to start a
          session, and you&apos;re the only one who can feel what your body is
          doing. Skipping a session because something feels wrong is a correct
          decision, not a failure.
        </>,
        <>
          Keep your account details and any private group links to yourself.
        </>,
      ]),
    ],
  },
  {
    id: "risk-and-liability",
    heading: "Risk, and what we're liable for",
    blocks: [
      p(
        <>
          Running long distances carries real risk — injury, illness, and worse
          in extreme conditions. You take part voluntarily and you accept that
          risk. Following a plan reduces some of it and eliminates none of it.
        </>,
      ),
      p(
        <>
          Within that, and to the extent the law allows:
        </>,
      ),
      ul([
        <>
          We&apos;re not liable for injury, illness or loss arising from
          training you chose to do, from a race result, or from following
          guidance in a way we didn&apos;t intend.
        </>,
        <>
          We&apos;re not liable for indirect losses — lost race entries, travel
          costs, lost earnings, a missed goal.
        </>,
        <>
          Where we are liable, our total liability is limited to the fees you
          paid us in the three months before the problem arose.
        </>,
      ]),
      note(
        <>
          Nothing above limits liability for death or personal injury caused by
          our negligence, for fraud, or for anything else the law does not allow
          us to exclude. If you&apos;re a consumer, your statutory rights come
          first and this clause does not touch them.
        </>,
      ),
    ],
  },
  {
    id: "paying",
    heading: "Paying, and stopping",
    blocks: [
      h("Price and billing"),
      p(
        <>
          1:1 coaching is {oneToOne.price}
          {oneToOne.period}; group coaching is {groupCoaching.price}
          {groupCoaching.period}. Both are billed monthly in advance, by the
          method we agree when you start. Prices are in euro. Where VAT applies,
          it&apos;s included in the figure shown.
        </>,
      ),
      h("No minimum period"),
      p(
        <>
          There isn&apos;t one, and there is no notice period. Tell us
          you&apos;re stopping and the arrangement ends at the end of the month
          you&apos;ve paid for — you keep the coaching you&apos;ve paid for
          until then. We don&apos;t refund part-months, and we don&apos;t hold
          anyone in a contract they&apos;ve stopped wanting.
        </>,
      ),
      h("Late payment"),
      p(
        <>
          If a payment fails we&apos;ll tell you and try again. If it stays
          unpaid, coaching pauses until it&apos;s sorted out. Nobody gets chased
          by a debt collector over a training plan.
        </>,
      ),
    ],
  },
  {
    id: "withdrawal",
    heading: "Changing your mind",
    blocks: [
      p(
        <>
          If you&apos;re a consumer in the EU, you have{" "}
          <strong>14 days</strong> from starting to withdraw from the contract
          without giving a reason. Email {email} and it&apos;s done — no form to
          fill in.
        </>,
      ),
      p(
        <>
          Two things worth knowing, because they&apos;re the parts people are
          usually surprised by. If you ask us to start coaching inside those 14
          days and then withdraw, you pay a fair amount for what was actually
          delivered — a written plan and a call are real work. And if the
          service has been fully delivered within the 14 days at your express
          request, the right to withdraw is used up.
        </>,
      ),
      p(
        <>
          The newsletter and the waitlist cost nothing, so there&apos;s nothing
          to withdraw from: leave whenever you like.
        </>,
      ),
    ],
  },
  {
    id: "the-draw",
    heading: "The group waitlist, and the draw",
    blocks: [
      p(
        <>
          The <A href={siteLinks.waitlist}>group coaching waitlist</A> is free
          to join and joining it isn&apos;t a place in a group — it&apos;s a
          place on the list, and an entry in the draw for the free places.
        </>,
      ),
      ul([
        <>
          <strong>{groupCoaching.freeSpots} places are free.</strong> Free for as
          long as the athlete stays in the group — not a free month, not a trial
          that converts. Everyone else pays {groupCoaching.price}
          {groupCoaching.period}.
        </>,
        <>
          <strong>They&apos;re drawn at random.</strong> Signing up early is
          deliberately no advantage, and neither is your experience level or
          anything else about you. There is no queue to be at the front of.
        </>,
        <>
          <strong>Refer one person and you get one extra entry</strong> — two
          instead of one. That is the only way to change your odds, and it
          runs on beehiiv&apos;s referral tracking.
        </>,
        <>
          We&apos;ll remove obvious duplicates, test addresses and anything that
          looks like an attempt to game the draw. Otherwise every entry is
          equal.
        </>,
        <>
          The draw runs around the launch of the programme,{" "}
          {groupCoaching.launch} 2026. If that date moves, the draw
          moves with it — we&apos;ll say so rather than go quiet.
        </>,
      ]),
      p(
        <>
          Groups are around five athletes, matched to have enough in common to
          relate to each other and enough difference in level to push each
          other. Who ends up in which group is our call, and it isn&apos;t a
          judgement of anyone.
        </>,
      ),
      p(
        <>
          Being on the waitlist is not a promise of a place, free or paid. If
          the programme doesn&apos;t launch, nobody is charged and everyone gets
          told.
        </>,
      ),
    ],
  },
  {
    id: "the-group",
    heading: "Inside a group",
    blocks: [
      p(
        <>
          A group only works if it&apos;s a place people can be honest in. So
          the rules are short and they&apos;re not negotiable:
        </>,
      ),
      ul([
        <>
          What&apos;s said in the group stays in the group. Don&apos;t repeat
          it, screenshot it, or take it elsewhere.
        </>,
        <>
          Don&apos;t record calls, and don&apos;t share the call link or the
          private channel with anyone outside the group.
        </>,
        <>
          Don&apos;t give each other medical advice. Share what happened to you;
          leave diagnosis to the professionals.
        </>,
        <>
          Be decent. Nobody in a group is competing with anybody else in it.
        </>,
      ]),
      p(
        <>
          We can remove someone from a group, with a refund of any unused paid
          time, if this stops being true. It has never happened and hopefully
          won&apos;t.
        </>,
      ),
    ],
  },
  {
    id: "availability",
    heading: "Availability and response times",
    blocks: [
      p(
        <>
          &quot;Access to me on WhatsApp&quot; means you can write whenever
          something comes up, not that someone is awake to answer. In practice
          you&apos;ll normally hear back the same day, and rarely more than a
          day later.
        </>,
      ),
      p(
        <>
          Occasionally I&apos;m on a long run or somewhere without signal — in
          August 2026 that meant {facts.ranKm} km down the coast of Portugal
          over {facts.ranDays} days. When a stretch like that is coming, you&apos;ll
          know in advance and cover is arranged. Calls that get missed get
          rescheduled, not written off.
        </>,
      ),
    ],
  },
  {
    id: "newsletter",
    heading: "The newsletter",
    blocks: [
      p(
        <>
          {shuffleClub.name} is free and it stays free — there is no paid tier
          and nothing sold at the end of an edition. Three editions a week:
          Tuesday the science, Friday my own take on it, Sunday reader
          questions.
        </>,
      ),
      p(
        <>
          Friday is opinion and says so. Tuesday cites its sources. Neither is
          advice about you specifically — see §5.
        </>,
      ),
      p(
        <>
          Unsubscribe from the link at the foot of any edition. If you send in a
          question, we may answer it in a Sunday edition without your name
          attached; say so and we won&apos;t use it at all. We may change the
          schedule or stop publishing, in which case we&apos;ll tell
          subscribers.
        </>,
      ),
    ],
  },
  {
    id: "ownership",
    heading: "Who owns what",
    blocks: [
      p(
        <>
          Your training plan is yours to use. Everything we made in order to
          give it to you — the videos, the newsletter, the words and design on
          this site, the methods behind a plan — stays ours.
        </>,
      ),
      ul([
        <>
          You get a personal licence to use your plan and the video library for
          your own training, for as long as you&apos;re being coached and after.
        </>,
        <>
          Don&apos;t resell it, republish it, coach someone else off it, or feed
          it into a product or a training service.
        </>,
        <>
          Video links are shared with you, not with the internet. Passing one to
          a training partner is fine; posting it isn&apos;t.
        </>,
        <>
          Your own data — your history, your logs, what you write to us — stays
          yours. See the <A href={legal.privacy}>privacy policy</A>.
        </>,
      ]),
      p(
        <>
          If you&apos;re happy with the coaching and want to say so publicly,
          that&apos;s welcome. We&apos;ll only use your name, photo or words in
          anything of ours if you&apos;ve said we can.
        </>,
      ),
    ],
  },
  {
    id: "ending",
    heading: "Ending it",
    blocks: [
      p(
        <>
          Either of us can stop, at any time, by saying so in writing. Yours
          ends at the end of the month you&apos;ve paid for (see §8). We&apos;d
          only end it early for non-payment, for abusive behaviour, or if
          continuing wouldn&apos;t be safe or honest — and in the last case
          we&apos;d refund unused time.
        </>,
      ),
      p(
        <>
          When it ends, your current plan is yours to keep and use. Access to
          WhatsApp, the group channel, the calls and the video library stops.
          Ask within 30 days and we&apos;ll send you your training history in a
          form you can take elsewhere.
        </>,
      ),
    ],
  },
  {
    id: "beyond-our-control",
    heading: "Things outside our control",
    blocks: [
      p(
        <>
          We&apos;re not liable for failing to deliver something because of
          events genuinely beyond our control — illness, injury, a failure at
          one of the services we rely on, or a natural disaster. Where a
          disruption is more than brief, we&apos;ll make the time up or refund
          it.
        </>,
      ),
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    blocks: [
      p(
        <>
          We may update these terms. The date at the top changes when we do. If
          a change materially affects coaching you&apos;re already receiving,
          we&apos;ll tell you directly before it applies to you — and you can
          stop, at no notice, if you don&apos;t accept it.
        </>,
      ),
    ],
  },
  {
    id: "law",
    heading: "Law, and disagreements",
    blocks: [
      p(
        <>
          These terms are governed by the law of {legal.country}, and the
          Estonian courts have jurisdiction. If you&apos;re a consumer, that
          doesn&apos;t take away the protections you have under the law of the
          country you live in, or your right to bring a claim there.
        </>,
      ),
      p(
        <>
          Before any of that: email {email} and tell us what&apos;s wrong. This
          is a one-person coaching practice, not a company with a complaints
          department, and almost anything is fixable by saying it out loud.
        </>,
      ),
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms"
      title="Terms of"
      titleAccent="service."
      intro={
        <>
          <p>
            The terms for coaching, the group programme, the waitlist draw and
            the newsletter. Written in plain English, because terms nobody reads
            protect nobody.
          </p>
          <p className="mt-4">
            If you read one clause, read §5 — coaching is not medical care, and
            the difference matters more than anything else on this page.
          </p>
        </>
      }
      sections={sections}
      other={{ label: "the privacy policy", href: legal.privacy }}
    />
  );
}
