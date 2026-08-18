import type { Metadata } from "next";
import BookingModal from "@/components/BookingModal";
import CtaTracker from "@/components/CtaTracker";
import ClubNav from "@/components/club/ClubNav";
import ClubHero from "@/components/club/ClubHero";
import ClubApproach from "@/components/club/ClubApproach";
import ClubProofBand from "@/components/club/ClubProofBand";
import ClubInstagram from "@/components/club/ClubInstagram";
import ClubProcess from "@/components/club/ClubProcess";
import ClubOffers from "@/components/club/ClubOffers";
import ClubNewsletter from "@/components/club/ClubNewsletter";
import ClubFinalCta from "@/components/club/ClubFinalCta";
import ClubFooter from "@/components/club/ClubFooter";

/**
 * Homepage redesign preview — the "club" design language, taken off the new
 * logo. Not linked from anywhere and not indexed; it exists so Jonathan can
 * compare against the live page. Once approved, these sections replace
 * app/page.tsx and this route goes away.
 */
export const metadata: Metadata = {
  title: "Homepage redesign — preview",
  robots: { index: false, follow: false },
};

export default function RedesignPreview() {
  return (
    <>
      <CtaTracker />
      <BookingModal />
      <ClubNav />

      <main>
        <ClubHero />
        <ClubApproach />
        <ClubProofBand />
        <ClubInstagram />
        <ClubProcess />
        <ClubOffers />
        <ClubNewsletter />
        <ClubFinalCta />
      </main>

      <ClubFooter />
    </>
  );
}
