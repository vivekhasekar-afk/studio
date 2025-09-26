'use server';
/**
 * @fileOverview Patient record summarization flow with AI-identified risk factors.
 *
 * - summarizePatientRecord - A function to summarize patient records and highlight risk factors.
 * - SummarizePatientRecordInput - The input type for the summarizePatientRecord function.
 * - SummarizePatientRecordOutput - The return type for the summarizePatientRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientRecordInputSchema = z.object({
  patientRecord: z.string().describe('The complete patient record to summarize.'),
  riskFactors: z.string().optional().describe('Risk factors identified by AI.'),
});
export type SummarizePatientRecordInput = z.infer<typeof SummarizePatientRecordInputSchema>;

const SummarizePatientRecordOutputSchema = z.object({
  summary: z.string().describe('The summarized patient record with highlighted risk factors.'),
});
export type SummarizePatientRecordOutput = z.infer<typeof SummarizePatientRecordOutputSchema>;

export async function summarizePatientRecord(input: SummarizePatientRecordInput): Promise<SummarizePatientRecordOutput> {
  return summarizePatientRecordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePatientRecordPrompt',
  input: {schema: SummarizePatientRecordInputSchema},
  output: {schema: SummarizePatientRecordOutputSchema},
  prompt: `You are a medical expert summarizing patient records for quick review during hospital transfers.

  Summarize the following patient record, highlighting key information and any risk factors. Consider the risk factors identified by AI, if any, to provide a comprehensive overview.

  Patient Record: {{{patientRecord}}}

  AI-Identified Risk Factors: {{{riskFactors}}}

  Summary:`,
});

const summarizePatientRecordFlow = ai.defineFlow(
  {
    name: 'summarizePatientRecordFlow',
    inputSchema: SummarizePatientRecordInputSchema,
    outputSchema: SummarizePatientRecordOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
