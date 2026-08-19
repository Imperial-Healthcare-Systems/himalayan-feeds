import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* nodemailer is left out of the server bundle. It resolves transports and
     TLS options at runtime and reaches for optional native deps, which a
     bundler cannot follow — bundling it produces a build that looks fine and
     throws on the first send. See lib/mail.ts. */
  serverExternalPackages: ["nodemailer"],

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
        /* Hand-named media. NOT fingerprinted — that is the whole point.
           /_next/static gets content hashes and Next already marks it
           immutable on its own; nothing under /images or /videos does.

           ⚠ This was `max-age=31536000, immutable` on the stated assumption
           that nothing here is ever re-cut under the same name. That
           assumption did not survive contact: the pack shots were replaced
           from new artwork, and the hero banner twice in one afternoon.
           `immutable` tells the browser never to revalidate, so a returning
           visitor keeps the old file for a YEAR and no amount of deploying
           reaches them — the only escape is renaming the asset.

           So: still cached hard, but revalidating.
           stale-while-revalidate serves the cached copy instantly and
           refreshes it in the background, which keeps the speed and drops the
           trap. If something here truly is permanent, put a version in its
           filename rather than reaching for `immutable` again. */
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        /* Longer, because a 4 MB clip is expensive to re-fetch and changes far
           less often than a pack shot — but revalidating for the same reason. */
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
