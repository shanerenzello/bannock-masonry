import Image from "next/image";
import { FACEBOOK_URL, FACEBOOK_PAGE_ID } from "@/lib/constants";

interface FBPhoto {
  id: string;
  images: { height: number; width: number; source: string }[];
}

async function fetchPhotos(): Promise<FBPhoto[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!token) return [];
  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/photos` +
        `?type=uploaded&fields=id,images&limit=12&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

// Placeholder tiles shown when no Facebook photos are available.
// Replace these with real local images by adding files to /public/images/gallery/
// and updating the src values below.
const PLACEHOLDER_TILES = [
  { label: "Chimney Repair" },
  { label: "Stone Fireplace" },
  { label: "Outdoor Grill" },
  { label: "Stone Arch" },
  { label: "Brick Work" },
  { label: "Retaining Wall" },
  { label: "Custom Patio" },
  { label: "Stone Steps" },
];

function PlaceholderGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
      {PLACEHOLDER_TILES.map((tile) => (
        <a
          key={tile.label}
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square overflow-hidden rounded-xl bg-sand/30 border border-sand/50 flex flex-col items-center justify-center gap-2 hover:bg-sand/50 transition-colors group"
        >
          <svg
            className="w-8 h-8 text-driftwood group-hover:text-brick-red transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18h16.5M21 12V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75V18"
            />
          </svg>
          <span className="text-xs font-semibold text-slate text-center px-2">
            {tile.label}
          </span>
        </a>
      ))}
    </div>
  );
}

export default async function FacebookGallery() {
  const photos = await fetchPhotos();

  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Project Gallery
          </h2>
          <p className="text-slate">
            Real jobs, real results — see more on our Facebook page.
          </p>
        </div>

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {photos.map((photo) => {
              const img = photo.images[0];
              return (
                <a
                  key={photo.id}
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden rounded-xl bg-sand/30 block"
                >
                  <Image
                    src={img.source}
                    alt="Bannock Stone & Brick Masonry project"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </a>
              );
            })}
          </div>
        ) : (
          <PlaceholderGrid />
        )}

        <div className="text-center">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            View All on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
