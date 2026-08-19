"use client";

import * as React from "react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  SlidersHorizontal,
  X,
  DollarSign,
  Grid3X3,
  List,
  CheckCircle,
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
    company: "TechNova Solutions",
    companyLogo: "T",
    location: "Bengaluru",
    salary: "18L - 28L PA",
    type: "Full-time",
    mode: "Hybrid",
    posted: "2h ago",
    applicants: 67,
    skills: ["React", "TypeScript", "Node.js"],
    featured: true,
    verified: true,
    color: "from-[#2563eb] to-[#3b82f6]",
    experience: "4-8 Years",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "FinEdge Capital",
    companyLogo: "F",
    location: "Mumbai",
    salary: "20L - 32L PA",
    type: "Full-time",
    mode: "Onsite",
    posted: "5h ago",
    applicants: 43,
    skills: ["Product Strategy", "Agile", "Analytics"],
    featured: true,
    verified: true,
    color: "from-[#7c3aed] to-[#a855f7]",
    experience: "4-10 Years",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Vertex Labs",
    companyLogo: "V",
    location: "Hyderabad",
    salary: "12L - 20L PA",
    type: "Full-time",
    mode: "Hybrid",
    posted: "1d ago",
    applicants: 38,
    skills: ["Figma", "User Research", "Prototyping"],
    featured: false,
    verified: true,
    color: "from-[#06b6d4] to-[#22d3ee]",
    experience: "3-6 Years",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudCore Systems",
    companyLogo: "C",
    location: "Remote",
    salary: "16L - 26L PA",
    type: "Full-time",
    mode: "Remote",
    posted: "3h ago",
    applicants: 52,
    skills: ["AWS", "Kubernetes", "Terraform"],
    featured: true,
    verified: true,
    color: "from-[#f59e0b] to-[#fbbf24]",
    experience: "4-8 Years",
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Vertex Labs",
    companyLogo: "V",
    location: "Pune",
    salary: "22L - 35L PA",
    type: "Full-time",
    mode: "Hybrid",
    posted: "1w ago",
    applicants: 71,
    skills: ["Python", "TensorFlow", "SQL"],
    featured: false,
    verified: true,
    color: "from-[#10b981] to-[#34d399]",
    experience: "3-7 Years",
  },
  {
    id: "6",
    title: "Marketing Manager",
    company: "Apex Digital",
    companyLogo: "A",
    location: "Delhi",
    salary: "14L - 22L PA",
    type: "Full-time",
    mode: "Hybrid",
    posted: "1w ago",
    applicants: 34,
    skills: ["SEO", "Content Strategy", "Analytics"],
    featured: false,
    verified: true,
    color: "from-[#ec4899] to-[#f472b6]",
    experience: "5-9 Years",
  },
  {
    id: "7",
    title: "Backend Developer",
    company: "CloudCore Systems",
    companyLogo: "C",
    location: "Remote",
    salary: "14L - 24L PA",
    type: "Full-time",
    mode: "Remote",
    posted: "2d ago",
    applicants: 56,
    skills: ["Node.js", "PostgreSQL", "Microservices"],
    featured: false,
    verified: true,
    color: "from-[#8b5cf6] to-[#a78bfa]",
    experience: "3-7 Years",
  },
  {
    id: "8",
    title: "HR Business Partner",
    company: "TalentBridge HR",
    companyLogo: "T",
    location: "Gurugram",
    salary: "12L - 20L PA",
    type: "Full-time",
    mode: "Onsite",
    posted: "3d ago",
    applicants: 22,
    skills: ["HR Strategy", "Recruitment", "L&D"],
    featured: false,
    verified: true,
    color: "from-[#f97316] to-[#fb923c]",
    experience: "5-10 Years",
  },
  {
    id: "9",
    title: "Full Stack Developer",
    company: "BrightWorks Studio",
    companyLogo: "B",
    location: "Gurugram",
    salary: "12L - 20L PA",
    type: "Full-time",
    mode: "Remote",
    posted: "6h ago",
    applicants: 49,
    skills: ["Next.js", "React", "PostgreSQL"],
    featured: false,
    verified: true,
    color: "from-[#14b8a6] to-[#5eead4]",
    experience: "3-6 Years",
  },
  {
    id: "10",
    title: "Business Development Manager",
    company: "FinEdge Capital",
    companyLogo: "F",
    location: "Mumbai",
    salary: "14L - 22L PA",
    type: "Full-time",
    mode: "Onsite",
    posted: "4d ago",
    applicants: 25,
    skills: ["B2B Sales", "Negotiation", "CRM"],
    featured: false,
    verified: true,
    color: "from-[#ef4444] to-[#f87171]",
    experience: "5-10 Years",
  },
  {
    id: "11",
    title: "Intern - Software Development",
    company: "BrightWorks Studio",
    companyLogo: "B",
    location: "Bengaluru",
    salary: "2.5L - 4.5L PA",
    type: "Internship",
    mode: "Hybrid",
    posted: "1d ago",
    applicants: 124,
    skills: ["JavaScript", "React", "Git"],
    featured: false,
    verified: true,
    color: "from-[#0ea5e9] to-[#38bdf8]",
    experience: "0-1 Years",
  },
  {
    id: "12",
    title: "Cloud Architect",
    company: "CloudCore Systems",
    companyLogo: "C",
    location: "Bengaluru",
    salary: "28L - 42L PA",
    type: "Full-time",
    mode: "Hybrid",
    posted: "5d ago",
    applicants: 38,
    skills: ["AWS", "Architecture", "Terraform"],
    featured: true,
    verified: true,
    color: "from-[#6366f1] to-[#818cf8]",
    experience: "7-14 Years",
  },
];

