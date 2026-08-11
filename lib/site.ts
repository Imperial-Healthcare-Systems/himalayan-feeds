/* ---------------- Brand identity & contact details ---------------- */
export const BRAND = {
  name: "Himalayan",
  full: "Himalayan Feeds",
  legal: "Himalayan Feeds Private Limited",
  tagline: "Pure Nutrition, Pure Growth",
  contactPerson: "Md. Showkat Ahmad Wani",
  phone: "90860-00555",
  // wa.me and tel: both need the country code, digits only.
  phoneHref: "tel:+919086000555",
  whatsapp: "919086000555",
  email: "info@himalayanfeeds.com",
  address: {
    line1: "63 KVA, Chinar Colony, Darmuna",
    line2: "Budgam 191111",
    region: "Jammu & Kashmir",
  },
};

/* ---------------- Social profiles ----------------
   PLACEHOLDER handles — no account has been verified at any of these URLs.
   Swap in the real ones (or delete the entry) before going live. */
export const SOCIALS = [
  { label: "Facebook", handle: "@himalayanfeeds", href: "https://facebook.com/himalayanfeeds" },
  { label: "Instagram", handle: "@himalayanfeeds", href: "https://instagram.com/himalayanfeeds" },
  { label: "X", handle: "@himalayanfeeds", href: "https://x.com/himalayanfeeds" },
  { label: "LinkedIn", handle: "himalayan-feeds", href: "https://linkedin.com/company/himalayan-feeds" },
  { label: "YouTube", handle: "@himalayanfeeds", href: "https://youtube.com/@himalayanfeeds" },
];

/* ---------------- Product catalogue ---------------- */
export type Category = {
  slug: string;
  name: string;
  animal: string;
  brand: string;
  protein: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "poultry-feed",
    name: "Poultry Feed",
    animal: "For broilers & layers",
    brand: "Nutri Choice",
    protein: "Starter · Grower · Finisher",
    blurb:
      "Balanced energy-to-protein ratios that drive faster weight gain and better feed conversion in broilers and layers.",
    image: "/images/poultry.png",
    imageAlt: "Poultry on a farm raised on Himalayan poultry feed",
  },
  {
    slug: "fish-feed",
    name: "Fish Feed",
    animal: "Floating fish feed",
    brand: "Matsya Bandhu",
    protein: "34% Protein · 5% Fat",
    blurb:
      "Floating pellets with high digestibility that keep water clean and support steady, healthy fish growth.",
    image: "/images/fish.png",
    imageAlt: "Fish in a pond raised on Himalayan fish feed",
  },
  {
    slug: "shrimp-feed",
    name: "Shrimp Feed",
    animal: "Grow-out feed",
    brand: "Latis Gold",
    protein: "38% Protein",
    blurb:
      "High-protein, antibiotic-free grow-out feed engineered for strong survival rates and premium shrimp yield.",
    image: "/images/shrimp.png",
    imageAlt: "Shrimp raised on Himalayan shrimp feed",
  },
  {
    slug: "cattle-feed",
    name: "Cattle Feed",
    animal: "For dairy cattle",
    brand: "Godhenu Gold",
    protein: "Milk-yield formula",
    blurb:
      "Mineral-fortified cattle feed that improves milk yield, fat content and overall herd health.",
    image: "/images/cattle.png",
    imageAlt: "Dairy cattle raised on Himalayan cattle feed",
  },
];

/* ---------------- Navigation — drives the header and footer ---------------- */
export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: CATEGORIES.map((c) => ({ label: c.name, href: `/products#${c.slug}` })),
  },
  { label: "About Us", href: "/about" },
  { label: "Dealership", href: "/dealership" },
  { label: "Contact", href: "/contact" },
];
