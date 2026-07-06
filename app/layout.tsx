import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathanfors.com"),
  title: "Jonathan Fors — Ultra Endurance Coach",
  description:
    "Ultra endurance running coach. Project Portugal 2026 — running the entire coastline of Portugal to push human limits and raise awareness for men's mental health.",
  openGraph: {
    title: "Jonathan Fors — Ultra Endurance Coach",
    description:
      "Project Portugal 2026 — running ~900km along the Portuguese coastline for men's mental health.",
    url: "https://jonathanfors.com",
    siteName: "Jonathan Fors",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
