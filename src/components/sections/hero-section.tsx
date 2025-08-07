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
           <Link href="#testimonials">
              <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF0000_0%,#393BB2_50%,#FF0000_100%)]" />
                <Badge variant="outline" className="py-2 px-4 rounded-full text-sm hover:bg-accent transition-colors border-primary/0 bg-background w-full inline-flex items-center justify-center backdrop-blur-3xl">
                    <span className="mr-2">🎉</span> Focus on your business, we'll handle the sales.
                </Badge>
              </div>
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
