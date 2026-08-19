"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  UserCheck,
  CalendarDays,
  Handshake,
  Eye,
  Plus,
  Search,
  FileText,
  Clock,
  Video,
  Phone,
  MapPin,
  TrendingUp,
  BarChart3,
  Zap,
  Activity,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AreaChartComponent } from "@/components/charts/area-chart";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const hiringKPIs = [
  {
    title: "Active Jobs",
    value: 12,
    change: 3,
    icon: <Briefcase className="h-5 w-5" />,
    sparkline: [8, 9, 10, 11, 10, 12],
  },
  {
    title: "Applications",
    value: 286,
    change: 18,
    icon: <Users className="h-5 w-5" />,
    sparkline: [180, 210, 230, 250, 268, 286],
  },
  {
    title: "Shortlisted",
    value: 42,
    change: 8,
    icon: <UserCheck className="h-5 w-5" />,
    sparkline: [20, 25, 30, 34, 38, 42],
  },
  {
    title: "Interviews",
    value: 24,
    change: 6,
    icon: <CalendarDays className="h-5 w-5" />,
    sparkline: [12, 14, 16, 18, 20, 24],
  },
  {
    title: "Hires",
    value: 8,
    change: 2,
    icon: <Handshake className="h-5 w-5" />,
    sparkline: [3, 4, 5, 5, 6, 8],
  },
  {
    title: "Candidate Views",
    value: "4,821",
    change: 25,
    icon: <Eye className="h-5 w-5" />,
    sparkline: [2800, 3200, 3600, 4100, 4500, 4821],
  },
];

const subscriptionUsage = [
  { label: "Jobs", used: 12, total: 20, color: "#2563eb" },
  { label: "Resume Views", used: 312, total: 500, color: "#7c3aed" },
  { label: "Candidate Contacts", used: 67, total: 100, color: "#10b981" },
];

const jobPerformance = [
  { title: "Senior React Developer", views: 2482, applications: 184, shortlisted: 32, interviews: 8, hires: 3, status: "Active" },
  { title: "Product Manager", views: 1891, applications: 126, shortlisted: 24, interviews: 6, hires: 2, status: "Active" },
  { title: "UX Designer", views: 1234, applications: 89, shortlisted: 18, interviews: 4, hires: 1, status: "Active" },
  { title: "Data Scientist", views: 987, applications: 67, shortlisted: 12, interviews: 3, hires: 1, status: "Active" },
  { title: "DevOps Engineer", views: 456, applications: 23, shortlisted: 5, interviews: 1, hires: 0, status: "Draft" },
  { title: "Marketing Manager", views: 234, applications: 12, shortlisted: 2, interviews: 0, hires: 0, status: "Expired" },
];

const maxViews = Math.max(...jobPerformance.map((j) => j.views));

const candidateFunnel = [
  { stage: "Job Views", count: 7284, percentage: 100 },
  { stage: "Applications", count: 501, percentage: 6.9 },
  { stage: "Screened", count: 214, percentage: 42.7 },
  { stage: "Shortlisted", count: 93, percentage: 43.5 },
  { stage: "Interview", count: 22, percentage: 23.7 },
  { stage: "Offer", count: 8, percentage: 36.4 },
  { stage: "Hired", count: 7, percentage: 87.5 },
];

const applicationTrends = [
  { month: "Jan", applications: 42, shortlisted: 18 },
  { month: "Feb", applications: 58, shortlisted: 24 },
  { month: "Mar", applications: 71, shortlisted: 32 },
  { month: "Apr", applications: 89, shortlisted: 38 },
  { month: "May", applications: 112, shortlisted: 45 },
  { month: "Jun", applications: 128, shortlisted: 52 },
];

