"use client";

import { useState, useEffect } from "react";
import { NewsArticle, Video } from "@/types/news";
import { NewsCard } from "@/components/news-card";
import { VideoCard } from "@/components/video-card";
import { VideoModal } from "@/components/video-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper, Play, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Fallback data in case API fails
const fallbackNews: NewsArticle[] = [
  {
    _id: 'fallback-1',
    title: 'Getting Started with AI in 2024',
    slug: 'getting-started-with-ai-2024',
    excerpt: 'A comprehensive guide to understanding artificial intelligence and how it can transform your workflow.',
    content: '',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBOZXdzPC90ZXh0Pjwvc3ZnPg==',
      publicId: 'fallback-news',
      alt: 'AI News'
    },
    author: { name: 'AI Corner Team' },
    category: 'AI Basics',
    tags: ['AI', 'Beginner'],
    status: 'published' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    seo: {},
    readTime: 5,
    views: 0
  }
];

const fallbackVideos: Video[] = [
  {
    _id: 'fallback-video-1',
    title: 'Introduction to AI Corner Platform',
    slug: 'introduction-to-ai-corner-platform',
    description: 'Get started with AI Corner and discover how our platform can transform your AI workflow.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBWaWRlbzwvdGV4dD48L3N2Zz4=',
    publicId: 'fallback-video',
    duration: 180,
    category: 'Getting Started',
    tags: ['Introduction', 'Platform'],
    status: 'published' as const,
    views: 520,
    likes: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  }
];

export function HomepageNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);

  useEffect(() => {
    fetchNews();
    fetchVideos();
  }, []);

  const fetchNews = async () => {
    try {
      console.log('Fetching news from:', '/api/news?limit=6&status=published');
      const response = await fetch('/api/news?limit=6&status=published');
      console.log('News response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('News data received:', data);
        setNews(data.articles || []);
      } else {
        console.error('Failed to fetch news:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        console.log('Using fallback news data');
        setNews(fallbackNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      console.log('Using fallback news data due to error');
      setNews(fallbackNews);
    } finally {
      setIsLoadingNews(false);
    }
  };

  const fetchVideos = async () => {
    try {
      console.log('Fetching videos from:', '/api/videos?limit=6&status=published');
      const response = await fetch('/api/videos?limit=6&status=published');
      console.log('Videos response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Videos data received:', data);
        setVideos(data.videos || []);
      } else {
        console.error('Failed to fetch videos:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        console.log('Using fallback videos data');
        setVideos(fallbackVideos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      console.log('Using fallback videos data due to error');
      setVideos(fallbackVideos);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const handleVideoPlay = (video: Video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* News Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* News Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Latest AI News</h2>
                <p className="text-gray-400">Stay updated with the latest developments in AI technology</p>
              </div>
            </div>
            <Link href="/news">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                View All News
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* News Grid */}
          {isLoadingNews ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <NewsCard key={article._id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No News Articles Yet</h3>
              <p className="text-gray-500">Check back soon for the latest AI news and updates.</p>
            </div>
          )}
        </motion.div>

        {/* Video Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Video Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Video Gallery</h2>
                <p className="text-gray-400">Watch tutorials, demos, and AI insights</p>
              </div>
            </div>
            <Link href="/videos">
              <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-500/10">
                View All Videos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Video Grid */}
          {isLoadingVideos ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <VideoCard 
                  key={video._id} 
                  video={video} 
                  index={index}
                  onPlay={handleVideoPlay}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Videos Yet</h3>
              <p className="text-gray-500">Check back soon for tutorials and AI demonstrations.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={handleVideoModalClose}
      />
    </div>
  );
}
