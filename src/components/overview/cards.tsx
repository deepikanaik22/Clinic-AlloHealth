"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, CalendarCheck, Stethoscope, Clock, Smile, Star } from "lucide-react";
import { mockAppointments, mockDoctors } from "@/lib/data";
import { Button } from "../ui/button";
import * as React from "react";
import { FeedbackDialog } from "./feedback-dialog";
import type { Patient } from "@/lib/types";

type OverviewCardsProps = {
  patients: Patient[];
};

export function OverviewCards({ patients }: OverviewCardsProps) {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = React.useState(false);

  const patientsInQueue = patients.filter(
    (p) => p.status === "Waiting" || p.status === "With Doctor"
  ).length;
  
  const today = new Date().toDateString();
  const appointmentsToday = mockAppointments.filter(
    (a) => new Date(a.startTime).toDateString() === today && a.status === 'Booked'
  ).length;

  const availableDoctors = mockDoctors.length;
  
  const averageWaitTime = 25; // Mock data
  const patientSatisfaction = "92%"; // Mock data

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patients in Queue
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientsInQueue}</div>
            <p className="text-xs text-muted-foreground">
              Active patients waiting or with a doctor.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Appointments Today
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{appointmentsToday}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for today.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Doctors
            </CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableDoctors}</div>
            <p className="text-xs text-muted-foreground">
              Doctors currently available for appointments.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageWaitTime} min</div>
            <p className="text-xs text-muted-foreground">
              Based on today's patient flow.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientSatisfaction}</div>
            <p className="text-xs text-muted-foreground">
              Based on recent survey responses.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-4">
            <p className="text-xs text-muted-foreground">
              Help us improve by sharing your thoughts.
            </p>
            <Button onClick={() => setIsFeedbackDialogOpen(true)}>Give Feedback</Button>
          </CardContent>
        </Card>
      </div>
      <FeedbackDialog 
        isOpen={isFeedbackDialogOpen}
        onOpenChange={setIsFeedbackDialogOpen}
      />
    </>
  );
}
