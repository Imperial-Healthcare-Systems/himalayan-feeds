import { BRAND } from "@/lib/site";

/* ---------------- Brand lockup ----------------
   Wordmark, tagline, positioning line. Used at the top of /about and once on
   the homepage, so the approved brand lines appear in exactly one shape
   wherever they are shown. `tone` swaps it for a dark ground. */
export default function BrandLockup({
  tone = "light",
  className = "",
}: {
  /** "light" = dark type on cream. "dark" = light type on ink. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={`text-center ${className}`}>
      {/* Rule–mark–rule. The hairlines draw outward from the wordmark. */}
      <div className="flex items-center justify-center gap-4">
        <span
          aria-hidden
          className={`block h-px w-8 origin-right animate-rule sm:w-14 ${dark ? "bg-white/25" : "bg-ink/15"}`}
        />
        <p
          className={`font-display font-800 text-xl tracking-[0.14em] sm:text-2xl ${dark ? "text-white" : "text-ink"}`}
        >
          {BRAND.full.toUpperCase()}
        </p>
        <span
          aria-hidden
          className={`block h-px w-8 origin-left animate-rule sm:w-14 ${dark ? "bg-white/25" : "bg-ink/15"}`}
        />
      </div>

      <p
        className={`mt-4 animate-fade font-serif text-[19px] italic leading-snug sm:text-[22px] ${dark ? "text-cream/80" : "text-ink-soft"}`}
      >
        &ldquo;{BRAND.tagline}&rdquo;
      </p>

      <p
        className={`mt-4 animate-settle text-[10.5px] font-bold uppercase tracking-[0.2em] sm:text-[11px] ${dark ? "text-cream/45" : "text-ink-soft/50"}`}
        style={{ animationDelay: "220ms" }}
      >
        {BRAND.positioning}
      </p>
    </div>
  );
}
