"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, CalendarCheck, Stethoscope } from "lucide-react";
import { mockPatients, mockAppointments, mockDoctors } from "@/lib/data";

export function OverviewCards() {
  const patientsInQueue = mockPatients.filter(
    (p) => p.status === "Waiting" || p.status === "With Doctor"
  ).length;
  
  const today = new Date().toDateString();
  const appointmentsToday = mockAppointments.filter(
    (a) => new Date(a.startTime).toDateString() === today && a.status === 'Booked'
  ).length;

  // This is a simplified logic for available doctors
  const availableDoctors = mockDoctors.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
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
      <Card>
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
      <Card>
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
    </div>
  );
}
