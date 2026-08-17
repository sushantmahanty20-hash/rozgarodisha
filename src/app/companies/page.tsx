"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Building2,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { CompanyCard } from "@/components/shared/company-card";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const mockCompanies = [
  {
    id: "1",
    name: "TechCorp Inc.",
    logo: null,
    industry: "Technology",
    employeeCount: "1,000-5,000",
    jobOpenings: 24,
    location: "San Francisco, CA",
    isVerified: true,
    description: "Leading enterprise software company focused on cloud solutions and AI-powered products.",
  },
  {
    id: "2",
    name: "StartupXYZ",
    logo: null,
    industry: "FinTech",
    employeeCount: "50-200",
    jobOpenings: 12,
    location: "New York, NY",
    isVerified: true,
    description: "Revolutionizing digital payments with cutting-edge blockchain technology.",
  },
  {
    id: "3",
    name: "DesignStudio",
    logo: null,
    industry: "Design",
    employeeCount: "200-500",
    jobOpenings: 8,
    location: "Austin, TX",
    isVerified: false,
    description: "Award-winning design agency creating world-class digital experiences.",
  },
  {
    id: "4",
    name: "CloudNine",
    logo: null,
    industry: "Cloud Computing",
    employeeCount: "5,000-10,000",
    jobOpenings: 35,
    location: "Seattle, WA",
    isVerified: true,
    description: "Enterprise cloud infrastructure powering the world's top companies.",
  },
  {
    id: "5",
    name: "DataFlow AI",
    logo: null,
    industry: "Artificial Intelligence",
    employeeCount: "100-500",
    jobOpenings: 18,
    location: "Boston, MA",
    isVerified: true,
    description: "Pioneering AI solutions for healthcare, finance, and enterprise automation.",
  },
  {
    id: "6",
    name: "GreenTech Solutions",
    logo: null,
    industry: "Clean Energy",
    employeeCount: "500-1,000",
    jobOpenings: 15,
    location: "Denver, CO",
    isVerified: false,
    description: "Building sustainable energy solutions for a greener tomorrow.",
  },
  {
    id: "7",
    name: "HealthBridge",
    logo: null,
    industry: "Healthcare",
    employeeCount: "1,000-5,000",
    jobOpenings: 22,
    location: "Chicago, IL",
    isVerified: true,
    description: "Digital health platform connecting patients with providers seamlessly.",
  },
  {
    id: "8",
    name: "EduLearn",
    logo: null,
    industry: "Education",
    employeeCount: "200-500",
    jobOpenings: 10,
    location: "Remote",
    isVerified: false,
    description: "Online learning platform democratizing education worldwide.",
  },
  {
    id: "9",
    name: "FinServe Pro",
    logo: null,
    industry: "Finance",
    employeeCount: "5,000-10,000",
    jobOpenings: 40,
    location: "New York, NY",
    isVerified: true,
    description: "Global financial services firm specializing in investment management.",
  },
];

const industries = ["Technology", "FinTech", "Design", "Cloud Computing", "Artificial Intelligence", "Clean Energy", "Healthcare", "Education", "Finance"];
const sizes = ["1-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"];
const locations = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Remote", "Chicago, IL", "Boston, MA", "Denver, CO"];

export default function CompaniesPage() {
  const [search, setSearch] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("name");
  const [page, setPage] = React.useState(1);

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry =
      selectedIndustries.length === 0 || selectedIndustries.includes(company.industry);
    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(company.location);
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "jobs":
        return b.jobOpenings - a.jobOpenings;
      case "newest":
        return 0;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const activeFilterCount = selectedIndustries.length + selectedSizes.length + selectedLocations.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="border-b bg-background py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">
              Top Companies
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover {filteredCompanies.length} amazing companies hiring now
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge size="sm">{activeFilterCount}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
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
                          setSelectedIndustries([]);
                          setSelectedSizes([]);
                          setSelectedLocations([]);
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">Industry</h4>
                    <div className="space-y-2">
                      {industries.map((industry) => (
                        <label key={industry} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedIndustries.includes(industry)}
                            onChange={() =>
                              setSelectedIndustries((prev) =>
                                prev.includes(industry)
                                  ? prev.filter((i) => i !== industry)
                                  : [...prev, industry]
                              )
                            }
                            className="h-4 w-4 rounded border-input"
                          />
                          {industry}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">Company Size</h4>
                    <div className="space-y-2">
                      {sizes.map((size) => (
                        <label key={size} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() =>
                              setSelectedSizes((prev) =>
                                prev.includes(size)
                                  ? prev.filter((s) => s !== size)
                                  : [...prev, size]
                              )
                            }
                            className="h-4 w-4 rounded border-input"
                          />
                          {size} employees
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">Location</h4>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <label key={location} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() =>
                              setSelectedLocations((prev) =>
                                prev.includes(location)
                                  ? prev.filter((l) => l !== location)
                                  : [...prev, location]
                              )
                            }
                            className="h-4 w-4 rounded border-input"
                          />
                          {location}
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {sortedCompanies.length} companies
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-8 rounded-lg border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="jobs">Most Jobs</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {(selectedIndustries.length > 0 || selectedSizes.length > 0 || selectedLocations.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedIndustries.map((industry) => (
                    <Badge key={industry} variant="secondary" size="sm">
                      {industry}
                      <button
                        onClick={() =>
                          setSelectedIndustries((prev) => prev.filter((i) => i !== industry))
                        }
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedSizes.map((size) => (
                    <Badge key={size} variant="secondary" size="sm">
                      {size}
                      <button
                        onClick={() =>
                          setSelectedSizes((prev) => prev.filter((s) => s !== size))
                        }
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedLocations.map((location) => (
                    <Badge key={location} variant="secondary" size="sm">
                      {location}
                      <button
                        onClick={() =>
                          setSelectedLocations((prev) => prev.filter((l) => l !== location))
                        }
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCompanies.map((company) => (
                  <Link key={company.id} href={`/companies/${company.id}`}>
                    <CompanyCard company={company} />
                  </Link>
                ))}
              </div>

              {sortedCompanies.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
                  <Building2 className="h-12 w-12 text-muted-foreground/40" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    No companies found matching your criteria
                  </p>
                </div>
              )}

              <Pagination
                currentPage={page}
                totalPages={3}
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
