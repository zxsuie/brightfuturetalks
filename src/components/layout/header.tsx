
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show island navbar after scrolling down a bit
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "flex justify-center"
      )}
    >
      {/* Island Navbar for Desktop */}
      <div
        className={cn(
          "fixed top-4 transition-all duration-300 ease-in-out",
          "transform-gpu",
          isScrolled ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100", // Always visible now
          "hidden md:block" // Hide on mobile where we use the sheet menu
        )}
      >
        <div className="flex items-center gap-8 bg-background/80 backdrop-blur-sm shadow-lg border rounded-full px-8 py-3">
          <Link href="/">
            <span className="text-lg font-headline font-bold">
              Bright Future Talks
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button size="sm" asChild>
            <Link href="#pricing">Get Started</Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Header and Menu */}
      <div className="container md:hidden flex h-16 items-center justify-between">
          <Link href="/">
             <span className="text-lg font-headline font-bold">
              Bright Future Talks
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%]">
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-between items-center mb-8">
                   <span className="text-lg font-headline font-bold">
                    Bright Future Talks
                  </span>
                </div>
                <nav className="flex flex-col items-start gap-6 mb-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <Link href="#contact">Contact Sales</Link>
                  </Button>
                  <Button asChild>
                    <Link href="#pricing">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
    </header>
  );
}
