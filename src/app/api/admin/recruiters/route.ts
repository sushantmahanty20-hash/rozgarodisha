import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user?.id || !(role === "ADMIN" || role === "SUPER_ADMIN")) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const recruiters = await prisma.recruiterProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true, createdAt: true } },
      _count: { select: { clients: true, candidates: true, placements: true } },
    },
  });
  return Response.json({ data: recruiters });
}