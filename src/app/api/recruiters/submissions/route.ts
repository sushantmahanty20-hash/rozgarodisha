import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const requirementId = searchParams.get("requirementId") || undefined;

  const submissions = await prisma.candidateSubmission.findMany({
    where: {
      recruiterProfileId: profile!.id,
      ...(status ? { status: status as never } : {}),
      ...(requirementId ? { requirementId } : {}),
    },
    orderBy: { updatedAt: "desc" },
    include: {
      candidate: true,
      client: { select: { companyName: true } },
      requirement: { select: { title: true } },
      history: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  return ok(submissions);
}

export async function POST(request: NextRequest) {
  const { session, profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.candidateId || !body.requirementId) {
    return fail("Candidate and requirement are required", 400);
  }

  const requirement = await prisma.recruitmentRequirement.findFirst({
    where: { id: body.requirementId, recruiterProfileId: profile!.id },
  });
  const candidate = await prisma.recruiterCandidate.findFirst({
    where: { id: body.candidateId, recruiterProfileId: profile!.id },
  });
  if (!requirement || !candidate) return fail("Requirement or candidate not found", 404);

  const existing = await prisma.candidateSubmission.findFirst({
    where: { requirementId: body.requirementId, candidateId: body.candidateId },
  });
  if (existing) return fail("This candidate is already submitted for this requirement", 409);

  const submission = await prisma.candidateSubmission.create({
    data: {
      recruiterProfileId: profile!.id,
      clientId: requirement.clientId,
      requirementId: requirement.id,
      candidateId: candidate.id,
      submittedBy: session?.user?.id || null,
      submissionDate: body.submissionDate ? new Date(body.submissionDate) : new Date(),
      expectedSalary: body.expectedSalary ? Number(body.expectedSalary) : null,
      noticePeriod: body.noticePeriod || null,
      recruiterNotes: body.recruiterNotes || null,
      consentStatus: body.consentStatus || candidate.consentStatus,
      resumeVersion: body.resumeVersion || null,
      status: body.status || "SUBMITTED",
      history: {
        create: {
          fromStatus: "SOURCED",
          toStatus: body.status || "SUBMITTED",
          changedBy: session?.user?.id || null,
          reason: "Initial submission",
        },
      },
    },
    include: { candidate: true, client: true, requirement: true },
  });

  await prisma.notification.create({
    data: {
      userId: profile!.userId,
      title: "Candidate Submitted",
      message: `${candidate.name} submitted for ${requirement.title}`,
      type: "IN_APP",
    },
  });

  return ok(submission);
}