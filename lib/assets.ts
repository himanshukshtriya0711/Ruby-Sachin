/**
 * Central image registry — Ruby & Sachin's own photographs.
 *
 * To change a photo, either overwrite a file in /assets/images with the same
 * name, or add a new file there and change its import below. Static imports give
 * Next.js the width, height and a blur placeholder automatically.
 * `focus` is the CSS object-position used when a photo is cropped (keeps faces in frame).
 */
import bouquet from "@/assets/images/bouquet.jpeg";
import traditionalPortrait from "@/assets/images/traditional-portrait.jpeg";
import rooftop from "@/assets/images/rooftop.jpeg";
import traditionalStage from "@/assets/images/traditional-stage.jpeg";
import celebration from "@/assets/images/celebration.jpeg";
import templeVisit from "@/assets/images/temple-visit.jpeg";
import celebrationCandid from "@/assets/images/celebration-candid.jpeg";
import floralArch from "@/assets/images/floral-arch.jpeg";
import selfie from "@/assets/images/selfie.jpeg";
import heroLavender from "@/assets/images/hero-lavender.png";
import type { StaticImageData } from "next/image";

export type Photo = {
  src: StaticImageData;
  alt: string;
  focus?: string;
};

export const images = {
  hero: {
    src: heroLavender,
    alt: "Sachin and Ruby in lavender wedding attire beneath a lavender floral arch",
    focus: "48% 22%",
  },
  story: [
    { src: bouquet, alt: "Ruby and Sachin together, Ruby holding a bouquet of roses", focus: "50% 25%" },
    { src: selfie, alt: "A smiling selfie of Ruby and Sachin", focus: "60% 40%" },
  ],
  venue: {
    src: floralArch,
    alt: "Ruby and Sachin beside a white floral arch",
    focus: "50% 30%",
  },
} satisfies Record<string, Photo | Photo[]>;

/**
 * Gallery — add, remove or reorder freely. Portrait photos fill one tall tile;
 * landscape photos span two columns. Eight portraits fill the desktop grid exactly.
 */
export const galleryPhotos: Photo[] = [
  { src: traditionalStage, alt: "Ruby and Sachin in traditional outfits on a floral stage", focus: "50% 20%" },
  { src: celebrationCandid, alt: "Sachin smiling at Ruby during a celebration", focus: "50% 25%" },
  { src: rooftop, alt: "Ruby and Sachin on a rooftop terrace", focus: "50% 30%" },
  { src: traditionalPortrait, alt: "Sachin and Ruby in traditional attire", focus: "50% 22%" },
  { src: floralArch, alt: "Ruby and Sachin beside a white floral arch", focus: "50% 25%" },
  { src: bouquet, alt: "Ruby and Sachin with a bouquet of roses", focus: "50% 25%" },
  { src: templeVisit, alt: "Ruby and Sachin on a temple visit", focus: "50% 55%" },
  { src: celebration, alt: "Ruby and Sachin at a festive evening celebration", focus: "50% 25%" },
];
