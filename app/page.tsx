import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EventBar } from "@/components/EventBar";
import { Countdown } from "@/components/Countdown";
import { OurStory } from "@/components/OurStory";
import { CelebrationCards } from "@/components/CelebrationCards";
import { Venue } from "@/components/Venue";
import { Gallery } from "@/components/Gallery";
import { RSVP } from "@/components/RSVP";
import { Footer } from "@/components/Footer";
import { IntroEnvelope } from "@/components/IntroEnvelope";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MobileRsvpBar } from "@/components/MobileRsvpBar";
import { MusicToggle } from "@/components/MusicToggle";

export default function Home() {
  return (
    <>
      <IntroEnvelope />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <EventBar />
        <Countdown />
        <OurStory />
        <CelebrationCards />
        <Venue />
        <Gallery />
        <RSVP />
      </main>
      <Footer />
      <MobileRsvpBar />
      <MusicToggle />
    </>
  );
}
