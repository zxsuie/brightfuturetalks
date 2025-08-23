import { AnimatedSection } from "@/components/ui/animated-section";
import Image from "next/image";

const logos = [
  { src: "/jd foods logo.png", alt: "JD Foods Logo", hint: "food company logo" },
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
              <div key={logo.alt} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={60}
                  data-ai-hint={logo.hint}
                  className="grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
