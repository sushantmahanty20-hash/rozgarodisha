"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  UserCheck,
  FileText,
  DollarSign,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"
import { StatsCard } from "@/components/shared/stats-card"
import { ActivityFeed } from "@/components/shared/activity-feed"
import type { ActivityItem } from "@/components/shared/activity-feed"
import { AreaChart } from "@/components/charts"
import { BarChart } from "@/components/charts"
import { DonutChart } from "@/components/charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const kpiStats = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Total Users",
    value: "1,27,482",
    change: 12.8,
    sparkline: [45, 52, 48, 61, 58, 72, 68, 80, 75, 88, 82, 95],
  },
  {
    icon: <UserCheck className="h-5 w-5" />,
    title: "Job Seekers",
    value: "89,241",
    change: 10.2,
    sparkline: [30, 35, 33, 42, 40, 48, 45, 55, 50, 62, 58, 68],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Employers",
    value: "4,891",
    change: 15.3,
    sparkline: [20, 22, 25, 24, 28, 30, 29, 34, 32, 38, 36, 42],
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Active Jobs",
    value: "3,482",
    change: 8.7,
    sparkline: [40, 38, 45, 42, 50, 48, 55, 52, 58, 56, 62, 60],
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Applications",
    value: "42,856",
    change: 22.1,
    sparkline: [25, 30, 28, 35, 40, 38, 48, 45, 55, 52, 65, 70],
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Successful Hires",
    value: "8,921",
    change: 5.4,
    sparkline: [15, 18, 16, 20, 19, 22, 21, 25, 24, 28, 26, 30],
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Active Subscriptions",
    value: "2,156",
    change: 9.8,
    sparkline: [10, 12, 11, 14, 13, 16, 15, 18, 17, 20, 19, 22],
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "Total Revenue",
    value: "₹24.8L",
    change: 18.2,
    sparkline: [35, 40, 38, 48, 45, 55, 50, 62, 58, 70, 65, 78],
  },
]

const userGrowthData = [
  { month: "Jan", candidates: 1200, employers: 180 },
  { month: "Feb", candidates: 1450, employers: 210 },
  { month: "Mar", candidates: 1680, employers: 245 },
  { month: "Apr", candidates: 1920, employers: 280 },
  { month: "May", candidates: 2100, employers: 310 },
  { month: "Jun", candidates: 2380, employers: 350 },
  { month: "Jul", candidates: 2650, employers: 395 },
  { month: "Aug", candidates: 2900, employers: 425 },
  { month: "Sep", candidates: 3200, employers: 460 },
  { month: "Oct", candidates: 3500, employers: 500 },
  { month: "Nov", candidates: 3750, employers: 535 },
  { month: "Dec", candidates: 4050, employers: 580 },
]

const jobPostingsData = [
  { month: "Jan", postings: 320 },
  { month: "Feb", postings: 385 },
  { month: "Mar", postings: 410 },
  { month: "Apr", postings: 465 },
  { month: "May", postings: 520 },
  { month: "Jun", postings: 490 },
  { month: "Jul", postings: 555 },
  { month: "Aug", postings: 610 },
  { month: "Sep", postings: 580 },
  { month: "Oct", postings: 640 },
  { month: "Nov", postings: 695 },
  { month: "Dec", postings: 730 },
]

const hiringFunnel = [
  { stage: "Job Views", count: 284521, conversion: null },
  { stage: "Applications", count: 42856, conversion: 15.1 },
  { stage: "Screened", count: 18234, conversion: 42.5 },
  { stage: "Shortlisted", count: 8921, conversion: 48.9 },
  { stage: "Interviews", count: 4567, conversion: 51.2 },
  { stage: "Offers", count: 1892, conversion: 41.4 },
  { stage: "Hired", count: 1234, conversion: 65.2 },
]

const revenueByPlan = [
  { name: "Starter", value: 35, color: "#2563eb" },
  { name: "Professional", value: 40, color: "#7c3aed" },
  { name: "Business", value: 15, color: "#10b981" },
  { name: "Enterprise", value: 10, color: "#f59e0b" },
]

const monthlyRevenueData = [
  { month: "Jul", revenue: 18.2 },
  { month: "Aug", revenue: 19.5 },
  { month: "Sep", revenue: 20.1 },
  { month: "Oct", revenue: 21.8 },
  { month: "Nov", revenue: 22.4 },
  { month: "Dec", revenue: 24.8 },
]

const subscriptionStats = [
  { label: "New Subscriptions", value: 342, trend: "+18.5%" },
  { label: "Renewals", value: 1247, trend: "+6.2%" },
  { label: "Cancelled", value: 89, trend: "-12.3%" },
  { label: "Churn Rate", value: "4.1%", trend: "-0.8%" },
]

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "system",
    title: "New employer registered: GreenEnergy Corp",
    description: "Completed KYC verification and posted first job listing",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "2",
    type: "application",
    title: "Job approved: Senior React Developer at TechNova",
    description: "Passed automated and manual review checks",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "3",
    type: "offer",
    title: "Payment received: ₹2,499 from FinEdge Capital",
    description: "Professional Plan - Annual subscription renewal",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "4",
    type: "interview",
    title: "Company verification pending: MediaMint",
    description: "Documents submitted, awaiting admin review",
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
  },
  {
    id: "5",
    type: "message",
    title: "Reported job: Marketing Manager (spam)",
    description: "Flagged by 3 users for misleading salary information",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "6",
    type: "system",
    title: "Subscription upgraded: CloudCore Systems to Business Plan",
    description: "Moved from Professional to Business tier",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "7",
    type: "application",
    title: "Bulk job import: 45 positions from TalentBridge",
    description: "API integration synced job listings successfully",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "8",
    type: "offer",
    title: "Refund processed: ₹999 to DataSwift Inc.",
    description: "Subscription cancellation within 7-day window",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
]

