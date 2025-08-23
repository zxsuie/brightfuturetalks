import { AnimatedSection } from "@/components/ui/animated-section";
import Image from "next/image";

const logos = [
  { src: "https://placehold.co/150x60.png", alt: "Client Logo 1", hint: "tech company logo" },
  { src: "https://placehold.co/150x60.png", alt: "Client Logo 2", hint: "startup brand" },
  { src: "https://placehold.co/150x60.png", alt: "Client Logo 3", hint: "ecommerce business" },
  { src: "https://placehold.co/150x60.png", alt: "Client Logo 4", hint: "saas product" },
  { src: "https://placehold.co/150x60.png", alt: "Client Logo 5", hint: "consulting firm" },
  { src: "https://placehold.co/150x60.png", alt: "Client Logo 6", hint: "financial services" },
];

export function ClientLogosSection() {
  return (
    <AnimatedSection className="py-12 sm:py-16 bg-accent/40">
      <div className="container">
        <h2 className="text-center text-lg font-semibold text-muted-foreground">
          Powering the growth of industry-leading companies
        </h2>
        <div className="mt-8 flow-root">
          <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-10">
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
