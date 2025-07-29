"use client";

import { VideoPlayer } from "@/components/video-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestVideosPage() {
  const testVideos = [
    {
      title: "YouTube Video Test",
      videoUrl: "https://www.youtube.com/watch?v=XfC15hP23no",
      thumbnailUrl: "https://img.youtube.com/vi/XfC15hP23no/maxresdefault.jpg"
    },
    {
      title: "Direct MP4 Video Test",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop"
    },
    {
      title: "Another Direct Video Test",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Video Player Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testVideos.map((video, index) => (
            <Card key={index} className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                  className="w-full aspect-video"
                />
                <div className="mt-4 text-sm text-gray-400">
                  <p><strong>URL:</strong> {video.videoUrl}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-slate-800/50 border-gray-700 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Video Player Features</h2>
              <div className="text-left text-gray-300 space-y-2">
                <p>✅ <strong>YouTube Videos:</strong> Embedded using iframe</p>
                <p>✅ <strong>Vimeo Videos:</strong> Embedded using iframe</p>
                <p>✅ <strong>Direct Videos:</strong> HTML5 video player</p>
                <p>✅ <strong>Error Handling:</strong> Fallback for unsupported formats</p>
                <p>✅ <strong>Thumbnails:</strong> Preview before playing</p>
                <p>✅ <strong>External Links:</strong> Open in new tab option</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
