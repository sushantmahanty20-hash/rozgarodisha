import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const submission = await prisma.candidateSubmission.findFirst({
    where: { id, recruiterProfileId: profile!.id },
  });
  if (!submission) return fail("Submission not found", 404);

  const body = await request.json();
  const toStatus = body.status as string;
  if (!toStatus) return fail("Status is required", 400);

  const updated = await prisma.candidateSubmission.update({
    where: { id },
    data: {
      status: toStatus as never,
      history: {
        create: {
          fromStatus: submission.status,
          toStatus,
          changedBy: session?.user?.id || null,
          reason: body.reason || null,
        },
      },
    },
    include: { candidate: true, requirement: true },
  });

  await prisma.notification.create({
    data: {
      userId: profile!.userId,
      title: "Pipeline Updated",
      message: `${updated.candidate.name} moved to ${toStatus} for ${updated.requirement.title}`,
      type: "IN_APP",
    },
  });

  return ok(updated);
}