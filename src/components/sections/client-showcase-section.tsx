
"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Quote, MoveRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const teamMembers = [
  {
    name: "Ms. Leizl Sigua",
    title: "Account Manager",
    avatar: "/MsLizzy.png",
    photo: "/MsLizzy.png",
    story: "From acquiring knowledge to boosting everyone’s confidence up to closing sales. Bright Future Talks is a fun-learning sales environment that I am motivated every training to discuss about mindset strategies for keeping the team engaged.",
    aiHint: "sales executive woman"
  },
  {
    name: "Aljohn Ferber Pammit",
    title: "Sales Intern",
    avatar: "/aj-pic.png",
    photo: "/aj-pic.png",
    story: "The sales training greatly boosted my confidence in handling clients. I'm grateful for the skills I gained, especially in building communicstion and closing deals.",
    aiHint: "sales intern aljohn pammit"
  },
  {
    name: "Ken Padilla",
    title: "Sales Intern",
    avatar: "/ken-pic.png",
    photo: "/ken-pic.png",
    story: "The training was a game-changer. I learned how to connect with clients on a deeper level and my closing rate has gone up by 40%. The team environment is incredibly supportive.",
    aiHint: "sales intern ken padilla"
  }
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

        <div className="mt-16">
           <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: true,
                stopOnHover: true,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {teamMembers.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                   <div className="p-1 h-full">
                    <Card className="overflow-hidden shadow-lg border border-transparent hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                      <Image
                        src={item.photo}
                        alt={`Photo of ${item.name}`}
                        width={1200}
                        height={800}
                        className="w-full h-80 object-cover"
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-5px] sm:left-[-50px]"/>
            <CarouselNext className="absolute right-[-5px] sm:right-[-50px]"/>
          </Carousel>
        </div>

        <div className="mt-24 text-center bg-background p-12 rounded-2xl shadow-lg border">
          <h3 className="font-headline text-3xl font-bold tracking-tight">
            Ready to Write Your Own Success Story?
          </h3>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for ambitious, talented individuals to join our world-class sales team. If you're ready for growth, we're ready for you.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
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
