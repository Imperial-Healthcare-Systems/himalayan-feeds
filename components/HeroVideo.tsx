"use client";

import { useEffect, useState } from "react";

const VIDEO_SRC = "/videos/himalayan-new-hero.mp4";
const POSTER_SRC = "/images/himalayan-new-hero-poster.webp";

/* Framing. The clip is 16:9; the hero band is wider than that at every
   breakpoint, so object-cover crops top and bottom. Centring keeps both the
   snow line and the grazing herd in frame — the two things the shot is for.
   Nudge the second value down to favour the foreground, up for the peaks. */
const FRAMING = "object-[50%_50%]";

/* ---------------- Hero background ----------------
   Two stacked layers: the poster paints immediately and carries the LCP, and
   the clip fades in over it once it can actually play. That ordering is what
   keeps the reveal from being a black rectangle followed by a jump cut.

   ⚠ himalayan-new-hero.mp4 is 28 MB for 8 seconds — roughly a 28 Mbps
   bitrate, about ten times what this clip needs. Until it is re-encoded, the
   checks below are what stop it from being charged to a farmer's mobile data:
   the video is only requested when motion is welcome, Save-Data is off, and
   the connection is not a slow one. Everyone else gets the poster, which is
   the same frame, so nothing looks broken. */
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
          hole. scale-[1.08] matches the ken-burns start so there is no jump
          at the moment the clip takes over. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed
          background; next/image adds no value over a pre-sized WebP here. */}
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className={`${layer} scale-[1.08]`}
      />

      {useVideo && (
        /* Wrapper owns the reveal, the video owns the drift — keeping them on
           separate elements means the entrance transition and the looping
           ken-burns never fight over the same transform. */
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
            className={`${layer} animate-kenburns`}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
