import { AnimatedSection } from "@/components/ui/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is Sales-as-a-Service (SaaS) and how does it work?",
    answer:
      "Sales-as-a-Service means we act as your outsourced sales team, plugging into your business to generate leads, nurture relationships, and close deals — without the overhead of hiring a full in-house team.",
  },
  {
    question: "Who can benefit from your service?",
    answer:
      "We work with B2B companies, startups, and growing businesses that need a dedicated sales team but don’t have the resources, time, or expertise to build one from scratch.",
  },
  {
    question: "How do you integrate with my business?",
    answer:
      "We learn your products, services, and brand voice, then align our strategies with your goals. Think of us as your remote sales department working under your banner.",
  },
  {
    question: "Do you specialize in specific industries?",
    answer: "While we can adapt to many industries.",
  },
  {
    question: "How do you generate leads?",
    answer:
      "We use a combination of data-driven prospecting, CRM automation, social selling, and cold outreach.",
  },
  {
    question: "How do you ensure quality leads and not just quantity?",
    answer:
      "We use a lead scoring system to qualify prospects based on their fit, intent, and engagement before handing them over to your team (or closing the sale ourselves).",
  },
  {
    question: "Can you handle the full sales cycle?",
    answer:
      "Yes — from lead generation and outreach to follow-ups, demos, negotiations, and closing deals.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Our packages are flexible — you can choose on different packages depending on the needs of our client.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We track KPIs like leads generated, conversion rates, revenue closed, and ROI, and provide transparent reports so you see exactly what’s working.",
  },
  {
    question: "Will you represent my brand or your own?",
    answer:
      "We represent your brand. All communications, presentations, and sales activities are done as if we’re part of your in-house team.",
  },
  {
    question: "How do you train your salespeople to understand my business?",
    answer:
      "We conduct an in-depth onboarding session, review your sales materials, and even shadow your team to fully grasp your offers, target market, and tone.",
  },
  {
    question: "Can you help with sales strategy as well?",
    answer:
      "Yes — we don’t just execute, we also help create and refine your sales strategy for better long-term results.",
  },
  {
    question: "How do you handle client data and privacy?",
    answer:
      "We follow strict data protection standards and can sign NDAs to ensure all client and prospect information is secure.",
  },
  {
    question:
      "Can I scale up or down the service depending on my business growth?",
    answer:
      "Yes — we offer flexible contracts so you can scale our team up during peak seasons and scale down when needed.",
  },
];


export function FaqSection() {
  return (
    <AnimatedSection id="faq" className="py-24 sm:py-32 bg-accent/40">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Have questions? We have answers. Here are some of the most common inquiries we receive from prospective partners.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </AnimatedSection>
  );
}
