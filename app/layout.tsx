import type { Metadata } from "next";
import { Poppins, Inter, Fraunces } from "next/font/google";
import { BRAND } from "@/lib/site";
import "./globals.css";

/* ---------------- Fonts ----------------
   Self-hosted via next/font rather than a <link> to fonts.googleapis.com.
   That removes a render-blocking round trip to a third party, drops the
   preconnects, and lets Next emit the exact subsets with size-adjusted
   fallbacks — so the swap no longer shifts layout.

   Each exposes a CSS variable that app/globals.css feeds into @theme. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Editorial voice — vision, mission and pull quotes. Italic is loaded because
   the brand tagline is set in it. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/* metadataBase resolves the relative OG image path below to an absolute URL.
   Point NEXT_PUBLIC_SITE_URL at the real domain at deploy time; the fallback
   only keeps local builds and previews from emitting broken absolute URLs. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://himalayanfeeds.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.legal} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.full}`,
  },
  description:
    "Animal nutrition from the Himalayan region. Scientifically formulated cattle feed and poultry feed for farmers, dairy owners, poultry farmers, dealers and distributors.",
  applicationName: BRAND.full,
  keywords: [
    /* The five the client asked to compete on. Kept identical to
       SEARCH_TERMS in lib/site.ts, which renders them on the homepage — a
       keyword that appears in the head and nowhere on the page is the kind
       search engines discount. */
    "best cattle feed in India",
    "best cattle feed for HF cow",
    "cattle feed for high milk production",
    "cattle feed for 10 litre milk cow",
    "cattle feed for 15 litre milk cow",
    "cattle feed",
    "poultry feed",
    "animal nutrition",
    "dairy feed",
    "broiler feed",
    "layer feed",
    "calf feed",
    "feed dealership",
    "Jammu & Kashmir",
    "Budgam",
  ],
  authors: [{ name: BRAND.legal }],
  openGraph: {
    type: "website",
    siteName: BRAND.full,
    title: `${BRAND.legal} — ${BRAND.tagline}`,
    description: BRAND.descriptor,
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        /* Frame 0 of the hero clip, so a shared link previews as the page the
           visitor then lands on. Keep width/height in step with the file —
           WhatsApp and LinkedIn lay the card out from these numbers before
           the image itself has loaded. */
        url: "/images/himalayan-hero-ranges-poster.webp",
        width: 1600,
        height: 900,
        alt: `${BRAND.full} — cattle and poultry feed`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.legal} — ${BRAND.tagline}`,
    description: BRAND.descriptor,
    images: ["/images/himalayan-hero-ranges-poster.webp"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
