import Link from "next/link";
import { BRAND } from "@/lib/site";
import Reveal from "./Reveal";
import HeroCarousel from "./HeroCarousel";

/* ---------------- Homepage hero ---------------- */
export default function Hero() {
  return (
    /* Height is viewport-aware, not a fixed 680px. The old value left the
       fold landing partway through the stat cards below, slicing them in half.

       100svh − 11rem ≈ the viewport minus the announcement bar and header
       (~133px) minus a ~44px peek. That peek is smaller than the next
       section's own top padding, so what shows below the fold is clean
       background — a scroll cue, never a cut-off card.

       svh rather than vh: on mobile, vh includes browser chrome that later
       collapses, which makes the hero jump on first scroll. The 460px floor
       keeps it usable on very short windows. */
    <section className="relative isolate flex min-h-[max(460px,calc(100svh-11rem))] items-center overflow-hidden">
      {/* Background and copy both live in the carousel: the clip and the banner
          alternate, and the copy has to fade with them — the banner carries its
          own headline and logo, so leaving ours on top would collide. The
          gradients moved in there for the same reason. This stays a server
          component; the copy is passed through as a slot. */}
      <HeroCarousel>
        {/* Headline, sub-copy and CTAs */}
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-0">
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
      </HeroCarousel>

      {/* Scroll cue. Makes the peek below deliberate rather than something the
          visitor has to guess at. Decorative — the content below is reachable
          by scrolling, so it is not a control. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center sm:flex"
      >
        <span className="flex flex-col items-center gap-1.5 text-white/55">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            Scroll
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-nudge" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
