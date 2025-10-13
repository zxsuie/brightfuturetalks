import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export function UpcomingEventSection() {
  return (
    <AnimatedSection className="py-24 sm:py-32 bg-accent/40">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl text-primary">
              Upcoming Event
            </h2>
            <h3 className="mt-4 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Extra Kita Sa Food Business
            </h3>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Para sa mga taong kumikita na pero gusto pang lumago — o sa mga naghahangad ng mas mataas na income, lifestyle, at opportunities.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  Register Now
                  <MoveRight className="ml-2"/>
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="https://picsum.photos/seed/eventposter/600/800"
              alt="Webinar Poster"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint="webinar poster business"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
