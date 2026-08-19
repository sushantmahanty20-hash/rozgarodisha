"use client";

import * as React from "react";
import { Plus, BadgeCheck } from "lucide-react";
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

interface Offer {
  id: string;
  position: string;
  salary: number | string | null;
  offerDate: string;
  joiningDate: string | null;
  status: string;
  notes: string | null;
  candidate: { name: string };
  client: { companyName: string };
  requirement: { title: string } | null;
}

export function OffersPage() {
  const [offers, setOffers] = React.useState<Offer[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [candidates, setCandidates] = React.useState<{ id: string; name: string }[]>([]);
  const [clients, setClients] = React.useState<{ id: string; companyName: string }[]>([]);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const load = () => {
    fetch("/api/recruiters/offers")
      .then((r) => r.json())
      .then((res) => setOffers(res.data ?? []))
      .catch(() => setOffers([]));
  };

  React.useEffect(() => {
    load();
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
    if (!form.candidateId || !form.clientId || !form.position) {
      toast.error("Candidate, client and position are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create offer");
      toast.success("Offer created");
      setOpen(false);
      setForm({});
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Offers</h1>
          <p className="text-sm text-muted-foreground">Job offers extended to your candidates</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
              <Plus className="h-4 w-4" /> Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Offer</DialogTitle>
              <DialogDescription>Record a job offer extended by the client</DialogDescription>
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
                  <Label className="text-xs font-semibold">Salary (INR)</Label>
                  <Input type="number" placeholder="1800000" value={form.salary ?? ""} onChange={(e) => update("salary", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Joining Date</Label>
                  <Input type="date" value={form.joiningDate ?? ""} onChange={(e) => update("joiningDate", e.target.value)} />
                </div>
              </div>
              <Button onClick={create} disabled={saving}>{saving ? "Creating..." : "Create Offer"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!offers ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : offers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <BadgeCheck className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No offers yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Create an offer when a client decides to hire your candidate</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {offers.map((o) => (
            <Card key={o.id} className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-600">{getInitials(o.candidate.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{o.candidate.name}</p>
                      <Badge className={cn(badge(o.status).cls)}>{badge(o.status).label}</Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {o.position} • {o.client.companyName}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    {o.salary && <p className="font-bold text-foreground">{currency(o.salary)}</p>}
                    <p>Offered {formatDate(o.offerDate)}</p>
                    {o.joiningDate && <p>Joining {formatDate(o.joiningDate)}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}