"use client";

import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { VideoEditor } from "@/components/video-editor";

export default function NewVideoPage() {
  const router = useRouter();

  const handleSave = (video: any) => {
    // Redirect to the video list
    router.push("/admin/videos");
  };

  const handleCancel = () => {
    router.push("/admin/videos");
  };

  return (
    <AdminLayout>
      <VideoEditor onSave={handleSave} onCancel={handleCancel} />
    </AdminLayout>
  );
}
