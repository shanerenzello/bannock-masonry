import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  if (GALLERY_IMAGES.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
            Project Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg bg-sand/30"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
