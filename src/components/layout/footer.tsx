import Link from "next/link";
import Image from "next/image";
import { Facebook, Github, Linkedin, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-accent/40 border-t" id="contact">
      <div className="container py-12 md:py-24 text-center">
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

      <div className="container">
         <Separator />
      </div>

      <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Image src="/BFT TEXT HORIZONTAL RED LOGO.png" alt="Bright Future Talks Logo" width={180} height={30} className="h-8 w-auto" />
        </div>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#process" className="text-sm text-muted-foreground hover:text-primary transition-colors">Process</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
        </div>
      </div>
       <div className="pb-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bright Future Talks. All rights reserved.
        </div>
    </footer>
  );
}
