import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userRole = role === "employer" ? "EMPLOYER" : "JOB_SEEKER";

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: userRole,
        phone: phone || null,
        emailVerified: true,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (userRole === "EMPLOYER") {
      await prisma.company.create({
        data: {
          name: `${name}'s Company`,
          slug: `${name.toLowerCase().replace(/\s+/g, "-")}-company-${Date.now()}`,
          ownerId: user.id,
          email: email.toLowerCase().trim(),
        },
      });
    }

    if (userRole === "JOB_SEEKER") {
      await prisma.resume.create({
        data: {
          seekerId: user.id,
          title: `${name}'s Resume`,
          fileUrl: "",
          fileName: "default-resume.pdf",
          fileSize: 0,
          isDefault: true,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
