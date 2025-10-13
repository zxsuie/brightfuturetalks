
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { PlayCircle, CheckCircle2, ShieldCheck, Star } from "lucide-react"
import { useState, useEffect } from "react"
import Head from 'next/head';
import Script from 'next/script';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
      message: "Please enter a valid phone number."
  })
})

const whatYoullLearnItems = [
    {
        text: "The exact blueprint to earn an extra ₱30k/month.",
    },
    {
        text: "Paano mag-presyo ng tama para sa maximum profit.",
    },
    {
        text: "Sikreto sa pag-market ng food business mo online (kahit walang budget).",
    },
    {
        text: "Step-by-step guide on creating your food business from scratch.",
    },
    {
        text: "How to find your first paying customers.",
    },
    {
        text: "Paano i-manage ang kita at expenses para sa long-term growth."
    }
]

const whoIsThisForItems = [
    {
        title: "Existing Food Business Owners",
        description: "Gusto pang palaguin ang kanilang kita at i-streamline ang operations.",
        icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    },
    {
        title: "Aspiring Entrepreneurs",
        description: "Naghahanap ng proven business model para sa kanilang unang food venture.",
        icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    },
    {
        title: "Side-Hustlers & Employees",
        description: "Gustong magkaroon ng extra income source na flexible at scalable.",
        icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    },
    {
        title: "Career Shifters",
        description: "Handang pumasok sa food industry pero hindi alam kung saan magsisimula.",
        icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    },
]

const faqItems = [
    {
        question: "What if I have zero experience in business?",
        answer: "No problem! This webinar is designed for beginners. We'll guide you step-by-step from zero to launching your food business."
    },
    {
        question: "Is this webinar only for Filipino participants?",
        answer: "The webinar is open to everyone, but the context and language will be a mix of English and Tagalog, tailored for the Filipino market."
    },
    {
        question: "Will there be a recording?",
        answer: "Yes, all registered participants will receive a link to the webinar recording so you can re-watch it anytime."
    },
];


const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-4xl font-bold tracking-tighter text-primary">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
);

