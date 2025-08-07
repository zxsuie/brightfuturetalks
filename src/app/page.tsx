import { HeroSection } from '@/components/sections/hero-section';
import { StorySection } from '@/components/sections/story-section';
import { AboutSection } from '@/components/sections/about-section';
import { ValuePropSection } from '@/components/sections/value-prop-section';
import { ClientShowcaseSection } from '@/components/sections/client-showcase-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { OfferStackSection } from '@/components/sections/offer-stack-section';
import {
  Briefcase,
  Rocket,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';

const clientLogos = [
  { name: 'QuantumLeap', icon: <Rocket /> },
  { name: 'Stellar Solutions', icon: <Award /> },
  { name: 'Nexus Corp', icon: <Briefcase /> },
  { name: 'Momentum', icon: <TrendingUp /> },
  { name: 'Dialogue Inc.', icon: <MessageSquare /> },
  { name: 'Synergy Group', icon: <Users /> },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="bg-background py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-muted-foreground">
            Helping MSMEs grow and scale their sales operations
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="col-span-1 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {client.icon}
                <span className="text-lg">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StorySection />
      <AboutSection />
      <ValuePropSection />
      <HowItWorksSection />
      <ClientShowcaseSection />
      <OfferStackSection />
    </div>
  );
}
