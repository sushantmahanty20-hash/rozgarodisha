"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MoreHorizontal,
  UserX,
  Mail,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useAdminView,
  viewFromParams,
  viewToQuery,
  type UserManagementView,
  type AdminView,
} from "@/store/use-admin-view";

const mockUsers = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", role: "Job Seeker", status: "ACTIVE", joined: "Jan 12, 2026" },
  { id: "2", name: "James Wilson", email: "james@techcorp.com", role: "Employer", status: "ACTIVE", joined: "Jan 10, 2026" },
  { id: "3", name: "Maria Garcia", email: "maria@example.com", role: "Job Seeker", status: "SUSPENDED", joined: "Jan 8, 2026" },
  { id: "4", name: "Alex Kumar", email: "alex@startup.io", role: "Employer", status: "ACTIVE", joined: "Jan 5, 2026" },
  { id: "5", name: "Emily Johnson", email: "emily@example.com", role: "Job Seeker", status: "ACTIVE", joined: "Jan 3, 2026" },
  { id: "6", name: "David Park", email: "david@bigco.com", role: "Employer", status: "PENDING", joined: "Dec 28, 2025" },
  { id: "7", name: "Lisa Anderson", email: "lisa@example.com", role: "Job Seeker", status: "BANNED", joined: "Dec 25, 2025" },
  { id: "8", name: "Tom Brown", email: "tom@agency.com", role: "Recruiter", status: "ACTIVE", joined: "Dec 20, 2025" },
  { id: "9", name: "Nina Kapoor", email: "nina@admin.jobportal.com", role: "Admin", status: "ACTIVE", joined: "Dec 15, 2025" },
  { id: "10", name: "Omar Farouk", email: "omar@admin.jobportal.com", role: "Admin", status: "ACTIVE", joined: "Nov 30, 2025" },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "info"> = {
  ACTIVE: "success",
  SUSPENDED: "warning",
  BANNED: "destructive",
  PENDING: "info",
};

const viewMeta: Record<
  UserManagementView,
  { title: string; subtitle: string; dropdownLabel: string }
> = {
  all: { title: "User Management", subtitle: "Manage all platform users", dropdownLabel: "All Roles" },
  "job-seekers": { title: "Job Seekers", subtitle: "Manage registered job seekers", dropdownLabel: "Job Seekers" },
  employers: { title: "Employers", subtitle: "Manage employer accounts", dropdownLabel: "Employers" },
  recruiters: { title: "Recruiters", subtitle: "Manage recruitment consultants and agencies", dropdownLabel: "Recruiters" },
  "admin-users": { title: "Admin Users", subtitle: "Manage administrative accounts", dropdownLabel: "Admin Users" },
};

const roleFromView: Record<UserManagementView, string | null> = {
  all: null,
  "job-seekers": "Job Seeker",
  employers: "Employer",
  recruiters: "Recruiter",
  "admin-users": "Admin",
};

export default function AdminUsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = useAdminView((s) => s.view);
  const setView = useAdminView((s) => s.setView);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  // Single source of truth: sync store from URL (refresh / back / deep-link / sidebar click)
  React.useEffect(() => {
    const parsed = viewFromParams(searchParams);
    if (parsed.section === "user-management") setView(parsed);
  }, [searchParams, setView]);

  const meta =
    view.section === "user-management"
      ? viewMeta[view.value]
      : viewMeta.all;

  const roleFilter = view.section === "user-management" ? view.value : "all";

  const changeView = (value: UserManagementView) => {
    const next: AdminView = { section: "user-management", value };
    setView(next); // updates store immediately -> sidebar highlights
    router.push(`/admin/users${viewToQuery(next)}`); // updates URL + history
    setPage(1);
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const requiredRole = roleFromView[roleFilter];
    const matchesRole = requiredRole === null || user.role === requiredRole;
    return matchesSearch && matchesRole;
  });

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const pagedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  const emptyMessages: Record<UserManagementView, { title: string; description: string }> = {
    all: { title: "No Users Found", description: "No platform users match your search." },
    "job-seekers": { title: "No Job Seekers Found", description: "No registered job seekers match your search." },
    employers: { title: "No Employers Found", description: "No employer accounts match your search." },
    recruiters: { title: "No Recruiters Found", description: "No recruitment consultants or agencies match your search." },
    "admin-users": { title: "No Admin Users Found", description: "No administrative accounts match your search." },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">{meta.title}</h1>
          <p className="text-muted-foreground">{meta.subtitle}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            const csv = filteredUsers.map((u) => [u.name, u.email, u.role, u.status].join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${meta.title.replace(/\s+/g, "-").toLowerCase()}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search ${meta.title.toLowerCase()} by name or email...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => changeView(e.target.value as UserManagementView)}
              className="h-10 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Roles</option>
              <option value="job-seekers">Job Seekers</option>
              <option value="employers">Employers</option>
              <option value="recruiters">Recruiters</option>
              <option value="admin-users">Admin Users</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            {pagedUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-semibold">{emptyMessages[roleFilter].title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{emptyMessages[roleFilter].description}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">User</th>
                    <th className="pb-3 pr-4 font-medium">Role</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Joined</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="secondary" size="sm">{user.role}</Badge>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant={statusColors[user.status]} size="sm">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4 text-sm text-muted-foreground">
                        {user.joined}
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}