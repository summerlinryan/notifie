"use client";

import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { CreateProjectDialog } from "./create-project-dialog";
import { ProjectCard, ProjectWithKeys } from "./project-card";

export function ProjectsContent() {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const { data: projects } = api.projects.getAll.useQuery();
  const utils = api.useUtils();

  const revokeApiKey = api.projects.revokeApiKey.useMutation({
    onSuccess: () => {
      toast.success("API key revoked");
      utils.projects.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const generateApiKey = api.projects.generateApiKey.useMutation({
    onSuccess: () => {
      toast.success("API key regenerated");
      utils.projects.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  if (!projects?.length) {
    return (
      <>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FolderPlus className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't created any projects yet. Create your first project to
            get started.
          </p>
          <Button onClick={() => setCreateProjectOpen(true)} className="mt-4">
            Create Project
          </Button>
        </div>
        <CreateProjectDialog
          open={createProjectOpen}
          onOpenChange={setCreateProjectOpen}
        />
      </>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project as ProjectWithKeys}
            onCopyKey={copyApiKey}
            onRevokeKey={(keyId) => revokeApiKey.mutate({ keyId })}
            onGenerateKey={(projectId) => generateApiKey.mutate({ projectId })}
          />
        ))}
      </div>

      <CreateProjectDialog
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
      />
    </>
  );
}
