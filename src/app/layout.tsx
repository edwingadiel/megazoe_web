import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Iglesia Mega Zoé",
  description: "Iglesia Mega Zoé — Llevando la Palabra de Dios con temor reverente y pasión.",
  keywords: ["iglesia", "mega zoe", "estudios bíblicos", "predicaciones", "cristiano"],
  metadataBase: new URL("https://iglesiamegazoe.com"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Iglesia Mega Zoé",
    description: "Llevando la Palabra de Dios tal cual ella se merece.",
    siteName: "Iglesia Mega Zoé",
    locale: "es",
    type: "website",
    images: [
      {
        url: "/images/logo-megazoe.png",
        width: 2251,
        height: 824,
        alt: "Iglesia Mega Zoé",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Church',
              name: 'Iglesia Mega Zoé',
              url: 'https://iglesiamegazoe.com',
              logo: 'https://iglesiamegazoe.com/images/logo-megazoe.png',
              sameAs: [
                'https://www.facebook.com/iglesiamegazoe',
                'https://instagram.com/iglesiamegazoe',
                'https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
