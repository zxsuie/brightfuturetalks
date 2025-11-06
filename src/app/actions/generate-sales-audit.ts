
'use server';

/**
 * @fileOverview Server Action for generating a sales audit.
 * This file acts as the bridge between the client-side component and the Genkit AI flow.
 */

import { salesAuditFlow, type SalesAuditInput, type SalesAuditOutput } from '@/ai/flows/sales-audit-flow';

export async function generateSalesAudit(input: SalesAuditInput): Promise<SalesAuditOutput> {
  return salesAuditFlow(input);
}
