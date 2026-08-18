import Link from "next/link";
import { BRAND, CATEGORIES } from "@/lib/site";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

/* Derived, so it can never drift from the catalogue. */
const PRODUCT_COUNT = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

/* ---------------- Trust strip ----------------
   `to` carries the counter target; `to: null` marks the one stat that isn't a
   number (the certification marks), which renders `k` verbatim instead and is
   set a size down, since letterforms run much wider than a two-digit numeral.

   ⚠ "Years of feed expertise", "Active dealers" and "Retailers stocking us"
   are unverified template figures inherited from the original build. Confirm
   or remove before launch. The product count is derived from CATEGORIES, so it
   is always accurate. */
const STATS = [
  {
    to: 12,
    suffix: "+",
    k: "",
    v: "Years of feed expertise",
    icon: (
      <path
        d="M12 14a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM8.6 12.9L7.5 20l4.5-2.2L16.5 20l-1.1-7.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    to: 50,
    suffix: "+",
    k: "",
    v: "Active dealers",
    /* Hub-and-spoke: one mill feeding a distribution network */
    icon: (
      <path
        d="M12 3.5a2 2 0 110 4 2 2 0 010-4zM5.5 16.5a2 2 0 110 4 2 2 0 010-4zM18.5 16.5a2 2 0 110 4 2 2 0 010-4zM12 7.5v5.5M5.5 16.5V13h13v3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    to: 500,
    suffix: "+",
    k: "",
    v: "Retailers stocking us",
    icon: (
      <path
        d="M3.5 9L5 4.5h14L20.5 9M3.5 9h17M4.5 9v9.5a1 1 0 001 1h13a1 1 0 001-1V9M9.5 19.5v-5.5h5v5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    to: PRODUCT_COUNT,
    suffix: "",
    k: "",
    v: "Products in the range",
    icon: (
      <path
        d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8l8.5-4.5zM3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    to: null,
    suffix: "",
    k: "FSSAI · ISO",
    v: "Registered & certified",
    icon: (
      <path
        d="M12 3l1.9 1.5 2.4-.2.8 2.3 2 1.3-.9 2.2.9 2.2-2 1.3-.8 2.3-2.4-.2L12 17l-1.9-1.5-2.4.2-.8-2.3-2-1.3.9-2.2-.9-2.2 2-1.3.8-2.3 2.4.2L12 3zM8.5 19.5L12 18l3.5 1.5M10 10.2l1.4 1.4 2.8-2.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function TrustStrip() {
  return (
    /* Start of the page-long cream ramp. Every section below picks up its
       `from-` shade from the previous section's `to-` shade, so the seams
       between them are invisible and the whole page reads as one gradient.
       Padding is deliberately different per section so they still feel distinct.
       Ramp: cream → 70 → 20 → 70 → 25 → cream → 55 (into the footer wave). */
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-cream to-cream-deep/70 py-12 lg:py-16">
      {/* Mountain-range watermark — ties the band to the brand without competing */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full text-leaf-dark/[0.07]"
      >
        <path
          fill="currentColor"
          /* x-deltas must total the 1440 viewBox width, or the shape closes
             early and leaves a hard vertical edge. */
          d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z"
        />
      </svg>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-5 lg:gap-5">
        {STATS.map((s, i) => (
          <Reveal
            key={s.v}
            delay={i * 0.08}
            className={i === STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""}
          >
            <div className="group relative h-full overflow-hidden rounded-3xl border border-cream-deep bg-white px-4 py-7 text-center shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:px-6">
              {/* Gold accent rule, brightest at the centre */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent"
              />

              <div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-leaf-light text-leaf-dark transition-colors duration-300 group-hover:bg-leaf group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  {s.icon}
                </svg>
              </div>

              <div
                className={`mt-4 font-display font-800 text-orange ${
                  s.to !== null ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl lg:text-2xl"
                }`}
              >
                {s.to !== null ? <CountUp to={s.to} suffix={s.suffix} /> : s.k}
              </div>

              <div className="mt-1.5 text-sm leading-snug text-ink-soft">{s.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Why choose us ---------------- */
const FEATURES = [
  {
    title: "Science-backed formulas",
    body: "Every recipe is balanced by nutritionists for optimal feed-conversion and growth.",
    icon: (
      <path d="M9 3v6l-5 9a2 2 0 002 3h12a2 2 0 002-3l-5-9V3M8 3h8M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Antibiotic-free",
    body: "Clean, residue-free nutrition that keeps your stock and your customers safe.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Consistent quality",
    body: "Batch-tested at every stage so the bag you open always performs the same.",
    icon: (
      <path d="M4 7l8-4 8 4-8 4-8-4zM4 7v10l8 4 8-4V7M12 11v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Dealer support",
    body: "Marketing material, field advice and reliable supply for every partner.",
    icon: (
      <path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a3 3 0 100-6 3 3 0 000 6zM17 11l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

/* WhyUs is the one shared section with two different predecessors, so its
   gradient has to start from two different shades to keep the ramp seamless:
   on the homepage it follows ProductGrid (ends /20), on /about it follows
   TrustStrip (ends /70). Both class strings are written out in full so
   Tailwind's scanner still finds them. */
const WHY_US_TONES = {
  /** Homepage: rises from ProductGrid into Certifications. */
  rising: "from-cream-deep/20 to-cream-deep/70",
  /** /about: continues from TrustStrip and settles into the footer wave. */
  settling: "from-cream-deep/70 to-cream-deep/50",
};

export function WhyUs({ tone = "rising" }: { tone?: keyof typeof WHY_US_TONES }) {
  return (
    /* Ramp step 3 — the feature cards sit on the deepest part of the band. */
    <section className={`bg-gradient-to-b ${WHY_US_TONES[tone]} py-16 lg:py-20`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-orange-light text-orange-dark text-xs font-bold tracking-widest uppercase px-4 py-1.5">
              Why Himalayan
            </span>
            <h2 className="mt-5 font-display font-800 text-3xl sm:text-4xl tracking-tight text-ink text-balance">
              Feed that farmers come back for
            </h2>
            <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-orange animate-rule" />
          </div>
        </Reveal>

        {/* Feature cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white border border-cream-deep p-7 shadow-soft">
                <div className="grid place-items-center h-12 w-12 rounded-2xl gradient-leaf text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display font-700 text-lg text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Dealership band ---------------- */
export function DealershipBand() {
  return (
    /* Ramp step 5 — lightens back to plain cream so the orange panel pops. */
    <section className="bg-gradient-to-b from-cream-deep/25 to-cream py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] gradient-orange text-white px-8 py-12 sm:px-14 shadow-lift">
            {/* Decorative bleed circles */}
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/10" />

            {/* Copy + CTAs */}
            <div className="relative max-w-2xl">
              <h2 className="font-display font-800 text-3xl sm:text-4xl tracking-tight text-balance">
                Become a Himalayan dealer
              </h2>
              <p className="mt-4 text-white/90 text-lg">
                Attractive margins, dependable supply and full marketing support.
                Join a growing network of feed partners across India.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dealership"
                  className="bg-white text-orange-dark font-semibold px-6 py-3 rounded-full shadow-soft hover:-translate-y-0.5 transition-all"
                >
                  Apply for dealership
                </Link>
                <a
                  href={BRAND.phoneHref}
                  className="border border-white/60 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all"
                >
                  Call {BRAND.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ----------------
   ⚠ PLACEHOLDER. All three are unattributed template copy inherited from the
   original build — no farmer has been quoted or consented. Replace with real,
   permissioned testimonials or delete this section before launch. */
const REVIEWS = [
  {
    /* Sub-brand names stripped — these quoted "Nutri Choice" and "Godhenu
       Gold", which no longer exist anywhere on the site or on any bag. */
    quote:
      "Switched my broiler farm to Himalayan Feeds and feed conversion improved within two batches. The margins speak for themselves.",
    name: "Ramesh Das",
    role: "Poultry farmer",
  },
  {
    quote:
      "Started the calves on Calf Starter and carried them right through to milking. The herd holds condition and the yield has stayed steady.",
    name: "Bashir Ahmad",
    role: "Dairy owner",
  },
  {
    quote:
      "As a dealer, the supply is reliable and the support team actually picks up the phone. That is rare in this trade.",
    name: "Anil Kumar",
    role: "Distributor",
  },
];

/* Drawn rather than using the "★" character, which some platforms substitute
   with a colour emoji and which sits on a different baseline in every font. */
function Stars() {
  return (
    <div className="flex gap-1 text-gold" role="img" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.6 5.2 5.8.85-4.2 4.09.99 5.76L10 14.78l-5.19 2.72.99-5.76-4.2-4.09 5.8-.85L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <li className="mx-3 flex w-[300px] shrink-0 flex-col rounded-3xl border border-cream-deep bg-white p-7 shadow-soft transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lift sm:w-[360px]">
      <Stars />
      <blockquote className="mt-4 flex-1 font-serif text-[16.5px] leading-[1.6] text-ink-soft">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-cream-deep pt-5">
        <div className="font-display font-700 text-ink">{r.name}</div>
        <div className="mt-0.5 text-xs text-ink-soft">{r.role}</div>
      </figcaption>
    </li>
  );
}

export function Testimonials() {
  return (
    /* Ramp step 6 — the last band on the homepage, so it must resolve to plain
       `cream`: the footer's wave sits on the body background, and any tint left
       here would meet it as a hard line. See the invariant in Footer.tsx. */
    <section className="bg-gradient-to-b from-cream via-cream-deep/25 to-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-leaf-light text-leaf-dark text-xs font-bold tracking-widest uppercase px-4 py-1.5">
              Success Stories
            </span>
            <h2 className="mt-5 font-display font-800 text-3xl sm:text-4xl tracking-tight text-ink text-balance">
              Trusted on farms across the region
            </h2>
            {/* Centred rules use the default centre origin, so they grow out
                from the middle; left-aligned ones get origin-left. */}
            <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-leaf animate-rule" />
          </div>
        </Reveal>
      </div>

      {/* Flowing rail. Deliberately slow (75s) and paused on hover or keyboard
          focus — a quote that scrolls past faster than you can read it is
          decoration, not proof. Reduced motion freezes the animation via
          globals.css, so the strip becomes a normal horizontal scroller. */}
      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee py-2 [animation-duration:75s] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <ul
              key={half}
              /* The second half is a visual duplicate for the seamless loop —
                 screen readers should only hear the quotes once. */
              aria-hidden={half === 1}
              className="flex shrink-0 items-stretch"
            >
              {/* Repeated inside each half: three cards are narrower than the
                  viewport, which would leave a visible gap mid-loop. */}
              {[...REVIEWS, ...REVIEWS].map((r, i) => (
                <ReviewCard key={`${half}-${r.name}-${i}`} r={r} />
              ))}
            </ul>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-[12.5px] text-ink-soft/60">
        Hover to pause
      </p>
    </section>
  );
}
