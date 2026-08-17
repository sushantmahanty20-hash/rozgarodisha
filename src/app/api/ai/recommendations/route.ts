import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        seekerSkills: {
          include: { skill: { select: { name: true } } },
        },
        experiences: {
          select: { title: true, description: true, skills: true },
        },
        educations: {
          select: { degree: true, field: true },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skillNames: string[] = (profile.seekerSkills as any[]).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (s: any) => s.skill.name
    );
    const experienceTitles: string[] = (profile.experiences as any[]).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: any) => e.title
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: "PUBLISHED",
      ...(skillNames.length > 0
        ? {
            jobSkills: {
              some: {
                skill: {
                  name: { in: skillNames },
                },
              },
            },
          }
        : {}),
    };

    const jobs = await prisma.job.findMany({
      where,
      take: 10,
      include: {
        company: {
          select: { id: true, name: true, logo: true, slug: true },
        },
        jobSkills: {
          include: { skill: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recommended = jobs.map((job: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jobSkillNames: string[] = (job.jobSkills as any[]).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (js: any) => js.skill.name
      );
      const matchingSkills = skillNames.filter((s: string) =>
        jobSkillNames.includes(s)
      );
      const matchScore =
        jobSkillNames.length > 0
          ? Math.round((matchingSkills.length / jobSkillNames.length) * 100)
          : 50;

      return {
        id: job.id,
        title: job.title,
        slug: job.slug,
        company: job.company,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency,
        workMode: job.workMode,
        employmentType: job.employmentType,
        city: job.city,
        state: job.state,
        country: job.country,
        createdAt: job.createdAt,
        matchScore,
        matchingSkills,
        totalSkills: jobSkillNames.length,
      };
    });

    recommended.sort((a: { matchScore: number }, b: { matchScore: number }) => b.matchScore - a.matchScore);

    return NextResponse.json({
      data: recommended,
      meta: {
        profileSkills: skillNames,
        totalRecommendations: recommended.length,
      },
    });
  } catch (error) {
    console.error("GET /api/ai/recommendations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
