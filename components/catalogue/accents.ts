/* ---------------- Per-category accent classes ----------------
   Tailwind v4 only generates classes it can literally see in the source, so
   every class here is written out in full. Never build one by interpolating
   the token name (`bg-${accent}-light`) — that class will not exist at runtime.

   `gold` is deliberately absent: it belongs to TrustStrip and Certifications,
   and reusing it here would blur "product range" into "credential". It was
   briefly added for a Sheep & Goat range; that range is now a sub-category
   band inside Cattle Feed and takes the cattle accent, so gold is free again. */
export const ACCENT = {
  terracotta: {
    chip: "bg-orange-light text-terracotta-dark",
    text: "text-terracotta-dark",
    rule: "bg-terracotta",
    dot: "bg-terracotta",
    soft: "bg-terracotta/[0.07]",
    border: "border-terracotta/25",
    hoverText: "group-hover:text-terracotta-dark",
    gradient: "from-terracotta to-terracotta-dark",
  },
  orange: {
    chip: "bg-orange-light text-orange-dark",
    text: "text-orange-dark",
    rule: "bg-orange",
    dot: "bg-orange",
    soft: "bg-orange/[0.07]",
    border: "border-orange/25",
    hoverText: "group-hover:text-orange-dark",
    gradient: "from-orange to-orange-dark",
  },
  leaf: {
    chip: "bg-leaf-light text-leaf-dark",
    text: "text-leaf-dark",
    rule: "bg-leaf",
    dot: "bg-leaf",
    soft: "bg-leaf/[0.07]",
    border: "border-leaf/25",
    hoverText: "group-hover:text-leaf-dark",
    gradient: "from-leaf to-leaf-dark",
  },
} as const;

export type AccentKey = keyof typeof ACCENT;
