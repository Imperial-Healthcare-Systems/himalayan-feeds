/* ==========================================================================
   ADMIN PORTAL — data access layer
   --------------------------------------------------------------------------
   Every screen talks to this module and nothing else. Today it resolves
   against localStorage; when a REST API exists, swap the body of each method
   for a fetch call and no screen changes — the signatures are already async
   and already return these shapes.

   Seed data is derived from lib/site.ts, i.e. the catalogue the public site
   already ships. Fields the client has not confirmed (usage, and the specs
   lib/site.ts deliberately leaves null) are seeded EMPTY rather than filled
   with plausible-looking text.
   ========================================================================== */

import { CATEGORIES } from "@/lib/site";
import { slugify, type AdminCategory, type AdminProduct } from "@/lib/admin/types";

const PRODUCTS_KEY = "hf_admin_products_v1";
const CATEGORIES_KEY = "hf_admin_categories_v1";

/** Simulated latency so loading states are real, not decorative. */
const LATENCY = 180;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

function nowIso(): string {
  return new Date().toISOString();
}

/* Stable ids without a crypto dependency — monotonic + random suffix. */
let counter = 0;
function makeId(prefix: string): string {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}${Math.floor(
    Math.random() * 1e6,
  ).toString(36)}`;
}

function canStore(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function read<T>(key: string): T | null {
  if (!canStore()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T): void {
  if (!canStore()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Quota or private mode — the session still works, it just won't persist. */
  }
}

/* ----------------------------------------------------------------- seeding */

function seedCategories(): AdminCategory[] {
  return CATEGORIES.map((c, i) => ({
    id: makeId("cat"),
    slug: c.slug,
    name: c.name,
    animal: c.animal,
    blurb: c.blurb,
    accent: c.accent,
    status: c.status,
    image: c.image,
    order: i,
  }));
}

function seedProducts(): AdminProduct[] {
  const t = nowIso();
  return CATEGORIES.flatMap((c) =>
    c.products.map((p) => ({
      id: makeId("prd"),
      name: p.name,
      category: c.slug,
      group: p.group ?? "",
      slug: p.slug,
      stage: p.stage,
      shortDescription: p.summary,
      description: p.description,
      benefits: [...p.highlights],
      targetAnimal: [...p.suitableFor],
      /* null in the public data means "not confirmed in writing" — it stays
         empty here so the admin shows a genuine gap, not a guess. */
      feedType: p.form ?? "",
      packSize: p.packSizes ?? "",
      usage: "",
      specifications: [],
      image: p.image,
      imageAlt: p.imageAlt,
      additionalImages: [],
      status: "active" as const,
      featured: false,
      createdAt: t,
      updatedAt: t,
    })),
  );
}

/* ------------------------------------------------------------------- reads */

function loadProducts(): AdminProduct[] {
  const stored = read<AdminProduct[]>(PRODUCTS_KEY);
  if (stored && Array.isArray(stored)) return stored;
  const seeded = seedProducts();
  write(PRODUCTS_KEY, seeded);
  return seeded;
}

function loadCategories(): AdminCategory[] {
  const stored = read<AdminCategory[]>(CATEGORIES_KEY);
  if (stored && Array.isArray(stored)) return stored;
  const seeded = seedCategories();
  write(CATEGORIES_KEY, seeded);
  return seeded;
}

/* ------------------------------------------------------------------ public */

export const productStore = {
  async list(): Promise<AdminProduct[]> {
    return delay(loadProducts());
  },

  async get(id: string): Promise<AdminProduct | null> {
    return delay(loadProducts().find((p) => p.id === id) ?? null);
  },

  async create(
    input: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">,
  ): Promise<AdminProduct> {
    const all = loadProducts();
    const t = nowIso();
    const record: AdminProduct = {
      ...input,
      id: makeId("prd"),
      slug: input.slug || slugify(input.name),
      createdAt: t,
      updatedAt: t,
    };
    write(PRODUCTS_KEY, [record, ...all]);
    return delay(record);
  },

  async update(id: string, patch: Partial<AdminProduct>): Promise<AdminProduct | null> {
    const all = loadProducts();
    const i = all.findIndex((p) => p.id === id);
    if (i === -1) return delay(null);
    const next: AdminProduct = { ...all[i], ...patch, id, updatedAt: nowIso() };
    all[i] = next;
    write(PRODUCTS_KEY, all);
    return delay(next);
  },

  async remove(id: string): Promise<boolean> {
    const all = loadProducts();
    const next = all.filter((p) => p.id !== id);
    write(PRODUCTS_KEY, next);
    return delay(next.length !== all.length);
  },

  /** Restore the seed catalogue from lib/site.ts. */
  async reset(): Promise<AdminProduct[]> {
    const seeded = seedProducts();
    write(PRODUCTS_KEY, seeded);
    return delay(seeded);
  },
};

export const categoryStore = {
  async list(): Promise<AdminCategory[]> {
    return delay(loadCategories().slice().sort((a, b) => a.order - b.order));
  },

  async create(input: Omit<AdminCategory, "id">): Promise<AdminCategory> {
    const all = loadCategories();
    const record: AdminCategory = {
      ...input,
      id: makeId("cat"),
      slug: input.slug || slugify(input.name),
    };
    write(CATEGORIES_KEY, [...all, record]);
    return delay(record);
  },

  async update(id: string, patch: Partial<AdminCategory>): Promise<AdminCategory | null> {
    const all = loadCategories();
    const i = all.findIndex((c) => c.id === id);
    if (i === -1) return delay(null);
    const next = { ...all[i], ...patch, id };
    all[i] = next;
    write(CATEGORIES_KEY, all);
    return delay(next);
  },

  async remove(id: string): Promise<boolean> {
    const all = loadCategories();
    const next = all.filter((c) => c.id !== id);
    write(CATEGORIES_KEY, next);
    return delay(next.length !== all.length);
  },
};
