
'use server';
/**
 * @fileOverview A sales audit AI agent.
 *
 * - generateSalesAudit - A function that handles the sales audit generation process.
 * - SalesAuditInput - The input type for the generateSalesAudit function.
 * - SalesAuditOutput - The return type for the generateSalesAudit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const SalesAuditInputSchema = z.object({
  businessName: z.string().describe('The name of the business being audited.'),
  role: z.string().describe("The user's role in the business."),
  industry: z.string().describe('The industry or niche of the business.'),
  revenueBracket: z.string().describe('The average monthly revenue of the business.'),
  salesChannel: z.string().describe('The primary sales channel of the business.'),
  clarityScore: z.number().describe('A score out of 25 representing sales system clarity.'),
  leadScore: z.number().describe('A score out of 25 representing lead generation and conversion effectiveness.'),
  teamScore: z.number().describe('A score out of 25 representing sales team performance.'),
  totalScore: z.number().describe('The total score out of 75.'),
  challenge: z.string().describe('The biggest sales challenge the user is facing.'),
  desiredOutcome: z.string().describe('The desired outcome from improving their sales system.'),
});
export type SalesAuditInput = z.infer<typeof SalesAuditInputSchema>;

export type SalesAuditOutput = string;

export async function generateSalesAudit(input: SalesAuditInput): Promise<SalesAuditOutput> {
  const { text } = await salesAuditFlow(input);
  return text;
}

const salesAuditFlow = ai.defineFlow(
  {
    name: 'salesAuditFlow',
    inputSchema: SalesAuditInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
        prompt: `
        You are an expert Sales Systems Consultant from Bright Future Talks. Your tone is human, conversational, and encouraging — like a sales mentor giving an audit report. You identify leaks, show opportunities, and give actionable steps based on their score. Avoid being robotic or generic.

        **User Inputs:**
        - Business Name: ${input.businessName}
        - Role: ${input.role}
        - Industry/Niche: ${input.industry}
        - Average Monthly Revenue: ${input.revenueBracket}
        - Primary Sales Channel: ${input.salesChannel}
        - Sales System Clarity Score (x/25): ${input.clarityScore}
        - Lead Generation & Conversion Score (x/25): ${input.leadScore}
        - Sales Team Performance Score (x/25): ${input.teamScore}
        - Total Score (x/75): ${input.totalScore}
        - Biggest Sales Challenge: ${input.challenge}
        - Desired Outcome: ${input.desiredOutcome}

        **Instructions for output:**
        1. Start with a **short personalized headline**, e.g.  
           “Hey ${input.businessName} Team — here’s what your Sales Audit reveals 👇”
        2. Provide a **brief summary paragraph (2–3 sentences)** about their current sales system health based on totalScore.
           - If below 30 → highlight instability and missing structure.
           - If 30–50 → note inconsistency and potential leaks.
           - If 50+ → emphasize scalability and readiness for automation.
        3. Create **a detailed section breakdown**:
           - 🔹 Sales System Clarity → interpret their clarityScore (show what’s working or missing)
           - 🔹 Lead Generation & Conversion → interpret leadScore (focus on lead flow and conversion quality)
           - 🔹 Sales Team Performance → interpret teamScore (focus on leadership, motivation, training)
        4. Then generate **3–5 Actionable Recommendations**, phrased like a mentor:
           - Use short bullets with verbs (e.g. “Document your process flow”, “Implement CRM tracking”, “Set weekly conversion reviews”)
        5. Close with a **motivational next-step CTA** based on score:
           - If totalScore < 30 → “Book a free discovery call to fix your sales foundation.”
           - If 30–50 → “Join our 1-on-1 Sales Coaching to strengthen your system.”
           - If 50+ → “Explore our Sales Plug-In Partnership to automate and scale.”
        6. End with an encouraging final line — something like:
           “Remember, clarity and consistency drive predictable growth 🚀 — and you’re already taking the right step.”

        **Format:**
        Use emojis sparingly to add energy.
        Output in clean markdown for web rendering.
        `,
    });
    return { text };
  }
);
