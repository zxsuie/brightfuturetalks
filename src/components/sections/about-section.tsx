"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";

export function AboutSection() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatedSection id="about" className="py-24 sm:py-32 bg-accent/40 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/photos/REJ.png"
              alt="Founder of Bright Future Talks"
              fill
              className="object-cover"
              data-ai-hint="founder portrait professional"
              style={{ transform: `translateY(${offsetY * 0.1}px)` }}
            />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built From Experience
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              After a decade leading enterprise sales teams, our founder saw a gap. While large corporations had powerful sales systems, the most innovative small and medium-sized businesses were left to fend for themselves. Bright Future Talks was born from a simple belief: every great business deserves a world-class sales engine.
            </p>
            <div className="mt-8">
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    "I saw too many brilliant entrepreneurs burn out trying to be their own sales team. I knew there had to be a better way—a system that was both high-tech and high-touch. That's what we build for our partners."
                </blockquote>
                <p className="mt-2 font-semibold text-foreground">- Alex Chen, Founder of Bright Future Talks</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
