"use client"

import { cn } from "~/lib/utils"
import { Home, Layers, Key } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r border-border text-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10">
          <div className="relative w-8 h-8 mr-4 rounded-full bg-indigo-600 flex items-center justify-center">
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
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-muted rounded-lg transition",
                pathname === route.href ? "bg-muted" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

