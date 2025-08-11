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
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type AddPatientDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddPatient: (name: string, doctor: string) => void;
  doctors: Doctor[];
};

export function AddPatientDialog({
  isOpen,
  onOpenChange,
  onAddPatient,
  doctors,
}: AddPatientDialogProps) {
  const [name, setName] = React.useState("");
  const [selectedDoctor, setSelectedDoctor] = React.useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedDoctor) {
      onAddPatient(name.trim(), selectedDoctor);
      toast({
        title: "Patient Added",
        description: `${name.trim()} has been added to the queue for ${selectedDoctor}.`,
      });
      setName("");
      setSelectedDoctor("");
      onOpenChange(false);
    } else {
      toast({
        title: "Error",
        description: "Patient name and doctor must be filled.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      setName("");
      setSelectedDoctor("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Walk-in Patient</DialogTitle>
            <DialogDescription>
              Enter the patient's name and select a doctor to add them to the queue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g. John Doe"
                autoFocus
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">Doctor</Label>
                <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        {doctors.map(doctor => (
                            <SelectItem key={doctor.id} value={doctor.name}>{doctor.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add to Queue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
