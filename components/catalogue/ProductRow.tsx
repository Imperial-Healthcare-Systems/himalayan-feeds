import { BRAND, productName, type Product } from "@/lib/site";
import { ACCENT, type AccentKey } from "./accents";

/* Builds a structured RFQ rather than a bare "I'm interested" — the reply
   is only useful if the enquiry already carries quantity and location. */
function quoteHref(product: Product, categoryName: string) {
  const body = [
    `Quote request — ${productName(product)}`,
    `Range: ${categoryName}`,
    "",
    "Quantity required:",
    "Delivery location:",
    "Herd / flock size:",
    "",
    "Please send pack sizes, specification and dealer pricing.",
  ].join("\n");
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(body)}`;
}

/* ---------------- One product — a step in the animal's sequence ----------------
   Rows run in lib/site.ts array order, which is the animal's own life stage
   order: youngest first, then through to adult, then whole-herd formats and
   add-ons. The numbered rail and its connector make that sequence visible, and
   `index` stays the position in the WHOLE range even where a range is split
   into sub-category bands — see the note in CatalogueView.

   `headingLevel` exists because that split changes the document outline. On a
   grouped range the band heading is the h4, so the product name has to be an
   h5; on an ungrouped one there is no band heading and the product name is the
   h4 itself. Hard-coding either one skips a level on the other, which is the
   one thing screen-reader heading navigation cannot recover from.

   Server component. Entrance motion is a CSS keyframe with an inline delay,
   so a six-product range still ships zero JavaScript. */
export default function ProductRow({
  product,
  categoryName,
  accent,
  index,
  isLast,
  headingLevel = 4,
}: {
  product: Product;
  categoryName: string;
  accent: AccentKey;
  index: number;
  isLast: boolean;
  headingLevel?: 4 | 5;
}) {
  const a = ACCENT[accent];
  const Heading = `h${headingLevel}` as "h4" | "h5";

  /* null means the client has not confirmed the figure. Rendering "On request"
     keeps the page honest and turns the gap into an enquiry. */
  const specs = [
    { label: "Stage", value: product.stage },
    { label: "Form", value: product.form },
    { label: "Pack sizes", value: product.packSizes },
  ];

  return (
    <li
      id={product.slug}
      className="group relative scroll-mt-32 border-t border-ink/[0.07] pb-12 pt-10 first:border-t-0 first:pt-0 last:pb-0 animate-rise"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Pack-shot column widths are deliberate, not arbitrary: at lg the list
          column is 936px (max-w-7xl less the 248px category sidebar and its
          48px gap), so 3.25rem + 240px + two 28px gaps leaves the detail
          column 588px. Going much past 240 starts squeezing the three-cell
          spec strip below it into wrapping. */}
      <div className="grid gap-x-7 gap-y-6 sm:grid-cols-[210px_1fr] lg:grid-cols-[3.25rem_240px_1fr]">
        {/* Sequence rail — number plus a connector down to the next step */}
        <div className="relative hidden lg:block">
          <span
            className={`font-display font-800 text-[28px] leading-none tabular-nums text-ink/15 transition-colors duration-500 ${a.hoverText}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {!isLast && (
            <span
              aria-hidden
              className="absolute bottom-0 left-[13px] top-11 w-px bg-gradient-to-b from-ink/15 to-ink/[0.03]"
            />
          )}
        </div>

        {/* Pack shot.
            The bags are cut out on transparency, so this is object-contain,
            not cover — cropping a product photograph would slice the label.
            The frame is 3:4 to match the source, so the bag fills it and every
            product in the grid sits at the same scale. */}
        <div className="sheen relative aspect-[4/3] overflow-hidden rounded-xl border border-cream-deep bg-gradient-to-b from-white via-cream to-cream-deep/45 shadow-soft transition-all duration-700 ease-out group-hover:shadow-lift sm:aspect-[3/4]">
          {/* Spotlight — light behind the bag rather than a flat panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_72%_at_50%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0)_62%)]"
          />
          {/* Contact shadow. Widens and softens as the bag lifts, which is
              what sells the lift as weight rather than a slide. */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[6%] left-1/2 h-2.5 w-[44%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md transition-all duration-700 ease-out group-hover:w-[54%] group-hover:bg-ink/18 group-hover:blur-lg"
          />
          {/* Placeholder badge. Three products have no bag to photograph, so
              the frame shows an illustrated icon; unlabelled, that reads as a
              broken image rather than a deliberate gap.

              It says "Photo" on purpose. A bare "Coming soon" over a product
              frame is a statement about STOCK, and nobody has told us these
              three are unavailable — they are on the client's own product
              list. Naming the photograph is the only version of this badge
              that is certainly true. */}
          {product.photoPending && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-ink/10 bg-white/85 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-ink-soft/65 shadow-soft backdrop-blur-sm">
              Photo coming soon
            </span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element -- the three
              products above still use SVG placeholders, and next/image refuses
              SVG without dangerouslyAllowSVG. Swap to <Image> once every
              product is a photograph. */}
          <img
            src={product.image}
            alt={product.imageAlt}
            width={900}
            height={1200}
            loading="lazy"
            decoding="async"
            className="relative h-full w-full object-contain p-2.5 drop-shadow-[0_12px_20px_rgba(42,39,36,0.16)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
          />
        </div>

        {/* Detail */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="min-w-0">
              {/* The sub-brand that used to sit beside this chip is gone — it
                  named a product line no bag carries. The stage chip was doing
                  the real work anyway; it says where the animal is, which is
                  what a farmer is scanning the row for. */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] ${a.chip}`}
                >
                  {product.stage}
                </span>
              </div>
              <Heading className="mt-2.5 font-display font-700 text-xl leading-tight text-ink sm:text-[22px]">
                {productName(product)}
              </Heading>
              <span
                className={`mt-2.5 block h-[3px] w-9 rounded-full origin-left transition-transform duration-500 ease-out group-hover:scale-x-[2] ${a.rule}`}
              />
            </div>

            <a
              href={quoteHref(product, categoryName)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-ink/12 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-terracotta hover:text-white hover:shadow-lift"
            >
              Request a quote
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <p className="mt-4 text-[15px] font-medium leading-relaxed text-ink">
            {product.summary}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {product.description}
          </p>

          {/* Specification strip — gap-px over a tinted backdrop gives hairline
              rules that reflow correctly when the columns stack on mobile. */}
          <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cream-deep bg-cream-deep sm:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="bg-cream px-4 py-3">
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft/60">
                  {s.label}
                </dt>
                <dd
                  className={`mt-1 text-[13px] font-semibold ${
                    s.value ? "text-ink" : "italic text-ink-soft/55"
                  }`}
                >
                  {s.value ?? "On request"}
                </dd>
              </div>
            ))}
          </dl>

          {/* Highlights */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[13px] text-ink-soft">
                <span className={`h-1 w-1 shrink-0 rounded-full ${a.dot}`} aria-hidden />
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-3 text-[12.5px] text-ink-soft/70">
            <span className="font-semibold uppercase tracking-[0.12em] text-ink-soft/50">
              Suited to
            </span>{" "}
            {product.suitableFor.join(" · ")}
          </p>
        </div>
      </div>
    </li>
  );
}
