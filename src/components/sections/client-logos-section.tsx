import { AnimatedSection } from "@/components/ui/animated-section";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { 
    src: "/jd foods logo.png", 
    alt: "JD Foods Logo", 
    hint: "food company logo",
    href: "https://jdfoods.shop/" 
  },
];

export function ClientLogosSection() {
  return (
    <AnimatedSection className="py-12 sm:py-16 bg-accent/40">
      <div className="container">
        <h2 className="text-center text-lg font-semibold text-muted-foreground">
          Powering the growth of industry-leading companies
        </h2>
        <div className="mt-8 flow-root">
          <div className="mx-auto flex justify-center">
            {logos.map((logo) => (
              <Link key={logo.alt} href={logo.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={60}
                  data-ai-hint={logo.hint}
                  className="grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
