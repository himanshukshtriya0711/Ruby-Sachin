import Image from "next/image";
import { images } from "@/lib/assets";
import { story } from "@/lib/wedding";
import { FloralCluster } from "./decor/FloralCluster";
import { PalaceSketch } from "./decor/PalaceSketch";
import { Reveal } from "./ui/Reveal";
import { ScrollDraw } from "./ui/ScrollDraw";
import { StoryChapters } from "./StoryChapters";

export function OurStory() {
  const [back, front] = images.story;
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden py-16 sm:py-24">
      {/* faint palace for small screens */}
      <PalaceSketch className="absolute right-[-10%] bottom-6 w-[120%] max-w-none text-lavender opacity-25 lg:hidden" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1fr_1.2fr] lg:gap-8 lg:px-10">
        {/* overlapping polaroids */}
        <Reveal from="left" className="relative mx-auto aspect-[10/9] w-full max-w-[420px]">
          <figure className="polaroid group absolute top-0 right-1 w-[56%] rotate-[7deg] transition-transform duration-700 ease-[var(--ease-luxe)] hover:rotate-[3deg]">
            <Reveal from="image" delay={0.2} className="relative aspect-[4/5] overflow-hidden bg-lavender-soft">
              <Image
                src={back.src}
                alt={back.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 240px, 50vw"
                className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                style={{ objectPosition: back.focus }}
              />
            </Reveal>
          </figure>
          <figure className="polaroid group absolute bottom-0 left-1 z-10 w-[62%] -rotate-[5deg] transition-transform duration-700 ease-[var(--ease-luxe)] hover:-rotate-[2deg]">
            <Reveal from="image" delay={0.35} className="relative aspect-[4/5] overflow-hidden bg-lavender-soft">
              <Image
                src={front.src}
                alt={front.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 260px, 60vw"
                className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                style={{ objectPosition: front.focus }}
              />
            </Reveal>
          </figure>
          <FloralCluster variant="corner" seed={42} className="absolute -bottom-10 -left-10 z-20 w-[52%]" />
        </Reveal>

        {/* copy */}
        <Reveal delay={0.1} className="mx-auto max-w-md text-center lg:mx-0 lg:text-left">
          <h2 id="story-title" className="heading-serif text-[2.6rem] leading-tight sm:text-5xl">
            Our Story
          </h2>
          <p className="mt-4 text-[1.15rem] leading-relaxed text-ink-soft">{story.intro}</p>
          <StoryChapters />
        </Reveal>

        {/* palace line drawing */}
        <ScrollDraw className="relative hidden text-lavender lg:block">
          <PalaceSketch className="w-full" />
          <FloralCluster variant="spray" seed={8} className="absolute -bottom-6 left-[-6%] w-[46%] opacity-90" />
          <FloralCluster variant="spray" seed={14} flipX className="absolute -right-[8%] -bottom-4 w-[40%] opacity-80" />
        </ScrollDraw>
      </div>
    </section>
  );
}
