'use server';
/**
 * @fileOverview An AI tool that analyzes patient data and predicts potential health risks.
 *
 * - predictRisk - A function that handles the patient risk prediction process.
 * - PredictRiskInput - The input type for the predictRisk function.
 * - PredictRiskOutput - The return type for the predictRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRiskInputSchema = z.object({
  patientData: z.string().describe('Comprehensive patient data, including medical history, lab results, and lifestyle information.'),
});
export type PredictRiskInput = z.infer<typeof PredictRiskInputSchema>;

const PredictRiskOutputSchema = z.object({
  riskFactors: z.array(z.string()).describe('A list of potential health risks identified in the patient data.'),
  recommendations: z.string().describe('Recommendations for proactive measures to mitigate the identified risks.'),
  confidenceLevel: z.number().describe('A numerical value (0-1) indicating the confidence level of the risk prediction.'),
});
export type PredictRiskOutput = z.infer<typeof PredictRiskOutputSchema>;

export async function predictRisk(input: PredictRiskInput): Promise<PredictRiskOutput> {
  return predictRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRiskPrompt',
  input: {schema: PredictRiskInputSchema},
  output: {schema: PredictRiskOutputSchema},
  prompt: `You are an AI assistant designed to analyze patient data and predict potential health risks.

  Analyze the following patient data to identify any potential health risks. Provide a list of specific risk factors, along with recommendations to mitigate those risks, and a confidence level for the prediction.

  Patient Data: {{{patientData}}}

  Respond with structured data.
`,
});

const predictRiskFlow = ai.defineFlow(
  {
    name: 'predictRiskFlow',
    inputSchema: PredictRiskInputSchema,
    outputSchema: PredictRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
