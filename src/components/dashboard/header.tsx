"use client";
import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
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
import { Siren } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

type DashboardHeaderProps = {
  title: string;
};

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const [isSosDialogOpen, setIsSosDialogOpen] = React.useState(false);

  const handleSosConfirm = () => {
    // In a real application, this would trigger an emergency protocol.
    console.log("SOS Confirmed! Dispatching help.");
    setIsSosDialogOpen(false);
    // Here you could add a toast notification to confirm the action
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/50 backdrop-blur-md px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <AlertDialog open={isSosDialogOpen} onOpenChange={setIsSosDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-8 w-8">
              <Siren className="h-4 w-4" />
              <span className="sr-only">SOS</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Emergency</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to trigger the SOS alert? This action
                cannot be undone and will dispatch emergency personnel.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSosConfirm}>
                Confirm SOS
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ThemeToggle />
      </div>
    </header>
  );
}
