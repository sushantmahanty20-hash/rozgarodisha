import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const [fees, invoices, payments] = await Promise.all([
    prisma.recruitmentFee.findMany({
      where: { recruiterProfileId: profile!.id },
      orderBy: { createdAt: "desc" },
      include: { client: { select: { companyName: true } }, placement: { select: { position: true } } },
    }),
    prisma.recruiterInvoice.findMany({
      where: { recruiterProfileId: profile!.id },
      orderBy: { issueDate: "desc" },
      include: { client: { select: { companyName: true } } },
    }),
    prisma.recruiterPayment.findMany({
      where: { recruiterProfileId: profile!.id },
      orderBy: { receivedAt: "desc" },
      include: { client: { select: { companyName: true } } },
    }),
  ]);

  const totalExpected = fees.reduce((s, f) => s + (Number(f.expectedFee) || 0), 0);
  const paid = payments.reduce((s, p) => s + Number(p.amount), 0);
  const invoiced = invoices.filter((i) => i.status !== "DRAFT").reduce((s, i) => s + Number(i.total), 0);

  return ok({ fees, invoices, payments, totalExpected, paid, invoiced, outstanding: Math.max(totalExpected - paid, 0) });
}

export async function POST(request: NextRequest) {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const body = await request.json();

  if (body.type === "payment") {
    if (!body.amount) return fail("Amount is required", 400);
    const payment = await prisma.recruiterPayment.create({
      data: {
        recruiterProfileId: profile!.id,
        invoiceId: body.invoiceId || null,
        clientId: body.clientId || null,
        amount: Number(body.amount),
        method: body.method || "BANK_TRANSFER",
        transactionId: body.transactionId || null,
        receivedAt: body.receivedAt ? new Date(body.receivedAt) : new Date(),
        notes: body.notes || null,
      },
    });
    if (body.invoiceId) {
      await prisma.recruiterInvoice.update({
        where: { id: body.invoiceId },
        data: { status: "PAID", paidAt: new Date() },
      });
    }
    if (body.feeId) {
      await prisma.recruitmentFee.update({ where: { id: body.feeId }, data: { status: "PAID" } });
    }
    return ok(payment);
  }

  if (body.type === "invoice") {
    const amount = Number(body.amount) || 0;
    const tax = Number(body.tax) || 0;
    const invoice = await prisma.recruiterInvoice.create({
      data: {
        recruiterProfileId: profile!.id,
        clientId: body.clientId,
        invoiceNumber: `RINV-${Date.now()}`,
        issueDate: body.issueDate ? new Date(body.issueDate) : new Date(),
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        amount,
        tax,
        total: amount + tax,
        currency: body.currency || "INR",
        status: body.status || "SENT",
        notes: body.notes || null,
      },
    });
    if (body.feeId) {
      await prisma.recruitmentFee.update({ where: { id: body.feeId }, data: { status: "INVOICED", invoiceId: invoice.id } });
    }
    return ok(invoice);
  }

  return fail("Invalid request", 400);
}