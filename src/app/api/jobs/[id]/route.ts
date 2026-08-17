import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { updateJobSchema } from "@/lib/validations/job";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const job = await prisma.job.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            description: true,
            website: true,
            companySize: true,
            city: true,
            country: true,
            _count: { select: { jobs: true } },
          },
        },
        category: { select: { id: true, name: true, slug: true } },
        poster: { select: { id: true, name: true, avatar: true } },
        jobSkills: {
          include: { skill: { select: { id: true, name: true } } },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await prisma.job.update({
      where: { id: job.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({ data: job });
  } catch (error) {
    console.error("GET /api/jobs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.postedBy !== session.user.id && !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = updateJobSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { skills, ...updateData } = parsed.data;

    const updated = await prisma.job.update({
      where: { id },
      data: {
        ...updateData,
        salaryMin: updateData.salaryRange?.min,
        salaryMax: updateData.salaryRange?.max,
        status: updateData.status?.toUpperCase(),
        workMode: updateData.isRemote !== undefined
          ? updateData.isRemote ? "REMOTE" : "ONSITE"
          : undefined,
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PUT /api/jobs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.postedBy !== session.user.id && !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.job.delete({ where: { id } });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/jobs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
