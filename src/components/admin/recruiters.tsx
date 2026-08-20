"use client";

import * as React from "react";
import { Search, ShieldCheck, Eye, CheckCircle2, XCircle, PauseCircle, Ban, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn, formatDate } from "@/lib/utils";
import { verificationStyles, num } from "@/lib/recruiter-ui";
import { useAdminView } from "@/store/use-admin-view";

interface Recruiter {
  id: string;
  agencyName: string;
  slug: string;
  agencyType: string;
  city: string | null;
  verificationStatus: string;
  verificationNote: string | null;
  verifiedAt: string | null;
  createdAt: string;
  user: { name: string | null; email: string; createdAt: string };
  _count: { clients: number; candidates: number; placements: number };
}

export function AdminRecruitersPage() {
  const [recruiters, setRecruiters] = React.useState<Recruiter[] | null>(null);
  const [search, setSearch] = React.useState("");
  const [preview, setPreview] = React.useState<Recruiter | null>(null);
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const setView = useAdminView((s) => s.setView);

  React.useEffect(() => {
    setView({ section: "companies", value: "recruiter-agencies" });
  }, [setView]);

  const load = () => {
    fetch("/api/admin/recruiters")
      .then((r) => r.json())
      .then((res) => setRecruiters(res.data ?? []))
      .catch(() => setRecruiters([]));
  };

  React.useEffect(load, []);

  const updateStatus = async (r: Recruiter, status: string, note?: string) => {
    setBusyId(r.id);
    try {
      const res = await fetch(`/api/admin/recruiters/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update");
      toast.success(`Agency marked as ${status.replace(/_/g, " ").toLowerCase()}`);
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const filtered = recruiters?.filter(
    (r) =>
      r.agencyName.toLowerCase().includes(search.toLowerCase()) ||
      r.user.email.toLowerCase().includes(search.toLowerCase()) ||
      (r.city ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Recruiter Agencies</h1>
        <p className="text-muted-foreground">Review, verify and manage recruitment agencies</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agencies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!recruiters ? (
              <div className="flex justify-center py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
              </div>
            ) : filtered && filtered.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">No recruiter agencies found</p>
            ) : (
              filtered?.map((r) => {
                const v = verificationStyles[r.verificationStatus] ?? verificationStyles.PENDING;
                return (
                  <div key={r.id} className="flex flex-wrap items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-lg text-white">
                        {r.agencyName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{r.agencyName}</p>
                        {r.verificationStatus === "VERIFIED" && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {r.user.email} {r.city ? `• ${r.city}` : ""} • Joined {formatDate(r.createdAt)}
                      </p>
                    </div>
                    <div className="hidden gap-4 text-center text-xs text-muted-foreground sm:flex">
                      <div><p className="text-sm font-bold">{num(r._count.clients)}</p>Clients</div>
                      <div><p className="text-sm font-bold">{num(r._count.candidates)}</p>Candidates</div>
                      <div><p className="text-sm font-bold">{num(r._count.placements)}</p>Placed</div>
                    </div>
                    <Badge className={cn(v.cls)}>{v.label}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disabled={busyId === r.id}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setPreview(r)}>
                          <Eye className="h-4 w-4 mr-2" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {r.verificationStatus !== "VERIFIED" && (
                          <DropdownMenuItem onClick={() => updateStatus(r, "VERIFIED")}>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" /> Approve
                          </DropdownMenuItem>
                        )}
                        {r.verificationStatus !== "REJECTED" && (
                          <DropdownMenuItem onClick={() => updateStatus(r, "REJECTED", "Documents not satisfactory")} className="text-destructive">
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                          </DropdownMenuItem>
                        )}
                        {r.verificationStatus !== "UNDER_REVIEW" && (
                          <DropdownMenuItem onClick={() => updateStatus(r, "UNDER_REVIEW")}>
                            <PauseCircle className="h-4 w-4 mr-2" /> Mark Under Review
                          </DropdownMenuItem>
                        )}
                        {r.verificationStatus !== "SUSPENDED" && (
                          <DropdownMenuItem onClick={() => updateStatus(r, "SUSPENDED", "Agency suspended by admin")} className="text-destructive">
                            <Ban className="h-4 w-4 mr-2" /> Suspend
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent>
          <DialogTitle>{preview?.agencyName}</DialogTitle>
          <DialogDescription>{preview?.agencyType.replace(/_/g, " ")}</DialogDescription>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-muted-foreground">Owner</p><p className="font-medium">{preview?.user.name ?? "—"}</p></div>
              <div><p className="text-muted-foreground">Email</p><p className="font-medium">{preview?.user.email}</p></div>
              <div><p className="text-muted-foreground">City</p><p className="font-medium">{preview?.city ?? "—"}</p></div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge className={cn(verificationStyles[preview?.verificationStatus ?? "PENDING"].cls)}>
                  {verificationStyles[preview?.verificationStatus ?? "PENDING"].label}
                </Badge>
              </div>
            </div>
            {preview?.verificationNote && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                {preview.verificationNote}
              </div>
            )}
            <div className="grid grid-cols-3 gap-4 border-t pt-4 text-center">
              <div><p className="text-lg font-bold">{num(preview?._count.clients)}</p><p className="text-xs text-muted-foreground">Clients</p></div>
              <div><p className="text-lg font-bold">{num(preview?._count.candidates)}</p><p className="text-xs text-muted-foreground">Candidates</p></div>
              <div><p className="text-lg font-bold">{num(preview?._count.placements)}</p><p className="text-xs text-muted-foreground">Placements</p></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}