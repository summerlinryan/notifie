"use client";

import { type ApiKey, type Project } from "@prisma/client";
import {
  Copy,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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

export interface ProjectWithKeys extends Project {
  apiKeys: (ApiKey & { status: "active" | "revoked" })[];
}

interface ProjectCardProps {
  project: ProjectWithKeys;
  onCopyKey: (key: string) => void;
  onRevokeKey: (keyId: string) => void;
  onGenerateKey: (projectId: number) => void;
}

export function ProjectCard({
  project,
  onCopyKey,
  onRevokeKey,
  onGenerateKey,
}: ProjectCardProps) {
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const activeApiKey = project.apiKeys.find((key) => key.status === "active");
  const revokedKeys = project.apiKeys.filter((key) => key.status === "revoked");

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                {project.name}
                {activeApiKey && (
                  <Badge
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Active
                  </Badge>
                )}
              </CardTitle>
              {project.description && (
                <CardDescription>{project.description}</CardDescription>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current-key" className="w-full">
            <TabsList>
              <TabsTrigger value="current-key">Current Key</TabsTrigger>
              <TabsTrigger value="key-history">Key History</TabsTrigger>
            </TabsList>
            <TabsContent value="current-key">
              {activeApiKey ? (
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">
                      API Key
                    </div>
                    <div className="relative rounded-md bg-muted p-3">
                      <code className="text-sm">{activeApiKey.keyId}</code>
                      <button
                        onClick={() => onCopyKey(activeApiKey.keyId)}
                        className="absolute right-2 top-2 rounded p-1 hover:bg-muted-foreground/10"
                        title="Copy to clipboard"
                        type="button"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-border"
                      onClick={() => setConfirmRegenerate(true)}
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-cyan-500" />
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-border"
                      onClick={() => setConfirmRevoke(true)}
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
                  <Button
                    onClick={() => setConfirmRegenerate(true)}
                    className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Generate New API Key
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="key-history">
              {revokedKeys.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>API Key</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revokedKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-mono">{key.keyId}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-neutral-600 hover:bg-neutral-700"
                          >
                            {key.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(key.createdAt).toLocaleDateString()}
                        </TableCell>
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
            Created {new Date(project.createdAt).toLocaleDateString()}
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

      {/* Revoke Confirmation Dialog */}
      <Dialog open={confirmRevoke} onOpenChange={setConfirmRevoke}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this API key? This action cannot
              be undone and will immediately invalidate the key.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmRevoke(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (activeApiKey) {
                  onRevokeKey(activeApiKey.keyId);
                }
                setConfirmRevoke(false);
              }}
            >
              Revoke Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerate Confirmation Dialog */}
      <Dialog open={confirmRegenerate} onOpenChange={setConfirmRegenerate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              {activeApiKey
                ? "This will create a new API key and revoke the current one. Are you sure you want to continue?"
                : "This will generate a new API key for your project. Continue?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmRegenerate(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onGenerateKey(project.id);
                setConfirmRegenerate(false);
              }}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
