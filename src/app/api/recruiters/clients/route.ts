import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const clients = await prisma.recruiterClient.findMany({
    where: { recruiterProfileId: profile!.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { requirements: true, submissions: true, interviews: true, placements: true, fees: true } },
    },
  });
  return ok(clients);
}

export async function POST(request: NextRequest) {
  const { session, profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.companyName) return fail("Company name is required", 400);

  const client = await prisma.recruiterClient.create({
    data: {
      recruiterProfileId: profile!.id,
      companyName: body.companyName,
      industry: body.industry || null,
      companySize: body.companySize || null,
      website: body.website || null,
      address: body.address || null,
      contactPerson: body.contactPerson || null,
      designation: body.designation || null,
      email: body.email || null,
      phone: body.phone || null,
      whatsapp: body.whatsapp || null,
      gstin: body.gstin || null,
      contractStartDate: body.contractStartDate ? new Date(body.contractStartDate) : null,
      contractEndDate: body.contractEndDate ? new Date(body.contractEndDate) : null,
      agreementUrl: body.agreementUrl || null,
      paymentTerms: body.paymentTerms || null,
      replacementPeriodDays: body.replacementPeriodDays ? Number(body.replacementPeriodDays) : null,
      feeType: body.feeType || "PERCENTAGE_OF_SALARY",
      feeValue: body.feeValue ? Number(body.feeValue) : null,
      status: body.status || "ACTIVE",
      relationshipStartDate: body.relationshipStartDate ? new Date(body.relationshipStartDate) : new Date(),
      notes: body.notes || null,
    },
  });

  if (session?.user?.id) {
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Client Added",
        message: `Client "${client.companyName}" added successfully`,
        type: "IN_APP",
      },
    });
  }

  return ok(client);
}