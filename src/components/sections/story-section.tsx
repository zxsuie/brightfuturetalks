"use client";

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const textContent = "Sales shouldn’t be your burden; it should be your system. We envision a world where sales is no longer a source of stress or pressure—but a powerful source of clarity, growth, and connection.".split(' ');

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      // Calculate progress from 0 (top of section is at top of viewport) to 1 (bottom of section is at bottom of viewport)
      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      
      const wordsToColor = Math.floor(progress * textContent.length);

      wordsRef.current.forEach((word, index) => {
        if (word) {
          if (index < wordsToColor) {
            word.style.color = 'hsl(var(--primary))';
          } else {
            word.style.color = 'hsl(var(--muted-foreground))';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div ref={stickyRef} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="container text-center">
          <p
            className={cn(
              "font-headline text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]",
              "transition-colors duration-300"
            )}
          >
            {textContent.map((word, index) => (
              <span
                key={index}
                ref={el => wordsRef.current[index] = el}
                className="transition-colors duration-200"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
