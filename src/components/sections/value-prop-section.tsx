import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BrainCircuit, Heart, Mic, Video, Users } from "lucide-react";

const features = [
  {
    icon: <Mic strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Vocal Power",
    description: "Develop a commanding and versatile voice that engages and persuades.",
  },
  {
    icon: <Heart strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Authentic Storytelling",
    description: "Connect with your audience on an emotional level through powerful narratives.",
  },
  {
    icon: <Award strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Stage Presence",
    description: "Master body language and stage movement to project confidence and charisma.",
  },
  {
    icon: <Video strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "On-Camera Excellence",
    description: "Excel in virtual presentations, webinars, and media appearances.",
  },
  {
    icon: <BrainCircuit strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Mindset Mastery",
    description: "Overcome stage fright and performance anxiety with proven techniques.",
  },
  {
    icon: <Users strokeWidth={1.5} className="w-8 h-8 text-primary" />,
    title: "Audience Analysis",
    description: "Learn to read your audience and adapt your message for maximum impact.",
  },
];

export function ValuePropSection() {
  return (
    <AnimatedSection className="py-24 sm:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Transform Your Communication
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We provide a holistic approach to public speaking, focusing on every facet of what makes a presenter truly exceptional.
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
