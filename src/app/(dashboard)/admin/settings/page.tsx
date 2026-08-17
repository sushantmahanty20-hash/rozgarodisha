"use client";

import * as React from "react";
import { Save, Settings, Mail, MessageSquare, CreditCard, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const tabs = [
  { value: "general", label: "General", icon: Settings },
  { value: "email", label: "Email", icon: Mail },
  { value: "sms", label: "SMS", icon: MessageSquare },
  { value: "payment", label: "Payment", icon: CreditCard },
  { value: "ai", label: "AI", icon: Bot },
];

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = React.useState(false);

  async function handleSave() {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Settings saved successfully");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure platform settings</p>
        </div>
        <Button onClick={handleSave} loading={isSaving}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full justify-start">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage general platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="Platform Name" defaultValue="JobSphere" />
              <Input label="Support Email" type="email" defaultValue="support@jobsphere.com" />
              <Input label="Default Language" defaultValue="en" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Maintenance Mode</p>
                  <p className="text-xs text-muted-foreground">Temporarily disable the platform</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">New Registrations</p>
                  <p className="text-xs text-muted-foreground">Allow new user registrations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email service settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="SMTP Host" placeholder="smtp.example.com" defaultValue="smtp.sendgrid.net" />
              <Input label="SMTP Port" defaultValue="587" />
              <Input label="SMTP Username" defaultValue="apikey" />
              <Input label="SMTP Password" type="password" defaultValue="********" />
              <Input label="From Email" defaultValue="noreply@jobsphere.com" />
              <Input label="From Name" defaultValue="JobSphere" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Verification Required</p>
                  <p className="text-xs text-muted-foreground">Require email verification for new accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Configuration</CardTitle>
              <CardDescription>Configure SMS gateway settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="SMS Provider" defaultValue="Twilio" />
              <Input label="Account SID" defaultValue="AC************************" />
              <Input label="Auth Token" type="password" defaultValue="********" />
              <Input label="From Number" defaultValue="+1234567890" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Enable SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">Send SMS for important notifications</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment gateway and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="Stripe Public Key" defaultValue="pk_test_************************" />
              <Input label="Stripe Secret Key" type="password" defaultValue="sk_test_************************" />
              <Input label="Webhook Secret" type="password" defaultValue="whsec_************************" />
              <Input label="Currency" defaultValue="USD" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Test Mode</p>
                  <p className="text-xs text-muted-foreground">Use Stripe test mode for development</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>Configure AI-powered features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="OpenAI API Key" type="password" defaultValue="sk-************************" />
              <Input label="Model" defaultValue="gpt-4o" />
              <Input label="Max Tokens" defaultValue="2048" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">AI Job Matching</p>
                  <p className="text-xs text-muted-foreground">Use AI to suggest job matches</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Resume Scoring</p>
                  <p className="text-xs text-muted-foreground">AI-powered resume analysis</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-Screen Candidates</p>
                  <p className="text-xs text-muted-foreground">Automatically screen incoming applications</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