const recentApplicants = [
  { name: "Aditya Joshi", title: "Senior React Developer", years: 5, skills: ["React", "TypeScript", "Node.js"], job: "Senior React Dev", match: 94, color: "#2563eb" },
  { name: "Meera Krishnamurthy", title: "Product Manager", years: 7, skills: ["Strategy", "Agile", "Analytics"], job: "Product Manager", match: 89, color: "#7c3aed" },
  { name: "Rahul Malhotra", title: "UX Designer", years: 4, skills: ["Figma", "User Research", "Prototyping"], job: "UX Designer", match: 91, color: "#10b981" },
  { name: "Sneha Banerjee", title: "Data Scientist", years: 3, skills: ["Python", "TensorFlow", "SQL"], job: "Data Scientist", match: 87, color: "#f59e0b" },
  { name: "Karthik Sundaram", title: "DevOps Engineer", years: 6, skills: ["AWS", "Kubernetes", "Terraform"], job: "DevOps Engineer", match: 92, color: "#ef4444" },
];

const upcomingInterviews = [
  { candidate: "Aditya Joshi", job: "Senior React Dev", date: "Tomorrow", time: "10:00 AM", type: "Video" as const },
  { candidate: "Meera Krishnamurthy", job: "Product Manager", date: "22 Aug", time: "2:00 PM", type: "Onsite" as const },
  { candidate: "Rahul Malhotra", job: "UX Designer", date: "23 Aug", time: "11:00 AM", type: "Phone" as const },
];

const recentActivity = [
  { text: "18 new applications received for Senior React Developer", time: "2 hours ago", icon: <FileText className="h-4 w-4" /> },
  { text: "Aditya Joshi shortlisted for interview", time: "3 hours ago", icon: <UserCheck className="h-4 w-4" /> },
  { text: "Interview scheduled with Meera Krishnamurthy", time: "5 hours ago", icon: <CalendarDays className="h-4 w-4" /> },
  { text: "Senior React Developer received 240 new views", time: "1 day ago", icon: <Eye className="h-4 w-4" /> },
  { text: "Subscription usage reached 80%", time: "1 day ago", icon: <Activity className="h-4 w-4" /> },
  { text: "Product Manager expires in 5 days", time: "2 days ago", icon: <Clock className="h-4 w-4" /> },
];

const quickActions = [
  { label: "Post New Job", icon: <Plus className="h-5 w-5" />, href: "/employer/jobs", color: "from-blue-500 to-blue-600" },
  { label: "Search Candidates", icon: <Search className="h-5 w-5" />, href: "/employer/candidates", color: "from-violet-500 to-violet-600" },
  { label: "View Applications", icon: <FileText className="h-5 w-5" />, href: "/employer/applications", color: "from-emerald-500 to-emerald-600" },
  { label: "Schedule Interview", icon: <CalendarDays className="h-5 w-5" />, href: "/employer/interviews", color: "from-amber-500 to-amber-600" },
];

const statusVariant = (s: string): "default" | "secondary" | "destructive" | "outline" => {
  if (s === "Active") return "default";
  if (s === "Draft") return "secondary";
  return "destructive";
};

const interviewIcon = (t: string) => {
  if (t === "Video") return <Video className="h-4 w-4" />;
  if (t === "Phone") return <Phone className="h-4 w-4" />;
  return <MapPin className="h-4 w-4" />;
};

