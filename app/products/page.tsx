import PageShell, { PageHeader } from "@/components/PageShell";
import CatalogueView from "@/components/catalogue/CatalogueView";
import { CATEGORIES } from "@/lib/site";

export const metadata = {
  title: "Products — Himalayan Feeds Pvt. Ltd.",
  description:
    "Cattle feed and poultry feed from Himalayan Feeds. Dairy, calf and buffalo feed, broiler and layer feed, and nutritional supplements — listed in the animal's own order.",
};

/* ---------------- /products — catalogue home ----------------
   The "Our Categories" entry point. Identical layout to /products/[category];
   it just opens on the first range so the panel is never empty.

   No DealershipBand here — the catalogue already closes on a Request-for-Quote
   block, and that block carries the dealership link. Two competing conversion
   bands on one page split the intent. */
export default function ProductsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Products"
        title="Cattle Feed & Poultry Feed"
        sub="Two ranges available now, listed in the animal's own order — from its first weeks through to full production. Fish feed is in development."
      />
      <CatalogueView activeSlug={CATEGORIES[0].slug} />
    </PageShell>
  );
}
