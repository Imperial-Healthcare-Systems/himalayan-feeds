"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Logo from "@/components/Logo";
import { usePortal } from "@/components/admin/store-context";
import {
  Field,
  IconEye,
  IconEyeOff,
  btnPrimary,
  inputCls,
} from "@/components/admin/ui";
import { DEMO_EMAIL, DEMO_PASSWORD, signIn } from "@/lib/admin/auth";
import { BRAND } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const { session, ready } = usePortal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErr, setFieldErr] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);

  /* Already signed in — skip the doorway. */
  useEffect(() => {
    if (ready && session) router.replace("/admin");
  }, [ready, session, router]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const fe: { email?: string; password?: string } = {};
    if (!email.trim()) fe.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) fe.email = "That does not look like an email address.";
    if (!password) fe.password = "Enter your password.";
    setFieldErr(fe);
    if (Object.keys(fe).length) return;

    setBusy(true);
    /* A beat of latency so the loading state is visible and honest about the
       fact that a real sign-in would not be instant. */
    setTimeout(() => {
      const res = signIn(email, password);
      if (!res.ok) {
        setError(res.error);
        setBusy(false);
        return;
      }
      router.replace("/admin");
    }, 320);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-block" aria-label={`${BRAND.full} — home`}>
            <Logo className="mx-auto h-20 w-20" />
          </Link>
          <h1 className="mt-3 font-display font-800 text-xl tracking-[-0.015em] text-ink">
            {BRAND.full} Admin
          </h1>
          <p className="mt-1 text-sm text-ink-soft">Catalogue management console</p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl border border-ink/8 bg-white p-6 shadow-soft"
        >
          <div className="space-y-4">
            <Field label="Email" required htmlFor="ad-email" error={fieldErr.email}>
              <input
                id="ad-email"
                type="email"
                autoComplete="username"
                className={inputCls}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErr((f) => ({ ...f, email: undefined }));
                }}
                placeholder="you@himalayanfeeds.com"
              />
            </Field>

            <Field label="Password" required htmlFor="ad-pass" error={fieldErr.password}>
              <div className="relative">
                <input
                  id="ad-pass"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  className={`${inputCls} pr-11`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErr((f) => ({ ...f, password: undefined }));
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  aria-pressed={show}
                  className="absolute inset-y-0 right-0 grid w-11 place-items-center text-ink-soft/70 transition-colors hover:text-ink"
                >
                  {show ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                </button>
              </div>
            </Field>
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-700"
            >
              {error}
            </p>
          ) : null}

          <button type="submit" disabled={busy} className={`${btnPrimary} mt-5 w-full py-3`}>
            {busy ? "Signing in…" : "Sign in"}
          </button>

          {/* Honest about what this is. The pair below is in the client bundle,
              so pretending otherwise would be worse than saying it plainly. */}
          <div className="mt-5 rounded-lg border border-orange/25 bg-orange-light/70 px-3.5 py-3 text-[12.5px] leading-relaxed text-terracotta-dark">
            <strong className="mb-0.5 block font-semibold">Demo sign-in — not secure.</strong>
            Credentials are checked in the browser and are readable in the page
            source. There is no server, no password hashing and no real session.
            Do not use this to protect anything.
            <div className="mt-2 space-y-0.5 font-mono text-[11.5px]">
              <div>{DEMO_EMAIL}</div>
              <div>{DEMO_PASSWORD}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail(DEMO_EMAIL);
                setPassword(DEMO_PASSWORD);
                setError(null);
                setFieldErr({});
              }}
              className="mt-2.5 w-full rounded-md border border-dashed border-terracotta/40 py-1.5 text-[12px] font-semibold transition-colors hover:bg-orange-light"
            >
              Fill demo credentials
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-[13px] text-ink-soft">
          <Link href="/" className="font-semibold transition-colors hover:text-terracotta">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
