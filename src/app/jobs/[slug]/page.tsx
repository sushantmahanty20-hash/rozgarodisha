import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Building2,
  Share2,
  Bookmark,
  ExternalLink,
  Users,
  Globe,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");
  return {
    title: title + " | JobSphere",
    description: "Apply for " + title + " on JobSphere. Find your dream job today.",
  };
}

const jobData = {
  title: "Senior React Developer",
  company: "TechCorp Inc.",
  location: "Remote (US)",
  salary: "$120,000 - $160,000",
  type: "Full-time",
  mode: "Remote",
  posted: "2 days ago",
  deadline: "Feb 15, 2026",
  applicants: 45,
  views: 1230,
  description:
    "We are looking for a Senior React Developer to join our growing engineering team. You will be responsible for building and maintaining our customer-facing web applications using React, TypeScript, and modern frontend tooling. This role offers the opportunity to work on complex, scalable applications that serve millions of users. You will collaborate closely with product managers, designers, and backend engineers to deliver exceptional user experiences.",
  requirements: [
    "5+ years of experience with React and modern JavaScript",
    "Strong proficiency in TypeScript",
    "Experience with state management (Redux, Zustand, or similar)",
    "Familiarity with RESTful APIs and GraphQL",
    "Experience with testing frameworks (Jest, React Testing Library)",
    "Strong understanding of web performance optimization",
    "Excellent communication and collaboration skills",
  ],
  responsibilities: [
    "Build and maintain customer-facing web applications",
    "Collaborate with product and design teams to implement new features",
    "Write clean, maintainable, and well-tested code",
    "Participate in code reviews and provide constructive feedback",
    "Mentor junior developers and contribute to team growth",
    "Optimize application performance and user experience",
  ],
  benefits: [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Unlimited PTO",
    "Remote-first culture",
    "Annual learning budget",
    "Home office stipend",
  ],
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
};

export default async function JobDetailPage() {
  const job = jobData;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                      {job.company[0]}
                    </div>
                    <div className="flex-1">
                      <h1 className="font-display text-xl font-bold sm:text-2xl">
                        {job.title}
                      </h1>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">{job.type}</Badge>
                        <Badge variant="secondary" size="sm">{job.mode}</Badge>
                        <Badge variant="success" size="sm">{job.salary}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Posted {job.posted}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {job.applicants} applicants
                    </span>
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-6 p-6">
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">About the Role</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">Responsibilities</h2>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">Benefits</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary" size="md">{benefit}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="space-y-4 p-6">
                  <Button className="w-full" size="lg">Apply Now</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Bookmark className="h-4 w-4" /> Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="font-medium">About {job.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      A leading technology company building the future of enterprise software.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      <span>techcorp.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>201-500 employees</span>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      <ExternalLink className="h-4 w-4" /> View Company
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Required Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-lg font-semibold">Similar Jobs</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="transition-all hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      T
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">Full Stack Developer</h3>
                    <p className="text-xs text-muted-foreground">TechCompany Inc.</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Remote
                      </span>
                      <span>$100K-$140K</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
