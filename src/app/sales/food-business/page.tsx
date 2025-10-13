"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { PlayCircle } from "lucide-react"

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

export default function SalesPage() {
    const { toast } = useToast()

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
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Extra Kita Sa Food Business
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
            <p className="text-lg text-muted-foreground">
                This is your chance to earn more than 30k a month using the method that has already helped me make 500k online.
            </p>
            <Button size="lg" className="mt-6 w-full sm:w-auto transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
                SECURE YOUR SPOT
            </Button>
        </AnimatedSection>

        <AnimatedSection id="register" className="mt-24">
            <Card className="max-w-2xl mx-auto shadow-lg border-primary/50">
                <CardContent className="p-8">
                     <h2 className="font-headline text-3xl font-bold text-center mb-6">Register for the Free Webinar</h2>
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
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AnimatedSection>

        <AnimatedSection className="mt-24 text-center max-w-3xl mx-auto">
            <h3 className="font-headline text-2xl font-bold text-foreground">WHO IS THIS FOR?</h3>
            <div className="mt-6 text-lg text-muted-foreground space-y-4">
                <p>
                    Kung minsan, kahit gaano ka pa kasipag, parang kulang pa rin ang kinikita. At kahit mayaman na tayo o may maayos nang negosyo, nandiyan pa rin yung tanong: ‘Paano pa kaya ako makakadagdag ng kita?’
                </p>
                <p>
                    Sa Free Food Webinar ng JD Foods, ipapakita namin sa’yo kung paano ang simpleng pagkain ay puwedeng maging susi sa mas malaking kita at mas maluwag na buhay. Hindi mo kailangan maging chef o magbukas agad ng malaking restaurant. Ang kailangan mo lang ay desire for more income and freedom.
                </p>
                <p className="font-semibold text-primary">
                    Mag-register ka na — libre ito, pero puwedeng maging start ng next big break mo.
                </p>
            </div>
        </AnimatedSection>

         <footer className="mt-24 text-center text-muted-foreground text-sm">
            <Image src="/BFT TEXT HORIZONTAL RED LOGO.png" alt="Bright Future Talks Logo" width={150} height={25} className="h-6 w-auto mx-auto mb-4" />
            &copy; {new Date().getFullYear()} Bright Future Talks. All Rights Reserved.
        </footer>
      </div>
    </div>
  )
}
