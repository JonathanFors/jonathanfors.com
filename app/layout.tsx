import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

// Bold grotesque display face — carries a width axis for the poster headlines.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

// Clean, highly legible body face.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Ultra-endurance running coach, UESCA-certified. Holistic coaching that fits training around your life — from your first ultra to a hundred-miler. Book a free intro call.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathanfors.com"),
  title: {
    default: "Jonathan Fors — Ultra-Endurance Running Coach",
    template: "%s — Jonathan Fors",
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
  authors: [{ name: "Jonathan Fors" }],
  creator: "Jonathan Fors",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jonathan Fors — Ultra-Endurance Running Coach",
    description,
    url: "https://jonathanfors.com",
    siteName: "Jonathan Fors",
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
    title: "Jonathan Fors — Ultra-Endurance Running Coach",
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
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
