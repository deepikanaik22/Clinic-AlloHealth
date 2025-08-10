"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { QueueTable } from "./queue-table";
import { AddPatientDialog } from "./add-patient-dialog";
import { mockPatients } from "@/lib/data";
import type { Patient } from "@/lib/types";

export function QueueManager() {
  const [patients, setPatients] = React.useState<Patient[]>(mockPatients);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const addPatient = (name: string) => {
    const newPatient: Patient = {
      id: patients.length + 1,
      name,
      queueNumber: Math.max(...patients.map(p => p.queueNumber), 0) + 1,
      status: "Waiting",
      arrivalTime: new Date(),
      doctor: "Unassigned",
    };
    setPatients((prev) => [newPatient, ...prev]);
  };
  
  const updatePatientStatus = (patientId: number, status: Patient['status']) => {
    setPatients(prev => prev.map(p => p.id === patientId ? {...p, status} : p));
  };


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Walk-in Patient
        </Button>
      </div>
      <QueueTable patients={patients} onUpdateStatus={updatePatientStatus} />
      <AddPatientDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddPatient={addPatient}
      />
    </div>
  );
}
