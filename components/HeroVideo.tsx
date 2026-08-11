"use client";

import { useEffect, useState } from "react";

const VIDEO_SRC = "/videos/himalayan-hero.mp4";
const POSTER_SRC = "/images/himalayan-hero-poster.webp";

export default function HeroVideo() {
  // Starts false so the first client render matches the server-rendered
  // poster exactly (no hydration mismatch); the effect below upgrades to
  // video post-hydration once the real motion preference is known.
  const [canAutoplay, setCanAutoplay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCanAutoplay(!mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const mediaClass =
    "absolute inset-0 h-full w-full scale-110 object-cover object-[50%_78%]";

  if (!canAutoplay) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={POSTER_SRC} alt="" aria-hidden="true" className={mediaClass} />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER_SRC}
      aria-hidden="true"
      className={mediaClass}
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