const recentUsers = [
  { name: "Priya Sharma", email: "priya.sharma@email.com", role: "Job Seeker", status: "Active", joined: "2 hours ago" },
  { name: "Rajesh Kumar", email: "rajesh@techcorp.in", role: "Employer", status: "Pending", joined: "5 hours ago" },
  { name: "Ananya Patel", email: "ananya.p@email.com", role: "Job Seeker", status: "Active", joined: "8 hours ago" },
  { name: "Vikram Singh", email: "vikram@startupxyz.com", role: "Employer", status: "Active", joined: "1 day ago" },
  { name: "Neha Gupta", email: "neha.g@email.com", role: "Job Seeker", status: "Suspended", joined: "1 day ago" },
]

const recentJobs = [
  { title: "Senior React Developer", company: "TechNova", status: "Active", applications: 128, posted: "1 day ago" },
  { title: "Product Manager", company: "FinEdge Capital", status: "Active", applications: 89, posted: "2 days ago" },
  { title: "UX Designer", company: "GreenEnergy Corp", status: "Under Review", applications: 54, posted: "3 days ago" },
  { title: "Data Scientist", company: "CloudCore Systems", status: "Active", applications: 201, posted: "3 days ago" },
  { title: "Marketing Manager", company: "MediaMint", status: "Flagged", applications: 67, posted: "4 days ago" },
]

const dateFilters = ["Today", "7 Days", "30 Days", "90 Days", "12 Months"]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "default" | "info"> = {
  Active: "success",
  Pending: "warning",
  Suspended: "destructive",
  Flagged: "destructive",
  "Under Review": "info",
}

export default function AdminDashboardPage() {
  const [dateFilter, setDateFilter] = useState("12 Months")

  const maxFunnelCount = hiringFunnel[0].count

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Business control center for the JobPortal platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dateFilters.map((filter) => (
            <Button
              key={filter}
              variant={dateFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter(filter)}
              className="text-xs"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {kpiStats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <StatsCard
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              sparkline={stat.sparkline}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={userGrowthData}
                xKey="month"
                areas={[
                  { key: "candidates", color: "#2563eb", name: "Candidates" },
                  { key: "employers", color: "#7c3aed", name: "Employers" },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Postings per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={jobPostingsData}
                xKey="month"
                bars={[{ key: "postings", color: "#2563eb", name: "Postings" }]}
                height={300}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hiringFunnel.map((stage, index) => {
                const widthPercent = (stage.count / maxFunnelCount) * 100
                return (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="w-28 shrink-0 text-right">
                      <p className="text-sm font-medium">{stage.stage}</p>
                    </div>
                    <div className="flex-1">
                      <div className="relative h-10 rounded-lg bg-muted/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPercent}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                          className="absolute inset-y-0 left-0 rounded-lg"
                          style={{
                            background: `linear-gradient(90deg, #2563eb ${0}%, #7c3aed ${100}%)`,
                            opacity: 1 - index * 0.1,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center px-4">
                          <span className="text-sm font-semibold text-white drop-shadow-sm">
                            {stage.count.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                    {stage.conversion !== null && (
                      <div className="w-24 shrink-0 flex items-center gap-1">
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        <Badge variant="success" size="sm">
                          {stage.conversion}%
                        </Badge>
                      </div>
                    )}
                    {stage.conversion === null && <div className="w-24 shrink-0" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={revenueByPlan}
                height={250}
                innerRadius={55}
                outerRadius={85}
                centerLabel="Total"
                centerValue="₹24.8L"
              />
              <div className="mt-4 space-y-2">
                {revenueByPlan.map((plan) => (
                  <div key={plan.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: plan.color }} />
                      <span>{plan.name}</span>
                    </div>
                    <span className="font-medium">{plan.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={monthlyRevenueData}
                xKey="month"
                bars={[{ key: "revenue", color: "#7c3aed", name: "Revenue (₹L)" }]}
                height={250}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Subscription Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {subscriptionStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {typeof stat.value === "number" ? stat.value.toLocaleString("en-IN") : stat.value}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          stat.trend.startsWith("+") && stat.label !== "Cancelled"
                            ? "text-emerald-500"
                            : stat.trend.startsWith("-") && stat.label === "Cancelled"
                              ? "text-emerald-500"
                              : stat.trend.startsWith("-") && stat.label === "Churn Rate"
                                ? "text-emerald-500"
                                : "text-red-500"
                        }`}
                      >
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  {typeof stat.value === "number" && (
                    <Progress
                      value={
                        stat.label === "New Subscriptions"
                          ? 68
                          : stat.label === "Renewals"
                            ? 85
                            : stat.label === "Cancelled"
                              ? 12
                              : 4
                      }
                      variant={
                        stat.label === "Cancelled"
                          ? "danger"
                          : stat.label === "Churn Rate"
                            ? "warning"
                            : "default"
                      }
                      size="sm"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed activities={recentActivities} hasMore />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Users</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.email} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{user.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-3">
                          <Badge variant={user.role === "Employer" ? "info" : "secondary"} size="sm">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant[user.status]} size="sm">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Jobs</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Applications</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={`${job.title}-${job.company}`} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{job.title}</td>
                        <td className="px-4 py-3 text-muted-foreground">{job.company}</td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant[job.status]} size="sm">
                            {job.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">{job.applications}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{job.posted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
