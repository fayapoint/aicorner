"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw,
  Youtube,
  Newspaper,
  Rss,
  Globe,
  Instagram,
  Music,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface VideoSource {
  id: string;
  name: string;
  type: 'youtube' | 'vimeo' | 'dailymotion' | 'twitch' | 'instagram' | 'tiktok';
  enabled: boolean;
  config: {
    searchTerms?: string[];
    channels?: string[];
    maxResults?: number;
    apiKey?: string;
    customUrl?: string;
  };
}

interface NewsSource {
  id: string;
  name: string;
  type: 'newsapi' | 'google-news' | 'rss' | 'google-ai' | 'custom';
  enabled: boolean;
  config: {
    url?: string;
    apiKey?: string;
    maxResults?: number;
    categories?: string[];
  };
}

interface SourcesConfig {
  youtube: {
    enabled: boolean;
    searchTerms: string[];
    maxResults: number;
    channels: string[];
  };
  news: {
    enabled: boolean;
    sources: NewsSource[];
  };
  videoSources: VideoSource[];
  instagram: {
    enabled: boolean;
    reason: string;
  };
  tiktok: {
    enabled: boolean;
    reason: string;
  };
}

interface SourceManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourceManagement({ isOpen, onClose }: SourceManagementProps) {
  const [sources, setSources] = useState<SourcesConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSources();
    }
  }, [isOpen]);

  const fetchSources = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken') || 'mock-jwt-token-for-local-development';
      
      const response = await fetch('/api/aggregation?action=sources', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Initialize with expanded video sources
        const expandedSources: SourcesConfig = {
          ...data.data,
          videoSources: [
            {
              id: 'youtube-main',
              name: 'YouTube (Primary)',
              type: 'youtube',
              enabled: true,
              config: {
                searchTerms: data.data.youtube.searchTerms || ['artificial intelligence', 'AI technology', 'machine learning'],
                maxResults: data.data.youtube.maxResults || 3,
                channels: data.data.youtube.channels || []
              }
            },
            {
              id: 'vimeo-ai',
              name: 'Vimeo AI Content',
              type: 'vimeo',
              enabled: false,
              config: {
                searchTerms: ['artificial intelligence', 'AI', 'machine learning'],
                maxResults: 2,
                customUrl: 'https://vimeo.com/api/v2/videos/search.json'
              }
            },
            {
              id: 'dailymotion-tech',
              name: 'Dailymotion Tech',
              type: 'dailymotion',
              enabled: false,
              config: {
                searchTerms: ['AI technology', 'artificial intelligence'],
                maxResults: 2,
                customUrl: 'https://www.dailymotion.com/api'
              }
            },
            {
              id: 'twitch-ai',
              name: 'Twitch AI Streams',
              type: 'twitch',
              enabled: false,
              config: {
                searchTerms: ['AI', 'programming', 'machine learning'],
                maxResults: 1
              }
            }
          ]
        };
        setSources(expandedSources);
      } else {
        setError(data.error || 'Failed to fetch sources');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSources = async () => {
    if (!sources) return;
    
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const token = localStorage.getItem('adminToken') || 'mock-jwt-token-for-local-development';
      
      const response = await fetch('/api/aggregation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'update-sources',
          sources
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage('Sources updated successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.error || 'Failed to update sources');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSaving(false);
    }
  };

  const addVideoSource = () => {
    if (!sources) return;
    
    const newSource: VideoSource = {
      id: `custom-${Date.now()}`,
      name: 'New Video Source',
      type: 'youtube',
      enabled: false,
      config: {
        searchTerms: ['AI'],
        maxResults: 1
      }
    };
    
    setSources({
      ...sources,
      videoSources: [...sources.videoSources, newSource]
    });
  };

  const updateVideoSource = (id: string, updates: Partial<VideoSource>) => {
    if (!sources) return;
    
    setSources({
      ...sources,
      videoSources: sources.videoSources.map(source =>
        source.id === id ? { ...source, ...updates } : source
      )
    });
  };

  const removeVideoSource = (id: string) => {
    if (!sources) return;
    
    setSources({
      ...sources,
      videoSources: sources.videoSources.filter(source => source.id !== id)
    });
  };

  const addNewsSource = () => {
    if (!sources) return;
    
    const newSource: NewsSource = {
      id: `news-${Date.now()}`,
      name: 'New News Source',
      type: 'rss',
      enabled: false,
      config: {
        url: '',
        maxResults: 5
      }
    };
    
    setSources({
      ...sources,
      news: {
        ...sources.news,
        sources: [...sources.news.sources, newSource]
      }
    });
  };

  const updateNewsSource = (id: string, updates: Partial<NewsSource>) => {
    if (!sources) return;
    
    setSources({
      ...sources,
      news: {
        ...sources.news,
        sources: sources.news.sources.map(source =>
          source.id === id ? { ...source, ...updates } : source
        )
      }
    });
  };

  const removeNewsSource = (id: string) => {
    if (!sources) return;
    
    setSources({
      ...sources,
      news: {
        ...sources.news,
        sources: sources.news.sources.filter(source => source.id !== id)
      }
    });
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'vimeo': return <Globe className="w-4 h-4" />;
      case 'dailymotion': return <Globe className="w-4 h-4" />;
      case 'twitch': return <Music className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'tiktok': return <Music className="w-4 h-4" />;
      case 'newsapi': return <Newspaper className="w-4 h-4" />;
      case 'google-news': return <Globe className="w-4 h-4" />;
      case 'rss': return <Rss className="w-4 h-4" />;
      case 'google-ai': return <Globe className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-lg border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Source Management</h2>
            <div className="flex gap-2">
              <Button
                onClick={saveSources}
                disabled={isSaving}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <p className="text-green-300">{successMessage}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : sources ? (
            <div className="space-y-8">
              {/* Video Sources */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Youtube className="w-5 h-5 text-red-400" />
                      Video Sources
                    </CardTitle>
                    <Button onClick={addVideoSource} size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Source
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sources.videoSources.map((source) => (
                    <div key={source.id} className="border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getSourceIcon(source.type)}
                          <Input
                            value={source.name}
                            onChange={(e) => updateVideoSource(source.id, { name: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                          <Badge variant={source.enabled ? "default" : "secondary"}>
                            {source.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={source.enabled}
                            onCheckedChange={(enabled) => updateVideoSource(source.id, { enabled })}
                          />
                          <Button
                            onClick={() => removeVideoSource(source.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Platform Type</Label>
                          <select
                            value={source.type}
                            onChange={(e) => updateVideoSource(source.id, { type: e.target.value as any })}
                            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
                          >
                            <option value="youtube">YouTube</option>
                            <option value="vimeo">Vimeo</option>
                            <option value="dailymotion">Dailymotion</option>
                            <option value="twitch">Twitch</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                          </select>
                        </div>

                        <div>
                          <Label className="text-gray-300">Max Results</Label>
                          <Input
                            type="number"
                            value={source.config.maxResults || 1}
                            onChange={(e) => updateVideoSource(source.id, {
                              config: { ...source.config, maxResults: parseInt(e.target.value) || 1 }
                            })}
                            className="bg-gray-800 border-gray-600 text-white"
                            min="1"
                            max="10"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label className="text-gray-300">Search Terms (comma-separated)</Label>
                          <Input
                            value={source.config.searchTerms?.join(', ') || ''}
                            onChange={(e) => updateVideoSource(source.id, {
                              config: {
                                ...source.config,
                                searchTerms: e.target.value.split(',').map(term => term.trim()).filter(Boolean)
                              }
                            })}
                            className="bg-gray-800 border-gray-600 text-white"
                            placeholder="artificial intelligence, AI technology, machine learning"
                          />
                        </div>

                        {source.type !== 'youtube' && (
                          <div className="md:col-span-2">
                            <Label className="text-gray-300">Custom API URL</Label>
                            <Input
                              value={source.config.customUrl || ''}
                              onChange={(e) => updateVideoSource(source.id, {
                                config: { ...source.config, customUrl: e.target.value }
                              })}
                              className="bg-gray-800 border-gray-600 text-white"
                              placeholder="https://api.example.com/videos"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
