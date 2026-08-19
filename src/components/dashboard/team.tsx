"use client";

import * as React from "react";
import { Plus, UserCog, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn, getInitials } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  designation: string;
  role: string;
  isActive: boolean;
}

const teamRoleStyles: Record<string, { label: string; cls: string }> = {
  AGENCY_OWNER: { label: "Owner", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" },
  RECRUITMENT_MANAGER: { label: "Recruitment Manager", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  SENIOR_RECRUITER: { label: "Senior Recruiter", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  RECRUITER: { label: "Recruiter", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  RECRUITMENT_COORDINATOR: { label: "Coordinator", cls: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300" },
  ACCOUNT_MANAGER: { label: "Account Manager", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300" },
  FINANCE: { label: "Finance", cls: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300" },
  VIEWER: { label: "Viewer", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

export function TeamPage() {
  const [members, setMembers] = React.useState<TeamMember[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const load = () => {
    fetch("/api/recruiters/team")
      .then((r) => r.json())
      .then((res) => setMembers(res.data ?? []))
      .catch(() => setMembers([]));
  };

  React.useEffect(load, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const create = async () => {
    if (!form.name || !form.email || !form.role) {
      toast.error("Name, email and role are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add team member");
      toast.success("Team member added");
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
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Team Members</h1>
          <p className="text-sm text-muted-foreground">People working for your agency</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
              <Plus className="h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>Add a recruiter, coordinator or manager to your agency</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Name *</Label>
                <Input placeholder="Anita Das" value={form.name ?? ""} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Email *</Label>
                <Input placeholder="anita@talentbridge.in" value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Phone</Label>
                  <Input placeholder="+91 98765 43210" value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Designation</Label>
                  <Input placeholder="Senior Recruiter" value={form.designation ?? ""} onChange={(e) => update("designation", e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Role *</Label>
                <Select value={form.role ?? "RECRUITER"} onValueChange={(v) => update("role", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RECRUITMENT_MANAGER">Recruitment Manager</SelectItem>
                    <SelectItem value="SENIOR_RECRUITER">Senior Recruiter</SelectItem>
                    <SelectItem value="RECRUITER">Recruiter</SelectItem>
                    <SelectItem value="RECRUITMENT_COORDINATOR">Recruitment Coordinator</SelectItem>
                    <SelectItem value="ACCOUNT_MANAGER">Account Manager</SelectItem>
                    <SelectItem value="FINANCE">Finance</SelectItem>
                    <SelectItem value="VIEWER">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={create} disabled={saving}>{saving ? "Adding..." : "Add Member"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!members ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : members.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <UserCog className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No team members yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add your recruiters and coordinators</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((m) => {
            const r = teamRoleStyles[m.role] ?? teamRoleStyles.RECRUITER;
            return (
              <Card key={m.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar size="md">
                        <AvatarFallback className="bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-white">{getInitials(m.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.designation}</p>
                      </div>
                    </div>
                    <Badge className={cn(r.cls)}>{r.label}</Badge>
                  </div>
                  <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {m.email}</p>
                    {m.phone && <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {m.phone}</p>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}