import { notFound } from "next/navigation";
import PageShell, { PageHeader } from "@/components/PageShell";
import CatalogueView from "@/components/catalogue/CatalogueView";
import { CATEGORIES, getCategory, CATALOGUE_HEADER } from "@/lib/site";

type Params = { params: Promise<{ category: string }> };

/* Every category is prerendered at build time — content drives the routes. */
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: `${category.name} — ${category.animal} | Himalayan Feeds`,
    description: category.blurb,
  };
}

/* ---------------- /products/[category] ----------------
   Same page as /products, opened on a specific range. The header block is
   deliberately identical so switching ranges reads as a panel change rather
   than a different page.

   No DealershipBand — see the note in app/products/page.tsx. */
export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;
  if (!getCategory(slug)) notFound();

  return (
    <PageShell>
      <PageHeader {...CATALOGUE_HEADER} />
      <CatalogueView activeSlug={slug} />
    </PageShell>
  );
}
