"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Building2, Users, FileText, Search, Send,
  Phone, BadgeCheck, DollarSign, BarChart3, UserCog, CreditCard, Settings,
  Bell, MessageSquare, LogOut, Menu, Briefcase, ChevronDown, Plus, Landmark,
  ShieldCheck, Star, TrendingUp, FileSpreadsheet, GitBranch, Crown, ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type NavItem = { label: string; href: string; icon: LucideIcon; badge?: string | number };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  { title: "Overview", items: [{ label: "Dashboard", href: "/recruiter", icon: LayoutDashboard }] },
  {
    title: "My Agency",
    items: [
      { label: "Agency Profile", href: "/recruiter/agency", icon: Building2 },
      { label: "Verification", href: "/recruiter/agency?tab=verification", icon: ShieldCheck },
      { label: "Team Members", href: "/recruiter/team", icon: UserCog },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Client Companies", href: "/recruiter/clients", icon: Landmark },
      { label: "Add Client", href: "/recruiter/clients/new", icon: Plus },
      { label: "Client Requirements", href: "/recruiter/requirements", icon: FileText },
    ],
  },
  {
    title: "Recruitment",
    items: [
      { label: "Job Requirements", href: "/recruiter/requirements", icon: Briefcase },
      { label: "Candidate Search", href: "/recruiter/candidates", icon: Search },
      { label: "Candidate Database", href: "/recruiter/candidates", icon: Users },
      { label: "Add Candidate", href: "/recruiter/candidates/new", icon: Plus },
      { label: "Candidate Submissions", href: "/recruiter/submissions", icon: Send },
      { label: "Pipeline Board", href: "/recruiter/pipeline", icon: GitBranch },
      { label: "Interviews", href: "/recruiter/interviews", icon: Phone },
      { label: "Offers", href: "/recruiter/offers", icon: BadgeCheck },
      { label: "Placements", href: "/recruiter/placements", icon: Star },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/recruiter/messages", icon: MessageSquare },
      { label: "Notifications", href: "/recruiter/notifications", icon: Bell, badge: 3 },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Fees & Revenue", href: "/recruiter/revenue", icon: DollarSign },
      { label: "Invoices", href: "/recruiter/revenue?tab=invoices", icon: FileSpreadsheet },
      { label: "Reports", href: "/recruiter/reports", icon: TrendingUp },
      { label: "Analytics", href: "/recruiter/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Team & Account",
    items: [
      { label: "Subscription", href: "/recruiter/subscription", icon: CreditCard },
      { label: "Settings", href: "/recruiter/settings", icon: Settings },
    ],
  },
];

export interface RecruiterUser {
  name: string;
  email: string;
  agencyName: string;
  agencySlug: string;
  logo?: string;
  verified: boolean;
  verificationStatus: string;
  plan?: string;
  avatar?: string;
}

export function RecruiterLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: RecruiterUser;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const sidebar = (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/10 bg-[#0b1220] text-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[264px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <Link href="/recruiter" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] shadow-lg shadow-[#2563eb]/30">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-lg font-extrabold text-transparent leading-tight">
                JobPortal
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-[#64748b]">
                Recruiter Suite
              </p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-white/10 lg:flex"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-5 px-3">
          {NAV.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const base = item.href.split("?")[0];
                  const isActive =
                    pathname === base || (pathname.startsWith(base) && base !== "/recruiter");
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                        isActive
                          ? "bg-[#2563eb]/15 text-[#60a5fa]"
                          : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                          isActive
                            ? "bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/30"
                            : "bg-white/5 text-[#64748b] group-hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-[#06b6d4]/20 px-2 py-0.5 text-[10px] font-bold text-[#22d3ee]">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="px-3 pb-2">
          <Link href="/"
            className="flex items-center gap-3 rounded-lg border border-dashed border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-2 text-[13px] font-medium text-[#60a5fa] transition-colors hover:bg-[#2563eb]/10">
            <ExternalLink className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">Visit Website</span>
          </Link>
        </div>
      )}

      {user && (
        <div className="border-t border-white/10 p-3">
          <div className={cn("flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5", collapsed && "justify-center px-0")}>
            <Avatar size="sm">
              <AvatarImage src={user.logo ?? user.avatar} alt={user.agencyName} />
              <AvatarFallback className="bg-[#2563eb] text-white">
                {user.agencyName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold">{user.agencyName}</p>
                  <div className="flex items-center gap-1.5">
                    {user.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#22d3ee]">
                        <BadgeCheck className="h-3 w-3" /> Verified Recruiter
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-amber-400">
                        {user.verificationStatus}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6fb] dark:bg-[#0a0a0f]">
      <div className="hidden lg:block">{sidebar}</div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">{sidebar}</div>
        </>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[#e2e8f0] bg-white/80 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748b] hover:bg-[#f1f5f9] dark:hover:bg-white/5 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span className="text-xs">Search candidates, clients, requirements...</span>
          </div>

          <div className="flex-1" />

          <Link
            href="/recruiter/clients/new"
            className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-4 py-2 text-sm font-medium text-white shadow-md shadow-[#2563eb]/25 sm:flex"
          >
            <Plus className="h-4 w-4" /> Quick Add
          </Link>

          <Link
            href="/recruiter/notifications"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748b] hover:bg-[#f1f5f9] dark:hover:bg-white/5"
          >
            <Bell className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/recruiter/messages"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748b] hover:bg-[#f1f5f9] dark:hover:bg-white/5"
          >
            <MessageSquare className="h-[18px] w-[18px]" />
          </Link>

          <div className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-background px-3 py-1.5 dark:border-white/10">
            <Avatar size="sm">
              <AvatarImage src={user?.logo ?? user?.avatar} alt={user?.agencyName} />
              <AvatarFallback className="bg-[#2563eb] text-white">
                {user?.agencyName?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "RA"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold leading-none text-[#0f172a] dark:text-white">
                {user?.agencyName || "Agency"}
              </p>
              <div className="mt-0.5 flex items-center gap-1">
                {user?.verified ? (
                  <Badge className="gap-0.5 bg-cyan-500/10 text-[10px] font-semibold text-cyan-600 dark:text-cyan-400">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </Badge>
                ) : (
                  <Badge className="text-[10px] font-semibold text-amber-600">{user?.verificationStatus || "Pending"}</Badge>
                )}
                {user?.plan && (
                  <Badge className="gap-0.5 bg-violet-500/10 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                    <Crown className="h-3 w-3" /> {user.plan}
                  </Badge>
                )}
              </div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-[#94a3b8] sm:block" />
          </div>

          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-background px-3 py-2 text-sm font-medium text-[#2563eb] hover:bg-[#f1f5f9] sm:flex dark:border-white/10"
          >
            <ExternalLink className="h-4 w-4" /> Visit Website
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748b] hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}