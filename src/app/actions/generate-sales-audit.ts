
'use server';

/**
 * @fileOverview Server Action for generating a sales audit.
 * This file acts as the bridge between the client-side component and the Genkit AI flow.
 * It also sends the final data to a Make.com webhook.
 */

import { salesAuditFlow } from '@/ai/flows/sales-audit-flow';
import { SalesAuditInputSchema, type SalesAuditInput, type SalesAuditOutput } from './sales-audit-schema';


export async function generateSalesAudit(input: SalesAuditInput): Promise<SalesAuditOutput> {
  // We can add validation here if needed before calling the flow
  const parsedInput = SalesAuditInputSchema.parse(input);
  
  const auditResult = await salesAuditFlow(parsedInput);

  // After getting the result, send the data to the Make.com webhook
  // This happens in the background and does not block the UI
  if (process.env.MAKE_WEBHOOK_URL) {
    fetch(process.env.MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...parsedInput,
        auditResult: auditResult,
      }),
    }).catch(error => {
      // Log the error for server-side debugging, but don't block the user.
      console.error('Error sending data to Make.com webhook:', error);
    });
  } else {
    console.warn('MAKE_WEBHOOK_URL is not set. Skipping webhook.');
  }

  return auditResult;
}
