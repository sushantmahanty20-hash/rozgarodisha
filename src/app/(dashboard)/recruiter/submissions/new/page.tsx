import { Suspense } from "react";
import { SubmitCandidatePage } from "@/components/dashboard/submit-candidate";

export const metadata = { title: "Submit Candidate" };

export default function SubmitCandidatePageWrapper() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading...</div>}>
      <SubmitCandidatePage />
    </Suspense>
  );
}