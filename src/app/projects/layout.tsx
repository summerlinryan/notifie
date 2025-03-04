import { requireAuth } from "~/lib/auth-utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect the projects route
  await requireAuth("/projects");

  return <>{children}</>;
}
