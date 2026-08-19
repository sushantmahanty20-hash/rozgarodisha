import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const requirements = await prisma.recruitmentRequirement.findMany({
    where: { recruiterProfileId: profile!.id },
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { companyName: true } },
      _count: { select: { submissions: true, interviews: true, placements: true } },
    },
  });
  return ok(requirements);
}

export async function POST(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.title || !body.clientId) return fail("Title and client are required", 400);

  const client = await prisma.recruiterClient.findFirst({
    where: { id: body.clientId, recruiterProfileId: profile!.id },
  });
  if (!client) return fail("Client not found", 404);

  const requirement = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: profile!.id,
      clientId: body.clientId,
      title: body.title,
      openings: Number(body.openings) || 1,
      description: body.description || null,
      responsibilities: body.responsibilities || null,
      requiredSkills: body.requiredSkills || null,
      preferredSkills: body.preferredSkills || null,
      experienceMin: body.experienceMin ? Number(body.experienceMin) : null,
      experienceMax: body.experienceMax ? Number(body.experienceMax) : null,
      education: body.education || null,
      salaryMin: body.salaryMin ? Number(body.salaryMin) : null,
      salaryMax: body.salaryMax ? Number(body.salaryMax) : null,
      salaryCurrency: body.salaryCurrency || "INR",
      location: body.location || null,
      workMode: body.workMode || null,
      employmentType: body.employmentType || "FULL_TIME",
      shift: body.shift || null,
      noticePeriod: body.noticePeriod || null,
      travelRequired: Boolean(body.travelRequired),
      joiningDeadline: body.joiningDeadline ? new Date(body.joiningDeadline) : null,
      priority: body.priority || "MEDIUM",
      clientContactId: body.clientContactId || null,
      recruiterAssignedId: body.recruiterAssignedId || null,
      status: body.status || "OPEN",
    },
  });
  return ok(requirement);
}