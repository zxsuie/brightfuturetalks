
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { generateSalesAudit } from '@/app/actions/generate-sales-audit';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';


const salesAuditSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  role: z.string().min(1, 'Your role is required'),
  industry: z.string().min(1, 'Industry or niche is required'),
  revenueBracket: z.string().min(1, 'Revenue bracket is required'),
  salesChannel: z.string().min(1, 'Primary sales channel is required'),
  clarityScore: z.number().min(0).max(25),
  leadScore: z.number().min(0).max(25),
  teamScore: z.number().min(0).max(25),
  challenge: z.string().min(1, 'This field is required'),
  desiredOutcome: z.string().min(1, 'This field is required'),
});


export default function SalesAuditPage() {
  const [auditResult, setAuditResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof salesAuditSchema>>({
    resolver: zodResolver(salesAuditSchema),
    defaultValues: {
      businessName: '',
      role: '',
      industry: '',
      revenueBracket: '',
      salesChannel: '',
      clarityScore: 12,
      leadScore: 12,
      teamScore: 12,
      challenge: '',
      desiredOutcome: '',
    },
  });


  async function onSubmit(values: z.infer<typeof salesAuditSchema>) {
    setIsLoading(true);
    setAuditResult('');
    try {
      const totalScore = values.clarityScore + values.leadScore + values.teamScore;
      const result = await generateSalesAudit({ ...values, totalScore });
      setAuditResult(result);
    } catch (error) {
      console.error('Error generating sales audit:', error);
      setAuditResult('Sorry, something went wrong while generating your audit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block text-primary">AI-Powered</span>
            <span className="block">Sales Audit</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            Get an instant, personalized analysis of your sales system. Identify leaks, uncover opportunities, and get actionable recommendations in minutes.
          </p>
        </div>
      </AnimatedSection>


      <AnimatedSection className="mt-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Bot className="w-6 h-6 text-primary" /> Tell Us About Your Business
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Founder, CEO, Sales Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry / Niche</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., B2B SaaS, E-commerce, Local Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="revenueBracket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Monthly Revenue</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a revenue range" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Pre-Revenue">Pre-Revenue</SelectItem>
                                <SelectItem value="< $5,000/mo">{'< $5,000/mo'}</SelectItem>
                                <SelectItem value="$5,000 - $20,000/mo">$5,000 - $20,000/mo</SelectItem>
                                <SelectItem value="$20,000 - $50,000/mo">$20,000 - $50,000/mo</SelectItem>
                                <SelectItem value="$50,000+/mo">{'> $50,000+/mo'}</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <FormField
                    control={form.control}
                    name="salesChannel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Primary Sales Channel</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Website, Social Media, Referrals, Cold Outreach" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="clarityScore"
                        render={({ field: { value, onChange } }) => (
                        <FormItem>
                            <FormLabel>Sales System Clarity Score ({value}/25)</FormLabel>
                            <p className="text-sm text-muted-foreground">How clear and documented is your sales process?</p>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={25}
                                    step={1}
                                    value={[value]}
                                    onValueChange={(vals) => onChange(vals[0])}
                                />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="leadScore"
                        render={({ field: { value, onChange } }) => (
                        <FormItem>
                            <FormLabel>Lead Generation & Conversion Score ({value}/25)</FormLabel>
                            <p className="text-sm text-muted-foreground">How effective is your lead generation and conversion?</p>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={25}
                                    step={1}
                                    value={[value]}
                                    onValueChange={(vals) => onChange(vals[0])}
                                />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="teamScore"
                        render={({ field: { value, onChange } }) => (
                        <FormItem>
                            <FormLabel>Sales Team Performance Score ({value}/25)</FormLabel>
                            <p className="text-sm text-muted-foreground">How well is your sales team performing?</p>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={25}
                                    step={1}
                                    value={[value]}
                                    onValueChange={(vals) => onChange(vals[0])}
                                />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                </div>


                <FormField
                  control={form.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your single biggest sales challenge right now?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Not enough leads, low conversion rates, team is unmotivated..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="desiredOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your desired outcome from improving your sales system?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Double our monthly revenue, build a predictable pipeline..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Your Audit...
                    </>
                  ) : (
                    'Generate My Free Sales Audit'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AnimatedSection>
      
      {auditResult && (
        <AnimatedSection className="mt-12">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Sales Audit Results</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
                    <ReactMarkdown>{auditResult}</ReactMarkdown>
                </CardContent>
            </Card>
        </AnimatedSection>
      )}
    </div>
  );
}
