"use client"

import { create } from "zustand"

type UserManagementView =
  | "all"
  | "job-seekers"
  | "employers"
  | "recruiters"
  | "admin-users"

type JobsManagementView = "all" | "pending" | "active" | "reported"

type CompaniesManagementView =
  | "all"
  | "pending-verification"
  | "recruiter-agencies"

type AdminView =
  | { section: "user-management"; value: UserManagementView }
  | { section: "jobs-management"; value: JobsManagementView }
  | { section: "companies"; value: CompaniesManagementView }

interface AdminViewState {
  view: AdminView
  setView: (view: AdminView) => void
}

export const useAdminView = create<AdminViewState>()((set) => ({
  view: { section: "user-management", value: "all" },
  setView: (view: AdminView) => set({ view }),
}))

// Map a view to its URL query string (relative to the current pathname)
export function viewToQuery(view: AdminView): string {
  const params = new URLSearchParams()
  if (view.section === "user-management") {
    params.set("section", "user-management")
    const map: Record<UserManagementView, string> = {
      all: "",
      "job-seekers": "JOB_SEEKER",
      employers: "EMPLOYER",
      recruiters: "RECRUITER",
      "admin-users": "ADMIN",
    }
    if (map[view.value]) params.set("role", map[view.value])
  } else if (view.section === "jobs-management") {
    params.set("section", "jobs-management")
    const map: Record<JobsManagementView, string> = {
      all: "",
      pending: "PENDING",
      active: "ACTIVE",
      reported: "REPORTED",
    }
    if (map[view.value]) params.set("status", map[view.value])
  } else if (view.section === "companies") {
    params.set("section", "companies")
    const map: Record<CompaniesManagementView, string> = {
      all: "",
      "pending-verification": "PENDING",
      "recruiter-agencies": "",
    }
    if (map[view.value]) params.set("status", map[view.value])
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

// Parse a view from URL search params (single source of truth on refresh / back / deep-link)
export function viewFromParams(searchParams: URLSearchParams): AdminView {
  const section = searchParams.get("section") || "user-management"
  if (section === "jobs-management") {
    const status = (searchParams.get("status") || "all").toLowerCase()
    const value: JobsManagementView = ["pending", "active", "reported"].includes(status)
      ? (status as JobsManagementView)
      : "all"
    return { section: "jobs-management", value }
  }
  if (section === "companies") {
    const status = (searchParams.get("status") || "all").toLowerCase()
    const value: CompaniesManagementView = status === "pending" || status === "pending-verification"
      ? "pending-verification"
      : "all"
    return { section: "companies", value }
  }
  const role = (searchParams.get("role") || "all").toLowerCase()
  const value: UserManagementView =
    role === "job_seeker" || role === "job-seeker" || role === "jobseeker"
      ? "job-seekers"
      : role === "employer"
        ? "employers"
        : role === "recruiter"
          ? "recruiters"
          : role === "admin"
            ? "admin-users"
            : "all"
  return { section: "user-management", value }
}

export type {
  AdminView,
  UserManagementView,
  JobsManagementView,
  CompaniesManagementView,
}