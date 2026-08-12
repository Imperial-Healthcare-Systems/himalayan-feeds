"use client";

/* ==========================================================================
   ADMIN PORTAL — product form
   Shared by /admin/products/new and /admin/products/[id]/edit. Grouped into
   labelled sections so a non-technical admin is never shown eighteen fields at
   once; validation is inline and sits beside the field it concerns.

   The slug derives from the name until the operator edits it by hand, after
   which it is left alone.
   ========================================================================== */

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { usePortal } from "@/components/admin/store-context";
import {
  Field,
  IconClose,
  ListEditor,
  Toggle,
  btnGhost,
  btnPrimary,
  inputCls,
} from "@/components/admin/ui";
import { slugify, type AdminProduct, type ProductStatus } from "@/lib/admin/types";

export type ProductDraft = Omit<AdminProduct, "id" | "createdAt" | "updatedAt">;

type Errors = Partial<Record<"name" | "category" | "slug", string>>;

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-ink/8 bg-white p-5">
      <legend className="px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft/75">
        {title}
      </legend>
      {hint ? <p className="mb-4 text-[12.5px] text-ink-soft/85">{hint}</p> : <div className="h-1" />}
      {children}
    </fieldset>
  );
}

export function ProductForm({
  initial,
  currentId,
  submitLabel,
  onSubmit,
}: {
  initial: ProductDraft;
  /** Present when editing — excludes this record from the slug clash check. */
  currentId?: string;
  submitLabel: string;
  onSubmit: (draft: ProductDraft) => Promise<void>;
}) {
  const { categories, products } = usePortal();
  const [draft, setDraft] = useState<ProductDraft>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [busy, setBusy] = useState(false);
  const uid = useId();

  function set<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!draft.name.trim()) e.name = "A product name is required.";
    if (!draft.category.trim()) e.category = "Choose a range.";

    const slug = draft.slug.trim() || slugify(draft.name);
    if (!slug) e.slug = "A slug is required.";
    else if (products.some((p) => p.slug === slug && p.id !== currentId)) {
      e.slug = "Another product already uses this slug.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }
    setBusy(true);
    await onSubmit({ ...draft, slug: draft.slug.trim() || slugify(draft.name) });
    setBusy(false);
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4 pb-24">
      <Section title="Identity">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Product name" required htmlFor={`${uid}-n`} error={errors.name} full>
            <input
              id={`${uid}-n`}
              data-invalid={!!errors.name}
              className={inputCls}
              value={draft.name}
              placeholder="e.g. Calf Starter"
              onChange={(e) => {
                set("name", e.target.value);
                if (!slugTouched) set("slug", slugify(e.target.value));
              }}
            />
          </Field>

          <Field label="Range" required htmlFor={`${uid}-c`} error={errors.category}>
            <select
              id={`${uid}-c`}
              data-invalid={!!errors.category}
              className={inputCls}
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">Select a range…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Stage"
            htmlFor={`${uid}-st`}
            hint="Where it sits in the animal's cycle — Calf, In milk, Starter…"
          >
            <input
              id={`${uid}-st`}
              className={inputCls}
              value={draft.stage}
              placeholder="e.g. Calf"
              onChange={(e) => set("stage", e.target.value)}
            />
          </Field>

          <Field label="Slug" required htmlFor={`${uid}-s`} error={errors.slug} hint="Used in the product URL." full>
            <input
              id={`${uid}-s`}
              data-invalid={!!errors.slug}
              className={inputCls}
              value={draft.slug}
              placeholder="auto-generated from the name"
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value);
              }}
            />
          </Field>
        </div>
      </Section>

      <Section title="Content">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Short description" htmlFor={`${uid}-sd`} hint="One line, shown under the name." full>
            <input
              id={`${uid}-sd`}
              className={inputCls}
              value={draft.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
            />
          </Field>

          <Field label="Description" htmlFor={`${uid}-d`} hint="Two or three sentences of range copy." full>
            <textarea
              id={`${uid}-d`}
              rows={5}
              className={inputCls}
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>

          <Field
            label="Usage / instructions"
            htmlFor={`${uid}-u`}
            hint="Leave blank unless the client has confirmed it in writing."
            full
          >
            <textarea
              id={`${uid}-u`}
              rows={3}
              className={inputCls}
              value={draft.usage}
              onChange={(e) => set("usage", e.target.value)}
            />
          </Field>

          <Field label="Benefits" hint="Short phrases, rendered as pills.">
            <ListEditor
              items={draft.benefits}
              onChange={(v) => set("benefits", v)}
              placeholder="e.g. Easy to digest"
              addLabel="Add benefit"
            />
          </Field>

          <Field label="Suitable for" hint="Who the product is for.">
            <ListEditor
              items={draft.targetAnimal}
              onChange={(v) => set("targetAnimal", v)}
              placeholder="e.g. Calves"
              addLabel="Add audience"
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Specification"
        hint="A blank field renders as “On request” on the public site. Never fill one from a competitor's label — see docs/product-catalogue-spec.md §2.6."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Feed type" htmlFor={`${uid}-ft`} hint="Pellet, mash, crumble…">
            <input
              id={`${uid}-ft`}
              className={inputCls}
              value={draft.feedType}
              placeholder="Leave blank if unconfirmed"
              onChange={(e) => set("feedType", e.target.value)}
            />
          </Field>

          <Field label="Pack size" htmlFor={`${uid}-ps`} hint="e.g. 25 kg, 50 kg">
            <input
              id={`${uid}-ps`}
              className={inputCls}
              value={draft.packSize}
              placeholder="Leave blank if unconfirmed"
              onChange={(e) => set("packSize", e.target.value)}
            />
          </Field>

          <Field label="Additional specifications" full>
            <div className="space-y-2">
              {draft.specifications.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1.3fr_auto] gap-2">
                  <input
                    className={inputCls}
                    value={s.label}
                    placeholder="Label"
                    onChange={(e) => {
                      const next = draft.specifications.slice();
                      next[i] = { ...next[i], label: e.target.value };
                      set("specifications", next);
                    }}
                  />
                  <input
                    className={inputCls}
                    value={s.value}
                    placeholder="Value"
                    onChange={(e) => {
                      const next = draft.specifications.slice();
                      next[i] = { ...next[i], value: e.target.value };
                      set("specifications", next);
                    }}
                  />
                  <button
                    type="button"
                    aria-label={`Remove specification ${i + 1}`}
                    onClick={() =>
                      set("specifications", draft.specifications.filter((_, j) => j !== i))
                    }
                    className="grid h-[42px] w-10 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <IconClose size={15} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("specifications", [...draft.specifications, { label: "", value: "" }])}
                className="rounded-full border border-ink/12 px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-colors hover:border-terracotta/40 hover:bg-orange-light hover:text-terracotta-dark"
              >
                + Add specification
              </button>
            </div>
          </Field>
        </div>
      </Section>

      <Section title="Imagery" hint="Paths under /public. Pack artwork must not be edited or re-lettered.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary image" htmlFor={`${uid}-img`} hint="e.g. /images/products/calf-starter.webp">
            <input
              id={`${uid}-img`}
              className={inputCls}
              value={draft.image}
              placeholder="/images/products/…"
              onChange={(e) => set("image", e.target.value)}
            />
          </Field>

          <Field label="Image alt text" htmlFor={`${uid}-alt`} hint="Describe what the bag actually says.">
            <input
              id={`${uid}-alt`}
              className={inputCls}
              value={draft.imageAlt}
              onChange={(e) => set("imageAlt", e.target.value)}
            />
          </Field>

          {/* Live preview — confirms the path resolves before saving. */}
          <div className="sm:col-span-2">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.11em] text-ink-soft">
              Preview
            </p>
            <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-ink/8 bg-cream-deep">
              {draft.image ? (
                <Image
                  key={draft.image}
                  src={draft.image}
                  alt={draft.imageAlt || "Product image preview"}
                  fill
                  sizes="160px"
                  className="object-contain p-2"
                />
              ) : (
                <span className="grid h-full place-items-center px-3 text-center text-[11px] font-bold uppercase tracking-wider text-ink-soft/50">
                  No image
                </span>
              )}
            </div>
          </div>

          <Field label="Additional images" full>
            <ListEditor
              items={draft.additionalImages}
              onChange={(v) => set("additionalImages", v)}
              placeholder="/images/products/…"
              addLabel="Add image"
            />
          </Field>
        </div>
      </Section>

      <Section title="Visibility">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Status" htmlFor={`${uid}-stat`}>
            <select
              id={`${uid}-stat`}
              className={inputCls}
              value={draft.status}
              onChange={(e) => set("status", e.target.value as ProductStatus)}
            >
              <option value="draft">Draft — not published</option>
              <option value="active">Active — visible publicly</option>
              <option value="inactive">Inactive — hidden</option>
            </select>
          </Field>

          <div className="flex items-center gap-3 rounded-lg border border-ink/12 bg-white px-4 py-3 sm:mt-6">
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-ink">Featured</p>
              <p className="text-[12px] text-ink-soft">Highlights this product in listings.</p>
            </div>
            <Toggle
              on={draft.featured}
              onChange={(v) => set("featured", v)}
              label="Mark product as featured"
            />
          </div>
        </div>
      </Section>

      {/* Sticky action bar — save is always reachable on a long form. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/8 bg-cream/95 px-4 py-3 backdrop-blur-md lg:pl-[calc(236px+1rem)]">
        <div className="flex flex-wrap items-center gap-2">
          <button type="submit" disabled={busy} className={btnPrimary}>
            {busy ? "Saving…" : submitLabel}
          </button>
          <Link href="/admin/products" className={btnGhost}>
            Cancel
          </Link>
          <span className="ml-auto text-[12px] text-ink-soft">Saved to this browser only.</span>
        </div>
      </div>
    </form>
  );
}
