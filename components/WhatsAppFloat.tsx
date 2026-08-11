"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/lib/site";

/* ---------------- Floating WhatsApp button ----------------
   Hides once the footer scrolls up under it, so it stops covering the legal
   bar. Lives in its own file because it needs browser APIs — keeping it in
   Footer.tsx would have forced that whole (server) component into the client
   bundle. Uses a scroll listener rather than IntersectionObserver to match
   Header.tsx, and because the trigger point depends on the button's own
   offset, which a plain observer can't express without a dynamic rootMargin. */

/** Button height (56px) + its bottom offset (24px), with a little breathing room. */
const CLEARANCE = 96;

export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const update = () => {
      // Hide as soon as the top of the footer rises past the button.
      setHidden(footer.getBoundingClientRect().top <= window.innerHeight - CLEARANCE);
    };

    // rAF rather than calling update() directly: a synchronous setState in an
    // effect body triggers cascading renders (react-hooks/set-state-in-effect).
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}`}
      aria-label="Chat with us on WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-300 hover:scale-105 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.5-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.5.5 0 000-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.5.6 1.8.5 2.2.5a2.5 2.5 0 001.6-1.2 2 2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z" />
      </svg>
    </a>
  );
}
