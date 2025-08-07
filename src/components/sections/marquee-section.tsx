import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";

const MarqueeItem = ({ text }: { text: string }) => (
  <span className="mx-10 font-headline text-2xl md:text-4xl font-bold tracking-tight text-foreground/80 [text-shadow:0_0_8px_hsl(var(--primary)/0.3)]">
    {text}
  </span>
);

const DiamondSeparator = () => (
    <svg
      viewBox="0 0 10 10"
      className="w-4 h-4 md:w-6 md:h-6 fill-primary flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M5 0L10 5L5 10L0 5L5 0Z" />
    </svg>
);

interface MarqueeProps {
  phrases: string[];
  direction?: 'normal' | 'reverse';
  className?: string;
}

export function MarqueeSection({ phrases, direction = 'normal', className }: MarqueeProps) {
  const marqueeContent = [...phrases, ...phrases];
  const animationClass = direction === 'normal' ? 'animate-marquee-normal' : 'animate-marquee-reverse';

  return (
    <AnimatedSection className={cn("bg-background py-6 md:py-12 border-y", className)}>
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10"></div>
        <div className={cn("group flex whitespace-nowrap hover:[animation-play-state:paused]", animationClass)}>
            {marqueeContent.map((phrase, index) => (
                <div key={index} className="flex items-center">
                    <MarqueeItem text={phrase} />
                    {index < marqueeContent.length -1 && <DiamondSeparator />}
                </div>
            ))}
             <div className="flex items-center" aria-hidden="true">
                {marqueeContent.map((phrase, index) => (
                    <div key={index} className="flex items-center">
                        <MarqueeItem text={phrase} />
                        {index < marqueeContent.length -1 && <DiamondSeparator />}
                    </div>
                ))}
             </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
