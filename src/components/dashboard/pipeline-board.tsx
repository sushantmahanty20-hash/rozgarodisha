"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GitBranch, ArrowRight, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { badge } from "@/lib/recruiter-ui";

interface Submission {
  id: string;
  status: string;
  submissionDate: string;
  candidate: { name: string; email: string | null; currentTitle: string | null };
  client: { companyName: string } | null;
  requirement: { title: string } | null;
  history: { toStatus: string; createdAt: string }[];
}

const BOARD_COLUMNS = ["SOURCED", "SCREENING", "SUBMITTED", "CLIENT_REVIEW", "SHORTLISTED", "INTERVIEW", "SELECTED", "OFFER", "OFFER_ACCEPTED", "JOINED", "REJECTED", "ON_HOLD"] as const;
const NEXT_STAGE: Record<string, string> = {
  SOURCED: "SCREENING",
  SCREENING: "SUBMITTED",
  SUBMITTED: "CLIENT_REVIEW",
  CLIENT_REVIEW: "SHORTLISTED",
  SHORTLISTED: "INTERVIEW",
  INTERVIEW: "SELECTED",
  SELECTED: "OFFER",
  OFFER: "OFFER_ACCEPTED",
  OFFER_ACCEPTED: "JOINED",
};

export function PipelineBoard() {
  const searchParams = useSearchParams();
  const [submissions, setSubmissions] = React.useState<Submission[] | null>(null);
  const [moving, setMoving] = React.useState<string | null>(null);
  const highlight = searchParams.get("highlight");

  React.useEffect(() => {
    fetch("/api/recruiters/submissions")
      .then((r) => r.json())
      .then((res) => setSubmissions(res.data ?? []))
      .catch(() => setSubmissions([]));
  }, []);

  const move = async (id: string, toStatus: string) => {
    setMoving(id);
    try {
      const res = await fetch(`/api/recruiters/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: toStatus }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update");
      setSubmissions((prev) =>
        prev?.map((s) => (s.id === id ? { ...s, status: toStatus } : s)) ?? null
      );
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setMoving(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Pipeline Board</h1>
          <p className="text-sm text-muted-foreground">Drag candidates through the recruitment funnel</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
          <Link href="/recruiter/submissions/new"><UserPlus className="h-4 w-4" /> Submit Candidate</Link>
        </Button>
      </div>

      {!submissions ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : submissions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <GitBranch className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">Pipeline is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">Submit candidates to build your pipeline</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
          {BOARD_COLUMNS.map((col) => {
            const colItems = submissions.filter((s) => s.status === col);
            const nextStage = NEXT_STAGE[col];
            return (
              <div key={col} className="w-64 shrink-0 rounded-2xl bg-muted/40 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {badge(col).label}
                  </span>
                  <span className="rounded-full bg-background px-2 py-0.5 text-xs font-bold">{colItems.length}</span>
                </div>
                <div className="space-y-2">
                  {colItems.map((s) => (
                    <div
                      key={s.id}
                      className={cn(
                        "rounded-xl border border-border bg-background p-3 shadow-sm transition-all hover:shadow-md",
                        highlight === s.id && "ring-2 ring-[#2563eb]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-white">{getInitials(s.candidate.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{s.candidate.name}</p>
                          <p className="truncate text-[11px] text-muted-foreground">{s.requirement?.title}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{formatDate(s.submissionDate)}</span>
                        {nextStage && (
                          <button
                            onClick={() => move(s.id, nextStage)}
                            disabled={moving === s.id}
                            className="flex items-center gap-1 rounded-lg bg-[#2563eb]/10 px-2 py-1 text-[10px] font-semibold text-[#2563eb] transition-colors hover:bg-[#2563eb]/20 disabled:opacity-50"
                          >
                            {moving === s.id ? "Moving..." : <>Move <ArrowRight className="h-3 w-3" /></>}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}