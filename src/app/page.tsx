
import { HeroSection } from '@/components/sections/hero-section';
import { StorySection } from '@/components/sections/story-section';
import { AboutSection } from '@/components/sections/about-section';
import { ValuePropSection } from '@/components/sections/value-prop-section';
import { ScrollingGallerySection } from '@/components/sections/scrolling-gallery-section';
import { ClientShowcaseSection } from '@/components/sections/client-showcase-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { OfferStackSection } from '@/components/sections/offer-stack-section';
import { FaqSection } from '@/components/sections/faq-section';
import { MarqueeSection } from '@/components/sections/marquee-section';
import { ClientLogosSection } from '@/components/sections/client-logos-section';
import { UpcomingEventSection } from '@/components/sections/upcoming-event-section';
import { ContactSection } from '@/components/sections/contact-section';

const marqueePhrases1 = [
  "Plug In. Close Sales. Scale Smarter.",
  "Revenue Engine, Ready To Go.",
  "You Handle Ops. We Handle Sales.",
  "From Cold to Closed – We Got You.",
  "MSMEs Deserve Better Sales Systems.",
];

const marqueePhrases2 = [
  "Build Smarter, Not Harder.",
  "Scale with Certainty.",
  "Your Time Is Worth More.",
  "Let Go of Manual Sales.",
  "Design a Scalable Business.",
  "Automate Your Growth.",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MarqueeSection phrases={marqueePhrases1} direction="normal" />
      <AboutSection />
      <StorySection />
      <ValuePropSection />
      <UpcomingEventSection />
      <ClientLogosSection />
      <ScrollingGallerySection />
      <HowItWorksSection />
      <MarqueeSection phrases={marqueePhrases2} direction="reverse" />
      <ClientShowcaseSection />
      <OfferStackSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
