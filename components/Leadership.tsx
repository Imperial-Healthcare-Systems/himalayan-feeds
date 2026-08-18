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
   A photograph when one exists, otherwise a designed panel — monogram,
   mountain motif, brand line — rather than a grey placeholder. The fallback
   reads as intentional at full size and is still used by any seat whose
   portrait has not been supplied.

   Portraits are pre-cropped to 4:5 in public/images/team, so object-cover has
   nothing to trim; the aspect box around this component must stay 4/5 or the
   crop starts cutting into the head.

   Filenames carry an 8-char content hash because these are served straight
   from public/ with a 24h max-age. Replacing a portrait at its existing URL
   leaves every returning visitor on the stale one for a day — which is exactly
   what happened when two of these were first swapped in place. New photo means
   a new filename:
     node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync(F)).digest('hex').slice(0,8))"
   then update the `photo` path in lib/site.ts LEADERSHIP and delete the old
   file. */
function Portrait({
  leader,
  rounded = "rounded-3xl",
}: {
  leader: Leader;
  rounded?: string;
}) {
  if (leader.photo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- client-supplied
         portrait path; swap to next/image once real photography lands. */
      <img
        src={leader.photo}
        alt={`${leader.name} — ${leader.role}, ${BRAND.full}`}
        width={630}
        height={788}
        className={`h-full w-full object-cover ${rounded}`}
      />
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-terracotta to-orange-dark ${rounded}`}>
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

/* ---------------- One seat in the roster ----------------
   A named person, or a seat being held open. The open seat is a dashed panel
   rather than a grey rectangle, so it reads as "reserved" instead of "image
   failed to load" — and it carries a line of copy saying so plainly. */
function Seat({ leader }: { leader: Leader }) {
  if (!leader.name) {
    return (
      <div>
        <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl border border-dashed border-ink/15 bg-cream-deep/25 px-6 text-center">
          <div>
            <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-ink/12 bg-white/70">
              {/* Outline figure — an empty chair, not a face */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-soft/45" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8.5" r="3.6" />
                <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft/45">
              Seat reserved
            </p>
          </div>
        </div>
        <p className="mt-4 font-display font-700 text-[16px] text-ink/60">
          To be announced
        </p>
        {leader.role && (
          <p className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/45">
            {leader.role}
          </p>
        )}
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft/75">
          This place is held. The name, role and photograph will be added once
          the appointment is confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-cream-deep shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
        <Portrait leader={leader} rounded="rounded-2xl" />
      </div>
      <p className="mt-4 font-display font-700 text-[16px] text-ink">
        {leader.name}
      </p>
      {leader.role && (
        <p className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-terracotta-dark">
          {leader.role}
        </p>
      )}
      {/* Qualifications sit on their own line, not appended to the role. The
          role line is uppercase and letter-spaced for a two-word title;
          post-nominals run longer and read badly in that treatment, and
          joining them would make the job title a sentence. */}
      {leader.credentials && (
        <p className="mt-1.5 text-[12px] font-medium text-ink-soft/70">
          {leader.credentials}
        </p>
      )}
      {leader.lede && (
        <p className="mt-3 font-serif text-[17px] leading-[1.5] tracking-[-0.005em] text-ink">
          {leader.lede}
        </p>
      )}
      {leader.bio && (
        <div className="mt-2.5 space-y-3 text-[14px] leading-relaxed text-ink-soft">
          {leader.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      {/* Direct line. The href is stripped to digits because a dialler will
          not reliably parse the spaces, while the visible text keeps them —
          the number is read far more often than it is tapped. */}
      {leader.phone && (
        <a
          href={`tel:${leader.phone.replace(/[^\d+]/g, "")}`}
          className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink transition-colors hover:text-terracotta"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path
              d="M4.5 5.5c0-.6.4-1 1-1h2.2c.5 0 .9.3 1 .8l.7 2.8c.1.4-.1.8-.4 1l-1.4.9a12 12 0 0 0 5.4 5.4l.9-1.4c.2-.3.6-.5 1-.4l2.8.7c.5.1.8.5.8 1v2.2c0 .6-.4 1-1 1A14.5 14.5 0 0 1 4.5 5.5Z"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Call {leader.name} on </span>
          {leader.phone}
        </a>
      )}
    </div>
  );
}

/* ---------------- The people behind the bag ----------------
   Opens /about. Three equal seats in LEADERSHIP order, left to right: the CEO,
   then the two directors.

   Equal cards rather than a featured lead block. That started as a defence
   against the first seat being a vacancy — a full-width hero built around an
   empty chair — and the seat is filled now, so the original reason is spent.
   It stays because the roster is three people on one row at lg, which is
   already a clear hierarchy by position; promoting the first seat would cost
   the row and buy emphasis it does not need.

   Cards are top-aligned and will differ in height — entries run to two or
   three paragraphs, and only the CEO carries a number. That is expected; do
   not trim client copy to even the columns up. */
export default function Leadership() {
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

        <Reveal delay={0.1}>
          <div className="mt-12 grid items-start gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-10">
            {LEADERSHIP.map((leader, i) => (
              <div
                key={leader.name ?? `seat-${i}`}
                className="animate-settle"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                <Seat leader={leader} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
