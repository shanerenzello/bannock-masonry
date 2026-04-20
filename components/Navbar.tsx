import Image from "next/image";
import { BUSINESS_NAME, PHONE, PHONE_HREF } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-sand/30">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt={BUSINESS_NAME}
            width={44}
            height={44}
            className="rounded-full object-cover flex-shrink-0"
          />
          <span className="font-serif text-lg font-bold text-charcoal whitespace-nowrap hidden sm:block">
            {BUSINESS_NAME}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="text-slate hover:text-charcoal transition-colors text-sm font-medium hidden sm:block"
          >
            {PHONE}
          </a>
          <a
            href="#contact"
            className="bg-brick-red hover:bg-terracotta text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
