"use client";

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !textRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollY = window.innerHeight;

      // Start effect when top of container is in the lower half of the viewport
      // and end when it's in the upper half.
      const start = scrollY * 0.8;
      const end = scrollY * 0.2;
      
      const progress = Math.max(0, Math.min(1, (start - top) / (start - end)));
      
      textRef.current.style.setProperty('--text-progress', `${progress * 100}%`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="container text-center">
          <p
            ref={textRef}
            className={cn(
              "font-headline text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]",
              "text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground",
              "bg-[length:100%_100%] bg-no-repeat"
            )}
            style={{
              backgroundSize: 'var(--text-progress, 0%) 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)))',
              color: 'hsl(var(--muted-foreground))'
            } as React.CSSProperties}
          >
            Sales shouldn’t be your burden; it should be your system. We envision a world where sales is no longer a source of stress or pressure—but a powerful source of clarity, growth, and connection.
          </p>
        </div>
      </div>
    </section>
  );
}
