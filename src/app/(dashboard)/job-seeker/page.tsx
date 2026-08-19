"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Bookmark,
  Bell,
  Calendar,
  FileText,
  Eye,
  MapPin,
  Clock,
  ArrowUpRight,
  Video,
  Phone,
  MapPinned,
  Edit,
  Pause,
  Trash2,
  Sparkles,
  CheckCircle2,
  Circle,
  Star,
} from "lucide-react";
import { StatsCard } from "@/components/shared/stats-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { AreaChartComponent } from "@/components/charts/area-chart";
import { DonutChartComponent } from "@/components/charts/donut-chart";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const statsCards = [
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Applications",
    value: "18",
    change: 28,
    sparkline: [6, 8, 10, 9, 12, 14, 16, 18],
    subtitle: "+4 this month",
  },
  {
    icon: <Bookmark className="h-5 w-5" />,
    title: "Saved Jobs",
    value: "12",
    change: 33,
    sparkline: [4, 5, 6, 7, 8, 9, 11, 12],
    subtitle: "3 new matches",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "Interviews",
    value: "3",
    change: 50,
    sparkline: [1, 1, 2, 2, 2, 3, 3, 3],
    subtitle: "1 upcoming",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Profile Views",
    value: "128",
    change: 22,
    sparkline: [80, 85, 92, 100, 105, 110, 118, 128],
    subtitle: "+22% this week",
  },
];

const missingItems = ["Professional Summary", "2 Skills", "Certification"];

const recommendedJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechNova Solutions",
    location: "Bengaluru",
    salary: "\u20B918L - \u20B928L",
    workMode: "Hybrid",
    employmentType: "Full-time",
    match: 94,
    logo: "TN",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "FinEdge Capital",
    location: "Mumbai",
    salary: "\u20B920L - \u20B932L",
    workMode: "Onsite",
    employmentType: "Full-time",
    match: 89,
    logo: "FE",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Vertex Labs",
    location: "Hyderabad",
    salary: "\u20B912L - \u20B920L",
    workMode: "Hybrid",
    employmentType: "Full-time",
    match: 91,
    logo: "VL",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "CloudCore Systems",
    location: "Remote",
    salary: "\u20B922L - \u20B935L",
    workMode: "Remote",
    employmentType: "Full-time",
    match: 87,
    logo: "CC",
  },
];

const applicationStages = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Offer",
  "Hired",
];

const recentApplications = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechNova",
    date: "16 Aug 2026",
    status: "Interview",
    statusVariant: "warning" as const,
    stageIndex: 3,
    nextStep: "Interview on 20 Aug, 11:30 AM",
    logo: "TN",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "FinEdge",
    date: "14 Aug 2026",
    status: "Shortlisted",
    statusVariant: "success" as const,
    stageIndex: 2,
    nextStep: "Awaiting interview schedule",
    logo: "FE",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "CloudCore",
    date: "12 Aug 2026",
    status: "Under Review",
    statusVariant: "info" as const,
    stageIndex: 1,
    nextStep: "Resume being reviewed",
    logo: "CC",
  },
];

const upcomingInterviews = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechNova Solutions",
    interviewer: "Priya Sharma",
    date: "Tomorrow",
    time: "11:30 AM",
    type: "Video",
    icon: <Video className="h-4 w-4" />,
  },
];

const jobAlerts = [
  {
    id: "1",
    query: "React Developer",
    location: "Bengaluru",
    frequency: "Daily",
    active: true,
  },
  {
    id: "2",
    query: "Marketing Executive",
    location: "Mumbai",
    frequency: "Weekly",
    active: true,
  },
];

const recentActivity = [
  {
    id: "1",
    text: "You applied for Senior Developer at TechNova",
    time: "2 days ago",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: "2",
    text: "Your profile was viewed by FinEdge Capital",
    time: "3 days ago",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    id: "3",
    text: "Application shortlisted for Product Manager at FinEdge",
    time: "5 days ago",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    id: "4",
    text: "New job alert: 12 matches found",
    time: "1 week ago",
    icon: <Sparkles className="h-4 w-4" />,
  },
];

const applicationChartData = [
  { month: "Apr", applications: 3, interviews: 0 },
  { month: "May", applications: 5, interviews: 1 },
  { month: "Jun", applications: 4, interviews: 1 },
  { month: "Jul", applications: 6, interviews: 2 },
  { month: "Aug", applications: 18, interviews: 3 },
];

const statusBreakdownData = [
  { name: "Interview", value: 1, color: "#f59e0b" },
  { name: "Shortlisted", value: 1, color: "#10b981" },
  { name: "Under Review", value: 1, color: "#2563eb" },
  { name: "Applied", value: 15, color: "#94a3b8" },
];

function getMatchBg(match: number) {
  if (match >= 90) return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20";
  if (match >= 80) return "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/20";
  return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20";
}

function getWorkModeBadgeVariant(mode: string): "info" | "success" | "secondary" {
  switch (mode) {
    case "Remote":
      return "success";
    case "Hybrid":
      return "info";
    default:
      return "secondary";
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Video":
      return <Video className="h-4 w-4" />;
    case "Phone":
      return <Phone className="h-4 w-4" />;
    default:
      return <MapPinned className="h-4 w-4" />;
  }
}

