"use client";

import * as React from "react";
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Zap,
  Shield,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Employers",
    value: "1,234",
    change: "+12%",
    trend: "up" as const,
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    label: "Job Seekers",
    value: "8,567",
    change: "+23%",
    trend: "up" as const,
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Active Jobs",
    value: "3,421",
    change: "+8%",
    trend: "up" as const,
    icon: Briefcase,
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
  {
    label: "Revenue",
    value: "$45,230",
    change: "+18%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "New company registered",
    detail: "TechCorp Inc. joined as employer",
    time: "2 min ago",
    type: "success",
  },
  {
    id: 2,
    action: "Job flagged for review",
    detail: "Suspicious posting detected by AI",
    time: "15 min ago",
    type: "warning",
  },
  {
    id: 3,
    action: "Payment received",
    detail: "$299 from StartupXYZ for Premium plan",
    time: "1 hour ago",
    type: "success",
  },
  {
    id: 4,
    action: "New admin login",
    detail: "Super Admin logged in from new device",
    time: "2 hours ago",
    type: "info",
  },
  {
    id: 5,
    action: "User reported",
    detail: "Job seeker reported spam listing",
    time: "3 hours ago",
    type: "error",
  },
];

const quickActions = [
  { label: "Manage Users", icon: Users, href: "/admin/users" },
  { label: "Review Jobs", icon: Briefcase, href: "/admin/jobs" },
  { label: "Approve Companies", icon: Building2, href: "/admin/companies" },
  { label: "System Settings", icon: Settings, href: "/admin/settings" },
];

const activityColors = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  info: "text-blue-500",
  error: "text-destructive",
};

const healthIndicators = [
  { label: "API Response", status: "healthy", value: "45ms" },
  { label: "Database", status: "healthy", value: "2.1ms" },
  { label: "Cache Hit Rate", status: "healthy", value: "94.2%" },
  { label: "Uptime", status: "healthy", value: "99.9%" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform performance
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium",
                    stat.trend === "up" ? "text-emerald-600" : "text-destructive"
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
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
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    {activity.type === "success" && <CheckCircle2 className={cn("h-4 w-4", activityColors[activity.type])} />}
                    {activity.type === "warning" && <AlertCircle className={cn("h-4 w-4", activityColors[activity.type])} />}
                    {activity.type === "info" && <Activity className={cn("h-4 w-4", activityColors[activity.type])} />}
                    {activity.type === "error" && <AlertCircle className={cn("h-4 w-4", activityColors[activity.type])} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href={action.href}>
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Job Postings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="text-center">
                <TrendingUp className="mx-auto h-12 w-12 text-primary/40" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Chart will render with real data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthIndicators.map((indicator) => (
              <div key={indicator.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm">{indicator.label}</span>
                </div>
                <Badge variant="success" size="sm">
                  {indicator.value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
