"use client";

import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { NewsEditor } from "@/components/news-editor";

export default function NewArticlePage() {
  const router = useRouter();

  const handleSave = (article: any) => {
    // Redirect to the article list or edit page
    router.push("/admin/news");
  };

  const handleCancel = () => {
    router.push("/admin/news");
  };

  return (
    <AdminLayout>
      <NewsEditor onSave={handleSave} onCancel={handleCancel} />
    </AdminLayout>
  );
}
