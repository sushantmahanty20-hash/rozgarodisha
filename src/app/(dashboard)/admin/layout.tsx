import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { normalizeRole } from "@/lib/roles";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <DashboardLayout
      user={
        session?.user
          ? {
              name: session.user.name ?? "Admin",
              email: session.user.email ?? "",
              role: normalizeRole(session.user.role),
            }
          : undefined
      }
    >
      {children}
    </DashboardLayout>
  );
}