"use client";

import * as React from "react";
import { Plus, Star, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { badge, currency } from "@/lib/recruiter-ui";

interface Placement {
  id: string;
  position: string;
  joiningDate: string;
  salary: number | string | null;
  feeAmount: number | string | null;
  status: string;
  guaranteePeriodDays: number | null;
  candidate: { name: string };
  client: { companyName: string };
  requirement: { title: string } | null;
  fees: { status: string; expectedFee: number | string | null }[];
}

export function PlacementsPage() {
  const [placements, setPlacements] = React.useState<Placement[] | null>(null);
  const [statusFilter, setStatusFilter] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [candidates, setCandidates] = React.useState<{ id: string; name: string }[]>([]);
  const [clients, setClients] = React.useState<{ id: string; companyName: string }[]>([]);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const load = () => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    fetch(`/api/recruiters/placements?${params}`)
      .then((r) => r.json())
      .then((res) => setPlacements(res.data ?? []))
      .catch(() => setPlacements([]));
  };

  React.useEffect(load, [statusFilter]);

  React.useEffect(() => {
    Promise.all([
      fetch("/api/recruiters/candidates").then((r) => r.json()),
      fetch("/api/recruiters/clients").then((r) => r.json()),
    ]).then(([c, cl]) => {
      setCandidates((c.data ?? []).map((x: { id: string; name: string }) => ({ id: x.id, name: x.name })));
      setClients((cl.data ?? []).map((x: { id: string; companyName: string }) => ({ id: x.id, companyName: x.companyName })));
    });
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const create = async () => {
    if (!form.candidateId || !form.clientId || !form.position || !form.joiningDate) {
      toast.error("Candidate, client, position and joining date are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to record placement");
      toast.success("Placement recorded — fee created");
      setOpen(false);
      setForm({});
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const revenue = placements?.reduce((s, p) => s + (Number(p.feeAmount) || 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Placements</h1>
          <p className="text-sm text-muted-foreground">Successful hires you have placed</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
              <Plus className="h-4 w-4" /> Record Placement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Placement</DialogTitle>
              <DialogDescription>Candidate joined the client — record the placement and create the recruitment fee</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Candidate *</Label>
                <Select value={form.candidateId ?? ""} onValueChange={(v) => update("candidateId", v)}>
                  <SelectTrigger><SelectValue placeholder="Select candidate" /></SelectTrigger>
                  <SelectContent>
                    {candidates.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Client *</Label>
                <Select value={form.clientId ?? ""} onValueChange={(v) => update("clientId", v)}>
                  <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.companyName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Position *</Label>
                <Input placeholder="Senior Software Engineer" value={form.position ?? ""} onChange={(e) => update("position", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Joining Date *</Label>
                  <Input type="date" value={form.joiningDate ?? ""} onChange={(e) => update("joiningDate", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Salary (INR)</Label>
                  <Input type="number" placeholder="1800000" value={form.salary ?? ""} onChange={(e) => update("salary", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Fee Amount (INR)</Label>
                  <Input type="number" placeholder="150000" value={form.feeAmount ?? ""} onChange={(e) => update("feeAmount", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Fee Type</Label>
                  <Select value={form.feeType ?? "PERCENTAGE_OF_SALARY"} onValueChange={(v) => update("feeType", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE_OF_SALARY">Percentage of Salary</SelectItem>
                      <SelectItem value="FIXED_FEE">Fixed Fee</SelectItem>
                      <SelectItem value="PER_CANDIDATE">Per Candidate</SelectItem>
                      <SelectItem value="MONTHLY_STAFFING">Monthly Staffing</SelectItem>
                      <SelectItem value="CUSTOM">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={create} disabled={saving}>{saving ? "Recording..." : "Record Placement"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2">
        {["", "ACTIVE", "JOINED", "REPLACEMENT_REQUIRED", "COMPLETED"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition-colors", statusFilter === s ? "bg-[#2563eb] text-white" : "bg-muted text-muted-foreground hover:bg-muted/70")}
          >
            {s === "" ? "All" : badge(s).label}
          </button>
        ))}
      </div>

      {!placements ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : placements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Star className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No placements yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Record a placement when a candidate joins a client</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><CardContent className="p-4"><p className="text-2xl font-bold">{placements.length}</p><p className="text-xs text-muted-foreground">Total Placements</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-2xl font-bold">{placements.filter((p) => p.status === "ACTIVE").length}</p><p className="text-xs text-muted-foreground">Active (in guarantee)</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-2xl font-bold">{currency(revenue)}</p><p className="text-xs text-muted-foreground">Fee Revenue</p></CardContent></Card>
          </div>

          <div className="space-y-3">
            {placements.map((p) => (
              <Card key={p.id} className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-emerald-500/10 text-emerald-600">{getInitials(p.candidate.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{p.candidate.name}</p>
                        <Badge className={cn(badge(p.status).cls)}>{badge(p.status).label}</Badge>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.position} • {p.client.companyName}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p className="flex items-center justify-end gap-1">
                        <CalendarDays className="h-3.5 w-3.5" /> Joined {formatDate(p.joiningDate)}
                      </p>
                      {p.salary && <p className="font-semibold text-foreground">{currency(p.salary)}</p>}
                      {p.feeAmount && <p>Fee: {currency(p.feeAmount)}</p>}
                      {p.guaranteePeriodDays && <p>{p.guaranteePeriodDays}d guarantee</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}