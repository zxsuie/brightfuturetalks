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
import { Check, MoveRight } from "lucide-react";
import Link from "next/link";

const includedFeatures = [
  "Dedicated Sales Team",
  "Lead Generation & Qualification",
  "Multi-Channel Outreach",
  "Sales Presentations & Demos",
  "CRM Management",
  "Weekly Performance Reports",
];

export function OfferStackSection() {
  return (
    <AnimatedSection id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Invest in a complete sales system that grows with your business. No hidden fees, just predictable results.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
            <Card className="w-full max-w-2xl shadow-[-5px_-5px_10px_#ffffff,5px_5px_10px_rgba(0,0,0,0.05)] border-primary border-2">
              <CardHeader className="text-center">
                <CardDescription>Starts At</CardDescription>
                <CardTitle className="font-headline text-6xl tracking-tight">
                  ₱25,000<span className="text-lg font-medium text-muted-foreground tracking-normal">/month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8">
                <p className="text-center text-muted-foreground mb-6">Our packages are tailored to your specific needs. This foundational plan includes:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="#contact">
                    Get Your Custom Quote
                    <MoveRight className="ml-2"/>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
        </div>
        <p className="text-center mt-8 text-sm text-muted-foreground">
            Have different needs? We offer custom solutions. <Link href="#contact" className="underline hover:text-primary">Contact us</Link> for a personalized plan.
        </p>
      </div>
    </AnimatedSection>
  );
}
