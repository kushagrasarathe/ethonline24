import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:max-w-7xl mx-auto ">
      <div>{children}</div>
      <Toaster />
    </div>
  );
}
