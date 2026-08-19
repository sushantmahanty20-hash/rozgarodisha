import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { panelHrefForRole } from "@/lib/roles";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = token.role as string;
    const home = panelHrefForRole(role);

    if (pathname.startsWith("/admin")) {
      if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL(home, req.url));
      }
    }

    if (pathname.startsWith("/employer")) {
      if (
        role !== "EMPLOYER" &&
        role !== "RECRUITER" &&
        role !== "HR_MANAGER" &&
        role !== "ADMIN" &&
        role !== "SUPER_ADMIN"
      ) {
        return NextResponse.redirect(new URL(home, req.url));
      }
    }

    if (pathname.startsWith("/recruiter")) {
      if (role !== "RECRUITER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL(home, req.url));
      }
    }

    if (pathname.startsWith("/job-seeker")) {
      if (role !== "JOB_SEEKER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL(home, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/employer/:path*",
    "/admin/:path*",
    "/recruiter/:path*",
    "/job-seeker/:path*",
    "/api/jobs/:path*",
    "/api/users/:path*",
    "/api/companies/:path*",
    "/api/applications/:path*",
    "/api/ai/:path*",
    "/api/recruiters/:path*",
  ],
};
