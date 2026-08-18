"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, BRAND, CATEGORIES } from "@/lib/site";
import Logo from "./Logo";

/* ---------------- Hide-on-scroll tuning ----------------
   How far down the page the header will consent to hide at all. Roughly its
   own height: near the top, a flick of the wheel should never take the nav
   with it, and there is nothing gained by hiding chrome that is about to be
   scrolled past anyway. */
const HIDE_AFTER = 120;

/* How much movement is needed before a direction is believed. Trackpads,
   momentum scrolling and touch all emit a stream of 1-2px deltas that change
   sign constantly; without a dead zone the header flickers on every one of
   them. Unspent movement accumulates rather than being dropped, so a slow
   deliberate scroll still triggers — it just takes 6px to say so. */
const DIR_THRESHOLD = 6;

/* ---------------- Brand lockup, second line ----------------
   BRAND.positioning is one string and reads as one line wherever it fits. A
   phone is not one of those places: at 390px the lockup has about 200px to
   play with and the full line wants about 240px. Left alone the browser breaks
   it at whichever space it reaches first, which strands a "|" at the end of
   the line.

   So it is split at the last separator and the break is placed deliberately —
   two whole phrases rather than a phrase and a half. Above sm the separator
   comes back and the <br> is display:none, so it is one line again, exactly as
   before. Derived from the string rather than hardcoded, so re-wording
   positioning in lib/site.ts still works. */
const POS_PARTS = BRAND.positioning
  .split("|")
  .map((s) => s.trim())
  .filter(Boolean);
const POS_HEAD = POS_PARTS.length > 1 ? POS_PARTS.slice(0, -1).join(" | ") : BRAND.positioning;
const POS_TAIL = POS_PARTS.length > 1 ? POS_PARTS[POS_PARTS.length - 1] : "";

/* Dot colour per range. Written out in full — Tailwind v4 only generates
   classes it can literally see, so `bg-${accent}` would not exist. */
const DOT: Record<string, string> = {
  terracotta: "bg-terracotta",
  orange: "bg-orange",
  leaf: "bg-leaf",
};

/* ---------------- Products panel ----------------
   A plain list of range names told a visitor nothing they could not guess.
   Each row carries who the range is for and how many products are in it —
   enough to choose from the nav instead of clicking through. */
