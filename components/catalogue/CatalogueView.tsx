import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, getCategory } from "@/lib/site";
import CategoryNav from "./CategoryNav";
import ProductRow from "./ProductRow";
import { RangeStats, CoverageRail, QuoteBlock } from "./RangeBlocks";
import { ACCENT } from "./accents";

/* ---------------- Catalogue — left panel + range panel ----------------
   Rendered by both /products (defaults to the first range) and
   /products/[category]. Same layout either way, so moving between them
   reads as switching a panel rather than loading a different page.

   Products are presented as specification rows with a per-item RFQ, not as
   a shop grid — nothing here is sold online, every path ends in an enquiry. */
export default function CatalogueView({ activeSlug }: { activeSlug: string }) {
  const category = getCategory(activeSlug) ?? CATEGORIES[0];
  const a = ACCENT[category.accent];
  const count = category.products.length;
  const soon = category.status === "coming-soon";

  return (
    /* Ramp step 2 — picks up PageHeader's cream-deep/60 and lightens downward. */
    /* Ends on plain cream — the last section on /products, so the footer wave
       has matching ground. See the invariant in Footer.tsx. */
    <section className="bg-gradient-to-b from-cream-deep/60 to-cream py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[248px_1fr] lg:gap-12">
          {/* ---------------- Left panel ---------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <CategoryNav activeSlug={category.slug} />
          </aside>

          {/* ---------------- Range panel ----------------
              Keyed on the slug so a category switch remounts the subtree and
              the entrance animations replay instead of being skipped. */}
          <div key={category.slug} className="mt-10 min-w-0 lg:mt-0">
            {/* Range banner */}
            <div className="relative overflow-hidden rounded-3xl border border-cream-deep shadow-soft">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/62 to-ink/15" aria-hidden />
              <div
                className={`absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${a.gradient} opacity-25 blur-2xl animate-bloom`}
                aria-hidden
              />
              {/* Mountain motif — x-deltas sum to the 1440 viewBox width, so the
                  shape closes flush at the right edge instead of stepping. */}
              <svg
                viewBox="0 0 1440 220"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-20 w-full text-white/[0.07]"
                aria-hidden
              >
                <path d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z" fill="currentColor" />
              </svg>

              <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:py-14">
                <span
                  className="flex animate-rise flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70"
                  style={{ animationDelay: "60ms" }}
                >
                  {category.brand}
                  {soon && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] tracking-[0.16em] text-ink">
                      Coming soon
                    </span>
                  )}
                </span>
                <h2
                  className="mt-3 animate-rise font-display font-800 text-3xl tracking-tight text-white sm:text-4xl lg:text-[42px]"
                  style={{ animationDelay: "140ms" }}
                >
                  {category.name}
                </h2>
                <span className={`mt-4 block h-1 w-16 rounded-full animate-wipe ${a.rule}`} />
                <p
                  className="mt-5 max-w-xl animate-rise text-[15px] leading-relaxed text-white/85"
                  style={{ animationDelay: "260ms" }}
                >
                  {category.intro}
                </p>

                <div
                  className="mt-6 flex animate-rise flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold text-white/75"
                  style={{ animationDelay: "340ms" }}
                >
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
                    {soon ? "In development" : `${count} products`}
                  </span>
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
                    {category.animal}
                  </span>
                </div>
              </div>
            </div>

            {/* Range facts + what the range covers */}
            <RangeStats category={category} />
            <CoverageRail category={category} />

            {/* Specification rows */}
            {count > 0 ? (
              <>
                <div className="mt-14 flex items-baseline justify-between gap-4 border-b border-ink/[0.08] pb-4">
                  <h3 className="font-display font-700 text-lg text-ink">
                    The range, in order
                  </h3>
                  <span className="text-[12.5px] text-ink-soft/70">
                    {count} products
                  </span>
                </div>
                {/* No space-y here — each row carries its own pb so the
                    sequence connector runs unbroken between numbers. */}
                <ul className="mt-8">
                  {category.products.map((p, i) => (
                    <ProductRow
                      key={p.slug}
                      product={p}
                      categoryName={category.name}
                      brand={category.brand}
                      accent={category.accent}
                      index={i}
                      isLast={i === count - 1}
                    />
                  ))}
                </ul>
              </>
            ) : (
              /* ---------------- Coming soon ----------------
                 No product list, and none invented. The panel states plainly
                 that the range cannot be ordered yet, then offers the only
                 useful action: register interest. Delete this branch once the
                 range goes live and its products are filled in. */
              <div
                className={`mt-12 animate-rise overflow-hidden rounded-3xl border border-dashed p-10 text-center ${a.border} ${a.soft}`}
              >
                <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl animate-drift ${a.chip}`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M3 13c3-4 6-4 9 0s6 4 9 0" strokeLinecap="round" />
                    <path d="M3 18c3-4 6-4 9 0s6 4 9 0" strokeLinecap="round" opacity=".5" />
                  </svg>
                </div>

                <span className="mt-5 inline-block rounded-full border border-ink/12 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                  Coming soon
                </span>
                <h3 className="mt-4 font-display font-700 text-xl text-ink">
                  {category.brand} is not available to order yet
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  {category.launchNote}
                </p>

                {/* What's live today, so the visitor isn't left at a dead end */}
                <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft/55">
                  Available now
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2.5">
                  {CATEGORIES.filter((c) => c.status === "available").map((c) => (
                    <Link
                      key={c.slug}
                      href={`/products/${c.slug}`}
                      className="group inline-flex items-center gap-1.5 rounded-lg border border-ink/12 bg-white px-4 py-2 text-[13px] font-semibold text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      {c.name}
                      <span className="text-ink-soft/50 tabular-nums">
                        {c.products.length}
                      </span>
                      <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Commercial close */}
            <QuoteBlock category={category} />
          </div>
        </div>
      </div>
    </section>
  );
}
