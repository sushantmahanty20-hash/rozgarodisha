import { Suspense } from "react";
import { AgencyProfilePage } from "@/components/dashboard/agency-profile";

export const metadata = { title: "My Agency" };

export default function AgencyPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading...</div>}>
      <AgencyProfilePage tab={undefined} />
    </Suspense>
  );
}