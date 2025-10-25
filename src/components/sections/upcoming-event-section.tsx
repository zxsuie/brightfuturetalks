
"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight, Calendar } from "lucide-react";

export function UpcomingEventSection() {
  return (
    <AnimatedSection className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border-4 border-accent/40">
             <Image
                src="https://picsum.photos/seed/webinarbg/1200/900"
                alt="People learning in a webinar setting"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="learning webinar success"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          </div>
          <div className="text-center lg:text-left">
            <p className="font-semibold text-primary tracking-wider uppercase flex items-center justify-center lg:justify-start gap-2">
              <Calendar className="w-5 h-5"/>
              Online Webinar
            </p>
            <h2 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Extra Kita sa Food Business
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Learn how to grow your food business and boost your income opportunities. Join us on October 25, 2025.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                asChild
                className="transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1"
              >
                <Link href="/sales/food-business" rel="noopener noreferrer">
                  Reserve Your Spot
                  <MoveRight className="ml-2 w-5 h-5"/>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
