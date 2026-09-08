import ClubHero from "@/components/club/ClubHero";
import ClubIntro from "@/components/club/ClubIntro";
import ClubApp from "@/components/club/ClubApp";
import ClubFit from "@/components/club/ClubFit";
import ClubProofBand from "@/components/club/ClubProofBand";
import ClubProcess from "@/components/club/ClubProcess";
import ClubOffers from "@/components/club/ClubOffers";
import ClubNewsletter from "@/components/club/ClubNewsletter";
import ClubFinalCta from "@/components/club/ClubFinalCta";
import ClubFooter from "@/components/club/ClubFooter";
import { brand, facts, siteLinks } from "@/lib/site";

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
      "@id": "https://ultraendurant.com/#jonathan",
      name: brand.coach,
      jobTitle: "Ultra-Endurance Running Coach",
      description:
        "UESCA-certified ultra-endurance running coach. Holistic coaching that builds training around an athlete's whole life.",
      url: "https://ultraendurant.com",
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
      "@id": "https://ultraendurant.com/#coaching",
      name: brand.name,
      serviceType: "Ultra-endurance running coaching",
      // The brand names the service; the provider is still a person. Keeping
      // them distinct in the graph is what stops "Ultra Endurant" reading as
      // an organisation with staff.
      brand: { "@type": "Brand", name: brand.name },
      provider: { "@id": "https://ultraendurant.com/#jonathan" },
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
      {/* Section order, and why. Who he is (01) before what you get (02),
          because the app only means something once you know who's on the other
          end of it. Fit (03) before the program (04) so anyone who shouldn't
          book can leave before reading the mechanics. The record band sits
          between the program and the prices — it is the answer to "why should
          I pay this", so it lands immediately before the number does. */}
      <main>
        <ClubHero />
        <ClubIntro />
        <ClubApp />
        <ClubFit />
        <ClubProcess />
        <ClubProofBand />
        <ClubOffers />
        <ClubNewsletter />
        <ClubFinalCta />
      </main>

      <ClubFooter />
    </>
  );
}
