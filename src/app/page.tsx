import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  title: "JobPortal - Connecting Talent with Opportunity",
  description:
    "India's premier career marketplace. Find your dream job or hire the best talent with our AI-powered platform.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 overflow-hidden">
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
      <Footer />
    </div>
  );
}
