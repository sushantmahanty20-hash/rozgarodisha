"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, UserPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export function NewCandidatePage() {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name) {
      toast.error("Candidate name is required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create candidate");
      toast.success("Candidate added to your database");
      router.push("/recruiter/candidates");
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
          <Link href="/recruiter/candidates"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Add Candidate</h1>
          <p className="text-sm text-muted-foreground">Add a candidate to your talent database</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="h-4 w-4 text-[#2563eb]" /> Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name *">
            <Input placeholder="Priya Sharma" value={form.name ?? ""} onChange={(e) => update("name", e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input placeholder="+91 98765 43210" value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} />
          </Field>
          <Field label="Email">
            <Input placeholder="priya@email.com" value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} />
          </Field>
          <Field label="Location">
            <Input placeholder="Bhubaneswar, Odisha" value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Professional Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Current Title">
            <Input placeholder="Senior Software Engineer" value={form.currentTitle ?? ""} onChange={(e) => update("currentTitle", e.target.value)} />
          </Field>
          <Field label="Total Experience (years)">
            <Input type="number" step="0.5" placeholder="6" value={form.totalExperienceYrs ?? ""} onChange={(e) => update("totalExperienceYrs", e.target.value)} />
          </Field>
          <Field label="Skills" className="sm:col-span-2">
            <Input placeholder="React, Node.js, AWS (comma separated)" value={form.skills ?? ""} onChange={(e) => update("skills", e.target.value)} />
          </Field>
          <Field label="Education" className="sm:col-span-2">
            <Input placeholder="B.Tech in Computer Science" value={form.education ?? ""} onChange={(e) => update("education", e.target.value)} />
          </Field>
          <Field label="Current Salary (INR)">
            <Input type="number" placeholder="1200000" value={form.currentSalary ?? ""} onChange={(e) => update("currentSalary", e.target.value)} />
          </Field>
          <Field label="Expected Salary (INR)">
            <Input type="number" placeholder="1800000" value={form.expectedSalary ?? ""} onChange={(e) => update("expectedSalary", e.target.value)} />
          </Field>
          <Field label="Notice Period">
            <Input placeholder="30 days" value={form.noticePeriod ?? ""} onChange={(e) => update("noticePeriod", e.target.value)} />
          </Field>
          <Field label="Preferred Location">
            <Input placeholder="Remote / Bhubaneswar" value={form.preferredLocation ?? ""} onChange={(e) => update("preferredLocation", e.target.value)} />
          </Field>
          <Field label="Source" className="sm:col-span-2">
            <Select value={form.source ?? "AGENCY_DATABASE"} onValueChange={(v) => update("source", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="JOBPORTAL">JobPortal</SelectItem>
                <SelectItem value="AGENCY_DATABASE">Agency Database</SelectItem>
                <SelectItem value="REFERRAL">Referral</SelectItem>
                <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                <SelectItem value="WEBSITE">Website</SelectItem>
                <SelectItem value="WALK_IN">Walk In</SelectItem>
                <SelectItem value="EMPLOYEE_REFERRAL">Employee Referral</SelectItem>
                <SelectItem value="DIRECT_APPLICATION">Direct Application</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Resume URL" className="sm:col-span-2">
            <Input placeholder="https://drive.google.com/..." value={form.resumeUrl ?? ""} onChange={(e) => update("resumeUrl", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4 text-[#2563eb]" /> Consent & Notes
          </CardTitle>
          <CardDescription>Legal compliance for storing and submitting candidate data</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Consent Status">
            <Select value={form.consentStatus ?? "NO_CONSENT"} onValueChange={(v) => update("consentStatus", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CONSENT_GRANTED">Consent Granted</SelectItem>
                <SelectItem value="CONSENT_REQUESTED">Consent Requested</SelectItem>
                <SelectItem value="CONSENT_WITHDRAWN">Withdrawn</SelectItem>
                <SelectItem value="CONSENT_EXPIRED">Expired</SelectItem>
                <SelectItem value="NO_CONSENT">No Consent</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Consent Date">
            <Input type="date" value={form.consentDate ?? ""} onChange={(e) => update("consentDate", e.target.value)} />
          </Field>
          <Field label="Consent Purpose" className="sm:col-span-2">
            <Input placeholder="Recruitment for client requirements" value={form.consentPurpose ?? ""} onChange={(e) => update("consentPurpose", e.target.value)} />
          </Field>
          <Field label="Notes" className="sm:col-span-2">
            <Textarea rows={3} placeholder="Internal notes about this candidate" value={form.notes ?? ""} onChange={(e) => update("notes", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button asChild variant="outline">
          <Link href="/recruiter/candidates">Cancel</Link>
        </Button>
        <Button onClick={submit} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Adding..." : "Add Candidate"}
        </Button>
      </div>
    </div>
  );
}