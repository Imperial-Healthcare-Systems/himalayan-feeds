import Image from "next/image";
import Reveal from "./Reveal";

/* ---------------- Certifications & standards ----------------

   ⚠ PLACEHOLDER MARKS — NO OFFICIAL ARTWORK IS USED HERE.

   No certification logo files or certification data existed anywhere in this
   project, so each entry renders a plain monogram in a brand-coloured ring.
   That treatment is deliberately typographic: it must NOT be mistaken for an
   official seal, so it does not imitate the rosette/starburst shapes the real
   ISO, GMP, HACCP and BAP marks use.

   To drop in the real artwork later, add the file to /public/images/ and set
   `logo` on the entry — the component switches to <Image> automatically and
   the monogram disappears. Nothing else needs changing.

   No certificate numbers, issuing bodies, accreditation scopes or dates are
   claimed here, because none are recorded anywhere in this project. */
type Certification = {
  /** Shown in the placeholder ring. Ignored once `logo` is set. */
  code: string;
  /** The visible label, and the alt text once a real logo is supplied. */
  name: string;
  /** Path under /public to the official mark, e.g. "/images/cert-iso.svg". */
  logo?: string;
};

const CERTIFICATIONS: Certification[] = [
  { code: "ISO", name: "ISO 9001:2015 Certified" },
  { code: "GMP", name: "GMP Certified" },
  { code: "HACCP", name: "HACCP Certified" },
  { code: "BAP", name: "BAP Certified" },
];

/* One half of the marquee track. The `marquee` keyframe translates by -50%, so
   the track is two identical halves and the seam is invisible. The list is
   repeated inside each half because four items (~1100px) are narrower than the
   container on desktop, which would leave a visible gap mid-loop. */
const HALF = [...CERTIFICATIONS, ...CERTIFICATIONS];

function CertItem({ c }: { c: Certification }) {
  return (
    <li className="flex shrink-0 items-center gap-3.5 border-l border-cream-deep px-7 py-6 sm:px-9">
      {c.logo ? (
        <Image
          src={c.logo}
          alt={c.name}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
        />
      ) : (
        /* Decorative: the name beside it already conveys this to screen readers. */
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-leaf/25 bg-leaf-light/50 font-display font-700 text-[11px] tracking-tight text-leaf-dark"
        >
          {c.code}
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-medium text-ink">{c.name}</span>
    </li>
  );
}

export default function Certifications() {
  return (
    /* Ramp step 4 — the most compact section on the page, so the marquee reads
       as a slim trust strip rather than a full content block. */
    <section
      aria-labelledby="certifications-heading"
      className="bg-gradient-to-b from-cream-deep/70 to-cream-deep/25 py-14 lg:py-20"
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
            <p className="mt-4 leading-relaxed text-ink-soft">
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
          <div className="mt-12 overflow-hidden rounded-3xl border border-cream-deep [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto lg:mt-14">
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
                    <CertItem key={`${half}-${c.name}-${i}`} c={c} />
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
