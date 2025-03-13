"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import SubmitButton from "./submit-button";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  description: z.string().optional(),
  generateApiKey: z.boolean().default(true),
});

export function CreateProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const utils = api.useUtils();

  const createProject = api.projects.create.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Project created successfully");
        if (data.apiKey) {
          setApiKey(data.apiKey);
        }

        utils.projects.getAll.invalidate();
      } else {
        toast.error(data.error || "Failed to create project");
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      generateApiKey: true,
    },
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset({
        name: "",
        description: "",
        generateApiKey: true,
      });
      setApiKey(null);
    }

    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    createProject.mutate({
      name: data.name,
      description: data.description,
      generateApiKey: data.generateApiKey,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to manage your notifications.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter project description"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="generateApiKey"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Generate API Key</FormLabel>
                    <FormDescription>
                      Create an API key for this project
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("generateApiKey") && (
              <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                <p>
                  Your API key will be shown only once. Make sure to save it
                  securely and never share it with others. Only use this API key
                  for this project.
                </p>
              </div>
            )}

            {apiKey && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 shrink-0" />
                  <p className="font-semibold">Your API Key is Ready</p>
                </div>
                <div className="mt-2">
                  <p className="mb-2">
                    Here's your API key - make sure to copy it now:
                  </p>
                  <div className="relative">
                    <code className="block w-full rounded bg-green-100 p-2 font-mono dark:bg-green-900">
                      {apiKey}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        toast.success("API key copied to clipboard");
                      }}
                      className="absolute right-2 top-2 rounded bg-green-200 p-1 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700"
                      title="Copy to clipboard"
                      type="button"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <SubmitButton
                defaultText="Create Project"
                pendingText="Creating..."
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
