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
import { Check, CalendarDays } from "lucide-react";
import Link from "next/link";

const includedFeatures = [
  "Dedicated Elite Sales Team",
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
            Ready to Build Your Growth Engine?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Schedule a free, no-obligation strategy session with our experts. We'll dive into your business challenges and map out a clear path to scalable revenue.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
            <Card className="w-full max-w-2xl shadow-[-5px_-5px_10px_#ffffff,5px_5px_10px_rgba(0,0,0,0.05)] border-primary border-2">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl tracking-tight">
                  Your Custom Sales Solution
                </CardTitle>
                 <CardDescription>Every partnership is tailored for success and includes:</CardDescription>
              </CardHeader>
              <CardContent className="px-8">
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
                <Button className="w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1" size="lg" asChild>
                  <Link href="https://cal.com/brightfuturetalks/bright-future-session" target="_blank" rel="noopener noreferrer">
                    <CalendarDays className="mr-2"/>
                    Book Your Free Strategy Call
                  </Link>
                </Button>
              </CardFooter>
            </Card>
        </div>
        <p className="text-center mt-8 text-sm text-muted-foreground">
            Let's build a sales engine that works for you, not the other way around.
        </p>
      </div>
    </AnimatedSection>
  );
}
