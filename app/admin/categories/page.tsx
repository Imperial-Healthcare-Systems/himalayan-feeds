"use client";

import { useState } from "react";

import { AdminShell } from "@/components/admin/Shell";
import { usePortal } from "@/components/admin/store-context";
import {
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Field,
  IconEdit,
  IconPlus,
  IconTrash,
  LoadingState,
  Modal,
  btnGhost,
  btnPrimary,
  inputCls,
} from "@/components/admin/ui";
import { ACCENT_DOT, slugify, type AdminCategory } from "@/lib/admin/types";

type Draft = {
  name: string;
  slug: string;
  animal: string;
  brand: string;
  blurb: string;
  accent: AdminCategory["accent"];
  status: AdminCategory["status"];
  image: string;
};

const BLANK: Draft = {
  name: "",
  slug: "",
  animal: "",
  brand: "",
  blurb: "",
  accent: "orange",
  status: "coming-soon",
  image: "",
};

export default function AdminCategoriesPage() {
  const {
    categories, products, loading, error, reload,
    createCategory, updateCategory, deleteCategory, toast,
  } = usePortal();

  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(BLANK);
  const [nameError, setNameError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<AdminCategory | null>(null);
  const [busy, setBusy] = useState(false);

  const countFor = (slug: string) => products.filter((p) => p.category === slug).length;

  function openCreate() {
    setDraft(BLANK);
    setNameError(null);
    setCreating(true);
  }

  function openEdit(c: AdminCategory) {
    setDraft({
      name: c.name, slug: c.slug, animal: c.animal, brand: c.brand,
      blurb: c.blurb, accent: c.accent, status: c.status, image: c.image,
    });
    setNameError(null);
    setEditing(c);
  }

  function close() {
    setCreating(false);
    setEditing(null);
    setNameError(null);
  }

  async function save() {
    const name = draft.name.trim();
    if (!name) {
      setNameError("A range name is required.");
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== editing?.id)) {
      setNameError("A range with this name already exists.");
      return;
    }

    setBusy(true);
    const payload = { ...draft, name, slug: draft.slug.trim() || slugify(name) };

    if (editing) {
      await updateCategory(editing.id, payload);
      toast(`${name} updated`);
    } else {
      await createCategory({ ...payload, order: categories.length });
      toast(`${name} created`);
    }
    setBusy(false);
    close();
  }

  async function confirmDelete() {
    if (!confirming) return;
    setBusy(true);
    await deleteCategory(confirming.id);
    setBusy(false);
    toast(`${confirming.name} deleted`);
    setConfirming(null);
  }

  return (
    <AdminShell
      title="Categories"
      subtitle="The ranges that group the catalogue and drive the public product tiles."
      crumbs={[{ label: "Admin", href: "/admin" }, { label: "Categories" }]}
      actions={
        <button onClick={openCreate} className={btnPrimary}>
          <IconPlus size={16} /> New range
        </button>
      }
    >
      {error ? <ErrorState message={error} onRetry={reload} /> : null}

      {loading ? (
        <LoadingState rows={3} label="Loading categories…" />
      ) : categories.length === 0 ? (
        <EmptyState
          title="No ranges yet"
          body="Ranges group the catalogue and drive the image-led tiles on the public products page."
          action={
            <button onClick={openCreate} className={btnPrimary}>
              <IconPlus size={16} /> Add range
            </button>
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex flex-col rounded-xl border border-ink/8 bg-white p-5 transition-shadow duration-200 hover:shadow-soft"
            >
              <div className="flex items-start gap-2.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ACCENT_DOT[c.accent]}`} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-700 text-[15px] text-ink">{c.name}</p>
                  <p className="text-[12px] text-ink-soft/85">
                    {c.brand} · {c.animal}
                  </p>
                </div>
                {c.status === "coming-soon" ? (
                  <span className="shrink-0 rounded-full border border-ink/12 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-ink-soft/70">
                    Soon
                  </span>
                ) : null}
              </div>

              <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">{c.blurb}</p>

              <div className="mt-4 flex items-center gap-2 border-t border-ink/6 pt-3">
                <span className="text-[12px] font-semibold tabular-nums text-ink-soft">
                  {countFor(c.slug)} product{countFor(c.slug) === 1 ? "" : "s"}
                </span>
                <span className="ml-auto flex gap-1.5">
                  <button
                    onClick={() => openEdit(c)}
                    aria-label={`Edit ${c.name}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    <IconEdit size={15} />
                  </button>
                  <button
                    onClick={() => setConfirming(c)}
                    aria-label={`Delete ${c.name}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <IconTrash size={15} />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {creating || editing ? (
        <Modal
          title={editing ? "Edit range" : "New range"}
          onClose={close}
          footer={
            <>
              <button className={btnGhost} onClick={close} disabled={busy}>
                Cancel
              </button>
              <button className={btnPrimary} onClick={() => void save()} disabled={busy}>
                {busy ? "Saving…" : editing ? "Save changes" : "Create range"}
              </button>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" required htmlFor="cat-n" error={nameError} full>
              <input
                id="cat-n"
                autoFocus
                className={inputCls}
                value={draft.name}
                placeholder="e.g. Cattle Feed"
                onChange={(e) => {
                  const v = e.target.value;
                  setDraft((d) => ({ ...d, name: v, slug: editing ? d.slug : slugify(v) }));
                  setNameError(null);
                }}
              />
            </Field>

            <Field label="Slug" htmlFor="cat-s">
              <input
                id="cat-s"
                className={inputCls}
                value={draft.slug}
                onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
              />
            </Field>

            <Field label="Sub-brand" htmlFor="cat-b" hint="e.g. Godhenu Gold">
              <input
                id="cat-b"
                className={inputCls}
                value={draft.brand}
                onChange={(e) => setDraft((d) => ({ ...d, brand: e.target.value }))}
              />
            </Field>

            <Field label="Audience" htmlFor="cat-a" hint="e.g. For dairy cattle & buffalo" full>
              <input
                id="cat-a"
                className={inputCls}
                value={draft.animal}
                onChange={(e) => setDraft((d) => ({ ...d, animal: e.target.value }))}
              />
            </Field>

            <Field label="Blurb" htmlFor="cat-bl" full>
              <textarea
                id="cat-bl"
                rows={3}
                className={inputCls}
                value={draft.blurb}
                onChange={(e) => setDraft((d) => ({ ...d, blurb: e.target.value }))}
              />
            </Field>

            <Field label="Accent" htmlFor="cat-ac">
              <select
                id="cat-ac"
                className={inputCls}
                value={draft.accent}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, accent: e.target.value as AdminCategory["accent"] }))
                }
              >
                <option value="terracotta">Terracotta</option>
                <option value="orange">Orange</option>
                <option value="leaf">Leaf</option>
              </select>
            </Field>

            <Field label="Status" htmlFor="cat-st">
              <select
                id="cat-st"
                className={inputCls}
                value={draft.status}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, status: e.target.value as AdminCategory["status"] }))
                }
              >
                <option value="available">Available</option>
                <option value="coming-soon">Coming soon</option>
              </select>
            </Field>

            <Field label="Tile image" htmlFor="cat-i" hint="e.g. /images/cattle.webp" full>
              <input
                id="cat-i"
                className={inputCls}
                value={draft.image}
                onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
              />
            </Field>
          </div>
        </Modal>
      ) : null}

      {confirming ? (
        <ConfirmDialog
          title="Delete range"
          busy={busy}
          body={
            <>
              <p>
                Delete <strong>{confirming.name}</strong>?
              </p>
              {countFor(confirming.slug) > 0 ? (
                <p className="text-[13px] text-terracotta-dark">
                  {countFor(confirming.slug)} product
                  {countFor(confirming.slug) === 1 ? "" : "s"} currently sit in
                  this range. They will keep the slug but it will no longer
                  appear in the filter list.
                </p>
              ) : null}
            </>
          }
          onConfirm={() => void confirmDelete()}
          onCancel={() => setConfirming(null)}
        />
      ) : null}
    </AdminShell>
  );
}
