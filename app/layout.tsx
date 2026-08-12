import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himalayan Feeds Pvt. Ltd. — Nutrition for Better Growth & Better Yield",
  description:
    "Animal nutrition from the Himalayan region. Scientifically formulated cattle feed and poultry feed for farmers, dairy owners, poultry farmers, dealers and distributors.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Fonts via <link> — swap to next/font/google if you prefer self-hosting */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fraunces is the third face, used only for the vision/mission
            statements and pull quotes. Two weights plus one italic — enough for
            an editorial voice without a third font's worth of payload. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
