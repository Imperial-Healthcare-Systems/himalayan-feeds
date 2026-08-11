import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himalayan Feeds — Pure Nutrition, Pure Growth",
  description:
    "Premium poultry, fish, shrimp and cattle feed. Nourishing livestock for optimal growth & profitability. Become a Himalayan dealer today.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
