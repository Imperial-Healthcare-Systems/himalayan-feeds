"use client";

import Link from "next/link";
import { useMemo } from "react";

import { AdminShell } from "@/components/admin/Shell";
import { usePortal } from "@/components/admin/store-context";
import {
  ErrorState,
  IconBag,
  IconPlus,
  IconStar,
  IconTag,
  LoadingState,
  btnGhost,
  btnPrimary,
} from "@/components/admin/ui";
import { ACCENT_DOT, STATUS_LABEL, STATUS_TONE } from "@/lib/admin/types";

function relative(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "—";
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}

function Kpi({
  label,
  value,
  note,
  href,
  tone = "",
}: {
  label: string;
  value: number;
  note: string;
  href: string;
  tone?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-ink/8 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-soft"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-soft/70">{label}</p>
      <p
        className={`mt-1.5 font-display font-800 text-[26px] leading-none tabular-nums tracking-[-0.03em] ${
          tone || "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[12px] text-ink-soft/80">{note}</p>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const { products, categories, loading, error, reload } = usePortal();

  const stats = useMemo(() => {
    const byCat = categories.map((c) => ({
      ...c,
      count: products.filter((p) => p.category === c.slug).length,
    }));
    const sorted = (key: "createdAt" | "updatedAt") =>
      products
        .slice()
        .sort((a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime())
        .slice(0, 5);

    return {
      total: products.length,
      active: products.filter((p) => p.status === "active").length,
      draft: products.filter((p) => p.status === "draft").length,
      featured: products.filter((p) => p.featured).length,
      byCat,
      recentAdded: sorted("createdAt"),
      recentUpdated: sorted("updatedAt"),
    };
  }, [products, categories]);

  const peak = Math.max(1, ...stats.byCat.map((c) => c.count));

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Catalogue overview for the Himalayan Feeds range."
      actions={
        <Link href="/admin/products/new" className={btnPrimary}>
          <IconPlus size={16} /> New product
        </Link>
      }
    >
      <div className="mb-5 rounded-xl border border-orange/25 bg-orange-light/60 px-4 py-3 text-[13px] leading-relaxed text-terracotta-dark">
        <strong className="font-semibold">Demo data.</strong> Every figure here is
        counted from records held in this browser&apos;s local storage, seeded
        from <code className="font-mono text-[12px]">lib/site.ts</code>. Nothing
        is read from or written to a server, and no figure implies real business
        activity.
      </div>

      {error ? <ErrorState message={error} onRetry={reload} /> : null}

      {loading ? (
        <LoadingState rows={4} label="Loading catalogue…" />
      ) : (
        <>
          {/* KPI row — total, per range, then state */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Kpi
              label="Total products"
              value={stats.total}
              note={`Across ${categories.length} ranges`}
              href="/admin/products"
            />
            {stats.byCat.map((c) => (
              <Kpi
                key={c.id}
                label={c.name}
                value={c.count}
                note={c.status === "coming-soon" ? "Not yet launched" : c.animal}
                href={`/admin/products?category=${c.slug}`}
              />
            ))}
            <Kpi
              label="Active"
              value={stats.active}
              note="Published"
              href="/admin/products?status=active"
              tone="text-leaf-dark"
            />
            <Kpi
              label="Drafts"
              value={stats.draft}
              note="Not published"
              href="/admin/products?status=draft"
              tone="text-terracotta"
            />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {/* Category overview */}
            <section className="rounded-xl border border-ink/8 bg-white p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-display font-700 text-[15px] text-ink">Range overview</h2>
                <Link
                  href="/admin/categories"
                  className="text-[12.5px] font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  Manage ranges
                </Link>
              </div>
              <div className="space-y-3">
                {stats.byCat.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${ACCENT_DOT[c.accent]}`}
                      aria-hidden
                    />
                    <span className="w-32 shrink-0 truncate text-[13px] font-medium text-ink">
                      {c.name}
                    </span>
                    <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
                      <span
                        className="block h-full rounded-full bg-terracotta/70 transition-[width] duration-500"
                        style={{ width: `${(c.count / peak) * 100}%` }}
                      />
                    </span>
                    <span className="w-8 shrink-0 text-right text-[13px] font-semibold tabular-nums text-ink">
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section className="rounded-xl border border-ink/8 bg-white p-5">
              <h2 className="mb-4 font-display font-700 text-[15px] text-ink">Quick actions</h2>
              <div className="space-y-2">
                <Link href="/admin/products/new" className={`${btnPrimary} w-full`}>
                  <IconPlus size={16} /> Add product
                </Link>
                <Link href="/admin/products" className={`${btnGhost} w-full`}>
                  <IconBag size={16} /> All products
                </Link>
                <Link href="/admin/categories" className={`${btnGhost} w-full`}>
                  <IconTag size={16} /> Categories
                </Link>
                <Link href="/admin/products?featured=1" className={`${btnGhost} w-full`}>
                  <IconStar size={16} /> Featured ({stats.featured})
                </Link>
              </div>
            </section>
          </div>

          {/* Recently added / updated */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {(
              [
                ["Recently added", stats.recentAdded, "createdAt"],
                ["Recently updated", stats.recentUpdated, "updatedAt"],
              ] as const
            ).map(([heading, list, key]) => (
              <section key={heading} className="rounded-xl border border-ink/8 bg-white p-5">
                <h2 className="mb-4 font-display font-700 text-[15px] text-ink">{heading}</h2>
                {list.length ? (
                  <ul className="space-y-1">
                    {list.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-cream"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13.5px] font-medium text-ink">
                              {p.name}
                            </span>
                            <span className="block text-[11.5px] text-ink-soft/80">
                              {categories.find((c) => c.slug === p.category)?.name ??
                                "Uncategorised"}{" "}
                              · {relative(p[key])}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ${STATUS_TONE[p.status]}`}
                          >
                            {STATUS_LABEL[p.status]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-ink-soft">No products yet.</p>
                )}
              </section>
            ))}
          </div>
        </>
      )}
    </AdminShell>
  );
}
