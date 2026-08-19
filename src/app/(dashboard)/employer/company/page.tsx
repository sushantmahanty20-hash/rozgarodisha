"use client";

import * as React from "react";
import {
  Building2,
  Upload,
  Users,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  { id: "1", name: "Alex Chen", role: "CEO", email: "alex@techcorp.com" },
  { id: "2", name: "Sarah Kim", role: "CTO", email: "sarah@techcorp.com" },
  { id: "3", name: "Michael Torres", role: "Head of HR", email: "michael@techcorp.com" },
];

const galleryImages = [
  { id: "1", caption: "Office headquarters" },
  { id: "2", caption: "Team building event" },
  { id: "3", caption: "Annual hackathon" },
];

export default function CompanyProfilePage() {
  const [companyName, setCompanyName] = React.useState("TechCorp Inc.");
  const [industry, setIndustry] = React.useState("Technology");
  const [website, setWebsite] = React.useState("https://techcorp.com");
  const [location, setLocation] = React.useState("San Francisco, CA");
  const [size, setSize] = React.useState("1,000-5,000");
  const [founded, setFounded] = React.useState("2010");
  const [about, setAbout] = React.useState(
    "TechCorp Inc. is a leading enterprise software company focused on building innovative cloud solutions and AI-powered products."
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground">
          Manage your company information and team
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Company Info Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Company Size</label>
                <Input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Founded</label>
                <Input
                  value={founded}
                  onChange={(e) => setFounded(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                className="mt-1.5 flex w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed bg-muted">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Drop or click to upload
                  </p>
                </div>
              </div>
              <Button variant="outline" className="mt-4" size="sm">
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Gallery
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
              Add Image
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative">
                <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                  <ImageIcon className="h-8 w-8 text-primary/30" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{image.caption}</p>
                <button className="absolute right-2 top-2 rounded-lg bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ))}
            <button className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-primary/50">
              <Plus className="h-8 w-8 text-muted-foreground/40" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" size="sm">
                    {member.role}
                  </Badge>
                  <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
