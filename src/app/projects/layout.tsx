import { requireAuth } from "~/lib/auth-utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth("/projects");
  return <>{children}</>;
}
