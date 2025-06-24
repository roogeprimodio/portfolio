'use server';

/**
 * @fileOverview An AI agent that refines a self-summary based on project descriptions.
 *
 * - refineSelfSummary - A function that refines the self-summary.
 * - RefineSelfSummaryInput - The input type for the refineSelfSummary function.
 * - RefineSelfSummaryOutput - The return type for the refineSelfSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineSelfSummaryInputSchema = z.object({
  selfSummary: z
    .string()
    .describe('The current self-summary to be refined.'),
  projectDescriptions: z
    .array(z.string())
    .describe('An array of project descriptions.'),
});
export type RefineSelfSummaryInput = z.infer<typeof RefineSelfSummaryInputSchema>;

const RefineSelfSummaryOutputSchema = z.object({
  refinedSummary: z
    .string()
    .describe('The refined self-summary with highlighted keywords and skills.'),
});
export type RefineSelfSummaryOutput = z.infer<typeof RefineSelfSummaryOutputSchema>;

export async function refineSelfSummary(input: RefineSelfSummaryInput): Promise<RefineSelfSummaryOutput> {
  return refineSelfSummaryFlow(input);
}

const refineSelfSummaryPrompt = ai.definePrompt({
  name: 'refineSelfSummaryPrompt',
  input: {schema: RefineSelfSummaryInputSchema},
  output: {schema: RefineSelfSummaryOutputSchema},
  prompt: `You are an AI assistant specializing in crafting compelling self-summaries for portfolio websites.

  Based on the provided project descriptions, identify key skills, technologies, and accomplishments.
  Refine the user's self-summary to incorporate these elements, making it more impactful and engaging.

  Current Self-Summary: {{{selfSummary}}}

  Project Descriptions:
  {{#each projectDescriptions}}
  - {{{this}}}
  {{/each}}

  Refined Self-Summary:`,
});

const refineSelfSummaryFlow = ai.defineFlow(
  {
    name: 'refineSelfSummaryFlow',
    inputSchema: RefineSelfSummaryInputSchema,
    outputSchema: RefineSelfSummaryOutputSchema,
  },
  async input => {
    const {output} = await refineSelfSummaryPrompt(input);
    return output!;
  }
);
