/* ==========================================================================
   ADMIN PORTAL — domain types
   --------------------------------------------------------------------------
   A superset of the public `Product` in lib/site.ts. The marketing site reads
   the published shape; the admin needs editorial fields on top (status,
   featured, extra imagery, usage). `toPublicProduct` collapses an AdminProduct
   back to the public shape so the two never drift.

   Nothing here invents product content. Fields the client has not confirmed in
   writing — `usage`, and the specs that lib/site.ts deliberately leaves null —
   start EMPTY. docs/product-catalogue-spec.md §2.6 is explicit that a spec
   nobody has stood behind must not be filled from a competitor's label, and
   that rule holds inside the admin too.
   ========================================================================== */

import type { Product } from "@/lib/site";

/** Draft is the safe default: a new record is not public until published. */
export type ProductStatus = "active" | "inactive" | "draft";

export type Spec = { label: string; value: string };

export type AdminProduct = {
  id: string;
  name: string;
  /** Category slug — must match a Category.slug */
  category: string;
  slug: string;
  /** Where the product sits in the animal's cycle — maps to Product.stage */
  stage: string;
  /** One line under the name — maps to Product.summary */
  shortDescription: string;
  description: string;
  /** Benefit phrases rendered as pills — maps to Product.highlights */
  benefits: string[];
  /** Who it is for — maps to Product.suitableFor */
  targetAnimal: string[];
  /** Pellet / mash / crumble — maps to Product.form. Empty = "On request". */
  feedType: string;
  /** Maps to Product.packSizes. Empty = "On request". */
  packSize: string;
  /** Dosing or feeding instructions. Not present in the public data — starts
      empty and stays empty until the client supplies it. */
  usage: string;
  specifications: Spec[];
  /** Path under /public — maps to Product.image */
  image: string;
  imageAlt: string;
  additionalImages: string[];
  status: ProductStatus;
  featured: boolean;
  /** ISO timestamps */
  createdAt: string;
  updatedAt: string;
};

export type AdminCategory = {
  id: string;
  slug: string;
  name: string;
  /** "For dairy cattle & buffalo" */
  animal: string;
  /** Sub-brand: Godhenu Gold / Nutri Choice / Matsya Bandhu */
  brand: string;
  blurb: string;
  accent: "terracotta" | "orange" | "leaf";
  status: "available" | "coming-soon";
  image: string;
  order: number;
};

/** A brand-new, entirely empty product. No invented defaults. */
export function emptyProduct(): Omit<AdminProduct, "id" | "createdAt" | "updatedAt"> {
  return {
    name: "",
    category: "",
    slug: "",
    stage: "",
    shortDescription: "",
    description: "",
    benefits: [],
    targetAnimal: [],
    feedType: "",
    packSize: "",
    usage: "",
    specifications: [],
    image: "",
    imageAlt: "",
    additionalImages: [],
    status: "draft",
    featured: false,
  };
}

export function slugify(v: string): string {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Collapse an admin record back to the public Product shape. An empty
    feedType/packSize becomes null, which is what the public spec strip reads
    as "On request". */
export function toPublicProduct(p: AdminProduct): Product {
  return {
    slug: p.slug,
    name: p.name,
    stage: p.stage,
    summary: p.shortDescription,
    description: p.description,
    highlights: p.benefits.filter(Boolean),
    suitableFor: p.targetAnimal.filter(Boolean),
    form: p.feedType.trim() || null,
    packSizes: p.packSize.trim() || null,
    image: p.image,
    imageAlt: p.imageAlt,
  };
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  draft: "Draft",
};

/** Status tone classes. Written out in full — Tailwind v4 only generates
    classes it can literally see in the source. */
export const STATUS_TONE: Record<ProductStatus, string> = {
  active: "bg-leaf-light text-leaf-dark border-leaf/25",
  inactive: "bg-ink/5 text-ink-soft border-ink/12",
  draft: "bg-orange-light text-terracotta-dark border-orange/25",
};

/** Accent dot per range — also written out in full for the same reason. */
export const ACCENT_DOT: Record<string, string> = {
  terracotta: "bg-terracotta",
  orange: "bg-orange",
  leaf: "bg-leaf",
};
