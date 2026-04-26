import Image from "next/image";
import { PHONE, PHONE_HREF, PHONE_SMS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="bg-cream">
      {/* Hero image — aspect-ratio container prevents cropping */}
      <div className="w-full aspect-[2/1] sm:aspect-[3/1] relative">
        <Image
          src="/images/hero/hero.jpg"
          alt="Bannock Stone and Brick Masonry — Idaho's Trusted Stonemasons"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* CTA section */}
      <div className="text-center px-4 py-14 max-w-3xl mx-auto">
        <p className="text-brick-red text-sm uppercase tracking-widest mb-4 font-semibold">
          Stone · Brick · Cinderblock
        </p>
        <p className="text-lg sm:text-xl text-slate mb-10 max-w-xl mx-auto leading-relaxed">
          Professional stone, brick, and cinderblock construction designed to
          last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-brick-red hover:bg-terracotta text-white font-semibold px-8 py-3 rounded-xl text-lg transition-colors shadow-md"
          >
            Get a Free Quote
          </a>
          <a
            href={PHONE_SMS}
            className="border-2 border-charcoal/30 text-charcoal hover:border-brick-red hover:text-brick-red font-semibold px-8 py-3 rounded-xl text-lg transition-colors"
          >
            Text {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
