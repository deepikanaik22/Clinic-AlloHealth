"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentCalendar } from "./appointment-calendar";
import { Button } from "@/components/ui/button";
import { mockDoctors, mockAppointments } from "@/lib/data";
import type { Appointment, Doctor } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BookingDialog } from "./booking-dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function AppointmentScheduler() {
  const [appointments, setAppointments] = React.useState<Appointment[]>(mockAppointments);
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const { toast } = useToast();

  const handleBookAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: appointments.length + 1,
      status: 'Booked',
    };
    setAppointments(prev => [...prev, newAppointment]);
    toast({
      title: "Appointment Booked",
      description: `Appointment for ${appointment.patientName} with ${appointment.doctorName} has been booked.`,
    });
  };
  
  const isDoctorAvailable = (doctor: Doctor) => {
    const today = format(new Date(), "EEEE"); // e.g., "Monday"
    return doctor.availability.some(day => day.day === today);
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Doctors</CardTitle>
            <CardDescription>Select a doctor to see their availability.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="p-4">
                  <div className="flex items-start gap-4">
                     <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="doctor portrait" />
                        <AvatarFallback>{doctor.name.charAt(3).toUpperCase()}{doctor.name.charAt(4).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{doctor.name}</p>
                            <Badge variant={isDoctorAvailable(doctor) ? 'default' : 'secondary'} className="text-xs">
                                {isDoctorAvailable(doctor) ? "Available" : "Unavailable"}
                            </Badge>
                        </div>

                        <Badge variant="secondary">{doctor.specialization}</Badge>
                         <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                                setSelectedDoctor(doctor);
                                setIsBookingOpen(true);
                            }}
                            >
                            Book Appointment
                        </Button>
                    </div>
                  </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <AppointmentCalendar appointments={appointments} />
      </div>

      <BookingDialog
        isOpen={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        doctor={selectedDoctor}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
}
