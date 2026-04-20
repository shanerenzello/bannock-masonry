import Image from "next/image";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="bg-cream">
      {/* Hero image */}
      <div className="w-full relative">
        <Image
          src="/images/hero/hero.jpg"
          alt="Bannock Stone and Brick Masonry — Idaho's Trusted Stonemasons"
          width={1200}
          height={400}
          className="w-full object-cover max-h-80 sm:max-h-[420px]"
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
            href={PHONE_HREF}
            className="border-2 border-charcoal/30 text-charcoal hover:border-brick-red hover:text-brick-red font-semibold px-8 py-3 rounded-xl text-lg transition-colors"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
