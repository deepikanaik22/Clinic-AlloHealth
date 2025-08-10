"use client";

import * as React from "react";
import {
  Home,
  Users,
  CalendarDays,
  Bot,
  LogOut,
  Settings,
  Award,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { DashboardHeader } from "./header";
import { OverviewCards } from "../overview/cards";
import { QueueManager } from "../queue/queue-manager";
import { AppointmentScheduler } from "../appointments/appointment-scheduler";
import { WaitTimePredictor } from "../wait-time/wait-time-predictor";
import { DoctorRankings } from "../rankings/doctor-rankings";

type View = "overview" | "queue" | "appointments" | "predictor" | "rankings";

export function Dashboard() {
  const [activeView, setActiveView] = React.useState<View>("overview");

  const viewTitles: Record<View, string> = {
    overview: "Dashboard Overview",
    queue: "Patient Queue Management",
    appointments: "Appointment Scheduler",
    predictor: "Wait Time Predictor",
    rankings: "Doctor Rankings",
  };

  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <OverviewCards />;
      case "queue":
        return <QueueManager />;
      case "appointments":
        return <AppointmentScheduler />;
      case "predictor":
        return <WaitTimePredictor />;
      case "rankings":
        return <DoctorRankings />;
      default:
        return <OverviewCards />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Icons.logo className="size-8 text-primary" />
            <h1 className="text-xl font-semibold">ClinicFlow</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("overview")}
                isActive={activeView === "overview"}
                tooltip="Dashboard Overview"
              >
                <Home />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("queue")}
                isActive={activeView === "queue"}
                tooltip="Patient Queue"
              >
                <Users />
                <span>Patient Queue</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("appointments")}
                isActive={activeView === "appointments"}
                tooltip="Appointments"
              >
                <CalendarDays />
                <span>Appointments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("predictor")}
                isActive={activeView === "predictor"}
                tooltip="Wait Time Predictor"
              >
                <Bot />
                <span>AI Predictor</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("rankings")}
                isActive={activeView === "rankings"}
                tooltip="Doctor Rankings"
              >
                <Award />
                <span>Rankings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="woman smiling" />
                                <AvatarFallback>FD</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Front Desk</span>
                        </div>
                        <LogOut className="size-4" />
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader title={viewTitles[activeView]} />
        <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          {renderView()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
