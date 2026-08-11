import Link from "next/link";
import { BRAND } from "@/lib/site";

/* ---------------- Brand emblem, links home ---------------- */
export default function Logo({
  variant = "dark",
  className = "h-12 w-12",
}: {
  /** "dark" = the dark artwork, for light backgrounds; "light" = the white artwork, for the dark footer. */
  variant?: "dark" | "light";
  /** Rendered size. The emblem is square, so keep width and height equal. */
  className?: string;
}) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      {/* Plain <img>: the emblem is already vector, so there is nothing for the
          image optimizer to do — and routing SVG through /_next/image needs
          dangerouslyAllowSVG. Fixed CSS sizing prevents any layout shift. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "light" ? "/images/hf-logo-white.svg" : "/images/hf-logo-color.svg"}
        alt={`${BRAND.full} logo`}
        width={1254}
        height={1254}
        className={className}
      />
    </Link>
  );
}
