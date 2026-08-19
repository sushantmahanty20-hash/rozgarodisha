import prisma from "@/lib/prisma";
import { getRecruiterContext, ok, fail } from "@/lib/recruiter";

export async function GET() {
  const { profile, error } = await getRecruiterContext();
  if (error) return fail(error.message, error.status);

  const where = { recruiterProfileId: profile!.id };

  const [
    candidates,
    clients,
    requirements,
    submissions,
    offers,
    placements,
    fees,
    invoices,
    payments,
  ] = await Promise.all([
    prisma.recruiterCandidate.findMany({ where, select: { id: true } }),
    prisma.recruiterClient.findMany({ where, select: { id: true } }),
    prisma.recruitmentRequirement.findMany({ where, select: { id: true, status: true, priority: true } }),
    prisma.candidateSubmission.findMany({ where, select: { id: true, status: true } }),
    prisma.recruiterOffer.findMany({ where, select: { id: true, status: true } }),
    prisma.recruiterPlacement.findMany({ where, select: { id: true, status: true, salary: true, feeAmount: true } }),
    prisma.recruitmentFee.findMany({ where, select: { expectedFee: true, status: true } }),
    prisma.recruiterInvoice.findMany({ where, select: { total: true, status: true } }),
    prisma.recruiterPayment.findMany({ where, select: { amount: true, receivedAt: true } }),
  ]);

  const submissionCount = (status: string) => submissions.filter((s) => s.status === status).length;

  const upcomingInterviews = await prisma.recruiterInterview.findMany({
    where: {
      recruiterProfileId: profile!.id,
      interviewDate: { gte: new Date() },
      status: { not: "CANCELLED" },
    },
    orderBy: { interviewDate: "asc" },
    take: 6,
    include: { candidate: { select: { name: true, phone: true } }, client: { select: { companyName: true } }, requirement: { select: { title: true } } },
  });

  const alerts = [
    { severity: "warning", text: `${requirements.filter((r) => r.priority === "URGENT" && r.status === "OPEN").length} urgent requirements need candidates` },
    { severity: "info", text: `${candidates.length} candidates in your database — ${candidates.length > 0 ? "consent status needs review" : "add candidates to start submitting"}` },
    { severity: "success", text: `${placements.length} total placements${placements.length ? " — keep them happy for referrals" : ""}` },
  ];

  const totalRevenue = payments.reduce((s, p) => s + Number(p.amount), 0);
  const expectedRevenue = fees.reduce((s, f) => s + (Number(f.expectedFee) || 0), 0);
  const avgSalary = placements.length ? placements.reduce((s, p) => s + (Number(p.salary) || 0), 0) / placements.length : 0;
  const conversionRate = submissions.length ? ((placements.length / submissions.length) * 100).toFixed(1) : "0";

  return ok({
    kpis: {
      candidates: candidates.length,
      clients: clients.length,
      openRequirements: requirements.filter((r) => r.status === "OPEN").length,
      activePlacements: placements.filter((p) => p.status === "ACTIVE").length,
      totalPlacements: placements.length,
      totalSubmissions: submissions.length,
      pendingOffers: offers.filter((o) => o.status === "PENDING").length,
      upcomingInterviews: upcomingInterviews.length,
      totalRevenue,
      expectedRevenue,
      avgSalary,
      conversionRate,
    },
    funnel: {
      submitted: submissionCount("SUBMITTED"),
      shortlisted: submissionCount("SHORTLISTED"),
      interview: submissionCount("INTERVIEW"),
      selected: submissionCount("SELECTED"),
      offer: submissionCount("OFFER"),
      joined: submissionCount("JOINED"),
    },
    submissionsByStatus: submissions.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    upcomingInterviews,
    alerts,
    revenue: { total: totalRevenue, expected: expectedRevenue, invoiced: invoices.reduce((s, i) => s + Number(i.total), 0) },
  });
}