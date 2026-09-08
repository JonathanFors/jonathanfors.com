import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import BookingModal from "@/components/BookingModal";
import CtaTracker from "@/components/CtaTracker";
import ClubNav from "@/components/club/ClubNav";
import MetaPixel from "@/components/MetaPixel";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";
import { brand } from "@/lib/site";

// Titles, eyebrows, labels, buttons, numerals — anything short and declarative.
// Loaded as the variable font with italics: the club design language needs the
// heaviest weight (900) in italic to match the logo's slanted condensed caps.
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
  style: ["normal", "italic"],
});

// Paragraphs and anything meant to be read at length.
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const description =
  "UESCA-certified ultra-endurance running coach. Remote 1:1 and small-group coaching that builds training around your life — from a first ultra to a hundred-miler. Free 30-minute intro call.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    // Not "Ultra Endurant — Ultra-Endurance Running Coach": the brand name and
    // the category are a syllable apart, and printing both stutters. Naming
    // Jonathan instead keeps the coach in the tab and catches the people who
    // search him rather than the business.
    default: `${brand.name} — Ultramarathon Coaching with ${brand.coach}`,
    template: `%s — ${brand.name}`,
  },
  description,
  keywords: [
    "ultra running coach",
    "ultramarathon coaching",
    "endurance running coach",
    "UESCA certified coach",
    "100 mile training",
    "trail running coach",
  ],
  authors: [{ name: brand.coach }],
  creator: brand.coach,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${brand.name} — Ultramarathon Coaching with ${brand.coach}`,
    description,
    url: brand.url,
    siteName: brand.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-coast-road.jpg",
        width: 1200,
        height: 630,
        alt: "A runner on a winding coastal road above the Atlantic in Portugal.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — Ultramarathon Coaching with ${brand.coach}`,
    description,
    images: ["/images/hero-coast-road.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoCondensed.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* All three are mounted once, here, rather than per page: the nav is
            the same bar everywhere, and its "Book a call" needs the popup and
            the click tracking to work wherever it is rendered. CtaTracker and
            BookingModal are both delegated listeners on document, so one
            instance covers every CTA on the page. */}
        <CtaTracker />
        <BookingModal />
        <ClubNav />
        <WhatsAppButton />
        {children}
        {/* Vercel Web Analytics — page views only, no cookies. */}
        <Analytics />
        {/* Meta Pixel — this one does set cookies. */}
        <MetaPixel />
      </body>
    </html>
  );
}
