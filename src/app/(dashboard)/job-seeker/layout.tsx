import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function JobSeekerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      user={{
        name: "Aditya Joshi",
        email: "candidate@jobportal.demo",
        role: "jobseeker",
      }}
    >
      {children}
    </DashboardLayout>
  );
}