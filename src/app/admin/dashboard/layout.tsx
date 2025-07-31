import { DashboardProvider } from "../../../components/admin/DashboardContext";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
export default function AdminDashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <DashboardProvider>
         <DashboardLayout>{children}</DashboardLayout>
      </DashboardProvider>
   );
}
