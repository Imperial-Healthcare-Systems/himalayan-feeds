import { LEADERSHIP, BRAND, type Leader } from "@/lib/site";
import Reveal from "./Reveal";

/* Initials for the monogram. Honorifics ("Md.") end in a full stop and are
   dropped, so "Md. Showkat Ahmad Wani" reads as SW rather than MA. */
function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => !w.endsWith("."));
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/* ---------------- Portrait panel ----------------
   No photograph has been supplied, so rather than a grey placeholder this is
   a designed panel — monogram, mountain motif, brand line. It reads as
   intentional at full size and swaps to <img> the moment `photo` is set. */
function Portrait({ leader }: { leader: Leader }) {
  if (leader.photo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- client-supplied
         portrait path; swap to next/image once real photography lands. */
      <img
        src={leader.photo}
        alt={leader.name ?? ""}
        width={800}
        height={1000}
        className="h-full w-full rounded-3xl object-cover"
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta to-orange-dark">
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl animate-bloom"
        aria-hidden
      />
      {/* Mountain motif — x-deltas sum to the 1440 viewBox width */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-32 w-full text-white/[0.10]"
        aria-hidden
      >
        <path d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z" fill="currentColor" />
      </svg>

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <span
          aria-hidden
          className="font-display font-800 text-6xl tracking-tight text-white/95 sm:text-7xl"
        >
          {initials(leader.name ?? "")}
        </span>
        <span className="mt-5 block h-px w-12 bg-white/35" aria-hidden />
        <span className="mt-5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-white/70">
          {BRAND.full}
        </span>
      </div>
    </div>
  );
}

/* ---------------- The people behind the bag ----------------
   Opens /about. One featured leader given real room — portrait, a lede and
   three paragraphs in their own voice — then the remaining seats as a slim
   hairline row rather than four equal cards competing for attention. */
export default function Leadership() {
  const [featured, ...rest] = LEADERSHIP;

  return (
    <section
      aria-labelledby="people-heading"
      className="bg-gradient-to-b from-cream-deep/45 to-cream-deep/15 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading — two-tone, no eyebrow chip */}
        <Reveal>
          <div className="max-w-2xl">
            <h2
              id="people-heading"
              className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-[42px]"
            >
              <span className="font-800">The people</span>{" "}
              <span className="font-400 text-ink/55">behind the bag</span>
            </h2>
            <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-terracotta animate-rule" />
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              A feed business runs on trust, and trust is personal. These are the
              people accountable for what leaves the mill.
            </p>
          </div>
        </Reveal>

        {/* Featured — portrait left, voice right */}
        {featured?.name && (
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-14">
              <div className="aspect-[4/5] w-full max-w-sm lg:max-w-none">
                <Portrait leader={featured} />
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="font-display text-2xl tracking-tight text-ink sm:text-[28px]">
                  <span className="font-800">Director&rsquo;s</span>{" "}
                  <span className="font-400 text-ink/55">desk</span>
                </h3>
                <span className="mt-4 block h-px w-10 origin-left bg-terracotta animate-rule" />

                {featured.lede && (
                  <p className="mt-6 font-serif text-[20px] leading-[1.5] tracking-[-0.005em] text-ink sm:text-[22px]">
                    {featured.lede}
                  </p>
                )}

                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                  {featured.bio?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Sign-off */}
                <div className="mt-8 flex items-center gap-4">
                  <span aria-hidden className="h-px w-10 shrink-0 bg-terracotta" />
                  <div>
                    <p className="font-display font-700 text-[15px] text-ink">
                      {featured.name}
                    </p>
                    <p className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-terracotta-dark">
                      {featured.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Remaining seats — hairline row, deliberately quiet */}
        {rest.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-16 border-t border-ink/[0.08] pt-8 lg:mt-20">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/50">
                Also on the team
              </p>
              {/* gap-px over a tinted backdrop gives hairline rules that reflow
                  correctly at any column count, unlike divide-x. */}
              <div className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-cream-deep sm:grid-cols-3">
                {rest.map((leader, i) => (
                  <div
                    key={`${leader.role}-${i}`}
                    className="animate-settle bg-cream px-5 py-5 transition-colors duration-500 hover:bg-white"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <p className="font-display font-700 text-[15px] text-ink/70">
                      {leader.role}
                    </p>
                    <p className="mt-1.5 text-[13px] text-ink-soft/60">
                      {leader.name ?? "To be announced"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
