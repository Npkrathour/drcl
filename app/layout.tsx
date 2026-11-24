import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CartToast from "@/components/CartToast";
import { WhatsAppFloat } from "@/components/WhatsApp";
import { site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const { location: loc } = site;
const area = `${loc.locality}, ${loc.district}`;
const seoDescription = `${site.name} — floor cleaner, toilet cleaner, phenyl, bathroom, kitchen and glass cleaning products from ${area}, ${loc.state}. Order online or on WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cleaning Products in ${area} | ${site.tagline}`,
    template: `%s | ${site.name} ${loc.locality}, ${loc.district}`,
  },
  description: seoDescription,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Cleaning products",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Cleaning Products in ${area}`,
    description: seoDescription,
    images: [{ url: "/images/logo/drcl-mark.svg", alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Cleaning Products in ${area}`,
    description: seoDescription,
  },
  // Paste the code from Google Search Console into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "geo.region": loc.stateCode,
    "geo.placename": `${loc.locality}, ${loc.district}, ${loc.state}`,
  },
  icons: { icon: "/images/logo/drcl-mark.svg" },
};

/** Tells Google this is a local business in Powayan, Shahjahanpur (helps local / "near me" results). */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.tagline,
  description: seoDescription,
  url: site.url,
  logo: `${site.url}/images/logo/drcl-mark.svg`,
  image: `${site.url}/images/logo/drcl-mark.svg`,
  telephone: site.contact.phone.replace(/\s/g, ""),
  ...(site.contact.email && { email: site.contact.email }),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Badripur Hadira",
    addressLocality: loc.locality,
    addressRegion: loc.state,
    postalCode: loc.postalCode,
    addressCountry: loc.country,
  },
  areaServed: [
    { "@type": "City", name: loc.locality },
    { "@type": "City", name: loc.district },
    { "@type": "State", name: loc.state },
  ],
  sameAs: [
    ...Object.values(site.social).filter(Boolean),
    ...(site.contact.whatsapp ? [`https://wa.me/${site.contact.whatsapp}`] : []),
  ],
};

export const viewport: Viewport = {
  themeColor: "#102A43",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN"className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartToast />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
