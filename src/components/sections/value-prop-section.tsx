import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Search, Phone, Presentation, Handshake, Users } from "lucide-react";

const features = [
  {
    icon: <Search strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Lead Generation",
    description: "We find and qualify high-quality leads that fit your ideal customer profile.",
  },
  {
    icon: <Phone strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Prospect Outreach",
    description: "Engaging potential customers through calls, emails, and social media.",
  },
  {
    icon: <Presentation strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Sales Demos",
    description: "Presenting your product's value with compelling and persuasive demonstrations.",
  },
  {
    icon: <Handshake strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Closing Sales",
    description: "Our expert closers turn qualified leads into loyal, paying customers.",
  },
  {
    icon: <Users strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "CRM Management",
    description: "Keeping your sales pipeline organized and your data clean for smart insights.",
  },
  {
    icon: <Target strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Upselling & Handoff",
    description: "Maximizing customer value and ensuring a smooth transition to your team.",
  },
];

export function ValuePropSection() {
  return (
    <AnimatedSection className="py-24 sm:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your Complete Sales Engine
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We cover every step of the sales process, so you can focus on what you do best: running your business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-4 border-transparent shadow-[-5px_-5px_10px_#ffffff,5px_5px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_#ffffff,2px_2px_5px_rgba(0,0,0,0.05)] transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
