import { CERTIFICATIONS, type Certification } from "@/lib/site";
import Reveal from "./Reveal";

/* ---------------- Certifications & standards ----------------

   ⚠ THE MARKS IN /public/images/certifications ARE PLACEHOLDERS.

   They are our own typographic badges, not the official artwork of FSSAI,
   ISO, GMP or HACCP, and they avoid the rosette/starburst silhouettes the
   real seals use so they cannot be mistaken for a genuine certificate mark.
   See that folder's README for the pre-launch checklist.

   No certificate number, licence number, issuing body, accreditation scope
   or expiry date is claimed anywhere, because none has been supplied. */

/* One half of the marquee track. The `marquee` keyframe translates by -50%, so
   the track is two identical halves and the seam is invisible. The list is
   repeated inside each half because four items are narrower than the container
   on desktop, which would leave a visible gap mid-loop. */
const HALF = [...CERTIFICATIONS, ...CERTIFICATIONS];

function CertItem({ c }: { c: Certification }) {
  return (
    <li className="flex shrink-0 items-center gap-4 border-l border-cream-deep px-7 py-6 sm:px-9">
      {/* Local SVG badges, so next/image is not usable here (it refuses SVG
          without dangerouslyAllowSVG) and there is nothing to optimise anyway.
          eager, not lazy: the marquee translates items horizontally out of the
          viewport, so a lazy image never intersects and pops in blank when it
          scrolls back. All four badges together are under 3 KB. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.logo}
        alt=""
        aria-hidden="true"
        width={120}
        height={120}
        loading="eager"
        decoding="async"
        className="h-12 w-12 shrink-0 object-contain transition-transform duration-500 ease-out hover:scale-110"
      />
      <span className="whitespace-nowrap">
        <span className="block text-sm font-semibold text-ink">{c.name}</span>
        <span className="mt-0.5 block text-[11.5px] text-ink-soft/70">{c.note}</span>
      </span>
    </li>
  );
}

export default function Certifications() {
  return (
    /* Ramp step 4 — the most compact section on the page, so the marquee reads
       as a slim trust strip rather than a full content block. */
    <section
      aria-labelledby="certifications-heading"
      className="bg-gradient-to-b from-cream-deep/70 to-cream-deep/25 py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-leaf-light px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-leaf-dark">
              Quality &amp; Certifications
            </span>
            <h2
              id="certifications-heading"
              className="mt-5 text-balance font-display font-800 text-3xl tracking-tight text-ink sm:text-4xl"
            >
              Quality you can trust.
            </h2>
            <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-leaf animate-rule" />
            <p className="mt-5 leading-relaxed text-ink-soft">
              Every formulation is produced with rigorous quality, safety and
              manufacturing standards at its core.
            </p>
          </div>
        </Reveal>

        {/* Standards marquee. Reuses the site's existing `animate-marquee`
            keyframe (globals.css) — no carousel library. overflow-hidden keeps
            the track from widening the page; the mask softens both edges so
            items fade out rather than being sliced by the border.
            Reduced motion: globals.css freezes the animation, so the strip
            becomes horizontally scrollable instead of stranding the user on
            whichever items happen to be in frame. */}
        <Reveal delay={0.1}>
          <div className="mt-9 overflow-hidden rounded-3xl border border-cream-deep bg-cream/60 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto lg:mt-10">
            <div className="flex w-max animate-marquee [animation-duration:36s] hover:[animation-play-state:paused]">
              {[0, 1].map((half) => (
                <ul
                  key={half}
                  /* The second half is a visual duplicate for the seamless
                     loop — screen readers should only hear the list once. */
                  aria-hidden={half === 1}
                  className="flex shrink-0 items-center"
                >
                  {HALF.map((c, i) => (
                    <CertItem key={`${half}-${c.code}-${i}`} c={c} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
