"use client";

import * as React from "react";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/payment/pricing-card";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const faqItems = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start. You can cancel anytime during the trial period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual Enterprise plans.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer: "The Enterprise plan includes everything in Professional plus dedicated account management, custom integrations, SSO, SLA guarantees, and priority phone support.",
  },
];

const comparisonFeatures = [
  { name: "Job Applications", free: "5/month", starter: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "AI Resume Scoring", free: false, starter: true, pro: true, enterprise: true },
  { name: "Resume Builder", free: "Basic", starter: "Advanced", pro: "Advanced", enterprise: "Custom" },
  { name: "Job Alerts", free: true, starter: true, pro: true, enterprise: true },
  { name: "Priority Support", free: false, starter: false, pro: true, enterprise: true },
  { name: "Analytics Dashboard", free: false, starter: "Basic", pro: "Advanced", enterprise: "Custom" },
  { name: "Team Management", free: false, starter: false, pro: false, enterprise: true },
  { name: "ATS Integration", free: false, starter: false, pro: true, enterprise: true },
  { name: "Custom Branding", free: false, starter: false, pro: false, enterprise: true },
  { name: "API Access", free: false, starter: false, pro: false, enterprise: true },
  { name: "Dedicated Account Manager", free: false, starter: false, pro: false, enterprise: true },
  { name: "SSO & SAML", free: false, starter: false, pro: false, enterprise: true },
];

const plans = [
  { id: "free", name: "Free", monthlyPrice: 0 },
  { id: "starter", name: "Starter", monthlyPrice: 29 },
  { id: "professional", name: "Professional", monthlyPrice: 79 },
  { id: "enterprise", name: "Enterprise", monthlyPrice: 199 },
];

export default function PricingPage() {
  const [annual, setAnnual] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Hero Section */}
        <div className="border-b bg-background py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Badge variant="secondary" className="mb-4">
              Pricing
            </Badge>
            <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your career goals. Upgrade or downgrade at any time.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className={cn("text-sm font-medium", !annual && "text-foreground")}>
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors duration-200",
                  annual ? "bg-primary" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform",
                    annual ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
              <span className={cn("text-sm font-medium", annual && "text-foreground")}>
                Yearly
                <Badge variant="success" size="sm" className="ml-1.5">
                  Save 20%
                </Badge>
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <PricingCard onSelect={(id) => console.log("Selected:", id)} />
        </div>

        {/* Feature Comparison */}
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-center">
            Feature Comparison
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="py-3 px-4 text-center text-sm font-medium">
                      {plan.name}
                      <p className="text-xs text-muted-foreground">
                        ${annual ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice}/mo
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm">{feature.name}</td>
                    {["free", "starter", "professional", "enterprise"].map((plan) => {
                      const value = feature[plan as keyof typeof feature];
                      return (
                        <td key={plan} className="py-3 px-4 text-center">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mx-auto h-5 w-5 text-emerald-500" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="font-medium">{item.question}</span>
                  <HelpCircle
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      openFaq === index && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t bg-background py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to accelerate your career?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of professionals who found their dream jobs with JobSphere.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
