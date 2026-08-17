"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Calendar,
  Bookmark,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const profileCompletion = 65;

const recommendedJobs = [
  { id: "1", title: "Senior React Developer", company: "TechCorp Inc.", location: "Remote", salary: "$120K - $160K", match: 94, posted: "2h ago" },
  { id: "2", title: "Full Stack Engineer", company: "StartupXYZ", location: "New York, NY", salary: "$110K - $140K", match: 88, posted: "1d ago" },
  { id: "3", title: "Frontend Lead", company: "DesignStudio", location: "San Francisco, CA", salary: "$130K - $170K", match: 82, posted: "3d ago" },
];

const appliedJobs = [
  { id: "1", title: "Product Manager", company: "DataFlow AI", status: "INTERVIEW", date: "Applied 5 days ago" },
  { id: "2", title: "UX Designer", company: "CloudNine", status: "SHORTLISTED", date: "Applied 1 week ago" },
  { id: "3", title: "Backend Developer", company: "TechCorp Inc.", status: "APPLIED", date: "Applied 2 weeks ago" },
];

const upcomingInterviews = [
  { id: "1", title: "Product Manager", company: "DataFlow AI", date: "Jan 18, 2026", time: "10:00 AM", type: "Video" },
  { id: "2", title: "UX Designer", company: "CloudNine", date: "Jan 22, 2026", time: "2:00 PM", type: "On-site" },
];

const statusColors: Record<string, "success" | "warning" | "info" | "secondary" | "destructive"> = {
  APPLIED: "info",
  SHORTLISTED: "success",
  INTERVIEW: "warning",
  OFFERED: "success",
  REJECTED: "destructive",
};

export default function JobSeekerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s your job search overview
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Completion */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Complete your profile</h3>
                <p className="text-sm text-muted-foreground">
                  A complete profile gets 3x more views from employers
                </p>
              </div>
              <span className="text-2xl font-bold text-primary">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="mt-4" />
            <Link href="/job-seeker/profile">
              <Button variant="link" className="mt-3 px-0">
                Complete Profile
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">AI Insights</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Based on your profile, you&apos;d be a great fit for React and TypeScript roles in the fintech sector.
            </p>
            <Button variant="link" className="mt-2 px-0 text-sm" size="sm">
              View Recommendations
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Recommended Jobs
              </CardTitle>
              <Link href="/jobs">
                <Button variant="ghost" size="sm">
                  View All <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendedJobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="flex items-center gap-4 rounded-xl border p-3 transition-colors hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.company} &middot; {job.location}
                    </p>
                    <p className="text-xs text-muted-foreground">{job.salary}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" size="sm">{job.match}% match</Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{job.posted}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Applied Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                My Applications
              </CardTitle>
              <Link href="/job-seeker/applications">
                <Button variant="ghost" size="sm">
                  View All <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {appliedJobs.map((job) => (
              <div key={job.id} className="flex items-center gap-4 rounded-xl border p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.company}</p>
                </div>
                <div className="text-right">
                  <Badge variant={statusColors[job.status]} size="sm">{job.status}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{job.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center gap-4 rounded-xl border p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{interview.title}</p>
                  <p className="text-xs text-muted-foreground">{interview.company}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-medium">{interview.date}</p>
                  <p className="text-muted-foreground">{interview.time} &middot; {interview.type}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Saved Jobs Quick Access */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Saved Jobs
              </CardTitle>
              <Link href="/job-seeker/saved-jobs">
                <Button variant="ghost" size="sm">
                  View All <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-24 items-center justify-center rounded-xl border border-dashed">
              <p className="text-sm text-muted-foreground">
                Browse jobs and save your favorites
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
