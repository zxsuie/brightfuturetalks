import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Quote, MoveRight } from "lucide-react";

const teamMembers = [
  {
    name: "Lizzy Smith",
    title: "Senior Sales Executive",
    avatar: "/MsLizzy.png",
    photo: "/MsLizzy.png",
    story: "From acquiring knowledge to boosting everyone’s confidence up to closing sales. Bright Future Talks is a fun-learning sales environment that I am motivated every training to discuss about mindset strategies for keeping the team engaged.",
    aiHint: "sales executive woman"
  },
  {
    name: "David Chen",
    title: "Sales Development Lead",
    avatar: "/MsLizzy.png",
    photo: "/MsLizzy.png",
    story: "I came from a non-sales background and was intimidated. The training and mentorship are second to none. Now, I'm leading a team and helping new reps find the same success I did. It's incredibly rewarding.",
    aiHint: "team lead man"
  },
];

export function ClientShowcaseSection() {
  return (
    <AnimatedSection id="testimonials" className="py-24 sm:py-32 bg-accent/40">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            From Our Elite Sales Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our success is built on the success of our people. Hear their stories of growth and transformation.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teamMembers.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-lg border border-transparent hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <Image
                src={item.photo}
                alt={`Photo of ${item.name}`}
                width={600}
                height={400}
                className="w-full object-cover"
                data-ai-hint={item.aiHint}
              />
              <CardContent className="p-6 flex flex-col flex-grow">
                 <Quote className="w-8 h-8 text-primary mb-4" />
                <blockquote className="text-lg font-medium flex-grow">"{item.story}"</blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.aiHint}/>
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 text-center bg-background p-12 rounded-2xl shadow-lg border">
          <h3 className="font-headline text-3xl font-bold tracking-tight">
            Ready to Write Your Own Success Story?
          </h3>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for ambitious, talented individuals to join our world-class sales team. If you're ready for growth, we're ready for you.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="https://cal.com/brightfuturetalks/interview-with-ms.-rej" target="_blank" rel="noopener noreferrer">
                Join Our Team
                <MoveRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}
