import PageShell, { PageHeader } from "@/components/PageShell";
import DealershipForm from "@/components/DealershipForm";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { BRAND, CATEGORIES, AVAILABLE_CATEGORIES } from "@/lib/site";

export const metadata = {
  title: "Dealership — Himalayan Feeds Pvt. Ltd.",
  description:
    "Become a Himalayan Feeds dealer. Attractive margins, dependable supply and full marketing support for cattle feed and poultry feed across India.",
};

const PRODUCT_COUNT = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

/* ---------------- The opportunity ----------------
   ⚠ "Active dealers" and "Years in feed" are unverified template figures
   inherited from the original build — the same two flagged in TrustStrip and
   on /about. Confirm or remove before launch. The product and range counts
   are derived from the catalogue, so they can never drift. */
const FIGURES = [
  { to: 500, suffix: "+", text: null, label: "Active dealers", note: "A network already selling the brand" },
  { to: 12, suffix: "+", text: null, label: "Years in feed", note: "Formulation and milling experience" },
  { to: PRODUCT_COUNT, suffix: "", text: null, label: "Products to sell", note: `Across ${AVAILABLE_CATEGORIES.length} live ranges` },
  { to: null, suffix: "", text: "J&K", label: "Milled locally", note: "Short supply lines, faster refills" },
];

/* What a dealer actually gets. Drawn from claims the site already makes —
   nothing new is promised here. */
