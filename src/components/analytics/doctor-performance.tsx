
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Doctor, Patient } from "@/lib/types";
import { Star } from "lucide-react";

type DoctorPerformanceProps = {
  doctors: Doctor[];
  patients: Patient[];
};

export function DoctorPerformance({ doctors, patients }: DoctorPerformanceProps) {
  const performanceData = React.useMemo(() => {
    return doctors.map((doctor) => {
      const patientCount = patients.filter(
        (p) => p.doctor === doctor.name
      ).length;
      return {
        ...doctor,
        patientCount,
      };
    }).sort((a, b) => b.patientCount - a.patientCount);
  }, [doctors, patients]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Performance</CardTitle>
        <CardDescription>
          Overview of doctor workload and ratings for today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead className="text-center">Patients Seen</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceData.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="doctor portrait" />
                      <AvatarFallback>{doctor.name.charAt(3).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="text-lg">{doctor.patientCount}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
