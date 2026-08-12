import Link from "next/link";
import { CATEGORIES, BRAND } from "@/lib/site";
import { ACCENT } from "./accents";

/* ---------------- Left panel — categories and their sub-categories ----------------
   One markup tree serves both breakpoints: a horizontal pill rail below lg,
   a vertical list with the active range expanded from lg up. */
export default function CategoryNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Product categories">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft/70">
        Our Categories
      </p>
      <span className="mt-3 block h-px w-10 bg-leaf animate-wipe" />

      <ul className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
        {CATEGORIES.map((cat, i) => {
          const a = ACCENT[cat.accent];
          const active = cat.slug === activeSlug;
          const count = cat.products.length;

          return (
            <li
              key={cat.slug}
              className="shrink-0 animate-rise lg:shrink"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Link
                href={`/products/${cat.slug}`}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-2.5 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 lg:w-full lg:whitespace-normal ${
                  active
                    ? `${a.soft} ${a.border} ${a.text} shadow-soft`
                    : "border-transparent text-ink-soft hover:border-cream-deep hover:bg-cream-deep/40 hover:text-ink"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 ${a.dot} ${
                    active ? "scale-125" : "opacity-40 group-hover:opacity-100"
                  }`}
                />
                <span className="flex-1">{cat.name}</span>
                {cat.status === "coming-soon" ? (
                  <span className="rounded-full border border-ink/12 bg-cream-deep/60 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-ink-soft/70">
                    Soon
                  </span>
                ) : (
                  <span
                    className={`hidden rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums lg:inline ${
                      active ? a.chip : "text-ink-soft/50"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>

              {/* Sub-categories — desktop only; on mobile the rail stays a single row */}
              {active && count > 0 && (
                <ul className="ml-4 mt-1.5 hidden space-y-0.5 border-l border-cream-deep pl-4 lg:block">
                  {cat.products.map((p, j) => (
                    <li
                      key={p.slug}
                      className="animate-rise"
                      style={{ animationDelay: `${200 + j * 45}ms` }}
                    >
                      <a
                        href={`#${p.slug}`}
                        className="block rounded-md py-1.5 text-[13px] leading-snug text-ink-soft/80 transition-colors duration-200 hover:text-ink"
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Standing enquiry card */}
      <div className="mt-8 hidden rounded-2xl border border-cream-deep bg-cream p-5 shadow-soft lg:block">
        <p className="font-display font-700 text-sm text-ink">
          Not sure which feed?
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
          Tell us your herd or flock and we&apos;ll point you to the right range.
        </p>
        <a
          href={BRAND.phoneHref}
          className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-terracotta px-3.5 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" />
          </svg>
          {BRAND.phone}
        </a>
      </div>
    </nav>
  );
}
