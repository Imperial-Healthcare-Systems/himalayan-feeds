import PageShell, { PageHeader } from "@/components/PageShell";
import ProductGrid from "@/components/ProductGrid";
import { DealershipBand } from "@/components/Sections";

export const metadata = { title: "Products — Himalayan Feeds" };

/* ---------------- /products ---------------- */
export default function ProductsPage() {
  return (
    <PageShell>
      {/* Title block */}
      <PageHeader
        eyebrow="Our Products"
        title="Feed for poultry, fish, shrimp & cattle"
        sub="Four scientifically formulated ranges, one trusted brand. Explore the lineup below."
      />
      {/* Full range — aboveFold since nothing precedes it claims the LCP */}
      <ProductGrid aboveFold />

      {/* Conversion */}
      <DealershipBand />
    </PageShell>
  );
}
