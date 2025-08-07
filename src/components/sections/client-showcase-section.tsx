import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    title: "Founder, Innovate Co.",
    avatar: "https://placehold.co/100x100.png",
    videoThumbnail: "https://placehold.co/600x400.png",
    testimonial: "Partnering with Bright Future Talks was the best decision for our growth. Our sales have tripled, and I can finally focus on product.",
    stats: { before: "10 leads/month", after: "75+ leads/month" },
    aiHint: "startup founder"
  },
  {
    name: "Maria Garcia",
    title: "Owner, Creative Solutions",
    avatar: "https://placehold.co/100x100.png",
    videoThumbnail: "https://placehold.co/600x400.png",
    testimonial: "I used to hate selling. Now, it's a system that runs without me. Revenue is up 200% and I'm no longer stressed about making payroll.",
    stats: { before: "5% close rate", after: "25% close rate" },
    aiHint: "creative director"
  },
];

export function ClientShowcaseSection() {
  return (
    <AnimatedSection id="testimonials" className="py-24 sm:py-32 bg-accent/40">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Success Stories
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Don't just take our word for it. See the transformations for yourself.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <Image
                  src={item.videoThumbnail}
                  alt={`Video testimonial from ${item.name}`}
                  width={600}
                  height={400}
                  className="w-full object-cover"
                  data-ai-hint={item.aiHint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-white/70 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex gap-2 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />)}
                </div>
                <blockquote className="text-lg font-medium">"{item.testimonial}"</blockquote>
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
                <div className="mt-6 flex justify-around bg-muted p-4 rounded-lg">
                  <div className="text-center">
                      <p className="text-sm text-muted-foreground">Before</p>
                      <p className="text-xl font-bold font-headline text-destructive/80">{item.stats.before}</p>
                  </div>
                   <div className="text-center">
                      <p className="text-sm text-muted-foreground">After</p>
                      <p className="text-xl font-bold font-headline text-primary">{item.stats.after}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
