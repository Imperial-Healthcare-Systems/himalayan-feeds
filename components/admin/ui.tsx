"use client";

/* ==========================================================================
   ADMIN PORTAL — icons and shared primitives
   Built on the Himalayan Feeds palette so the console reads as the same
   company, but denser and flatter than the marketing site: an operator lives
   in these screens, and marketing shadows behind a data table cost legibility.
   ========================================================================== */

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ icons */

function S({ size = 18, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

type P = { size?: number };

export const IconDashboard = (p: P) => (
  <S {...p}>
    <rect x="3" y="3" width="7.5" height="8.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5" />
    <rect x="13.5" y="11.5" width="7.5" height="9.5" rx="1.5" />
    <rect x="3" y="14.5" width="7.5" height="6.5" rx="1.5" />
  </S>
);
export const IconBag = (p: P) => (
  <S {...p}>
    <path d="M5 8h14l-1 12a1.6 1.6 0 0 1-1.6 1.5H7.6A1.6 1.6 0 0 1 6 20z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </S>
);
export const IconTag = (p: P) => (
  <S {...p}>
    <path d="M3 12.5V4.5A1.5 1.5 0 0 1 4.5 3h8l8.5 8.5a1.6 1.6 0 0 1 0 2.2l-6.8 6.8a1.6 1.6 0 0 1-2.2 0z" />
    <circle cx="7.8" cy="7.8" r="1.4" />
  </S>
);
export const IconGear = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.6 1.6 0 0 0 .32 1.77l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.6 1.6 0 0 0 15 19.4a1.6 1.6 0 0 0-1 1.47V21a2 2 0 1 1-4 0v-.09A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.77.32l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.6 1.6 0 0 0 4.6 15a1.6 1.6 0 0 0-1.47-1H3a2 2 0 1 1 0-4h.09A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.32-1.77l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.6 1.6 0 0 0 9 4.6a1.6 1.6 0 0 0 1-1.47V3a2 2 0 1 1 4 0v.09A1.6 1.6 0 0 0 15 4.6a1.6 1.6 0 0 0 1.77-.32l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.6 1.6 0 0 0 19.4 9v0a1.6 1.6 0 0 0 1.47 1H21a2 2 0 1 1 0 4h-.09a1.6 1.6 0 0 0-1.47 1z" />
  </S>
);
export const IconPlus = (p: P) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const IconSearch = (p: P) => (
  <S {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </S>
);
export const IconEdit = (p: P) => (
  <S {...p}>
    <path d="M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M14.5 6.5l3 3" />
  </S>
);
export const IconTrash = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    <path d="M6.5 7l.8 12a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.8-12" />
    <path d="M10.5 11v6M13.5 11v6" />
  </S>
);
export const IconStar = (p: P) => (
  <S {...p}>
    <path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8z" />
  </S>
);
export const IconEye = (p: P) => (
  <S {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </S>
);
export const IconEyeOff = (p: P) => (
  <S {...p}>
    <path d="M10.6 6.1A7.9 7.9 0 0 1 12 6c6 0 9.5 6 9.5 6a15 15 0 0 1-2.7 3.4M6.3 7.9A15 15 0 0 0 2.5 12S6 18 12 18a8.6 8.6 0 0 0 3.6-.8" />
    <path d="M10 10a2.8 2.8 0 0 0 4 4M3 3l18 18" />
  </S>
);
export const IconLogout = (p: P) => (
  <S {...p}>
    <path d="M9 4.5H6A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h3" />
    <path d="M15.5 15.5L19 12l-3.5-3.5M19 12H9.5" />
  </S>
);
export const IconMenu = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </S>
);
export const IconClose = (p: P) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </S>
);
export const IconExternal = (p: P) => (
  <S {...p}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M19 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6.5A1.5 1.5 0 0 1 5 5h4.5" />
  </S>
);
export const IconAlert = (p: P) => (
  <S {...p}>
    <path d="M12 4l9 15H3L12 4z" />
    <path d="M12 10v4M12 16.6v.1" />
  </S>
);

/* ----------------------------------------------------------------- buttons */

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";
export const btnPrimary = `${btn} bg-terracotta text-white shadow-soft hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift`;
export const btnGhost = `${btn} border border-ink/12 bg-white text-ink hover:border-ink/25 hover:bg-cream`;
export const btnDanger = `${btn} border border-red-200 bg-white text-red-700 hover:bg-red-50`;

/* ------------------------------------------------------------------ modal */

export function Modal({
  title,
  onClose,
  children,
  footer,
  width = "max-w-lg",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  /* Escape closes, focus moves into the dialog, and the page behind stops
     scrolling while it is open. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/45 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panel}
        onMouseDown={(e) => e.stopPropagation()}
        className={`flex max-h-[calc(100vh-2rem)] w-full ${width} flex-col overflow-hidden rounded-2xl bg-white shadow-lift`}
      >
        <div className="flex items-center gap-4 border-b border-ink/8 px-5 py-4">
          <h2 id={titleId} className="font-display font-700 text-base text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-ink/10 text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
          >
            <IconClose size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm text-ink">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t border-ink/8 bg-cream/60 px-5 py-3.5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  title,
  body,
  confirmLabel = "Delete",
  busy = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  body: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      width="max-w-md"
      footer={
        <>
          <button className={btnGhost} onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button className={btnDanger} onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
          <IconAlert size={19} />
        </span>
        <div className="space-y-2">{body}</div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ states */

export function LoadingState({ rows = 5, label = "Loading…" }: { rows?: number; label?: string }) {
  return (
    <div className="space-y-2.5" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-xl bg-ink/[0.055]" />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-14 text-center">
      <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-cream-deep text-ink-soft">
        <IconSearch size={22} />
      </span>
      <p className="font-display font-700 text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-soft">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-red-200 bg-red-50/70 px-4 py-3.5"
    >
      <span className="text-red-600">
        <IconAlert size={19} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-red-800">Something went wrong</p>
        <p className="text-[13px] text-red-700/80">{message}</p>
      </div>
      {onRetry ? (
        <button className={btnGhost} onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ fields */

export const inputCls =
  "w-full rounded-lg border border-ink/12 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/45 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  full,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.11em] text-ink-soft"
      >
        {label}
        {required ? <span className="ml-1 text-terracotta">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-[12.5px] text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[12.5px] text-ink-soft/80">{hint}</p>
      ) : null}
    </div>
  );
}

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        on ? "bg-leaf" : "bg-ink/15"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

/** Repeatable string list — benefits, target animals, extra images. */
export function ListEditor({
  items,
  onChange,
  placeholder,
  addLabel,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
  addLabel: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className={inputCls}
            value={item}
            placeholder={placeholder}
            onChange={(e) => {
              const next = items.slice();
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            aria-label={`Remove item ${i + 1}`}
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink/12 text-ink-soft transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <IconClose size={15} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="rounded-full border border-ink/12 px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-colors hover:border-terracotta/40 hover:bg-orange-light hover:text-terracotta-dark"
      >
        + {addLabel}
      </button>
    </div>
  );
}
