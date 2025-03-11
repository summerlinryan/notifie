"use client";

import {
  Copy,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useState } from "react";

import { CreateProjectDialog } from "~/components/create-project-dialog";
import { ModeToggle } from "~/components/mode-toggle";
import { Sidebar } from "~/components/sidebar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { createProject } from "../actions/create-project";

export default function ProjectsPage() {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Customer Portal",
      description: "Notifications for customer support platform",
      createdAt: "2 days ago",
      apiKey: {
        key: "sk_live_*************Hj7K",
        status: "active",
        createdAt: "2 days ago",
      },
      apiKeyHistory: [
        {
          key: "sk_live_*************Rt5P",
          status: "revoked",
          revokedAt: "3 days ago",
        },
        {
          key: "sk_live_*************9Lm2",
          status: "revoked",
          revokedAt: "1 week ago",
        },
      ],
    },
    {
      id: 2,
      name: "Marketing Website",
      description: "Notifications for marketing campaigns",
      createdAt: "1 week ago",
      apiKey: {
        key: "sk_live_*************9Lm2",
        status: "active",
        createdAt: "1 week ago",
      },
      apiKeyHistory: [],
    },
    {
      id: 3,
      name: "Mobile App",
      description: "Push notifications for mobile application",
      createdAt: "2 weeks ago",
      apiKey: null,
      apiKeyHistory: [
        {
          key: "sk_live_*************Kp3T",
          status: "revoked",
          revokedAt: "1 day ago",
        },
      ],
    },
  ];

  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full border-r border-border bg-background md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
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

          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {project.name}
                        {project.apiKey && (
                          <Badge
                            variant={
                              project.apiKey.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              project.apiKey.status === "active"
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "bg-neutral-600 hover:bg-neutral-700"
                            }
                          >
                            {project.apiKey.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit project</DropdownMenuItem>
                        <DropdownMenuItem>View analytics</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          Delete project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="current-key" className="w-full">
                    <TabsList>
                      <TabsTrigger value="current-key">
                        Current API Key
                      </TabsTrigger>
                      <TabsTrigger value="key-history">Key History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="current-key">
                      {project.apiKey ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-2 text-sm font-medium">
                              API Key
                            </h4>
                            <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                              <code className="flex-1 font-mono text-sm">
                                {project.apiKey.key}
                              </code>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy API key</span>
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 border-border"
                            >
                              <RefreshCw className="h-3.5 w-3.5 text-cyan-500" />
                              Regenerate API Key
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 border-border"
                            >
                              <Shield className="h-3.5 w-3.5 text-red-500" />
                              Revoke API Key
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-4 text-center">
                          <p className="mb-4 text-muted-foreground">
                            No active API key for this project.
                          </p>
                          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                            <PlusCircle className="h-4 w-4" />
                            Generate New API Key
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="key-history">
                      {project.apiKeyHistory.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>API Key</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Revoked At</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {project.apiKeyHistory.map((historyItem, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono">
                                  {historyItem.key}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="secondary"
                                    className="bg-neutral-600 hover:bg-neutral-700"
                                  >
                                    {historyItem.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{historyItem.revokedAt}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="py-4 text-center">
                          <p className="text-muted-foreground">
                            No API key history available.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground">
                    Created {project.createdAt}
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Manage Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
