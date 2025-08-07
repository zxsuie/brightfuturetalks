"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scan, MessageCircle, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <Scan className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    name: "Strategy & Setup",
    description: "We dive deep into your business, market, and goals to build a custom sales playbook and set up your CRM for success.",
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    name: "Execution & Outreach",
    description: "Our team executes the plan, handling lead generation, outreach, and nurturing conversations to build a pipeline of qualified opportunities.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    name: "Closing & Scaling",
    description: "We close deals on your behalf, providing detailed reporting and insights so we can continuously optimize and scale your revenue.",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { 
            opacity: 0, 
            filter: "blur(0.25rem)", 
            y: 20,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%", // Animate when the top of the step is 85% from the top of the viewport
              end: "bottom 15%",
              toggleActions: "play none none reverse", // Play on enter, reverse on leave
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our Proven Process
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A clear path from zero pipeline to consistent revenue. Our three-step process is designed for maximum impact and predictable growth.
          </p>
        </div>

        <div className="mt-24 space-y-24">
          {steps.map((step, index) => (
            <div
              key={step.name}
              ref={(el) => (stepsRef.current[index] = el)}
              className={cn(
                "step-card flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl transition-all duration-300",
                "opacity-0" // Initially hidden
              )}
            >
              <div className="flex-shrink-0 bg-primary/10 p-5 rounded-full ring-8 ring-primary/5">
                {step.icon}
              </div>
              <div className="text-center md:text-left">
                 <h3 className="font-headline text-2xl font-bold">
                    <span className="text-primary">Step {index + 1}:</span> {step.name}
                  </h3>
                <p className="mt-2 text-lg text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
