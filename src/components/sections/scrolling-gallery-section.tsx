
"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/ui/animated-section';

gsap.registerPlugin(ScrollTrigger);

const imagesRow1 = [
  { src: '/IMG_1184.jpg', hint: 'team meeting' },
  { src: '/IMG_1186.png', hint: 'office collaboration' },
  { src: '/IMG_1342.png', hint: 'casual discussion' },
  { src: '/IMG_1185.png', hint: 'whiteboard session' },
  { src: '/IMG_1187.png', hint: 'group photo' },
  { src: '/IMG_1343.png', hint: 'team lunch' },
];

const imagesRow2 = [
  { src: '/IMG_1343.png', hint: 'team lunch' },
  { src: '/IMG_1187.png', hint: 'group photo' },
  { src: '/IMG_1185.png', hint: 'whiteboard session' },
  { src: '/IMG_1342.png', hint: 'casual discussion' },
  { src: '/IMG_1186.png', hint: 'office collaboration' },
  { src: '/IMG_1184.jpg', hint: 'team meeting' },
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
        if (!marquee) return;

        // Use a timeout to wait for images to load and get the correct width
        const timer = setTimeout(() => {
            if (!marquee) return;
            const amount = marquee.scrollWidth / 2;
            const fromX = direction === 'left' ? 0 : -amount;
            const toX = direction === 'left' ? -amount : 0;
            
            const tl = gsap.timeline({
                repeat: -1,
                defaults: { ease: 'none' }
            });

            tl.set(marquee, { x: fromX })
              .to(marquee, { x: toX, duration: 40 });

            ScrollTrigger.create({
                trigger: marquee,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => tl.play(),
                onLeave: () => tl.pause(),
                onEnterBack: () => tl.play(),
                onLeaveBack: () => tl.pause()
            });

            // Pause animation on hover
            marquee.addEventListener('mouseenter', () => tl.pause());
            marquee.addEventListener('mouseleave', () => tl.play());
            
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
            gsap.killTweensOf(marquee);
        }

    }, [direction]);

    return (
        <div className="overflow-hidden">
            <div ref={marqueeRef} className="flex gap-6">
                <div className="flex gap-6 flex-shrink-0">
                    {images.map((img, i) => <ImageCard key={`row1-1-${i}`} src={img.src} hint={img.hint} />)}
                </div>
                 <div className="flex gap-6 flex-shrink-0" aria-hidden="true">
                    {images.map((img, i) => <ImageCard key={`row1-2-${i}`} src={img.src} hint={img.hint} />)}
                </div>
            </div>
        </div>
    )
}

export function ScrollingGallerySection() {
  
  return (
    <AnimatedSection className="py-24 sm:py-32 bg-background overflow-hidden">
        <div className="w-full space-y-6">
            <MarqueeRow images={imagesRow1} direction="left"/>
            <MarqueeRow images={imagesRow2} direction="right" />
        </div>
    </AnimatedSection>
  );
}
