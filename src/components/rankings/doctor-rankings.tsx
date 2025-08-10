"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Medal } from "lucide-react";
import { mockDoctors } from "@/lib/data";

export function DoctorRankings() {
  const sortedDoctors = React.useMemo(() => {
    return [...mockDoctors].sort((a, b) => b.rating - a.rating);
  }, []);

  const getRankColor = (rank: number) => {
    if (rank === 0) return "text-yellow-400"; // Gold
    if (rank === 1) return "text-gray-400"; // Silver
    if (rank === 2) return "text-yellow-600"; // Bronze
    return "text-muted-foreground";
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Rated Doctors</CardTitle>
          <CardDescription>
            Based on patient feedback and satisfaction scores.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedDoctors.map((doctor, index) => (
            <Card key={doctor.id} className="p-4 flex items-center gap-4">
              <div className="flex items-center justify-center w-10">
                <Medal className={`h-8 w-8 ${getRankColor(index)}`} />
              </div>
              <Avatar className="h-16 w-16">
                 <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="doctor portrait" />
                <AvatarFallback>{doctor.name.charAt(3).toUpperCase()}{doctor.name.charAt(4).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-lg font-semibold">{doctor.name}</p>
                <Badge variant="secondary">{doctor.specialization}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-bold">{doctor.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
