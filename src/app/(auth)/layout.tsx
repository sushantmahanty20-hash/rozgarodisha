"use client";

import Link from "next/link";
import { Briefcase, Sparkles, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Get matched with jobs that fit your skills perfectly",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared",
  },
  {
    icon: Zap,
    title: "Instant Applications",
    description: "Apply to multiple jobs with a single click",
  },
  {
    icon: Briefcase,
    title: "Top Employers",
    description: "Connect with Fortune 500 companies and startups",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left: Decorative Panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent lg:flex lg:flex-col lg:justify-center lg:px-12 xl:px-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          <Link href="/" className="mb-12 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-white">
              JobSphere
            </span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-white xl:text-4xl">
            Your next career move starts here
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/80">
            Join thousands of professionals who found their dream jobs through
            our AI-powered platform.
          </p>

          <div className="mt-12 space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{feature.title}</h3>
                  <p className="text-sm text-white/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-white/60">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-primary bg-white/20"
                />
              ))}
            </div>
            <span>
              <strong className="text-white">10,000+</strong> professionals
              joined this month
            </span>
          </div>
        </div>
      </div>

      {/* Right: Auth Form Area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-4 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-lg font-bold">JobSphere</span>
          </Link>
        </div>

        {/* Form content */}
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
