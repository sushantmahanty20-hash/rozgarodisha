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
    default: "JobSphere - AI-Powered Job Portal",
    template: "%s | JobSphere",
  },
  description:
    "Discover your dream career with AI-powered job matching, smart resume scoring, and personalized recommendations. Connect with top employers worldwide.",
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
  ],
  authors: [{ name: "JobSphere" }],
  creator: "JobSphere",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jobsphere.com",
    siteName: "JobSphere",
    title: "JobSphere - AI-Powered Job Portal",
    description:
      "Discover your dream career with AI-powered job matching, smart resume scoring, and personalized recommendations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobSphere",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobSphere - AI-Powered Job Portal",
    description:
      "Discover your dream career with AI-powered job matching, smart resume scoring, and personalized recommendations.",
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
  name: "JobSphere",
  url: "https://jobsphere.com",
  logo: "https://jobsphere.com/logo.png",
  description:
    "AI-powered job portal connecting talented professionals with top employers worldwide.",
  sameAs: [
    "https://twitter.com/jobsphere",
    "https://linkedin.com/company/jobsphere",
    "https://facebook.com/jobsphere",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@jobsphere.com",
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
