"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  RefreshCw,
  Settings,
  Eye,
  Download,
  ExternalLink,
  User,
  Calendar,
  Timer,
  Edit,
  Trash2,
  Pause,
  FileText,
  Play
} from "lucide-react";
import Link from "next/link";
import { SourceManagement } from "@/components/source-management";
import { ContentEditModal } from "@/components/content-edit-modal";

interface PreviewItem {
  id: string;
  type: 'video' | 'news';
  platform: string;
  title: string;
  description: string;
  url: string;
  author: string;
  publishedAt: string;
  thumbnail?: string;
  source: {
    platform: string;
    originalUrl: string;
    apiId: string;
    sourceName?: string;
    channelTitle?: string;
  };
  data: any;
}

interface PreviewData {
  timestamp: string;
  sources: {
    youtube: { success: boolean; items: PreviewItem[]; error?: string };
    news: { success: boolean; items: PreviewItem[]; error?: string };
  };
  totalItems: number;
}

export default function EnhancedAggregationPage() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [editingItem, setEditingItem] = useState<PreviewItem | null>(null);
  const [editedItems, setEditedItems] = useState<Map<string, PreviewItem>>(new Map());
  const [importSummary, setImportSummary] = useState<
    | null
    | {
        status: 'success' | 'partial' | 'error';
        data: { imported: number; failed: number; results: Array<{ success: boolean; item: string; error?: string }> };
      }
  >(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchPreview = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken') || 'mock-jwt-token-for-local-development';
      
      const response = await fetch('/api/aggregation?action=preview', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPreviewData(data.data);
        setSelectedItems(new Set());
        setTimeLeft(120);
        setTimerActive(true);
      } else {
        setError(data.error || 'Failed to fetch preview');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportSelected = async () => {
    if (!previewData || selectedItems.size === 0) {
      setError('No items selected for import');
      return;
    }

    setIsImporting(true);
    setError(null);
    setImportSummary(null);
    setTimerActive(false);
    
    try {
      const token = localStorage.getItem('adminToken') || 'mock-jwt-token-for-local-development';
      const items = [
        ...previewData.sources.youtube.items,
        ...previewData.sources.news.items
      ]
        .filter(item => selectedItems.has(item.id))
        .map(item => {
          const display = getDisplayItem(item);
          return {
            id: display.id,
            type: display.type,
            data: display.data,
            // send source as object with platform; backend normalizes
            source: display.source?.platform ? { platform: display.source.platform } : display.platform || 'manual'
          };
        });
      
      const response = await fetch('/api/aggregation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'import-selected',
          selectedItems: items
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setImportSummary({ status: 'success', data: data.data });
        setPreviewData(null);
        setSelectedItems(new Set());
        setTimeLeft(null);
      } else if (response.status === 207) {
        // Partial success
        setImportSummary({ status: 'partial', data: data.data });
      } else {
        setImportSummary({ status: 'error', data: data.data || { imported: 0, failed: 0, results: [] } });
        setError(data.error || 'Failed to import items');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsImporting(false);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const selectAll = () => {
    if (!previewData) return;
    const allItems = [
      ...previewData.sources.youtube.items,
      ...previewData.sources.news.items
    ];
    setSelectedItems(new Set(allItems.map(item => item.id)));
  };

  const deselectAll = () => {
    setSelectedItems(new Set());
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimeLeft(null);
  };

  const handleEditItem = (item: PreviewItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (editedItem: PreviewItem) => {
    const newEditedItems = new Map(editedItems);
    newEditedItems.set(editedItem.id, editedItem);
    setEditedItems(newEditedItems);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!previewData) return;
    
    const updatedPreviewData = {
      ...previewData,
      sources: {
        youtube: {
          ...previewData.sources.youtube,
          items: previewData.sources.youtube.items.filter(item => item.id !== itemId)
        },
        news: {
          ...previewData.sources.news,
          items: previewData.sources.news.items.filter(item => item.id !== itemId)
        }
      }
    };
    
    updatedPreviewData.totalItems = 
      updatedPreviewData.sources.youtube.items.length + 
      updatedPreviewData.sources.news.items.length;
    
    setPreviewData(updatedPreviewData);
    
    const newSelection = new Set(selectedItems);
    newSelection.delete(itemId);
    setSelectedItems(newSelection);
    
    const newEditedItems = new Map(editedItems);
    newEditedItems.delete(itemId);
    setEditedItems(newEditedItems);
  };

  const getDisplayItem = (item: PreviewItem): PreviewItem => {
    return editedItems.get(item.id) || item;
  };

  // Auto-import timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            setTimerActive(false);
            if (previewData) {
              const allItems = [
                ...previewData.sources.youtube.items,
                ...previewData.sources.news.items
              ];
              setSelectedItems(new Set(allItems.map(item => item.id)));
              handleImportSelected();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft, previewData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Enhanced Content Aggregation
              </h1>
              <p className="text-gray-400 mt-1">Preview and selectively import content with proper attribution</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowSources(!showSources)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Sources
            </Button>
            <Button
              onClick={fetchPreview}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Loading...' : 'Preview Content'}
            </Button>
          </div>
        </div>

        {/* Timer Display */}
        {timerActive && timeLeft !== null && (
          <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Timer className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="font-semibold text-orange-300">Auto-Import Timer</p>
                    <p className="text-sm text-orange-200">All content will be imported automatically in:</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-orange-300">
                    {formatTime(timeLeft)}
                  </div>
                  <Button
                    onClick={stopTimer}
                    variant="outline"
                    size="sm"
                    className="border-orange-400 text-orange-300 hover:bg-orange-500/10"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Timer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="bg-red-500/20 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-300">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Import Result Summary */}
        {importSummary && (
          <Card
            className={
              importSummary.status === 'success'
                ? 'bg-green-500/15 border-green-500/30'
                : importSummary.status === 'partial'
                ? 'bg-yellow-500/15 border-yellow-500/30'
                : 'bg-red-500/15 border-red-500/30'
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {importSummary.status === 'success' && 'Import Successful'}
                  {importSummary.status === 'partial' && 'Partial Import'}
                  {importSummary.status === 'error' && 'Import Failed'}
                </span>
                <Badge
                  className={
                    importSummary.status === 'success'
                      ? 'bg-green-600/30 text-green-300'
                      : importSummary.status === 'partial'
                      ? 'bg-yellow-600/30 text-yellow-300'
                      : 'bg-red-600/30 text-red-300'
                  }
                >
                  {importSummary.data.imported} imported · {importSummary.data.failed} failed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {importSummary.data.failed > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-300 mb-2">Failed items:</p>
                  <ul className="space-y-1 text-sm">
                    {importSummary.data.results
                      .filter(r => !r.success)
                      .slice(0, 10)
                      .map((r, idx) => (
                        <li key={idx} className="text-red-300">
                          • {r.item}: {r.error || 'Unknown error'}
                        </li>
                      ))}
                    {importSummary.data.results.filter(r => !r.success).length > 10 && (
                      <li className="text-gray-400">…and more</li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Preview Content */}
        {previewData && (
          <div className="space-y-6">
            {/* Selection Controls */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="text-gray-300">
                      {selectedItems.size} of {previewData.totalItems} items selected
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={selectAll} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        Select All
                      </Button>
                      <Button onClick={deselectAll} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        Deselect All
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleImportSelected}
                    disabled={selectedItems.size === 0 || isImporting}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isImporting ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isImporting ? 'Importing...' : `Import Selected (${selectedItems.size})`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* YouTube Videos */}
            {previewData.sources.youtube.success && previewData.sources.youtube.items.filter(item => item.platform === 'YouTube').length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-red-600 p-2 rounded-lg">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    YouTube Videos ({previewData.sources.youtube.items.filter(item => item.platform === 'YouTube').length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {previewData.sources.youtube.items.filter(item => item.platform === 'YouTube').map((item) => {
                    const displayItem = getDisplayItem(item);
                    return (
                      <div key={item.id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedItems.has(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-white line-clamp-2">{displayItem.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-red-600/20 text-red-300">
                                  {displayItem.platform}
                                </Badge>
                                {editedItems.has(item.id) && (
                                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                                    Edited
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-3">{displayItem.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {displayItem.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(displayItem.publishedAt).toLocaleDateString()}
                                </div>
                                <a
                                  href={displayItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View Original
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => handleEditItem(displayItem)}
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteItem(item.id)}
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded p-2 text-xs">
                              <p className="text-gray-400">
                                <strong>Source:</strong> {displayItem.source.sourceName || displayItem.source.channelTitle || displayItem.platform}
                              </p>
                              <p className="text-gray-400">
                                <strong>Channel:</strong> {displayItem.source.channelTitle || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* News Articles */}
            {previewData.sources.news && previewData.sources.news.items.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    News Articles ({previewData.sources.news.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {previewData.sources.news.items.map((item) => {
                    const displayItem = getDisplayItem(item);
                    return (
                      <div key={item.id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedItems.has(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-white line-clamp-2">{displayItem.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                                  News
                                </Badge>
                                {editedItems.has(item.id) && (
                                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                                    Edited
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-3">{displayItem.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {displayItem.author || 'Unknown'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(displayItem.publishedAt).toLocaleDateString()}
                                </div>
                                <a
                                  href={displayItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View Original
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => handleEditItem(displayItem)}
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteItem(item.id)}
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded p-2 text-xs">
                              <p className="text-gray-400">
                                <strong>Source:</strong> {displayItem.source.sourceName || 'Unknown Source'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* Other Video Platforms */}
            {previewData.sources.youtube.success && previewData.sources.youtube.items.filter(item => item.platform !== 'YouTube').length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-purple-600 p-2 rounded-lg">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    Other Video Platforms ({previewData.sources.youtube.items.filter(item => item.platform !== 'YouTube').length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {previewData.sources.youtube.items.filter(item => item.platform !== 'YouTube').map((item) => {
                    const displayItem = getDisplayItem(item);
                    return (
                      <div key={item.id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedItems.has(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-white line-clamp-2">{displayItem.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                                  {displayItem.platform}
                                </Badge>
                                {editedItems.has(item.id) && (
                                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                                    Edited
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-3">{displayItem.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {displayItem.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(displayItem.publishedAt).toLocaleDateString()}
                                </div>
                                <a
                                  href={displayItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View Original
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => handleEditItem(displayItem)}
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteItem(item.id)}
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded p-2 text-xs">
                              <p className="text-gray-400">
                                <strong>Source:</strong> {displayItem.source.sourceName || displayItem.platform}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Empty State */}
        {!previewData && !isLoading && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-12 text-center">
              <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Preview Available</h3>
              <p className="text-gray-500 mb-6">Click "Preview Content" to see what content is available for import.</p>
              <Button
                onClick={fetchPreview}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Content
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Source Management Modal */}
        <SourceManagement 
          isOpen={showSources} 
          onClose={() => setShowSources(false)} 
        />

        {/* Content Edit Modal */}
        <ContentEditModal
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      </motion.div>
    </div>
  );
}
