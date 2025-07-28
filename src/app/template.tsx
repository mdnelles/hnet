import PublicTemplate from "@/app/components/templates/PublicTemplate";

export default function PublicTemplateWrapper({
   children,
}: {
   children: React.ReactNode;
}) {
   return <PublicTemplate>{children}</PublicTemplate>;
}
