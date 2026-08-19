import Link from "next/link";
import { SEARCH_TERMS } from "@/lib/site";
import Reveal from "./Reveal";

/* ---------------- What farmers search for ----------------
   The five phrases from lib/site.ts SEARCH_TERMS, set as a full band rather
   than a keyword footer: they are the words a farmer or dealer types, so they
   are the words that should be legible from across the page. Each is a real
   link into the part of the catalogue it names — a keyword strip that goes
   nowhere is just clutter, and search engines read it as such too.

   The terms are set at heading size and the explanation under each is small,
   which is the opposite weighting to most cards on this site. That is
   deliberate: the phrase is what the visitor is scanning for, and the note
   only has to reassure them once they have stopped.

   ⚠ The wording carries a constraint — see the warning above SEARCH_TERMS. The
   litre figures name the cow being fed, not a yield the feed promises, and the
   notes under them are arithmetic on the bag's own printed dose. Keep it that
   way. */
export default function SearchTerms() {
  return (
    /* Sits in the cream ramp between ProductGrid (ends cream-deep/20) and
       WhyUs (begins cream-deep/70), so the seam stays invisible. */
    <section
      aria-labelledby="search-terms-heading"
      className="bg-gradient-to-b from-cream-deep/20 to-cream-deep/70 py-14 lg:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-terracotta-dark">
              Find the right bag
            </p>
            <h2
              id="search-terms-heading"
              className="mt-4 text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl"
            >
              <span className="font-800">What farmers</span>{" "}
              <span className="font-400 text-ink/55">ask us for</span>
            </h2>
            <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-terracotta animate-rule" />
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {SEARCH_TERMS.map((t, i) => (
            <li key={t.term}>
              <Reveal delay={i * 0.07}>
                <Link
                  href={t.href}
                  className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-cream-deep bg-white p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/40 hover:shadow-lift"
                >
                  <span className="font-display font-700 text-[19px] leading-snug text-ink transition-colors duration-300 group-hover:text-terracotta-dark sm:text-[20px]">
                    {t.term}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-[13px] leading-snug text-ink-soft">
                      {t.note}
                    </span>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-light text-terracotta-dark transition-all duration-300 group-hover:bg-orange group-hover:text-white"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
