import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const offers = await prisma.recruiterOffer.findMany({
    where: { recruiterProfileId: profile!.id },
    orderBy: { createdAt: "desc" },
    include: {
      candidate: { select: { name: true } },
      client: { select: { companyName: true } },
      requirement: { select: { title: true } },
    },
  });
  return ok(offers);
}

export async function POST(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.candidateId || !body.clientId || !body.position) {
    return fail("Candidate, client and position are required", 400);
  }

  const offer = await prisma.recruiterOffer.create({
    data: {
      recruiterProfileId: profile!.id,
      clientId: body.clientId,
      requirementId: body.requirementId || null,
      submissionId: body.submissionId || null,
      candidateId: body.candidateId,
      offerDate: body.offerDate ? new Date(body.offerDate) : new Date(),
      position: body.position,
      salary: body.salary ? Number(body.salary) : null,
      joiningDate: body.joiningDate ? new Date(body.joiningDate) : null,
      status: body.status || "PENDING",
      notes: body.notes || null,
    },
  });

  if (body.submissionId) {
    await prisma.candidateSubmission.update({
      where: { id: body.submissionId },
      data: {
        status: "OFFER",
        history: { create: { fromStatus: "SELECTED", toStatus: "OFFER", changedBy: profile!.userId, reason: "Offer extended" } },
      },
    });
  }

  return ok(offer);
}