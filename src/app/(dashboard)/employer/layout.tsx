import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      user={{
        name: "Priya Sharma",
        email: "employer@jobportal.demo",
        role: "employer",
      }}
    >
      {children}
    </DashboardLayout>
  );
}