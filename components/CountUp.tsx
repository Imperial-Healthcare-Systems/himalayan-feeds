"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------- Count-up number ----------------
   Animates 0 -> `to` the first time it scrolls into view, then never again.
   Built on IntersectionObserver + requestAnimationFrame rather than a
   counter library so it adds no dependency; framer-motion is already here
   for Reveal, but a scalar tween needs none of it. */
export default function CountUp({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  /** Rendered immediately after the number, e.g. the "+" in "500+". */
  suffix?: string;
  /** Milliseconds for the whole 0 -> `to` run. */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at 0 on both server and client, so hydration matches exactly.
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Disconnect before animating — this is what makes it run once and
        // survive the user scrolling back and forth over the section.
        observer.disconnect();

        // Reduced motion: land on the final value without the tween.
        if (reduceMotion) {
          setValue(to);
          return;
        }

        let startedAt: number | null = null;
        const tick = (now: number) => {
          if (startedAt === null) startedAt = now;
          const progress = Math.min((now - startedAt) / duration, 1);
          // easeOutCubic — quick off the mark, gentle landing on the value.
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