export default function EmployerDashboardPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div {...fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Hiring Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your hiring performance at a glance
          </p>
        </div>
        <Link href="/employer/jobs">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        {...fadeInUp}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {hiringKPIs.map((kpi) => (
          <StatsCard
            key={kpi.title}
            icon={kpi.icon}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            sparkline={kpi.sparkline}
          />
        ))}
      </motion.div>

      {/* Subscription + Chart row */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Subscription Status */}
        <motion.div {...fadeInUp} className="lg:col-span-2">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 dark:from-blue-950/30 dark:via-violet-950/30 dark:to-purple-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-600" />
                Professional Plan
              </CardTitle>
              <CardDescription className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">₹2,499</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm text-muted-foreground">
                Active until <span className="font-medium text-foreground">31 Aug 2026</span>
              </p>
              <div className="space-y-4">
                {subscriptionUsage.map((u) => (
                  <div key={u.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{u.label}</span>
                      <span className="font-medium">
                        {u.used}/{u.total}
                      </span>
                    </div>
                    <Progress
                      value={(u.used / u.total) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button size="sm" className="flex-1">
                  Upgrade Plan
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Application Trends */}
        <motion.div {...fadeInUp} className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Applications received vs shortlisted over 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChartComponent
                data={applicationTrends}
                xKey="month"
                areas={[
                  { key: "applications", color: "#2563eb", name: "Applications Received" },
                  { key: "shortlisted", color: "#10b981", name: "Candidates Shortlisted" },
                ]}
                height={260}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Job Performance Table */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Job Performance
            </CardTitle>
            <CardDescription>Metrics across all your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Job Title</th>
                    <th className="pb-3 pr-4 font-medium">Views</th>
                    <th className="pb-3 pr-4 font-medium">Applications</th>
                    <th className="pb-3 pr-4 font-medium">Shortlisted</th>
                    <th className="pb-3 pr-4 font-medium">Interviews</th>
                    <th className="pb-3 pr-4 font-medium">Hires</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPerformance.map((job, i) => (
                    <motion.tr
                      key={job.title}
                      className="border-b last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="py-3 pr-4 font-medium">{job.title}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="min-w-[48px] text-right">{job.views.toLocaleString()}</span>
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              className="h-full rounded-full bg-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${(job.views / maxViews) * 100}%` }}
                              transition={{ delay: i * 0.05 + 0.3, duration: 0.6 }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">{job.applications}</td>
                      <td className="py-3 pr-4">{job.shortlisted}</td>
                      <td className="py-3 pr-4">{job.interviews}</td>
                      <td className="py-3 pr-4">{job.hires}</td>
                      <td className="py-3">
                        <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Candidate Funnel + Recent Applications */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Candidate Funnel */}
        <motion.div {...fadeInUp} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Funnel</CardTitle>
              <CardDescription>Candidates at each hiring stage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidateFunnel.map((step, i) => (
                <div key={step.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{step.stage}</span>
                    <span className="font-medium">
                      {step.count.toLocaleString()}
                      {i > 0 && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({step.percentage}%)
                        </span>
                      )}
                    </span>
                  </div>
                  <motion.div
                    className="h-3 overflow-hidden rounded-full bg-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #2563eb ${0}%, #7c3aed ${100}%)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(step.count / candidateFunnel[0].count) * 100}%` }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Applications */}
        <motion.div {...fadeInUp} className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest candidates who applied</CardDescription>
                </div>
                <Link href="/employer/applications">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplicants.map((applicant, i) => (
                <motion.div
                  key={applicant.name}
                  className="flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Avatar className="h-12 w-12 border-2" style={{ borderColor: applicant.color }}>
                    <AvatarImage src="" />
                    <AvatarFallback
                      className="text-sm font-bold text-white"
                      style={{ backgroundColor: applicant.color }}
                    >
                      {applicant.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {applicant.title} · {applicant.years} yrs exp
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 dark:bg-emerald-950/30">
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-600">{applicant.match}%</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {applicant.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Applied for <span className="font-medium text-foreground">{applicant.job}</span>
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Shortlist
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive hover:text-destructive">
                        Reject
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Interviews + Quick Actions + Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Interviews */}
        <motion.div {...fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Upcoming Interviews
              </CardTitle>
              <CardDescription>Next 3 scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview, i) => (
                <motion.div
                  key={interview.candidate}
                  className="rounded-xl border p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{interview.candidate}</p>
                      <p className="text-sm text-muted-foreground">{interview.job}</p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      {interviewIcon(interview.type)}
                      {interview.type}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{interview.date} at {interview.time}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 flex-1 text-xs">
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 flex-1 text-xs">
                      Reschedule
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div {...fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={action.href}>
                    <div className={`flex flex-col items-center gap-3 rounded-xl bg-gradient-to-br ${action.color} p-5 text-white transition-transform hover:scale-105`}>
                      {action.icon}
                      <span className="text-xs font-medium">{action.label}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div {...fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 border-b py-3 last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {activity.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">{activity.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
