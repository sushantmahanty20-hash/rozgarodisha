"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DollarSign, FileSpreadsheet, CreditCard, Plus, Receipt, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn, formatDate } from "@/lib/utils";
import { currency } from "@/lib/recruiter-ui";

interface Fee { id: string; feeType: string; salaryAmount: number | string | null; expectedFee: number | string | null; status: string; dueDate: string | null; client: { companyName: string } | null; placement: { position: string } | null }
interface Invoice { id: string; invoiceNumber: string; issueDate: string; dueDate: string | null; total: number | string; status: string; client: { companyName: string } | null }
interface Payment { id: string; amount: number | string; method: string | null; transactionId: string | null; receivedAt: string; client: { companyName: string } | null }
interface RevenueData { fees: Fee[]; invoices: Invoice[]; payments: Payment[]; totalExpected: number; paid: number; invoiced: number; outstanding: number }

const feeStatusStyles: Record<string, { label: string; cls: string }> = {
  EXPECTED: { label: "Expected", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  INVOICED: { label: "Invoiced", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" },
  PENDING: { label: "Pending", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  PAID: { label: "Paid", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  OVERDUE: { label: "Overdue", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
};

const invoiceStatusStyles: Record<string, { label: string; cls: string }> = {
  DRAFT: { label: "Draft", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  SENT: { label: "Sent", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  PARTIALLY_PAID: { label: "Partially Paid", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  PAID: { label: "Paid", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  OVERDUE: { label: "Overdue", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
};

const sBadge = (map: Record<string, { label: string; cls: string }>, status: string) => {
  const s = map[status] ?? { label: status, cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" };
  return <Badge className={cn(s.cls)}>{s.label}</Badge>;
};

export function RevenuePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = React.useState<RevenueData | null>(null);
  const [clients, setClients] = React.useState<{ id: string; companyName: string }[]>([]);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"invoice" | "payment">("invoice");
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const load = () => {
    fetch("/api/recruiters/revenue")
      .then((r) => r.json())
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  };

  React.useEffect(() => {
    load();
    fetch("/api/recruiters/clients").then((r) => r.json()).then((res) => setClients((res.data ?? []).map((x: { id: string; companyName: string }) => ({ id: x.id, companyName: x.companyName }))));
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const create = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/revenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: mode }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      toast.success(mode === "invoice" ? "Invoice created" : "Payment recorded");
      setOpen(false);
      setForm({});
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Fees & Revenue</h1>
          <p className="text-sm text-muted-foreground">Track recruitment fees, invoices and payments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2" onClick={() => setMode("payment")}>
                <Wallet className="h-4 w-4" /> Record Payment
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" onClick={() => setMode("invoice")}>
                <Plus className="h-4 w-4" /> Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{mode === "invoice" ? "Create Invoice" : "Record Payment"}</DialogTitle>
                <DialogDescription>
                  {mode === "invoice" ? "Generate an invoice for a placement fee" : "Log an incoming payment from a client"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Client</Label>
                  <Select value={form.clientId ?? ""} onValueChange={(v) => update("clientId", v)}>
                    <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.companyName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Amount (INR) *</Label>
                  <Input type="number" placeholder="150000" value={form.amount ?? ""} onChange={(e) => update("amount", e.target.value)} />
                </div>
                {mode === "invoice" && (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Tax (GST %)</Label>
                      <Input type="number" placeholder="18" value={form.tax ?? ""} onChange={(e) => update("tax", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Issue Date</Label>
                        <Input type="date" value={form.issueDate ?? ""} onChange={(e) => update("issueDate", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Due Date</Label>
                        <Input type="date" value={form.dueDate ?? ""} onChange={(e) => update("dueDate", e.target.value)} />
                      </div>
                    </div>
                  </>
                )}
                {mode === "payment" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Method</Label>
                      <Select value={form.method ?? "BANK_TRANSFER"} onValueChange={(v) => update("method", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="CHEQUE">Cheque</SelectItem>
                          <SelectItem value="CASH">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Transaction ID</Label>
                      <Input placeholder="TXN12345" value={form.transactionId ?? ""} onChange={(e) => update("transactionId", e.target.value)} />
                    </div>
                  </div>
                )}
                <Button onClick={create} disabled={saving}>{saving ? "Saving..." : mode === "invoice" ? "Create Invoice" : "Record Payment"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{currency(data.paid)}</p><p className="text-xs text-muted-foreground">Collected</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{currency(data.totalExpected)}</p><p className="text-xs text-muted-foreground">Expected Fees</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{currency(data.invoiced)}</p><p className="text-xs text-muted-foreground">Invoiced</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-red-500">{currency(data.outstanding)}</p><p className="text-xs text-muted-foreground">Outstanding</p></CardContent></Card>
      </div>

      <Tabs value={searchParams.get("tab") ?? "fees"} onValueChange={(t) => router.replace(`/recruiter/revenue?tab=${t}`)}>
        <TabsList>
          <TabsTrigger value="fees" className="gap-2"><Receipt className="h-4 w-4" /> Fees</TabsTrigger>
          <TabsTrigger value="invoices" className="gap-2"><FileSpreadsheet className="h-4 w-4" /> Invoices</TabsTrigger>
          <TabsTrigger value="payments" className="gap-2"><CreditCard className="h-4 w-4" /> Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="mt-4 space-y-2">
          {data.fees.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No fees yet — they are created automatically when you record placements.</p>
          ) : data.fees.map((f) => (
            <Card key={f.id}>
              <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{f.placement?.position ?? "Placement fee"}</p>
                  <p className="text-xs text-muted-foreground">{f.client?.companyName} • {f.feeType.replace(/_/g, " ")}</p>
                </div>
                <p className="font-bold">{currency(f.expectedFee)}</p>
                {f.dueDate && <p className="text-xs text-muted-foreground">Due {formatDate(f.dueDate)}</p>}
                {sBadge(feeStatusStyles, f.status)}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="invoices" className="mt-4 space-y-2">
          {data.invoices.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No invoices yet. Create one to bill a client.</p>
          ) : data.invoices.map((inv) => (
            <Card key={inv.id}>
              <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm font-semibold">{inv.invoiceNumber}</p>
                  <p className="text-xs text-muted-foreground">{inv.client?.companyName} • Issued {formatDate(inv.issueDate)}</p>
                </div>
                <p className="font-bold">{currency(inv.total)}</p>
                {sBadge(invoiceStatusStyles, inv.status)}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="payments" className="mt-4 space-y-2">
          {data.payments.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No payments recorded yet.</p>
          ) : data.payments.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{p.client?.companyName ?? "Client payment"}</p>
                  <p className="text-xs text-muted-foreground">{p.method ?? "Payment"} • {formatDate(p.receivedAt)}</p>
                </div>
                <p className="font-bold text-emerald-600">{currency(p.amount)}</p>
                {p.transactionId && <p className="font-mono text-xs text-muted-foreground">{p.transactionId}</p>}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}