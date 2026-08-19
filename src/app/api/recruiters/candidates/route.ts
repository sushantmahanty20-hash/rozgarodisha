import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || undefined;
  const consent = searchParams.get("consent") || undefined;
  const status = searchParams.get("status") || undefined;

  const candidates = await prisma.recruiterCandidate.findMany({
    where: {
      recruiterProfileId: profile!.id,
      ...(q
        ? { OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { skills: { contains: q, mode: "insensitive" } },
            { currentTitle: { contains: q, mode: "insensitive" } },
          ] }
        : {}),
      ...(consent ? { consentStatus: consent as never } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { submissions: true } } },
  });
  return ok(candidates);
}

export async function POST(request: NextRequest) {
  const { session, profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.name) return fail("Candidate name is required", 400);

  const candidate = await prisma.recruiterCandidate.create({
    data: {
      recruiterProfileId: profile!.id,
      createdBy: session?.user?.id || null,
      name: body.name,
      phone: body.phone || null,
      email: body.email || null,
      location: body.location || null,
      currentTitle: body.currentTitle || null,
      totalExperienceYrs: body.totalExperienceYrs ? Number(body.totalExperienceYrs) : null,
      skills: body.skills || null,
      education: body.education || null,
      expectedSalary: body.expectedSalary ? Number(body.expectedSalary) : null,
      currentSalary: body.currentSalary ? Number(body.currentSalary) : null,
      noticePeriod: body.noticePeriod || null,
      preferredLocation: body.preferredLocation || null,
      resumeUrl: body.resumeUrl || null,
      source: body.source || "AGENCY_DATABASE",
      sourceDetail: body.sourceDetail || null,
      status: body.status || "AVAILABLE",
      availability: body.availability || null,
      lastContactedAt: body.lastContactedAt ? new Date(body.lastContactedAt) : null,
      consentStatus: body.consentStatus || "NO_CONSENT",
      consentDate: body.consentDate ? new Date(body.consentDate) : null,
      consentPurpose: body.consentPurpose || null,
      consentExpiresAt: body.consentExpiresAt ? new Date(body.consentExpiresAt) : null,
      isMarketplaceVisible: Boolean(body.isMarketplaceVisible),
      notes: body.notes || null,
    },
  });
  return ok(candidate);
}