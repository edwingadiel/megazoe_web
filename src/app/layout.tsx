import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Iglesia Mega Zoé",
  description: "Iglesia Mega Zoé — Llevando la Palabra de Dios con temor reverente y pasión.",
  keywords: ["iglesia", "mega zoe", "estudios bíblicos", "predicaciones", "cristiano"],
  openGraph: {
    title: "Iglesia Mega Zoé",
    description: "Llevando la Palabra de Dios tal cual ella se merece.",
    siteName: "Iglesia Mega Zoé",
    locale: "es",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
