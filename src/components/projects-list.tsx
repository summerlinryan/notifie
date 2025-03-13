"use client";

import { api } from "~/trpc/react";
// ... other imports

export function ProjectsList() {
  const { data: projects } = api.projects.getAll.useQuery();

  if (!projects?.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
