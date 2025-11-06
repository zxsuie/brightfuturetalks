
'use client';
import { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, FileText, Building, Briefcase, DollarSign, Goal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const salesAuditSchema = z.object({
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
});

type SalesAuditFormValues = z.infer<typeof salesAuditSchema>;


const RatingQuestion = ({ form, name, question }: { form: any, name: keyof SalesAuditFormValues, question: string }) => (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-2 border-b">
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
                <FormLabel htmlFor={`${name}-${val}`} className="text-xs">{val}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );

export default function SalesAuditPage() {
  const [auditResult, setAuditResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState({ clarity: 0, lead: 0, team: 0, total: 0 });

  const form = useForm<SalesAuditFormValues>({
    resolver: zodResolver(salesAuditSchema),
    defaultValues: {
      businessName: '',
      role: '',
      industry: '',
      otherSalesChannel: '',
      challenge: '',
      desiredOutcome: '',
    },
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const calculateScores = () => {
      const clarityKeys: (keyof SalesAuditFormValues)[] = ['clarityQ1', 'clarityQ2', 'clarityQ3', 'clarityQ4', 'clarityQ5'];
      const leadKeys: (keyof SalesAuditFormValues)[] = ['leadQ1', 'leadQ2', 'leadQ3', 'leadQ4', 'leadQ5'];
      const teamKeys: (keyof SalesAuditFormValues)[] = ['teamQ1', 'teamQ2', 'teamQ3', 'teamQ4', 'teamQ5'];
      
      const getScore = (keys: (keyof SalesAuditFormValues)[]) => keys.reduce((acc, key) => acc + (parseInt(watchAllFields[key] as string) || 0), 0);

      const clarityScore = getScore(clarityKeys);
      const leadScore = getScore(leadKeys);
      const teamScore = getScore(teamKeys);
      const totalScore = clarityScore + leadScore + teamScore;

      setScores({ clarity: clarityScore, lead: leadScore, team: teamScore, total: totalScore });
    };
    calculateScores();
  }, [watchAllFields]);


  async function onSubmit(values: SalesAuditFormValues) {
    setIsLoading(true);
    setAuditResult('');

    const finalSalesChannel = values.salesChannel === 'Others' ? values.otherSalesChannel || 'Others' : values.salesChannel;

    try {
      const result = await generateSalesAudit({ 
        ...values, 
        salesChannel: finalSalesChannel,
        clarityScore: scores.clarity,
        leadScore: scores.lead,
        teamScore: scores.team,
        totalScore: scores.total,
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

  const scoreStatus = getStatus(scores.total);
  const recommendation = getRecommendation(scores.total);

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


      <AnimatedSection className="mt-12">
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <FileText className="w-6 h-6 text-primary" /> Your Sales Health Check
            </CardTitle>
            <CardDescription>Fill this out to get your personalized AI-generated report.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                
                {/* Part 1 */}
                <fieldset className="space-y-6">
                    <legend className="font-headline text-xl font-bold border-b pb-2 mb-4 w-full">Part 1: Business Snapshot 📸</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="businessName" render={({ field }) => (<FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="Your Company" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Your Role</FormLabel><FormControl><Input placeholder="e.g., Founder, CEO" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="industry" render={({ field }) => (<FormItem><FormLabel>Industry / Niche</FormLabel><FormControl><Input placeholder="e.g., B2B SaaS, E-commerce" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="revenueBracket" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>Average Monthly Revenue</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Below ₱100K" /></FormControl><FormLabel className="font-normal">Below ₱100K</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="₱100K–₱500K" /></FormControl><FormLabel className="font-normal">₱100K–₱500K</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="₱500K–₱1M" /></FormControl><FormLabel className="font-normal">₱500K–₱1M</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="₱1M+" /></FormControl><FormLabel className="font-normal">₱1M+</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl><FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="salesChannel" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>Primary Sales Channel</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Social Media DMs" /></FormControl><FormLabel className="font-normal">Social Media DMs</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Website Leads" /></FormControl><FormLabel className="font-normal">Website Leads</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Referrals" /></FormControl><FormLabel className="font-normal">Referrals</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Cold Calls / Email" /></FormControl><FormLabel className="font-normal">Cold Calls / Email</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Others" /></FormControl><FormLabel className="font-normal">Others</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                            {watchAllFields.salesChannel === 'Others' && (
                               <FormField control={form.control} name="otherSalesChannel" render={({ field }) => (<FormItem><FormControl><Input placeholder="Please specify" {...field} className="mt-2" /></FormControl><FormMessage /></FormItem>)} />
                            )}
                            <FormMessage />
                        </FormItem>
                    )} />
                </fieldset>
                
                {/* Part 2, 3, 4 */}
                <fieldset className="space-y-6"><legend className="font-headline text-xl font-bold border-b pb-2 mb-4 w-full">Part 2: Sales System Clarity ⚙️</legend>
                    <RatingQuestion form={form} name="clarityQ1" question="Do you have a clear, documented sales process?" />
                    <RatingQuestion form={form} name="clarityQ2" question="Are roles and responsibilities defined in your sales team?" />
                    <RatingQuestion form={form} name="clarityQ3" question="Do you track lead-to-close conversion rates?" />
                    <RatingQuestion form={form} name="clarityQ4" question="Do you use any CRM or automation tool?" />
                    <RatingQuestion form={form} name="clarityQ5" question="Do you have a daily/weekly sales activity tracker?" />
                    <div className="text-right font-bold">Subtotal: {scores.clarity}/25</div>
                </fieldset>

                <fieldset className="space-y-6"><legend className="font-headline text-xl font-bold border-b pb-2 mb-4 w-full">Part 3: Lead Generation & Conversion 💰</legend>
                    <RatingQuestion form={form} name="leadQ1" question="Do you consistently get new leads every week?" />
                    <RatingQuestion form={form} name="leadQ2" question="Are your leads qualified before being contacted?" />
                    <RatingQuestion form={form} name="leadQ3" question="Do you have a nurturing system (emails, messages, remarketing)?" />
                    <RatingQuestion form={form} name="leadQ4" question="Are your closing rates above 20%?" />
                    <RatingQuestion form={form} name="leadQ5" question="Do you have follow-up strategies for non-responders?" />
                    <div className="text-right font-bold">Subtotal: {scores.lead}/25</div>
                </fieldset>

                <fieldset className="space-y-6"><legend className="font-headline text-xl font-bold border-b pb-2 mb-4 w-full">Part 4: Sales Team Performance 🔍</legend>
                    <RatingQuestion form={form} name="teamQ1" question="Do your salespeople consistently hit targets?" />
                    <RatingQuestion form={form} name="teamQ2" question="Do you provide training or coaching regularly?" />
                    <RatingQuestion form={form} name="teamQ3" question="Is your team motivated and monitored weekly?" />
                    <RatingQuestion form={form} name="teamQ4" question="Do they understand your brand’s value proposition?" />
                    <RatingQuestion form={form} name="teamQ5" question="Do you reward or incentivize high performance?" />
                    <div className="text-right font-bold">Subtotal: {scores.team}/25</div>
                </fieldset>

                {/* Part 5 */}
                <Card><CardHeader><CardTitle>Part 5: Overall Sales System Health</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-lg">Total Score</div>
                      <div className="text-5xl font-bold text-primary">{scores.total}/75</div>
                      <div className="mt-2"><span className="font-bold">{scoreStatus.status}</span>: {scoreStatus.message}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Part 6 */}
                <fieldset className="space-y-6"><legend className="font-headline text-xl font-bold border-b pb-2 mb-4 w-full">Part 6: Quick Reflection 💡</legend>
                  <FormField control={form.control} name="challenge" render={({ field }) => (<FormItem><FormLabel>What’s your biggest sales challenge right now?</FormLabel><FormControl><Textarea placeholder="e.g., converting leads, team performance, consistency, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="desiredOutcome" render={({ field }) => (<FormItem><FormLabel>What would it mean for your business if you could fix this in the next 30 days?</FormLabel><FormControl><Textarea placeholder="e.g., Double our revenue, free up my time..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                </fieldset>

                <Button type="submit" size="lg" disabled={isLoading} className="w-full text-lg">
                  {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating Your Free Audit...</> : 'Generate My AI Sales Audit'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AnimatedSection>
      
      <div id="audit-results">
        {isLoading && (
            <AnimatedSection className="mt-12">
                <Card className="shadow-lg animate-pulse">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Generating Your Sales Audit...</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                </Card>
            </AnimatedSection>
        )}
        {auditResult && (
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

       {/* Part 7 */}
       <AnimatedSection className="mt-16 text-center">
        <Card className="bg-accent/40">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">🧠 Part 7: Your Recommended Next Step</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-lg mb-4">Based on your score of <strong className="text-primary">{scores.total}</strong>, here’s what we recommend:</p>
             <Button asChild size="lg">
                <Link href={recommendation.href} target="_blank" rel="noopener noreferrer">
                    {recommendation.text}
                </Link>
             </Button>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

    