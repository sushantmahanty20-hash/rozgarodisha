"use client";

import * as React from "react";
import { Bell, Send, UserPlus, GitBranch, DollarSign, CheckCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const iconFor = (title: string) => {
  if (title.toLowerCase().includes("submitted")) return Send;
  if (title.toLowerCase().includes("pipeline")) return GitBranch;
  if (title.toLowerCase().includes("fee") || title.toLowerCase().includes("payment")) return DollarSign;
  if (title.toLowerCase().includes("client")) return UserPlus;
  return Bell;
};

export function NotificationsPage() {
  const [items, setItems] = React.useState<Notification[] | null>(null);

  React.useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((res) => {
        const d = Array.isArray(res) ? res : res.data ?? [];
        setItems(d);
      })
      .catch(() => setItems([]));
  }, []);

  const markAll = async () => {
    await fetch("/api/notifications/read-all", { method: "POST" }).catch(() => {});
    setItems((prev) => prev?.map((n) => ({ ...n, isRead: true })) ?? null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Notifications</h1>
          <p className="text-sm text-muted-foreground">Pipeline updates and system alerts</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={markAll}>
          <CheckCheck className="h-4 w-4" /> Mark all read
        </Button>
      </div>

      {!items ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-3 text-lg font-semibold">No notifications</h3>
            <p className="mt-1 text-sm text-muted-foreground">You&apos;re all caught up</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((n) => {
            const Icon = iconFor(n.title);
            return (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 transition-colors",
                  n.isRead ? "border-border bg-background" : "border-[#2563eb]/30 bg-[#2563eb]/5"
                )}
              >
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", n.isRead ? "bg-muted text-muted-foreground" : "bg-[#2563eb] text-white")}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">{formatRelativeTime(n.createdAt)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}