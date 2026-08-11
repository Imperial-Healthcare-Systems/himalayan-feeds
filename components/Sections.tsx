import Link from "next/link";
import { BRAND } from "@/lib/site";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

/* ---------------- Trust strip ----------------
   `to` carries the counter target; `to: null` marks the one stat that isn't a
   number (FSSAI), which renders `k` verbatim instead. */
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
    to: 500,
    suffix: "+",
    k: "",
    v: "Active dealers",
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
    to: 4,
    suffix: "",
    k: "",
    v: "Species covered",
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
    k: "FSSAI",
    v: "Certified manufacturing",
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
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-cream to-cream-deep/70 py-16 lg:py-20">
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

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.v} delay={i * 0.08}>
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

              <div className="mt-4 font-display font-800 text-3xl text-orange sm:text-4xl">
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
    <section className={`bg-gradient-to-b ${WHY_US_TONES[tone]} py-20 lg:py-28`}>
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
          </div>
        </Reveal>

        {/* Feature cards */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <section className="bg-gradient-to-b from-cream-deep/25 to-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] gradient-orange text-white px-8 py-14 sm:px-14 shadow-lift">
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

/* ---------------- Testimonials ---------------- */
const REVIEWS = [
  {
    quote:
      "Switched my broiler farm to Nutri Choice and feed conversion improved within two batches. The margins speak for themselves.",
    name: "Ramesh Das",
    role: "Poultry farmer · Nadia, WB",
  },
  {
    quote:
      "Matsya Bandhu floats well and keeps my pond water clean. Fish growth has been steady and healthy all season.",
    name: "Sujit Mondal",
    role: "Fish farmer · Howrah, WB",
  },
  {
    quote:
      "As a dealer, the supply is reliable and the support team actually picks up the phone. That is rare in this trade.",
    name: "Anil Kumar",
    role: "Distributor · Patna, Bihar",
  },
];

export function Testimonials() {
  return (
    /* Ramp step 6 — the last band before the footer wave, so it deepens into
       the dark footer. Tall padding gives the page a considered finish. */
    <section className="bg-gradient-to-b from-cream via-cream-deep/30 to-cream-deep/55 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-leaf-light text-leaf-dark text-xs font-bold tracking-widest uppercase px-4 py-1.5">
              Success Stories
            </span>
            <h2 className="mt-5 font-display font-800 text-3xl sm:text-4xl tracking-tight text-ink text-balance">
              Trusted on farms across the east
            </h2>
          </div>
        </Reveal>

        {/* Review cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="h-full rounded-3xl bg-white border border-cream-deep p-7 shadow-soft flex flex-col">
                <div className="text-gold text-xl">★★★★★</div>
                <blockquote className="mt-4 text-ink-soft leading-relaxed flex-1">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-cream-deep">
                  <div className="font-display font-700 text-ink">{r.name}</div>
                  <div className="text-xs text-ink-soft mt-0.5">{r.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
