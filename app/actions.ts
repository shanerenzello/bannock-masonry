"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, type ContactFormErrors } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rateLimit";
import { saveSubmission } from "@/lib/submissionStore";

export type ContactFormState = {
  status: "idle" | "success" | "error" | "rate_limited";
  fieldErrors?: ContactFormErrors;
  message?: string;
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Rate limiting
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return {
      status: "rate_limited",
      message: "Too many submissions. Please try again later.",
    };
  }

  // Validate
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };
  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return {
      status: "error",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = result.data;

  // Send email
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return { status: "error", message: "Server configuration error." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Contact Form <noreply@bannockmasonry.com>",
    to: toEmail,
    replyTo: email,
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    return { status: "error", message: "Failed to send your message. Please call us directly." };
  }

  // Persist to dashboard (non-blocking — email already sent)
  await saveSubmission({ name, email, message, ip }).catch(() => {});

  return { status: "success", message: "Thanks! We'll be in touch soon." };
}
