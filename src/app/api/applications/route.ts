import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { paginationSchema } from "@/lib/validations/common";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const parsed = paginationSchema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid params" }, { status: 400 });
    }

    const { page, limit, sortBy, sortOrder } = parsed.data;
    const jobId = searchParams.get("jobId") || undefined;
    const status = searchParams.get("status") || undefined;

    const where: Record<string, unknown> = {};

    if (["EMPLOYER", "RECRUITER", "HR_MANAGER"].includes(session.user.role)) {
      const company = await prisma.company.findUnique({
        where: { ownerId: session.user.id },
        select: { id: true },
      });

      if (company) {
        where.job = { companyId: company.id };
      }
    } else if (session.user.role === "JOB_SEEKER") {
      where.seekerId = session.user.id;
    }

    if (jobId) where.jobId = jobId;
    if (status) where.status = status;

    const orderBy: Record<string, string> = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.appliedAt = "desc";
    }

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          job: {
            select: {
              id: true,
              title: true,
              slug: true,
              company: { select: { id: true, name: true, logo: true } },
            },
          },
          seeker: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      items: applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("GET /api/applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

const applySchema = z.object({
  jobId: z.string().min(1),
  resumeId: z.string().optional(),
  coverLetter: z.string().max(5000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "JOB_SEEKER" && !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Only job seekers can apply" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = applySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({ where: { id: parsed.data.jobId } });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Job is not accepting applications" }, { status: 400 });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_seekerId: {
          jobId: parsed.data.jobId,
          seekerId: session.user.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 }
      );
    }

    const application = await prisma.$transaction([
      prisma.application.create({
        data: {
          jobId: parsed.data.jobId,
          seekerId: session.user.id,
          resumeId: parsed.data.resumeId,
          coverLetter: parsed.data.coverLetter,
        },
      }),
      prisma.job.update({
        where: { id: parsed.data.jobId },
        data: { applicationCount: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ data: application[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
