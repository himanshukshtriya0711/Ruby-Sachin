/**
 * Central image registry.
 *
 * To use your own photographs, either:
 *   1. overwrite the files in /assets/images with the same names, or
 *   2. drop new files into /assets/images and change the imports below.
 *
 * Static imports give Next.js the width, height and a blur placeholder
 * automatically, so no component needs to change when photos are swapped.
 *
 * Current photos are royalty-free placeholders from Unsplash (unsplash.com/license).
 */
import heroCouple from "@/assets/images/hero-couple.jpg";
import story1 from "@/assets/images/story-1.jpg";
import story2 from "@/assets/images/story-2.jpg";
import venue from "@/assets/images/venue.jpg";
import gallery1 from "@/assets/images/gallery-1.jpg";
import gallery2 from "@/assets/images/gallery-2.jpg";
import gallery3 from "@/assets/images/gallery-3.jpg";
import gallery4 from "@/assets/images/gallery-4.jpg";
import gallery5 from "@/assets/images/gallery-5.jpg";
import gallery6 from "@/assets/images/gallery-6.jpg";
import gallery7 from "@/assets/images/gallery-7.jpg";
import gallery8 from "@/assets/images/gallery-8.jpg";
import type { StaticImageData } from "next/image";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, useful to keep faces in frame when cropped. */
  focus?: string;
};

export const images = {
  hero: {
    src: heroCouple,
    alt: "The bride and groom sharing a tender moment in pastel wedding attire",
    focus: "50% 22%",
  },
  story: [
    {
      src: story1,
      alt: "The couple embracing in soft evening light",
      focus: "50% 30%",
    },
    {
      src: story2,
      alt: "The couple smiling together beneath hanging florals",
      focus: "50% 55%",
    },
  ],
  venue: {
    src: venue,
    alt: "A floral wedding mandap at the end of a white flower-lined aisle",
    focus: "50% 50%",
  },
} satisfies Record<string, Photo | Photo[]>;

/**
 * Gallery photos — add, remove or reorder freely. Portrait photos take two grid
 * rows and landscape photos one; the order Portrait, Landscape, P, L, P, P, L, L
 * packs perfectly into the 4-column desktop grid.
 */
export const galleryPhotos: Photo[] = [
  { src: gallery1, alt: "Couple in lavender and ivory wedding outfits", focus: "50% 25%" },
  { src: gallery3, alt: "Bride and groom holding hands beneath a palace archway lit with candles" },
  { src: gallery4, alt: "Couple standing under a canopy of white flowers", focus: "50% 30%" },
  { src: gallery7, alt: "Newlyweds laughing together during the ceremony" },
  { src: gallery6, alt: "Bride and groom on a tree-lined path", focus: "50% 45%" },
  { src: gallery2, alt: "Close-up of joined hands with intricate mehendi" },
  { src: gallery5, alt: "Mehendi-adorned hands and bangles" },
  { src: gallery8, alt: "Couple sharing a quiet moment amid stone architecture" },
];
