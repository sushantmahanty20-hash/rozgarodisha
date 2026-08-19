"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Send, Plus, GitBranch, ChevronRight, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { badge, currency } from "@/lib/recruiter-ui";

interface Submission {
  id: string;
  status: string;
  submissionDate: string;
  expectedSalary: number | string | null;
  candidate: { name: string; email: string | null; phone: string | null; currentTitle: string | null };
  client: { companyName: string } | null;
  requirement: { title: string } | null;
  history: { toStatus: string; createdAt: string }[];
}

export function SubmissionsPage() {
  const searchParams = useSearchParams();
  const [submissions, setSubmissions] = React.useState<Submission[] | null>(null);
  const [statusFilter, setStatusFilter] = React.useState(searchParams.get("status") ?? "");
  const requirementId = searchParams.get("requirementId");

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (requirementId) params.set("requirementId", requirementId);
    fetch(`/api/recruiters/submissions?${params}`)
      .then((r) => r.json())
      .then((res) => setSubmissions(res.data ?? []))
      .catch(() => setSubmissions([]));
  }, [statusFilter, requirementId]);

  const statuses = ["SUBMITTED", "CLIENT_REVIEW", "SHORTLISTED", "INTERVIEW", "SELECTED", "OFFER", "JOINED", "REJECTED"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Candidate Submissions</h1>
          <p className="text-sm text-muted-foreground">Candidates submitted to client requirements</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/recruiter/pipeline"><GitBranch className="h-4 w-4" /> Pipeline Board</Link>
          </Button>
          <Button asChild className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
            <Link href="/recruiter/submissions/new"><Plus className="h-4 w-4" /> Submit Candidate</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setStatusFilter("")} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition-colors", !statusFilter ? "bg-[#2563eb] text-white" : "bg-muted text-muted-foreground hover:bg-muted/70")}>All</button>
        {statuses.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition-colors", statusFilter === s ? "bg-[#2563eb] text-white" : "bg-muted text-muted-foreground hover:bg-muted/70")}>
            {badge(s).label}
          </button>
        ))}
      </div>

      {!submissions ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : submissions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Send className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No submissions yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Submit a candidate to a requirement to start your pipeline</p>
            <Button asChild className="mt-4 gap-2">
              <Link href="/recruiter/submissions/new"><UserPlus className="h-4 w-4" /> Submit Candidate</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <Card key={s.id} className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar size="sm">
                    <AvatarImage src={undefined} alt={s.candidate.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-white">{getInitials(s.candidate.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{s.candidate.name}</p>
                      <Badge className={cn(badge(s.status).cls)}>{badge(s.status).label}</Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.requirement?.title} • {s.client?.companyName}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>Submitted {formatDate(s.submissionDate)}</p>
                    {s.expectedSalary && <p>{currency(s.expectedSalary)} expected</p>}
                  </div>
                  <div className="flex gap-1">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/recruiter/pipeline?highlight=${s.id}`}>Track <ChevronRight className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}