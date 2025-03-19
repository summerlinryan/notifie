import { ModeToggle } from "~/components/mode-toggle";
import { CreateProject } from "~/components/projects/create-project-dialog";
import { requireAuth } from "~/lib/auth-utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth("/projects");

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <CreateProject />
        </div>
      </div>
      {children}
    </div>
  );
}
