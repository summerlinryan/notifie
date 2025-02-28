"use client";

import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  PlusCircle,
  ArrowUpRight,
  Activity,
  Key,
  Bell,
  Zap,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "~/components/ui/progress";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

export default function DashboardPage() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: Activity,
      description: "3 created this month",
    },
    {
      title: "Active API Keys",
      value: "8",
      icon: Key,
      description: "2 revoked this month",
    },
    {
      title: "Notifications Sent",
      value: "1,234",
      icon: Bell,
      description: "Last 30 days",
    },
    {
      title: "TODOs Resolved",
      value: "76%",
      icon: CheckCircle2,
      description: "15% increase from last month",
    },
  ];

  // Mock data for recent projects
  const recentProjects = [
    {
      id: 1,
      name: "Customer Portal",
      createdAt: "2 days ago",
      apiKey: "sk_live_*************Hj7K",
      todos: 23,
      resolved: 18,
    },
    {
      id: 2,
      name: "Marketing Website",
      createdAt: "1 week ago",
      apiKey: "sk_live_*************9Lm2",
      todos: 15,
      resolved: 10,
    },
    {
      id: 3,
      name: "Mobile App",
      createdAt: "2 weeks ago",
      apiKey: "sk_live_*************Rt5P",
      todos: 42,
      resolved: 30,
    },
  ];

  // Mock data for notification channels
  const notificationChannels = [
    { name: "Slack", connected: true, icon: Zap },
    { name: "Discord", connected: true, icon: Bell },
    { name: "Email", connected: true, icon: Mail },
    { name: "SMS", connected: false, icon: Phone },
  ];

  // Mock data for TODO trends
  const todoTrends = [
    { name: "Week 1", created: 40, resolved: 24 },
    { name: "Week 2", created: 30, resolved: 35 },
    { name: "Week 3", created: 20, resolved: 25 },
    { name: "Week 4", created: 27, resolved: 22 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-5 w-5 ${
                  index === 0
                    ? "text-blue-500"
                    : index === 1
                      ? "text-purple-500"
                      : index === 2
                        ? "text-amber-500"
                        : "text-emerald-500"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="pt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="projects" className="mb-8">
        <TabsList>
          <TabsTrigger value="projects">Recent Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <div className="grid gap-4">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{project.name}</CardTitle>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Created {project.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">API Key:</span>
                      <code className="font-mono">{project.apiKey}</code>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">TODOs:</span>
                      <span>{project.todos}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Resolved:</span>
                      <span>{project.resolved}</span>
                    </div>
                    <Progress
                      value={(project.resolved / project.todos) * 100}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>TODO Trends</CardTitle>
              <CardDescription>
                Created vs Resolved TODOs over the past 4 weeks
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={todoTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="created" fill="#8884d8" name="Created" />
                  <Bar dataKey="resolved" fill="#82ca9d" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Status of your connected notification services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {notificationChannels.map((channel) => (
              <div key={channel.name} className="flex items-center gap-2">
                <channel.icon
                  className={`h-5 w-5 ${channel.connected ? "text-green-500" : "text-red-500"}`}
                />
                <span>{channel.name}</span>
                {channel.connected ? (
                  <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="ml-auto h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
