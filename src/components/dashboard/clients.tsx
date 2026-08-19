"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Building2, Phone, Mail, ChevronRight, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { num } from "@/lib/recruiter-ui";

interface Client {
  id: string;
  companyName: string;
  industry: string | null;
  companySize: string | null;
  website: string | null;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  feeType: string | null;
  feeValue: number | string | null;
  _count: { requirements: number; submissions: number; interviews: number; placements: number; fees: number };
}

const clientStatusStyles: Record<string, { label: string; cls: string }> = {
  ACTIVE: { label: "Active", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  INACTIVE: { label: "Inactive", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  PROSPECT: { label: "Prospect", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
};

export function ClientsPage() {
  const [clients, setClients] = React.useState<Client[] | null>(null);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    fetch("/api/recruiters/clients")
      .then((r) => r.json())
      .then((res) => setClients(res.data ?? []))
      .catch(() => setClients([]));
  }, []);

  const filtered = clients?.filter(
    (c) =>
      c.companyName.toLowerCase().includes(q.toLowerCase()) ||
      (c.industry ?? "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Clients</h1>
          <p className="text-sm text-muted-foreground">Companies you recruit for</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
          <Link href="/recruiter/clients/new">
            <Plus className="h-4 w-4" /> Add Client
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{num(clients?.length)}</p>
            <p className="text-xs text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{num(clients?.filter((c) => c.status === "ACTIVE").length)}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{num(clients?.filter((c) => c.status === "PROSPECT").length)}</p>
            <p className="text-xs text-muted-foreground">Prospects</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
        <input
          placeholder="Search clients..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {!clients ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : filtered && filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Landmark className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No clients yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add your first client to start recruiting for them</p>
            <Button asChild className="mt-4 gap-2">
              <Link href="/recruiter/clients/new">
                <Plus className="h-4 w-4" /> Add Client
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered?.map((client) => {
            const s = clientStatusStyles[client.status] ?? clientStatusStyles.ACTIVE;
            return (
              <Card key={client.id} className="group transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar size="md">
                        <AvatarImage src={client.website ? `https://www.google.com/s2/favicons?domain=${new URL(client.website.includes("://") ? client.website : `https://${client.website}`).hostname}&sz=64` : undefined} alt={client.companyName} />
                        <AvatarFallback className="bg-[#2563eb]/10 text-[#2563eb]">{getInitials(client.companyName)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{client.companyName}</p>
                        <p className="text-xs text-muted-foreground">
                          {client.industry ?? "General"} {client.companySize ? `• ${client.companySize}` : ""}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(s.cls)}>{s.label}</Badge>
                  </div>

                  <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {client.contactPerson && (
                      <p className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> {client.contactPerson}</p>
                    )}
                    {client.email && (
                      <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> <span className="truncate">{client.email}</span></p>
                    )}
                    {client.phone && (
                      <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {client.phone}</p>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                    <div className="text-center">
                      <p className="text-sm font-bold">{client._count.requirements}</p>
                      <p className="text-[10px] text-muted-foreground">Req.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold">{client._count.submissions}</p>
                      <p className="text-[10px] text-muted-foreground">Sub.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold">{client._count.placements}</p>
                      <p className="text-[10px] text-muted-foreground">Placed</p>
                    </div>
                  </div>

                  <Button asChild size="sm" variant="ghost" className="mt-3 w-full gap-1 text-[#2563eb]">
                    <Link href={`/recruiter/requirements?clientId=${client.id}`}>
                      View Requirements <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}