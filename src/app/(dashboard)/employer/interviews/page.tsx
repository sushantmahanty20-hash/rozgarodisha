"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  Users,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InterviewScheduler } from "@/components/ats/interview-scheduler";
import { cn } from "@/lib/utils";

const scheduledInterviews = [
  {
    id: "1",
    candidate: "Sarah Chen",
    role: "Senior React Developer",
    date: "Jan 22, 2026",
    time: "10:00 AM",
    type: "Video",
    interviewer: "Alex Chen",
    status: "scheduled",
  },
  {
    id: "2",
    candidate: "Emily Johnson",
    role: "Full Stack Engineer",
    date: "Jan 22, 2026",
    time: "2:00 PM",
    type: "On-site",
    interviewer: "Michael Torres",
    status: "scheduled",
  },
  {
    id: "3",
    candidate: "David Park",
    role: "Product Manager",
    date: "Jan 23, 2026",
    time: "11:00 AM",
    type: "Video",
    interviewer: "Sarah Kim",
    status: "completed",
  },
  {
    id: "4",
    candidate: "Lisa Anderson",
    role: "UX Designer",
    date: "Jan 20, 2026",
    time: "3:00 PM",
    type: "Video",
    interviewer: "David Park",
    status: "completed",
  },
];

const statusConfig: Record<string, { variant: "success" | "warning" | "info" | "secondary"; label: string }> = {
  scheduled: { variant: "info", label: "Scheduled" },
  completed: { variant: "success", label: "Completed" },
  cancelled: { variant: "destructive" as "destructive", label: "Cancelled" },
};

export default function EmployerInterviewsPage() {
  const [showScheduler, setShowScheduler] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Interview Management</h1>
          <p className="text-muted-foreground">
            Schedule and manage candidate interviews
          </p>
        </div>
        <Button onClick={() => setShowScheduler(!showScheduler)}>
          <Plus className="h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      {/* Interview Scheduler */}
      {showScheduler && (
        <Card>
          <CardContent className="p-6">
            <InterviewScheduler />
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {scheduledInterviews.filter((i) => i.status === "scheduled").length}
                </p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {scheduledInterviews.filter((i) => i.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledInterviews.length}</p>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Interviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Interviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledInterviews.map((interview) => (
              <div
                key={interview.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {interview.type === "Video" ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{interview.candidate}</h3>
                    <p className="text-xs text-muted-foreground">{interview.role}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {interview.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {interview.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {interview.interviewer}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusConfig[interview.status]?.variant ?? "secondary"} size="sm">
                    {statusConfig[interview.status]?.label ?? interview.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
