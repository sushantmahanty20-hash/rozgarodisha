"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Briefcase, MapPin, Clock, Users, ChevronRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { requirementStatusStyles, num, currency } from "@/lib/recruiter-ui";

interface Requirement {
  id: string;
  title: string;
  openings: number;
  location: string | null;
  workMode: string | null;
  employmentType: string | null;
  salaryMin: number | string | null;
  salaryMax: number | string | null;
  salaryCurrency: string;
  priority: string;
  status: string;
  joiningDeadline: string | null;
  createdAt: string;
  client: { companyName: string };
  _count: { submissions: number; interviews: number; placements: number };
}

const priorityStyles: Record<string, { label: string; cls: string }> = {
  LOW: { label: "Low", cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  MEDIUM: { label: "Medium", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  HIGH: { label: "High", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  URGENT: { label: "Urgent", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
};

export function RequirementsPage() {
  const searchParams = useSearchParams();
  const [requirements, setRequirements] = React.useState<Requirement[] | null>(null);
  const [q, setQ] = React.useState("");
  const filterClient = searchParams.get("clientId");

  React.useEffect(() => {
    fetch("/api/recruiters/requirements")
      .then((r) => r.json())
      .then((res) => setRequirements(res.data ?? []))
      .catch(() => setRequirements([]));
  }, []);

  const filtered = requirements?.filter((r) => {
    const matchesQ =
      r.title.toLowerCase().includes(q.toLowerCase()) ||
      r.client.companyName.toLowerCase().includes(q.toLowerCase());
    const matchesClient = filterClient ? r.client.companyName === filterClient : true;
    return matchesQ && matchesClient;
  });

  const openCount = requirements?.filter((r) => r.status === "OPEN").length ?? 0;
  const urgentCount = requirements?.filter((r) => r.priority === "URGENT" && r.status === "OPEN").length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Job Requirements</h1>
          <p className="text-sm text-muted-foreground">Active recruitment mandates from your clients</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
          <Link href="/recruiter/requirements/new">
            <Plus className="h-4 w-4" /> New Requirement
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{num(requirements?.length)}</p><p className="text-xs text-muted-foreground">Total Requirements</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{num(openCount)}</p><p className="text-xs text-muted-foreground">Open</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-red-500">{num(urgentCount)}</p><p className="text-xs text-muted-foreground">Urgent</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search requirements..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {!requirements ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : filtered && filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No requirements yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Create your first requirement to start sourcing candidates</p>
            <Button asChild className="mt-4 gap-2">
              <Link href="/recruiter/requirements/new"><Plus className="h-4 w-4" /> New Requirement</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered?.map((r) => {
            const s = requirementStatusStyles[r.status] ?? requirementStatusStyles.OPEN;
            const p = priorityStyles[r.priority] ?? priorityStyles.MEDIUM;
            return (
              <Card key={r.id} className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{r.title}</h3>
                        <Badge className={cn(p.cls)}>{p.label}</Badge>
                        <Badge className={cn(s.cls)}>{s.label}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">for {r.client.companyName}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {r.employmentType ?? "Full Time"}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.location ?? "Remote"}</span>
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.openings} openings</span>
                        {r.joiningDeadline && (
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Join by {formatDate(r.joiningDeadline)}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {r.salaryMin && r.salaryMax && (
                        <p className="font-bold">{currency(r.salaryMin, r.salaryCurrency)} - {currency(r.salaryMax, r.salaryCurrency)}</p>
                      )}
                      <div className="mt-2 flex items-center justify-end gap-3 text-xs text-muted-foreground">
                        <span>{r._count.submissions} submissions</span>
                        <span>•</span>
                        <span>{r._count.interviews} interviews</span>
                        <span>•</span>
                        <span>{r._count.placements} placed</span>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="mt-1 gap-1 text-[#2563eb]">
                        <Link href={`/recruiter/submissions?requirementId=${r.id}`}>
                          View Pipeline <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}