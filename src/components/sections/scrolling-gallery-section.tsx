
"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/ui/animated-section';

gsap.registerPlugin(ScrollTrigger);

const imagesRow1 = [
  { src: 'https://placehold.co/400x600.png', hint: 'team meeting' },
  { src: 'https://placehold.co/600x400.png', hint: 'office collaboration' },
  { src: 'https://placehold.co/400x600.png', hint: 'casual discussion' },
  { src: 'https://placehold.co/600x400.png', hint: 'whiteboard session' },
  { src: 'https://placehold.co/400x600.png', hint: 'group photo' },
  { src: 'https://placehold.co/600x400.png', hint: 'team lunch' },
];

const imagesRow2 = [
  { src: 'https://placehold.co/600x400.png', hint: 'outdoor activity' },
  { src: 'https://placehold.co/400x600.png', hint: ' smiling person laptop' },
  { src: 'https://placehold.co/600x400.png', hint: 'team building' },
  { src: 'https://placehold.co/400x600.png', hint: 'focused work' },
  { src: 'https://placehold.co/600x400.png', hint: 'coffee break' },
  { src: 'https://placehold.co/400x600.png', hint: 'celebration event' },
];


const ImageCard = ({ src, hint, className }: { src: string; hint: string; className?: string; }) => (
  <div className={cn(
      "relative w-[400px] h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-[-5px_-5px_10px_#ffffff,5px_5px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1",
      className
    )}>
    <Image
      src={src}
      alt={hint}
      data-ai-hint={hint}
      fill
      className="object-cover"
    />
  </div>
);

const MarqueeRow = ({ images, direction = 'left' }: { images: {src: string, hint: string}[]; direction: 'left' | 'right' }) => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee || window.innerWidth < 768) return;

        let amount = marquee.offsetWidth / 2;
        if (direction === 'right') {
            gsap.set(marquee, {x: -amount});
            amount = 0;
        }

        const tl = gsap.to(marquee, {
            x: -amount,
            ease: 'none',
            scrollTrigger: {
                trigger: marquee,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            }
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        }

    }, [direction]);

    return (
        <div ref={marqueeRef} className="flex gap-6">
            <div className="flex gap-6 flex-shrink-0">
                {images.map((img, i) => <ImageCard key={`row1-1-${i}`} src={img.src} hint={img.hint} />)}
            </div>
             <div className="flex gap-6 flex-shrink-0" aria-hidden="true">
                {images.map((img, i) => <ImageCard key={`row1-2-${i}`} src={img.src} hint={img.hint} />)}
            </div>
        </div>
    )
}

export function ScrollingGallerySection() {
  
  return (
    <AnimatedSection className="py-24 sm:py-32 bg-background overflow-hidden">
        <div className="w-full space-y-6">
            <div className="md:w-full md:overflow-hidden">
               <MarqueeRow images={imagesRow1} direction="left"/>
            </div>
            <div className="md:w-full md:overflow-hidden">
                <MarqueeRow images={imagesRow2} direction="right" />
            </div>
        </div>
    </AnimatedSection>
  );
}
