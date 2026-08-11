"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV, BRAND } from "@/lib/site";
import Logo from "./Logo";

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
          ? "bg-cream/92 backdrop-blur-md py-3 shadow-[0_10px_24px_-16px_rgba(42,39,36,0.25)]"
          : "bg-cream py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        <Logo className="h-20 w-20" />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium tracking-[0.01em] text-ink-soft transition-colors after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:origin-left after:scale-x-0 after:bg-leaf-dark after:transition-transform after:duration-200 hover:text-leaf-dark hover:after:scale-x-100"
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
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <div className="min-w-56 rounded-xl border border-ink/[0.06] bg-white p-1.5 shadow-lift">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-leaf-light hover:text-leaf-dark"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <a
            href={BRAND.phoneHref}
            className="hidden items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift sm:inline-flex"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" />
            </svg>
            <span className="hidden md:inline">Call {BRAND.phone}</span>
            <span className="md:hidden">Call</span>
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
        <div className="mx-4 mt-3 rounded-2xl border border-ink/[0.06] bg-white p-2 shadow-lift lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpenMobile(false)}
              className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink-soft transition-colors hover:bg-leaf-light hover:text-leaf-dark"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
