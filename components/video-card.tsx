"use client";

import { Video } from "@/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
  index?: number;
  onPlay?: (video: Video) => void;
}

export function VideoCard({ video, index = 0, onPlay }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPlay) {
      onPlay(video);
    }
  };

  // Create a slug from the video title or use the ID more
  const videoSlug = video.slug || video.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || video._id;

  const getVideoType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    } else {
      return 'direct';
    }
  };

  const videoType = getVideoType(video.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/videos/${videoSlug}`}>
        <Card
          className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group h-full overflow-hidden backdrop-blur-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        <div className="relative overflow-hidden">
          <SafeImage
            src={video.thumbnailUrl}
            alt={video.title}
            width={400}
            height={240}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              className="bg-purple-600/90 rounded-full p-4 backdrop-blur-sm"
              onClick={onPlay ? handlePlay : undefined}
            >
              {videoType === 'youtube' || videoType === 'vimeo' ? (
                <ExternalLink className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-current" />
              )}
            </motion.div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(video.duration)}
            </Badge>
          </div>

          {/* Video Type Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
              {videoType === 'youtube' && 'YouTube'}
              {videoType === 'vimeo' && 'Vimeo'}
              {videoType === 'direct' && 'Video'}
            </Badge>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-purple-600/90 text-white border-0 backdrop-blur-sm">
              {video.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
              {video.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
              {video.description}
            </p>

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="text-xs border-gray-600 text-gray-400 hover:border-purple-400/40 hover:text-purple-300 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
                {video.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-600 text-gray-400"
                  >
                    +{video.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="space-y-2 pt-3 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {(video.views ?? 0).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {(video.likes ?? 0).toLocaleString()}
                  </div>
                </div>

                <span className="text-xs text-gray-400">
                  {formatDate(video.publishedAt || video.createdAt)}
                </span>
              </div>

              {/* Source Attribution */}
              {(video as any).source?.platform && (video as any).source.platform !== 'manual' && (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <ExternalLink className="w-3 h-3" />
                    <span>
                      Source: {(video as any).source.channelTitle || (video as any).source.channelName ||
                      ((video as any).source.platform === 'youtube' ? 'YouTube' :
                       (video as any).source.platform === 'vimeo' ? 'Vimeo' :
                       (video as any).source.platform === 'dailymotion' ? 'Dailymotion' :
                       (video as any).source.platform === 'twitch' ? 'Twitch' :
                       (video as any).source.platform.charAt(0).toUpperCase() + (video as any).source.platform.slice(1))}
                    </span>
                  </div>
                  {(video as any).source.originalUrl && (
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-300 transition-colors underline"
                      aria-label="Open original video source in a new tab"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open((video as any).source.originalUrl, "_blank", "noopener,noreferrer");
                      }}
                    >
                      View Original
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
