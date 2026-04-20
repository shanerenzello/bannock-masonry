export const BUSINESS_NAME = "Bannock Stone & Brick Masonry";
export const TAGLINE = "Idaho's Trusted Stonemasons";
export const PHONE = "(208) 555-0198";
export const PHONE_HREF = "tel:+12085550198";
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61556637376043";
export const FACEBOOK_PAGE_ID = "61556637376043";

export const SERVICES = [
  {
    id: "chimney",
    title: "Chimney Repair & Rebuilds",
    description:
      "From tuckpointing and cap replacement to full chimney rebuilds, we restore your chimney to safe, solid condition.",
    icon: "🧱",
  },
  {
    id: "fireplaces",
    title: "Stone Fireplaces",
    description:
      "Custom stone fireplaces designed to be the centerpiece of your home — built to last a lifetime.",
    icon: "🔥",
  },
  {
    id: "outdoor",
    title: "Outdoor Grills & Living",
    description:
      "Transform your backyard with a custom stone outdoor kitchen, grill surround, or fire pit.",
    icon: "🍖",
  },
  {
    id: "additions",
    title: "Natural Stone Additions",
    description:
      "Stone accent walls, retaining walls, steps, and structural additions built with natural and manufactured stone.",
    icon: "🏗️",
  },
] as const;

export const GALLERY_IMAGES: { src: string; alt: string }[] = [];
