"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  Star,
  Trash2,
  Download,
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
import {
  useAdminView,
  viewFromParams,
  viewToQuery,
  type JobsManagementView,
  type AdminView,
} from "@/store/use-admin-view";

const mockJobs = [
  { id: "1", title: "Senior React Developer", company: "TechCorp Inc.", poster: "James Wilson", status: "PUBLISHED", applicants: 45, posted: "Jan 12, 2026", category: "Engineering" },
  { id: "2", title: "Product Manager", company: "StartupXYZ", poster: "Alex Kumar", status: "PENDING", applicants: 12, posted: "Jan 11, 2026", category: "Product" },
  { id: "3", title: "UX Designer", company: "DesignStudio", poster: "Maria Garcia", status: "PUBLISHED", applicants: 38, posted: "Jan 10, 2026", category: "Design" },
  { id: "4", title: "Data Scientist", company: "DataFlow AI", poster: "Tom Brown", status: "REJECTED", applicants: 0, posted: "Jan 9, 2026", category: "Data" },
  { id: "5", title: "DevOps Engineer", company: "CloudNine", poster: "David Park", status: "EXPIRED", applicants: 22, posted: "Dec 28, 2025", category: "Engineering" },
  { id: "6", title: "Marketing Lead", company: "GrowthHub", poster: "Emily Johnson", status: "DRAFT", applicants: 0, posted: "Jan 8, 2026", category: "Marketing" },
  { id: "7", title: "Backend Developer", company: "TechCorp Inc.", poster: "James Wilson", status: "PUBLISHED", applicants: 67, posted: "Jan 7, 2026", category: "Engineering" },
];

const statusConfig: Record<string, { variant: "success" | "warning" | "destructive" | "info" | "secondary" }> = {
  PUBLISHED: { variant: "success" },
  PENDING: { variant: "warning" },
  REJECTED: { variant: "destructive" },
  EXPIRED: { variant: "info" },
  DRAFT: { variant: "secondary" },
};

const viewMeta: Record<JobsManagementView, { title: string; subtitle: string; statuses: string[]; dropdownLabel: string }> = {
  all: { title: "All Jobs", subtitle: "Review and manage all job postings", statuses: ["PUBLISHED", "PENDING", "REJECTED", "EXPIRED", "DRAFT"], dropdownLabel: "All Status" },
  pending: { title: "Pending Jobs", subtitle: "Review jobs awaiting approval", statuses: ["PENDING"], dropdownLabel: "Pending" },
  active: { title: "Active Jobs", subtitle: "Manage currently active job postings", statuses: ["PUBLISHED"], dropdownLabel: "Active" },
  reported: { title: "Reported Jobs", subtitle: "Review jobs reported by users", statuses: ["REJECTED"], dropdownLabel: "Reported" },
};

export default function AdminJobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = useAdminView((s) => s.view);
  const setView = useAdminView((s) => s.setView);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const parsed = viewFromParams(searchParams);
    if (parsed.section === "jobs-management") setView(parsed);
  }, [searchParams, setView]);

  const meta =
    view.section === "jobs-management" ? viewMeta[view.value] : viewMeta.all;
  const statusFilter = view.section === "jobs-management" ? view.value : "all";

  const changeView = (value: JobsManagementView) => {
    const next: AdminView = { section: "jobs-management", value };
    setView(next);
    router.push(`/admin/jobs${viewToQuery(next)}`);
    setPage(1);
  };

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || meta.statuses.includes(job.status);
    return matchesSearch && matchesStatus;
  });

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const pagedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);

  const emptyMessages: Record<JobsManagementView, string> = {
    all: "No Jobs Found",
    pending: "No Jobs Awaiting Approval",
    active: "No Active Jobs",
    reported: "No Reported Jobs",
  };

  function handleApprove() {
    toast.success("Job approved successfully");
  }

  function handleReject() {
    toast.success("Job rejected");
  }

  function handleFeature() {
    toast.success("Job featured");
  }

  function handleDelete() {
    toast.success("Job deleted");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">{meta.title}</h1>
          <p className="text-muted-foreground">{meta.subtitle}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            const csv = filteredJobs.map((j) => [j.title, j.company, j.status, j.applicants].join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${meta.title.replace(/\s+/g, "-").toLowerCase()}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search ${meta.title.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => changeView(e.target.value as JobsManagementView)}
              className="h-10 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="reported">Reported</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            {pagedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-semibold">{emptyMessages[statusFilter as JobsManagementView] || "No Jobs Found"}</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Job</th>
                    <th className="pb-3 pr-4 font-medium">Company</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Applicants</th>
                    <th className="pb-3 pr-4 font-medium">Posted</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedJobs.map((job) => (
                    <tr key={job.id} className="border-b last:border-0">
                      <td className="py-4 pr-4">
                        <div>
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.category}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-sm">{job.company}</td>
                      <td className="py-4 pr-4">
                        <Badge variant={statusConfig[job.status]?.variant ?? "secondary"} size="sm">
                          {job.status}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4 text-sm">{job.applicants}</td>
                      <td className="py-4 pr-4 text-sm text-muted-foreground">{job.posted}</td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {job.status === "PENDING" && (
                              <>
                                <DropdownMenuItem onClick={() => handleApprove()}>
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleReject()} className="text-destructive">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem onClick={() => handleFeature()}>
                              <Star className="h-4 w-4 mr-2 text-amber-500" />
                              Feature
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete()} className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}