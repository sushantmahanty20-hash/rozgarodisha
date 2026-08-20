"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const applications = [
  {
    id: "1",
    jobTitle: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    appliedDate: "Jan 10, 2026",
    status: "SHORTLISTED",
    timeline: [
      { status: "APPLIED", date: "Jan 10, 2026", done: true },
      { status: "SCREENING", date: "Jan 12, 2026", done: true },
      { status: "SHORTLISTED", date: "Jan 14, 2026", done: true },
      { status: "INTERVIEW", date: "Pending", done: false },
      { status: "OFFERED", date: "Pending", done: false },
    ],
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    company: "DataFlow AI",
    location: "New York, NY",
    appliedDate: "Jan 5, 2026",
    status: "INTERVIEW",
    timeline: [
      { status: "APPLIED", date: "Jan 5, 2026", done: true },
      { status: "SCREENING", date: "Jan 7, 2026", done: true },
      { status: "SHORTLISTED", date: "Jan 9, 2026", done: true },
      { status: "INTERVIEW", date: "Jan 18, 2026", done: true },
      { status: "OFFERED", date: "Pending", done: false },
    ],
  },
  {
    id: "3",
    jobTitle: "UX Designer",
    company: "CloudNine",
    location: "San Francisco, CA",
    appliedDate: "Dec 28, 2025",
    status: "APPLIED",
    timeline: [
      { status: "APPLIED", date: "Dec 28, 2025", done: true },
      { status: "SCREENING", date: "Pending", done: false },
      { status: "SHORTLISTED", date: "Pending", done: false },
      { status: "INTERVIEW", date: "Pending", done: false },
      { status: "OFFERED", date: "Pending", done: false },
    ],
  },
  {
    id: "4",
    jobTitle: "Frontend Engineer",
    company: "GrowthHub",
    location: "Austin, TX",
    appliedDate: "Dec 20, 2025",
    status: "REJECTED",
    timeline: [
      { status: "APPLIED", date: "Dec 20, 2025", done: true },
      { status: "REJECTED", date: "Dec 23, 2025", done: true },
    ],
  },
];

const statusColors: Record<string, "success" | "warning" | "info" | "secondary" | "destructive"> = {
  APPLIED: "info",
  SCREENING: "secondary",
  SHORTLISTED: "success",
  INTERVIEW: "warning",
  OFFERED: "success",
  REJECTED: "destructive",
};

export default function MyApplicationsPage() {
  const searchParams = useSearchParams();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const statusFilter = searchParams.get("status")?.toUpperCase() || "";

  const filteredApps = statusFilter
    ? applications.filter((a) => a.status === statusFilter)
    : applications;

  function handleWithdraw() {
    toast.success("Application withdrawn");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track your job application status</p>
      </div>

      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <p className="text-sm font-semibold">No Applications Found</p>
            <p className="mt-1 text-sm text-muted-foreground">No applications match this filter.</p>
          </div>
        ) : filteredApps.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{app.jobTitle}</h3>
                    <Badge variant={statusColors[app.status]} size="sm">
                      {app.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{app.company}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {app.appliedDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                  >
                    Timeline
                  </Button>
                  {app.status !== "REJECTED" && app.status !== "OFFERED" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleWithdraw()}
                    >
                      <X className="h-4 w-4" />
                      Withdraw
                    </Button>
                  )}
                </div>
              </div>

              {expandedId === app.id && (
                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center">
                    {app.timeline.map((step, i) => (
                      <React.Fragment key={step.status}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                              step.done
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <span className="mt-1 text-xs text-center whitespace-nowrap">{step.status}</span>
                          <span className="text-[10px] text-muted-foreground">{step.date}</span>
                        </div>
                        {i < app.timeline.length - 1 && (
                          <div
                            className={`mx-1 h-0.5 flex-1 ${
                              step.done && app.timeline[i + 1]?.done
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
