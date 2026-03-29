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
        `?type=uploaded&fields=id,images&limit=16&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

// iFrame URL for the official Facebook Page Plugin
const pluginSrc =
  `https://www.facebook.com/plugins/page.php` +
  `?href=${encodeURIComponent(FACEBOOK_URL)}` +
  `&tabs=timeline%2Cphotos` +
  `&width=500&height=650` +
  `&small_header=true` +
  `&adapt_container_width=true` +
  `&hide_cover=false` +
  `&show_facepile=false`;

export default async function FacebookGallery() {
  const photos = await fetchPhotos();

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Project Gallery
          </h2>
          <p className="text-slate">
            Real jobs, real results — straight from our Facebook page.
          </p>
        </div>

        {photos.length > 0 ? (
          /* Graph API photo grid — shown when FACEBOOK_PAGE_ACCESS_TOKEN is set */
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
              {photos.map((photo) => {
                const img = photo.images[0];
                return (
                  <a
                    key={photo.id}
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square overflow-hidden rounded-lg bg-sand/30 block"
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
            <div className="text-center">
              <FacebookButton />
            </div>
          </>
        ) : (
          /* Official Facebook Page Plugin (iFrame) — works on any public domain, no token needed */
          <div className="flex flex-col items-center gap-6">
            <div
              className="w-full overflow-hidden rounded-xl shadow-lg"
              style={{ maxWidth: 500 }}
            >
              <iframe
                src={pluginSrc}
                width="500"
                height="650"
                style={{ border: "none", overflow: "hidden", width: "100%" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                title="Bannock Stone & Brick Masonry Facebook feed"
              />
            </div>
            <FacebookButton />
          </div>
        )}
      </div>
    </section>
  );
}

function FacebookButton() {
  return (
    <a
      href={FACEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      View All on Facebook
    </a>
  );
}
