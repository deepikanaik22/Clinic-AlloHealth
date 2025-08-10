"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import type { Patient, PatientStatus } from "@/lib/types";
import { format } from "date-fns";

type QueueTableProps = {
  patients: Patient[];
  onUpdateStatus: (patientId: number, status: PatientStatus) => void;
};

export function QueueTable({ patients, onUpdateStatus }: QueueTableProps) {
  const [filter, setFilter] = React.useState("");
  const [sortBy, setSortBy] = React.useState<keyof Patient | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof Patient) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedPatients = React.useMemo(() => {
    let filtered = patients.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortBy) {
      filtered.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [patients, filter, sortBy, sortOrder]);

  const getStatusVariant = (status: PatientStatus) => {
    switch (status) {
      case "Waiting":
        return "secondary";
      case "With Doctor":
        return "default";
      case "Completed":
        return "outline";
      case "Cancelled":
        return "destructive";
    }
  };
  
  const getStatusDotColor = (status: PatientStatus) => {
    switch(status) {
      case 'Waiting': return 'bg-yellow-400';
      case 'With Doctor': return 'bg-blue-500';
      case 'Completed': return 'bg-green-500';
      case 'Cancelled': return 'bg-red-500';
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by patient name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("queueNumber")}>
                <Button variant="ghost">
                  Queue #<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead onClick={() => handleSort("name")}>
                <Button variant="ghost">
                  Patient Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead onClick={() => handleSort("arrivalTime")}>
                <Button variant="ghost">
                  Arrival Time <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">
                  {patient.queueNumber}
                </TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(patient.status)} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${getStatusDotColor(patient.status)}`}></span>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.doctor}</TableCell>
                <TableCell>
                  {format(patient.arrivalTime, "HH:mm")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {(["Waiting", "With Doctor", "Completed", "Cancelled"] as PatientStatus[]).map(status => (
                        <DropdownMenuItem
                            key={status}
                            onClick={() => onUpdateStatus(patient.id, status)}
                        >
                            Mark as {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
