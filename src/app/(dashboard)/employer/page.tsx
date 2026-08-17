"use client";

import * as React from "react";
import {
  Briefcase,
  Users,
  Calendar,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Active Jobs",
    value: "12",
    change: "+3",
    trend: "up" as const,
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    label: "Total Applications",
    value: "234",
    change: "+45",
    trend: "up" as const,
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Interviews",
    value: "18",
    change: "+5",
    trend: "up" as const,
    icon: Calendar,
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
  {
    label: "Offers Sent",
    value: "4",
    change: "+1",
    trend: "up" as const,
    icon: FileCheck,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

const recentApplications = [
  { id: "1", name: "Sarah Chen", role: "Senior React Developer", status: "SHORTLISTED", date: "2 hours ago", match: 92 },
  { id: "2", name: "Emily Johnson", role: "Senior React Developer", status: "APPLIED", date: "5 hours ago", match: 87 },
  { id: "3", name: "David Park", role: "Product Manager", status: "INTERVIEW", date: "1 day ago", match: 85 },
  { id: "4", name: "Lisa Anderson", role: "UX Designer", status: "APPLIED", date: "1 day ago", match: 78 },
  { id: "5", name: "Tom Brown", role: "Senior React Developer", status: "REJECTED", date: "2 days ago", match: 62 },
];

const statusColors: Record<string, "success" | "warning" | "info" | "secondary" | "destructive"> = {
  APPLIED: "info",
  SHORTLISTED: "success",
  INTERVIEW: "warning",
  OFFERED: "success",
  REJECTED: "destructive",
};

export default function EmployerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your job postings and applicants
          </p>
        </div>
        <Link href="/employer/jobs">
          <Button>
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <ArrowUpRight className="h-4 w-4" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <Link href="/employer/applications">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {app.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{app.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Applied for {app.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusColors[app.status]} size="sm">
                      {app.status}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Chart */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/employer/jobs">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Button>
              </Link>
              <Link href="/employer/applications">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4" />
                  View Candidates
                </Button>
              </Link>
              <Link href="/employer/jobs">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4" />
                  Manage Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-primary/10">
                <TrendingUp className="h-8 w-8 text-primary/40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
