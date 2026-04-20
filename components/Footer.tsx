import Image from "next/image";
import { BUSINESS_NAME, PHONE, PHONE_HREF, FACEBOOK_URL } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-sand py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Image
            src="/images/logo.jpg"
            alt={BUSINESS_NAME}
            width={72}
            height={72}
            className="rounded-full object-cover"
          />
          <p className="font-serif font-bold text-lg">{BUSINESS_NAME}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm mb-6">
          <a href={PHONE_HREF} className="hover:text-white transition-colors">
            {PHONE}
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>
        <p className="text-center text-sand/40 text-xs">
          © {year} {BUSINESS_NAME}
        </p>
      </div>
    </footer>
  );
}
