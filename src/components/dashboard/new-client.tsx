"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Building2 } from "lucide-react";
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

export function NewClientPage() {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.companyName) {
      toast.error("Company name is required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create client");
      toast.success("Client created successfully");
      router.push("/recruiter/clients");
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
          <Link href="/recruiter/clients"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Add Client</h1>
          <p className="text-sm text-muted-foreground">Register a company you recruit for</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-[#2563eb]" /> Company Details
          </CardTitle>
          <CardDescription>Basic information about the client company</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Company Name *">
            <Input placeholder="TechNova Solutions" value={form.companyName ?? ""} onChange={(e) => update("companyName", e.target.value)} />
          </Field>
          <Field label="Industry">
            <Input placeholder="Information Technology" value={form.industry ?? ""} onChange={(e) => update("industry", e.target.value)} />
          </Field>
          <Field label="Company Size">
            <Select value={form.companySize ?? ""} onValueChange={(v) => update("companySize", v)}>
              <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="201-500">201-500</SelectItem>
                <SelectItem value="501-1000">501-1000</SelectItem>
                <SelectItem value="1000+">1000+</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Website">
            <Input placeholder="https://technova.com" value={form.website ?? ""} onChange={(e) => update("website", e.target.value)} />
          </Field>
          <Field label="GSTIN" className="sm:col-span-2">
            <Input placeholder="22AAAAA0000A1Z5" value={form.gstin ?? ""} onChange={(e) => update("gstin", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Primary Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Contact Person">
            <Input placeholder="Rajesh Kumar" value={form.contactPerson ?? ""} onChange={(e) => update("contactPerson", e.target.value)} />
          </Field>
          <Field label="Designation">
            <Input placeholder="HR Manager" value={form.designation ?? ""} onChange={(e) => update("designation", e.target.value)} />
          </Field>
          <Field label="Email">
            <Input placeholder="hr@technova.com" value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input placeholder="+91 98765 43210" value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} />
          </Field>
          <Field label="Address" className="sm:col-span-2">
            <Textarea rows={2} placeholder="Company address" value={form.address ?? ""} onChange={(e) => update("address", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Agreement & Fees</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Contract Start">
            <Input type="date" value={form.contractStartDate ?? ""} onChange={(e) => update("contractStartDate", e.target.value)} />
          </Field>
          <Field label="Contract End">
            <Input type="date" value={form.contractEndDate ?? ""} onChange={(e) => update("contractEndDate", e.target.value)} />
          </Field>
          <Field label="Fee Type">
            <Select value={form.feeType ?? ""} onValueChange={(v) => update("feeType", v)}>
              <SelectTrigger><SelectValue placeholder="Select fee type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="PERCENTAGE_OF_SALARY">Percentage of Salary</SelectItem>
                <SelectItem value="FIXED_FEE">Fixed Fee</SelectItem>
                <SelectItem value="PER_CANDIDATE">Per Candidate</SelectItem>
                <SelectItem value="MONTHLY_STAFFING">Monthly Staffing</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Fee Value (% or amount)">
            <Input type="number" placeholder="8.33" value={form.feeValue ?? ""} onChange={(e) => update("feeValue", e.target.value)} />
          </Field>
          <Field label="Replacement Period (days)">
            <Input type="number" placeholder="90" value={form.replacementPeriodDays ?? ""} onChange={(e) => update("replacementPeriodDays", e.target.value)} />
          </Field>
          <Field label="Payment Terms">
            <Input placeholder="Net 30" value={form.paymentTerms ?? ""} onChange={(e) => update("paymentTerms", e.target.value)} />
          </Field>
          <Field label="Status" className="sm:col-span-2">
            <Select value={form.status ?? "ACTIVE"} onValueChange={(v) => update("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="PROSPECT">Prospect</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button asChild variant="outline">
          <Link href="/recruiter/clients">Cancel</Link>
        </Button>
        <Button onClick={submit} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Creating..." : "Create Client"}
        </Button>
      </div>
    </div>
  );
}