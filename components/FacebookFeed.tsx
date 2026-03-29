"use client";

import { useEffect } from "react";
import { FACEBOOK_URL } from "@/lib/constants";

declare global {
  interface Window {
    FB?: { XFBML: { parse: () => void } };
  }
}

export default function FacebookFeed() {
  useEffect(() => {
    if (document.getElementById("fb-sdk")) {
      window.FB?.XFBML.parse();
      return;
    }
    const script = document.createElement("script");
    script.id = "fb-sdk";
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Follow Us on Facebook
          </h2>
          <p className="text-slate">
            See our latest projects and updates straight from our Facebook page.
          </p>
        </div>

        <div className="flex justify-center">
          <div id="fb-root" />
          <div
            className="fb-page"
            data-href={FACEBOOK_URL}
            data-tabs="timeline,photos"
            data-width="500"
            data-height="600"
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="false"
          />
        </div>
      </div>
    </section>
  );
}
