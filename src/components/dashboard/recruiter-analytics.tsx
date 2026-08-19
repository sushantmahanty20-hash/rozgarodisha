"use client";

import * as React from "react";
import { BarChart3, TrendingUp, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { currency, num } from "@/lib/recruiter-ui";

interface Analytics {
  requirementsByStatus: Record<string, number>;
  candidatesByStatus: Record<string, number>;
  submissionsByStatus: Record<string, number>;
  placementsByStatus: Record<string, number>;
  submissionsByMonth: Record<string, number>;
  placementsByMonth: Record<string, number>;
  revenueByMonth: Record<string, number>;
  feesByClient: { client: string; expectedFee: number; status: string }[];
}

function Bar({ data, color = "bg-[#2563eb]" }: { data: Record<string, number>; color?: string }) {
  const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
  const max = Math.max(1, ...entries.map(([, v]) => v));
  if (entries.length === 0) return <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>;
  return (
    <div className="flex h-40 items-end gap-2">
      {entries.map(([k, v]) => (
        <div key={k} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-semibold text-muted-foreground">{v}</span>
          <div className={cn("w-full rounded-t-lg transition-all duration-700", color)} style={{ height: `${Math.max((v / max) * 100, 4)}%` }} />
          <span className="text-[9px] text-muted-foreground">{k}</span>
        </div>
      ))}
    </div>
  );
}

function Donut({ data, colors }: { data: Record<string, number>; colors: string[] }) {
  const entries = Object.entries(data);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (total === 0) return <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>;
  let acc = 0;
  const segs = entries.map(([k, v], i) => {
    const start = acc;
    acc += (v / total) * 360;
    return { k, v, start, end: acc, color: colors[i % colors.length] };
  });
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 42 42" className="h-32 w-32 shrink-0">
        {segs.map((s) => {
          const [x1, y1] = [50 + 40 * Math.cos((s.start * Math.PI) / 180), 50 + 40 * Math.sin((s.start * Math.PI) / 180)];
          const [x2, y2] = [50 + 40 * Math.cos((s.end * Math.PI) / 180), 50 + 40 * Math.sin((s.end * Math.PI) / 180)];
          const large = s.end - s.start > 180 ? 1 : 0;
          return (
            <path
              key={s.k}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z`}
              fill={s.color}
              transform="translate(0 0)"
            />
          );
        })}
        <circle cx="50" cy="50" r="28" fill="var(--card)" />
      </svg>
      <div className="space-y-1.5">
        {segs.map((s) => (
          <div key={s.k} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
            <span className="capitalize text-muted-foreground">{s.k.replace(/_/g, " ")}</span>
            <span className="font-bold">{num(s.v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const DONUT_COLORS = ["#2563eb", "#06b6d4", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444", "#64748b", "#ec4899"];

export function AnalyticsPage() {
  const [data, setData] = React.useState<Analytics | null>(null);

  React.useEffect(() => {
    fetch("/api/recruiters/analytics")
      .then((r) => r.json())
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Analytics</h1>
        <p className="text-sm text-muted-foreground">Performance metrics for your agency</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><PieChart className="h-4 w-4 text-[#2563eb]" /> Submissions by Status</CardTitle>
            <CardDescription>Current distribution across the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <Donut data={data.submissionsByStatus} colors={DONUT_COLORS} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><PieChart className="h-4 w-4 text-[#2563eb]" /> Candidates by Status</CardTitle>
            <CardDescription>Your talent pool health</CardDescription>
          </CardHeader>
          <CardContent>
            <Donut data={data.candidatesByStatus} colors={DONUT_COLORS} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-[#2563eb]" /> Submissions per Month</CardTitle>
            <CardDescription>Candidate submission volume</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={data.submissionsByMonth} color="bg-gradient-to-t from-[#2563eb] to-[#06b6d4]" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-[#2563eb]" /> Placements & Revenue per Month</CardTitle>
            <CardDescription>Successful placements and collected revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-semibold text-muted-foreground">Placements</p>
              <Bar data={data.placementsByMonth} color="bg-emerald-500" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-muted-foreground">Revenue (INR)</p>
              <Bar data={data.revenueByMonth} color="bg-gradient-to-t from-emerald-600 to-teal-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><BarChart3 className="h-4 w-4 text-[#2563eb]" /> Expected Fees by Client</CardTitle>
            <CardDescription>Revenue pipeline per client relationship</CardDescription>
          </CardHeader>
          <CardContent>
            {data.feesByClient.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No fees recorded yet</p>
            ) : (
              <div className="space-y-3">
                {data.feesByClient
                  .reduce((acc, f) => {
                    const existing = acc.find((a) => a.client === f.client);
                    if (existing) existing.expectedFee += f.expectedFee;
                    else acc.push({ client: f.client, expectedFee: f.expectedFee });
                    return acc;
                  }, [] as { client: string; expectedFee: number }[])
                  .sort((a, b) => b.expectedFee - a.expectedFee)
                  .map((f) => (
                    <div key={f.client} className="flex items-center gap-3">
                      <span className="w-40 truncate text-sm font-medium">{f.client}</span>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4]"
                          style={{ width: `${(f.expectedFee / Math.max(1, data.feesByClient.reduce((s, x) => s + x.expectedFee, 0))) * 100}%` }}
                        />
                      </div>
                      <span className="w-28 text-right text-sm font-bold">{currency(f.expectedFee)}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}