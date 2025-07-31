"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  X, 
  Save, 
  Image as ImageIcon,
  ExternalLink,
  User,
  Tag,
  Calendar
} from "lucide-react";

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

interface ContentEditModalProps {
  item: PreviewItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedItem: PreviewItem) => void;
}

export function ContentEditModal({ item, isOpen, onClose, onSave }: ContentEditModalProps) {
  const [editedItem, setEditedItem] = useState<PreviewItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);

  const handleSave = async () => {
    if (!editedItem) return;
    
    setIsLoading(true);
    try {
      onSave(editedItem);
      onClose();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    if (!editedItem) return;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditedItem({
        ...editedItem,
        [parent]: {
          ...(editedItem as any)[parent],
          [child]: value
        }
      });
    } else {
      setEditedItem({
        ...editedItem,
        [field]: value
      });
    }
  };

  if (!isOpen || !editedItem) return null;

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
            <div>
              <h2 className="text-2xl font-bold text-white">Edit Content</h2>
              <p className="text-gray-400 mt-1">
                {editedItem.type === 'video' ? 'Video' : 'News Article'} from {editedItem.platform}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label className="text-gray-300 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Title
                </Label>
                <Input
                  value={editedItem.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white mt-2"
                  placeholder="Enter title..."
                />
              </div>

              {/* Description */}
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={editedItem.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white mt-2 min-h-[120px]"
                  placeholder="Enter description..."
                />
              </div>

              {/* Author */}
              <div>
                <Label className="text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Author
                </Label>
                <Input
                  value={editedItem.author}
                  onChange={(e) => updateField('author', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white mt-2"
                  placeholder="Enter author name..."
                />
              </div>

              {/* Published Date */}
              <div>
                <Label className="text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Published Date
                </Label>
                <Input
                  type="datetime-local"
                  value={new Date(editedItem.publishedAt).toISOString().slice(0, 16)}
                  onChange={(e) => updateField('publishedAt', new Date(e.target.value).toISOString())}
                  className="bg-gray-800 border-gray-600 text-white mt-2"
                />
              </div>
            </div>

            {/* Right Column - Media & Source */}
            <div className="space-y-6">
              {/* Thumbnail/Image */}
              {editedItem.type === 'video' && (
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Thumbnail URL
                  </Label>
                  <Input
                    value={editedItem.thumbnail || ''}
                    onChange={(e) => updateField('thumbnail', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white mt-2"
                    placeholder="Enter thumbnail URL..."
                  />
                  {editedItem.thumbnail && (
                    <div className="mt-3">
                      <img
                        src={editedItem.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded border border-gray-600"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Original URL */}
              <div>
                <Label className="text-gray-300 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Original URL
                </Label>
                <Input
                  value={editedItem.url}
                  onChange={(e) => updateField('url', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white mt-2"
                  placeholder="Enter original URL..."
                />
                {editedItem.url && (
                  <a
                    href={editedItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm mt-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Original
                  </a>
                )}
              </div>

              {/* Source Information */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-semibold mb-3">Source Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">Platform:</span>
                    <span className="text-white ml-2">{editedItem.platform}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Source Name:</span>
                    <Input
                      value={editedItem.source.sourceName || editedItem.source.channelTitle || ''}
                      onChange={(e) => updateField('source.sourceName', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white mt-1 text-sm"
                      placeholder="Enter source name..."
                    />
                  </div>
                  <div>
                    <span className="text-gray-400">API ID:</span>
                    <span className="text-white ml-2 font-mono text-xs">{editedItem.source.apiId}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Original URL:</span>
                    <a
                      href={editedItem.source.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 ml-2 text-xs break-all"
                    >
                      {editedItem.source.originalUrl}
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Fields for News */}
              {editedItem.type === 'news' && (
                <div>
                  <Label className="text-gray-300">Category</Label>
                  <Input
                    value={(editedItem.data as any)?.category || 'AI Technology'}
                    onChange={(e) => updateField('data.category', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white mt-2"
                    placeholder="Enter category..."
                  />
                </div>
              )}

              {/* Additional Fields for Videos */}
              {editedItem.type === 'video' && (
                <div>
                  <Label className="text-gray-300">Category</Label>
                  <Input
                    value={(editedItem.data as any)?.category || 'AI Technology'}
                    onChange={(e) => updateField('data.category', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white mt-2"
                    placeholder="Enter category..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
