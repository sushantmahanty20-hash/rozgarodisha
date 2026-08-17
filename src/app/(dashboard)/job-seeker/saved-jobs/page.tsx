"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, MapPin, Clock, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const savedJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$120K - $160K",
    type: "Full-time",
    savedDate: "Jan 12, 2026",
    posted: "2h ago",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$110K - $140K",
    type: "Full-time",
    savedDate: "Jan 10, 2026",
    posted: "1d ago",
  },
  {
    id: "3",
    title: "Frontend Lead",
    company: "DesignStudio",
    location: "San Francisco, CA",
    salary: "$130K - $170K",
    type: "Full-time",
    savedDate: "Jan 8, 2026",
    posted: "3d ago",
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "CloudNine",
    location: "Austin, TX",
    salary: "$90K - $120K",
    type: "Contract",
    savedDate: "Jan 5, 2026",
    posted: "5d ago",
  },
];

export default function SavedJobsPage() {
  const [jobs, setJobs] = React.useState(savedJobs);

  function handleRemove(id: string) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast.success("Removed from saved jobs");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Saved Jobs</h1>
        <p className="text-muted-foreground">
          Jobs you&apos;ve bookmarked for later
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Bookmark className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-sm text-muted-foreground">
              No saved jobs yet. Browse jobs and save the ones you like.
            </p>
            <Link href="/jobs">
              <Button className="mt-4">Browse Jobs</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {job.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-sm font-semibold hover:text-primary hover:underline"
                    >
                      {job.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{job.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span>{job.salary}</span>
                      <Badge variant="secondary" size="sm">
                        {job.type}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Saved {job.savedDate} &middot; Posted {job.posted}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/jobs/${job.id}`}>
                      <Button size="sm">Apply</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleRemove(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
