import Link from "next/link";
import { BadgeCheck, Building2, MapPin, Briefcase, Star } from "lucide-react";
import prisma from "@/lib/prisma";
import { getInitials } from "@/lib/utils";

export const metadata = { title: "Recruitment Agencies Directory" };

export default async function RecruitersDirectoryPage() {
  const agencies = await prisma.recruiterProfile.findMany({
    where: { verificationStatus: "VERIFIED" },
    orderBy: { verifiedAt: "desc" },
    include: {
      _count: { select: { clients: true, candidates: true, placements: true, reviews: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Find a Recruitment Agency</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Verified recruitment agencies and staffing consultants — browse their expertise, clients and placement track record.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agencies.length === 0 ? (
          <p className="col-span-full py-20 text-center text-muted-foreground">
            No verified agencies yet — check back soon.
          </p>
        ) : (
          agencies.map((a) => (
            <Link
              key={a.id}
              href={`/recruiters/${a.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-lg font-bold text-white">
                  {getInitials(a.agencyName)}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold group-hover:text-[#2563eb]">{a.agencyName}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.about ?? "Professional recruitment consultancy."}</p>
              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {a.city && (
                  <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {a.city}{a.state ? `, ${a.state}` : ""}</p>
                )}
                <p className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> {a.agencyType.replace(/_/g, " ").toLowerCase()} • since {a.yearEstablished ?? "—"}
                </p>
                <p className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" /> {a._count.placements} placements • {a._count.clients} clients • {a._count.candidates} candidates
                </p>
              </div>
              {a._count.reviews > 0 && (
                <p className="mt-3 inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-600">
                  <Star className="h-3.5 w-3.5" /> {a._count.reviews} reviews
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}