function ProductsPanel({
  onNavigate,
  pathname,
  bare = false,
}: {
  onNavigate?: () => void;
  pathname: string;
  bare?: boolean;
}) {
  return (
    <div
      className={
        bare
          ? "space-y-0.5"
          : "min-w-[21rem] overflow-hidden rounded-2xl border border-ink/[0.07] bg-white p-1.5 shadow-lift"
      }
    >
      {CATEGORIES.map((c) => {
        const href = `/products/${c.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={c.slug}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`group/row flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors duration-200 ${
              active ? "bg-leaf-light/70" : "hover:bg-cream-deep/45"
            }`}
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
                    c.status === "coming-soon"
                      ? "text-ink/60"
                      : active
                        ? "text-leaf-dark"
                        : "text-ink"
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
                {c.animal}
              </span>
            </span>
            <svg
              viewBox="0 0 16 16"
              className="mt-1.5 h-3 w-3 shrink-0 text-ink-soft/35 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-ink-soft"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        );
      })}

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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* The position the current direction was last judged from — not simply the
     previous frame's scrollY, which is why DIR_THRESHOLD accumulates. */
  const lastY = useRef(0);

  /* Scroll position drives two separate things: whether the header is in its
     compact "firmed up" state, and whether it is on screen at all — scrolling
     down hides it, scrolling back up brings it straight back.

     rAF-throttled so the handler never runs more than once a frame. */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      /* Clamped because iOS rubber-banding reports a negative scrollY at the
         top of the page and an over-scrolled one at the bottom. Both read as a
         direction change, so both would flap the header at exactly the moment
         the visitor has stopped scrolling. */
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 8);

      if (y <= HIDE_AFTER) {
        /* Near the top the header is always present, whichever way the page
           is moving. */
        setHidden(false);
        lastY.current = y;
      } else {
        const dy = y - lastY.current;
        if (Math.abs(dy) > DIR_THRESHOLD) {
          setHidden(dy > 0);
          lastY.current = y;
        }
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Route change closes both menus. Adjusted during render rather than in an
     effect, so the drawer never paints open for a frame on the new page. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMobile(false);
    setOpenMenu(null);
    /* A new page starts at the top with the nav in place. Without this, a
       link followed while the header was hidden would land on a page whose
       nav is missing until something scrolls. */
    setHidden(false);
    lastY.current = 0;
  }

  /* The drawer holds the page still behind it. */
  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobile]);

  /* Escape closes; a click outside the nav dismisses the dropdown. Hover alone
     is not an accessible affordance, so the panel is also click- and
     keyboard-operable. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setOpenMobile(false);
    };
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const hoverOpen = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }, []);

  /* A grace period so the pointer can cross the gap to the panel. */
  const hoverClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  /* A nav item is active on its own page; Products stays lit anywhere in the
     catalogue, so the visitor is never left without a "you are here". */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  /* Reasons to override a hide. The mobile drawer lives inside this element,
     so hiding the header while it is open would take the open menu off screen
     with it; the desktop dropdown is anchored to it and would fly away the
     same way. In both cases the visitor is mid-interaction with the nav, which
     is the one moment it must not move. */
  const pinned = openMobile || openMenu !== null;

  return (
    <header
      /* Capture, so focus landing anywhere inside — a keyboard user tabbing in
         from the top of the page — brings the header back before they reach a
         control they cannot see. */
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-50 border-b transition-[background-color,padding,box-shadow,border-color,transform] duration-300 motion-reduce:transition-none ${
        hidden && !pinned ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-ink/[0.08] bg-cream/92 py-2.5 shadow-[0_10px_24px_-16px_rgba(42,39,36,0.25)] backdrop-blur-md"
          : "border-ink/[0.06] bg-cream py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        {/* Logo + positioning line. The logo scales rather than changing its
            box, so the header firming up on scroll costs no layout shift. */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3.5"
          aria-label={`${BRAND.full} — home`}
        >
          <Logo
            className={`h-16 w-16 shrink-0 origin-left transition-transform duration-300 ${
              scrolled ? "scale-[0.875]" : "scale-100"
            }`}
          />
          {/* Hidden ONLY in the lg-to-xl band. That is the one range where the
              desktop nav is on screen but the window is still too narrow to
              carry nav, lockup and call button together — at 1024px the three
              want ~1050px and have ~960px, so something has to give and the
              lockup is it, the logo beside it already saying the same thing.
              Below lg the nav has collapsed into the drawer and the room is
              free, so the lockup shows on phones and tablets. */}
          <span className="block min-w-0 border-l border-ink/10 pl-2.5 lg:hidden xl:block xl:pl-3.5">
            <span className="block font-display font-800 text-[11.5px] tracking-[0.06em] text-ink sm:text-[12px] xl:text-[13px] xl:tracking-[0.08em]">
              {BRAND.full.toUpperCase()}
            </span>
            <span className="mt-0.5 block text-[8px] font-bold uppercase leading-[1.35] tracking-[0.1em] text-ink-soft/55 sm:text-[9px] xl:text-[9.5px] xl:tracking-[0.13em]">
              {POS_HEAD}
              {POS_TAIL && (
                <>
                  <span className="hidden sm:inline"> | </span>
                  <br className="sm:hidden" />
                  {POS_TAIL}
                </>
              )}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = isActive(item.href);
            const open = openMenu === item.label;

            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-[15px] font-medium tracking-[0.01em] transition-colors after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:origin-left after:bg-leaf-dark after:transition-transform after:duration-200 ${
                    active
                      ? "text-leaf-dark after:scale-x-100"
                      : "text-ink-soft after:scale-x-0 hover:text-leaf-dark hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu((m) => (m === item.label ? null : item.label))}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-medium tracking-[0.01em] transition-colors after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:origin-left after:bg-leaf-dark after:transition-transform after:duration-200 ${
                    active
                      ? "text-leaf-dark after:scale-x-100"
                      : "text-ink-soft after:scale-x-0 hover:text-leaf-dark hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 opacity-60 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                    open
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-1 opacity-0"
                  }`}
                >
                  <ProductsPanel pathname={pathname} onNavigate={() => setOpenMenu(null)} />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <a
            href={BRAND.phoneHref}
            className="hidden items-center gap-2.5 rounded-lg bg-terracotta px-4 py-2 text-left text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift sm:inline-flex"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
              <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" />
            </svg>
            <span className="hidden md:block">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/70">
                Sales &amp; dealership
              </span>
              <span className="block text-[13.5px] font-semibold leading-tight">{BRAND.phone}</span>
            </span>
            <span className="text-sm font-semibold md:hidden">Call</span>
          </a>

          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white transition-colors hover:border-ink/20 lg:hidden"
            aria-label={openMobile ? "Close menu" : "Open menu"}
            aria-expanded={openMobile}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform duration-300 ${
                  openMobile ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-opacity duration-200 ${
                  openMobile ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform duration-300 ${
                  openMobile ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer. Animated open with a grid-rows transition — it moves
          from 0fr to 1fr, which animates smoothly without hard-coding a height
          the content might outgrow. */}
      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          openMobile ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="mx-4 mt-3 max-h-[70vh] overflow-y-auto overscroll-contain rounded-2xl border border-ink/[0.06] bg-white p-2 shadow-lift">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenMobile(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[44px] items-center rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      active
                        ? "bg-leaf-light text-leaf-dark"
                        : "text-ink-soft hover:bg-leaf-light hover:text-leaf-dark"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* Ranges inline — a dropdown nested inside a drawer is a
                      trap on touch, so the panel is laid out flat instead. */}
                  {item.children && (
                    <div className="mb-1 ml-3 border-l border-cream-deep pl-2">
                      <ProductsPanel
                        bare
                        pathname={pathname}
                        onNavigate={() => setOpenMobile(false)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
