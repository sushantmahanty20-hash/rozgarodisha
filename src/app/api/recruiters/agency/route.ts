import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);
  const data = await prisma.recruiterProfile.findUnique({
    where: { id: profile!.id },
    include: {
      teamMembers: { where: { isActive: true }, orderBy: { createdAt: "asc" } },
      clients: { orderBy: { createdAt: "desc" } },
      documents: { orderBy: { createdAt: "desc" } },
      _count: {
        select: {
          candidates: true,
          requirements: true,
          submissions: true,
          placements: true,
        },
      },
    },
  });
  return ok(data);
}

export async function PUT(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const allowed = [
    "agencyName", "agencyType", "about", "logo", "website", "businessEmail",
    "businessPhone", "officeAddress", "city", "state", "country", "zipCode",
    "yearEstablished", "numEmployees", "numRecruiters", "industriesServed",
    "specializations", "geographicCoverage", "registrationNumber", "gstin",
    "panNumber", "recruitmentLicense",
  ];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key];
  }

  const updated = await prisma.recruiterProfile.update({
    where: { id: profile!.id },
    data,
  });
  return ok(updated);
}