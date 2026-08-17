import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createCompanySchema } from "@/lib/validations/company";
import { paginationSchema } from "@/lib/validations/common";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
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
    const q = searchParams.get("q") || undefined;

    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const verificationStatus = searchParams.get("verificationStatus");
    if (verificationStatus) {
      where.verificationStatus = verificationStatus;
    }

    const orderBy: Record<string, string> = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.createdAt = "desc";
    }

    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          _count: { select: { jobs: true } },
          owner: { select: { id: true, name: true } },
        },
      }),
      prisma.company.count({ where }),
    ]);

    return NextResponse.json({
      items: companies,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("GET /api/companies error:", error);
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

    if (!["EMPLOYER", "ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createCompanySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existingCompany = await prisma.company.findUnique({
      where: { ownerId: session.user.id },
    });

    if (existingCompany) {
      return NextResponse.json(
        { error: "You already own a company" },
        { status: 400 }
      );
    }

    const slug = slugify(parsed.data.name);
    const existingSlug = await prisma.company.findUnique({ where: { slug } });
    if (existingSlug) {
      return NextResponse.json(
        { error: "A company with this name already exists" },
        { status: 400 }
      );
    }

    const company = await prisma.company.create({
      data: {
        ...parsed.data,
        slug,
        ownerId: session.user.id,
      },
    });

    return NextResponse.json({ data: company }, { status: 201 });
  } catch (error) {
    console.error("POST /api/companies error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
