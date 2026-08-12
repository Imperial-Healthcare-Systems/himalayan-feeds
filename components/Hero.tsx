import Link from "next/link";
import { BRAND } from "@/lib/site";
import Reveal from "./Reveal";
import HeroVideo from "./HeroVideo";

/* ---------------- Homepage hero ---------------- */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[440px] items-center overflow-hidden sm:min-h-[500px] md:min-h-[560px] lg:min-h-[680px]">
      {/* Background — video, or poster when motion is reduced */}
      <HeroVideo />

      {/* Legibility gradient — strongest behind the copy, fading toward the visual side */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/0" aria-hidden />
      {/* Subtle brand-tinted wash */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-leaf-dark/20 via-transparent to-orange-dark/10"
        aria-hidden
      />

      {/* Headline, sub-copy and CTAs */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-0">
        <Reveal className="max-w-xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-light sm:text-xs">
            {BRAND.name} Animal Nutrition
          </span>
          <h1 className="mt-4 text-balance font-display font-800 text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {BRAND.tagline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Scientifically formulated cattle feed and poultry feed — trusted by
            farmers, dairy owners, poultry farmers and dealers across India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Animal Feed
            </Link>
            <Link
              href="/dealership"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Become a Dealer
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