const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const workModes = ["Remote", "Hybrid", "Onsite"];

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-[#64748b] dark:text-gray-400">Loading jobs...</div>}>
      <JobsPageInner />
    </Suspense>
  );
}

function JobsPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("loc") || "";

  const [search, setSearch] = React.useState(initialQuery);
  const [location, setLocation] = React.useState(initialLocation);
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [selectedModes, setSelectedModes] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("relevance");
  const [page, setPage] = React.useState(1);
  const [savedJobs, setSavedJobs] = React.useState<string[]>([]);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

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

  const activeFilterCount = selectedTypes.length + selectedModes.length + selectedCategories.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#f8fafc] dark:bg-[#0a0a0f]">
        {/* Search Hero */}
        <div className="border-b border-[#e2e8f0] bg-white py-8 dark:border-white/10 dark:bg-[#0a0a0f]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#0f172a] sm:text-3xl dark:text-white">
              Find Your Next Opportunity
            </h1>
            <p className="mt-2 text-[#64748b] dark:text-gray-400">
              {filteredJobs.length.toLocaleString()} jobs available
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <Input
                  placeholder="Job title, skills, or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative sm:w-64">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white">
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
                    <h3 className="font-bold text-[#0f172a] dark:text-white">Filters</h3>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => {
                          setSelectedTypes([]);
                          setSelectedModes([]);
                          setSelectedCategories([]);
                        }}
                        className="text-xs font-semibold text-[#2563eb] hover:underline dark:text-[#818cf8]"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Employment Type */}
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-bold text-[#0f172a] dark:text-white">Employment Type</h4>
                    <div className="space-y-2">
                      {employmentTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-[#475569] dark:text-gray-300">
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
                            className="h-4 w-4 rounded border-[#e2e8f0]"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Work Mode */}
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-bold text-[#0f172a] dark:text-white">Work Mode</h4>
                    <div className="space-y-2">
                      {workModes.map((mode) => (
                        <label key={mode} className="flex items-center gap-2 text-sm text-[#475569] dark:text-gray-300">
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
                            className="h-4 w-4 rounded border-[#e2e8f0]"
                          />
                          {mode}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-bold text-[#0f172a] dark:text-white">Salary Range</h4>
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
                <p className="text-sm font-semibold text-[#64748b] dark:text-gray-400">
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
                  <div className="flex items-center rounded-lg border border-[#e2e8f0] bg-white dark:border-white/10 dark:bg-[#111118]">
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn("flex h-8 w-8 items-center justify-center rounded-l-lg transition-colors", viewMode === "list" ? "bg-[#2563eb]/10 text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]" : "text-[#94a3b8] hover:text-[#64748b]")}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn("flex h-8 w-8 items-center justify-center rounded-r-lg transition-colors", viewMode === "grid" ? "bg-[#2563eb]/10 text-[#2563eb] dark:bg-[#818cf8]/10 dark:text-[#818cf8]" : "text-[#94a3b8] hover:text-[#64748b]")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-8 rounded-lg border border-[#e2e8f0] bg-white px-2 text-sm font-medium text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:border-white/10 dark:bg-[#111118] dark:text-white"
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
              <div className={cn("gap-4", viewMode === "grid" ? "grid sm:grid-cols-2" : "space-y-4")}>
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={cn(
                      "transition-all hover:shadow-md",
                      job.featured && "border-[#2563eb]/20 bg-[#2563eb]/5 dark:border-[#818cf8]/20 dark:bg-[#818cf8]/5"
                    )}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${job.color} text-sm font-bold text-white shadow-md`}>
                          {job.companyLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/jobs/${job.id}`}
                                  className="text-sm font-bold text-[#0f172a] hover:text-[#2563eb] hover:underline dark:text-white dark:hover:text-[#818cf8]"
                                >
                                  {job.title}
                                </Link>
                                {job.verified && (
                                  <CheckCircle className="h-3.5 w-3.5 text-[#2563eb] dark:text-[#818cf8]" />
                                )}
                              </div>
                              <p className="text-xs font-medium text-[#64748b] dark:text-gray-400">
                                {job.company}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleSave(job.id)}
                              className="text-[#94a3b8] hover:text-[#2563eb] dark:hover:text-[#818cf8]"
                            >
                              <Bookmark
                                className={cn(
                                  "h-5 w-5",
                                  savedJobs.includes(job.id) && "fill-[#2563eb] text-[#2563eb] dark:fill-[#818cf8] dark:text-[#818cf8]"
                                )}
                              />
                            </button>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#64748b] dark:text-gray-400">
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
                              {job.experience}
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
              </div>

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] py-16 dark:border-white/10">
                  <Briefcase className="h-12 w-12 text-[#94a3b8]/40" />
                  <p className="mt-4 text-sm font-medium text-[#64748b] dark:text-gray-400">
                    No jobs found matching your criteria
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setSearch("");
                      setLocation("");
                      setSelectedTypes([]);
                      setSelectedModes([]);
                    }}
                  >
                    Clear filters
                  </Button>
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
