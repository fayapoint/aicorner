"use client";

import { Video } from "@/types/news";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Eye, Heart, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoPlayer } from "@/components/video-player";

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  if (!video) return null;

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-slate-900/95 border-gray-700 backdrop-blur-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Video Player */}
              <div className="relative aspect-video">
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                  autoPlay={true}
                  controls={true}
                  className="w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                {/* Title and Category */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {video.title}
                    </h2>
                    <Badge className="bg-purple-600 text-white">
                      {video.category}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{video.likes.toLocaleString()} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(video.publishedAt || video.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Duration: {formatDuration(video.duration)}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {video.description}
                  </p>
                </div>

                {/* Tags */}
                {video.tags && video.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:border-purple-400/40 hover:text-purple-300 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
