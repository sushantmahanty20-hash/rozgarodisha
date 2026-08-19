"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BUSINESS_TYPES = [
  "RECRUITMENT_CONSULTANCY",
  "MANPOWER_SUPPLY",
  "STAFFING_COMPANY",
  "PLACEMENT_CONSULTANCY",
  "EXECUTIVE_SEARCH",
  "HR_CONSULTANCY",
  "OUTSOURCING",
  "CONTRACT_STAFFING",
  "OTHER",
] as const;

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  RECRUITMENT_CONSULTANCY: "Recruitment Consultancy",
  MANPOWER_SUPPLY: "Manpower Supply Agency",
  STAFFING_COMPANY: "Staffing Company",
  PLACEMENT_CONSULTANCY: "Placement Consultancy",
  EXECUTIVE_SEARCH: "Executive Search Firm",
  HR_CONSULTANCY: "HR Consultancy",
  OUTSOURCING: "Outsourcing Company",
  CONTRACT_STAFFING: "Contract Staffing Agency",
  OTHER: "Other",
};

const INDUSTRIES = [
  "IT & Software",
  "Engineering",
  "Healthcare",
  "Finance",
  "Sales",
  "Retail",
  "Construction",
  "Logistics",
  "Hospitality",
  "Manufacturing",
  "BPO",
  "Telecom",
];

const SPECIALIZATIONS = [
  "Permanent Placement",
  "Contract Staffing",
  "Executive Search",
  "Bulk Manpower",
  "Temp Staffing",
  "Payroll Outsourcing",
  "Campus Recruitment",
  "RPO",
];

const COVERAGE = ["LOCAL", "REGIONAL", "NATIONAL", "INTERNATIONAL"];

const STEPS = [
  "Account",
  "Agency Information",
  "Business Details",
  "Business Verification",
  "Security",
  "Terms",
];

