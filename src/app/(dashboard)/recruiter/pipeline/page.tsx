import { Suspense } from "react";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";

export const metadata = { title: "Pipeline Board" };

export default function PipelineBoardPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading...</div>}>
      <PipelineBoard />
    </Suspense>
  );
}