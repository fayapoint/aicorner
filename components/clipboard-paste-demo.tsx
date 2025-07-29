"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Clipboard, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function ClipboardPasteDemo() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await uploadImage(file);
        }
        break;
      }
    }
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ai-corner-news');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dfd7iigzq/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.secure_url);
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-gray-700 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clipboard className="w-5 h-5" />
          Clipboard Paste Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center"
          onPaste={handlePaste}
          tabIndex={0}
        >
          {imageUrl ? (
            <div className="space-y-3">
              <Image
                src={imageUrl}
                alt="Pasted image"
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-lg mx-auto"
              />
              <p className="text-green-400 text-sm">✅ Image uploaded successfully!</p>
              <Button 
                onClick={() => setImageUrl("")}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300"
              >
                Clear
              </Button>
            </div>
          ) : (
            <div>
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400 mb-2">
                {uploading ? "Uploading..." : "Click here and paste an image (Ctrl+V)"}
              </p>
              <p className="text-xs text-gray-500">
                Copy any image and paste it here to test
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
