import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import BrandLockup from "@/components/BrandLockup";
import Leadership from "@/components/Leadership";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { BRAND, COMPANY, CATEGORIES, AVAILABLE_CATEGORIES } from "@/lib/site";

export const metadata = {
  title: "About Us — Himalayan Feeds Pvt. Ltd.",
  description: COMPANY.vision,
};

const PRODUCT_COUNT = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

/* ---------------- At a glance ----------------
   ⚠ "Years in feed" and "Dealers & retailers" are unverified template figures
   inherited from the original build — the same two flagged in TrustStrip.
   Confirm or remove before launch. The product count is derived, so it can
   never drift from the catalogue. */
const FIGURES = [
  { to: 12, suffix: "+", text: null, label: "Years in feed" },
  { to: 500, suffix: "+", text: null, label: "Dealers & retailers" },
  { to: PRODUCT_COUNT, suffix: "", text: null, label: "Products in the range" },
  { to: null, suffix: "", text: "FSSAI", label: "Registered manufacturing" },
];

/* ---------------- Commitment ----------------
   The four pillars from the client brief, each carrying the substance that
   used to sit in a separate "Feed that farmers come back for" section. The
   two said the same thing twice, so they are now one block. */
const PILLARS = [
  {
    body: "Batch-tested at every stage of production, so the bag you open always performs the same as the last one.",
    icon: <path d="M4 7l8-4 8 4-8 4-8-4zM4 7v10l8 4 8-4V7M12 11v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    body: "Every recipe is balanced by nutritionists for optimal feed conversion, growth and animal health.",
    icon: <path d="M9 3v6l-5 9a2 2 0 002 3h12a2 2 0 002-3l-5-9V3M8 3h8M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    body: "Clean, antibiotic-free nutrition that keeps your stock — and the people who buy from you — safe.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    /* Two-leaf sprout. An asymmetric single leaf read as a squiggle at 24px. */
    body: "Field advice, marketing support and dependable supply for every farm and every dealer we work with.",
    icon: <path d="M12 21v-8.5M12 12.5C12 9 9.3 6.2 5.5 6.2c0 3.5 2.7 6.3 6.5 6.3zM12 12.5c0-4 2.9-7.2 7-7.2 0 4-2.9 7.2-7 7.2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

/* Vision and mission share one editorial treatment — set in Fraunces at
   statement size, open on the page rather than boxed into cards. */
const PURPOSE = [
  { label: "Our Vision", body: COMPANY.vision, rule: "bg-terracotta", eyebrow: "text-terracotta-dark", quote: "text-terracotta" },
  { label: "Our Mission", body: COMPANY.mission, rule: "bg-leaf", eyebrow: "text-leaf-dark", quote: "text-leaf" },
];

/* ---------------- /about ---------------- */
export default function AboutPage() {
  const [lead, ...rest] = COMPANY.story;

  return (
    <PageShell>
      {/* ---------------- Brand lockup — opens the page ---------------- */}
      <section className="border-b border-cream-deep bg-cream-deep/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <p
            className="animate-settle text-center text-[11px] font-bold uppercase tracking-[0.22em] text-terracotta-dark"
            style={{ animationDelay: "40ms" }}
          >
            About Us
          </p>
          <BrandLockup className="mt-7" />
        </div>
      </section>

      {/* ---------------- Who we are ---------------- */}
      <section className="bg-gradient-to-b from-cream-deep/50 to-cream-deep/25 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
            {/* Copy + figures */}
            <div>
              <Reveal>
                <h2 className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-[42px]">
                  <span className="font-800">About</span>{" "}
                  <span className="font-400 text-ink/55">Himalayan Feeds</span>
                </h2>
                <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-leaf animate-rule" />
              </Reveal>

              {/* Serif lead, then body — the drop into a second face marks where
                  the page stops introducing and starts talking. */}
              <Reveal delay={0.08}>
                <p className="mt-8 font-serif text-[20px] leading-[1.55] tracking-[-0.005em] text-ink sm:text-[22px]">
                  {lead}
                </p>
              </Reveal>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                {rest.map((p, i) => (
                  <Reveal key={i} delay={0.16 + i * 0.06}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>

              {/* At a glance — hairline cross, no cards */}
              <Reveal delay={0.34}>
                <dl className="mt-11 grid grid-cols-2">
                  {FIGURES.map((f, i) => (
                    <div
                      key={f.label}
                      className={`animate-settle py-6 ${
                        i % 2 === 0 ? "border-r border-ink/10 pr-6" : "pl-6 sm:pl-8"
                      } ${i < 2 ? "border-b border-ink/10" : ""}`}
                      style={{ animationDelay: `${i * 90}ms` }}
                    >
                      <dt className="font-display font-800 text-3xl tracking-tight text-terracotta tabular-nums sm:text-4xl">
                        {f.to !== null ? <CountUp to={f.to} suffix={f.suffix} /> : f.text}
                      </dt>
                      <dd className="mt-1.5 text-[13.5px] text-ink-soft">{f.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Visual + range summary */}
            <div className="space-y-6">
              <Reveal delay={0.12}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
                  {/* TODO: replace with a photograph of the Budgam facility. */}
                  <Image
                    src="/images/himalayan-hero-poster.webp"
                    alt="Himalayan Feeds — farmland in Jammu & Kashmir"
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70">
                      Milled in
                    </p>
                    <p className="mt-1.5 font-display font-700 text-lg text-white">
                      {BRAND.address.line2}, {BRAND.address.region}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Ranges — hairline rows, no card */}
              <Reveal delay={0.2}>
                <div className="rounded-3xl border border-cream-deep/80 bg-cream/60 p-6 sm:p-7">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
                    Our products
                  </p>
                  <ul className="mt-5 space-y-4">
                    {CATEGORIES.map((c, i) => (
                      <li
                        key={c.slug}
                        className="animate-settle border-b border-ink/[0.07] pb-4 last:border-b-0 last:pb-0"
                        style={{ animationDelay: `${180 + i * 90}ms` }}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className={`font-display font-700 text-base ${c.status === "coming-soon" ? "text-ink/60" : "text-ink"}`}>
                            {c.name}
                          </h3>
                          {c.status === "coming-soon" ? (
                            <span className="shrink-0 rounded-full border border-ink/12 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-ink-soft/60">
                              Coming soon
                            </span>
                          ) : (
                            <span className="shrink-0 text-[12px] font-semibold tabular-nums text-ink-soft/55">
                              {c.products.length} products
                            </span>
                          )}
                        </div>
                        {c.products.length > 0 && (
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft/70">
                            {c.products.map((p) => p.name).join(" · ")}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Audiences */}
              <Reveal delay={0.28}>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
                    We supply
                  </p>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {COMPANY.audiences.map((a, i) => (
                      <li
                        key={a}
                        className="animate-settle rounded-full border border-ink/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-leaf/35 hover:text-ink"
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- The people behind the bag ---------------- */}
      <Leadership />

      {/* ---------------- Vision & Mission — open, not boxed ---------------- */}
      <section
        aria-labelledby="purpose-heading"
        className="bg-gradient-to-b from-cream-deep/15 to-cream-deep/40 py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2
                id="purpose-heading"
                className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-[42px]"
              >
                <span className="font-800">Where we are going,</span>{" "}
                <span className="font-400 text-ink/55">and how we get there</span>
              </h2>
              <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-terracotta animate-rule" />
            </div>
          </Reveal>

          <div className="mt-11 grid gap-12 lg:mt-12 lg:grid-cols-2 lg:gap-16">
            {PURPOSE.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.12}>
                <div className="group relative pl-7 sm:pl-9">
                  {/* Accent spine — two-thirds tall at rest, full on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-[3px] origin-top scale-y-[0.55] rounded-full transition-transform duration-700 ease-out group-hover:scale-y-100 ${p.rule}`}
                  />
                  {/* Oversized quotation mark. The glyph sits near the top of
                      its own line box, so leading-[0.7] keeps it beside the
                      eyebrow rather than floating off. */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-4 right-0 select-none font-serif text-[120px] leading-[0.7] opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.14] ${p.quote}`}
                  >
                    &rdquo;
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-800 text-[13px] tabular-nums text-ink/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden className="h-px w-6 bg-ink/15" />
                      <span className={`text-[10.5px] font-bold uppercase tracking-[0.22em] ${p.eyebrow}`}>
                        {p.label}
                      </span>
                    </div>

                    <p className="mt-6 font-serif text-[22px] leading-[1.45] tracking-[-0.01em] text-ink text-balance sm:text-[25px] lg:text-[27px]">
                      {p.body}
                    </p>

                    <div className="mt-7 flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`h-px w-10 origin-left transition-transform duration-700 ease-out group-hover:scale-x-[1.8] ${p.rule}`}
                      />
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-soft/50">
                        {BRAND.full}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Commitment — merged with "Feed that farmers come
           back for". One dark band, deliberately compact. ---------------- */}
      <section
        aria-labelledby="commitment-heading"
        className="relative isolate overflow-hidden bg-ink py-14 lg:py-16"
      >
        {/* -z-10 matters: the content below is a static block, so without it
            these absolutely-positioned blooms paint on top of the pillars and
            wash them out. `isolate` on the section keeps the negative index
            contained. */}
        <div className="absolute -left-24 -top-28 -z-10 h-64 w-64 rounded-full bg-terracotta opacity-20 blur-3xl animate-bloom" aria-hidden />
        <div
          className="absolute -bottom-28 -right-20 -z-10 h-64 w-64 rounded-full bg-leaf opacity-[0.15] blur-3xl animate-bloom"
          style={{ animationDelay: "2.5s" }}
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cream/80">
                Our Commitment
              </span>
              <h2
                id="commitment-heading"
                className="mt-5 text-balance font-display font-800 text-3xl tracking-tight text-white sm:text-4xl"
              >
                {COMPANY.commitment.join(" • ")}
              </h2>
              <p className="mt-5 font-serif text-[19px] leading-relaxed text-white/75 sm:text-[21px]">
                {COMPANY.commitmentBody}
              </p>
            </div>
            <span className="mx-auto mt-10 block h-px w-full max-w-4xl bg-white/10 animate-rule" />
          </Reveal>

          {/* gap-px over a light backdrop gives hairline rules that reflow
              correctly at any column count, unlike divide-x. */}
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY.commitment.map((pillar, i) => (
              <div
                key={pillar}
                className="group animate-settle bg-ink px-6 py-7 transition-colors duration-500 hover:bg-white/[0.04]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.06] text-cream transition-transform duration-700 ease-out group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    {PILLARS[i].icon}
                  </svg>
                </div>
                <h3 className="mt-4 font-display font-700 text-base text-white">
                  {pillar}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                  {PILLARS[i].body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Where to next ----------------
          The page used to end on the dark commitment band, which left two
          problems: no next step for a visitor who had just read the whole
          story, and the footer's ink-filled wave landing on a bare cream strip
          between two dark blocks. A light close solves both — it gives the
          wave something to sit on and splits the two audiences the brief
          names, rather than pushing everyone down one funnel. */}
      <section
        aria-labelledby="next-heading"
        className="bg-gradient-to-b from-cream-deep/40 via-cream to-cream py-16 lg:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-ink-soft/55">
                Where to next
              </p>
              <h2
                id="next-heading"
                className="mt-4 text-balance font-display text-3xl tracking-tight text-ink sm:text-[38px]"
              >
                <span className="font-800">Two ways</span>{" "}
                <span className="font-400 text-ink/55">to work with us</span>
              </h2>
              <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-leaf animate-rule" />
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-11">
            {[
              {
                eyebrow: "Farmers & dairy owners",
                title: "See the range",
                /* Both figures derived — this line read "two ranges" for a
                   while after the third went live. */
                body: `${PRODUCT_COUNT} products across ${AVAILABLE_CATEGORIES.length} ranges, listed in the animal's own order — from its first weeks through to full production.`,
                cta: "Browse the products",
                href: "/products",
                accent: "bg-terracotta",
                text: "text-terracotta-dark",
                hover: "hover:border-terracotta/30",
              },
              {
                eyebrow: "Dealers & distributors",
                title: "Stock Himalayan Feeds",
                body: "Attractive margins, dependable supply and full marketing support. Join a growing network of feed partners across India.",
                cta: "Apply for dealership",
                href: "/dealership",
                accent: "bg-leaf",
                text: "text-leaf-dark",
                hover: "hover:border-leaf/30",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Link
                  href={c.href}
                  className={`group flex h-full flex-col rounded-3xl border border-cream-deep bg-cream/70 p-8 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:bg-white hover:shadow-lift lg:p-9 ${c.hover}`}
                >
                  <span className={`block h-[3px] w-9 origin-left rounded-full transition-transform duration-700 ease-out group-hover:scale-x-[2] ${c.accent}`} />
                  <p className="mt-5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-2.5 font-display font-700 text-xl text-ink sm:text-[22px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                    {c.body}
                  </p>
                  <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}>
                    <span className="link-rule">{c.cta}</span>
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Human fallback — neither path fits everyone */}
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[14.5px] text-ink-soft">
              <span>Or simply speak to</span>
              <span className="font-semibold text-ink">{BRAND.contactPerson}</span>
              <span aria-hidden className="text-ink/20">—</span>
              <a
                href={BRAND.phoneHref}
                className="group inline-flex items-center gap-2 font-semibold text-terracotta-dark"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                  <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" />
                </svg>
                <span className="link-rule">{BRAND.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
