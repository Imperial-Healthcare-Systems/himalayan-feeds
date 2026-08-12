"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import { AdminShell } from "@/components/admin/Shell";
import { usePortal } from "@/components/admin/store-context";
import {
  ConfirmDialog,
  EmptyState,
  ErrorState,
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
  IconStar,
  IconTrash,
  LoadingState,
  Modal,
  btnGhost,
  btnPrimary,
  inputCls,
} from "@/components/admin/ui";
import {
  STATUS_LABEL,
  STATUS_TONE,
  type AdminProduct,
  type ProductStatus,
} from "@/lib/admin/types";

type SortKey = "name" | "category" | "updatedAt";

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

/** Pack shot thumbnail. Falls back to a neutral tile when a product has no
    image, rather than rendering a broken <img>. */
function Thumb({ p }: { p: AdminProduct }) {
  if (!p.image) {
    return (
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cream-deep text-[9px] font-bold uppercase tracking-wider text-ink-soft/50">
        None
      </span>
    );
  }
  return (
    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
      <Image src={p.image} alt={p.imageAlt || p.name} fill sizes="44px" className="object-contain" />
    </span>
  );
}

function ProductsInner() {
  const params = useSearchParams();
  const {
    products, categories, loading, error, reload,
    updateProduct, deleteProduct, resetProducts, toast,
  } = usePortal();

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ProductStatus | "all">(
    (params.get("status") as ProductStatus | null) ?? "all",
  );
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [featuredOnly, setFeaturedOnly] = useState(params.get("featured") === "1");
  const [sort, setSort] = useState<SortKey>("updatedAt");

  const [confirming, setConfirming] = useState<AdminProduct | null>(null);
  const [viewing, setViewing] = useState<AdminProduct | null>(null);
  const [busy, setBusy] = useState(false);

  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? "Uncategorised";

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = products.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (category !== "all" && p.category !== category) return false;
      if (featuredOnly && !p.featured) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.slug.toLowerCase().includes(needle) ||
        p.stage.toLowerCase().includes(needle) ||
        p.shortDescription.toLowerCase().includes(needle) ||
        catName(p.category).toLowerCase().includes(needle)
      );
    });

    return out.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") return catName(a.category).localeCompare(catName(b.category));
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, categories, q, status, category, featuredOnly, sort]);

  const filtered = !!q.trim() || status !== "all" || category !== "all" || featuredOnly;

  async function toggleStatus(p: AdminProduct) {
    const next: ProductStatus = p.status === "active" ? "inactive" : "active";
    await updateProduct(p.id, { status: next });
    toast(`${p.name} set to ${STATUS_LABEL[next].toLowerCase()}`);
  }

  async function toggleFeatured(p: AdminProduct) {
    await updateProduct(p.id, { featured: !p.featured });
    toast(`${p.name} ${p.featured ? "removed from" : "marked as"} featured`);
  }

  async function confirmDelete() {
    if (!confirming) return;
    setBusy(true);
    await deleteProduct(confirming.id);
    setBusy(false);
    toast(`${confirming.name} deleted`);
    setConfirming(null);
  }

  function clearFilters() {
    setQ("");
    setStatus("all");
    setCategory("all");
    setFeaturedOnly(false);
  }

  return (
    <AdminShell
      title="Products"
      subtitle="Every product in the Himalayan Feeds catalogue."
      crumbs={[{ label: "Admin", href: "/admin" }, { label: "Products" }]}
      actions={
        <>
          <button
            className={btnGhost}
            onClick={async () => {
              await resetProducts();
              toast("Demo catalogue restored");
            }}
          >
            Reset demo data
          </button>
          <Link href="/admin/products/new" className={btnPrimary}>
            <IconPlus size={16} /> New product
          </Link>
        </>
      }
    >
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-ink-soft/60">
            <IconSearch size={16} />
          </span>
          <input
            type="search"
            aria-label="Search products"
            className={`${inputCls} pl-10`}
            placeholder="Search name, stage, range…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <select
          aria-label="Filter by range"
          className={`${inputCls} w-auto`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All ranges</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by status"
          className={`${inputCls} w-auto`}
          value={status}
          onChange={(e) => setStatus(e.target.value as ProductStatus | "all")}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>

        <select
          aria-label="Sort by"
          className={`${inputCls} w-auto`}
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          <option value="updatedAt">Recently updated</option>
          <option value="name">Name A–Z</option>
          <option value="category">Range</option>
        </select>

        <button
          onClick={() => setFeaturedOnly((v) => !v)}
          aria-pressed={featuredOnly}
          className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold transition-colors ${
            featuredOnly
              ? "border-orange bg-orange-light text-terracotta-dark"
              : "border-ink/12 bg-white text-ink-soft hover:border-ink/25"
          }`}
        >
          <IconStar size={15} /> Featured
        </button>

        <span className="ml-auto text-[12px] font-bold uppercase tracking-[0.11em] text-ink-soft/70">
          {rows.length} of {products.length}
        </span>
      </div>

      {error ? <ErrorState message={error} onRetry={reload} /> : null}

      {loading ? (
        <LoadingState rows={6} label="Loading products…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title={filtered ? "No products match those filters" : "No products yet"}
          body={
            filtered
              ? "Try a different search term, or clear the filters to see the whole catalogue."
              : "Add your first product to start building the catalogue."
          }
          action={
            filtered ? (
              <button className={btnGhost} onClick={clearFilters}>
                Clear filters
              </button>
            ) : (
              <Link href="/admin/products/new" className={btnPrimary}>
                <IconPlus size={16} /> Add product
              </Link>
            )
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-ink/8 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/8 bg-cream/60">
                  {["Product", "Range", "Status", "Featured", "Last updated", ""].map((h, i) => (
                    <th
                      key={h || i}
                      className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft/75 ${
                        i === 5 ? "text-right" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-ink/[0.055] transition-colors last:border-0 hover:bg-cream/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb p={p} />
                        <span className="min-w-0">
                          <span className="block truncate text-[13.5px] font-semibold text-ink">
                            {p.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-ink-soft/80">
                            {p.stage || "—"}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-ink-soft">{catName(p.category)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => void toggleStatus(p)}
                        title={p.status === "active" ? "Deactivate" : "Activate"}
                        className={`rounded-full border px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em] transition-opacity hover:opacity-75 ${STATUS_TONE[p.status]}`}
                      >
                        {STATUS_LABEL[p.status]}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => void toggleFeatured(p)}
                        aria-pressed={p.featured}
                        aria-label={p.featured ? `Unfeature ${p.name}` : `Feature ${p.name}`}
                        className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${
                          p.featured
                            ? "border-orange bg-orange-light text-terracotta"
                            : "border-ink/12 text-ink-soft/50 hover:border-ink/25 hover:text-ink-soft"
                        }`}
                      >
                        <IconStar size={15} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-[12.5px] text-ink-soft/85">
                      {relative(p.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setViewing(p)}
                          aria-label={`View ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
                        >
                          <IconEye size={15} />
                        </button>
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          aria-label={`Edit ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-terracotta hover:text-terracotta"
                        >
                          <IconEdit size={15} />
                        </Link>
                        <button
                          onClick={() => setConfirming(p)}
                          aria-label={`Delete ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewing ? (
        <Modal
          title={viewing.name}
          onClose={() => setViewing(null)}
          width="max-w-2xl"
          footer={
            <>
              <button className={btnGhost} onClick={() => setViewing(null)}>
                Close
              </button>
              <Link className={btnPrimary} href={`/admin/products/${viewing.id}/edit`}>
                Edit product
              </Link>
            </>
          }
        >
          <div className="grid gap-5 sm:grid-cols-[150px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-deep">
              {viewing.image ? (
                <Image
                  src={viewing.image}
                  alt={viewing.imageAlt || viewing.name}
                  fill
                  sizes="150px"
                  className="object-contain p-2"
                />
              ) : (
                <span className="grid h-full place-items-center text-[11px] font-bold uppercase tracking-wider text-ink-soft/50">
                  No image
                </span>
              )}
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 text-[13px]">
              {(
                [
                  ["Range", catName(viewing.category)],
                  ["Stage", viewing.stage],
                  ["Slug", viewing.slug],
                  ["Short description", viewing.shortDescription],
                  ["Description", viewing.description],
                  ["Benefits", viewing.benefits.filter(Boolean).join(" · ")],
                  ["Suitable for", viewing.targetAnimal.filter(Boolean).join(" · ")],
                  ["Feed type", viewing.feedType],
                  ["Pack size", viewing.packSize],
                  ["Usage", viewing.usage],
                  [
                    "Specifications",
                    viewing.specifications
                      .filter((s) => s.label)
                      .map((s) => `${s.label}: ${s.value}`)
                      .join(" · "),
                  ],
                  ["Status", STATUS_LABEL[viewing.status]],
                  ["Featured", viewing.featured ? "Yes" : "No"],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="border-b border-ink/6 py-2 pr-3 text-[10px] font-bold uppercase tracking-[0.11em] whitespace-nowrap text-ink-soft/70">
                    {k}
                  </dt>
                  <dd className="border-b border-ink/6 py-2 break-words text-ink">
                    {v && String(v).trim() ? (
                      v
                    ) : (
                      <span className="italic text-ink-soft/60">Not recorded</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Modal>
      ) : null}

      {confirming ? (
        <ConfirmDialog
          title="Delete product"
          busy={busy}
          body={
            <>
              <p>
                <strong>{confirming.name}</strong> will be removed from the local
                catalogue.
              </p>
              <p className="text-[13px] text-ink-soft">
                This only affects data stored in this browser. Use{" "}
                <strong>Reset demo data</strong> to restore the original
                catalogue from <code className="font-mono text-[12px]">lib/site.ts</code>.
              </p>
            </>
          }
          onConfirm={() => void confirmDelete()}
          onCancel={() => setConfirming(null)}
        />
      ) : null}
    </AdminShell>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <ProductsInner />
    </Suspense>
  );
}
