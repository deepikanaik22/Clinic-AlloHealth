"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { QueueTable } from "./queue-table";
import { AddPatientDialog } from "./add-patient-dialog";
import type { Patient, Doctor, PatientPriority } from "@/lib/types";

type QueueManagerProps = {
  patients: Patient[];
  addPatient: (name: string, doctor: string, priority: PatientPriority) => void;
  updatePatientStatus: (patientId: number, status: Patient['status']) => void;
  updatePatientPriority: (patientId: number, priority: PatientPriority) => void;
  doctors: Doctor[];
};

export function QueueManager({ patients, addPatient, updatePatientStatus, updatePatientPriority, doctors }: QueueManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Walk-in Patient
        </Button>
      </div>
      <QueueTable patients={patients} onUpdateStatus={updatePatientStatus} onUpdatePriority={updatePatientPriority} />
      <AddPatientDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddPatient={addPatient}
        doctors={doctors}
      />
    </div>
  );
}
