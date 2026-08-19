import { Suspense } from "react";
import { SubmissionsPage } from "@/components/dashboard/submissions";

export const metadata = { title: "Candidate Submissions" };

export default function SubmissionsPageWrapper() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading...</div>}>
      <SubmissionsPage />
    </Suspense>
  );
}