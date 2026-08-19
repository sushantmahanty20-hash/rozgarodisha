import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user?.id || !(role === "ADMIN" || role === "SUPER_ADMIN")) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const status = body.status as string;
  const note = body.note as string | undefined;

  const valid = ["PENDING", "UNDER_REVIEW", "VERIFIED", "REJECTED", "SUSPENDED"];
  if (!valid.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const profile = await prisma.recruiterProfile.findUnique({ where: { id } });
  if (!profile) return Response.json({ error: "Recruiter not found" }, { status: 404 });

  const updated = await prisma.recruiterProfile.update({
    where: { id },
    data: {
      verificationStatus: status as never,
      verificationNote: note ?? null,
      verifiedAt: status === "VERIFIED" ? new Date() : status === "REJECTED" || status === "SUSPENDED" ? null : undefined,
    },
  });

  await prisma.notification.create({
    data: {
      userId: profile.userId,
      title: status === "VERIFIED" ? "Agency Verified" : "Verification Update",
      message:
        status === "VERIFIED"
          ? `Congratulations! ${profile.agencyName} is now verified.`
          : status === "REJECTED"
          ? `Your verification was rejected${note ? `: ${note}` : ""}`
          : status === "SUSPENDED"
          ? `Your agency has been suspended${note ? `: ${note}` : ""}`
          : `Your verification status is now ${status.replace(/_/g, " ").toLowerCase()}.`,
      type: "IN_APP",
    },
  });

  return Response.json({ data: updated });
}