export function RecruiterRegisterForm() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    accountCountry: "",
    accountState: "",
    accountCity: "",
    agencyName: "",
    agencyType: "RECRUITMENT_CONSULTANCY",
    website: "",
    businessEmail: "",
    businessPhone: "",
    officeAddress: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    yearEstablished: "",
    numEmployees: "",
    numRecruiters: "",
    industries: [] as string[],
    specializations: [] as string[],
    geographicCoverage: "LOCAL",
    registrationNumber: "",
    gstin: "",
    panNumber: "",
    recruitmentLicense: "",
    terms: false,
    privacy: false,
    agreement: false,
    dataProtection: false,
    candidateDataPolicy: false,
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleList(key: "industries" | "specializations", value: string) {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));
  }

  function validateStep(): string {
    if (step === 0) {
      if (!form.name || !form.email || !form.mobile || !form.password)
        return "All fields are required";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email address";
      if (form.password.length < 8) return "Password must be at least 8 characters";
      if (form.password !== form.confirmPassword) return "Passwords do not match";
    }
    if (step === 1) {
      if (!form.agencyName) return "Agency name is required";
    }
    if (step === 5) {
      if (!form.terms || !form.privacy || !form.agreement || !form.dataProtection || !form.candidateDataPolicy)
        return "Please accept all terms and policies to continue";
    }
    return "";
  }

  async function handleNext() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    await handleSubmit();
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.mobile,
          role: "recruiter",
          agencyName: form.agencyName,
          agencyType: form.agencyType,
          website: form.website,
          businessEmail: form.businessEmail || form.email,
          businessPhone: form.businessPhone || form.mobile,
          officeAddress: form.officeAddress,
          city: form.city || form.accountCity,
          state: form.state || form.accountState,
          country: form.country || form.accountCountry,
          zipCode: form.zipCode,
          yearEstablished: form.yearEstablished,
          numEmployees: form.numEmployees,
          numRecruiters: form.numRecruiters,
          industriesServed: form.industries.join(", "),
          specializations: form.specializations.join(", "),
          geographicCoverage: form.geographicCoverage,
          registrationNumber: form.registrationNumber,
          gstin: form.gstin,
          panNumber: form.panNumber,
          recruitmentLicense: form.recruitmentLicense,
        }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Registration failed");

      toast.success("Recruiter account created! Your agency is pending verification.");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-1.5">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-all",
                i <= step ? "bg-primary" : "bg-muted"
              )}
            />
            <p className="mt-1 hidden text-[10px] font-medium text-muted-foreground sm:block">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">{STEPS[step]}</h2>
        <p className="text-sm text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {step === 0 && (
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Rahul Sharma" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <Input label="Official Email" type="email" placeholder="rahul@agency.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
          <Input label="Mobile Number" type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} />
          <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => set("password", e.target.value)} />
          <Input label="Confirm Password" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Country" placeholder="India" value={form.accountCountry} onChange={(e) => set("accountCountry", e.target.value)} />
            <Input label="State" placeholder="Karnataka" value={form.accountState} onChange={(e) => set("accountState", e.target.value)} />
            <Input label="City" placeholder="Bengaluru" value={form.accountCity} onChange={(e) => set("accountCity", e.target.value)} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Input label="Agency / Consultancy Name" placeholder="TalentBridge Recruitment Services" value={form.agencyName} onChange={(e) => set("agencyName", e.target.value)} />
          <div>
            <p className="mb-2 text-sm font-medium">Business Type</p>
            <div className="grid grid-cols-2 gap-2">
              {BUSINESS_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("agencyType", t)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all",
                    form.agencyType === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-accent"
                  )}
                >
                  {BUSINESS_TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          <Input label="Agency Website" type="url" placeholder="https://www.agency.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Business Email" type="email" placeholder="hr@agency.com" value={form.businessEmail} onChange={(e) => set("businessEmail", e.target.value)} />
            <Input label="Business Phone" type="tel" placeholder="+91 98765 43210" value={form.businessPhone} onChange={(e) => set("businessPhone", e.target.value)} />
          </div>
          <Input label="Office Address" placeholder="4th Floor, MG Road, Bengaluru" value={form.officeAddress} onChange={(e) => set("officeAddress", e.target.value)} />
          <div className="grid grid-cols-4 gap-3">
            <Input label="City" placeholder="Bengaluru" value={form.city} onChange={(e) => set("city", e.target.value)} />
            <Input label="State" placeholder="Karnataka" value={form.state} onChange={(e) => set("state", e.target.value)} />
            <Input label="Country" placeholder="India" value={form.country} onChange={(e) => set("country", e.target.value)} />
            <Input label="PIN / ZIP" placeholder="560001" value={form.zipCode} onChange={(e) => set("zipCode", e.target.value)} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Input label="Year Established" type="number" placeholder="2016" value={form.yearEstablished} onChange={(e) => set("yearEstablished", e.target.value)} />
            <Input label="Number of Employees" type="number" placeholder="45" value={form.numEmployees} onChange={(e) => set("numEmployees", e.target.value)} />
            <Input label="Number of Recruiters" type="number" placeholder="12" value={form.numRecruiters} onChange={(e) => set("numRecruiters", e.target.value)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Industries Served</p>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleList("industries", i)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    form.industries.includes(i)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-accent"
                  )}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Recruitment Specializations</p>
            <div className="flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleList("specializations", s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    form.specializations.includes(s)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-accent"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Geographic Coverage</p>
            <div className="grid grid-cols-4 gap-2">
              {COVERAGE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("geographicCoverage", c)}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-xs font-medium transition-all",
                    form.geographicCoverage === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-accent"
                  )}
                >
                  {c.charAt(0) + c.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            These details are reviewed by our admin team for verification. Documents
            can be uploaded from your agency panel after registration.
          </p>
          <Input label="Business Registration Number" placeholder="U72900KA2016PTC098765" value={form.registrationNumber} onChange={(e) => set("registrationNumber", e.target.value)} />
          <Input label="GSTIN / Tax ID" placeholder="29ABCDE1234F1Z5" value={form.gstin} onChange={(e) => set("gstin", e.target.value)} />
          <Input label="PAN / Tax ID" placeholder="ABCDE1234F" value={form.panNumber} onChange={(e) => set("panNumber", e.target.value)} />
          <Input label="Recruitment License / Registration Number (if applicable)" placeholder="KA-REG-2020-0042" value={form.recruitmentLicense} onChange={(e) => set("recruitmentLicense", e.target.value)} />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-muted/50 p-4">
            <p className="text-sm font-medium">Account Security</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Email: <strong className="text-foreground">{form.email || "—"}</strong></li>
              <li>• Password set: <strong className="text-foreground">{form.password ? "Yes" : "No"}</strong></li>
              <li>• Mobile: <strong className="text-foreground">{form.mobile || "—"}</strong></li>
            </ul>
          </div>
          <div className="rounded-xl border bg-muted/50 p-4">
            <p className="text-sm font-medium">Verification</p>
            <p className="mt-1 text-xs text-muted-foreground">
              After registration you will receive a verification email. Your agency
              remains <strong>Pending Verification</strong> until the JobPortal admin
              reviews your business details and documents.
            </p>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-3">
          {[
            { key: "terms", label: "Terms & Conditions" },
            { key: "privacy", label: "Privacy Policy" },
            { key: "agreement", label: "Recruiter Agreement" },
            { key: "dataProtection", label: "Data Protection Policy" },
            { key: "candidateDataPolicy", label: "Candidate Data Usage Policy" },
          ].map((item) => (
            <label key={item.key} className="flex items-start gap-2 rounded-xl border p-3 text-sm">
              <input
                type="checkbox"
                checked={form[item.key as keyof typeof form] as boolean}
                onChange={(e) => set(item.key as keyof typeof form, e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-input"
              />
              <span className="text-muted-foreground">
                I accept the <span className="font-medium text-foreground">{item.label}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        {step > 0 && (
          <Button type="button" variant="outline" className="flex-1" onClick={() => setStep((s) => s - 1)} disabled={isLoading}>
            Back
          </Button>
        )}
        <Button type="button" className="flex-1" onClick={handleNext} loading={isLoading}>
          {step === STEPS.length - 1 ? (isLoading ? "Creating account..." : "Create Recruiter Account") : "Continue"}
        </Button>
      </div>
    </div>
  );
}