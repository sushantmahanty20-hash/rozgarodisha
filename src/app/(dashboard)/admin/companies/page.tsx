"use client";

import * as React from "react";
import {
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Shield,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const mockCompanies = [
  { id: "1", name: "TechCorp Inc.", slug: "techcorp", industry: "Technology", size: "201-500", verificationStatus: "VERIFIED", jobs: 12, owner: "James Wilson" },
  { id: "2", name: "StartupXYZ", slug: "startupxyz", industry: "SaaS", size: "11-50", verificationStatus: "PENDING", jobs: 5, owner: "Alex Kumar" },
  { id: "3", name: "DesignStudio", slug: "designstudio", industry: "Design", size: "1-10", verificationStatus: "UNVERIFIED", jobs: 3, owner: "Maria Garcia" },
  { id: "4", name: "DataFlow AI", slug: "dataflow", industry: "AI/ML", size: "51-200", verificationStatus: "VERIFIED", jobs: 8, owner: "Tom Brown" },
  { id: "5", name: "CloudNine", slug: "cloudnine", industry: "Cloud", size: "501-1000", verificationStatus: "REJECTED", jobs: 0, owner: "David Park" },
];

const statusConfig: Record<string, { variant: "success" | "warning" | "secondary" | "destructive"; label: string }> = {
  VERIFIED: { variant: "success", label: "Verified" },
  PENDING: { variant: "warning", label: "Pending" },
  UNVERIFIED: { variant: "secondary", label: "Unverified" },
  REJECTED: { variant: "destructive", label: "Rejected" },
};

export default function AdminCompaniesPage() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [previewCompany, setPreviewCompany] = React.useState<(typeof mockCompanies)[0] | null>(null);

  const filteredCompanies = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  function handleApprove(id: string) {
    toast.success("Company verified");
  }

  function handleReject(id: string) {
    toast.success("Verification rejected");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Company Management</h1>
        <p className="text-muted-foreground">Review and verify companies</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {filteredCompanies.map((company) => (
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
                    {company.industry} &middot; {company.size} employees &middot; {company.jobs} jobs
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
                    <DropdownMenuItem onClick={() => setPreviewCompany(company)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    {company.verificationStatus === "PENDING" && (
                      <>
                        <DropdownMenuItem onClick={() => handleApprove(company.id)}>
                          <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(company.id)} className="text-destructive">
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
            ))}
          </div>

          <div className="mt-6">
            <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewCompany} onOpenChange={() => setPreviewCompany(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{previewCompany?.name}</DialogTitle>
            <DialogDescription>{previewCompany?.industry}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium">{previewCompany?.size}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active Jobs</p>
                <p className="font-medium">{previewCompany?.jobs}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Owner</p>
                <p className="font-medium">{previewCompany?.owner}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant={statusConfig[previewCompany?.verificationStatus ?? "UNVERIFIED"]?.variant} size="sm">
                  {statusConfig[previewCompany?.verificationStatus ?? "UNVERIFIED"]?.label}
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
