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
  BookHeart,
  LineChart,
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
import { HealthFeed } from "../health-feed/health-feed";
import { SettingsPage } from "../settings/settings-page";
import { AnalyticsPage } from "../analytics/analytics-page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { mockPatients, mockDoctors, mockAppointments } from "@/lib/data";
import type { Patient, PatientPriority } from "@/lib/types";

type View =
  | "overview"
  | "queue"
  | "appointments"
  | "predictor"
  | "rankings"
  | "feed"
  | "settings"
  | "analytics";

export function Dashboard() {
  const [activeView, setActiveView] = React.useState<View>("overview");
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const { toast } = useToast();
  const [patients, setPatients] = React.useState<Patient[]>(mockPatients);
  
  const addPatient = (name: string, doctor: string, priority: PatientPriority) => {
    const newPatient: Patient = {
      id: patients.length + 1,
      name,
      queueNumber: Math.max(...patients.map(p => p.queueNumber), 0) + 1,
      status: "Waiting",
      arrivalTime: new Date(),
      doctor,
      priority,
    };
    setPatients((prev) => [...prev, newPatient]);
  };
  
  const updatePatientStatus = (patientId: number, status: Patient['status']) => {
    setPatients(prev => prev.map(p => p.id === patientId ? {...p, status} : p));
  };
  
  const updatePatientPriority = (patientId: number, priority: PatientPriority) => {
    setPatients(prev => prev.map(p => p.id === patientId ? {...p, priority} : p));
     toast({
      title: "Priority Updated",
      description: `Patient's priority has been set to ${priority}.`,
    });
  }

  const viewTitles: Record<View, string> = {
    overview: "Dashboard Overview",
    queue: "Patient Queue Management",
    appointments: "Appointment Scheduler",
    predictor: "Wait Time Predictor",
    rankings: "Doctor Rankings",
    feed: "Today's Health Feed",
    settings: "Settings",
    analytics: "Clinic Analytics",
  };

  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <OverviewCards patients={patients} />;
      case "queue":
        return <QueueManager patients={patients} addPatient={addPatient} updatePatientStatus={updatePatientStatus} updatePatientPriority={updatePatientPriority} doctors={mockDoctors} />;
      case "appointments":
        return <AppointmentScheduler />;
      case "predictor":
        return <WaitTimePredictor />;
      case "rankings":
        return <DoctorRankings />;
      case "feed":
        return <HealthFeed />;
      case "analytics":
        return <AnalyticsPage patients={patients} doctors={mockDoctors} appointments={mockAppointments} />;
      case "settings":
        return <SettingsPage />;
      default:
        return <OverviewCards patients={patients} />;
    }
  };

  const handleLogout = () => {
    console.log("User logged out.");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setIsLoggedIn(false);
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveView("overview");
  }

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">You have been logged out.</h1>
          <p className="text-muted-foreground">Thank you for using ClinicFlow.</p>
          <Button onClick={handleLogin}>Log Back In</Button>
        </div>
      </div>
    )
  }

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
                onClick={() => setActiveView("analytics")}
                isActive={activeView === "analytics"}
                tooltip="Analytics"
              >
                <LineChart />
                <span>Analytics</span>
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
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("feed")}
                isActive={activeView === "feed"}
                tooltip="Health Feed"
              >
                <BookHeart />
                <span>Health Feed</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                onClick={() => setActiveView("settings")}
                isActive={activeView === "settings"}
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src="https://placehold.co/40x40.png"
                            alt="User"
                            data-ai-hint="woman smiling"
                          />
                          <AvatarFallback>FD</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Front Desk</span>
                      </div>
                      <LogOut className="size-4" />
                    </div>
                  </SidebarMenuButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the login page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader title={viewTitles[activeView]} />
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {renderView()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