const BENEFITS = [
  {
    title: "Attractive margins",
    body: "Pricing built so there is real money in the bag for you, not just for the mill.",
    icon: <path d="M12 3v18M8.5 7.5h6.2a2.8 2.8 0 010 5.6H9.3a2.8 2.8 0 000 5.6h6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Dependable supply",
    body: "Milled in Budgam, so refills travel a short distance and arrive when you need them.",
    icon: <path d="M3 8h10v9H3zM13 11h4l3 3v3h-7zM7 20a2 2 0 100-4 2 2 0 000 4zM17.5 20a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Marketing support",
    body: "Branding, point-of-sale material and product literature for your counter and your customers.",
    icon: <path d="M3 11v2a1 1 0 001 1h2l4 4V6L6 10H4a1 1 0 00-1 1zM16 8.5a5 5 0 010 7M19 6a9 9 0 010 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Field advice",
    body: "Someone to call when a customer asks a question you would rather answer properly.",
    icon: <path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a3 3 0 100-6 3 3 0 000 6zM17 11l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

/* Process, not a promise about outcomes. */
const STEPS = [
  { title: "Send the enquiry", body: "Fill in the short form below, or just call. Tell us your area and what you already stock." },
  { title: "We call you back", body: "Usually within one working day. We talk through your territory, volumes and terms." },
  { title: "Onboarding", body: "Pricing, branding material and your first order — with someone walking you through it." },
  { title: "Ongoing supply", body: "Regular refills, field support and new products as the range grows." },
];

/* Who the partnership suits. Framed as fit, not as requirements we cannot
   verify or enforce. */
const FIT = [
  "An existing feed, agri or veterinary retail counter",
  "Dry, covered storage for palletised bags",
  "Working relationships with farmers or dairy owners in your area",
  "Willingness to stock a full range rather than one product",
];

/* ---------------- /dealership ---------------- */
export default function DealershipPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Dealership"
        title="Partner with Himalayan Feeds"
        sub="Attractive margins, dependable supply and full marketing support — for retailers and distributors who want a feed range they can stand behind."
      />

      {/* ---------------- The opportunity ----------------
          A deliberately different treatment from TrustStrip's white icon
          cards: oversized numerals on a dark ground with hairline dividers,
          so the figures read as a prospectus rather than a badge row. */}
      <section
        aria-labelledby="opportunity-heading"
        className="relative isolate overflow-hidden bg-ink py-14 lg:py-16"
      >
        <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-orange opacity-20 blur-3xl animate-bloom" aria-hidden />
        <div
          className="absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-terracotta opacity-[0.18] blur-3xl animate-bloom"
          style={{ animationDelay: "2.5s" }}
          aria-hidden
        />
        {/* Mountain motif — x-deltas sum to the 1440 viewBox width */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 w-full text-white/[0.05]"
          aria-hidden
        >
          <path d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z" fill="currentColor" />
        </svg>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
              <h2
                id="opportunity-heading"
                className="font-display text-2xl tracking-tight text-white sm:text-3xl"
              >
                <span className="font-800">The opportunity</span>{" "}
                <span className="font-400 text-white/45">in numbers</span>
              </h2>
              <p className="font-serif text-[16px] italic text-white/55 sm:text-[17px]">
                A brand your customers can already recognise.
              </p>
            </div>
          </Reveal>

          {/* gap-px over a light backdrop gives hairline rules that reflow
              correctly at any column count, unlike divide-x. */}
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
            {FIGURES.map((f, i) => (
              <div
                key={f.label}
                className="animate-settle bg-ink px-6 py-7 transition-colors duration-500 hover:bg-white/[0.04]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="font-display font-800 text-[40px] leading-none tracking-tight text-orange tabular-nums sm:text-[46px]">
                  {f.to !== null ? <CountUp to={f.to} suffix={f.suffix} /> : f.text}
                </p>
                <p className="mt-3.5 font-serif text-[17px] text-white">{f.label}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">
                  {f.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- What you get ---------------- */}
      <section className="bg-gradient-to-b from-cream-deep/45 to-cream-deep/20 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl">
                <span className="font-800">What you get</span>{" "}
                <span className="font-400 text-ink/55">as a partner</span>
              </h2>
              <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-orange animate-rule" />
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <div className="group h-full rounded-3xl border border-cream-deep bg-white p-7 shadow-soft transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-light text-orange-dark transition-transform duration-700 ease-out group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                      {b.icon}
                    </svg>
                  </div>
                  <h3 className="mt-5 font-display font-700 text-[17px] text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="bg-gradient-to-b from-cream-deep/20 to-cream-deep/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl">
                <span className="font-800">How it works</span>{" "}
                <span className="font-400 text-ink/55">— four steps</span>
              </h2>
              <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-leaf animate-rule" />
            </div>
          </Reveal>

          <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className="group relative">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-800 text-[15px] tabular-nums text-leaf-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 origin-left bg-ink/12 transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                  </div>
                  <h3 className="mt-4 font-display font-700 text-[17px] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Enquiry + who it suits ---------------- */}
      <section
        aria-labelledby="apply-heading"
        className="bg-gradient-to-b from-cream-deep/10 to-cream-deep/25 py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
            {/* Who it suits */}
            <div>
              <Reveal>
                <h2
                  id="apply-heading"
                  className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl"
                >
                  <span className="font-800">Is this</span>{" "}
                  <span className="font-400 text-ink/55">a fit for you?</span>
                </h2>
                <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-terracotta animate-rule" />
                <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                  We are not looking for the largest partner in every district —
                  we are looking for the one whose customers come back. If most
                  of the below sounds like you, we would like to talk.
                </p>
              </Reveal>

              <ul className="mt-7 space-y-3.5">
                {FIT.map((item, i) => (
                  <Reveal key={item} delay={0.1 + i * 0.06}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-light text-leaf-dark">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[14.5px] leading-relaxed text-ink-soft">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>

              {/* Direct line — some people would simply rather call */}
              <Reveal delay={0.35}>
                <div className="mt-9 rounded-2xl border border-cream-deep bg-cream/60 p-6">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
                    Prefer to talk first?
                  </p>
                  <p className="mt-2.5 font-display font-700 text-[15px] text-ink">
                    {BRAND.contactPerson}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    <a
                      href={BRAND.phoneHref}
                      className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift"
                    >
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                        <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" />
                      </svg>
                      {BRAND.phone}
                    </a>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                        "Hello Himalayan Feeds, I'd like to know more about becoming a dealer."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-ink/12 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* The form */}
            <Reveal delay={0.12}>
              <div className="lg:sticky lg:top-28">
                <DealershipForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Close ----------------
          Ends on plain cream so the footer wave has matching ground.
          See the invariant in Footer.tsx. */}
      <section className="bg-gradient-to-b from-cream-deep/25 via-cream to-cream py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-serif text-[21px] leading-[1.5] text-ink sm:text-[24px]">
              &ldquo;Better nutrition creates healthier animals, better
              productivity and a stronger farming community.&rdquo;
            </p>
            <p className="mt-5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/50">
              {BRAND.full} — {BRAND.positioning}
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
