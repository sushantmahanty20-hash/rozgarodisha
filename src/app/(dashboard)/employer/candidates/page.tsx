"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  GraduationCap,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CandidateRanking } from "@/components/ats/candidate-ranking";
import { cn } from "@/lib/utils";

const mockCandidates = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior React Developer",
    location: "San Francisco, CA",
    experience: "8 years",
    education: "MS Computer Science",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    matchScore: 94,
    status: "shortlisted",
  },
  {
    id: "2",
    name: "Emily Johnson",
    title: "Full Stack Engineer",
    location: "Remote",
    experience: "6 years",
    education: "BS Computer Science",
    skills: ["React", "Python", "AWS", "Docker"],
    matchScore: 87,
    status: "new",
  },
  {
    id: "3",
    name: "David Park",
    title: "Product Manager",
    location: "New York, NY",
    experience: "10 years",
    education: "MBA",
    skills: ["Product Strategy", "Agile", "Analytics"],
    matchScore: 85,
    status: "interview",
  },
  {
    id: "4",
    name: "Lisa Anderson",
    title: "UX Designer",
    location: "Austin, TX",
    experience: "5 years",
    education: "BFA Design",
    skills: ["Figma", "User Research", "Prototyping"],
    matchScore: 78,
    status: "new",
  },
  {
    id: "5",
    name: "Tom Brown",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    experience: "7 years",
    education: "BS Information Technology",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    matchScore: 72,
    status: "reviewed",
  },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "info" | "secondary" | "destructive" }> = {
  new: { label: "New", variant: "info" },
  shortlisted: { label: "Shortlisted", variant: "success" },
  interview: { label: "Interview", variant: "warning" },
  reviewed: { label: "Reviewed", variant: "secondary" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export default function CandidatesPage() {
  const [search, setSearch] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

  const allSkills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "Figma"];

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.title.toLowerCase().includes(search.toLowerCase());
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => candidate.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Candidate Search</h1>
        <p className="text-muted-foreground">
          AI-ranked candidates matching your job requirements
        </p>
      </div>

      {/* AI Ranking */}
      <CandidateRanking />

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name, title, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {selectedSkills.length > 0 && (
            <Badge size="sm">{selectedSkills.length}</Badge>
          )}
        </Button>
      </div>

      {/* Skill Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium">Filter by Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() =>
                    setSelectedSkills((prev) =>
                      prev.includes(skill)
                        ? prev.filter((s) => s !== skill)
                        : [...prev, skill]
                    )
                  }
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    selectedSkills.includes(skill)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {skill}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" size="sm">
              {skill}
              <button
                onClick={() =>
                  setSelectedSkills((prev) => prev.filter((s) => s !== skill))
                }
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="transition-colors hover:bg-muted/50">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{candidate.name}</h3>
                      <Badge variant="info" size="sm">
                        AI Score: {candidate.matchScore}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {candidate.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {candidate.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {candidate.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {candidate.education}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusConfig[candidate.status]?.variant ?? "secondary"} size="sm">
                    {statusConfig[candidate.status]?.label ?? candidate.status}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/employer/candidates/${candidate.id}`}>
                      View Profile
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
          <Search className="h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">
            No candidates found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
