import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://himalayanfeeds.com";

/* Generated from the catalogue, so adding a range adds its URL here too —
   there is no second list to keep in sync. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/dealership", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/products/${c.slug}`,
      changeFrequency: "monthly" as const,
      /* A range you cannot order yet is worth less as a landing page. */
      priority: c.status === "available" ? 0.8 : 0.4,
    })),
  ];
}
