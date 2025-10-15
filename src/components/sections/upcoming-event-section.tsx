
"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UpcomingEventSection() {
  return (
    <AnimatedSection className="relative py-32 sm:py-48 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/webinarbg/1920/1080"
          alt="People learning in a webinar setting"
          fill
          className="object-cover"
          data-ai-hint="learning webinar success"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
      </div>
      <div className="container relative text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold text-primary tracking-wider">
            October 25, 2025 • Online Webinar
          </p>
          <h2 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Start Your Food Business With Confidence
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            Learn how to grow your food business and boost your income opportunities.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              asChild
              className="transition-all duration-300 ease-in-out bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1"
            >
              <Link href="/sales/food-business" rel="noopener noreferrer">
                Reserve Your Spot
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
