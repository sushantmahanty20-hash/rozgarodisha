"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Users, Search, Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { num, currency } from "@/lib/recruiter-ui";

interface Candidate {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  location: string | null;
  currentTitle: string | null;
  totalExperienceYrs: number | string | null;
  skills: string | null;
  expectedSalary: number | string | null;
  consentStatus: string;
  status: string;
  createdAt: string;
  _count: { submissions: number };
}

const consentStyles: Record<string, { label: string; cls: string }> = {
  CONSENT_GRANTED: { label: "Consent Granted", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  CONSENT_REQUESTED: { label: "Consent Requested", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  NO_CONSENT: { label: "No Consent", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  CONSENT_WITHDRAWN: { label: "Withdrawn", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
  CONSENT_EXPIRED: { label: "Expired", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300" },
};

const candidateStatusStyles: Record<string, { label: string; cls: string }> = {
  AVAILABLE: { label: "Available", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  IN_PROCESS: { label: "In Process", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  PLACED: { label: "Placed", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" },
  BLACKLISTED: { label: "Blacklisted", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
};

export function CandidatesPage() {
  const [candidates, setCandidates] = React.useState<Candidate[] | null>(null);
  const [q, setQ] = React.useState("");
  const [consentFilter, setConsentFilter] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (consentFilter) params.set("consent", consentFilter);
    fetch(`/api/recruiters/candidates?${params}`)
      .then((r) => r.json())
      .then((res) => setCandidates(res.data ?? []))
      .catch(() => setCandidates([]));
  }, [consentFilter]);

  const filtered = candidates?.filter((c) => {
    const qs = q.toLowerCase();
    return (
      c.name.toLowerCase().includes(qs) ||
      (c.currentTitle ?? "").toLowerCase().includes(qs) ||
      (c.skills ?? "").toLowerCase().includes(qs) ||
      (c.location ?? "").toLowerCase().includes(qs)
    );
  });

  const consented = candidates?.filter((c) => c.consentStatus === "CONSENT_GRANTED").length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Candidate Database</h1>
          <p className="text-sm text-muted-foreground">Your talent pool and candidate management</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
          <Link href="/recruiter/candidates/new">
            <Plus className="h-4 w-4" /> Add Candidate
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{num(candidates?.length)}</p><p className="text-xs text-muted-foreground">Total Candidates</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{num(consented)}</p><p className="text-xs text-muted-foreground">With Consent</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{num(candidates?.filter((c) => c.status === "AVAILABLE").length)}</p><p className="text-xs text-muted-foreground">Available</p></CardContent></Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search name, title, skills..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={consentFilter}
          onChange={(e) => setConsentFilter(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="">All consent statuses</option>
          <option value="CONSENT_GRANTED">Consent Granted</option>
          <option value="CONSENT_REQUESTED">Consent Requested</option>
          <option value="NO_CONSENT">No Consent</option>
          <option value="CONSENT_WITHDRAWN">Withdrawn</option>
          <option value="CONSENT_EXPIRED">Expired</option>
        </select>
      </div>

      {!candidates ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : filtered && filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No candidates found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add candidates to your database to start submitting</p>
            <Button asChild className="mt-4 gap-2">
              <Link href="/recruiter/candidates/new"><Plus className="h-4 w-4" /> Add Candidate</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered?.map((c) => {
            const cs = candidateStatusStyles[c.status] ?? candidateStatusStyles.AVAILABLE;
            const cons = consentStyles[c.consentStatus] ?? consentStyles.NO_CONSENT;
            return (
              <Card key={c.id} className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar size="md">
                        <AvatarImage src={undefined} alt={c.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-white">{getInitials(c.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{c.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{c.currentTitle ?? "Candidate"}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={cn(cs.cls)}>{cs.label}</Badge>
                      <Badge className={cn(cons.cls)}>{cons.label}</Badge>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {c.location && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.location}</p>}
                    {c.email && <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> <span className="truncate">{c.email}</span></p>}
                    {c.phone && <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>}
                  </div>

                  {c.skills && (
                    <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Skills:</span> {c.skills}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                    <span>{num(Number(c.totalExperienceYrs))} yrs exp</span>
                    {c.expectedSalary && <span>{currency(c.expectedSalary)} expected</span>}
                    <span>{c._count.submissions} submissions</span>
                  </div>

                  <Button asChild size="sm" variant="outline" className="mt-3 w-full gap-1 text-[#2563eb]">
                    <Link href={`/recruiter/submissions/new?candidateId=${c.id}`}>
                      <Send className="h-3.5 w-3.5" /> Submit to Requirement
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}