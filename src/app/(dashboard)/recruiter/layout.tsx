import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { RecruiterLayout, type RecruiterUser } from "@/components/layout/recruiter-layout";

export default async function RecruiterPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  let user: RecruiterUser | undefined;

  if (session?.user?.id) {
    const profile = await prisma.recruiterProfile.findUnique({
      where: { userId: session.user.id },
      select: {
        agencyName: true,
        slug: true,
        logo: true,
        verificationStatus: true,
        verifiedAt: true,
      },
    });
    if (profile) {
      user = {
        name: session.user.name ?? "Recruiter",
        email: session.user.email ?? "",
        agencyName: profile.agencyName,
        agencySlug: profile.slug,
        logo: profile.logo ?? undefined,
        verified: profile.verificationStatus === "VERIFIED",
        verificationStatus: profile.verificationStatus,
      };
    }
  }

  return <RecruiterLayout user={user}>{children}</RecruiterLayout>;
}