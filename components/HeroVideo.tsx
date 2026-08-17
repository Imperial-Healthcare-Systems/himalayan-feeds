"use client";

import { useEffect, useState } from "react";

const VIDEO_SRC = "/videos/himalayan-hero-ranges.mp4";
const POSTER_SRC = "/images/himalayan-hero-ranges-poster.webp";

/* Framing. The clip is 16:9; the hero band is wider than that at every
   breakpoint, so object-cover crops top and bottom — roughly 8% off each edge
   on a 16:9 window, more on a short one.

   Centring is a compromise across four shots, not one. Anything that moves
   this off 50% has to be checked against all four, because they load their
   subjects at different heights: the aerial herd sits low, the hens sit low
   with the coop high, the flock fills the middle band, and the pond shot
   carries its peaks just above centre. 50% is the only value where nothing
   important leaves the frame. */
const FRAMING = "object-[50%_50%]";

/* ---------------- Hero background ----------------
   Two stacked layers: the poster paints immediately and carries the LCP, and
   the clip fades in over it once it can actually play. That ordering is what
   keeps the reveal from being a black rectangle followed by a jump cut. The
   poster is frame 0 of the clip, so the crossfade lands on the same image —
   regenerate the two together or the reveal starts to blink.

   The clip is a 10s, four-shot loop covering the ranges in catalogue order:
   cattle (0.0–2.4s), sheep & goat (2.4–5.0s), poultry (5.0–7.4s), fish
   (7.4–10.0s). Hard cuts, no audio track.

   4.2 MB at 3.4 Mbps, re-encoded from a 32 MB / 25 Mbps master. That is a
   reasonable hero weight, but it is still 4 MB of decoration, so the checks
   below stay: the video is only requested when motion is welcome, Save-Data
   is off, and the connection is not a slow one. Everyone else gets the
   poster, which is the same frame, so nothing looks broken. */
export default function HeroVideo() {
  /* Starts "poster" so the first client render matches the server-rendered
     markup exactly (no hydration mismatch); the effect upgrades to video
     post-hydration once the real preferences are known. */
  const [useVideo, setUseVideo] = useState(false);
  const [revealed, setRevealed] = useState(false);

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

  const layer = `absolute inset-0 h-full w-full object-cover ${FRAMING}`;

  return (
    <>
      {/* Poster — always present, and never removed. It stays underneath so a
          stalled or failed video simply leaves a still image rather than a
          hole. Unscaled, matching the clip's own framing, so the handover is
          a pure crossfade with no drift underneath it. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed
          background; next/image adds no value over a pre-sized WebP here. */}
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className={layer}
      />

      {useVideo && (
        /* Wrapper owns the entrance; the clip is left alone.
           The old single-take aerial carried a CSS ken-burns because it
           barely moved on its own. This one is four shots that each already
           push, track or descend, so a zoom on top only fought them — and it
           cropped a further 8–16% off footage the hero band is already
           cropping. The reveal below is the only transform now. */
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            revealed ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
          }`}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER_SRC}
            onCanPlay={() => setRevealed(true)}
            className={layer}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
