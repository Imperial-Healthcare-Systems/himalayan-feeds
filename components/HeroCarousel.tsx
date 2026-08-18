"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const VIDEO_SRC = "/videos/himalayan-hero-ranges.mp4";
const POSTER_SRC = "/images/himalayan-hero-ranges-poster.webp";
/* "-wide" is not decoration — it is the cache key. The first cut of this file
   shipped as hero-banner.webp under a one-year immutable header, so every
   browser that saw it will keep serving that copy no matter what we deploy.
   A new name is the only way past it. If the artwork is re-cut again, rename
   again. */
/* The banner is drawn to two shapes, not cropped to them. Both are served at
   their own aspect ratio and the hero frame is built to match (see Hero.tsx),
   so neither is ever cropped and neither needs padding. */
const BANNER_PC_SRC = "/images/hero-banner-pc.e8efa889.webp"; /* 1706x922, 1.850:1 */
const BANNER_PHONE_SRC = "/images/hero-banner-phone.499fc15a.webp"; /* 864x1821, 0.474:1 */

/* Where the artwork changes shape. Below this the portrait cut is served and
   the hero frame is portrait with it; at and above, the landscape pair. Kept
   in one place because the media query here and the aspect ratios in Hero.tsx
   have to agree — if they drift, the frame stops matching the art and the crop
   comes back. */
const BANNER_SWITCH = "(min-width: 768px)";

/* How long the banner holds before the clip runs again. The clip is 10.0s and
   plays once through, so the cycle is clip → banner → clip ≈ 16s. */
const BANNER_MS = 6000;

/* The clip's real duration, only used as a deadline — see the effect below.
   If himalayan-hero-ranges.mp4 is ever re-cut to a different length, this
   wants updating with it, but a stale value costs a slightly late hand-off,
   not a broken carousel. */
const CLIP_MS = 10_040;

/* Framing for the CLIP only — the banner is never cropped, see below. The clip
   is 16:9; the hero band is wider than that at every breakpoint, so object-cover
   trims top and bottom, roughly 8% each on a 16:9 window.

   Centring is a compromise across four shots, not one. Anything that moves this
   off 50% has to be checked against all four, because they load their subjects
   at different heights: the aerial herd sits low, the hens sit low with the coop
   high, the flock fills the middle band, and the pond shot carries its peaks
   just above centre. */
const FRAMING = "object-[50%_50%]";

/* ---------------- Hero background ----------------
   A two-slide carousel: the four-range clip plays once through, the banner
   holds for BANNER_MS, and it repeats.

   THE BANNER IS NOT A PHOTOGRAPH. Both cuts are finished art with
   its own logo, headline, product lineup and phone strip, so the site's own
   headline and gradients fade out while it is up — the banner already says
   "Nutrition for A BETTER TOMORROW" across its middle and carries the logo
   top-left, and laying ours over that gives two competing headlines and a
   scrim across their logo.

   Reduced motion, Save-Data and slow connections skip the whole carousel and
   keep the poster — a crossfading slideshow is motion, and the poster is frame
   0 of the clip, so nothing looks broken.

   THE FRAME IS BUILT ROUND THE ART, NOT THE OTHER WAY ROUND. Every earlier cut
   of this hero fixed the frame first — a viewport-height band — then fought to
   get a fixed-composition banner into it. There is no winning that: cover
   crops the design, contain leaves bars, and the padded-artwork stopgap that
   preceded this only moved the crop into 319px of mirrored blur either side,
   which is exactly what showed as the "left and right adjustments" on a window
   whose ratio landed between the two.

   The client has now supplied the banner drawn to two shapes, so the fix is
   the real one: Hero.tsx sets the section's aspect-ratio to the artwork's own,
   switching at BANNER_SWITCH exactly as the <picture> below does. Frame ratio
   equals art ratio, so object-cover crops nothing, contain would bar nothing,
   and the whole design is on screen at every width. Widen the window and it
   scales; there is nothing left to crop.

   Consequences worth knowing before changing any of this:
     - The hero's height now follows its WIDTH, not the viewport height. On a
       1440px window it lands at ~778px, about one screenful under the header,
       which is why the old 100svh maths is gone rather than merged into it.
     - The clip and poster still object-cover into that frame. They are
       photography, so cropping them is free — but the frame is portrait below
       768px, and a 16:9 clip in a 0.47:1 box shows about a quarter of its
       width. That was already true of the old portrait frame; it is simply
       more pronounced now.
     - Both files are served at native size: 1706px wide (PC) and 864px
       (phone). Above those widths the browser upscales. ⚠ For a crisp hero on
       a 2560px monitor the landscape cut wants redrawing at ~2560x1384 — same
       1.850:1, no reframing — and the portrait at ~1080x2276.

   source-assets/hero/widen_banner.py and hero-banner-wide.webp belong to the
   padding stopgap and are now dead. Do not reach for them. */
