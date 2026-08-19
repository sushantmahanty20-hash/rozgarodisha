"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, ShieldCheck, BadgeCheck, Clock, Upload, Building2, FileCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn, formatDate } from "@/lib/utils";
import { verificationStyles } from "@/lib/recruiter-ui";

interface AgencyProfile {
  id: string;
  agencyName: string;
  agencyType: string;
  about: string | null;
  logo: string | null;
  website: string | null;
  businessEmail: string | null;
  businessPhone: string | null;
  officeAddress: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  yearEstablished: number | null;
  numEmployees: number | null;
  numRecruiters: number | null;
  industriesServed: string | null;
  specializations: string | null;
  geographicCoverage: string;
  registrationNumber: string | null;
  gstin: string | null;
  panNumber: string | null;
  recruitmentLicense: string | null;
  verificationStatus: string;
  verificationNote: string | null;
  verifiedAt: string | null;
  createdAt: string;
  _count: { candidates: number; requirements: number; submissions: number; placements: number };
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function AgencyProfilePage({ tab = "profile" }: { tab?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || tab;

  const [profile, setProfile] = React.useState<AgencyProfile | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string | number>>({});

  React.useEffect(() => {
    fetch("/api/recruiters/agency")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
          setForm({
            agencyName: res.data.agencyName,
            agencyType: res.data.agencyType,
            about: res.data.about ?? "",
            logo: res.data.logo ?? "",
            website: res.data.website ?? "",
            businessEmail: res.data.businessEmail ?? "",
            businessPhone: res.data.businessPhone ?? "",
            officeAddress: res.data.officeAddress ?? "",
            city: res.data.city ?? "",
            state: res.data.state ?? "",
            country: res.data.country ?? "",
            zipCode: res.data.zipCode ?? "",
            yearEstablished: res.data.yearEstablished ?? "",
            numEmployees: res.data.numEmployees ?? "",
            numRecruiters: res.data.numRecruiters ?? "",
            industriesServed: res.data.industriesServed ?? "",
            specializations: res.data.specializations ?? "",
            geographicCoverage: res.data.geographicCoverage,
            registrationNumber: res.data.registrationNumber ?? "",
            gstin: res.data.gstin ?? "",
            panNumber: res.data.panNumber ?? "",
            recruitmentLicense: res.data.recruitmentLicense ?? "",
          });
        }
      })
      .catch(() => setProfile(null));
  }, []);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/agency", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setProfile((p) => (p ? { ...p, ...json.data } : p));
      toast.success("Agency profile updated successfully");
      router.refresh();
    } catch (e) {
      toast.error((e as Error).message || "Failed to save agency profile");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
      </div>
    );
  }

  const v = verificationStyles[profile.verificationStatus] ?? verificationStyles.PENDING;
  const verified = profile.verificationStatus === "VERIFIED";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">My Agency</h1>
          <p className="text-sm text-muted-foreground">Manage your agency profile and verification</p>
        </div>
        <Badge className={cn("gap-1.5 px-3 py-1 text-xs", v.cls)}>
          {verified ? <BadgeCheck className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
          {v.label}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={(t) => router.replace(`/recruiter/agency?tab=${t}`)}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile" className="gap-2">
                <Building2 className="h-4 w-4" /> Agency Profile
              </TabsTrigger>
              <TabsTrigger value="verification" className="gap-2">
                <ShieldCheck className="h-4 w-4" /> Verification
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileCheck className="h-4 w-4" /> Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Basic Information</CardTitle>
                  <CardDescription>Your agency&apos;s public profile details</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <Field label="Agency Name *">
                    <Input value={String(form.agencyName ?? "")} onChange={(e) => update("agencyName", e.target.value)} />
                  </Field>
                  <Field label="Agency Type">
                    <Select value={String(form.agencyType)} onValueChange={(v) => update("agencyType", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RECRUITMENT_CONSULTANCY">Recruitment Consultancy</SelectItem>
                        <SelectItem value="MANPOWER_SUPPLY">Manpower Supply</SelectItem>
                        <SelectItem value="STAFFING_COMPANY">Staffing Company</SelectItem>
                        <SelectItem value="PLACEMENT_CONSULTANCY">Placement Consultancy</SelectItem>
                        <SelectItem value="EXECUTIVE_SEARCH">Executive Search</SelectItem>
                        <SelectItem value="HR_CONSULTANCY">HR Consultancy</SelectItem>
                        <SelectItem value="OUTSOURCING">Outsourcing</SelectItem>
                        <SelectItem value="CONTRACT_STAFFING">Contract Staffing</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Logo URL" className="sm:col-span-2">
                    <Input placeholder="https://..." value={String(form.logo ?? "")} onChange={(e) => update("logo", e.target.value)} />
                  </Field>
                  <Field label="About" className="sm:col-span-2">
                    <Textarea rows={3} placeholder="Describe your agency, your process and your specialties" value={String(form.about ?? "")} onChange={(e) => update("about", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <Field label="Website">
                    <Input placeholder="https://" value={String(form.website ?? "")} onChange={(e) => update("website", e.target.value)} />
                  </Field>
                  <Field label="Business Email">
                    <Input placeholder="careers@agency.com" value={String(form.businessEmail ?? "")} onChange={(e) => update("businessEmail", e.target.value)} />
                  </Field>
                  <Field label="Business Phone">
                    <Input placeholder="+91" value={String(form.businessPhone ?? "")} onChange={(e) => update("businessPhone", e.target.value)} />
                  </Field>
                  <Field label="Office Address">
                    <Input placeholder="Street address" value={String(form.officeAddress ?? "")} onChange={(e) => update("officeAddress", e.target.value)} />
                  </Field>
                  <Field label="City">
                    <Input placeholder="Bhubaneswar" value={String(form.city ?? "")} onChange={(e) => update("city", e.target.value)} />
                  </Field>
                  <Field label="State">
                    <Input placeholder="Odisha" value={String(form.state ?? "")} onChange={(e) => update("state", e.target.value)} />
                  </Field>
                  <Field label="Country">
                    <Input placeholder="India" value={String(form.country ?? "")} onChange={(e) => update("country", e.target.value)} />
                  </Field>
                  <Field label="ZIP / Postal Code">
                    <Input placeholder="751024" value={String(form.zipCode ?? "")} onChange={(e) => update("zipCode", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Company Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <Field label="Year Established">
                    <Input type="number" placeholder="2015" value={String(form.yearEstablished ?? "")} onChange={(e) => update("yearEstablished", e.target.value)} />
                  </Field>
                  <Field label="Number of Employees">
                    <Input type="number" placeholder="50" value={String(form.numEmployees ?? "")} onChange={(e) => update("numEmployees", e.target.value)} />
                  </Field>
                  <Field label="Number of Recruiters">
                    <Input type="number" placeholder="10" value={String(form.numRecruiters ?? "")} onChange={(e) => update("numRecruiters", e.target.value)} />
                  </Field>
                  <Field label="Geographic Coverage">
                    <Select value={String(form.geographicCoverage)} onValueChange={(v) => update("geographicCoverage", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOCAL">Local</SelectItem>
                        <SelectItem value="REGIONAL">Regional</SelectItem>
                        <SelectItem value="NATIONAL">National</SelectItem>
                        <SelectItem value="INTERNATIONAL">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Industries Served" className="sm:col-span-2">
                    <Input placeholder="IT, Healthcare, Finance (comma separated)" value={String(form.industriesServed ?? "")} onChange={(e) => update("industriesServed", e.target.value)} />
                  </Field>
                  <Field label="Specializations" className="sm:col-span-2">
                    <Input placeholder="Software Engineering, Data Science, Executive Search" value={String(form.specializations ?? "")} onChange={(e) => update("specializations", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Business Registration</CardTitle>
                  <CardDescription>Used for verification and invoicing</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <Field label="Registration Number">
                    <Input placeholder="Company registration / CIN" value={String(form.registrationNumber ?? "")} onChange={(e) => update("registrationNumber", e.target.value)} />
                  </Field>
                  <Field label="GSTIN">
                    <Input placeholder="22AAAAA0000A1Z5" value={String(form.gstin ?? "")} onChange={(e) => update("gstin", e.target.value)} />
                  </Field>
                  <Field label="PAN Number">
                    <Input placeholder="AAAAA0000A" value={String(form.panNumber ?? "")} onChange={(e) => update("panNumber", e.target.value)} />
                  </Field>
                  <Field label="Recruitment License">
                    <Input placeholder="License / permit number" value={String(form.recruitmentLicense ?? "")} onChange={(e) => update("recruitmentLicense", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={save} disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", verified ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50" : "bg-amber-100 text-amber-600 dark:bg-amber-900/50")}>
                      {verified ? <BadgeCheck className="h-7 w-7" /> : <Clock className="h-7 w-7" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">
                        {verified ? "Your agency is verified" : "Verification " + v.label}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {verified
                          ? `Verified on ${profile.verifiedAt ? formatDate(profile.verifiedAt) : "—"}. Verified agencies get a badge, higher placement in the directory, and access to the candidate marketplace.`
                          : "Complete your business registration details above and submit the required documents. Our team reviews every application before issuing verification."}
                      </p>
                      {profile.verificationNote && (
                        <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{profile.verificationNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Company Registration", done: !!profile.registrationNumber, hint: "Add registration number in Business Registration" },
                      { label: "GSTIN", done: !!profile.gstin, hint: "Add GSTIN in Business Registration" },
                      { label: "PAN Number", done: !!profile.panNumber, hint: "Add PAN in Business Registration" },
                      { label: "Recruitment License", done: !!profile.recruitmentLicense, hint: "Add license in Business Registration" },
                    ].map((item) => (
                      <div key={item.label} className={cn("flex items-start gap-3 rounded-xl border p-4", item.done ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/20" : "border-border bg-background")}>
                        <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold", item.done ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground")}>
                          {item.done ? "✓" : "·"}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.done ? "Provided" : item.hint}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {!verified && (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[#2563eb]/40 bg-[#2563eb]/5 p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Upload className="h-4 w-4 text-[#2563eb]" />
                        <span>Upload documents in the <b>Documents</b> tab to complete your verification kit.</span>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <a href="/recruiter/agency?tab=documents">Go to Documents</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Verification Documents</CardTitle>
                  <CardDescription>Upload your registration certificate, GST certificate, PAN card and license</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { cat: "REGISTRATION_CERT", label: "Registration Certificate", hint: "CIN / incorporation certificate" },
                      { cat: "GST_CERT", label: "GST Certificate" },
                      { cat: "PAN_CARD", label: "PAN Card" },
                      { cat: "RECRUITMENT_LICENSE", label: "Recruitment License" },
                    ].map((doc) => (
                      <div key={doc.cat} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
                            <FileCheck className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{doc.label}</p>
                            <p className="text-xs text-muted-foreground">{doc.hint ?? "PDF, PNG or JPG"}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Upload className="h-4 w-4" /> Upload
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Documents are stored securely and only shared with our verification team. Submitting documents automatically requests verification review.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-muted-foreground">Agency Stats</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xl font-bold">{profile._count.candidates}</p>
                  <p className="text-xs text-muted-foreground">Candidates</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xl font-bold">{profile._count.requirements}</p>
                  <p className="text-xs text-muted-foreground">Requirements</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xl font-bold">{profile._count.submissions}</p>
                  <p className="text-xs text-muted-foreground">Submissions</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xl font-bold">{profile._count.placements}</p>
                  <p className="text-xs text-muted-foreground">Placements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-muted-foreground">Public Profile URL</p>
              <p className="mt-2 break-all rounded-lg bg-muted/40 p-2 font-mono text-xs text-[#2563eb]">
                /recruiters/{profile.id.slice(0, 8)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Share this link with employers to showcase your agency.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}