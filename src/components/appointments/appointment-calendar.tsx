"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/lib/types";
import { format } from "date-fns";

type AppointmentCalendarProps = {
  appointments: Appointment[];
};

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const selectedDayAppointments = React.useMemo(() => {
    if (!date) return [];
    return appointments.filter(
      (app) => format(app.startTime, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  }, [date, appointments]);

  const appointmentDates = React.useMemo(() => 
    appointments.map(app => app.startTime), 
  [appointments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Calendar</CardTitle>
        <CardDescription>
          Click on a date to see appointments.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{ booked: appointmentDates }}
            modifiersStyles={{
                booked: { 
                    border: "2px solid currentColor",
                    borderRadius: '50%',
                },
            }}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Appointments for {date ? format(date, "PPP") : "..."}
          </h3>
          {selectedDayAppointments.length > 0 ? (
            <ul className="space-y-3">
              {selectedDayAppointments.map((app) => (
                <li key={app.id} className="rounded-md border p-3">
                  <p className="font-semibold">{app.patientName}</p>
                  <p className="text-sm text-muted-foreground">
                    with {app.doctorName} ({app.specialization})
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm">
                      Time: {format(app.startTime, "HH:mm")}
                    </p>
                    <Badge variant={app.status === 'Booked' ? 'default' : app.status === 'Completed' ? 'secondary' : 'destructive'}>{app.status}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground pt-2">
              No appointments scheduled for this day.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
