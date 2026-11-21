import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { navIndex, quoteCategoryOptions } from "@/content/products";
import { organizationJsonLd } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { JsonLd } from "@/components/json-ld";

const serif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Private Label Socks Supplier India | Duo Socks n Sweaters",
    template: "%s | Duo Socks n Sweaters",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${inter.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <Providers quoteOptions={quoteCategoryOptions}>
          <Header nav={navIndex()} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
