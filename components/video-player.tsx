"use client";

import { useState, useEffect } from "react";
import { Play, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
}

export function VideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  className = "", 
  autoPlay = false,
  controls = true 
}: VideoPlayerProps) {
  const [videoType, setVideoType] = useState<'direct' | 'youtube' | 'vimeo' | 'unsupported'>('direct');
  const [showPlayer, setShowPlayer] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoUrl) {
      determineVideoType(videoUrl);
    }
  }, [videoUrl]);

  const determineVideoType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setVideoType('youtube');
    } else if (url.includes('vimeo.com')) {
      setVideoType('vimeo');
    } else if (url.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i)) {
      setVideoType('direct');
    } else {
      setVideoType('unsupported');
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0`;
    }
    return null;
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const videoId = extractVimeoId(url);
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}`;
    }
    return null;
  };

  const extractVimeoId = (url: string) => {
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  const handleVideoError = () => {
    setError("Failed to load video. The video file may be unavailable or in an unsupported format.");
  };

  const openExternalVideo = () => {
    window.open(videoUrl, '_blank');
  };

  if (!videoUrl) {
    return (
      <div className={`bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <AlertCircle className="w-12 h-12 mx-auto mb-2" />
          <p>No video available</p>
        </div>
      </div>
    );
  }

  // Show thumbnail with play button if not playing yet
  if (!showPlayer) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden cursor-pointer group ${className}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/video-placeholder.svg';
          }}
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handlePlayClick}
            className="bg-purple-600/90 hover:bg-purple-700/90 rounded-full p-4 backdrop-blur-sm"
            size="lg"
          >
            <Play className="w-8 h-8 text-white fill-current" />
          </Button>
        </div>

        {/* Video Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
            {videoType === 'youtube' && 'YouTube'}
            {videoType === 'vimeo' && 'Vimeo'}
            {videoType === 'direct' && 'Video'}
            {videoType === 'unsupported' && 'External'}
          </Badge>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`bg-gray-800 rounded-lg flex items-center justify-center p-8 ${className}`}>
        <div className="text-center text-gray-400">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p className="mb-4">{error}</p>
          <Button onClick={openExternalVideo} variant="outline" className="border-gray-600">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>
    );
  }

  // Render appropriate player based on video type
  switch (videoType) {
    case 'youtube':
      const youtubeUrl = getYouTubeEmbedUrl(videoUrl);
      if (youtubeUrl) {
        return (
          <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
            <iframe
              src={youtubeUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      break;

    case 'vimeo':
      const vimeoUrl = getVimeoEmbedUrl(videoUrl);
      if (vimeoUrl) {
        return (
          <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
            <iframe
              src={vimeoUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      break;

    case 'direct':
      return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
          <video
            src={videoUrl}
            poster={thumbnailUrl}
            controls={controls}
            autoPlay={autoPlay}
            className="w-full h-full object-cover"
            onError={handleVideoError}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );

    default:
      return (
        <div className={`bg-gray-800 rounded-lg flex items-center justify-center p-8 ${className}`}>
          <div className="text-center text-gray-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p className="mb-4">Unsupported video format</p>
            <Button onClick={openExternalVideo} variant="outline" className="border-gray-600">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      );
  }

  return null;
}
