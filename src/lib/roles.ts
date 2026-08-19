export type PanelRole = "admin" | "employer" | "jobseeker" | "recruiter";

const ROLE_LABELS: Record<PanelRole, string> = {
  admin: "Super Admin",
  employer: "Employer",
  recruiter: "Recruiter",
  jobseeker: "Job Seeker",
};

export function normalizeRole(role?: string | null): PanelRole {
  switch (role) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return "admin";
    case "EMPLOYER":
    case "HR_MANAGER":
      return "employer";
    case "RECRUITER":
      return "recruiter";
    case "JOB_SEEKER":
      return "jobseeker";
    default:
      return "jobseeker";
  }
}

export function roleLabel(role?: string | null): string {
  return ROLE_LABELS[normalizeRole(role)];
}

export function panelHrefForRole(role?: string | null): string {
  switch (normalizeRole(role)) {
    case "admin":
      return "/admin";
    case "employer":
    case "recruiter":
      return "/employer";
    default:
      return "/job-seeker";
  }
}