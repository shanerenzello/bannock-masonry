"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactFormState } from "@/app/actions";
import { PHONE, PHONE_HREF } from "@/lib/constants";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-brick-red hover:bg-terracotta disabled:opacity-60 text-white font-semibold py-3 px-6 rounded transition-colors"
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <section id="contact" className="py-20 bg-charcoal text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sand uppercase tracking-widest text-sm font-semibold mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Request a Free Quote
          </h2>
          <p className="text-sand/80">
            Or call us directly at{" "}
            <a href={PHONE_HREF} className="text-sand underline hover:text-white">
              {PHONE}
            </a>
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {state.status === "success" ? (
            <div className="bg-green-800/50 border border-green-600 text-green-200 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.status === "rate_limited" && (
                <p className="bg-yellow-900/50 border border-yellow-600 text-yellow-200 rounded p-3 text-sm">
                  {state.message}
                </p>
              )}
              {state.status === "error" && state.message && (
                <p className="bg-red-900/50 border border-red-600 text-red-200 rounded p-3 text-sm">
                  {state.message}
                </p>
              )}

              <div>
                <label htmlFor="name" className="block text-sand text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  className="w-full bg-slate/30 border border-slate text-white placeholder-slate/60 rounded px-4 py-2.5 focus:outline-none focus:border-sand"
                  placeholder="Your name"
                />
                {state.fieldErrors?.name && (
                  <p className="text-red-400 text-xs mt-1">{state.fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sand text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-slate/30 border border-slate text-white placeholder-slate/60 rounded px-4 py-2.5 focus:outline-none focus:border-sand"
                  placeholder="you@example.com"
                />
                {state.fieldErrors?.email && (
                  <p className="text-red-400 text-xs mt-1">{state.fieldErrors.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sand text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  className="w-full bg-slate/30 border border-slate text-white placeholder-slate/60 rounded px-4 py-2.5 focus:outline-none focus:border-sand resize-none"
                  placeholder="Describe your project…"
                />
                {state.fieldErrors?.message && (
                  <p className="text-red-400 text-xs mt-1">{state.fieldErrors.message[0]}</p>
                )}
              </div>

              <SubmitButton />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
