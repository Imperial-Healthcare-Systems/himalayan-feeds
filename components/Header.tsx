"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV, BRAND, CATEGORIES } from "@/lib/site";
import Logo from "./Logo";

/* Dot colour per range. Written out in full — Tailwind v4 only generates
   classes it can literally see, so `bg-${accent}` would not exist. */
const DOT: Record<string, string> = {
  terracotta: "bg-terracotta",
  orange: "bg-orange",
  leaf: "bg-leaf",
};

/* ---------------- Products panel ----------------
   A plain list of range names told a visitor nothing they could not guess.
   Each row now carries the sub-brand, who the range is for, and how many
   products are in it — enough to choose from the nav instead of clicking
   through to find out. */
function ProductsPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="min-w-[21rem] overflow-hidden rounded-2xl border border-ink/[0.07] bg-white p-1.5 shadow-lift">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/products/${c.slug}`}
          onClick={onNavigate}
          className="group/row flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-cream-deep/45"
        >
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${DOT[c.accent]} ${
              c.status === "coming-soon" ? "opacity-40" : ""
            }`}
            aria-hidden
          />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span
                className={`font-display font-700 text-[14.5px] ${
                  c.status === "coming-soon" ? "text-ink/60" : "text-ink"
                }`}
              >
                {c.name}
              </span>
              {c.status === "coming-soon" ? (
                <span className="rounded-full border border-ink/12 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-ink-soft/60">
                  Soon
                </span>
              ) : (
                <span className="text-[11px] font-semibold tabular-nums text-ink-soft/50">
                  {c.products.length} products
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft/75">
              {c.brand} · {c.animal.replace(/^For /, "")}
            </span>
          </span>
          <svg
            viewBox="0 0 16 16"
            className="mt-1.5 h-3 w-3 shrink-0 text-ink-soft/35 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-ink-soft"
            fill="none"
            aria-hidden
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ))}

      <Link
        href="/products"
        onClick={onNavigate}
        className="mt-1 flex items-center justify-between rounded-xl border-t border-cream-deep px-3.5 py-3 text-[13px] font-semibold text-leaf-dark transition-colors duration-200 hover:bg-leaf-light/50"
      >
        View the whole catalogue
        <span className="text-ink-soft/45">
          {CATEGORIES.reduce((n, c) => n + c.products.length, 0)} products
        </span>
      </Link>
    </div>
  );
}

/* ---------------- Sticky site header ---------------- */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-ink/[0.06] transition-all duration-300 ${
        scrolled
          ? "bg-cream/92 backdrop-blur-md py-2.5 shadow-[0_10px_24px_-16px_rgba(42,39,36,0.25)]"
          : "bg-cream py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        {/* Logo + positioning line */}
        <div className="flex items-center gap-3.5">
          <Logo className={`transition-all duration-300 ${scrolled ? "h-14 w-14" : "h-16 w-16"}`} />
          <span className="hidden border-l border-ink/10 pl-3.5 xl:block">
            <span className="block font-display font-800 text-[13px] tracking-[0.08em] text-ink">
              {BRAND.full.toUpperCase()}
            </span>
            <span className="mt-0.5 block text-[9.5px] font-bold uppercase tracking-[0.13em] text-ink-soft/55">
              {BRAND.positioning}
            </span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="relative flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-medium tracking-[0.01em] text-ink-soft transition-colors after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:origin-left after:scale-x-0 after:bg-leaf-dark after:transition-transform after:duration-200 hover:text-leaf-dark hover:after:scale-x-100"
              >
                {item.label}
                {item.children && (
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <ProductsPanel />
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <a
            href={BRAND.phoneHref}
            className="hidden items-center gap-2.5 rounded-lg bg-terracotta px-4 py-2 text-left text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift sm:inline-flex"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="currentColor">
              <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" />
            </svg>
            <span className="hidden md:block">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/70">
                Sales &amp; dealership
              </span>
              <span className="block text-[13.5px] font-semibold leading-tight">
                {BRAND.phone}
              </span>
            </span>
            <span className="text-sm font-semibold md:hidden">Call</span>
          </a>

          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={openMobile}
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-5 bg-ink transition-all ${openMobile ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-all ${openMobile ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-all ${openMobile ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {openMobile && (
        <div className="mx-4 mt-3 max-h-[70vh] overflow-y-auto rounded-2xl border border-ink/[0.06] bg-white p-2 shadow-lift lg:hidden">
          {NAV.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpenMobile(false)}
                className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink-soft transition-colors hover:bg-leaf-light hover:text-leaf-dark"
              >
                {item.label}
              </Link>
              {/* Ranges inline, so the catalogue is one tap away on mobile too */}
              {item.children && (
                <div className="mb-1 ml-3 border-l border-cream-deep pl-2">
                  <ProductsPanel onNavigate={() => setOpenMobile(false)} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
