"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface NewsEditorProps {
  articleId?: string;
  onSave?: (article: any) => void;
  onCancel?: () => void;
}

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  featuredImage: {
    url: string;
    alt: string;
    publicId: string;
  };
  readTime: number;
}

export function NewsEditor({ articleId, onSave, onCancel }: NewsEditorProps) {
  const [articleData, setArticleData] = useState<ArticleData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    featuredImage: {
      url: '',
      alt: '',
      publicId: ''
    },
    readTime: 1
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const categories = [
    'AI Technology',
    'Machine Learning',
    'Industry News',
    'Tutorials',
    'Research',
    'Product Updates'
  ];

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news/${articleId}`);
      if (response.ok) {
        const article = await response.json();
        setArticleData({
          title: article.title || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          category: article.category || '',
          tags: article.tags || [],
          status: article.status || 'draft',
          featuredImage: article.featuredImage || { url: '', alt: '', publicId: '' },
          readTime: article.readTime || 1
        });
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const method = articleId ? 'PUT' : 'POST';
      const url = articleId ? `/api/news/${articleId}` : '/api/news';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...articleData,
          status,
          author: {
            name: 'AInSeconds Team',
            avatar: '/images/ainseconds-avatar.svg'
          }
        })
      });

      if (response.ok) {
        const savedArticle = await response.json();
        if (onSave) {
          onSave(savedArticle);
        }
      } else {
        alert('Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setArticleData(prev => ({
          ...prev,
          featuredImage: {
            url: data.secure_url,
            alt: articleData.title || 'Article image',
            publicId: data.public_id
          }
        }));
      } else {
        const errorData = await response.json();
        alert(`Failed to upload image: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !articleData.tags.includes(newTag.trim())) {
      setArticleData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticleData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  useEffect(() => {
    const readTime = calculateReadTime(articleData.content);
    setArticleData(prev => ({ ...prev, readTime }));
  }, [articleData.content]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {articleId ? 'Edit Article' : 'Create New Article'}
          </h1>
          <p className="text-gray-400 mt-1">
            {articleData.readTime} min read • {articleData.status}
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
              <CardTitle className="text-white">Article Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter article title..."
                value={articleData.title}
                onChange={(e) => setArticleData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 text-lg"
              />
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Brief description of the article..."
                value={articleData.excerpt}
                onChange={(e) => setArticleData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose-editor">
                <ReactQuill
                  theme="snow"
                  value={articleData.content}
                  onChange={(content) => setArticleData(prev => ({ ...prev, content }))}
                  style={{
                    backgroundColor: 'rgb(51 65 85 / 0.5)',
                    color: 'white',
                    minHeight: '300px'
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {articleData.featuredImage.url ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Image
                      src={articleData.featuredImage.url}
                      alt={articleData.featuredImage.alt}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setArticleData(prev => ({ ...prev, featuredImage: { url: '', alt: '', publicId: '' } }))}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Image alt text..."
                    value={articleData.featuredImage.alt}
                    onChange={(e) => setArticleData(prev => ({
                      ...prev,
                      featuredImage: { ...prev.featuredImage, alt: e.target.value }
                    }))}
                    className="bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 mb-3">Upload featured image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-10 px-4 py-2">
                      {imageUploading ? (
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
                value={articleData.category}
                onValueChange={(value) => setArticleData(prev => ({ ...prev, category: value }))}
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
                  {articleData.tags.map((tag) => (
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
        </div>
      </div>
    </div>
  );
}
