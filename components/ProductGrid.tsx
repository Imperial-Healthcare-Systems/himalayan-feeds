import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, AVAILABLE_CATEGORIES } from "@/lib/site";
import { ACCENT } from "./catalogue/accents";
import Reveal from "./Reveal";

const TOTAL = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

/* ---------------- Product category grid ----------------
   An "Our Categories" entry card followed by one tile per range. They all land
   on the same catalogue page — the entry card opens it on the first range,
   each category card opens it on its own.

   Four columns for exactly four tiles — one clean row. This briefly went to
   three when Sheep & Goat was a fourth range; it is a band inside Cattle Feed
   now, so the count is back to four. If a range is ever added, revisit this:
   five tiles at four columns strands one alone on a second row. */
export default function ProductGrid() {
  return (
    /* Ramp step 2 — picks up TrustStrip's cream-deep/70 and lightens. Tallest
       padding on the page: this is the main content block. */
    <section
      id="products"
      className="bg-gradient-to-b from-cream-deep/70 to-cream-deep/20 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-leaf-light text-leaf-dark text-xs font-bold tracking-widest uppercase px-4 py-1.5">
              Our Products
            </span>
            <h2 className="mt-5 font-display font-800 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              A complete feed range for every farm
            </h2>
            <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-orange animate-rule" />
            <p className="mt-5 text-ink-soft text-lg leading-relaxed">
              Scientifically formulated cattle feed and poultry feed — built to
              support animal health, productivity and farm profitability.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-7">
          {/* ---------------- Entry card — the whole catalogue ---------------- */}
          <Reveal>
            <Link
              href="/products"
              className="group block rounded-2xl focus-visible:outline-offset-4"
            >
              <div className="sheen relative aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-soft transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-lift">
                {/* Accent blooms — one per range, in that range's colour.
                    Cattle, poultry, fish. Add one if a range is
                    added, or the card quietly stops standing for all of them. */}
                <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-terracotta opacity-30 blur-2xl animate-bloom" aria-hidden />
                <div
                  className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-orange opacity-30 blur-2xl animate-bloom"
                  style={{ animationDelay: "1.5s" }}
                  aria-hidden
                />
                <div
                  className="absolute -right-8 bottom-0 h-24 w-24 rounded-full bg-leaf opacity-25 blur-2xl animate-bloom"
                  style={{ animationDelay: "3s" }}
                  aria-hidden
                />
                {/* Mountain motif — x-deltas sum to the 1440 viewBox width */}
                <svg
                  viewBox="0 0 1440 220"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-0 h-14 w-full text-white/[0.08]"
                  aria-hidden
                >
                  <path d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z" fill="currentColor" />
                </svg>

                <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110">
                    <svg viewBox="0 0 20 20" className="h-5 w-5 text-white" fill="currentColor">
                      <rect x="2" y="2" width="7" height="7" rx="2" />
                      <rect x="11" y="2" width="7" height="7" rx="2" opacity=".75" />
                      <rect x="2" y="11" width="7" height="7" rx="2" opacity=".75" />
                      <rect x="11" y="11" width="7" height="7" rx="2" opacity=".5" />
                    </svg>
                  </div>
                  <p className="mt-3 font-display font-800 text-lg tracking-tight text-white">
                    All Ranges
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 tabular-nums">
                    {TOTAL} products · {AVAILABLE_CATEGORIES.length} ranges live
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-display font-700 text-lg text-ink transition-colors duration-300 group-hover:text-leaf-dark">
                  Our Categories
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                  Browse the complete lineup — every range and every product,
                  side by side in one place.
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-dark">
                <span className="link-rule">Browse all</span>
                <Arrow />
              </span>
            </Link>
          </Reveal>

          {/* ---------------- One card per range ---------------- */}
          {CATEGORIES.map((cat, i) => {
            const a = ACCENT[cat.accent];
            const count = cat.products.length;
            const soon = cat.status === "coming-soon";

            return (
              <Reveal key={cat.slug} delay={(i + 1) * 0.08}>
                <Link
                  href={`/products/${cat.slug}`}
                  id={cat.slug}
                  className="group block scroll-mt-28 rounded-2xl focus-visible:outline-offset-4"
                >
                  <div className="sheen relative aspect-video overflow-hidden rounded-2xl border border-cream-deep bg-cream-deep shadow-soft transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-lift">
                    {/* A range with no photography of its own gets the ink
                        ground and the mountain motif instead, so the card keeps
                        its shape in the grid and the white brand label below
                        still has something dark to sit on. */}
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.imageAlt}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                        /* Coming-soon ranges are desaturated so the difference
                           reads at a glance, before the badge is even studied. */
                        className={`object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.07] ${
                          soon ? "saturate-[0.35] group-hover:saturate-100" : ""
                        }`}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-ink" aria-hidden>
                        <div className={`absolute -right-8 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${a.gradient} opacity-30 blur-2xl`} />
                        <svg
                          viewBox="0 0 1440 220"
                          preserveAspectRatio="none"
                          className="absolute inset-x-0 bottom-0 h-2/3 w-full text-white/[0.07]"
                        >
                          <path d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent" aria-hidden />
                    {soon && (
                      <div className="absolute inset-0 bg-cream/35 transition-opacity duration-500 group-hover:opacity-0" aria-hidden />
                    )}
                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest ${
                        soon ? "border border-ink/10 bg-white text-ink-soft" : a.chip
                      }`}
                    >
                      {soon ? "Coming soon" : `${count} products`}
                    </span>
                    <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                      {cat.animal}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3
                      className={`font-display font-700 text-lg transition-colors duration-300 ${
                        soon ? "text-ink/65" : "text-ink"
                      } ${a.hoverText}`}
                    >
                      {cat.name}
                    </h3>
                    <p className={`mt-1.5 text-sm leading-relaxed ${soon ? "text-ink-soft/70" : "text-ink-soft"}`}>
                      {soon
                        ? "In development — not yet available to order. Register your interest and we'll let you know when it launches."
                        : cat.blurb}
                    </p>
                  </div>
                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${
                      soon ? "text-ink-soft/70" : a.text
                    }`}
                  >
                    <span className="link-rule">
                      {soon ? "Register interest" : "Explore"}
                    </span>
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shared arrow glyph ---------------- */
function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
      fill="none"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
