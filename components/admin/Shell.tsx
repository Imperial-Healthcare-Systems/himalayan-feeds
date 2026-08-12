"use client";

/* ==========================================================================
   ADMIN PORTAL — application shell
   --------------------------------------------------------------------------
   Sidebar + top bar + breadcrumbs, and the route guard.

   The console deliberately inverts the marketing site: an ink sidebar against
   a flat cream work surface, tighter density, no wave, no kenburns, no sheen.
   Same palette, same type, different job — an operator reading a table for an
   hour is not the same visitor as a dealer landing on the homepage.
   ========================================================================== */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";

import Logo from "@/components/Logo";
import { usePortal } from "@/components/admin/store-context";
import {
  IconBag,
  IconClose,
  IconDashboard,
  IconExternal,
  IconGear,
  IconLogout,
  IconMenu,
  IconTag,
} from "@/components/admin/ui";
import { BRAND } from "@/lib/site";

type Entry = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  match: (p: string) => boolean;
};

const NAV: [string, Entry[]][] = [
  [
    "Overview",
    [{ href: "/admin", label: "Dashboard", icon: IconDashboard, match: (p) => p === "/admin" }],
  ],
  [
    "Catalogue",
    [
      {
        href: "/admin/products",
        label: "Products",
        icon: IconBag,
        match: (p) => p.startsWith("/admin/products"),
      },
      {
        href: "/admin/categories",
        label: "Categories",
        icon: IconTag,
        match: (p) => p.startsWith("/admin/categories"),
      },
    ],
  ],
  [
    "System",
    [
      {
        href: "/admin/settings",
        label: "Settings",
        icon: IconGear,
        match: (p) => p.startsWith("/admin/settings"),
      },
    ],
  ],
];

export type Crumb = { label: string; href?: string };

export function AdminShell({
  title,
  subtitle,
  crumbs = [],
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready, signOut, products } = usePortal();
  const [navOpen, setNavOpen] = useState(false);

  /* Guard: once the session has been read, an unauthenticated visitor is sent
     to the login screen. `ready` prevents a redirect flash during hydration. */
  useEffect(() => {
    if (ready && !session) router.replace("/admin/login");
  }, [ready, session, router]);

  /* Route change closes the drawer — adjusted during render so it never
     paints open for a frame on the new screen. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setNavOpen(false);
  }

  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  if (!ready || !session) {
    return (
      <div className="min-h-screen bg-cream">
        <span className="sr-only">Checking session…</span>
      </div>
    );
  }

  const drafts = products.filter((p) => p.status === "draft").length;

  const sidebar = (
    <div className="flex h-full flex-col bg-ink">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
        <Logo variant="light" className="h-9 w-9 shrink-0" />
        <span className="min-w-0">
          <span className="block truncate font-display font-800 text-[12.5px] tracking-[0.07em] text-cream">
            {BRAND.full.toUpperCase()}
          </span>
          <span className="block text-[9.5px] font-bold uppercase tracking-[0.14em] text-orange/80">
            Admin console
          </span>
        </span>
        <button
          onClick={() => setNavOpen(false)}
          aria-label="Close navigation"
          className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-cream/70 lg:hidden"
        >
          <IconClose size={16} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3" aria-label="Admin sections">
        {NAV.map(([group, entries]) => (
          <div key={group} className="mb-1">
            <p className="px-4 pb-1.5 pt-3 text-[9.5px] font-bold uppercase tracking-[0.16em] text-cream/35">
              {group}
            </p>
            {entries.map((e) => {
              const on = e.match(pathname);
              const Icon = e.icon;
              return (
                <Link
                  key={e.href}
                  href={e.href}
                  aria-current={on ? "page" : undefined}
                  className={`relative mx-2 flex min-h-[42px] items-center gap-3 rounded-lg px-3 text-[13.5px] font-medium transition-colors duration-200 ${
                    on
                      ? "bg-orange text-white"
                      : "text-cream/70 hover:bg-white/[0.07] hover:text-cream"
                  }`}
                >
                  <Icon size={17} />
                  {e.label}
                  {e.href === "/admin/products" && drafts ? (
                    <span
                      className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                        on ? "bg-white/25 text-white" : "bg-orange/20 text-orange"
                      }`}
                    >
                      {drafts}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-3.5">
        <p className="text-[11px] leading-relaxed text-cream/40">
          Frontend demo. Changes save to this browser&apos;s local storage — no
          server is involved.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      {navOpen ? (
        <div
          className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-sm lg:hidden"
          onClick={() => setNavOpen(false)}
          aria-hidden
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[258px] transition-transform duration-300 ease-out lg:hidden ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      <div className="lg:pl-[236px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-ink/8 bg-cream/92 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink/12 bg-white text-ink lg:hidden"
            >
              <IconMenu size={18} />
            </button>

            <span className="hidden text-[13px] text-ink-soft sm:block">
              Signed in as <span className="font-semibold text-ink">{session.email}</span>
            </span>

            <span className="ml-auto flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-ink/12 bg-white px-3 text-[13px] font-semibold text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
              >
                <IconExternal size={15} />
                <span className="hidden sm:inline">View site</span>
              </Link>
              <button
                onClick={signOut}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-ink/12 bg-white px-3 text-[13px] font-semibold text-ink-soft transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                <IconLogout size={15} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </span>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {crumbs.length ? (
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex flex-wrap items-center gap-1 text-[11px] font-bold uppercase tracking-[0.11em] text-ink-soft/70">
                {crumbs.map((c, i) => (
                  <li key={`${c.label}-${i}`} className="flex items-center">
                    {i > 0 ? <span className="mx-1.5 opacity-40">/</span> : null}
                    {c.href ? (
                      <Link href={c.href} className="transition-colors hover:text-terracotta">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-ink">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display font-800 text-2xl tracking-[-0.02em] text-ink sm:text-[28px]">
                {title}
              </h1>
              {subtitle ? <p className="mt-1 text-sm text-ink-soft">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
