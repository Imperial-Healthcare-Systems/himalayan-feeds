import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";
import Reveal from "./Reveal";

/* ---------------- Product category grid ---------------- */
export default function ProductGrid({
  aboveFold = false,
}: {
  /**
   * Set true only when nothing before this grid in the DOM already claims
   * the LCP (e.g. /products, which opens straight into this grid). All four
   * cards render at an identical CSS box size, so on a page where they're
   * the first content, they're tied for largest-on-screen and whichever
   * finishes decoding first becomes the LCP element — eager-loading just
   * one doesn't resolve that tie, since the others are already within the
   * initial viewport and load promptly regardless. Leave false when a Hero
   * precedes it (e.g. the homepage), so these images stay lazy and don't
   * compete with the Hero's own LCP resource.
   */
  aboveFold?: boolean;
}) {
  return (
    /* Ramp step 2 — picks up TrustStrip's cream-deep/70 and lightens. Tallest
       padding on the page: this is the main content block. */
    <section
      id="products"
      className="bg-gradient-to-b from-cream-deep/70 to-cream-deep/20 py-24 lg:py-32"
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
            <p className="mt-4 text-ink-soft text-lg leading-relaxed">
              Scientifically formulated nutrition across four species — engineered
              for growth, health and a better return on every bag.
            </p>
          </div>
        </Reveal>

        {/* Category cards — one per feed range, linking into /products */}
        <div className="mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.08}>
              <Link
                href={`/products#${cat.slug}`}
                id={cat.slug}
                className="group block scroll-mt-28 rounded-2xl focus-visible:outline-offset-4"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-cream-deep border border-cream-deep shadow-soft transition-shadow duration-300 ease-out group-hover:shadow-lift">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                    loading={aboveFold ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  <div>
                    <h3 className="font-display font-700 text-lg text-ink">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                      {cat.blurb}
                    </p>
                  </div>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-dark">
                  Explore
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
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
