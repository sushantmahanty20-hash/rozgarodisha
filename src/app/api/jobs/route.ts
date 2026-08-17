import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createJobSchema } from "@/lib/validations/job";
import { jobFilterSchema } from "@/lib/validations/job";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = jobFilterSchema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      q: searchParams.get("q"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
      categoryId: searchParams.get("categoryId"),
      employmentType: searchParams.get("employmentType"),
      experienceLevel: searchParams.get("experienceLevel"),
      isRemote: searchParams.get("isRemote"),
      location: searchParams.get("location"),
      salaryMin: searchParams.get("salaryMin"),
      salaryMax: searchParams.get("salaryMax"),
      status: searchParams.get("status") || "published",
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid filters", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, q, sortBy, sortOrder, ...filters } = parsed.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: filters.status || "published",
    };

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { company: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.companyId) where.companyId = filters.companyId;
    if (filters.employmentType) where.employmentType = filters.employmentType;
    if (filters.isRemote !== undefined) where.workMode = filters.isRemote ? "REMOTE" : undefined;
    if (filters.location) {
      where.OR = [
        ...(Array.isArray(where.OR) ? where.OR : []),
        { city: { contains: filters.location, mode: "insensitive" } },
        { state: { contains: filters.location, mode: "insensitive" } },
        { country: { contains: filters.location, mode: "insensitive" } },
      ];
    }

    if (filters.salaryMin) {
      where.salaryMax = { gte: filters.salaryMin };
    }
    if (filters.salaryMax) {
      where.salaryMin = { lte: filters.salaryMax };
    }

    const orderBy: Record<string, string> = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.createdAt = "desc";
    }

    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          company: {
            select: { id: true, name: true, logo: true, slug: true },
          },
          category: {
            select: { id: true, name: true, slug: true },
          },
          jobSkills: {
            include: { skill: { select: { name: true } } },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({
      items: jobs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["EMPLOYER", "RECRUITER", "HR_MANAGER", "ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createJobSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { skills, ...jobData } = parsed.data;

    let slug = slugify(jobData.title);
    const existingSlug = await prisma.job.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = slug + "-" + Date.now().toString(36);
    }

    const job = await prisma.job.create({
      data: {
        ...jobData,
        slug,
        salaryMin: jobData.salaryRange?.min,
        salaryMax: jobData.salaryRange?.max,
        salaryCurrency: jobData.salaryRange?.currency || "USD",
        salaryPeriod: jobData.salaryRange?.period?.toUpperCase() || "MONTHLY",
        workMode: jobData.isRemote ? "REMOTE" : "ONSITE",
        postedBy: session.user.id,
        companyId: jobData.companyId,
        status: jobData.status === "published" ? "PUBLISHED" : "DRAFT",
      },
    });

    return NextResponse.json({ data: job }, { status: 201 });
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
