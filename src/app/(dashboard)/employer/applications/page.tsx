"use client";

import * as React from "react";
import {
  Search,
  MoreHorizontal,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  LayoutGrid,
  List,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const applications = [
  {
    id: "1",
    candidate: "Sarah Chen",
    email: "sarah@example.com",
    job: "Senior React Developer",
    status: "SHORTLISTED",
    applied: "2 hours ago",
    match: 92,
    experience: "5 years",
    note: "Strong portfolio, great culture fit",
  },
  {
    id: "2",
    candidate: "Emily Johnson",
    email: "emily@example.com",
    job: "Senior React Developer",
    status: "APPLIED",
    applied: "5 hours ago",
    match: 87,
    experience: "4 years",
    note: "",
  },
  {
    id: "3",
    candidate: "David Park",
    email: "david@example.com",
    job: "Product Manager",
    status: "INTERVIEW",
    applied: "1 day ago",
    match: 85,
    experience: "7 years",
    note: "Scheduled interview for Thursday",
  },
  {
    id: "4",
    candidate: "Lisa Anderson",
    email: "lisa@example.com",
    job: "UX Designer",
    status: "APPLIED",
    applied: "1 day ago",
    match: 78,
    experience: "3 years",
    note: "",
  },
  {
    id: "5",
    candidate: "Tom Brown",
    email: "tom@example.com",
    job: "Senior React Developer",
    status: "REJECTED",
    applied: "2 days ago",
    match: 62,
    experience: "2 years",
    note: "Insufficient experience",
  },
  {
    id: "6",
    candidate: "Alex Kumar",
    email: "alex@example.com",
    job: "Product Manager",
    status: "HR_ROUND",
    applied: "3 days ago",
    match: 91,
    experience: "6 years",
    note: "Passed technical round",
  },
];

const statusColors: Record<string, "success" | "warning" | "info" | "secondary" | "destructive"> = {
  APPLIED: "info",
  SCREENING: "secondary",
  SHORTLISTED: "success",
  INTERVIEW: "warning",
  HR_ROUND: "warning",
  OFFERED: "success",
  REJECTED: "destructive",
};

const pipelineColumns = [
  { key: "APPLIED", label: "Applied", color: "bg-blue-500" },
  { key: "SHORTLISTED", label: "Shortlisted", color: "bg-emerald-500" },
  { key: "INTERVIEW", label: "Interview", color: "bg-amber-500" },
  { key: "HR_ROUND", label: "HR Round", color: "bg-violet-500" },
  { key: "OFFERED", label: "Offered", color: "bg-pink-500" },
];

export default function EmployerApplicationsPage() {
  const [view, setView] = React.useState<"pipeline" | "table">("table");
  const [search, setSearch] = React.useState("");

  const filteredApplications = applications.filter(
    (a) =>
      a.candidate.toLowerCase().includes(search.toLowerCase()) ||
      a.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Applications</h1>
          <p className="text-muted-foreground">Review and manage candidate applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "pipeline" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("pipeline")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by candidate or job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {view === "pipeline" ? (
        /* Kanban Pipeline View */
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineColumns.map((col) => {
            const colApps = filteredApplications.filter((a) => a.status === col.key);
            return (
              <div key={col.key} className="min-w-[300px] flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", col.color)} />
                  <span className="text-sm font-medium">{col.label}</span>
                  <span className="text-xs text-muted-foreground">({colApps.length})</span>
                </div>
                <div className="space-y-3">
                  {colApps.map((app) => (
                    <Card key={app.id} className="cursor-pointer hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {app.candidate.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{app.candidate}</p>
                            <p className="text-xs text-muted-foreground">{app.job}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="info" size="sm">
                            {app.match}% match
                          </Badge>
                          <span className="text-xs text-muted-foreground">{app.applied}</span>
                        </div>
                        {app.note && (
                          <p className="mt-2 text-xs text-muted-foreground truncate">
                            {app.note}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {colApps.length === 0 && (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Candidate</th>
                    <th className="pb-3 pr-4 font-medium">Job</th>
                    <th className="pb-3 pr-4 font-medium">Match</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Applied</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b last:border-0">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {app.candidate.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{app.candidate}</p>
                            <p className="text-xs text-muted-foreground">{app.experience}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-sm">{app.job}</td>
                      <td className="py-4 pr-4">
                        <Badge variant="info" size="sm">{app.match}%</Badge>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant={statusColors[app.status]} size="sm">{app.status}</Badge>
                      </td>
                      <td className="py-4 pr-4 text-sm text-muted-foreground">{app.applied}</td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              View Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.success("Candidate shortlisted")}>
                              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                              Shortlist
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Candidate rejected")} className="text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
