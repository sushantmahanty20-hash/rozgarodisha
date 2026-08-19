"use client";

import * as React from "react";
import {
  Search,
  MoreHorizontal,
  UserX,
  Mail,
  Shield,
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

const mockUsers = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", role: "Job Seeker", status: "ACTIVE", joined: "Jan 12, 2026" },
  { id: "2", name: "James Wilson", email: "james@techcorp.com", role: "Employer", status: "ACTIVE", joined: "Jan 10, 2026" },
  { id: "3", name: "Maria Garcia", email: "maria@example.com", role: "Job Seeker", status: "SUSPENDED", joined: "Jan 8, 2026" },
  { id: "4", name: "Alex Kumar", email: "alex@startup.io", role: "Employer", status: "ACTIVE", joined: "Jan 5, 2026" },
  { id: "5", name: "Emily Johnson", email: "emily@example.com", role: "Job Seeker", status: "ACTIVE", joined: "Jan 3, 2026" },
  { id: "6", name: "David Park", email: "david@bigco.com", role: "Employer", status: "PENDING", joined: "Dec 28, 2025" },
  { id: "7", name: "Lisa Anderson", email: "lisa@example.com", role: "Job Seeker", status: "BANNED", joined: "Dec 25, 2025" },
  { id: "8", name: "Tom Brown", email: "tom@agency.com", role: "Recruiter", status: "ACTIVE", joined: "Dec 20, 2025" },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "info"> = {
  ACTIVE: "success",
  SUSPENDED: "warning",
  BANNED: "destructive",
  PENDING: "info",
};

export default function AdminUsersPage() {
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  function toggleSelectAll() {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  }

  function toggleUser(id: string) {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage all platform users
          </p>
        </div>
        <Button variant="outline">
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
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-10 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Roles</option>
                <option value="job seeker">Job Seekers</option>
                <option value="employer">Employers</option>
                <option value="recruiter">Recruiters</option>
              </select>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-primary/5 p-3">
              <span className="text-sm font-medium">
                {selectedUsers.length} selected
              </span>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4" />
                Change Role
              </Button>
              <Button variant="destructive" size="sm">
                <UserX className="h-4 w-4" />
                Ban
              </Button>
            </div>
          )}

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-input"
                    />
                  </th>
                  <th className="pb-3 pr-4 font-medium">User</th>
                  <th className="pb-3 pr-4 font-medium">Role</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Joined</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-4 pr-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="h-4 w-4 rounded border-input"
                      />
                    </td>
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
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={5}
              onPageChange={setPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
