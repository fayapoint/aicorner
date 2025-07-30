"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Eye,
  Upload,
  X,
  Plus,
  Loader2,
  Video as VideoIcon,
  Image as ImageIcon,
  Link,
  Play,
  Download
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { VideoPlayer } from "@/components/video-player";

interface VideoEditorProps {
  videoId?: string;
  onSave?: (video: any) => void;
  onCancel?: () => void;
}

interface VideoData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  publicId: string;
  duration: number;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  likes: number;
  featured: {
    isFeatured: boolean;
    order?: number;
  };
}

export function VideoEditor({ videoId, onSave, onCancel }: VideoEditorProps) {
  const [videoData, setVideoData] = useState<VideoData>({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    publicId: '',
    duration: 0,
    category: '',
    tags: [],
    status: 'draft',
    views: 0,
    likes: 0,
    featured: {
      isFeatured: false,
      order: undefined
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [urlParsing, setUrlParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);

  const categories = [
    'Getting Started',
    'Tutorials',
    'Advanced',
    'Product Demo',
    'Webinar',
    'Interview'
  ];

  useEffect(() => {
    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  // Add global paste event listener
  useEffect(() => {
    const handleGlobalPaste = async (e: ClipboardEvent) => {
      // Only handle paste if we're focused on this component and no thumbnail exists
      if (!videoData.thumbnailUrl && document.activeElement?.closest('.video-editor')) {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf('image') !== -1) {
            e.preventDefault();
            const file = item.getAsFile();
            if (file) {
              await handleThumbnailUpload(file);
            }
            break;
          }
        }
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => document.removeEventListener('paste', handleGlobalPaste);
  }, [videoData.thumbnailUrl]);

  const fetchVideo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/videos-single?id=${videoId}`);
      if (response.ok) {
        const video = await response.json();
        setVideoData({
          title: video.title || '',
          description: video.description || '',
          videoUrl: video.videoUrl || '',
          thumbnailUrl: video.thumbnailUrl || '',
          publicId: video.publicId || '',
          duration: video.duration || 0,
          category: video.category || '',
          tags: video.tags || [],
          status: video.status || 'draft',
          views: video.views || 0,
          likes: video.likes || 0,
          featured: video.featured || { isFeatured: false, order: undefined }
        });
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const method = videoId ? 'PUT' : 'POST';
      const url = videoId ? `/api/videos-single?id=${videoId}` : '/api/videos';

      // Prepare data with proper defaults
      const dataToSave = {
        ...videoData,
        status,
        // Ensure required fields have values
        title: videoData.title || 'Untitled Video',
        description: videoData.description || '',
        videoUrl: videoData.videoUrl || '',
        thumbnailUrl: videoData.thumbnailUrl || '',
        publicId: videoData.publicId || '',
        duration: videoData.duration || 0,
        category: videoData.category || 'Getting Started',
        tags: videoData.tags || [],
        views: videoData.views || 0,
        likes: videoData.likes || 0
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        const savedVideo = await response.json();
        if (onSave) {
          onSave(savedVideo);
        }
      } else {
        const errorData = await response.json();
        console.error('Save error:', errorData);
        alert(`Failed to save video: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Failed to save video');
    } finally {
      setSaving(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    setVideoUploading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setVideoData(prev => ({
          ...prev,
          videoUrl: data.secure_url,
          publicId: data.public_id,
          duration: Math.round(data.duration || 0)
        }));
      } else {
        const errorData = await response.json();
        alert(`Failed to upload video: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video');
    } finally {
      setVideoUploading(false);
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    setThumbnailUploading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setVideoData(prev => ({
          ...prev,
          thumbnailUrl: data.secure_url
        }));
      } else {
        const errorData = await response.json();
        alert(`Failed to upload thumbnail: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Failed to upload thumbnail');
    } finally {
      setThumbnailUploading(false);
    }
  };

  // Handle clipboard paste
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await handleThumbnailUpload(file);
        }
        break;
      }
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        await handleThumbnailUpload(file);
      }
    }
  };

  const addTag = () => {
    if (newTag.trim() && !videoData.tags.includes(newTag.trim())) {
      setVideoData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setVideoData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleUrlParse = async () => {
    if (!urlInput.trim()) return;

    setUrlParsing(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/parse-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url: urlInput.trim() })
      });

      if (response.ok) {
        const { data } = await response.json();

        console.log('Parsed video data:', data); // Debug log

        // Auto-populate fields with parsed data (always overwrite for better UX)
        setVideoData(prev => ({
          ...prev,
          title: data.title || prev.title || '',
          description: data.description || prev.description || '',
          videoUrl: urlInput.trim(), // Always use the provided URL
          thumbnailUrl: data.thumbnail || prev.thumbnailUrl || ''
        }));

        setUrlInput('');
        setParseSuccess(true);

        // Show success message
        console.log('✅ Video URL parsed successfully:', {
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail ? 'Yes' : 'No'
        });

        // Hide success message after 3 seconds
        setTimeout(() => setParseSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        console.error('URL parsing failed:', errorData.error);
        alert(`Failed to parse URL: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
      alert('Failed to parse URL. Please check the URL and try again, or enter the information manually.');
    } finally {
      setUrlParsing(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 video-editor">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {videoId ? 'Edit Video' : 'Upload New Video'}
          </h1>
          <p className="text-gray-400 mt-1">
            {videoData.duration > 0 && `${formatDuration(videoData.duration)} • `}
            {videoData.status}
          </p>
        </div>
        <div className="flex gap-3">
          {onCancel && (
            <Button variant="outline" onClick={onCancel} className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
          )}
          <Button
            onClick={() => handleSave('draft')}
            disabled={saving}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Video Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter video title..."
                value={videoData.title}
                onChange={(e) => setVideoData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 text-lg"
              />
            </CardContent>
          </Card>

          {/* URL Auto-Population */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Link className="w-5 h-5" />
                Auto-populate from URL
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Paste a YouTube URL to automatically extract title, description, and thumbnail
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlParse()}
                  />
                  <Button
                    onClick={handleUrlParse}
                    disabled={urlParsing || !urlInput.trim()}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 whitespace-nowrap"
                  >
                    {urlParsing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Parse
                      </>
                    )}
                  </Button>
                </div>

                {parseSuccess && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Video content successfully extracted and populated!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your video..."
                value={videoData.description}
                onChange={(e) => setVideoData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
              />
            </CardContent>
          </Card>

          {/* Video Upload */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Video Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'upload' | 'url')}>
                <TabsList className="bg-slate-700 border-gray-600">
                  <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="url" className="data-[state=active]:bg-purple-600">
                    <Link className="w-4 h-4 mr-2" />
                    Video URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-4">
                  {videoData.videoUrl ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <VideoPlayer
                          videoUrl={videoData.videoUrl}
                          thumbnailUrl={videoData.thumbnailUrl}
                          title={videoData.title || 'Video Preview'}
                          controls={true}
                          className="w-full h-64"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setVideoData(prev => ({ ...prev, videoUrl: '', publicId: '', duration: 0 }))}
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 z-10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400">
                        Duration: {formatDuration(videoData.duration)}
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <VideoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400 mb-3">Upload your video file</p>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleVideoUpload(file);
                        }}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-10 px-4 py-2">
                          {videoUploading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          Choose Video
                        </div>
                      </label>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="url" className="mt-4">
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                      value={videoData.videoUrl}
                      onChange={(e) => setVideoData(prev => ({ ...prev, videoUrl: e.target.value }))}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Input
                      type="number"
                      placeholder="Duration in seconds"
                      value={videoData.duration || ''}
                      onChange={(e) => setVideoData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                    />
                    {videoData.videoUrl && (
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Video URL: {videoData.videoUrl}</p>
                        {videoData.duration > 0 && (
                          <p className="text-sm text-gray-400">Duration: {formatDuration(videoData.duration)}</p>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              {videoData.thumbnailUrl ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Image
                      src={videoData.thumbnailUrl}
                      alt="Video thumbnail"
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVideoData(prev => ({ ...prev, thumbnailUrl: '' }))}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragOver
                      ? 'border-purple-400 bg-purple-500/10'
                      : 'border-gray-600'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onPaste={handlePaste}
                  tabIndex={0}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 mb-2">Upload thumbnail</p>
                  <p className="text-xs text-gray-500 mb-3">
                    Click to upload, drag & drop, or paste (Ctrl+V) an image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleThumbnailUpload(file);
                    }}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-10 px-4 py-2">
                      {thumbnailUploading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      Choose Image
                    </div>
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={videoData.category}
                onValueChange={(value) => setVideoData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-slate-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button onClick={addTag} size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {videoData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-purple-400/40"
                    >
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(tag)}
                        className="ml-1 h-auto p-0 hover:bg-transparent"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Content */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Featured Content
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Mark this video as featured for homepage display
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured-video"
                    checked={videoData.featured.isFeatured}
                    onChange={(e) => setVideoData(prev => ({
                      ...prev,
                      featured: {
                        ...prev.featured,
                        isFeatured: e.target.checked,
                        order: e.target.checked ? prev.featured.order || 1 : undefined
                      }
                    }))}
                    className="rounded border-gray-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="featured-video" className="text-white text-sm font-medium">
                    Feature on homepage
                  </label>
                </div>

                {videoData.featured.isFeatured && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Display Order (1-6)
                    </label>
                    <select
                      value={videoData.featured.order || 1}
                      onChange={(e) => setVideoData(prev => ({
                        ...prev,
                        featured: {
                          ...prev.featured,
                          order: parseInt(e.target.value)
                        }
                      }))}
                      className="w-full bg-slate-700/50 border border-gray-600 rounded-md px-3 py-2 text-white"
                    >
                      <option value={1}>1 (First)</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6 (Last)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Lower numbers appear first on the homepage
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
