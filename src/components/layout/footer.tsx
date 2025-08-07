import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Github, Twitter, Linkedin, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-background border-t" id="contact">
      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Logo />
            <h3 className="font-headline text-2xl font-bold">
              Ready to build your sales engine?
            </h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest insights on sales, growth, and scaling your business.
            </p>
            <form className="w-full flex items-center gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <MoveRight />
              </Button>
            </form>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="grid gap-2">
              <h4 className="font-headline font-semibold">Company</h4>
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="#process" className="text-muted-foreground hover:text-primary transition-colors">Our Process</Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            </div>
            <div className="grid gap-2">
              <h4 className="font-headline font-semibold">Services</h4>
              <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Custom Plans</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>
            </div>
            <div className="grid gap-2">
              <h4 className="font-headline font-semibold">Resources</h4>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</Link>
              <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            </div>
             <div className="grid gap-2">
              <h4 className="font-headline font-semibold">Legal</h4>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bright Future Talks. All rights reserved.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
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
      </div>
    </footer>
  );
}
