"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users, Building2, Briefcase, BadgeCheck, Send,
  TrendingUp, ArrowRight, Clock, AlertTriangle, Calendar, Activity,
  Sparkles, Award, PieChart, UserPlus, CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatDate } from "@/lib/utils";
import { badge, currency, num } from "@/lib/recruiter-ui";

interface DashboardData {
  kpis: {
    candidates: number;
    clients: number;
    openRequirements: number;
    activePlacements: number;
    totalPlacements: number;
    totalSubmissions: number;
    pendingOffers: number;
    upcomingInterviews: number;
    totalRevenue: number;
    expectedRevenue: number;
    avgSalary: number;
    conversionRate: string;
  };
  funnel: { submitted: number; shortlisted: number; interview: number; selected: number; offer: number; joined: number };
  submissionsByStatus: Record<string, number>;
  upcomingInterviews: {
    id: string;
    interviewDate: string;
    interviewType: string;
    status: string;
    candidate: { name: string; phone: string | null };
    client: { companyName: string } | null;
    requirement: { title: string } | null;
  }[];
  alerts: { severity: string; text: string }[];
  revenue: { total: number; expected: number; invoiced: number };
}

const funnelSteps = [
  { key: "submitted", label: "Submitted", color: "bg-sky-500" },
  { key: "shortlisted", label: "Shortlisted", color: "bg-amber-500" },
  { key: "interview", label: "Interview", color: "bg-cyan-500" },
  { key: "selected", label: "Selected", color: "bg-emerald-500" },
  { key: "offer", label: "Offer", color: "bg-teal-500" },
  { key: "joined", label: "Joined", color: "bg-green-600" },
] as const;

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  accent: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="group relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#0f172a] dark:text-white">
                {value}
              </p>
              {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
            </div>
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", accent)}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function RecruiterDashboard() {
  const [data, setData] = React.useState<DashboardData | null>(null);

  React.useEffect(() => {
    fetch("/api/recruiters/dashboard")
      .then((r) => r.json())
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
      </div>
    );
  }

  const k = data.kpis;
  const maxFunnel = Math.max(1, data.funnel.submitted);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">
            Recruiter Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Your agency&apos;s recruitment operations at a glance
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/recruiter/candidates/new">
              <UserPlus className="h-4 w-4" /> Add Candidate
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
            <Link href="/recruiter/requirements/new">
              <Briefcase className="h-4 w-4" /> New Requirement
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Candidates" value={num(k.candidates)} sub="in your database" accent="bg-gradient-to-br from-sky-500 to-blue-600" href="/recruiter/candidates" />
        <StatCard icon={Building2} label="Clients" value={num(k.clients)} sub="active relationships" accent="bg-gradient-to-br from-violet-500 to-purple-600" href="/recruiter/clients" />
        <StatCard icon={Briefcase} label="Open Requirements" value={num(k.openRequirements)} sub="awaiting candidates" accent="bg-gradient-to-br from-amber-500 to-orange-600" href="/recruiter/requirements" />
        <StatCard icon={Send} label="Submissions" value={num(k.totalSubmissions)} sub={`${k.conversionRate}% placement rate`} accent="bg-gradient-to-br from-cyan-500 to-teal-600" href="/recruiter/submissions" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Pipeline Funnel</CardTitle>
                <CardDescription>Candidate movement across stages</CardDescription>
              </div>
              <Link href="/recruiter/pipeline" className="text-xs font-medium text-[#2563eb] hover:underline">
                View pipeline
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {funnelSteps.map((step, i) => {
                const count = data.funnel[step.key] ?? 0;
                const width = Math.max((count / maxFunnel) * 100, count > 0 ? 8 : 0);
                return (
                  <div key={step.key} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-xs font-medium text-muted-foreground">{step.label}</span>
                    <div className="relative h-8 flex-1 overflow-hidden rounded-lg bg-muted/40">
                      <div
                        className={cn("h-full rounded-lg transition-all duration-700", step.color)}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-bold">{count}</span>
                    {i < funnelSteps.length - 1 && count > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {Math.round((data.funnel[funnelSteps[i + 1].key] / count) * 100)}%
                      </span>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Upcoming Interviews</CardTitle>
                <CardDescription>Next scheduled candidate interviews</CardDescription>
              </div>
              <Link href="/recruiter/interviews" className="text-xs font-medium text-[#2563eb] hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {data.upcomingInterviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">No upcoming interviews scheduled</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.upcomingInterviews.map((iv) => (
                    <div key={iv.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-[#2563eb]/10 text-[#2563eb]">
                          {iv.candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{iv.candidate.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {iv.requirement?.title} • {iv.client?.companyName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-[#2563eb]">{formatDate(iv.interviewDate)}</p>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          {new Date(iv.interviewDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} • {iv.interviewType}
                        </p>
                      </div>
                      <Badge className={cn(badge(iv.status).cls)}>{badge(iv.status).label}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-white">
            <CardContent className="p-6">
              <p className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles className="h-4 w-4" /> Revenue Overview
              </p>
              <p className="mt-3 text-3xl font-extrabold">{currency(k.totalRevenue)}</p>
              <p className="text-xs text-white/70">collected revenue</p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                <div>
                  <p className="text-xs text-white/70">Expected</p>
                  <p className="text-lg font-bold">{currency(k.expectedRevenue)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">Invoiced</p>
                  <p className="text-lg font-bold">{currency(data.revenue.invoiced)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">Avg. Placed Salary</p>
                  <p className="text-lg font-bold">{currency(k.avgSalary)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">Active Placements</p>
                  <p className="text-lg font-bold">{num(k.activePlacements)}</p>
                </div>
              </div>
              <Button asChild variant="secondary" className="mt-4 w-full gap-2">
                <Link href="/recruiter/revenue">
                  Manage Revenue <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-[#2563eb]" /> Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.alerts.map((a, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border p-3 text-sm",
                    a.severity === "warning" && "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
                    a.severity === "info" && "border-sky-200 bg-sky-50 dark:border-sky-900/50 dark:bg-sky-950/30",
                    a.severity === "success" && "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"
                  )}
                >
                  {a.severity === "warning" ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  ) : a.severity === "info" ? (
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  )}
                  <span className="text-muted-foreground">{a.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4 text-[#2563eb]" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {[
                { label: "Submit Candidate", href: "/recruiter/submissions/new", icon: Send },
                { label: "Add Client", href: "/recruiter/clients/new", icon: Building2 },
                { label: "Add Requirement", href: "/recruiter/requirements/new", icon: Briefcase },
                { label: "View Pipeline", href: "/recruiter/pipeline", icon: PieChart },
                { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
                { label: "Verify Agency", href: "/recruiter/agency?tab=verification", icon: BadgeCheck },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-3 text-center text-xs font-medium text-muted-foreground transition-colors hover:border-[#2563eb]/40 hover:text-[#2563eb]"
                >
                  <a.icon className="h-4 w-4" />
                  {a.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}