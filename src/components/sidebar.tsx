"use client";

import { Home, Key, Layers, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Projects",
    icon: Layers,
    href: "/projects",
    color: "text-violet-500",
  },
  {
    label: "API Keys",
    icon: Key,
    href: "/api-keys",
    color: "text-pink-700",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 border-r border-border bg-background py-4 text-foreground">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="mb-10 flex items-center pl-3">
          <div className="relative mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
            <span className="font-bold text-white">N</span>
          </div>
          <h1 className="text-xl font-bold">Notifie</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-muted",
                pathname === route.href ? "bg-muted" : "text-muted-foreground",
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center pl-3"
        onClick={() => {
          signOut({ redirectTo: "/" });
        }}
      >
        <LogOut className="mr-3 h-5 w-5 text-red-500" />
        Logout
      </div>
    </div>
  );
}
