import type { ReactNode } from "react";

/* ---------------- Shared form controls ----------------
   Both enquiry forms use these so a field looks and behaves the same whether
   you are asking about a bag of feed or about stocking the whole range. */

const BASE =
  "w-full rounded-xl border border-cream-deep bg-cream/50 px-4 py-3 text-ink outline-none transition-colors focus:border-orange";

export function Field({
  label,
  required,
  ...props
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-orange-dark">*</span>}
      </label>
      <input {...props} className={BASE} />
    </div>
  );
}

export function Select({
  label,
  required,
  children,
  ...props
}: { label: string; required?: boolean; children: ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-orange-dark">*</span>}
      </label>
      <select {...props} className={BASE}>
        {children}
      </select>
    </div>
  );
}

export function Textarea({
  label,
  required,
  optional,
  ...props
}: { label: string; required?: boolean; optional?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-orange-dark">*</span>}
        {optional && <span className="ml-1 font-normal text-ink-soft/60">(optional)</span>}
      </label>
      <textarea {...props} className={`${BASE} resize-none`} />
    </div>
  );
}

/* ---------------- Fixed value ----------------
   A readOnly input rather than a styled <div>: it keeps the label association
   and is announced as a form value, but the padlock and tinted ground make it
   obvious at a glance that this one is not a choice. */
export function LockedField({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          readOnly
          value={value}
          aria-label={`${label} (fixed)`}
          className="w-full cursor-default rounded-xl border border-orange/35 bg-orange-light/60 px-4 py-3 pr-11 font-semibold text-terracotta-dark outline-none"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-terracotta-dark/60"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <rect x="4.75" y="10.75" width="14.5" height="9.5" rx="2.25" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.25 10.5V7.75a3.75 3.75 0 017.5 0v2.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      {note && (
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft/75">
          {note}
        </p>
      )}
    </div>
  );
}
