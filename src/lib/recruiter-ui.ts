export const currency = (amount: number | string | null | undefined, c = "INR") => {
  const n = Number(amount) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n);
};

export const num = (n: number | null | undefined) => (n == null ? "—" : Number(n).toLocaleString("en-IN"));

export const submissionStatusStyles: Record<string, { label: string; cls: string }> = {
  SOURCED: { label: "Sourced", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  SCREENING: { label: "Screening", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" },
  SUBMITTED: { label: "Submitted", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  CLIENT_REVIEW: { label: "Client Review", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" },
  SHORTLISTED: { label: "Shortlisted", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  INTERVIEW: { label: "Interview", cls: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300" },
  SELECTED: { label: "Selected", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  OFFER: { label: "Offer", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300" },
  OFFER_ACCEPTED: { label: "Offer Accepted", cls: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
  JOINED: { label: "Joined", cls: "bg-emerald-500 text-white" },
  REJECTED: { label: "Rejected", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
  WITHDRAWN: { label: "Withdrawn", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  ON_HOLD: { label: "On Hold", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300" },
  REPLACEMENT: { label: "Replacement", cls: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300" },
};

export const requirementStatusStyles: Record<string, { label: string; cls: string }> = {
  OPEN: { label: "Open", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  ON_HOLD: { label: "On Hold", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300" },
  CLOSED: { label: "Closed", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

export const verificationStyles: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Pending", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  UNDER_REVIEW: { label: "Under Review", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  VERIFIED: { label: "Verified", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  REJECTED: { label: "Rejected", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
  SUSPENDED: { label: "Suspended", cls: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300" },
};

export const placementStatusStyles: Record<string, { label: string; cls: string }> = {
  ACTIVE: { label: "Active", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  JOINED: { label: "Joined", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  REPLACEMENT_REQUIRED: { label: "Replacement Required", cls: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300" },
  COMPLETED: { label: "Completed", cls: "bg-emerald-500 text-white" },
};

export const offerStatusStyles: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Pending", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
  ACCEPTED: { label: "Accepted", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  REJECTED: { label: "Rejected", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
  NEGOTIATION: { label: "Negotiating", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" },
  WITHDRAWN: { label: "Withdrawn", cls: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

export const interviewStatusStyles: Record<string, { label: string; cls: string }> = {
  SCHEDULED: { label: "Scheduled", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" },
  COMPLETED: { label: "Completed", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
  CANCELLED: { label: "Cancelled", cls: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
  NO_SHOW: { label: "No Show", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300" },
  RESCHEDULED: { label: "Rescheduled", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" },
};

export const badge = (status: string) =>
  submissionStatusStyles[status] ??
  requirementStatusStyles[status] ??
  placementStatusStyles[status] ??
  offerStatusStyles[status] ??
  interviewStatusStyles[status] ??
  verificationStyles[status] ?? {
    label: status.replace(/_/g, " "),
    cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

export const SUBMISSION_STATUSES = Object.keys(submissionStatusStyles);