
import { z } from 'zod';

export const SalesAuditInputSchema = z.object({
  name: z.string().describe("The user's full name."),
  email: z.string().describe("The user's email address."),
  phone: z.string().describe("The user's phone number."),
  businessName: z.string().describe('The name of the business being audited.'),
  role: z.string().describe("The user's role in the business."),
  industry: z.string().describe('The industry or niche of the business.'),
  revenueBracket: z.string().describe('The average monthly revenue of the business.'),
  salesChannel: z.string().describe('The primary sales channel of the business.'),
  
  clarityQ1: z.string().describe('Score for clarity question 1'),
  clarityQ2: z.string().describe('Score for clarity question 2'),
  clarityQ3: z.string().describe('Score for clarity question 3'),
  clarityQ4: z.string().describe('Score for clarity question 4'),
  clarityQ5: z.string().describe('Score for clarity question 5'),
  
  leadQ1: z.string().describe('Score for lead question 1'),
  leadQ2: z.string().describe('Score for lead question 2'),
  leadQ3: z.string().describe('Score for lead question 3'),
  leadQ4: z.string().describe('Score for lead question 4'),
  leadQ5: z.string().describe('Score for lead question 5'),

  teamQ1: z.string().describe('Score for team question 1'),
  teamQ2: z.string().describe('Score for team question 2'),
  teamQ3: z.string().describe('Score for team question 3'),
  teamQ4: z.string().describe('Score for team question 4'),
  teamQ5: z.string().describe('Score for team question 5'),
  
  clarityScore: z.number().describe('A score out of 25 representing sales system clarity.'),
  leadScore: z.number().describe('A score out of 25 representing lead generation and conversion effectiveness.'),
  teamScore: z.number().describe('A score out of 25 representing sales team performance.'),
  totalScore: z.number().describe('The total score out of 75.'),
  challenge: z.string().describe('The biggest sales challenge the user is facing.'),
  desiredOutcome: z.string().describe('The desired outcome from improving their sales system.'),
});

export type SalesAuditInput = z.infer<typeof SalesAuditInputSchema>;

export type SalesAuditOutput = string;
