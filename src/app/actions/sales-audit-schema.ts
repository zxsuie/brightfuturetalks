
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
