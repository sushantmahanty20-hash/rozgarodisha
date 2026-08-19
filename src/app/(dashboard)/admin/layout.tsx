import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      user={{
        name: "Rajesh Kumar",
        email: "admin@jobportal.demo",
        role: "admin",
      }}
    >
      {children}
    </DashboardLayout>
  );
}