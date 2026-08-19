import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JobPortal - Connecting Talent with Opportunity",
    template: "%s | JobPortal",
  },
  description:
    "Discover your dream career with AI-powered job matching, smart resume scoring, and personalized recommendations. Connect with top employers worldwide through India's leading career marketplace.",
  keywords: [
    "jobs",
    "career",
    "employment",
    "job portal",
    "AI job matching",
    "resume builder",
    "hiring",
    "recruitment",
    "job search",
    "remote jobs",
    "India jobs",
    "tech jobs",
    "Bengaluru jobs",
    "Mumbai jobs",
  ],
  authors: [{ name: "JobPortal" }],
  creator: "JobPortal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jobportal.com",
    siteName: "JobPortal",
    title: "JobPortal - Connecting Talent with Opportunity",
    description:
      "India's premier career marketplace. Find your dream job or hire the best talent with our AI-powered platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobPortal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobPortal - Connecting Talent with Opportunity",
    description:
      "India's premier career marketplace connecting talented professionals with top employers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JobPortal",
  url: "https://jobportal.com",
  logo: "https://jobportal.com/logo.png",
  description:
    "India's premier career marketplace connecting talented professionals with top employers worldwide.",
  sameAs: [
    "https://twitter.com/jobportal",
    "https://linkedin.com/company/jobportal",
    "https://facebook.com/jobportal",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@jobportal.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
