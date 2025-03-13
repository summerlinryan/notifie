import { Sidebar } from "~/components/sidebar";
import SkeletonWrapper from "~/components/skeleton-wrapper";
import { requireAuth } from "~/lib/auth-utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth("/projects");

  return (
    <div className="flex h-full">
      <div className="z-[40] hidden h-full border-r border-border bg-background md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <SkeletonWrapper>
        <div className="flex-1 md:pl-72">{children}</div>
      </SkeletonWrapper>
    </div>
  );
}
