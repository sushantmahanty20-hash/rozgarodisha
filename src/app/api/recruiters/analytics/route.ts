import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

const monthKey = (d: Date | null | undefined) => {
  if (!d) return "unknown";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const toMap = (arr: { month: string; count: number }[]) =>
  arr.reduce((acc, r) => ({ ...acc, [r.month]: r.count }), {} as Record<string, number>);

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const where = { recruiterProfileId: profile!.id };

  const [requirements, candidates, submissions, placements, fees, payments] = await Promise.all([
    prisma.recruitmentRequirement.findMany({ where, select: { status: true, createdAt: true } }),
    prisma.recruiterCandidate.findMany({ where, select: { status: true, createdAt: true } }),
    prisma.candidateSubmission.findMany({ where, select: { status: true, submissionDate: true } }),
    prisma.recruiterPlacement.findMany({ where, select: { status: true, placementDate: true, salary: true } }),
    prisma.recruitmentFee.findMany({ where, select: { client: { select: { companyName: true } }, expectedFee: true, status: true } }),
    prisma.recruiterPayment.findMany({ where, select: { amount: true, receivedAt: true } }),
  ]);

  const countBy = <T extends string>(rows: { status: T }[]) =>
    rows.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {} as Record<string, number>);

  const submissionsByMonth = toMap(
    submissions.reduce((acc, s) => {
      const k = monthKey(s.submissionDate);
      const found = acc.find((r) => r.month === k);
      if (found) found.count += 1;
      else acc.push({ month: k, count: 1 });
      return acc;
    }, [] as { month: string; count: number }[])
  );

  const placementsByMonth = toMap(
    placements.reduce((acc, s) => {
      const k = monthKey(s.placementDate);
      const found = acc.find((r) => r.month === k);
      if (found) found.count += 1;
      else acc.push({ month: k, count: 1 });
      return acc;
    }, [] as { month: string; count: number }[])
  );

  const revenueByMonth = toMap(
    payments.reduce((acc, p) => {
      const k = monthKey(p.receivedAt);
      const found = acc.find((r) => r.month === k);
      if (found) found.count += Number(p.amount);
      else acc.push({ month: k, count: Number(p.amount) });
      return acc;
    }, [] as { month: string; count: number }[])
  );

  const feesByClient = fees.map((f) => ({ client: f.client.companyName, expectedFee: Number(f.expectedFee) || 0, status: f.status }));

  return ok({
    requirementsByStatus: countBy(requirements),
    candidatesByStatus: countBy(candidates),
    submissionsByStatus: countBy(submissions),
    placementsByStatus: countBy(placements),
    submissionsByMonth,
    placementsByMonth,
    revenueByMonth,
    feesByClient,
  });
}