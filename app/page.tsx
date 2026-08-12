import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Certifications from "@/components/Certifications";
import BrandLockup from "@/components/BrandLockup";
import Reveal from "@/components/Reveal";
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

        {/* Brand lockup — high on the page, straight after the credentials, so
            the promise is read before the catalogue rather than after it.
            Flat cream-deep/70 holds the ramp: TrustStrip ends there and
            ProductGrid begins there. */}
        <section className="bg-cream-deep/70 py-10 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <BrandLockup />
            </Reveal>
          </div>
        </section>

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
