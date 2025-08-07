import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    title: "Keynote Polish",
    price: "$1,500",
    description: "For perfecting a single, high-stakes presentation.",
    features: [
      "2-hour diagnostic session",
      "3 one-on-one coaching sessions",
      "Speech writing & editing support",
      "Full dress rehearsal",
    ],
    isPopular: false,
  },
  {
    title: "Executive Presence",
    price: "$4,500",
    description: "A 3-month program for comprehensive communication mastery.",
    features: [
      "Everything in Keynote Polish",
      "12 weekly coaching sessions",
      "Media & on-camera training",
      "Leadership communication strategy",
      "Unlimited email support",
    ],
    isPopular: true,
  },
  {
    title: "Corporate Training",
    price: "Custom",
    description: "Empower your entire team with elite communication skills.",
    features: [
      "Custom curriculum for your team",
      "Group workshops & breakout sessions",
      "Individual 'hot seat' coaching",
      "Post-training resource library",
    ],
    isPopular: false,
  },
];

export function OfferStackSection() {
  return (
    <AnimatedSection id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Invest in Your Voice
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the path that aligns with your goals. Simple, transparent pricing for transformative results.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {offers.map((offer) => (
            <Card
              key={offer.title}
              className={`flex flex-col shadow-[-5px_-5px_10px_#ffffff,5px_5px_10px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                offer.isPopular ? "border-primary border-2 -translate-y-4" : ""
              }`}
            >
              <CardHeader className="relative">
                {offer.isPopular && (
                  <Badge className="absolute top-0 right-6 translate-y-[-50%]">Most Popular</Badge>
                )}
                <CardTitle className="font-headline text-2xl">{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-5xl font-extrabold font-headline">{offer.price}</span>
                  {offer.price !== "Custom" && (
                    <span className="text-muted-foreground">/engagement</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={offer.isPopular ? "default" : "outline"}
                >
                  {offer.price === "Custom" ? "Contact Us" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
