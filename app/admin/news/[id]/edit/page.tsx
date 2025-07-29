"use client";

import { useRouter, useParams } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { NewsEditor } from "@/components/news-editor";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();

  const handleSave = (article: any) => {
    // Redirect to the article list
    router.push("/admin/news");
  };

  const handleCancel = () => {
    router.push("/admin/news");
  };

  return (
    <AdminLayout>
      <NewsEditor 
        articleId={params.id as string} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </AdminLayout>
  );
}
