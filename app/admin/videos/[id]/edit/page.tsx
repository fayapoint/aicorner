"use client";

import { useRouter, useParams } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { VideoEditor } from "@/components/video-editor";

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();

  const handleSave = (video: any) => {
    // Redirect to the video list
    router.push("/admin/videos");
  };

  const handleCancel = () => {
    router.push("/admin/videos");
  };

  return (
    <AdminLayout>
      <VideoEditor 
        videoId={params.id as string} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </AdminLayout>
  );
}
