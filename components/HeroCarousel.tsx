"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const VIDEO_SRC = "/videos/himalayan-hero-ranges.mp4";
const POSTER_SRC = "/images/himalayan-hero-ranges-poster.webp";
/* "-wide" is not decoration — it is the cache key. The first cut of this file
   shipped as hero-banner.webp under a one-year immutable header, so every
   browser that saw it will keep serving that copy no matter what we deploy.
   A new name is the only way past it. If the artwork is re-cut again, rename
   again. */
const BANNER_SRC = "/images/hero-banner-wide.webp";

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

   THE BANNER IS NOT A PHOTOGRAPH. hero-banner-wide.webp is finished art with
   its own logo, headline, product lineup and phone strip, so the site's own
   headline and gradients fade out while it is up — the banner already says
   "Nutrition for A BETTER TOMORROW" across its middle and carries the logo
   top-left, and laying ours over that gives two competing headlines and a
   scrim across their logo.

   Reduced motion, Save-Data and slow connections skip the whole carousel and
   keep the poster — a crossfading slideshow is motion, and the poster is frame
   0 of the clip, so nothing looks broken.

   ⚠ THE SHIPPED BANNER IS PADDED ARTWORK, NOT THE FILE THE CLIENT SUPPLIED.
   object-cover fills the frame, which is the requirement, but it pays for that
   by cropping — and the hero band runs from about 2.0:1 (1440x900) to 2.7:1
   (ultrawide). The supplied file is 1774x887, exactly 2.0:1, the narrowest
   shape in that range, so every wider window trimmed its top and bottom: 6% on
   a 1080p screen, 17% on the client's, 27% on an ultrawide. The logo sits on
   the top edge and the phone strip on the bottom one, so that trim went
   straight through the design.

   So the file in public/ was widened to 2412x887 (2.72:1) — wider than the
   widest box — by adding 319px of padding each side. Cover now scales by
   HEIGHT at every desktop shape, the full design always survives, and the
   overflow comes off padding instead. The padding is a mirrored copy of the
   edge under a 34px blur, darkened 6%: mirroring alone would duplicate the cow
   and the goat, and the blur pushes both into bokeh. On most windows it is
   cropped away unseen; only an ultrawide shows much of it.

   Rebuild it from source-assets/hero/hero_image.png, never from the padded
   file — padding the padding compounds.

   Padding only rescues the WIDE frames. Under xl the hero is far taller than
   2.7:1 and no amount of side padding helps, so that range is contained on a
   blurred backdrop instead — see the banner slide below.

   This is all a stopgap for artwork that does not exist yet. The real set is
   three files, each drawn to its own frame with the scene painted to all four
   edges and nothing important outside the safe zone:

     wide     2560x960   (2.67:1)   safe 1920x940    xl and up
     tablet   1600x1840  (0.87:1)   safe 1500x1760   640-1279px
     phone    1200x1850  (0.65:1)   safe 1050x1540   under 640px

   The portrait two are a re-layout, not a crop — nine bags in a row cannot be
   cropped narrow, they have to be restacked. When they land, serve them with
   srcset and delete the padding and the blur. */
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
            {/* Below xl the frame is simply too tall for a 2.7:1 banner.
                Filling it means cropping to the width of the frame, and at
                these shapes that leaves 29% of the design on a phone and 45%
                on a tablet — the logo, the phone strip and most of the lineup
                gone. Re-centring does not help; it is already centred, and a
                better-placed third of a banner is still a third of a banner.

                So under xl the whole banner is shown, contained, with a
                blurred over-scaled copy filling the frame behind it. Same
                file, one download, no letterbox bars. It is small, but it is
                all there. From xl up the frame is wide enough that cover
                shows 100% of the design, so it fills properly. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- same
                reasoning as the poster above. */}
            <img
              src={BANNER_SRC}
              alt=""
              aria-hidden="true"
              className={`${cover} scale-110 blur-2xl xl:hidden`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- ditto. */}
            <img
              src={BANNER_SRC}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-contain ${FRAMING} xl:object-cover`}
            />
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
