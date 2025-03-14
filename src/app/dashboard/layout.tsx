import type React from "react";
import { Sidebar } from "~/components/sidebar";
import { requireAuth } from "~/lib/auth-utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect if not authenticated
  await requireAuth("/dashboard");

  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full border-r border-border bg-background md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <main className="md:pl-72">{children}</main>
    </div>
  );
}
