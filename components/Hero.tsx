import Link from "next/link";
import { BRAND } from "@/lib/site";
import Reveal from "./Reveal";
import HeroCarousel from "./HeroCarousel";

/* ---------------- Homepage hero ---------------- */
export default function Hero() {
  return (
    /* THE FRAME IS THE ARTWORK'S SHAPE. These two ratios are the supplied
       banners' own — 1706x922 landscape, 864x1821 portrait — so the image
       fills the frame exactly and nothing is cropped or letterboxed at any
       width. Widen the window and the whole thing scales up with it.

       They must stay in step with HeroCarousel's <picture>: same 768px switch,
       same two ratios. Change one and the other has to move with it, or the
       frame stops matching the art and the cropping is back.

       This replaced a viewport-height band (100svh − 11rem). That made the
       hero exactly one screenful but left a fixed-composition banner fighting
       a frame that changed shape with every window — which is what produced
       the blurred side padding this is meant to be rid of. Height now follows
       WIDTH: ~778px on a 1440px window, still about a screenful under the
       header, but on a short laptop the fold will land inside the hero rather
       than just past it. That is the trade for showing the art whole.

       min-h floor is kept for very narrow windows, where the portrait ratio
       alone could otherwise collapse the section. */
    <section className="relative isolate flex aspect-[864/1821] min-h-[460px] items-center overflow-hidden md:aspect-[1706/922]">
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
