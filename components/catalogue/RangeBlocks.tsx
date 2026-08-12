import Link from "next/link";
import { BRAND, CATEGORIES, type Category } from "@/lib/site";
import CountUp from "../CountUp";
import { ACCENT } from "./accents";

const TOTAL = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

/* ---------------- Range facts ----------------
   Every figure is either derived from the catalogue itself or already claimed
   elsewhere on the site. Nothing new is asserted here. */
export function RangeStats({ category }: { category: Category }) {
  const count = category.products.length;
  const soon = category.status === "coming-soon";

  const cells: { value: React.ReactNode; label: string }[] = [
    soon
      ? { value: "Coming soon", label: "Not yet available to order" }
      : { value: <CountUp to={count} />, label: "Products in this range" },
    { value: <CountUp to={TOTAL} />, label: "Available to order today" },
    { value: "Antibiotic-free", label: "Formulations" },
    { value: "Budgam, J&K", label: "Milled in" },
  ];

  return (
    /* gap-px over a tinted backdrop gives hairline rules that reflow correctly
       at any column count — unlike divide-x, which strands a rule when wrapped. */
    <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-deep bg-cream-deep lg:grid-cols-4">
      {cells.map((c, i) => (
        <div
          key={c.label}
          className="bg-cream px-5 py-4 animate-rise"
          style={{ animationDelay: `${400 + i * 70}ms` }}
        >
          <dt className="font-display font-800 text-xl tracking-tight text-ink tabular-nums">
            {c.value}
          </dt>
          <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-soft/60">
            {c.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------- Sequence rail ----------------
   The animal's life stages in order, matching the order the products are
   listed in below. Positional labels drawn from the product names — no age
   or weight claim is made. */
export function CoverageRail({ category }: { category: Category }) {
  const a = ACCENT[category.accent];
  if (category.lifecycle.length === 0) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-cream-deep bg-cream px-5 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
        {category.status === "coming-soon"
          ? "Planned sequence — youngest stage first"
          : "The sequence — youngest stage first"}
      </p>
      {/* Wraps rather than scrolls. A seven-stage range overflowed this row by
          ~100px at 1440 and clipped the last step with no scroll affordance —
          a sequence that hides its own final step is worse than one on two
          lines. Wrapping also means adding a stage can never clip it again. */}
      <ol className="mt-3.5 flex flex-wrap items-center gap-y-2.5 pb-1">
        {category.lifecycle.map((stage, i) => (
          <li
            key={stage}
            className="flex shrink-0 items-center animate-rise"
            style={{ animationDelay: `${520 + i * 90}ms` }}
          >
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold tabular-nums ${a.chip}`}
              >
                {i + 1}
              </span>
              <span className="whitespace-nowrap text-[13px] font-semibold text-ink">
                {stage}
              </span>
            </span>
            {i < category.lifecycle.length - 1 && (
              <svg
                viewBox="0 0 24 8"
                aria-hidden
                className="mx-1.5 h-2 w-4 shrink-0 text-ink/20 sm:mx-2 sm:w-6"
              >
                <path d="M0 4h20M17 1l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- Request for quote ----------------
   The commercial close of every range, and the ONLY conversion block on the
   catalogue — the separate orange "Become a dealer" band was removed from
   these pages so the two CTAs stop competing. Dealership now lives here as
   the third action, for the visitor who wants to sell rather than buy.
   Deliberately the only dark block on the page. */
export function QuoteBlock({ category }: { category: Category }) {
  const a = ACCENT[category.accent];
  const soon = category.status === "coming-soon";
  const names = category.products.map((p) => `• ${p.name}`).join("\n");

  /* A coming-soon range cannot be quoted, so asking for quantity and pricing
     would be a dead end. It collects an interest registration instead. */
  const body = soon
    ? [
        `Interest registration — ${category.name} (${category.brand})`,
        "",
        "Please let me know when this range launches.",
        "",
        "Name:",
        "Location:",
        "Pond / farm size:",
      ].join("\n")
    : [
        `Quote request — ${category.name} (${category.brand})`,
        "",
        "Quantity required:",
        "Delivery location:",
        "Herd / flock size:",
        ...(names ? ["", "Products of interest:", names] : []),
        "",
        "Please send pack sizes, specification and dealer pricing.",
      ].join("\n");

  return (
    <div className="relative mt-14 overflow-hidden rounded-3xl bg-ink px-7 py-10 shadow-lift sm:px-10 lg:py-12">
      <div
        className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${a.gradient} opacity-25 blur-3xl animate-bloom`}
        aria-hidden
      />
      {/* Mountain motif — x-deltas sum to the 1440 viewBox width */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-16 w-full text-white/[0.05]"
        aria-hidden
      >
        <path d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z" fill="currentColor" />
      </svg>

      <div className="relative">
        <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/60">
          <span className={`h-1.5 w-1.5 rounded-full ${a.dot} animate-bloom`} aria-hidden />
          {soon ? "Register interest" : "Request for quote"}
        </span>
        <h3 className="mt-3 max-w-lg font-display font-800 text-2xl tracking-tight text-white sm:text-3xl">
          {soon
            ? `Be first to know when ${category.brand} launches`
            : `Pricing for the ${category.brand} range`}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
          {soon
            ? category.launchNote
            : "Send us your herd size and delivery location. We come back with pack sizes, the full specification and dealer rates — no order minimum to ask."}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(body)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-dark hover:shadow-lift"
          >
            {soon ? "Register your interest" : "Request a quote"}
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={BRAND.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
          >
            Call {BRAND.phone}
          </a>
        </div>

        {/* Dealership — a different intent from a quote, so it gets its own
            line rather than sitting as a third peer button. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/60">
          <span>Looking to stock and sell {BRAND.full}?</span>
          <Link
            href="/dealership"
            className="group -my-1.5 inline-flex items-center gap-1.5 py-1.5 font-semibold text-white"
          >
            <span className="link-rule">Apply for dealership</span>
            <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[12.5px] text-white/55">
          <span>Bulk supply</span>
          <span aria-hidden className="text-white/20">·</span>
          <span>Dealer pricing</span>
          <span aria-hidden className="text-white/20">·</span>
          <span>Delivery across Jammu &amp; Kashmir</span>
          <span aria-hidden className="text-white/20">·</span>
          <span>{BRAND.contactPerson}</span>
        </div>
      </div>
    </div>
  );
}
