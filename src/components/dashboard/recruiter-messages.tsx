"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn, formatRelativeTime } from "@/lib/utils";

const SEED = [
  {
    id: "1",
    name: "Rajesh Kumar (TechNova)",
    preview: "Hi, can you share more profiles for the developer role?",
    time: new Date(Date.now() - 2 * 3600e3).toISOString(),
    unread: 2,
    avatar: "RK",
  },
  {
    id: "2",
    name: "Priya Sharma (Candidate)",
    preview: "Thanks for the update! When is the next interview?",
    time: new Date(Date.now() - 26 * 3600e3).toISOString(),
    unread: 0,
    avatar: "PS",
  },
  {
    id: "3",
    name: "Anita Das (Team)",
    preview: "I've shortlisted 3 more candidates for CloudCore.",
    time: new Date(Date.now() - 3 * 24 * 3600e3).toISOString(),
    unread: 0,
    avatar: "AD",
  },
];

export function MessagesPage() {
  const [active, setActive] = React.useState(SEED[0]);
  const [thread, setThread] = React.useState([
    { from: "them", text: "Hi, can you share more profiles for the developer role?" },
    { from: "me", text: "Sure! I'll send 3 more profiles by tomorrow." },
  ]);
  const [draft, setDraft] = React.useState("");

  const send = () => {
    if (!draft.trim()) return;
    setThread((t) => [...t, { from: "me", text: draft.trim() }]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Messages</h1>
        <p className="text-sm text-muted-foreground">Conversations with clients, candidates and your team</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="h-fit">
          <CardContent className="p-2">
            {SEED.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors",
                  active.id === c.id ? "bg-[#2563eb]/10" : "hover:bg-muted/60"
                )}
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-[#2563eb]/10 text-[#2563eb]">{c.avatar}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <span className="text-[10px] text-muted-foreground">{formatRelativeTime(c.time)}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.preview}</p>
                </div>
                {c.unread > 0 && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-[10px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="flex min-h-[420px] flex-col">
          <CardContent className="flex flex-1 flex-col p-0">
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Avatar size="sm">
                <AvatarFallback className="bg-[#2563eb]/10 text-[#2563eb]">{active.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-emerald-600">Online</p>
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {thread.map((m, i) => (
                <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                      m.from === "me"
                        ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-border p-3">
              <Input placeholder="Type a message..." value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
              <Button size="icon" className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}