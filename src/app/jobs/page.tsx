"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  SlidersHorizontal,
  X,
  Building2,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    companyLogo: null,
    location: "Remote",
    salary: "$120K - $160K",
    type: "Full-time",
    mode: "Remote",
    posted: "2h ago",
    applicants: 45,
    skills: ["React", "TypeScript", "Node.js"],
    featured: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    companyLogo: null,
    location: "New York, NY",
    salary: "$110K - $140K",
    type: "Full-time",
    mode: "Hybrid",
    posted: "1d ago",
    applicants: 23,
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    featured: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    companyLogo: null,
    location: "San Francisco, CA",
    salary: "$90K - $120K",
    type: "Full-time",
    mode: "Onsite",
    posted: "3d ago",
    applicants: 38,
    skills: ["Figma", "User Research", "Prototyping"],
    featured: false,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudNine",
    companyLogo: null,
    location: "Austin, TX",
    salary: "$100K - $130K",
    type: "Contract",
    mode: "Hybrid",
    posted: "5d ago",
    applicants: 15,
    skills: ["AWS", "Kubernetes", "Terraform"],
    featured: true,
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "DataFlow AI",
    companyLogo: null,
    location: "Remote",
    salary: "$130K - $170K",
    type: "Full-time",
    mode: "Remote",
    posted: "1w ago",
    applicants: 67,
    skills: ["Python", "TensorFlow", "SQL"],
    featured: false,
  },
  {
    id: "6",
    title: "Marketing Lead",
    company: "GrowthHub",
    companyLogo: null,
    location: "Chicago, IL",
    salary: "$80K - $110K",
    type: "Full-time",
    mode: "Onsite",
    posted: "1w ago",
    applicants: 34,
    skills: ["SEO", "Content Strategy", "Analytics"],
    featured: false,
  },
];

const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"];
const workModes = ["Remote", "Hybrid", "Onsite"];

export default function JobsPage() {
  const [search, setSearch] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [selectedModes, setSelectedModes] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("relevance");
  const [page, setPage] = React.useState(1);
  const [savedJobs, setSavedJobs] = React.useState<string[]>([]);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.type);
    const matchesMode =
      selectedModes.length === 0 || selectedModes.includes(job.mode);
    return matchesSearch && matchesLocation && matchesType && matchesMode;
  });

  function toggleSave(id: string) {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const activeFilterCount = selectedTypes.length + selectedModes.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Search Hero */}
        <div className="border-b bg-background py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">
              Find Your Next Opportunity
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredJobs.length} jobs available
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Job title, skills, or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative sm:w-64">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar Filters */}
            <aside
              className={cn(
                "w-full shrink-0 space-y-6 lg:w-72",
                showFilters ? "block" : "hidden lg:block"
              )}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filters</h3>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => {
                          setSelectedTypes([]);
                          setSelectedModes([]);
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Employment Type */}
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">Employment Type</h4>
                    <div className="space-y-2">
                      {employmentTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() =>
                              setSelectedTypes((prev) =>
                                prev.includes(type)
                                  ? prev.filter((t) => t !== type)
                                  : [...prev, type]
                              )
                            }
                            className="h-4 w-4 rounded border-input"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Work Mode */}
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">Work Mode</h4>
                    <div className="space-y-2">
                      {workModes.map((mode) => (
                        <label key={mode} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedModes.includes(mode)}
                            onChange={() =>
                              setSelectedModes((prev) =>
                                prev.includes(mode)
                                  ? prev.filter((m) => m !== mode)
                                  : [...prev, mode]
                              )
                            }
                            className="h-4 w-4 rounded border-input"
                          />
                          {mode}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">Salary Range</h4>
                    <div className="flex gap-2">
                      <Input placeholder="Min" type="number" />
                      <Input placeholder="Max" type="number" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Job Listings */}
            <div className="flex-1 space-y-4">
              {/* Sort bar */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredJobs.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge size="sm">{activeFilterCount}</Badge>
                    )}
                  </Button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-8 rounded-lg border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="recent">Most Recent</option>
                    <option value="salary">Highest Salary</option>
                  </select>
                </div>
              </div>

              {/* Active filters */}
              {(selectedTypes.length > 0 || selectedModes.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map((type) => (
                    <Badge key={type} variant="secondary" size="sm">
                      {type}
                      <button
                        onClick={() =>
                          setSelectedTypes((prev) => prev.filter((t) => t !== type))
                        }
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedModes.map((mode) => (
                    <Badge key={mode} variant="secondary" size="sm">
                      {mode}
                      <button
                        onClick={() =>
                          setSelectedModes((prev) => prev.filter((m) => m !== mode))
                        }
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Job Cards */}
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={cn(
                    "transition-all hover:shadow-md",
                    job.featured && "border-primary/20 bg-primary/5"
                  )}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                        {job.company[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link
                              href={`/jobs/${job.id}`}
                              className="text-sm font-semibold hover:text-primary hover:underline"
                            >
                              {job.title}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {job.company}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleSave(job.id)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Bookmark
                              className={cn(
                                "h-5 w-5",
                                savedJobs.includes(job.id) && "fill-primary text-primary"
                              )}
                            />
                          </button>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.posted}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" size="sm">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
                  <Briefcase className="h-12 w-12 text-muted-foreground/40" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    No jobs found matching your criteria
                  </p>
                </div>
              )}

              <Pagination
                currentPage={page}
                totalPages={5}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
