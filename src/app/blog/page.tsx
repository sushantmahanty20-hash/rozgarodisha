"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Tag,
  TrendingUp,
  ArrowRight,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const categories = [
  "All",
  "Career Tips",
  "Job Search",
  "Interviews",
  "Resume",
  "AI & Tech",
  "Industry News",
];

const blogPosts = [
  {
    id: "1",
    title: "10 Tips to Ace Your Next Technical Interview",
    excerpt: "Master the art of technical interviews with these proven strategies from top engineers.",
    category: "Interviews",
    author: "Sarah Kim",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "How AI is Revolutionizing Job Matching",
    excerpt: "Discover how artificial intelligence is transforming the way candidates find their perfect roles.",
    category: "AI & Tech",
    author: "Alex Chen",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "3",
    title: "Building a Standout Resume in 2026",
    excerpt: "Learn the latest resume trends and formatting tips that get you noticed by recruiters.",
    category: "Resume",
    author: "Michael Torres",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Remote Work: The Complete Guide",
    excerpt: "Everything you need to know about landing and thriving in remote positions.",
    category: "Career Tips",
    author: "Emily Zhang",
    date: "Jan 8, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "5",
    title: "Salary Negotiation Secrets You Need to Know",
    excerpt: "Negotiate your worth with confidence using these expert-backed strategies.",
    category: "Career Tips",
    author: "David Park",
    date: "Jan 5, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Top Tech Hiring Trends for 2026",
    excerpt: "Explore the emerging roles and skills in demand for the coming year.",
    category: "Industry News",
    author: "Lisa Johnson",
    date: "Jan 3, 2026",
    readTime: "4 min read",
    featured: false,
  },
];

const popularPosts = [
  { id: "1", title: "10 Tips to Ace Your Next Technical Interview", views: "12.5K" },
  { id: "3", title: "Building a Standout Resume in 2026", views: "8.2K" },
  { id: "4", title: "Remote Work: The Complete Guide", views: "6.8K" },
];

export default function BlogPage() {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Hero */}
        <div className="border-b bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              Career Advice & Insights
            </h1>
            <p className="mt-2 text-muted-foreground">
              Expert tips to help you land your dream job
            </p>
            <div className="mt-4 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              {/* Category Filters */}
              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Blog Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <Card className="group h-full transition-colors hover:bg-muted/50">
                      <CardContent className="flex flex-col p-5">
                        <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                          <Tag className="h-12 w-12 text-primary/30" />
                        </div>
                        <div className="mt-4 flex flex-1 flex-col">
                          <Badge variant="secondary" size="sm" className="w-fit">
                            {post.category}
                          </Badge>
                          <h3 className="mt-2 font-semibold group-hover:text-primary group-hover:underline">
                            {post.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
                  <Search className="h-12 w-12 text-muted-foreground/40" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    No articles found matching your search
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full shrink-0 space-y-6 lg:w-72">
              <Card>
                <CardContent className="p-5">
                  <h3 className="flex items-center gap-2 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    Popular Posts
                  </h3>
                  <div className="mt-4 space-y-3">
                    {popularPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="group">
                          <p className="text-sm font-medium group-hover:text-primary group-hover:underline">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.views} views
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h3 className="font-medium">Categories</h3>
                  <div className="mt-4 space-y-2">
                    {categories.filter((c) => c !== "All").map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {category}
                        <span className="text-xs">
                          {blogPosts.filter((p) => p.category === category).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="gradient">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Subscribe to our newsletter</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get the latest career tips delivered to your inbox.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Input placeholder="Enter your email" />
                    <Button className="w-full" size="sm">
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
