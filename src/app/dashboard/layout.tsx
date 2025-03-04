import type React from "react";
import { Sidebar } from "~/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full border-r border-border bg-background md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
        <div className="flex-1">testing</div>
      </div>
      <main className="md:pl-72">{children}</main>
    </div>
  );
}
