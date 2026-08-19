import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, Globe, Phone, Mail, Star } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate, getInitials } from "@/lib/utils";
import { num, currency } from "@/lib/recruiter-ui";

export const metadata = { title: "Agency Profile" };

export default async function AgencyProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const agency = await prisma.recruiterProfile.findUnique({
    where: { slug },
    include: {
      _count: { select: { clients: true, candidates: true, placements: true, reviews: true } },
      reviews: { where: { isPublic: true }, orderBy: { createdAt: "desc" }, take: 5 },
    },
  });
  if (!agency) notFound();

  const placements = await prisma.recruiterPlacement.findMany({
    where: { recruiterProfileId: agency.id, status: { in: ["COMPLETED", "ACTIVE", "JOINED"] } },
    orderBy: { placementDate: "desc" },
    take: 5,
    include: { client: { select: { companyName: true } }, candidate: { select: { name: true } } },
  });

  const industries = agency.industriesServed?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="h-32 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" />
        <div className="px-6 pb-8 sm:px-10">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-2xl font-bold text-white">
                {getInitials(agency.agencyName)}
              </div>
              <div className="pb-1">
                <h1 className="flex items-center gap-2 text-2xl font-bold">
                  {agency.agencyName}
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  {agency.agencyType.replace(/_/g, " ")} • Est. {agency.yearEstablished ?? "—"}
                  {agency.verifiedAt ? ` • Verified ${formatDate(agency.verifiedAt)}` : ""}
                </p>
              </div>
            </div>
            <Link
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2563eb]/25"
            >
              Contact Agency
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-2xl font-extrabold">{num(agency._count.placements)}</p>
              <p className="text-xs text-muted-foreground">Placements</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-2xl font-extrabold">{num(agency._count.clients)}</p>
              <p className="text-xs text-muted-foreground">Clients</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-2xl font-extrabold">{num(agency._count.candidates)}</p>
              <p className="text-xs text-muted-foreground">Candidates</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-2xl font-extrabold">{num(agency.numRecruiters)}</p>
              <p className="text-xs text-muted-foreground">Recruiters</p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section>
                <h2 className="text-lg font-bold">About</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {agency.about ?? "No description provided."}
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold">Industries Served</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industries.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Not specified</p>
                  ) : (
                    industries.map((i) => (
                      <span key={i} className="rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-semibold text-[#2563eb]">
                        {i}
                      </span>
                    ))
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold">Recent Placements</h2>
                <div className="mt-3 space-y-2">
                  {placements.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No public placements yet.</p>
                  ) : (
                    placements.map((p) => (
                      <div key={p.id} className="flex items-center justify-between rounded-xl border border-border p-3 text-sm">
                        <div>
                          <p className="font-semibold">{p.position}</p>
                          <p className="text-xs text-muted-foreground">{p.candidate.name} → {p.client.companyName}</p>
                        </div>
                        <div className="text-right">
                          {p.salary && <p className="font-semibold">{currency(Number(p.salary))}</p>}
                          <p className="text-xs text-muted-foreground">{formatDate(p.placementDate)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section id="contact" className="rounded-2xl border border-border bg-background p-5">
                <h2 className="text-lg font-bold">Contact</h2>
                <div className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                  {agency.city && (
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {agency.officeAddress ?? ""} {agency.city}, {agency.state}, {agency.country}</p>
                  )}
                  {agency.website && (
                    <p className="flex items-center gap-2"><Globe className="h-4 w-4 shrink-0" /> <a href={agency.website} className="text-[#2563eb] hover:underline" target="_blank" rel="noreferrer">{agency.website}</a></p>
                  )}
                  {agency.businessEmail && (
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <a href={`mailto:${agency.businessEmail}`} className="text-[#2563eb] hover:underline">{agency.businessEmail}</a></p>
                  )}
                  {agency.businessPhone && (
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {agency.businessPhone}</p>
                  )}
                </div>
              </section>

              {agency.specializations && (
                <section className="rounded-2xl border border-border bg-background p-5">
                  <h2 className="text-lg font-bold">Specializations</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{agency.specializations}</p>
                </section>
              )}

              {agency._count.reviews > 0 && (
                <section className="rounded-2xl border border-border bg-background p-5">
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <Star className="h-4 w-4 text-amber-500" /> Client Reviews
                  </h2>
                  <div className="mt-3 space-y-3">
                    {agency.reviews.map((r) => (
                      <div key={r.id} className="rounded-xl bg-muted/50 p-3 text-sm">
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        {r.comment && <p className="mt-1.5 text-muted-foreground">{r.comment}</p>}
                        <p className="mt-1 text-[11px] text-muted-foreground">{formatDate(r.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}