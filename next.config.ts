import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Every route on this site is static, so the only images the optimiser
     handles are the four category photos. AVIF first buys another ~20% over
     WebP on those, and the year-long cache TTL is safe because filenames are
     stable and content-addressed by the optimiser. */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
  },

  /* Nothing is gained by advertising the framework. */
  poweredByHeader: false,

  /* Source maps in production would ship ~1 MB of mapping files that only
     help someone reading our code. */
  productionBrowserSourceMaps: false,

  /* Baseline hardening. The site has no auth, no user data and no third-party
     scripts, so these cost nothing and close the obvious defaults:
       - nosniff        stops content-type guessing
       - frame-options  stops the site being framed for clickjacking
       - referrer       keeps full URLs off other origins
       - permissions    revokes APIs the site never uses
     HSTS is deliberately left to the host (Vercel/Netlify set it), since
     getting max-age wrong here is hard to undo. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        /* Fingerprinted build output and the media we never re-cut under the
           same name — safe to cache hard. */
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
