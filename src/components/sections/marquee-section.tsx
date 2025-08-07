import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";

const marqueePhrases = [
  "Plug In. Close Sales. Scale Smarter.",
  "Revenue Engine, Ready To Go.",
  "You Handle Ops. We Handle Sales.",
  "From Cold to Closed – We Got You.",
  "MSMEs Deserve Better Sales Systems.",
];

// We'll join the phrases with a separator and repeat the whole block
// to ensure a seamless loop. Two repetitions are usually enough.
const marqueeContent = Array(2).fill(marqueePhrases.join(" • ")).join(" • ");


export function MarqueeSection() {

  return (
    <AnimatedSection className="bg-background py-6 md:py-12 border-y">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10"></div>
        <div className="group flex animate-marquee-normal hover:[animation-play-state:paused] whitespace-nowrap">
            <span
              className="mx-4 font-headline text-2xl md:text-4xl font-bold tracking-tight text-foreground/80 [text-shadow:0_0_8px_hsl(var(--primary)/0.3)]"
            >
              {marqueeContent}
            </span>
             <span
              className="mx-4 font-headline text-2xl md:text-4xl font-bold tracking-tight text-foreground/80 [text-shadow:0_0_8px_hsl(var(--primary)/0.3)]"
              aria-hidden="true"
            >
              {marqueeContent}
            </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
