import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";

const marqueeContent = "Plug In. Close Sales. Scale Smarter.";

export function MarqueeSection() {
  const marqueeItems = Array(6).fill(marqueeContent);

  return (
    <AnimatedSection className="bg-background py-6 md:py-12 border-y">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10"></div>
        <div className="group flex animate-marquee-normal hover:[animation-play-state:paused] whitespace-nowrap">
          {marqueeItems.map((item, index) => (
            <span
              key={index}
              className="mx-4 font-headline text-2xl md:text-4xl font-bold tracking-tight text-foreground/80 [text-shadow:0_0_8px_hsl(var(--primary)/0.3)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
