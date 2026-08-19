"use client";

import * as React from "react";
import { Plus, Phone, Video, MapPin, Calendar, Link2, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { badge } from "@/lib/recruiter-ui";

interface Interview {
  id: string;
  interviewDate: string;
  interviewType: string;
  location: string | null;
  meetingUrl: string | null;
  interviewer: string | null;
  status: string;
  candidate: { name: string; phone: string | null };
  client: { companyName: string } | null;
  requirement: { title: string } | null;
}

interface Option { id: string; name: string }

export function InterviewsPage() {
  const [interviews, setInterviews] = React.useState<Interview[] | null>(null);
  const [candidates, setCandidates] = React.useState<Option[]>([]);
  const [requirements, setRequirements] = React.useState<Option[]>([]);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const load = () => {
    fetch("/api/recruiters/interviews")
      .then((r) => r.json())
      .then((res) => setInterviews(res.data ?? []))
      .catch(() => setInterviews([]));
  };

  React.useEffect(() => {
    load();
    Promise.all([
      fetch("/api/recruiters/candidates").then((r) => r.json()),
      fetch("/api/recruiters/requirements").then((r) => r.json()),
    ]).then(([c, r]) => {
      setCandidates((c.data ?? []).map((x: { id: string; name: string }) => ({ id: x.id, name: x.name })));
      setRequirements((r.data ?? []).map((x: { id: string; title: string }) => ({ id: x.id, name: x.title })));
    });
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const create = async () => {
    if (!form.candidateId || !form.interviewDate) {
      toast.error("Candidate and interview date are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to schedule interview");
      toast.success("Interview scheduled");
      setOpen(false);
      setForm({});
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const upcoming = interviews?.filter((i) => new Date(i.interviewDate) >= new Date() && i.status !== "CANCELLED").sort((a, b) => +new Date(a.interviewDate) - +new Date(b.interviewDate)) ?? [];
  const past = interviews?.filter((i) => new Date(i.interviewDate) < new Date()).sort((a, b) => +new Date(b.interviewDate) - +new Date(a.interviewDate)) ?? [];

  const renderRow = (i: Interview) => (
    <div key={i.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background p-4">
      <Avatar size="sm">
        <AvatarFallback className="bg-[#2563eb]/10 text-[#2563eb]">{getInitials(i.candidate.name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold">{i.candidate.name}</p>
          <Badge className={cn(badge(i.status).cls)}>{badge(i.status).label}</Badge>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {i.requirement?.title} • {i.client?.companyName} {i.interviewer ? `• Interviewer: ${i.interviewer}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {i.interviewType === "PHONE" ? <Phone className="h-3.5 w-3.5" /> : i.interviewType === "ONSITE" ? <MapPin className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
        <Calendar className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground">{formatDate(i.interviewDate)}</span>
        <span>{new Date(i.interviewDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
      </div>
      {i.meetingUrl && (
        <a href={i.meetingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-[#2563eb]/10 px-2.5 py-1.5 text-xs font-semibold text-[#2563eb] hover:bg-[#2563eb]/20">
          <Link2 className="h-3.5 w-3.5" /> Join
        </a>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Interviews</h1>
          <p className="text-sm text-muted-foreground">Schedule and track candidate interviews with clients</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
              <Plus className="h-4 w-4" /> Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>Set up an interview between a candidate and the client</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Candidate *</Label>
                <Select value={form.candidateId ?? ""} onValueChange={(v) => update("candidateId", v)}>
                  <SelectTrigger><SelectValue placeholder="Select candidate" /></SelectTrigger>
                  <SelectContent>
                    {candidates.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Requirement</Label>
                <Select value={form.requirementId ?? ""} onValueChange={(v) => update("requirementId", v)}>
                  <SelectTrigger><SelectValue placeholder="Select requirement" /></SelectTrigger>
                  <SelectContent>
                    {requirements.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Date & Time *</Label>
                  <Input type="datetime-local" value={form.interviewDate ?? ""} onChange={(e) => update("interviewDate", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Type</Label>
                  <Select value={form.interviewType ?? "VIDEO"} onValueChange={(v) => update("interviewType", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHONE">Phone</SelectItem>
                      <SelectItem value="VIDEO">Video</SelectItem>
                      <SelectItem value="ONSITE">Onsite</SelectItem>
                      <SelectItem value="VIRTUAL">Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Meeting URL</Label>
                <Input placeholder="https://meet.google.com/..." value={form.meetingUrl ?? ""} onChange={(e) => update("meetingUrl", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Interviewer</Label>
                <Input placeholder="Client HR / Hiring Manager name" value={form.interviewer ?? ""} onChange={(e) => update("interviewer", e.target.value)} />
              </div>
              <Button onClick={create} disabled={saving}>{saving ? "Scheduling..." : "Schedule"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!interviews ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        </div>
      ) : (
        <>
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <MessageSquareText className="h-4 w-4" /> Upcoming ({upcoming.length})
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming interviews. Schedule one to keep the pipeline moving.</p>
            ) : (
              <div className="space-y-2">{upcoming.map(renderRow)}</div>
            )}
          </div>
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <Calendar className="h-4 w-4" /> Past ({past.length})
            </h2>
            {past.length === 0 ? (
              <p className="text-sm text-muted-foreground">No past interviews yet.</p>
            ) : (
              <div className="space-y-2">{past.map(renderRow)}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}