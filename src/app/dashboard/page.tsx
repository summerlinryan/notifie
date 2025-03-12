"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CreateProjectDialog } from "~/components/create-project-dialog";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createProject } from "~/app/actions/create-project";
import { toast } from "sonner";

export default function DashboardPage() {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      description: "Active projects",
      icon: "📊",
    },
    {
      title: "Total Notifications",
      value: "1,234",
      description: "Last 30 days",
      icon: "🔔",
    },
    {
      title: "Success Rate",
      value: "99.9%",
      description: "Last 30 days",
      icon: "✅",
    },
    {
      title: "Active Users",
      value: "5,678",
      description: "Last 30 days",
      icon: "👥",
    },
  ];

  const notificationData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 700 },
    { name: "Jun", value: 900 },
  ];

  const projectData = [
    { name: "Project A", value: 400 },
    { name: "Project B", value: 300 },
    { name: "Project C", value: 600 },
    { name: "Project D", value: 800 },
    { name: "Project E", value: 700 },
  ];

  return (
    <div className="relative h-full">
      <main>
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button
                className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setCreateProjectOpen(true)}
              >
                <PlusCircle className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <span className="text-2xl">{stat.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notifications Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={notificationData}>
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366f1"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#6366f1"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <CreateProjectDialog
        open={createProjectOpen}
        onSubmit={createProject}
        onOpenChange={setCreateProjectOpen}
      />
    </div>
  );
}
