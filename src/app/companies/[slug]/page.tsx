"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Users,
  Globe,
  Calendar,
  Briefcase,
  Share2,
  Heart,
  ExternalLink,
  BadgeCheck,
  Image as ImageIcon,
  Gift,
  ChevronRight,
  Clock,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const companyData = {
  id: "1",
  name: "TechCorp Inc.",
  logo: null,
  coverImage: null,
  industry: "Technology",
  size: "1,000-5,000",
  founded: "2010",
  website: "https://techcorp.com",
  location: "San Francisco, CA",
  isVerified: true,
  isFollowing: false,
  about:
    "TechCorp Inc. is a leading enterprise software company focused on building innovative cloud solutions and AI-powered products. We serve over 10,000 businesses worldwide, helping them transform their operations through technology. Our mission is to make enterprise-grade technology accessible to businesses of all sizes.",
  benefits: [
    "Competitive salary & equity",
    "Unlimited PTO",
    "Remote-friendly culture",
    "Health, dental & vision insurance",
    "Learning & development budget",
    "Annual team retreats",
    "401(k) matching",
    "Free lunch & snacks",
  ],
  gallery: [
    { id: "1", caption: "Office headquarters" },
    { id: "2", caption: "Team building event" },
    { id: "3", caption: "Annual hackathon" },
  ],
};

const openPositions = [
  {
    id: "1",
    title: "Senior React Developer",
    location: "Remote",
    salary: "$120K - $160K",
    type: "Full-time",
    posted: "2h ago",
    applicants: 45,
  },
  {
    id: "2",
    title: "Product Manager",
    location: "San Francisco, CA",
    salary: "$110K - $140K",
    type: "Full-time",
    posted: "1d ago",
    applicants: 23,
  },
  {
    id: "3",
    title: "UX Designer",
    location: "Remote",
    salary: "$90K - $120K",
    type: "Full-time",
    posted: "3d ago",
    applicants: 18,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    location: "San Francisco, CA",
    salary: "$100K - $130K",
    type: "Full-time",
    posted: "5d ago",
    applicants: 12,
  },
];

export default function CompanyDetailPage() {
  const [following, setFollowing] = React.useState(companyData.isFollowing);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Company Header */}
          <div className="-mt-16 relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Avatar size="xl" className="ring-4 ring-background">
                <AvatarImage src={companyData.logo} alt={companyData.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary/10">
                  {companyData.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">
                    {companyData.name}
                  </h1>
                  {companyData.isVerified && (
                    <BadgeCheck className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <p className="text-muted-foreground">{companyData.industry}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-1">
              <Button
                variant={following ? "outline" : "default"}
                onClick={() => setFollowing(!following)}
              >
                <Heart className={cn("h-4 w-4", following && "fill-current")} />
                {following ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {companyData.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {companyData.size} employees
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Founded {companyData.founded}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <a
                href={companyData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                {companyData.website}
              </a>
            </span>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="positions">
              <TabsList>
                <TabsTrigger value="positions">
                  Open Positions ({openPositions.length})
                </TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="positions" className="mt-6 space-y-4">
                {openPositions.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`}>
                    <Card className="transition-colors hover:bg-muted/50">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold hover:text-primary">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5" />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {job.posted}
                              </span>
                            </div>
                          </div>
                          <Button variant="gradient" size="sm">
                            Apply
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {openPositions.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
                    <Briefcase className="h-12 w-12 text-muted-foreground/40" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      No open positions at the moment
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold">About {companyData.name}</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {companyData.about}
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border p-4 text-center">
                        <p className="text-2xl font-bold">{companyData.size}</p>
                        <p className="text-sm text-muted-foreground">Employees</p>
                      </div>
                      <div className="rounded-xl border p-4 text-center">
                        <p className="text-2xl font-bold">{companyData.founded}</p>
                        <p className="text-sm text-muted-foreground">Founded</p>
                      </div>
                      <div className="rounded-xl border p-4 text-center">
                        <p className="text-2xl font-bold">{openPositions.length}</p>
                        <p className="text-sm text-muted-foreground">Open Positions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {companyData.gallery.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                          <ImageIcon className="h-12 w-12 text-primary/30" />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{item.caption}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold">Benefits & Perks</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {companyData.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3 rounded-lg border p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Gift className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
