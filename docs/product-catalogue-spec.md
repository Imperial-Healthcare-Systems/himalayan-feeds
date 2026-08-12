# Product Catalogue — Design Spec

> **Status: partially built.** Levels 1 and 2 are live. See "What is built" below
> for exactly what shipped and what is still proposal.

## What is built

| Shipped | Where |
|---|---|
| `/products` — catalogue home, opens on the first range | `app/products/page.tsx` |
| `/products/[category]` — one per range, prerendered | `app/products/[category]/page.tsx` |
| Left panel: categories + sub-categories, sticky | `components/catalogue/CategoryNav.tsx` |
| Right panel: range banner + product grid + empty state | `components/catalogue/CatalogueView.tsx` |
| Product tile with pack shot, tag chip, copy, enquiry CTA | `components/catalogue/ProductCard.tsx` |
| Accent lookup (Tailwind-safe, no interpolated classes) | `components/catalogue/accents.ts` |
| 12 products across cattle and poultry | `lib/site.ts` |
| 12 placeholder pack shots, 28 KB total | `public/images/products/*.svg` |
| Motion primitives — rise, wipe, drift, bloom, sheen, link-rule | `app/globals.css` |
| Homepage "Our Categories" entry card + 3 range cards | `components/ProductGrid.tsx` |

**Not built — still proposal:** the third level (`/products/[category]/[product]`),
`ProductTable`, `FeedingGuide`, `SpecRow`, `Breadcrumbs`, `StageFilter`, `sitemap.ts`,
and the `lib/catalogue.ts` file split. Products currently live in `lib/site.ts` and
render as cards inside the category page rather than on pages of their own.

**Why two levels and not three:** there are no confirmed specifications yet (§2.6).
A per-product page whose only content is a paragraph already shown on the card is a
thinner page, not a richer one. The third level earns its place the moment the
guaranteed analysis and feeding schedules arrive — the content model in §2.2 is
already shaped for it.

---

## 0. Where it stands today, and the gap

`lib/site.ts` holds **three flat records** in `CATEGORIES` — poultry, fish, cattle.
`ProductGrid.tsx` renders them as three cards on both `/` and `/products`.

Three problems block this from being a catalogue:

| # | Problem | Consequence |
|---|---------|-------------|
| 1 | **The links are a dead loop.** Each card links to `/products#poultry-feed`, and the anchor lands on *the same card* rendered by the same component. | "Explore" leads nowhere. A visitor who wants to know what's actually in the bag has no next click. |
| 2 | **One record = one species.** There is no room for SKUs (Starter / Grower / Finisher, pellet sizes, pack sizes). | A feed mill sells 15–30 products. The site can show 3. |
| 3 | **No spec surface.** `protein: "34% Protein · 5% Fat"` is a single display string, not data. | Cannot be tabled, compared, filtered, or reused in a datasheet PDF. |

The fix is one structural change — **split "category" from "product"** — and everything
else follows from it.

> ⚠️ **The numbers currently in `lib/site.ts` are template placeholders**, carried over
> from the original build. `34% Protein` and `5% Fat` have not been
> confirmed by the client. Feed labelling in India is regulated (BIS species standards;
> dealers quote these figures at point of sale). **Nothing numeric goes live without
> written client confirmation.** §2.6 defines how the schema enforces this.

---

# PART 1 — STRUCTURE & ARCHITECTURE

## 1.1 Route map

Three levels. All static, all prerendered — same as the six routes the site already ships.

```
/products                        BUILT — catalogue home, opens on Cattle Feed
│
├── /products/cattle-feed        BUILT — the Godhenu Gold range, 6 products
├── /products/poultry-feed       BUILT — the Nutri Choice range, 6 products
├── /products/fish-feed          BUILT — Matsya Bandhu, enquiry panel (no SKUs yet)
│
└── /products/cattle-feed/calf-feed
                                 PROPOSED — per-product page, blocked on specs
```

