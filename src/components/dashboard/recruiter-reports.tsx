"use client";

import * as React from "react";
import { FileSpreadsheet, Download, TrendingUp, PieChart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const REPORTS: Report[] = [
  { id: "pipeline", title: "Pipeline Report", description: "Submissions, interviews, offers and placements per requirement", icon: TrendingUp, accent: "bg-sky-500" },
  { id: "placements", title: "Placements Report", description: "All placements with salary, fee and guarantee details", icon: PieChart, accent: "bg-emerald-500" },
  { id: "revenue", title: "Revenue Report", description: "Fees invoiced, collected and outstanding by client", icon: FileSpreadsheet, accent: "bg-violet-500" },
  { id: "candidates", title: "Candidate Activity Report", description: "Candidate sourcing, consent status and submission history", icon: Users, accent: "bg-amber-500" },
];

export function ReportsPage() {
  const generate = (title: string) => {
    toast.success(`Preparing ${title.toLowerCase()}...`);
    setTimeout(() => toast.success("Report ready to download"), 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Reports</h1>
        <p className="text-sm text-muted-foreground">Generate and download business reports</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((r) => (
          <Card key={r.id} className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${r.accent} text-white`}>
                  <r.icon className="h-5 w-5" />
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => generate(r.title)}>
                  <Download className="h-4 w-4" /> Generate
                </Button>
              </div>
              <h3 className="mt-4 font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}