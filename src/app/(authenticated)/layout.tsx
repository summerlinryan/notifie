import { Sidebar } from "~/components/sidebar";
import { requireAuth } from "~/lib/auth-utils";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth("/dashboard");

  return (
    <div className="flex h-full">
      <div className="z-[40] hidden h-full border-r border-border bg-background md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <div className="flex-1 md:pl-72">{children}</div>
    </div>
  );
}
