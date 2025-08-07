import { Button } from "@/components/ui/button";
import { AnimatedHeroBackground } from "@/components/ui/animated-hero-background";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <AnimatedHeroBackground />
      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in-up">
           <Link href="#pricing" className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
                <Badge variant="outline" className="py-1 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm hover:bg-accent transition-colors border-primary bg-background shadow-lg text-center">
                    <span className="mr-2">🚀</span> Now accepting new partners.
                </Badge>
          </Link>

          <h1 className="font-headline text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Sales, Systematized.
          </h1>
          <p className="max-w-2xl text-muted-foreground md:text-xl">
            Stop worrying about sales. We provide a complete, outsourced sales team to help you grow your business and build lasting customer relationships.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:0.2s]">
          <Button size="lg" asChild>
            <Link href="#pricing">
              Get Your Sales System
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#process">See How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