export default function HeroCarousel({ children }: { children: ReactNode }) {
  /* Starts "poster" so the first client render matches the server-rendered
     markup exactly (no hydration mismatch); the effect upgrades post-hydration
     once the real preferences are known. */
  const [useVideo, setUseVideo] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [onBanner, setOnBanner] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      if (mq.matches) return setUseVideo(false);
      /* navigator.connection is Chromium-only; absent means "assume fine",
         which is the right default on desktop Safari and Firefox. */
      const c = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;
      const constrained =
        !!c?.saveData || /^(slow-2g|2g|3g)$/.test(c?.effectiveType ?? "");
      setUseVideo(!constrained);
    };

    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  /* Banner slide — hold, then hand back to the clip.
     The clip is paused rather than left running underneath: a decoded 1080p
     video playing behind an opaque layer costs a phone battery for something
     nobody can see. */
  useEffect(() => {
    if (!useVideo || !onBanner) return;
    videoRef.current?.pause();
    const t = window.setTimeout(() => setOnBanner(false), BANNER_MS);
    return () => window.clearTimeout(t);
  }, [useVideo, onBanner]);

  /* Clip slide — restart it, and set a deadline.
     `ended` is what normally advances the carousel, so the clip's own duration
     drives the cycle rather than a timer that would drift against it. But
     `ended` does not fire if autoplay was refused (a background tab, a power
     mode) or the download stalls, and without a deadline the carousel would
     sit on a frozen first frame and never reach the banner at all. */
  useEffect(() => {
    if (!useVideo || onBanner) return;
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    const t = window.setTimeout(() => setOnBanner(true), CLIP_MS + 2500);
    return () => window.clearTimeout(t);
  }, [useVideo, onBanner]);

  const cover = `absolute inset-0 h-full w-full object-cover ${FRAMING}`;
  const fade = "transition-opacity duration-700 motion-reduce:transition-none";

  return (
    <>
      {/* Poster — always present, and never removed. It stays underneath so a
          stalled or failed video simply leaves a still image rather than a
          hole, and it is frame 0 of the clip, so the handover is a pure
          crossfade with nothing moving underneath it. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed
          background; next/image adds no value over a pre-sized WebP here. */}
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className={cover}
      />

      {useVideo && (
        <>
          {/* Slide 1 — the clip */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 duration-[1200ms] ${fade} ${
              revealed && !onBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={POSTER_SRC}
              onCanPlay={() => setRevealed(true)}
              onEnded={() => setOnBanner(true)}
              className={cover}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>

          {/* Slide 2 — the banner.
              Marked decorative: every claim on it (the tagline, the product
              names, the phone number) exists as real text elsewhere on the
              page, so announcing it would only duplicate what a screen reader
              has already read. */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 duration-[1200ms] ${fade} ${
              onBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* <picture> rather than two <img>s behind a CSS toggle: the
                browser picks one source and downloads only that, so a phone
                never pays for the 358 KB landscape cut. object-cover is here
                as sub-pixel insurance, not to fit anything — the frame is
                already the artwork's own ratio, so it has nothing to crop. */}
            <picture>
              <source media={BANNER_SWITCH} srcSet={BANNER_PC_SRC} />
              {/* eslint-disable-next-line @next/next/no-img-element -- same
                  reasoning as the poster above. */}
              <img
                src={BANNER_PHONE_SRC}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          </div>
        </>
      )}

      {/* Legibility gradient — strongest behind the copy, fading toward the
          visual side. Fades with the copy: on the banner slide there is no
          copy to make legible, and the scrim would only darken their logo. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/0 ${fade} ${
          onBanner ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Subtle brand-tinted wash */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-tr from-leaf-dark/20 via-transparent to-orange-dark/10 ${fade} ${
          onBanner ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Headline, sub-copy and CTAs.
          In normal flow, not absolute — it has to be able to grow the section
          on a narrow window, which an absolutely positioned block cannot do.

          It stays in the tab order while faded out, and focus landing inside
          cuts straight back to the clip slide. Without that, a keyboard user
          arriving during the banner would be tabbing into an invisible button.
          pointer-events-none covers the mouse case, where there is no such
          signal to react to. */}
      <div
        onFocusCapture={() => setOnBanner(false)}
        className={`relative z-10 w-full ${fade} ${
          onBanner ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
