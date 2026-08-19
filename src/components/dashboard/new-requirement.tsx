"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Briefcase } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

interface ClientOption { id: string; companyName: string }

export function NewRequirementPage() {
  const router = useRouter();
  const [clients, setClients] = React.useState<ClientOption[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    fetch("/api/recruiters/clients")
      .then((r) => r.json())
      .then((res) => setClients(res.data ?? []))
      .catch(() => setClients([]));
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.title || !form.clientId) {
      toast.error("Title and client are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create requirement");
      toast.success("Requirement created successfully");
      router.push("/recruiter/requirements");
      router.refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild size="icon" variant="ghost">
          <Link href="/recruiter/requirements"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">New Requirement</h1>
          <p className="text-sm text-muted-foreground">Create a recruitment mandate from a client</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Briefcase className="h-4 w-4 text-[#2563eb]" /> Position Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Client *">
            <Select value={form.clientId ?? ""} onValueChange={(v) => update("clientId", v)}>
              <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.companyName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Job Title *">
            <Input placeholder="Senior Full Stack Developer" value={form.title ?? ""} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <Field label="Number of Openings">
            <Input type="number" placeholder="3" value={form.openings ?? "1"} onChange={(e) => update("openings", e.target.value)} />
          </Field>
          <Field label="Priority">
            <Select value={form.priority ?? "MEDIUM"} onValueChange={(v) => update("priority", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Location">
            <Input placeholder="Bhubaneswar, Odisha" value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} />
          </Field>
          <Field label="Work Mode">
            <Select value={form.workMode ?? ""} onValueChange={(v) => update("workMode", v)}>
              <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ONSITE">Onsite</SelectItem>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Employment Type">
            <Select value={form.employmentType ?? "FULL_TIME"} onValueChange={(v) => update("employmentType", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
                <SelectItem value="TEMPORARY">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Shift">
            <Input placeholder="Day / Night / Rotational" value={form.shift ?? ""} onChange={(e) => update("shift", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skills & Experience</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Required Skills" className="sm:col-span-2">
            <Input placeholder="React, Node.js, TypeScript (comma separated)" value={form.requiredSkills ?? ""} onChange={(e) => update("requiredSkills", e.target.value)} />
          </Field>
          <Field label="Preferred Skills" className="sm:col-span-2">
            <Input placeholder="AWS, GraphQL (comma separated)" value={form.preferredSkills ?? ""} onChange={(e) => update("preferredSkills", e.target.value)} />
          </Field>
          <Field label="Min Experience (years)">
            <Input type="number" placeholder="3" value={form.experienceMin ?? ""} onChange={(e) => update("experienceMin", e.target.value)} />
          </Field>
          <Field label="Max Experience (years)">
            <Input type="number" placeholder="8" value={form.experienceMax ?? ""} onChange={(e) => update("experienceMax", e.target.value)} />
          </Field>
          <Field label="Education">
            <Input placeholder="B.Tech / MCA / Any graduate" value={form.education ?? ""} onChange={(e) => update("education", e.target.value)} />
          </Field>
          <Field label="Notice Period">
            <Input placeholder="Max 30 days" value={form.noticePeriod ?? ""} onChange={(e) => update("noticePeriod", e.target.value)} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={3} placeholder="Job description" value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} />
          </Field>
          <Field label="Responsibilities" className="sm:col-span-2">
            <Textarea rows={2} placeholder="Key responsibilities" value={form.responsibilities ?? ""} onChange={(e) => update("responsibilities", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Compensation & Timeline</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Min Salary (INR)">
            <Input type="number" placeholder="800000" value={form.salaryMin ?? ""} onChange={(e) => update("salaryMin", e.target.value)} />
          </Field>
          <Field label="Max Salary (INR)">
            <Input type="number" placeholder="1500000" value={form.salaryMax ?? ""} onChange={(e) => update("salaryMax", e.target.value)} />
          </Field>
          <Field label="Joining Deadline">
            <Input type="date" value={form.joiningDeadline ?? ""} onChange={(e) => update("joiningDeadline", e.target.value)} />
          </Field>
          <Field label="Status">
            <Select value={form.status ?? "OPEN"} onValueChange={(v) => update("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="ON_HOLD">On Hold</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button asChild variant="outline">
          <Link href="/recruiter/requirements">Cancel</Link>
        </Button>
        <Button onClick={submit} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Creating..." : "Create Requirement"}
        </Button>
      </div>
    </div>
  );
}