**Why three levels and not two.** A visitor arrives with one of three intents:
*browse* (what do you make?), *compare* (which one for my 3-week broilers?), and
*verify* (what's the protein, what pack sizes, how do I store it?). Each level answers
exactly one. Collapsing to two forces one page to do two jobs and it stops being premium.

**Route generation** — `generateStaticParams` on both dynamic segments. 3 category
pages + ~15 product pages = ~18 extra HTML files at build time. No runtime cost, no
backend, no database. This is the same rendering model the site uses now.

## 1.2 File tree

```
app/
  products/
    page.tsx                     ← REWRITE: catalogue home (currently reuses ProductGrid)
    [category]/
      page.tsx                   ← NEW: category range page
      [product]/
        page.tsx                 ← NEW: product detail page
lib/
  site.ts                        ← TRIM: keep BRAND, SOCIALS, NAV. Re-export catalogue.
  catalogue.ts                   ← NEW: the content file (see PART 2)
components/
  catalogue/
    CategoryCard.tsx             ← NEW: category tile (extracted from ProductGrid)
    ProductCard.tsx              ← NEW: SKU tile — pack shot, stage chip, key spec
    ProductTable.tsx             ← NEW: composition / analysis table
    FeedingGuide.tsx             ← NEW: stage → age → quantity table
    SpecRow.tsx                  ← NEW: label/value row, hides itself when value is null
    StageFilter.tsx              ← NEW ("use client"): chip filter on category pages
    ProductEnquiry.tsx           ← NEW: WhatsApp CTA prefilled with the product name
    Breadcrumbs.tsx              ← NEW: Home › Products › Poultry › Broiler Starter
  ProductGrid.tsx                ← KEEP: homepage teaser only, now reads CategoryCard
public/images/products/          ← NEW: pack shots (see §1.7)
```

**Only `StageFilter` is a client component.** Everything else stays a Server Component,
so no catalogue JS ships to the browser. This matters — `"use client"` is contagious
downward through imports, which is exactly why `NewsletterSignup` and `WhatsAppFloat`
were already extracted out of `Footer`. Same discipline here.

## 1.3 Component inventory — reuse vs. new

| Reused as-is | Purpose |
|---|---|
| `PageShell` + `PageHeader` | Chrome and title block on all catalogue pages |
| `Reveal` | Scroll-in animation on grids and sections |
| `DealershipBand` | Conversion band at the foot of category pages |
| `Certifications` | Trust marquee on the catalogue home |
| `ContactBlock` | Enquiry block on product pages |

| New | Why it can't be reused |
|---|---|
| `ProductCard` | Different aspect ratio (pack shot is portrait 3:4, not 16:9), carries stage + form + pack-size metadata a category tile has no slot for |
| `ProductTable` | Two-column spec table with null-row suppression |
| `StageFilter` | Needs `useState` — the only interactive piece |

## 1.4 Data flow

```
lib/catalogue.ts
   │  CATEGORIES: Category[]        (4 records, each holds products: Product[])
   │  ALL_PRODUCTS: Product[]       (derived — flat list, for the index + params)
   │  getCategory(slug)             (derived lookup)
   │  getProduct(catSlug, slug)     (derived lookup)
   ▼
Server Components import directly. No fetch, no props drilling, no state.
   ▼
generateStaticParams() reads the same arrays → routes exist because content exists.
```

**The rule: content is the source of truth for routes.** Add a product to
`catalogue.ts`, and its page, its params, its sitemap entry and its nav link all appear.
Delete it and they all disappear. No second place to update, no orphan routes.

`NAV` in `site.ts` already maps over `CATEGORIES` — that keeps working unchanged.

## 1.5 Page anatomy

### `/products` — catalogue home

```
┌────────────────────────────────────────────────────────────────┐
│  PageHeader   "Our Products"                                   │  cream-deep/60
│               Feed for poultry, fish & cattle                  │
├────────────────────────────────────────────────────────────────┤
│  THREE CATEGORY CARDS — lg:grid-cols-3                         │  ramp: /70 → /20
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                     │  py-24 lg:py-32
│  │  photo    │ │  photo    │ │  photo    │                     │
│  │  Poultry  │ │  Fish     │ │  Cattle   │                     │
│  │  6 SKUs   │ │  4 SKUs   │ │  4 SKUs   │  ← live count       │
│  │  Explore  │ │  Explore  │ │  Explore  │    from data        │
│  └───────────┘ └───────────┘ └───────────┘                     │
│  Three across reads better than four — each card is wider,     │
│  so the 16:9 photo carries more weight on the page.            │
├────────────────────────────────────────────────────────────────┤
│  FULL RANGE INDEX                                              │  ramp: /20 → /45
│  Every SKU as a compact row, grouped by category.              │  py-20 lg:py-24
│  Name · Stage · Form · Pack sizes · →                          │
│  The "I know what I want" path. Scannable, no scrolling        │
│  through three hero images to find one product.                │
├────────────────────────────────────────────────────────────────┤
│  Certifications marquee  →  DealershipBand                     │
└────────────────────────────────────────────────────────────────┘
```

### `/products/[category]` — the range

```
┌────────────────────────────────────────────────────────────────┐
│  Breadcrumbs: Home › Products › Poultry Feed                   │
├────────────────────────────────────────────────────────────────┤
│  RANGE HERO — split, not centred                               │  accent-tinted
│  ┌──────────────────────┐  ┌───────────────────────────────┐   │
│  │ eyebrow: NUTRI CHOICE│  │                               │   │
│  │ H1 Poultry Feed      │  │      category photo           │   │
│  │ 2-para range story   │  │                               │   │
│  │ ▸ 6 products         │  │                               │   │
│  │ ▸ Starter→Finisher   │  │                               │   │
│  │ [Talk to us]         │  │                               │   │
│  └──────────────────────┘  └───────────────────────────────┘   │
├────────────────────────────────────────────────────────────────┤
│  StageFilter:  ( All )  ( Starter )  ( Grower )  ( Finisher )  │  ← client component
├────────────────────────────────────────────────────────────────┤
│  PRODUCT GRID — 3 across on desktop, 2 tablet, 1 mobile        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │ pack shot│ │ pack shot│ │ pack shot│  3:4 portrait          │
│  │ ──────── │ │ ──────── │ │ ──────── │                        │
│  │ [STARTER]│ │ [GROWER] │ │[FINISHER]│  stage chip, accent    │
│  │ Broiler  │ │ Broiler  │ │ Broiler  │                        │
│  │ Starter  │ │ Grower   │ │ Finisher │                        │
│  │ Crumble  │ │ Pellet   │ │ Pellet   │                        │
│  │ 50/25 kg │ │ 50/25 kg │ │ 50/25 kg │                        │
│  │ View →   │ │ View →   │ │ View →   │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
├────────────────────────────────────────────────────────────────┤
│  "Why this range" — 3 differentiators, category-specific       │
├────────────────────────────────────────────────────────────────┤
│  DealershipBand                                                │
└────────────────────────────────────────────────────────────────┘
```

### `/products/[category]/[product]` — the detail page

This is where "premium and informative" is won or lost.

```
┌────────────────────────────────────────────────────────────────┐
│  Breadcrumbs: Home › Products › Poultry Feed › Broiler Starter │
├────────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐   ┌────────────────────────────────┐   │
│  │                    │   │ NUTRI CHOICE            eyebrow│   │
│  │                    │   │ Broiler Starter Crumble     H1 │   │
│  │    PACK SHOT       │   │ ───────────────────────────────│   │
│  │    sticky on       │   │ Lead paragraph — 2 sentences,  │   │
│  │    desktop scroll  │   │ what it is and who it's for.   │   │
│  │                    │   │                                │   │
│  │                    │   │ [ Crumble ] [ Day 1–14 ] [50kg]│   │  spec chips
│  │                    │   │                                │   │
│  └────────────────────┘   │ ┌────────────────────────────┐ │   │
│                           │ │ Enquire on WhatsApp        │ │   │  prefilled msg
│                           │ │ Call 90860-00555           │ │   │
│                           │ └────────────────────────────┘ │   │
│                           └────────────────────────────────┘   │
├────────────────────────────────────────────────────────────────┤
│  OVERVIEW — 2–3 paragraphs of real copy, not filler            │
├────────────────────────────────────────────────────────────────┤
│  KEY BENEFITS — 4 cards, icon + title + one line each          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                   │
│  │ FCR    │ │ Gut    │ │ Uniform│ │ Pellet │                   │
│  │ ...    │ │ health │ │ growth │ │ quality│                   │
│  └────────┘ └────────┘ └────────┘ └────────┘                   │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐ ┌───────────────────────────┐    │
│  │ GUARANTEED ANALYSIS      │ │ FEEDING GUIDE             │    │
│  │ Crude protein     ...    │ │ Age      Feed/bird  Form  │    │
│  │ Crude fat         ...    │ │ Day 1–7   ...       Crumb │    │
│  │ Crude fibre       ...    │ │ Day 8–14  ...       Crumb │    │
│  │ Moisture (max)    ...    │ │                           │    │
│  │ ME (kcal/kg)      ...    │ │ Fresh water at all times. │    │
│  └──────────────────────────┘ └───────────────────────────┘    │
│  Rows with unconfirmed values do not render at all. See §2.6.  │
├────────────────────────────────────────────────────────────────┤
│  PACKAGING & STORAGE — pack sizes, shelf life, storage advice  │
├────────────────────────────────────────────────────────────────┤
│  RELATED — the other SKUs in this range (next stage first)     │
├────────────────────────────────────────────────────────────────┤
│  ContactBlock / DealershipBand                                 │
└────────────────────────────────────────────────────────────────┘
```

## 1.6 Theme mapping — no new colours

The palette in `app/globals.css` already carries four accent families. Each of the three
categories takes one. **Nothing new is added to `@theme`.**

| Category | Accent | Chip bg / text | Rationale |
|---|---|---|---|
| Poultry Feed | `orange` | `bg-orange-light` / `text-orange-dark` | Primary brand colour — the flagship range leads |
| Fish Feed | `leaf` | `bg-leaf-light` / `text-leaf-dark` | Freshness, water quality — the range's stated benefit |
| Cattle Feed | `terracotta` | `bg-orange-light` / `text-terracotta-dark` | Earth tone, distinct from poultry orange |

`gold` stays free. It is already in use by `TrustStrip` and `Certifications`, so keeping
it out of the category accents avoids a collision between "this is a product range" and
"this is a credential".

Accent is stored **as a token name string on the category record**, not as a Tailwind
class string. Tailwind v4 scans source for complete class names — `bg-${accent}-light`
built at runtime never gets generated. So the record holds `accent: "orange"` and the
component maps it through a static lookup object where every class is written out in full:

```ts
const ACCENT = {
  orange:     { chip: "bg-orange-light text-orange-dark",     rule: "bg-orange" },
  leaf:       { chip: "bg-leaf-light text-leaf-dark",         rule: "bg-leaf" },
  terracotta: { chip: "bg-orange-light text-terracotta-dark", rule: "bg-terracotta" },
} as const;
```

**Background ramp.** The homepage runs a continuous `cream-deep` gradient from
TrustStrip downward, with each section's `from` matching the previous section's `to`.
Catalogue pages continue the same discipline — the ramp values are noted on each band
in the wireframes above. Padding varies per band (`py-24` for the main grid, `py-20`
for secondary) so sections read as distinct without a hard rule between them.

## 1.7 Imagery

Two image classes, two different jobs.

**Category photos** — reuse the existing `/images/{poultry,fish,cattle}.png`.
16:9, live-animal photography, already written into the records.
`shrimp.png` (7.1 MB) is now unreferenced and can be deleted.

**Pack shots** — new, and the single biggest lift in perceived quality. A feed
catalogue without bag photos reads as a brochure; with them it reads as a product line.

```
public/images/products/
  poultry-broiler-starter.webp
  poultry-broiler-grower.webp
  ...
```

| Spec | Value |
|---|---|
| Format | **WebP** (AVIF optional second source) |
| Aspect | 3:4 portrait |
| Size | 900 × 1200 px |
| Background | Transparent, or flat `#FBF6EE` (`--color-cream`) — never white |
| Weight budget | ≤ 120 KB each |
| Fallback | `packShot: null` → card renders a typographic panel (brand name + stage on an accent tint). **The grid must not break when a photo is missing.** |

> **Related cleanup:** the remaining three category PNGs total roughly 23 MB. Converting
> them to WebP is a separate, worthwhile task — it is the largest performance item on
> the site — but it is out of scope for this spec.

## 1.8 Metadata & SEO

Every page exports `metadata` — the site already does this per route
(`app/products/page.tsx` sets `title`).

```ts
// app/products/[category]/[product]/page.tsx
export async function generateMetadata({ params }) {
  const p = getProduct(...);
  return {
    title: `${p.name} — ${p.brand} | Himalayan Feeds`,
    description: p.summary,          // ≤ 155 chars, enforced by the copy rules in §2.5
    openGraph: { images: [p.packShot ?? category.image] },
  };
}
```

Add `app/sitemap.ts` generating from `ALL_PRODUCTS` — ~18 new indexable pages, each
targeting a real search phrase ("broiler starter feed Kashmir", "floating fish feed
Budgam"). This is the commercial argument for the three-level structure: one page
ranks for one term; eighteen rank for eighteen.

Product structured data (`schema.org/Product`) is worth adding **only after** the
spec figures are confirmed — marking up unverified numbers is worse than no markup.

## 1.9 Performance & rendering

| Concern | Handling |
|---|---|
| Rendering | Fully static. `generateStaticParams` on both segments; zero runtime work |
| JS payload | One client component (`StageFilter`, ~1 KB). Everything else server-rendered |
| LCP | Product page pack shot gets `priority`. `ProductGrid`'s existing `aboveFold` prop logic is preserved — see the comment already in that file |
| Images | `next/image` with `fill` + explicit `sizes`, matching current usage |
| Animation | `Reveal` only. No new motion library |

## 1.10 Build order

Each phase leaves the site working and deployable.

| Phase | Work | Outcome |
|---|---|---|
| **1** | Write `lib/catalogue.ts` — types + all category records + **one fully authored product** | Content shape locked and reviewable before any UI exists |
| **2** | `/products/[category]` + `CategoryCard`, `ProductCard` | Category pages live; the "Explore" dead loop is fixed |
| **3** | `/products/[category]/[product]` + `ProductTable`, `FeedingGuide`, `SpecRow` | Detail pages live, spec rows self-suppressing |
| **4** | Rewrite `/products` — category cards + full index | Catalogue home complete |
| **5** | `StageFilter`, `Breadcrumbs`, `ProductEnquiry`, related products | Interaction + conversion polish |
| **6** | Pack shots, `sitemap.ts`, metadata pass | Launch-ready |

**Phase 1 is the gate.** Approve the content shape before building six components
against it.

---

# PART 2 — CONTENT FILE

## 2.1 File split

`lib/site.ts` currently mixes brand, socials, catalogue and nav. Split it:

| File | Holds |
|---|---|
| `lib/site.ts` | `BRAND`, `SOCIALS`, `NAV` — unchanged, minus the catalogue block |
| `lib/catalogue.ts` | Types, `CATEGORIES`, `ALL_PRODUCTS`, `getCategory`, `getProduct` |

`site.ts` re-exports the catalogue so **no existing import breaks**:

```ts
// lib/site.ts
export { CATEGORIES, type Category, type Product } from "./catalogue";
```

## 2.2 Type definitions

```ts
/* ---------------- Data provenance ----------------
   Every factual claim carries its status. "confirmed" means the client has
   supplied it in writing. Anything else is treated as absent by the UI —
   see §2.6. Never upgrade a status to satisfy a layout. */
export type DataStatus = "confirmed" | "pending-client";

/* A single label/value line in a spec table. `value: null` = not yet supplied;
   the row does not render. */
export type Spec = {
  label: string;
  value: string | null;
  note?: string;
};

/* ---------------- Product (one SKU) ---------------- */
export type Product = {
  slug: string;              // URL segment, e.g. "broiler-starter-crumble"
  name: string;              // "Broiler Starter Crumble"
  category: string;          // parent category slug
  brand: string;             // range brand, e.g. "Nutri Choice"

  stage: string | null;      // "Starter" | "Grower" | "Finisher" | null — drives StageFilter
  form: string | null;       // "Crumble" | "Pellet" | "Mash" | "Floating Pellet"
  pelletSize: string | null; // "2 mm"
  packSizes: string[];       // ["50 kg", "25 kg"] — [] renders nothing

  summary: string;           // ≤ 155 chars. Card subtitle AND meta description.
  description: string[];     // 2–3 paragraphs. Product page Overview.

  benefits: {                // exactly 4, for the 4-card row
    title: string;           // ≤ 3 words
    detail: string;          // 1 sentence
  }[];

  analysis: Spec[];          // Guaranteed analysis table
  feeding: {                 // Feeding guide table
    stage: string;
    age: string | null;
    quantity: string | null;
  }[];
  feedingNote: string | null;

  suitableFor: string[];     // ["Commercial broiler units", "Backyard poultry"]
  storage: string | null;
  shelfLife: string | null;

  packShot: string | null;   // /images/products/*.webp — null renders the typographic fallback
  packShotAlt: string | null;

  dataStatus: DataStatus;    // gates the spec tables. See §2.6.
};

/* ---------------- Category (one species range) ---------------- */
export type Category = {
  slug: string;
  name: string;              // "Poultry Feed"
  species: string;           // "Poultry"
  brand: string;             // "Nutri Choice"
  accent: "orange" | "leaf" | "terracotta";   // §1.6

  tagline: string;           // ≤ 60 chars, sits under the H1
  blurb: string;             // ≤ 160 chars — the homepage card line
  description: string[];     // 2 paragraphs — the range story on the category page

  highlights: {              // "Why this range" — exactly 3
    title: string;
    detail: string;
  }[];

  stageLabel: string | null; // "Growth stage" (poultry) vs "Life stage" (cattle) —
                             // the filter legend, worded per species
  image: string;             // existing 16:9 category photo
  imageAlt: string;

  products: Product[];
};
```

## 2.3 Worked example — one complete product

This is the quality bar. **Prose fields are written in full. Numeric fields are `null`
until the client confirms them.**

```ts
{
  slug: "broiler-starter-crumble",
  name: "Broiler Starter Crumble",
  category: "poultry-feed",
  brand: "Nutri Choice",

  stage: "Starter",
  form: "Crumble",
  pelletSize: null,               // pending client
  packSizes: ["50 kg", "25 kg"],  // pending client — confirm before launch

  summary:
    "A high-density starter crumble for broiler chicks from day one to week two, " +
    "built for early frame development and uniform flock growth.",

  description: [
    "The first fourteen days decide the shape of the entire cycle. A chick that " +
    "eats well and grows evenly in its first fortnight carries that advantage " +
    "through to market weight — and a chick that does not, never fully catches up. " +
    "Broiler Starter Crumble is formulated for exactly that window.",

    "The crumble is sized for a young bird's beak, so intake begins early and " +
    "wastage stays low. Every batch is milled at our Budgam facility from " +
    "ingredients checked on arrival, then conditioned and crumbled under controlled " +
    "heat to keep the particle consistent from the top of the bag to the bottom.",

    "The result is a flock that starts together and stays together — the uniformity " +
    "that makes the difference between a good cycle and an ordinary one.",
  ],

  benefits: [
    { title: "Early intake",
      detail: "Crumble particle sized to a day-old beak, so feeding starts within hours of placement." },
    { title: "Flock uniformity",
      detail: "Consistent particle size across the bag means every bird gets the same ration." },
    { title: "Gut development",
      detail: "Formulated to support early gut integrity, when the digestive system is still forming." },
    { title: "Low wastage",
      detail: "Dust-controlled crumbling keeps more of every bag in the bird and less on the floor." },
  ],

  /* ⚠️ ALL VALUES PENDING CLIENT CONFIRMATION.
     Labels are correct per BIS convention; figures must come from the client's
     own batch specification. Do not fill these from a competitor's label. */
  analysis: [
    { label: "Crude protein (min)",       value: null },
    { label: "Crude fat (min)",           value: null },
    { label: "Crude fibre (max)",         value: null },
    { label: "Moisture (max)",            value: null },
    { label: "Calcium",                   value: null },
    { label: "Metabolisable energy",      value: null, note: "kcal/kg" },
  ],

  feeding: [
    { stage: "Day 1–7",  age: null, quantity: null },
    { stage: "Day 8–14", age: null, quantity: null },
  ],
  feedingNote: "Provide clean, fresh drinking water at all times.",

  suitableFor: ["Commercial broiler units", "Contract farming operations", "Backyard poultry"],
  storage: "Store in a cool, dry place away from direct sunlight. Keep bags off the floor and clear of walls.",
  shelfLife: null,                // pending client

  packShot: null,                 // renders the typographic fallback until shot
  packShotAlt: null,

  dataStatus: "pending-client",
}
```

## 2.4 Category record example

```ts
{
  slug: "poultry-feed",
  name: "Poultry Feed",
  species: "Poultry",
  brand: "Nutri Choice",
  accent: "orange",

  tagline: "Starter to finisher, for broilers and layers",
  blurb:
    "Balanced energy-to-protein ratios that drive faster weight gain and better " +
    "feed conversion in broilers and layers.",           // ← preserved verbatim from site.ts

  description: [
    "Poultry is an unforgiving business. Margins live in the feed conversion ratio, " +
    "and a fraction of a point across a shed of ten thousand birds is the difference " +
    "between a profitable cycle and a break-even one.",

    "The Nutri Choice range is built stage by stage around that reality — a starter " +
    "that gets chicks eating on day one, a grower that carries the frame, and a " +
    "finisher that converts efficiently through to market weight.",
  ],

  highlights: [
    { title: "Stage-matched nutrition",
      detail: "A distinct formulation for each phase, rather than one feed stretched across the cycle." },
    { title: "Consistent milling",
      detail: "Particle size held steady batch to batch, so intake stays predictable." },
    { title: "Local supply",
      detail: "Milled in Budgam and delivered across Jammu & Kashmir through our dealer network." },
  ],

  stageLabel: "Growth stage",
  image: "/images/poultry.png",
  imageAlt: "Poultry on a farm raised on Himalayan poultry feed",
  products: [ /* … */ ],
}
```

### SKU skeleton — structural placeholder

The brand names below are already in `lib/site.ts`. **The SKU names are a plausible
structure, not the client's actual product list** — replace them with the real lineup.

| Category | Brand | Likely SKUs |
|---|---|---|
| Poultry Feed | Nutri Choice | Broiler Starter · Broiler Grower · Broiler Finisher · Layer Starter · Layer Grower · Layer Mash |
| Fish Feed | Matsya Bandhu | Floating pellet by size — fry / fingerling / grow-out |
| Cattle Feed | Godhenu Gold | Dairy pellet · Calf starter |

The **Latis Gold** shrimp range has been removed from the site — shrimp is not a
category Himalayan Feeds sells. If it ever returns, the schema takes it without change:
one new record in `CATEGORIES` and the route, nav entry and sitemap line all appear.

## 2.5 Copy rules

Consistency is what makes twenty product pages read as a catalogue rather than twenty
separate attempts.

| Field | Length | Rule |
|---|---|---|
| `summary` | ≤ 155 chars | One sentence. Doubles as the meta description — over 155 and Google truncates it. |
| `description` | 2–3 paras, 45–70 words each | Para 1: the farmer's problem. Para 2: what the product does about it. Para 3 (optional): how it's made. |
| `benefits[].title` | ≤ 3 words | Noun phrase. "Early intake", not "It helps with early intake". |
| `benefits[].detail` | 1 sentence, ≤ 20 words | Concrete. "Sized to a day-old beak" beats "superior palatability". |
| `blurb` | ≤ 160 chars | Homepage card line. Existing four are already written — keep them. |
| `tagline` | ≤ 60 chars | Sits under the H1 at large type; longer wraps badly. |

**Voice.** Write to a farmer, not to a buyer of adjectives. Specific and plain beats
superlative — "the crumble is sized for a young bird's beak" carries more authority
than "premium quality feed with superior nutrition". Premium here comes from
**precision and restraint**, not from stacking claims.

**Banned unless client-confirmed in writing:** any percentage, any kcal figure, any
"India's leading / No. 1 / best", any comparative claim against a named competitor,
any medicinal or disease-prevention claim, any certification not already documented.

## 2.6 The data-provenance rule

This is the most important rule in the document.

```
A numeric or regulated claim renders ONLY when:
   product.dataStatus === "confirmed"   AND   spec.value !== null
```

`SpecRow` returns `null` for any row failing that test. `ProductTable` returns `null`
when every row is suppressed, and the page renders in its place:

> **Full specification available on request.** Call 90860-00555 or message us on
> WhatsApp for the complete guaranteed analysis and feeding schedule.

**Why this design rather than TODO comments.** A `TODO` gets shipped. A `null` cannot
render. The schema makes the safe state the *default* state, so the site is launchable
today with honest prose and no numbers, and each spec table appears the moment its
figures arrive — with no code change, no redesign, and no gap where a fabricated
number sat.

It also converts the missing data into a lead: a farmer who wants the analysis has to
call, and the number is right there.

**Immediate action:** `34% Protein · 5% Fat` on the fish range is still in
`lib/site.ts` and rendering. It should be confirmed or removed.

## 2.7 Client confirmation checklist

To be sent to Md. Showkat Ahmad Wani before Phase 1 content is finalised.

- [ ] **Complete SKU list** per category — exact product names as printed on the bag
- [ ] **Guaranteed analysis** per SKU — crude protein, fat, fibre, moisture, calcium, ME
- [ ] **Physical form** per SKU — crumble / pellet / mash, and pellet diameter in mm
- [ ] **Pack sizes** available per SKU
- [ ] **Feeding schedule** per SKU — age or weight bands and quantity per animal
- [ ] **Shelf life** and storage instructions
- [ ] **Pack shot photographs** — or approval to arrange a shoot (§1.7 spec)
- [ ] **Certification documents** — the ISO / GMP / HACCP / BAP marks currently on the
      site are unverified; certificate copies or removal
- [ ] **Social media handles** — the five in `SOCIALS` are placeholders
- [ ] **Confirmation of the `34% Protein · 5% Fat` figure** still live on the fish range

---

## Open decisions

Three things worth a call before Phase 1:

1. **Three levels or two?** Three is the recommendation above. Two (category pages
   only, SKUs as expandable cards) is faster to build and cheaper to maintain — but
   loses ~15 indexable pages and the per-product enquiry CTA.
2. **Fish accent colour** — `leaf` green keeps the palette intact. A blue would read
   more naturally for aquaculture but means adding one token to `@theme`.
3. **Launch without numbers?** The provenance rule makes this safe and honest. Confirm
   you're comfortable launching with prose-only product pages while the specs are
   gathered.
