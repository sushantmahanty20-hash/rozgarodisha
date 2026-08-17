import type { Metadata } from "next";
import {
  Hero,
  Stats,
  FeaturedJobs,
  TopCompanies,
  JobCategories,
  AiFeatures,
  SalaryExplorer,
  Testimonials,
  CareerAdvice,
  Faq,
  Newsletter,
  Cta,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "JobSphere - Find Your Dream Job with AI-Powered Matching",
  description:
    "Discover thousands of job opportunities with AI-powered matching, smart resume scoring, and personalized career recommendations. Start your journey today.",
};

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Stats />
      <FeaturedJobs />
      <TopCompanies />
      <JobCategories />
      <AiFeatures />
      <SalaryExplorer />
      <Testimonials />
      <CareerAdvice />
      <Faq />
      <Newsletter />
      <Cta />
    </main>
  );
}
