import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

export function ContactSection() {
  return (
    <AnimatedSection id="contact" className="py-24 sm:py-32 bg-accent/40">
      <div className="container text-center">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
          Let's Build Your Future.
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Tired of unpredictable sales? Let's build a revenue engine that works for you, not the other way around.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
             <Link href="https://cal.com/brightfuturetalks/bright-future-session" target="_blank" rel="noopener noreferrer">
                Book a Free Strategy Call
                <MoveRight className="ml-2"/>
              </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
