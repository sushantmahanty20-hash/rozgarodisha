"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const upcomingInterviews = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    date: "Jan 22, 2026",
    time: "10:00 AM",
    type: "Video",
    interviewer: "Alex Chen, CTO",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    date: "Jan 25, 2026",
    time: "2:00 PM",
    type: "On-site",
    interviewer: "Sarah Kim, Engineering Manager",
    location: "456 Tech Ave, New York, NY",
  },
  {
    id: "3",
    title: "Product Manager",
    company: "DataFlow AI",
    date: "Jan 28, 2026",
    time: "11:00 AM",
    type: "Video",
    interviewer: "David Park, VP Product",
    meetingLink: "https://zoom.us/j/123456789",
  },
];

const pastInterviews = [
  {
    id: "4",
    title: "UX Designer",
    company: "CloudNine",
    date: "Jan 10, 2026",
    time: "3:00 PM",
    type: "Video",
    status: "passed",
    feedback: "Great portfolio discussion. Moving to next round.",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "TechCorp Inc.",
    date: "Jan 5, 2026",
    time: "10:00 AM",
    type: "On-site",
    status: "passed",
    feedback: "Strong technical skills. Cultural fit assessment next.",
  },
  {
    id: "6",
    title: "Frontend Developer",
    company: "DesignStudio",
    date: "Dec 28, 2025",
    time: "1:00 PM",
    type: "Video",
    status: "rejected",
    feedback: "Looking for more experience with design systems.",
  },
];

const statusConfig = {
  upcoming: { label: "Upcoming", variant: "info" as const, icon: AlertCircle },
  passed: { label: "Passed", variant: "success" as const, icon: CheckCircle2 },
  rejected: { label: "Not Selected", variant: "destructive" as const, icon: XCircle },
};

export default function InterviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">My Interviews</h1>
        <p className="text-muted-foreground">
          Track and manage your upcoming and past interviews
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingInterviews.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastInterviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {upcomingInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {interview.type === "Video" ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{interview.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {interview.company}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {interview.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {interview.time}
                        </span>
                        <Badge variant="secondary" size="sm">
                          {interview.type}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Interviewer: {interview.interviewer}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    {interview.type === "Video" && (
                      <Button variant="gradient" size="sm">
                        <Video className="h-4 w-4" />
                        Join Meeting
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {upcomingInterviews.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
              <Calendar className="h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">
                No upcoming interviews
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6 space-y-4">
          {pastInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    {interview.type === "Video" ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{interview.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {interview.company}
                        </p>
                      </div>
                      <Badge variant={statusConfig[interview.status as keyof typeof statusConfig].variant} size="sm">
                        {statusConfig[interview.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {interview.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {interview.time}
                      </span>
                    </div>
                    {interview.feedback && (
                      <p className="mt-2 text-sm text-muted-foreground italic">
                        &quot;{interview.feedback}&quot;
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
