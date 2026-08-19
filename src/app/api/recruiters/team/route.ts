import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const team = await prisma.recruiterTeamMember.findMany({
    where: { recruiterProfileId: profile!.id, isActive: true },
    orderBy: { createdAt: "asc" },
  });
  return ok(team);
}

export async function POST(request: NextRequest) {
  const { session, profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.name || !body.email || !body.role) return fail("Name, email and role are required", 400);

  const member = await prisma.recruiterTeamMember.create({
    data: {
      recruiterProfileId: profile!.id,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      designation: body.designation || "Recruiter",
      role: body.role || "RECRUITER",
      isActive: true,
      userId: session?.user?.id || null,
    },
  });
  return ok(member);
}