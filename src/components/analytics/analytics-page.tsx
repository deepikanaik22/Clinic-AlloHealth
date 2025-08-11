
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Patient, Doctor, Appointment } from "@/lib/types";
import { DoctorPerformance } from "./doctor-performance";
import { PeakHoursChart } from "./peak-hours-chart";

type AnalyticsPageProps = {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
};

export function AnalyticsPage({ patients, doctors, appointments }: AnalyticsPageProps) {
  
  const today = new Date();
  
  const todaysPatients = patients.filter(p => new Date(p.arrivalTime).toDateString() === today.toDateString());
  const todaysAppointments = appointments.filter(a => new Date(a.startTime).toDateString() === today.toDateString());

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Patients Today</CardTitle>
            <CardDescription>Walk-ins and booked appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todaysPatients.length + todaysAppointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Appointments</CardTitle>
            <CardDescription>Number of completed visits today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {todaysAppointments.filter(a => a.status === 'Completed').length + todaysPatients.filter(p => p.status === 'Completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Wait Time</CardTitle>
            <CardDescription>Average for walk-in patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">22 min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>No-Show Rate</CardTitle>
            <CardDescription>Rate of missed appointments.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold">8%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoctorPerformance patients={todaysPatients} doctors={doctors} />
        <PeakHoursChart patients={todaysPatients} />
      </div>
    </div>
  );
}
