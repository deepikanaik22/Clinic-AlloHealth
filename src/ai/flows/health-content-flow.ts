'use server';

/**
 * @fileOverview Generates health-related articles.
 *
 * - generateHealthArticle - A function that generates a health article on a given topic.
 * - HealthArticleInput - The input type for the generateHealthArticle function.
 * - HealthArticleOutput - The return type for the generateHealthArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthArticleInputSchema = z.object({
  topic: z.string().describe('The health topic for the article.'),
});
export type HealthArticleInput = z.infer<typeof HealthArticleInputSchema>;

const HealthArticleOutputSchema = z.object({
  title: z.string().describe('The title of the article.'),
  content: z.string().describe('The full content of the article in markdown format.'),
  tags: z.array(z.string()).describe('A list of relevant tags for the article.'),
});
export type HealthArticleOutput = z.infer<typeof HealthArticleOutputSchema>;

export async function generateHealthArticle(
  input: HealthArticleInput
): Promise<HealthArticleOutput> {
  return generateHealthArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthArticlePrompt',
  input: {schema: HealthArticleInputSchema},
  output: {schema: HealthArticleOutputSchema},
  prompt: `You are a health and wellness writer for a clinic's blog.

  Write an informative and engaging article about the following topic: {{{topic}}}.

  The article should be well-structured, easy to read, and provide practical advice.
  Format the content in Markdown.
  
  Generate a suitable title and a few relevant tags for the article.`,
});

const generateHealthArticleFlow = ai.defineFlow(
  {
    name: 'generateHealthArticleFlow',
    inputSchema: HealthArticleInputSchema,
    outputSchema: HealthArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
