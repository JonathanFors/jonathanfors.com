import ClubHero from "@/components/club/ClubHero";
import ClubApproach from "@/components/club/ClubApproach";
import ClubProofBand from "@/components/club/ClubProofBand";
import ClubProcess from "@/components/club/ClubProcess";
import ClubOffers from "@/components/club/ClubOffers";
import ClubNewsletter from "@/components/club/ClubNewsletter";
import ClubFinalCta from "@/components/club/ClubFinalCta";
import ClubFooter from "@/components/club/ClubFooter";
import { facts, siteLinks } from "@/lib/site";

/**
 * The homepage, in the "club" design language taken off the logo.
 *
 * Title, description, canonical and robots all come from the root layout — the
 * homepage wants the site defaults, so there's deliberately no metadata export
 * here.
 */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jonathanfors.com/#jonathan",
      name: "Jonathan Fors",
      jobTitle: "Ultra-Endurance Running Coach",
      description:
        "UESCA-certified ultra-endurance running coach. Holistic coaching that builds training around an athlete's whole life.",
      url: "https://jonathanfors.com",
      email: `mailto:${siteLinks.email}`,
      sameAs: [siteLinks.instagram, siteLinks.linkedin],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "UESCA Ultrarunning Coach Certification",
      },
      // The run as social proof, in the past tense the page now uses.
      award: `Ran ${facts.ranKm} km down the coast of Portugal in ${facts.ranDays} days for ${facts.cause}`,
    },
    {
      "@type": "Service",
      "@id": "https://jonathanfors.com/#coaching",
      serviceType: "Ultra-endurance running coaching",
      provider: { "@id": "https://jonathanfors.com/#jonathan" },
      areaServed: "Worldwide (remote)",
      description:
        "One-to-one ultramarathon coaching, from a first ultra to a hundred-miler, structured around the athlete's life.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: siteLinks.booking,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ClubHero />
        <ClubApproach />
        <ClubProofBand />
        <ClubProcess />
        <ClubOffers />
        <ClubNewsletter />
        <ClubFinalCta />
      </main>

      <ClubFooter />
    </>
  );
}