export default function SalesPage() {
    const { toast } = useToast()
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const webinarDate = new Date('2025-10-25T19:00:00');

        const calculateTimeLeft = () => {
            const difference = +webinarDate - +new Date();
            let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering. We've sent a confirmation to your email.",
    })
    form.reset();
    setIsFormOpen(false);
  }
  
  const RegistrationForm = () => (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Juan dela Cruz" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                    <Input placeholder="juan@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                    <Input placeholder="09123456789" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" size="lg" className="w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
                Secure My Spot
            </Button>
            <p className="text-center text-sm text-muted-foreground pt-4">Mag-register ka na — libre ito, pero puwedeng maging start ng next big break mo.</p>
        </form>
    </Form>
  );

  return (
    <>
      <Head>
        <title>Extra Kita Sa Food Business - Bright Future Talks</title>
        <meta name="description" content="Learn how to grow your food business and boost your income opportunities." />
         <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/UgxRfS/klaviyo.js?company_id=UgxRfS"
          strategy="beforeInteractive"
        />
        <Script
          id="klaviyo-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
            `,
          }}
        />

      <div className="bg-background text-foreground">
        <main className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* 1. Hero Section */}
            <AnimatedSection>
                <div className="text-center">
                <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                    <span className="block text-primary">Extra Kita Sa</span>
                    <span className="block">Food Business</span>
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
                    Para sa mga taong kumikita na pero gusto pang lumago — o sa mga naghahangad ng mas mataas na income, lifestyle, at opportunities.
                </p>
                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <PlayCircle className="w-4 h-4 text-primary"/>
                    Watch the video to learn more
                </p>
                </div>
            </AnimatedSection>
            
            <AnimatedSection className="mt-8">
                <div className="relative pt-[56.25%] w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-primary/20">
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ"
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </AnimatedSection>

            <AnimatedSection className="mt-8 text-center max-w-3xl mx-auto">
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
                            SECURE YOUR SPOT
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle className="font-headline text-3xl font-bold text-center mb-6">Register for the Free Webinar</DialogTitle>
                        </DialogHeader>
                        <RegistrationForm />
                    </DialogContent>
                </Dialog>
                <p className="mt-8 text-lg text-muted-foreground">
                    Kung minsan, kahit gaano ka pa kasipag, parang kulang pa rin ang kinikita. At kahit mayaman na tayo o may maayos nang negosyo, nandiyan pa rin yung tanong: ‘Paano pa kaya ako makakadagdag ng kita?’
                </p>
            </AnimatedSection>

            {/* 2. Sino ang pwede? section */}
            <AnimatedSection className="mt-24 text-center">
                <h2 className="text-sm font-semibold tracking-wider uppercase text-primary">Sino ang Pwede?</h2>
                <p className="mt-2 font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                This Webinar is For You
                </p>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {whoIsThisForItems.map((item) => (
                        <div key={item.title} className="text-center p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                {item.icon}
                            </div>
                            <h3 className="mt-6 font-headline text-lg font-bold">{item.title}</h3>
                            <p className="mt-2 text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            {/* 3. Countdown Timer section */}
            {isClient && (
                <AnimatedSection className="mt-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="font-headline text-2xl font-bold text-center mb-2 text-primary">Limited Spots Available!</h2>
                        <p className="text-muted-foreground mb-6">Registration closes soon. Reserve your seat now!</p>
                        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto mb-8">
                            <CountdownUnit value={timeLeft.days} label="Days" />
                            <CountdownUnit value={timeLeft.hours} label="Hours" />
                            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                        </div>
                    </div>
                </AnimatedSection>
            )}
          
            {/* 4. What you'll learn in this free webinar section */}
            <AnimatedSection className="mt-16">
              <div className="max-w-2xl mx-auto">
                  <h2 className="font-headline text-3xl font-bold text-center mb-8">What You'll Learn In This Free Webinar:</h2>
                  <ul className="space-y-4">
                      {whatYoullLearnItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-4">
                              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                              <span className="text-lg text-muted-foreground">{item.text}</span>
                          </li>
                      ))}
                  </ul>
                  <p className="mt-8 text-center text-lg text-muted-foreground">
                      Sa Free Food Webinar ng JD Foods, ipapakita namin sa’yo kung paano ang simpleng pagkain ay puwedeng maging susi sa mas malaking kita at mas maluwag na buhay. Hindi mo kailangan maging chef o magbukas agad ng malaking restaurant. Ang kailangan mo lang ay desire for more income and freedom.
                  </p>
              </div>
            </AnimatedSection>

            {/* 5. Guaranteed Section */}
            <AnimatedSection className="mt-24">
                <Card className="max-w-3xl mx-auto bg-accent/40 border-primary/20 shadow-lg">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                         <div className="flex-shrink-0">
                             <ShieldCheck className="w-24 h-24 text-primary" />
                         </div>
                         <div>
                            <h2 className="font-headline text-3xl font-bold">Our "Guaranteed Value" Promise</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We are so confident in the value this webinar provides that we guarantee you will walk away with at least three actionable strategies you can implement immediately. If not, we'll send you a free copy of our exclusive "Filipino Food Business Starter Kit" e-book.
                            </p>
                         </div>
                    </CardContent>
                </Card>
            </AnimatedSection>

            {/* 7. Small FAQ Section */}
            <AnimatedSection className="mt-24">
                <div className="max-w-2xl mx-auto">
                     <h2 className="font-headline text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                     <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </AnimatedSection>


            {/* 8. Registration Button */}
            <AnimatedSection id="register" className="mt-24 text-center">
                 <div className="max-w-2xl mx-auto">
                    <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Ready to Start Earning?</h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Your journey to an extra ₱30,000/month (or more!) starts here. Click the button below to reserve your free spot. It only takes 30 seconds.
                    </p>
                    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                        <DialogTrigger asChild>
                             <Button size="lg" className="mt-8 w-full sm:w-auto transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
                                SECURE YOUR SPOT NOW
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="font-headline text-3xl font-bold text-center mb-6">Register for the Free Webinar</DialogTitle>
                            </DialogHeader>
                            <RegistrationForm />
                        </DialogContent>
                    </Dialog>
                 </div>
            </AnimatedSection>


          <footer className="mt-24 text-center text-muted-foreground text-sm">
              <Image src="/BFT TEXT HORIZONTAL RED LOGO.png" alt="Bright Future Talks Logo" width={150} height={25} className="h-6 w-auto mx-auto mb-4" />
              &copy; {new Date().getFullYear()} Bright Future Talks. All Rights Reserved.
          </footer>
        </main>
        <Toaster />
      </div>
    </>
  )
}

    