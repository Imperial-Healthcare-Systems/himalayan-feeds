import PageShell, { PageHeader } from "@/components/PageShell";
import CatalogueView from "@/components/catalogue/CatalogueView";
import { CATEGORIES, CATALOGUE_HEADER } from "@/lib/site";

export const metadata = {
  title: "Products — Himalayan Feeds Pvt. Ltd.",
  description:
    "Cattle, poultry and sheep & goat feed from Himalayan Feeds. Calf, heifer, transition and milking feed for cows and buffalo, broiler and layer feed, and D. Mash dairy mash — listed in the animal's own order.",
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
      <PageHeader {...CATALOGUE_HEADER} />
      <CatalogueView activeSlug={CATEGORIES[0].slug} />
    </PageShell>
  );
}
