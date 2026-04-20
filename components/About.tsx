import { BUSINESS_NAME } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
          About Us
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
          Built on Craftsmanship
        </h2>
        <p className="text-slate text-lg leading-relaxed max-w-2xl mx-auto">
          {BUSINESS_NAME} has been serving the Bannock County area with
          professional stone, brick, and cinderblock construction designed to
          last a lifetime. Whether you need a chimney repaired, a fireplace
          built from scratch, or a custom outdoor living space, we bring the
          same dedication to quality on every job — large or small.
        </p>
      </div>
    </section>
  );
}
