"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";

interface CreateProjectDialogProps {
  open: boolean;
  onSubmit: (formData: {
    name: string;
    description: string;
    generateApiKey: boolean;
  }) => Promise<void>;
}

export function CreateProjectDialog({
  open,
  onSubmit,
}: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [generateApiKey, setGenerateApiKey] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit({ name, description, generateApiKey });
    setIsSubmitting(false);
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={open}>
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
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
