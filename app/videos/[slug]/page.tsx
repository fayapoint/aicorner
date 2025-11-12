'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Clock, Eye, Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Video {
  _id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
  status: string;
}

export default function VideoDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideo = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      // First try to find by slug, then by ID
      const response = await fetch(`/api/videos?search=${slug}&limit=1`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Video data:', data);
        
        if (data.videos && data.videos.length > 0) {
          setVideo(data.videos[0]);
        } else {
          setError('Video not found');
        }
      } else {
        setError('Failed to fetch video');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      setError('Failed to fetch video');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading video...</div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error || 'Video not found'}</div>
          <Link 
            href="/videos" 
            className="text-purple-300 hover:text-white transition-colors"
          >
            ← Back to Videos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/videos"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Videos
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              {/* Video */}
              <div className="relative aspect-video bg-black">
                <video
                  controls
                  poster={video.thumbnailUrl}
                  className="w-full h-full"
                  preload="metadata"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {video.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {video.views?.toLocaleString() || 0} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(video.duration)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(video.createdAt)}
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Category</h3>
              <span className="inline-block px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                {video.category}
              </span>
            </div>

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Statistics</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Views:</span>
                  <span>{video.views?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Likes:</span>
                  <span>{video.likes?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formatDuration(video.duration)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
