"use client";

import * as React from "react";
import {
  Brain,
  ToggleLeft,
  ToggleRight,
  Save,
  Zap,
  MessageSquare,
  FileText,
  RefreshCw,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const aiModels = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", status: "active", requests: "12,450" },
  { id: "gpt-3.5", name: "GPT-3.5 Turbo", provider: "OpenAI", status: "active", requests: "45,230" },
  { id: "claude-3", name: "Claude 3 Sonnet", provider: "Anthropic", status: "inactive", requests: "0" },
];

const features = [
  {
    id: "resume-scoring",
    name: "AI Resume Scoring",
    description: "Automatically score resumes against job descriptions",
    enabled: true,
    model: "gpt-4",
  },
  {
    id: "job-matching",
    name: "Smart Job Matching",
    description: "AI-powered job recommendations for candidates",
    enabled: true,
    model: "gpt-3.5",
  },
  {
    id: "candidate-ranking",
    name: "Candidate Ranking",
    description: "Rank candidates based on job requirements",
    enabled: true,
    model: "gpt-4",
  },
  {
    id: "auto-screening",
    name: "Auto Screening",
    description: "Automatically screen applications based on criteria",
    enabled: false,
    model: "gpt-3.5",
  },
  {
    id: "chat-assistant",
    name: "Career Chat Assistant",
    description: "AI-powered career guidance chatbot",
    enabled: true,
    model: "gpt-3.5",
  },
  {
    id: "jd-generation",
    name: "Job Description Generator",
    description: "Auto-generate job descriptions from requirements",
    enabled: true,
    model: "gpt-4",
  },
];

const usageStats = [
  { label: "Total Requests", value: "57,680", change: "+12%" },
  { label: "Tokens Used", value: "2.4M", change: "+8%" },
  { label: "Avg Response Time", value: "1.2s", change: "-5%" },
  { label: "Error Rate", value: "0.3%", change: "-10%" },
];

const promptTemplates = [
  { id: "1", name: "Resume Scoring", category: "ATS", lastUpdated: "Jan 15, 2026" },
  { id: "2", name: "Job Matching", category: "Recommendations", lastUpdated: "Jan 12, 2026" },
  { id: "3", name: "Interview Questions", category: "Interviews", lastUpdated: "Jan 10, 2026" },
  { id: "4", name: "Candidate Summary", category: "Ranking", lastUpdated: "Jan 8, 2026" },
];

export default function AIConfigPage() {
  const [featuresState, setFeaturesState] = React.useState(features);
  const [modelsState, setModelsState] = React.useState(aiModels);

  const toggleFeature = (featureId: string) => {
    setFeaturesState((prev) =>
      prev.map((f) =>
        f.id === featureId ? { ...f, enabled: !f.enabled } : f
      )
    );
  };

  const toggleModel = (modelId: string) => {
    setModelsState((prev) =>
      prev.map((m) =>
        m.id === modelId
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">AI Configuration</h1>
        <p className="text-muted-foreground">
          Manage AI models, features, and prompt templates
        </p>
      </div>

      {/* Usage Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {usageStats.map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
                <Badge
                  variant={stat.change.startsWith("+") ? "success" : "info"}
                  size="sm"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Models */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Models
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {modelsState.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{model.name}</h3>
                    <Badge
                      variant={model.status === "active" ? "success" : "secondary"}
                      size="sm"
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {model.provider} &middot; {model.requests} requests
                  </p>
                </div>
                <button
                  onClick={() => toggleModel(model.id)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {model.status === "active" ? (
                    <ToggleRight className="h-6 w-6 text-primary" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              <Plus className="h-4 w-4" />
              Add Model
            </Button>
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {featuresState.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{feature.name}</h3>
                    <Badge variant="secondary" size="sm">
                      {feature.model}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {feature.enabled ? (
                    <ToggleRight className="h-6 w-6 text-primary" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Prompt Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Prompt Templates
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
              New Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promptTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {template.category} &middot; Updated {template.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
