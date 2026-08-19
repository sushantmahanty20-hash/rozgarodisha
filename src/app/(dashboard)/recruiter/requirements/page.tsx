import { Suspense } from "react";
import { RequirementsPage } from "@/components/dashboard/requirements";

export const metadata = { title: "Job Requirements" };

export default function RequirementsPageWrapper() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading...</div>}>
      <RequirementsPage />
    </Suspense>
  );
}