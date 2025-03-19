"use client";

import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "~/app/(authenticated)/projects/loading";
import { CreateProject } from "~/components/projects/create-project-dialog";
import {
  ProjectCard,
  ProjectWithKeys,
} from "~/components/projects/project-card";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function ProjectsPage() {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const { data: projects, isLoading } = api.projects.getAll.useQuery();
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

  // Show loading state for subsequent fetches
  if (isLoading) {
    return <Loading />;
  }

  if (!projects?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FolderPlus className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't created any projects yet. Create your first project to get
          started.
        </p>
        <Button onClick={() => setCreateProjectOpen(true)} className="mt-4">
          Create Project
        </Button>
      </div>
    );
  }

  return (
    <>
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

      <CreateProject
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
      />
    </>
  );
}
