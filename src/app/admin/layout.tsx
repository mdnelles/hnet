import AdminTemplate from "@/app/components/templates/AdminTemplate";

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   // return <AdminTemplate>{children}</AdminTemplate>;
   return <div>{children}</div>;
}
