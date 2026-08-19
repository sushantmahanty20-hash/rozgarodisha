import { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  Users,
  Heart,
  Lightbulb,
  Shield,
  TrendingUp,
  Globe,
  Award,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JobSphere's mission to revolutionize the job market with AI-powered matching and smart career tools.",
};

const stats = [
  { label: "Job Seekers", value: "100K+", icon: Users },
  { label: "Companies", value: "5,000+", icon: Target },
  { label: "Jobs Placed", value: "50K+", icon: TrendingUp },
  { label: "Countries", value: "30+", icon: Globe },
];

const values = [
  {
    title: "Innovation",
    description: "We leverage cutting-edge AI technology to transform how people find and land their dream jobs.",
    icon: Lightbulb,
  },
  {
    title: "Transparency",
    description: "We believe in honest, open communication with our users and team members.",
    icon: Shield,
  },
  {
    title: "Inclusivity",
    description: "Everyone deserves equal access to career opportunities regardless of background.",
    icon: Heart,
  },
  {
    title: "Excellence",
    description: "We strive for the highest quality in everything we build and deliver.",
    icon: Award,
  },
];

const teamMembers = [
  { name: "Alex Chen", role: "CEO & Co-Founder", bio: "Former VP of Engineering at TechCorp. 15+ years in tech." },
  { name: "Sarah Kim", role: "CTO & Co-Founder", bio: "AI researcher turned entrepreneur. PhD in Computer Science." },
  { name: "Michael Torres", role: "Head of Product", bio: "Previously led product at LinkedIn. Passionate about UX." },
  { name: "Emily Zhang", role: "Head of Engineering", bio: "Full-stack engineer. Built systems serving millions." },
  { name: "David Park", role: "Head of Design", bio: "Award-winning designer. Former lead at Figma." },
  { name: "Lisa Johnson", role: "Head of Marketing", bio: "Growth marketing expert. Scaled multiple startups." },
];

const timeline = [
  { year: "2020", title: "Founded", description: "JobSphere was founded with a vision to revolutionize job searching with AI." },
  { year: "2021", title: "Seed Round", description: "Raised $2M seed funding and launched beta with 100 companies." },
  { year: "2022", title: "Series A", description: "Raised $15M Series A. Reached 50K job seekers and 500 companies." },
  { year: "2023", title: "AI Launch", description: "Launched AI-powered resume scoring and job matching features." },
  { year: "2024", title: "Global Expansion", description: "Expanded to 30+ countries. Crossed 100K job seekers." },
  { year: "2025", title: "Enterprise", description: "Launched enterprise ATS integration and team management features." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Hero */}
        <div className="border-b bg-background py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Badge variant="secondary" className="mb-4">
              About Us
            </Badge>
            <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Connecting talent with opportunity
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re on a mission to make job searching smarter, faster, and more equitable
              through the power of artificial intelligence.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} variant="elevated">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold">Our Mission</h2>
                  <p className="mt-3 text-muted-foreground">
                    To democratize access to career opportunities by building intelligent tools
                    that connect the right talent with the right roles. We believe everyone
                    deserves a fair chance at their dream job.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold">Our Vision</h2>
                  <p className="mt-3 text-muted-foreground">
                    To become the world&apos;s most intelligent job platform where AI eliminates
                    bias, reduces hiring friction, and creates meaningful connections between
                    employers and candidates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-center">Our Values</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-center">Meet Our Team</h2>
            <p className="mt-2 text-center text-muted-foreground">
              The passionate people behind JobSphere
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.name}>
                  <CardContent className="p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-center">Our Journey</h2>
            <div className="mt-8 space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.year.slice(2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm text-primary font-medium">{item.year}</p>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t bg-background py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Join us in shaping the future of work
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;re always looking for talented people who share our passion.
            </p>
            <Link href="/jobs">
              <button className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <Zap className="h-4 w-4" />
                View Open Positions
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
