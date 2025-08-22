"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const images = [
  { src: "https://placehold.co/600x400.png", alt: "Team meeting discussion", className: "col-span-2 row-span-2", hint: "team meeting" },
  { src: "https://placehold.co/300x400.png", alt: "Casual team hangout", className: "col-span-1 row-span-2", hint: "team hangout" },
  { src: "https://placehold.co/300x200.png", alt: "Developer smiling with laptop", className: "col-span-1 row-span-1", hint: "smiling developer" },
  { src: "https://placehold.co/300x200.png", alt: "Outdoor team activity", className: "col-span-1 row-span-1", hint: "team activity" },
  { src: "https://placehold.co/300x400.png", alt: "Professional headshot", className: "col-span-1 row-span-2", hint: "professional headshot" },
  { src: "https://placehold.co/600x400.png", alt: "Group photo of the team", className: "col-span-2 row-span-2", hint: "team group photo" },
  { src: "https://placehold.co/300x200.png", alt: "Team member working", className: "col-span-1 row-span-1", hint: "team working" },
];

export function TeamCultureSection() {
  return (
    <AnimatedSection className="py-24 sm:py-32 bg-accent/40 relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our Culture: People First
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We're more than just a team; we're a community. We believe that great work comes from happy people, and we've built a culture that's collaborative, supportive, and genuinely fun.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((image, index) => (
            <div key={index} className={image.className}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <Button asChild size="lg" className="rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
          <Link href="#contact">
            <Smile className="mr-2" />
            LET'S TALK
          </Link>
        </Button>
      </div>
    </AnimatedSection>
  );
}
