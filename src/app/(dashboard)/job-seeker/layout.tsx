import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { normalizeRole } from "@/lib/roles";

export default async function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const dbUser = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true, phone: true, avatar: true, role: true },
      })
    : null;

  return (
    <DashboardLayout
      user={
        dbUser
          ? {
              name: dbUser.name ?? "Candidate",
              email: dbUser.email ?? "",
              avatar: dbUser.avatar ?? undefined,
              role: normalizeRole(dbUser.role),
            }
          : undefined
      }
    >
      {children}
    </DashboardLayout>
  );
}