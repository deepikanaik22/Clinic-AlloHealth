'use server';

/**
 * @fileOverview Predicts patient wait times based on various factors.
 *
 * - predictPatientWaitTime - A function that predicts the wait time for a patient.
 * - PatientWaitTimeInput - The input type for the predictPatientWaitTime function.
 * - PatientWaitTimeOutput - The return type for the predictPatientWaitTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientWaitTimeInputSchema = z.object({
  patientDescription: z
    .string()
    .describe('Description of the patient including age and symptoms.'),
  doctorSpecialization: z.string().describe('Doctor specialization.'),
  queueLength: z.number().describe('Current queue length.'),
  timeOfDay: z.string().describe('Time of day (e.g., morning, afternoon).'),
  appointmentType: z.string().describe('Type of appointment (e.g., walk-in, scheduled).'),
});
export type PatientWaitTimeInput = z.infer<typeof PatientWaitTimeInputSchema>;

const PatientWaitTimeOutputSchema = z.object({
  predictedWaitTimeMinutes: z
    .number()
    .describe('Predicted wait time in minutes.'),
  reasoning: z
    .string()
    .describe('Explanation of why the wait time is predicted to be this long.'),
});
export type PatientWaitTimeOutput = z.infer<typeof PatientWaitTimeOutputSchema>;

export async function predictPatientWaitTime(
  input: PatientWaitTimeInput
): Promise<PatientWaitTimeOutput> {
  return predictPatientWaitTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'patientWaitTimePrompt',
  input: {schema: PatientWaitTimeInputSchema},
  output: {schema: PatientWaitTimeOutputSchema},
  prompt: `You are an AI assistant that predicts patient wait times at a clinic.

  Based on the patient's description, doctor's specialization, current queue length, time of day, and appointment type, predict how long the patient will have to wait (in minutes).

  Explain your reasoning for the predicted wait time.

  Patient Description: {{{patientDescription}}}
  Doctor Specialization: {{{doctorSpecialization}}}
  Queue Length: {{{queueLength}}}
  Time of Day: {{{timeOfDay}}}
  Appointment Type: {{{appointmentType}}}`,
});

const predictPatientWaitTimeFlow = ai.defineFlow(
  {
    name: 'predictPatientWaitTimeFlow',
    inputSchema: PatientWaitTimeInputSchema,
    outputSchema: PatientWaitTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
