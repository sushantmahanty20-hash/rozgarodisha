import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;

  const placements = await prisma.recruiterPlacement.findMany({
    where: { recruiterProfileId: profile!.id, ...(status ? { status: status as never } : {}) },
    orderBy: { placementDate: "desc" },
    include: {
      candidate: { select: { name: true } },
      client: { select: { companyName: true } },
      requirement: { select: { title: true } },
      fees: true,
    },
  });
  return ok(placements);
}

export async function POST(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.candidateId || !body.clientId || !body.position || !body.joiningDate) {
    return fail("Candidate, client, position and joining date are required", 400);
  }

  const placement = await prisma.recruiterPlacement.create({
    data: {
      recruiterProfileId: profile!.id,
      clientId: body.clientId,
      requirementId: body.requirementId || null,
      submissionId: body.submissionId || null,
      candidateId: body.candidateId,
      position: body.position,
      joiningDate: new Date(body.joiningDate),
      salary: body.salary ? Number(body.salary) : null,
      feeAmount: body.feeAmount ? Number(body.feeAmount) : null,
      feeType: body.feeType || "PERCENTAGE_OF_SALARY",
      recruiterAssignedId: body.recruiterAssignedId || null,
      placementDate: body.placementDate ? new Date(body.placementDate) : new Date(),
      guaranteePeriodDays: body.guaranteePeriodDays ? Number(body.guaranteePeriodDays) : 90,
      status: body.status || "ACTIVE",
      fees: body.feeAmount
        ? {
            create: {
              recruiterProfileId: profile!.id,
              clientId: body.clientId,
              requirementId: body.requirementId || null,
              submissionId: body.submissionId || null,
              candidateId: body.candidateId,
              feeType: body.feeType || "PERCENTAGE_OF_SALARY",
              salaryAmount: body.salary ? Number(body.salary) : null,
              expectedFee: Number(body.feeAmount),
              status: "EXPECTED",
            },
          }
        : undefined,
    },
  });

  if (body.submissionId) {
    await prisma.candidateSubmission.update({
      where: { id: body.submissionId },
      data: {
        status: "JOINED",
        history: { create: { fromStatus: "OFFER_ACCEPTED", toStatus: "JOINED", changedBy: profile!.userId, reason: "Candidate joined" } },
      },
    });
  }

  return ok(placement);
}