import nodemailer from "nodemailer";
import { BRAND } from "./site";
import { enquiryText, type EnquiryKind, type EnquiryRow } from "./enquiry";

/* ==========================================================================
   ENQUIRY DELIVERY — server only
   --------------------------------------------------------------------------
   Every form on the site used to hand off to WhatsApp and nothing else, which
   made the prefilled chat the only record and required the visitor to press
   send in a second app. This puts a copy in the inbox automatically instead.

   ⚠ NEEDS A CREDENTIAL TO DO ANYTHING. Sending mail is not something a browser
   can do, and no provider will relay without an account. Until one of the two
   keys below is set, `send` returns { ok: false, reason: "unconfigured" } and
   the forms fall back to the WhatsApp handoff they have always used — so
   deploying this changes nothing until the key exists, rather than silently
   dropping leads.

   Three transports, tried in this order. The first one configured wins:

     SMTP_HOST + SMTP_USER + SMTP_PASS      nodemailer, over the mailbox's own
                         SMTP server. This is the primary path: mail is sent by
                         info@himalayanfeeds.com itself, so it lands in that
                         account's Sent folder, replies thread naturally, and
                         no third party ever holds the leads. It needs no DNS
                         change and no API account — just the mailbox password.
                         For a Hostinger-hosted mailbox that is
                         smtp.hostinger.com on port 465.

     RESEND_API_KEY      Resend's REST API. Needs himalayanfeeds.com verified
                         in Resend by DNS record and ENQUIRY_FROM set to an
                         address on it.

     WEB3FORMS_ACCESS_KEY  Web3Forms. The key is issued against an address and
                         everything is forwarded there, so the destination is
                         fixed by whoever created the key — TO below is NOT
                         honoured.

   Nothing is committed. Set the variables in the Vercel project's environment
   settings; .env.example lists them with no values.

   ⚠ SMTP_PASS is a real mailbox password. Anyone holding it can read and send
   as info@himalayanfeeds.com, so it belongs in Vercel's environment settings
   and nowhere else — not in this repo, not in a screenshot, not in chat. If
   the mailbox supports an app-specific password, use that instead so it can be
   revoked without changing the account password.
   ========================================================================== */

/** Where enquiries are meant to land. Honoured by Resend; see the Web3Forms
    note above, where the key itself decides the destination. */
const TO = BRAND.email;

export type MailResult =
  | { ok: true; via: "smtp" | "resend" | "web3forms" }
  | { ok: false; reason: "unconfigured" | "provider"; detail?: string };

const SUBJECT: Record<EnquiryKind, string> = {
  dealership: "Dealership enquiry",
  general: "Website enquiry",
  subscribe: "Mailing list sign-up",
  quote: "Quote request",
};

/* The reply-to is what makes a lead actionable — without it, answering means
   copying an address out of the body by hand. Pulled from whichever row holds
   an email, rather than a fixed index, because the three forms order their
   fields differently. */
function replyTo(rows: EnquiryRow[]): string | undefined {
  const hit = rows.find(
    ([label, value]) => /e-?mail/i.test(label) && value.includes("@"),
  );
  return hit?.[1].trim() || undefined;
}

function senderName(rows: EnquiryRow[]): string {
  const hit = rows.find(([label]) => /^name|full name/i.test(label));
  return hit?.[1].trim() || "Website visitor";
}

/* ---------------- SMTP, via nodemailer ----------------
   A fresh transport per call rather than one held at module scope. A serverless
   function is frozen between invocations and a pooled socket does not survive
   that — it comes back half-dead and the first send after a cold spell fails.
   Opening a connection costs a few hundred milliseconds on a form submit; a
   silently dropped lead costs more. */
function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

async function viaSmtp(
  subject: string,
  body: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  if (!smtpConfigured()) return { ok: false, reason: "unconfigured" };

  /* 465 is implicit TLS and 587 is STARTTLS. Deriving `secure` from the port
     rather than asking for it separately removes the single most common way to
     misconfigure this — the two have to agree or the handshake hangs until it
     times out. SMTP_SECURE can still override for an unusual server. */
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      /* A form submit that cannot finish should fail and fall back to the
         WhatsApp handoff, not hold the request open until the platform kills
         it. Vercel's default function timeout is short enough that an
         unbounded SMTP dial would be cut off mid-flight with nothing logged. */
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transport.sendMail({
      /* The envelope sender must be the authenticated mailbox — most servers
         reject a From: they did not authenticate, and the ones that accept it
         get the mail filed as spam. The visitor's own address goes in
         replyTo, which is what actually matters for answering. */
      from: `"${BRAND.full} website" <${process.env.SMTP_USER}>`,
      to: process.env.ENQUIRY_TO ?? TO,
      subject,
      text: body,
      replyTo: replyTo(rows),
    });

    return { ok: true, via: "smtp" };
  } catch (e) {
    return { ok: false, reason: "provider", detail: String(e) };
  }
}

async function viaResend(
  subject: string,
  body: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "unconfigured" };

  /* Resend refuses any from-address on an unverified domain. The fallback is
     Resend's own sandbox sender, which works immediately but can only deliver
     to the account holder's own address — fine for a smoke test, not for
     production. Set ENQUIRY_FROM once the domain is verified. */
  const from = process.env.ENQUIRY_FROM ?? "onboarding@resend.dev";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${BRAND.full} website <${from}>`,
        to: [TO],
        subject,
        text: body,
        reply_to: replyTo(rows),
      }),
    });
    if (!res.ok) {
      return { ok: false, reason: "provider", detail: await res.text() };
    }
    return { ok: true, via: "resend" };
  } catch (e) {
    return { ok: false, reason: "provider", detail: String(e) };
  }
}

async function viaWeb3Forms(
  subject: string,
  body: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return { ok: false, reason: "unconfigured" };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: `${senderName(rows)} — ${BRAND.full} website`,
        email: replyTo(rows),
        message: body,
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !data?.success) {
      return { ok: false, reason: "provider", detail: JSON.stringify(data) };
    }
    return { ok: true, via: "web3forms" };
  } catch (e) {
    return { ok: false, reason: "provider", detail: String(e) };
  }
}

/* ---------------- The one entry point ----------------
   Body text is built by the same enquiryText() the WhatsApp handoff uses, so
   a lead reads identically whichever channel it arrived through and there is
   only one format to keep current. */
export async function sendEnquiryMail(
  kind: EnquiryKind,
  subject: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  const line = `${SUBJECT[kind]} — ${subject}`;
  const body = enquiryText(kind, subject, rows);

  if (smtpConfigured()) return viaSmtp(line, body, rows);
  if (process.env.RESEND_API_KEY) return viaResend(line, body, rows);
  if (process.env.WEB3FORMS_ACCESS_KEY) return viaWeb3Forms(line, body, rows);
  return { ok: false, reason: "unconfigured" };
}
