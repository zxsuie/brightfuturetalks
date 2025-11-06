
'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea';
import { generateSalesAudit } from '@/app/actions/generate-sales-audit';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Bot, Loader2, FileText, MoveRight, MoveLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const salesAuditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  businessName: z.string().min(1, 'Business name is required'),
  role: z.string().min(1, 'Your role is required'),
  industry: z.string().min(1, 'Industry or niche is required'),
  revenueBracket: z.string({ required_error: "Please select a revenue bracket." }),
  salesChannel: z.string({ required_error: "Please select a sales channel." }),
  otherSalesChannel: z.string().optional(),
  
  clarityQ1: z.string({ required_error: "Score is required." }),
  clarityQ2: z.string({ required_error: "Score is required." }),
  clarityQ3: z.string({ required_error: "Score is required." }),
  clarityQ4: z.string({ required_error: "Score is required." }),
  clarityQ5: z.string({ required_error: "Score is required." }),

  leadQ1: z.string({ required_error: "Score is required." }),
  leadQ2: z.string({ required_error: "Score is required." }),
  leadQ3: z.string({ required_error: "Score is required." }),
  leadQ4: z.string({ required_error: "Score is required." }),
  leadQ5: z.string({ required_error: "Score is required." }),

  teamQ1: z.string({ required_error: "Score is required." }),
  teamQ2: z.string({ required_error: "Score is required." }),
  teamQ3: z.string({ required_error: "Score is required." }),
  teamQ4: z.string({ required_error: "Score is required." }),
  teamQ5: z.string({ required_error: "Score is required." }),

  challenge: z.string().min(1, 'This field is required'),
  desiredOutcome: z.string().min(1, 'This field is required'),
}).partial(); // Make all fields optional to allow partial validation per step

type SalesAuditFormValues = z.infer<typeof salesAuditSchema>;

