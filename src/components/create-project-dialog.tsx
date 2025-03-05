"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [generateApiKey, setGenerateApiKey] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Create a new project to manage your notifications.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">
                Description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter project description"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-1.5">
                <Label htmlFor="generate-api-key">Generate API Key</Label>
                <p className="text-sm text-muted-foreground">
                  Create an API key for this project
                </p>
              </div>
              <Switch
                id="generate-api-key"
                checked={generateApiKey}
                onCheckedChange={setGenerateApiKey}
              />
            </div>
            {generateApiKey && (
              <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                <p>
                  Your API key will be shown only once. Make sure to save it
                  securely and never share it with others. Only use this API key
                  for this project.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
