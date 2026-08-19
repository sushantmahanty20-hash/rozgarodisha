"use client";

import * as React from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  FolderOpen,
  Upload,
  Camera,
  Save,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const tabs = [
  { value: "personal", label: "Personal", icon: User },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "experience", label: "Experience", icon: Briefcase },
  { value: "skills", label: "Skills", icon: Wrench },
  { value: "certifications", label: "Certifications", icon: Award },
  { value: "projects", label: "Projects", icon: FolderOpen },
];

export default function ProfilePage() {
  const [isSaving, setIsSaving] = React.useState(false);

  async function handleSave() {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Profile saved successfully");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your professional profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} loading={isSaving}>
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        </div>
      </div>

      {/* Photo & Resume */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-10 w-10 text-primary/60" />
                </div>
                <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="font-medium">Profile Photo</h3>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max 2MB.
                </p>
                <Button variant="link" size="sm" className="mt-1 px-0">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
                <Briefcase className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <div>
                <h3 className="font-medium">Resume</h3>
                <p className="text-xs text-muted-foreground">
                  PDF format. Max 5MB.
                </p>
                <Button variant="link" size="sm" className="mt-1 px-0">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Resume
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="w-full justify-start flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First Name" placeholder="John" defaultValue="" />
                <Input label="Last Name" placeholder="Doe" defaultValue="" />
              </div>
              <Input label="Headline" placeholder="Senior Software Engineer" defaultValue="" />
              <Textarea label="Bio" placeholder="Tell employers about yourself..." maxLength={500} defaultValue="" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Email" type="email" placeholder="you@example.com" defaultValue="" />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" defaultValue="" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Location" placeholder="San Francisco, CA" defaultValue="" />
                <Input label="Website" placeholder="https://yoursite.com" defaultValue="" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="LinkedIn" placeholder="https://linkedin.com/in/you" defaultValue="" />
                <Input label="GitHub" placeholder="https://github.com/you" defaultValue="" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Education Entry</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Institution" placeholder="University of California" />
                  <Input label="Degree" placeholder="Bachelor of Science" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Field of Study" placeholder="Computer Science" />
                  <Input label="Grade / GPA" placeholder="3.8/4.0" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Start Date" type="date" />
                  <Input label="End Date" type="date" />
                </div>
                <Textarea label="Description" placeholder="Activities, achievements..." maxLength={500} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Experience Entry</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Company" placeholder="TechCorp Inc." />
                  <Input label="Job Title" placeholder="Senior Engineer" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Start Date" type="date" />
                  <Input label="End Date" type="date" />
                </div>
                <Textarea label="Description" placeholder="Describe your responsibilities and achievements..." maxLength={2000} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Add a skill" placeholder="e.g. React, TypeScript, Node.js" />
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {skill}
                    <button className="ml-1 text-primary/60 hover:text-primary">&times;</button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications */}
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Certifications</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border p-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Certification Name" placeholder="AWS Solutions Architect" />
                  <Input label="Issuing Organization" placeholder="Amazon Web Services" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Issue Date" type="date" />
                  <Input label="Expiry Date" type="date" />
                </div>
                <Input label="Credential URL" placeholder="https://..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border p-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Project Name" placeholder="E-commerce Platform" />
                  <Input label="Project URL" placeholder="https://..." />
                </div>
                <Input label="Technologies" placeholder="React, Node.js, PostgreSQL" />
                <Textarea label="Description" placeholder="Describe the project..." maxLength={1000} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Start Date" type="date" />
                  <Input label="End Date" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