const RatingQuestion = ({ form, name, question }: { form: any, name: keyof SalesAuditFormValues, question: string }) => (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 border-b last:border-b-0">
      <p className="text-sm">{question}</p>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex gap-2"
          >
            {[1, 2, 3, 4, 5].map(val => (
              <FormItem key={val} className="flex flex-col items-center space-y-1">
                <FormControl>
                  <RadioGroupItem value={String(val)} id={`${name}-${val}`} />
                </FormControl>
                <FormLabel htmlFor={`${name}-${val}`} className="text-xs cursor-pointer">{val}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        )}
      />
       <div className="col-span-2 -mt-2">
            <FormMessage />
        </div>
    </div>
  );

const steps = [
    { id: 1, title: 'Business Snapshot 📸', fields: ['name', 'email', 'phone', 'businessName', 'role', 'industry', 'revenueBracket', 'salesChannel'] },
    { id: 2, title: 'Sales System Clarity ⚙️', fields: ['clarityQ1', 'clarityQ2', 'clarityQ3', 'clarityQ4', 'clarityQ5'] },
    { id: 3, title: 'Lead Generation & Conversion 💰', fields: ['leadQ1', 'leadQ2', 'leadQ3', 'leadQ4', 'leadQ5'] },
    { id: 4, title: 'Sales Team Performance 🔍', fields: ['teamQ1', 'teamQ2', 'teamQ3', 'teamQ4', 'teamQ5'] },
    { id: 5, title: 'Quick Reflection 💡', fields: ['challenge', 'desiredOutcome'] }
];
const totalSteps = steps.length;

export default function SalesAuditPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [auditResult, setAuditResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SalesAuditFormValues>({
    resolver: zodResolver(salesAuditSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      businessName: '',
      role: '',
      industry: '',
      otherSalesChannel: '',
      challenge: '',
      desiredOutcome: '',
    },
    mode: 'onChange'
  });

  const watchedValues = form.watch();

  const clarityKeys: (keyof SalesAuditFormValues)[] = ['clarityQ1', 'clarityQ2', 'clarityQ3', 'clarityQ4', 'clarityQ5'];
  const leadKeys: (keyof SalesAuditFormValues)[] = ['leadQ1', 'leadQ2', 'leadQ3', 'leadQ4', 'leadQ5'];
  const teamKeys: (keyof SalesAuditFormValues)[] = ['teamQ1', 'teamQ2', 'teamQ3', 'teamQ4', 'teamQ5'];
  
  const getScore = (keys: (keyof SalesAuditFormValues)[]) => keys.reduce((acc, key) => acc + (parseInt(watchedValues[key] as string) || 0), 0);

  const clarityScore = getScore(clarityKeys);
  const leadScore = getScore(leadKeys);
  const teamScore = getScore(teamKeys);
  const totalScore = clarityScore + leadScore + teamScore;
  
  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep - 1].fields as (keyof SalesAuditFormValues)[];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  }

  async function onSubmit(values: SalesAuditFormValues) {
    setIsLoading(true);
    setIsSubmitted(true);
    setAuditResult('');

    const finalSalesChannel = values.salesChannel === 'Others' ? values.otherSalesChannel || 'Others' : values.salesChannel;

    try {
      const result = await generateSalesAudit({ 
        ...(values as z.infer<typeof salesAuditSchema>),
        salesChannel: finalSalesChannel,
        clarityScore: clarityScore,
        leadScore: leadScore,
        teamScore: teamScore,
        totalScore: totalScore,
       });
      setAuditResult(result);
      const resultElement = document.getElementById('audit-results');
      if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (error) {
      console.error('Error generating sales audit:', error);
      setAuditResult('Sorry, something went wrong while generating your audit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
  
  const getStatus = (score: number) => {
    if (score <= 30) return { status: '🚨 Needs a Plug-In ASAP', message: 'No structure or system; sales dependent on luck or effort.' };
    if (score <= 50) return { status: '⚙️ Inconsistent', message: 'Some systems exist, but leaks cause lost sales.' };
    return { status: '🚀 Scalable', message: 'System is working; ready for automation or team scaling.' };
  };

  const getRecommendation = (score: number) => {
    if (score <= 30) return { text: "Book a free discovery call with our team to design your Sales Plug-In system.", href: "https://cal.com/brightfuturetalks/bright-future-session"};
    if (score <= 50) return { text: "Join our “1-on-1 Sales Coaching” to build your internal system step-by-step.", href: "#pricing"};
    return { text: "Let’s discuss automation or scaling through our Sales Plug-In Partnership.", href: "https://cal.com/brightfuturetalks/bright-future-session"};
  };

  const scoreStatus = getStatus(totalScore);
  const recommendation = getRecommendation(totalScore);

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block text-primary">Free AI Sales Audit</span>
            <span className="block">in 60 Seconds</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            Instantly diagnose your sales process, identify leaks, and get a personalized action plan to drive growth.
          </p>
        </div>
      </AnimatedSection>
        
      {!isSubmitted && (
      <AnimatedSection className="mt-12">
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <FileText className="w-6 h-6 text-primary" /> Your Sales Health Check
            </CardTitle>
            <CardDescription>Fill this out to get your personalized AI-generated report.</CardDescription>
            <div className="pt-4">
                <Progress value={(currentStep / totalSteps) * 100} />
                <p className="text-center text-sm text-muted-foreground mt-2">Step {currentStep} of {totalSteps}</p>
            </div>
          </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="min-h-[300px]">
                    {currentStep === 1 && (
                        <fieldset className="space-y-6">
                            <legend className="font-headline text-xl font-bold pb-2 mb-4 w-full">Part 1: Business Snapshot 📸</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="e.g., Juan dela Cruz" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Your Email</FormLabel><FormControl><Input placeholder="e.g., juan@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Your Phone Number</FormLabel><FormControl><Input placeholder="e.g., 09123456789" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="businessName" render={({ field }) => (<FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="Your Company" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Your Role</FormLabel><FormControl><Input placeholder="e.g., Founder, CEO" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField
                                  control={form.control}
                                  name="industry"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Industry / Niche</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select your industry" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="B2B Services">B2B Services</SelectItem>
                                          <SelectItem value="B2C E-commerce">B2C E-commerce</SelectItem>
                                          <SelectItem value="SaaS">SaaS (Software as a Service)</SelectItem>
                                          <SelectItem value="Agency (Marketing, Creative, etc.)">Agency (Marketing, Creative, etc.)</SelectItem>
                                          <SelectItem value="Education / Coaching">Education / Coaching</SelectItem>
                                          <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                                          <SelectItem value="Financial Services">Financial Services</SelectItem>
                                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                          <SelectItem value="Construction">Construction</SelectItem>
                                          <SelectItem value="Retail">Retail</SelectItem>
                                          <SelectItem value="Hospitality">Hospitality</SelectItem>
                                          <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                            </div>
                            <FormField control={form.control} name="revenueBracket" render={({ field }) => (
                                <FormItem className="space-y-3"><FormLabel>Average Monthly Revenue</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Below ₱100K" /></FormControl><FormLabel className="font-normal cursor-pointer">Below ₱100K</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="₱100K–₱500K" /></FormControl><FormLabel className="font-normal cursor-pointer">₱100K–₱500K</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="₱500K–₱1M" /></FormControl><FormLabel className="font-normal cursor-pointer">₱500K–₱1M</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="₱1M+" /></FormControl><FormLabel className="font-normal cursor-pointer">₱1M+</FormLabel></FormItem>
                                        </RadioGroup>
                                    </FormControl><FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="salesChannel" render={({ field }) => (
                                <FormItem className="space-y-3"><FormLabel>Primary Sales Channel</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Social Media DMs" /></FormControl><FormLabel className="font-normal cursor-pointer">Social Media DMs</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Website Leads" /></FormControl><FormLabel className="font-normal cursor-pointer">Website Leads</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Referrals" /></FormControl><FormLabel className="font-normal cursor-pointer">Referrals</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Cold Calls / Email" /></FormControl><FormLabel className="font-normal cursor-pointer">Cold Calls / Email</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Others" /></FormControl><FormLabel className="font-normal cursor-pointer">Others</FormLabel></FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    {watchedValues.salesChannel === 'Others' && (
                                    <FormField control={form.control} name="otherSalesChannel" render={({ field }) => (<FormItem><FormControl><Input placeholder="Please specify" {...field} className="mt-2" /></FormControl><FormMessage /></FormItem>)} />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </fieldset>
                    )}
                    {currentStep === 2 && (
                        <fieldset className="space-y-4"><legend className="font-headline text-xl font-bold pb-2 mb-4 w-full">Part 2: Sales System Clarity ⚙️</legend>
                            <RatingQuestion form={form} name="clarityQ1" question="Do you have a clear, documented sales process?" />
                            <RatingQuestion form={form} name="clarityQ2" question="Are roles and responsibilities defined in your sales team?" />
                            <RatingQuestion form={form} name="clarityQ3" question="Do you track lead-to-close conversion rates?" />
                            <RatingQuestion form={form} name="clarityQ4" question="Do you use any CRM or automation tool?" />
                            <RatingQuestion form={form} name="clarityQ5" question="Do you have a daily/weekly sales activity tracker?" />
                            <div className="text-right font-bold pt-4">Subtotal: {clarityScore}/25</div>
                        </fieldset>
                    )}
                    {currentStep === 3 && (
                        <fieldset className="space-y-4"><legend className="font-headline text-xl font-bold pb-2 mb-4 w-full">Part 3: Lead Generation & Conversion 💰</legend>
                            <RatingQuestion form={form} name="leadQ1" question="Do you consistently get new leads every week?" />
                            <RatingQuestion form={form} name="leadQ2" question="Are your leads qualified before being contacted?" />
                            <RatingQuestion form={form} name="leadQ3" question="Do you have a nurturing system (emails, messages, remarketing)?" />
                            <RatingQuestion form={form} name="leadQ4" question="Are your closing rates above 20%?" />
                            <RatingQuestion form={form} name="leadQ5" question="Do you have follow-up strategies for non-responders?" />
                            <div className="text-right font-bold pt-4">Subtotal: {leadScore}/25</div>
                        </fieldset>
                    )}
                    {currentStep === 4 && (
                       <fieldset className="space-y-4"><legend className="font-headline text-xl font-bold pb-2 mb-4 w-full">Part 4: Sales Team Performance 🔍</legend>
                            <RatingQuestion form={form} name="teamQ1" question="Do your salespeople consistently hit targets?" />
                            <RatingQuestion form={form} name="teamQ2" question="Do you provide training or coaching regularly?" />
                            <RatingQuestion form={form} name="teamQ3" question="Is your team motivated and monitored weekly?" />
                            <RatingQuestion form={form} name="teamQ4" question="Do they understand your brand’s value proposition?" />
                            <RatingQuestion form={form} name="teamQ5" question="Do you reward or incentivize high performance?" />
                            <div className="text-right font-bold pt-4">Subtotal: {teamScore}/25</div>
                        </fieldset>
                    )}
                     {currentStep === 5 && (
                        <>
                        <Card className="mb-6"><CardHeader><CardTitle>Part 5: Overall Sales System Health</CardTitle></CardHeader>
                          <CardContent>
                            <div className="text-center p-4 bg-muted rounded-lg">
                              <div className="text-lg">Total Score</div>
                              <div className="text-5xl font-bold text-primary">{totalScore}/75</div>
                              <div className="mt-2"><span className="font-bold">{scoreStatus.status}</span>: {scoreStatus.message}</div>
                            </div>
                          </CardContent>
                        </Card>
                        <fieldset className="space-y-6"><legend className="font-headline text-xl font-bold border-b pb-2 mb-4 w-full">Part 6: Quick Reflection 💡</legend>
                          <FormField control={form.control} name="challenge" render={({ field }) => (<FormItem><FormLabel>What’s your biggest sales challenge right now?</FormLabel><FormControl><Textarea placeholder="e.g., converting leads, team performance, consistency, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name="desiredOutcome" render={({ field }) => (<FormItem><FormLabel>What would it mean for your business if you could fix this in the next 30 days?</FormLabel><FormControl><Textarea placeholder="e.g., Double our revenue, free up my time..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </fieldset>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep}>
                            <MoveLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    )}
                    {currentStep < totalSteps && (
                        <Button type="button" onClick={nextStep} className="ml-auto">
                            Next <MoveRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                     {currentStep === totalSteps && (
                        <Button type="submit" size="lg" disabled={isLoading} className="w-full text-lg ml-auto">
                        {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating Your Free Audit...</> : 'Generate My AI Sales Audit'}
                        </Button>
                    )}
                </CardFooter>
              </form>
            </Form>
        </Card>
      </AnimatedSection>
      )}
      
      <div id="audit-results">
        {isLoading && (
            <AnimatedSection className="mt-12">
                <Card className="shadow-lg">
                    <CardHeader className="items-center text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <CardTitle className="font-headline text-2xl mt-4">Our AI is assessing your answers...</CardTitle>
                        <CardDescription>This will just take a moment. Your personalized report is being generated.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-4 bg-muted rounded w-3/4 mx-auto animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mx-auto animate-pulse delay-75"></div>
                        <div className="h-4 bg-muted rounded w-full mx-auto animate-pulse delay-150"></div>
                        <div className="h-4 bg-muted rounded w-2/3 mx-auto animate-pulse delay-200"></div>
                    </CardContent>
                </Card>
            </AnimatedSection>
        )}
        {auditResult && !isLoading && (
            <AnimatedSection className="mt-12">
                <Card className="shadow-lg border-2 border-primary">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Your Personalized AI Sales Audit</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
                        <ReactMarkdown>{auditResult}</ReactMarkdown>
                    </CardContent>
                </Card>
            </AnimatedSection>
        )}
      </div>

       {auditResult && !isLoading && (
         <AnimatedSection className="mt-16 text-center">
            <Card className="bg-accent/40">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">🧠 Your Recommended Next Step</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">Based on your score of <strong className="text-primary">{totalScore}</strong>, here’s what we recommend:</p>
                <Button asChild size="lg">
                    <Link href={recommendation.href} target="_blank" rel="noopener noreferrer">
                        {recommendation.text}
                    </Link>
                </Button>
            </CardContent>
            </Card>
        </AnimatedSection>
       )}
    </div>
  );
}

    