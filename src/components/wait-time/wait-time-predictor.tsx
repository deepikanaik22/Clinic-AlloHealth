"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { predictPatientWaitTime, PatientWaitTimeInput, PatientWaitTimeOutput } from "@/server/flows/patient-wait-time-prediction";
import { mockDoctors } from "@/lib/data";
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  patientDescription: z.string().min(10, "Description must be at least 10 characters."),
  doctorSpecialization: z.string().min(1, "Please select a specialization."),
  queueLength: z.coerce.number().min(0, "Queue length cannot be negative."),
  timeOfDay: z.string().min(1, "Please select a time of day."),
  appointmentType: z.string().min(1, "Please select an appointment type."),
});

export function WaitTimePredictor() {
  const [prediction, setPrediction] = React.useState<PatientWaitTimeOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientDescription: "",
      doctorSpecialization: "",
      queueLength: 0,
      timeOfDay: "Morning",
      appointmentType: "Walk-in",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await predictPatientWaitTime(values as PatientWaitTimeInput);
      setPrediction(result);
    } catch (e) {
      console.error(e);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  const doctorSpecializations = [...new Set(mockDoctors.map(d => d.specialization))];

  return (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wand2 className="text-primary"/> AI Wait Time Predictor</CardTitle>
            <CardDescription>Fill in the details to get an AI-powered wait time prediction for a patient.</CardDescription>
        </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="patientDescription"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Patient Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="e.g., 35-year-old male with persistent cough and fever for 3 days." {...field} />
                        </FormControl>
                        <FormDescription>Include age, gender, and primary symptoms.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="doctorSpecialization"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Doctor Specialization</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a specialization" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {doctorSpecializations.map(spec => (
                                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="queueLength"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Queue Length</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="e.g., 5" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="timeOfDay"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Time of Day</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time of day" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Morning">Morning</SelectItem>
                                    <SelectItem value="Afternoon">Afternoon</SelectItem>
                                    <SelectItem value="Evening">Evening</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="appointmentType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Appointment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select appointment type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Walk-in">Walk-in</SelectItem>
                                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                 <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Predict Wait Time
                </Button>

                {prediction && (
                    <Card className="w-full bg-secondary">
                        <CardHeader>
                            <CardTitle>Prediction Result</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">~ {prediction.predictedWaitTimeMinutes} minutes</h3>
                                <p className="text-sm text-muted-foreground">Predicted Wait Time</p>
                            </div>
                             <div>
                                <h4 className="font-semibold">Reasoning</h4>
                                <p className="text-sm text-muted-foreground">{prediction.reasoning}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
                 {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
