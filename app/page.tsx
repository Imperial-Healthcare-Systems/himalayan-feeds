import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Certifications from "@/components/Certifications";
import { TrustStrip, WhyUs, DealershipBand, Testimonials } from "@/components/Sections";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/* ---------------- Homepage ---------------- */
export default function Home() {
  return (
    <>
      {/* Chrome — assembled inline here; inner pages use <PageShell> instead */}
      <AnnouncementBar />
      <Header />

      <main>
        {/* Above the fold */}
        <Hero />
        <TrustStrip />

        {/* Product range */}
        <ProductGrid />
        <WhyUs />

        {/* Credibility */}
        <Certifications />

        {/* Conversion — dealer recruitment + social proof */}
        <DealershipBand />
        <Testimonials />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
