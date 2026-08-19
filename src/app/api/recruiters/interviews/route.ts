import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const interviews = await prisma.recruiterInterview.findMany({
    where: { recruiterProfileId: profile!.id },
    orderBy: { interviewDate: "desc" },
    include: {
      candidate: { select: { name: true, phone: true } },
      client: { select: { companyName: true } },
      requirement: { select: { title: true } },
    },
  });
  return ok(interviews);
}

export async function POST(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.candidateId || !body.interviewDate) return fail("Candidate and date are required", 400);

  const interview = await prisma.recruiterInterview.create({
    data: {
      recruiterProfileId: profile!.id,
      clientId: body.clientId || null,
      requirementId: body.requirementId || null,
      submissionId: body.submissionId || null,
      candidateId: body.candidateId,
      interviewDate: new Date(body.interviewDate),
      interviewType: body.interviewType || "VIDEO",
      location: body.location || null,
      meetingUrl: body.meetingUrl || null,
      interviewer: body.interviewer || null,
      feedback: body.feedback || null,
      status: body.status || "SCHEDULED",
    },
  });

  if (body.submissionId) {
    await prisma.candidateSubmission.update({
      where: { id: body.submissionId },
      data: {
        status: "INTERVIEW",
        history: { create: { fromStatus: "SHORTLISTED", toStatus: "INTERVIEW", changedBy: profile!.userId, reason: "Interview scheduled" } },
      },
    });
  }

  return ok(interview);
}