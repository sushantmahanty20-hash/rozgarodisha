"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Eye,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  type CompaniesManagementView,
  type AdminView,
} from "@/store/use-admin-view";

interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  verificationStatus: string;
  jobs: number;
  owner: string;
}

const mockCompanies: Company[] = [
  { id: "1", name: "TechCorp Inc.", industry: "Technology", size: "201-500", verificationStatus: "VERIFIED", jobs: 12, owner: "James Wilson" },
  { id: "2", name: "StartupXYZ", industry: "SaaS", size: "11-50", verificationStatus: "PENDING", jobs: 5, owner: "Alex Kumar" },
  { id: "3", name: "DesignStudio", industry: "Design", size: "1-10", verificationStatus: "UNVERIFIED", jobs: 3, owner: "Maria Garcia" },
  { id: "4", name: "DataFlow AI", industry: "AI/ML", size: "51-200", verificationStatus: "VERIFIED", jobs: 8, owner: "Tom Brown" },
  { id: "5", name: "CloudNine", industry: "Cloud", size: "501-1000", verificationStatus: "REJECTED", jobs: 0, owner: "David Park" },
];

const statusConfig: Record<string, { variant: "success" | "warning" | "secondary" | "destructive"; label: string }> = {
  VERIFIED: { variant: "success", label: "Verified" },
  PENDING: { variant: "warning", label: "Pending" },
  UNVERIFIED: { variant: "secondary", label: "Unverified" },
  REJECTED: { variant: "destructive", label: "Rejected" },
};

const viewMeta: Record<CompaniesManagementView, { title: string; subtitle: string; filter: (c: Company) => boolean; dropdownLabel: string }> = {
  all: {
    title: "All Companies",
    subtitle: "Manage registered companies",
    filter: () => true,
    dropdownLabel: "All Companies",
  },
  "pending-verification": {
    title: "Pending Verification",
    subtitle: "Review companies awaiting verification",
    filter: (c) => c.verificationStatus === "PENDING",
    dropdownLabel: "Pending Verification",
  },
  "recruiter-agencies": {
    title: "Recruiter Agencies",
    subtitle: "Manage registered recruitment and staffing agencies",
    filter: (c) => c.id === "4",
    dropdownLabel: "Recruiter Agencies",
  },
};

export default function AdminCompaniesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = useAdminView((s) => s.view);
  const setView = useAdminView((s) => s.setView);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [preview, setPreview] = React.useState<Company | null>(null);

  React.useEffect(() => {
    const parsed = viewFromParams(searchParams);
    if (parsed.section === "companies") setView(parsed);
  }, [searchParams, setView]);

  const meta = view.section === "companies" ? viewMeta[view.value] : viewMeta.all;
  const statusFilter = view.section === "companies" ? view.value : "all";

  const changeView = (value: CompaniesManagementView) => {
    const next: AdminView = { section: "companies", value };
    setView(next);
    router.push(`/admin/companies${viewToQuery(next)}`);
    setPage(1);
  };

  const filteredCompanies = mockCompanies.filter(
    (c) =>
      meta.filter(c) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.industry.toLowerCase().includes(search.toLowerCase()) ||
        c.owner.toLowerCase().includes(search.toLowerCase()))
  );

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / pageSize));
  const pagedCompanies = filteredCompanies.slice((page - 1) * pageSize, page * pageSize);

  const emptyMessages: Record<CompaniesManagementView, string> = {
    all: "No Companies Found",
    "pending-verification": "No Companies Awaiting Verification",
    "recruiter-agencies": "No Recruiter Agencies Found",
  };

  function handleApprove() {
    toast.success("Company verified");
  }

  function handleReject() {
    toast.success("Verification rejected");
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
            const csv = filteredCompanies.map((c) => [c.name, c.industry, c.verificationStatus, c.jobs].join(",")).join("\n");
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
              onChange={(e) => changeView(e.target.value as CompaniesManagementView)}
              className="h-10 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Companies</option>
              <option value="pending-verification">Pending Verification</option>
              <option value="recruiter-agencies">Recruiter Agencies</option>
            </select>
          </div>

          <div className="mt-6 space-y-3">
            {pagedCompanies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-semibold">{emptyMessages[statusFilter as CompaniesManagementView] || "No Companies Found"}</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search.</p>
              </div>
            ) : (
              pagedCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
                >
                  <Avatar size="lg">
                    <AvatarFallback className="text-lg">
                      {company.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{company.name}</p>
                      {company.verificationStatus === "VERIFIED" && (
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {company.industry} &middot; {company.size} employees &middot; {company.jobs} jobs &middot; {company.owner}
                    </p>
                  </div>
                  <Badge variant={statusConfig[company.verificationStatus]?.variant} size="sm">
                    {statusConfig[company.verificationStatus]?.label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setPreview(company)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      {company.verificationStatus === "PENDING" && (
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
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

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
            <DialogDescription>{preview?.industry}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium">{preview?.size}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active Jobs</p>
                <p className="font-medium">{preview?.jobs}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Owner</p>
                <p className="font-medium">{preview?.owner}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant={statusConfig[preview?.verificationStatus ?? "UNVERIFIED"]?.variant} size="sm">
                  {statusConfig[preview?.verificationStatus ?? "UNVERIFIED"]?.label}
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}