"use client";

import * as React from "react";
import { User, Settings, Bell, ShieldCheck, Building2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/profile-form";
import { toast } from "sonner";

export function RecruiterSettingsPage() {
  const [prefs, setPrefs] = React.useState({
    email: true,
    push: true,
    sms: false,
    submissionAlerts: true,
    interviewReminders: true,
    weeklyReport: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    toast.success("Preference saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and notification preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="account" className="gap-2"><Settings className="h-4 w-4" /> Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email" as const, title: "Email Notifications", desc: "Receive important updates via email" },
                { key: "push" as const, title: "Push Notifications", desc: "Real-time alerts in the browser" },
                { key: "sms" as const, title: "SMS Alerts", desc: "Critical alerts via SMS" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch checked={prefs[n.key]} onCheckedChange={() => toggle(n.key)} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Alerts</CardTitle>
              <CardDescription>Pipeline and business updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "submissionAlerts" as const, title: "Submission Status Changes", desc: "When a client updates a submission status" },
                { key: "interviewReminders" as const, title: "Interview Reminders", desc: "Before scheduled interviews" },
                { key: "weeklyReport" as const, title: "Weekly Performance Report", desc: "Summary of your agency's activity" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch checked={prefs[n.key]} onCheckedChange={() => toggle(n.key)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>Manage your agency information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Agency Profile</p>
                    <p className="text-xs text-muted-foreground">Update agency details, contact info and registration</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/recruiter/agency">Edit</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Agency Verification</p>
                    <p className="text-xs text-muted-foreground">Complete verification to earn the verified badge</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/recruiter/agency?tab=verification">Review</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}