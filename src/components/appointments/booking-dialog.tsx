"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Doctor, Appointment } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type BookingDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  doctor: Doctor | null;
  onBookAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
};

export function BookingDialog({
  isOpen,
  onOpenChange,
  doctor,
  onBookAppointment,
}: BookingDialogProps) {
  const [patientName, setPatientName] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = React.useState<string | undefined>();
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (!isOpen) {
        setPatientName("");
        setDate(undefined);
        setTimeSlot(undefined);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !date || !timeSlot || !doctor) {
      toast({ title: "Missing Information", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    const appointmentTime = new Date(date);
    const [hours, minutes] = timeSlot.split(':').map(Number);
    appointmentTime.setHours(hours, minutes, 0, 0);

    onBookAppointment({
        patientName,
        doctorName: doctor.name,
        specialization: doctor.specialization,
        startTime: appointmentTime,
    });
    
    onOpenChange(false);
  };
  
  const availableSlots = React.useMemo(() => {
    if (!date || !doctor) return [];
    const dayOfWeek = format(date, "EEEE");
    return doctor.availability.find(d => d.day === dayOfWeek)?.slots || [];
  }, [date, doctor]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Schedule an appointment with {doctor?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient-name" className="text-right">
                Patient
              </Label>
              <Input
                id="patient-name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="col-span-3"
                placeholder="Patient's full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal col-span-3",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={{ before: new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Select onValueChange={setTimeSlot} value={timeSlot}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableSlots.length > 0 ? (
                             availableSlots.map(slot => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))
                        ) : (
                            <SelectItem value="disabled" disabled>No slots available</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