export default function JobSeekerDashboardPage() {
  const [savedJobs, setSavedJobs] = React.useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Welcome back, Rahul!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s how your job search is going.
        </p>
      </motion.div>

      {/* ── TOP ROW: KPI CARDS ── */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <StatsCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            sparkline={stat.sparkline}
          />
        ))}
      </motion.div>

      {/* ── PROFILE COMPLETION ── */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-purple-500/10 dark:from-blue-500/20 dark:via-violet-500/10 dark:to-purple-500/20">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      Your Profile is 82% Complete
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      A complete profile gets 3x more views from employers
                    </p>
                  </div>
                </div>
                <Progress value={82} className="h-2.5" />
                <div className="flex flex-wrap gap-2">
                  {missingItems.map((mi) => (
                    <Badge key={mi} variant="outline" size="sm">
                      Missing: {mi}
                    </Badge>
                  ))}
                </div>
              </div>
              <Link href="/job-seeker/profile">
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                  Complete Profile
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── RECOMMENDED JOBS ── */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            Recommended for You
          </h2>
          <Link href="/jobs">
            <Button variant="ghost" size="sm">
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between">
                    <Avatar size="md">
                      <AvatarFallback>{job.logo}</AvatarFallback>
                    </Avatar>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", getMatchBg(job.match))}>
                      {job.match}% Match
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <p className="font-medium text-foreground">{job.salary}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant={getWorkModeBadgeVariant(job.workMode)} size="sm">
                      {job.workMode}
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {job.employmentType}
                    </Badge>
                  </div>
                  <div className="mt-auto flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => toggleSave(job.id)}
                    >
                      <Bookmark
                        className={cn(
                          "h-4 w-4",
                          savedJobs.has(job.id) && "fill-current text-violet-500"
                        )}
                      />
                    </Button>
                    <Button size="sm" className="flex-1">
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── APPLICATION TRACKER + CHARTS ── */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Application Tracker
          </h2>
          <Link href="/job-seeker/applications">
            <Button variant="ghost" size="sm">
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Applications List */}
          <div className="xl:col-span-2 space-y-4">
            {recentApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>{app.logo}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{app.title}</h3>
                          <p className="text-sm text-muted-foreground">{app.company} &middot; Applied {app.date}</p>
                        </div>
                      </div>
                      <Badge variant={app.statusVariant} size="sm">
                        {app.status}
                      </Badge>
                    </div>
                    {/* Pipeline */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1">
                      {applicationStages.map((stage, idx) => {
                        const isActive = idx === app.stageIndex;
                        const isCompleted = idx < app.stageIndex;
                        return (
                          <div key={stage} className="flex items-center gap-1">
                            <div className="flex items-center gap-1.5">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              ) : isActive ? (
                                <motion.div
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                >
                                  <Circle className="h-4 w-4 text-blue-500 fill-blue-500 shrink-0" />
                                </motion.div>
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                              )}
                              <span
                                className={cn(
                                  "text-xs whitespace-nowrap",
                                  isCompleted && "text-emerald-600 dark:text-emerald-400",
                                  isActive && "font-semibold text-foreground",
                                  !isCompleted && !isActive && "text-muted-foreground/50"
                                )}
                              >
                                {stage}
                              </span>
                            </div>
                            {idx < applicationStages.length - 1 && (
                              <div className={cn("h-px w-4 shrink-0", isCompleted ? "bg-emerald-400" : "bg-muted-foreground/20")} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {/* Next step */}
                    {app.nextStep && (
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span>Next: {app.nextStep}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Applications Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChartComponent
                  data={applicationChartData}
                  xKey="month"
                  areas={[
                    { key: "applications", color: "#2563eb", name: "Applications" },
                    { key: "interviews", color: "#10b981", name: "Interviews" },
                  ]}
                  height={200}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChartComponent
                  data={statusBreakdownData}
                  height={200}
                  innerRadius={50}
                  outerRadius={75}
                  centerLabel="Total"
                  centerValue="18"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* ── UPCOMING INTERVIEWS + JOB ALERTS ── */}
      <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-5 w-5 text-violet-500" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview.id}
                className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                      {getTypeIcon(interview.type)}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{interview.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {interview.company}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar size="sm" className="h-5 w-5">
                          <AvatarFallback className="text-[8px]">
                            {interview.interviewer.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{interview.interviewer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1 shrink-0">
                    <Badge variant="info" size="sm">{interview.type}</Badge>
                    <p className="text-sm font-medium">{interview.date}, {interview.time}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Join Interview
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Job Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-5 w-5 text-amber-500" />
                Job Alerts
              </CardTitle>
              <Button variant="ghost" size="sm">
                + New Alert
              </Button>
            </div>
            <CardDescription>Manage your saved job alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-muted/30"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">
                    {alert.query} in {alert.location}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {alert.frequency} &middot; {alert.active ? "Active" : "Paused"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Pause className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── RECENT ACTIVITY ── */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-5 w-5 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {recentActivity.map((activity, idx) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-start gap-3 py-3",
                    idx < recentActivity.length - 1 && "border-b"
                  )}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}


