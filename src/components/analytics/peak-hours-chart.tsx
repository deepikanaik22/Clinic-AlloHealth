
"use client"

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Patient } from "@/lib/types";

type PeakHoursChartProps = {
  patients: Patient[];
};

export function PeakHoursChart({ patients }: PeakHoursChartProps) {
  const data = React.useMemo(() => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
    const patientCounts = hours.map((hour) => {
      const count = patients.filter((p) => new Date(p.arrivalTime).getHours() === hour).length;
      return {
        hour: `${hour}:00`,
        patients: count,
      };
    });
    return patientCounts;
  }, [patients]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Load by Hour</CardTitle>
        <CardDescription>
          Distribution of patient arrivals throughout the day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Bar dataKey="patients" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
