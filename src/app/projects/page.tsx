import { Suspense } from "react";
import { ProjectsContent } from "~/components/projects-content";
import { api } from "~/trpc/server";
import Loading from "./loading";

export default async function ProjectsPage() {
  // Prefetch on server - this data will be used to hydrate the client
  await api.projects.getAll.prefetch();

  return (
    <main className="p-8">
      <Suspense fallback={<Loading />}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
