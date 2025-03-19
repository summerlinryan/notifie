import { requireAuth } from "~/lib/auth-utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth("/dashboard");
  return children;
}
