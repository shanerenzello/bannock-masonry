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
      className="w-full bg-brick-red hover:bg-terracotta disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md"
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Request a Free Quote
          </h2>
          <p className="text-slate">
            Or call us directly at{" "}
            <a href={PHONE_HREF} className="text-brick-red underline hover:text-terracotta">
              {PHONE}
            </a>
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {state.status === "success" ? (
            <div className="bg-green-50 border border-green-300 text-green-800 rounded-2xl p-6 text-center">
              <p className="text-lg font-semibold">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.status === "rate_limited" && (
                <p className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl p-3 text-sm">
                  {state.message}
                </p>
              )}
              {state.status === "error" && state.message && (
                <p className="bg-red-50 border border-red-300 text-red-700 rounded-xl p-3 text-sm">
                  {state.message}
                </p>
              )}

              <div>
                <label htmlFor="name" className="block text-charcoal text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  className="w-full bg-cream border border-sand text-charcoal placeholder-slate/50 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brick-red transition-colors"
                  placeholder="Your name"
                />
                {state.fieldErrors?.name && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-charcoal text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-cream border border-sand text-charcoal placeholder-slate/50 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brick-red transition-colors"
                  placeholder="you@example.com"
                />
                {state.fieldErrors?.email && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-charcoal text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  className="w-full bg-cream border border-sand text-charcoal placeholder-slate/50 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brick-red transition-colors resize-none"
                  placeholder="Describe your project…"
                />
                {state.fieldErrors?.message && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.message[0]}</p>
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
