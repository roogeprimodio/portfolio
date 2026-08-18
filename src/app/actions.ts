"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Server actions are public HTTP endpoints — anything can POST here, not just
 * our form. Every field is re-validated server side; the client-side zod schema
 * is a UX affordance, not a control.
 */
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
  /** Honeypot: real users never see this field, bots fill everything. */
  website: z.string().max(0).optional(),
});

export type ContactPayload = z.input<typeof contactSchema>;

interface ActionResult {
  success: boolean;
  message: string;
}

/**
 * In-memory sliding window.
 *
 * On serverless (Vercel), this is per-instance and resets on cold start, so it
 * is a speed bump against naive floods rather than a hard limit. Combined with
 * the honeypot it is proportionate for a portfolio contact form. If real abuse
 * shows up, move the counter to a shared store (Upstash Redis has a free tier)
 * so the limit holds across instances.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissions = new Map<string, number[]>();

async function clientKey(): Promise<string> {
  // headers() is async in Next 15.
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  const recent = (submissions.get(key) ?? []).filter((at) => at > cutoff);
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);

  // Opportunistic sweep so the map can't grow without bound.
  if (submissions.size > 500) {
    for (const [entryKey, times] of submissions) {
      if (times.every((at) => at <= cutoff)) submissions.delete(entryKey);
    }
  }

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessageAction(
  data: ContactPayload,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid transmission payload." };
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped — accept silently so the bot doesn't learn to retry.
  if (website) {
    return { success: true, message: "Your message has been sent successfully!" };
  }

  if (isRateLimited(await clientKey())) {
    return {
      success: false,
      message: "Too many transmissions. Try again in a few minutes.",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.EMAIL_TO;
  // Resend only delivers `onboarding@resend.dev` to the account owner's own
  // address. Set RESEND_FROM to an address on a domain verified in Resend
  // before this form can reach a real inbox.
  const emailFrom = process.env.RESEND_FROM ?? "onboarding@resend.dev";

  if (!resendApiKey || !emailTo || resendApiKey === "YOUR_RESEND_API_KEY") {
    console.error("Missing or default environment variables for Resend");
    return { success: false, message: "Server error: Email configuration is missing." };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `New Portfolio Message from ${name}`,
      reply_to: email,
      html: `<p>Name: ${escapeHtml(name)}</p><p>Email: ${escapeHtml(email)}</p><p>Message: ${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: "Transmission corrupted. Please try again." };
    }

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
