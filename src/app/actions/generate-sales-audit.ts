
'use server';

/**
 * @fileOverview Server Action for generating a sales audit.
 * This file acts as the bridge between the client-side component and the Genkit AI flow.
 */

import { salesAuditFlow } from '@/ai/flows/sales-audit-flow';
import { SalesAuditInputSchema, type SalesAuditInput, type SalesAuditOutput } from './sales-audit-schema';


export async function generateSalesAudit(input: SalesAuditInput): Promise<SalesAuditOutput> {
  // We can add validation here if needed before calling the flow
  const parsedInput = SalesAuditInputSchema.parse(input);
  return salesAuditFlow(parsedInput);
}
