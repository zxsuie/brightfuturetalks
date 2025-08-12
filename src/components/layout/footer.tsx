import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.6 5.82s.51.5 0 0A4.27 4.27 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.59A2.59 2.59 0 0 1 7.27 15.4a2.59 2.59 0 0 1 2.59-2.59h.23V9.72h-.23A5.68 5.68 0 0 0 4 15.4a5.68 5.68 0 0 0 5.68 5.68A5.68 5.68 0 0 0 15.4 15.4V9.94a7.35 7.35 0 0 0 4.3 1.46V8.3s-1.88-.12-3.23-1.54Z" />
  </svg>
);


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
          <Image src="/BFT TEXT HORIZONTAL RED LOGO.png" alt="Bright Future Talks Logo" width={180} height={30} className="h-7 w-auto" />
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
              <Link href="https://www.facebook.com/brightfuturetalk?rdid=U9b9gjF2JO8ZJrxu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F176Razau7N" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.tiktok.com/@bright.future.tal8?_t=ZS-8ypF2uZ6exe&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TiktokIcon className="h-5 w-5" />
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
