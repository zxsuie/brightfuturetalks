import { AnimatedSection } from "@/components/ui/animated-section";
import { Scan, MessageCircle, Presentation } from "lucide-react";

const steps = [
  {
    icon: <Scan className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    name: "Discovery & Analysis",
    description: "We start with a comprehensive assessment of your current speaking style, strengths, and areas for growth. This includes an analysis of past recordings and a deep-dive interview.",
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    name: "Personalized Coaching",
    description: "Based on the initial analysis, we develop a custom coaching plan with one-on-one sessions, targeted exercises, and real-time feedback to refine your skills.",
  },
  {
    icon: <Presentation className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    name: "Performance & Polish",
    description: "We pressure-test your new skills with mock presentations and Q&A sessions, ensuring you're fully prepared and confident for any high-stakes speaking engagement.",
  },
];

export function HowItWorksSection() {
  return (
    <AnimatedSection id="process" className="py-24 sm:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our Proven Process
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A clear path from uncertainty to unshakable confidence. Our three-step process is designed for maximum impact and lasting results.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-12 h-0.5 -translate-y-1/2 bg-gray-200 lg:top-1/2 lg:h-auto lg:w-0.5 lg:translate-y-0"
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent via-primary to-transparent lg:bg-gradient-to-r" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.name}
                className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 flex-1 text-center lg:text-left"
              >
                <div className="flex-shrink-0 bg-background border-2 border-primary/20 p-4 rounded-full shadow-lg z-10">
                  {step.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-headline text-xl font-bold">
                    <span className="text-primary">Step {index + 1}:</span> {step.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
