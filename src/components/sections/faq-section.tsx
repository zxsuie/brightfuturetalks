import { AnimatedSection } from "@/components/ui/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What types of businesses do you typically partner with?",
    answer:
      "We specialize in working with Micro, Small, and Medium-sized Enterprises (MSMEs) across various industries. Our ideal partners are businesses that have a proven product or service but lack the internal resources or expertise to build a scalable sales engine.",
  },
  {
    question: "How long does it take to see tangible results?",
    answer:
      "While every business is unique, our partners typically see improvements in their sales pipeline and lead quality within the first few weeks. Significant revenue growth and a predictable sales system are usually established within the first 3-6 months as we fully ramp up our operations.",
  },
  {
    question: "What is included in the monthly package?",
    answer:
      "Our service is a comprehensive Sales-as-a-Service solution. It includes a dedicated sales team, lead generation technology, CRM setup and management, strategic planning, and detailed performance reporting. We handle the entire sales cycle, from prospecting to closing deals.",
  },
  {
    question: "Can I customize the plan based on my specific needs?",
    answer:
      "Absolutely. Our standard package serves as a foundation, but we tailor every engagement to our client's specific goals, market, and budget. We'll work with you to create a custom quote and plan that aligns perfectly with your business objectives.",
  },
  {
    question: "How do we stay updated on the progress?",
    answer:
      "Transparency is key to our partnership. We provide weekly performance reports, hold regular strategy calls to discuss progress and insights, and offer a shared communication channel (like Slack) for real-time updates and collaboration with your dedicated sales team.",
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
