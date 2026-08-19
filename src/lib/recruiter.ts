import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getRecruiterContext() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { session: null, profile: null, error: { status: 401, message: "Unauthorized" } };
  }
  const profile = await prisma.recruiterProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile) {
    return { session, profile: null, error: { status: 403, message: "Recruiter profile not found. Register as a recruiter first." } };
  }
  return { session, profile, error: null };
}

export function agencyScope(profileId: string) {
  return { recruiterProfileId: profileId };
}

export function ok(data: unknown) {
  return Response.json({ data });
}

export function fail(error: string, status = 500) {
  return Response.json({ error }, { status });
}