"use client";

import * as React from "react";
import {
  FileText,
  Upload,
  Sparkles,
  Download,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResumeParser } from "@/components/ats/resume-parser";
import { ResumeScoreCard } from "@/components/ai/resume-score-card";

const savedResumes = [
  { id: "1", name: "Software Engineer Resume.pdf", lastUpdated: "Jan 15, 2026", score: 85 },
  { id: "2", name: "Full Stack Developer Resume.pdf", lastUpdated: "Jan 10, 2026", score: 72 },
];

export default function ResumePage() {
  const [activeTab, setActiveTab] = React.useState<"upload" | "build" | "score">("upload");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Resume Builder</h1>
        <p className="text-muted-foreground">
          Upload, build, and optimize your resume with AI
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "upload" ? "default" : "outline"}
          onClick={() => setActiveTab("upload")}
        >
          <Upload className="h-4 w-4" />
          Upload Resume
        </Button>
        <Button
          variant={activeTab === "build" ? "default" : "outline"}
          onClick={() => setActiveTab("build")}
        >
          <FileText className="h-4 w-4" />
          Build Resume
        </Button>
        <Button
          variant={activeTab === "score" ? "default" : "outline"}
          onClick={() => setActiveTab("score")}
        >
          <Sparkles className="h-4 w-4" />
          AI Score
        </Button>
      </div>

      {/* Saved Resumes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Resumes</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Resume
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {savedResumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{resume.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {resume.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={resume.score >= 80 ? "success" : resume.score >= 60 ? "warning" : "destructive"}
                    size="sm"
                  >
                    {resume.score}% score
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Tab Content */}
      {activeTab === "upload" && (
        <Card>
          <CardContent className="p-6">
            <ResumeParser />
          </CardContent>
        </Card>
      )}

      {activeTab === "build" && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
              <FileText className="h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">
                AI-powered resume builder coming soon
              </p>
              <Button className="mt-4" variant="outline" size="sm">
                <CheckCircle2 className="h-4 w-4" />
                Get Notified
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "score" && (
        <Card>
          <CardContent className="p-6">
            <ResumeScoreCard />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
