"use client";

import * as React from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Pause,
  Copy,
  Trash2,
  Eye,
  Users,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const mockJobs = [
  { id: "1", title: "Senior React Developer", status: "PUBLISHED", applicants: 45, views: 1230, posted: "Jan 12, 2026", type: "FULL_TIME", location: "Remote" },
  { id: "2", title: "Product Manager", status: "PUBLISHED", applicants: 23, views: 890, posted: "Jan 10, 2026", type: "FULL_TIME", location: "New York" },
  { id: "3", title: "UX Designer", status: "DRAFT", applicants: 0, views: 0, posted: "Jan 8, 2026", type: "PART_TIME", location: "San Francisco" },
  { id: "4", title: "Backend Engineer", status: "PAUSED", applicants: 67, views: 2100, posted: "Jan 5, 2026", type: "FULL_TIME", location: "Remote" },
  { id: "5", title: "DevOps Engineer", status: "CLOSED", applicants: 34, views: 1500, posted: "Dec 20, 2025", type: "CONTRACT", location: "Austin" },
  { id: "6", title: "Data Analyst", status: "PUBLISHED", applicants: 12, views: 450, posted: "Jan 14, 2026", type: "FULL_TIME", location: "Chicago" },
];

const statusConfig: Record<string, { variant: "success" | "warning" | "secondary" | "info" }> = {
  PUBLISHED: { variant: "success" },
  DRAFT: { variant: "secondary" },
  PAUSED: { variant: "warning" },
  CLOSED: { variant: "info" },
};

export default function EmployerJobsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My Jobs</h1>
          <p className="text-muted-foreground">Manage your job postings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="mt-6 space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{job.title}</p>
                    <Badge variant={statusConfig[job.status]?.variant} size="sm">
                      {job.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {job.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {job.views} views
                    </span>
                    <span>{job.location}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.posted}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    {job.status === "PUBLISHED" && (
                      <DropdownMenuItem>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => toast.success("Job cloned")}>
                      <Copy className="h-4 w-4 mr-2" />
                      Clone
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Close & Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
