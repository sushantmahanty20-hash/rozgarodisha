import { Suspense } from "react";
import { RevenuePage } from "@/components/dashboard/revenue";

export const metadata = { title: "Fees & Revenue" };

export default function RevenuePageWrapper() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading...</div>}>
      <RevenuePage />
    </Suspense>
  );
}