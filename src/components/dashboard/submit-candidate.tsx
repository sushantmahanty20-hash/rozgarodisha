"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

interface Option { id: string; name: string; extra?: string }

export function SubmitCandidatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = React.useState<Option[]>([]);
  const [requirements, setRequirements] = React.useState<Option[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({
    candidateId: searchParams.get("candidateId") ?? "",
    requirementId: "",
  });

  React.useEffect(() => {
    Promise.all([
      fetch("/api/recruiters/candidates").then((r) => r.json()),
      fetch("/api/recruiters/requirements").then((r) => r.json()),
    ]).then(([cRes, rRes]) => {
      setCandidates((cRes.data ?? []).map((c: { id: string; name: string; currentTitle: string | null }) => ({ id: c.id, name: c.name, extra: c.currentTitle ?? undefined })));
      setRequirements((rRes.data ?? []).map((r: { id: string; title: string; client: { companyName: string } }) => ({ id: r.id, name: r.title, extra: r.client.companyName })));
    });
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.candidateId || !form.requirementId) {
      toast.error("Select a candidate and a requirement");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit candidate");
      toast.success("Candidate submitted to client");
      router.push("/recruiter/pipeline");
      router.refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild size="icon" variant="ghost">
          <Link href="/recruiter/pipeline"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Submit Candidate</h1>
          <p className="text-sm text-muted-foreground">Submit a candidate to a client requirement</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Send className="h-4 w-4 text-[#2563eb]" /> Submission Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="Candidate *">
            <Select value={form.candidateId} onValueChange={(v) => update("candidateId", v)}>
              <SelectTrigger><SelectValue placeholder="Select candidate" /></SelectTrigger>
              <SelectContent>
                {candidates.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}{c.extra ? ` — ${c.extra}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Requirement *">
            <Select value={form.requirementId} onValueChange={(v) => update("requirementId", v)}>
              <SelectTrigger><SelectValue placeholder="Select requirement" /></SelectTrigger>
              <SelectContent>
                {requirements.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}{r.extra ? ` — ${r.extra}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Expected Salary (INR)">
            <Input type="number" placeholder="1800000" value={form.expectedSalary ?? ""} onChange={(e) => update("expectedSalary", e.target.value)} />
          </Field>
          <Field label="Notice Period">
            <Input placeholder="30 days" value={form.noticePeriod ?? ""} onChange={(e) => update("noticePeriod", e.target.value)} />
          </Field>
          <Field label="Submission Status">
            <Select value={form.status ?? "SUBMITTED"} onValueChange={(v) => update("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SUBMITTED">Submitted</SelectItem>
                <SelectItem value="CLIENT_REVIEW">Client Review</SelectItem>
                <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Recruiter Notes">
            <Textarea rows={3} placeholder="Why this candidate is a great fit..." value={form.recruiterNotes ?? ""} onChange={(e) => update("recruiterNotes", e.target.value)} />
          </Field>
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Ensure the candidate has granted consent before submitting their profile to a client.</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button asChild variant="outline">
          <Link href="/recruiter/pipeline">Cancel</Link>
        </Button>
        <Button onClick={submit} disabled={saving} className="gap-2">
          <Send className="h-4 w-4" /> {saving ? "Submitting..." : "Submit Candidate"}
        </Button>
      </div>
    </div>
  );
}