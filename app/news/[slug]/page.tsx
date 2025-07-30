"use client";

import { useState, useEffect } from "react";
import { NewsArticle } from "@/types/news";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark,
  User,
  Tag,
  Loader2,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function NewsArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchArticle(params.slug as string);
    }
  }, [params.slug]);

  const fetchArticle = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Article not found");
        } else {
          setError("Failed to load article");
        }
        return;
      }

      const data = await response.json();
      setArticle(data);
      
      // Fetch related articles
      if (data.category) {
        fetchRelatedArticles(data.category, data._id);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category: string, excludeId: string) => {
    try {
      const response = await fetch(`/api/news?category=${category}&limit=3&status=published`);
      if (response.ok) {
        const data = await response.json();
        const articles = data.articles || [];
        setRelatedArticles(articles.filter((a: NewsArticle) => a._id !== excludeId));
      } else {
        setRelatedArticles([]);
      }
    } catch (error) {
      console.error("Error fetching related articles:", error);
      setRelatedArticles([]);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || "Article not found"}
          </h1>
          <Button onClick={() => router.push("/news")} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/news">
              <Button variant="ghost" className="text-gray-300 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>

            <div className="space-y-4">
              <Badge className="bg-purple-600 text-white">
                {article.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author?.name || 'AInSeconds Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString()} views</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleShare} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {/* Featured Image */}
          <div className="mb-8">
            <SafeImage
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Article Content */}
          <div 
            className="text-gray-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-semibold text-white">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:border-purple-400/40 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <Link key={relatedArticle._id} href={`/news/${relatedArticle.slug}`}>
                  <Card className="bg-slate-800/50 border-gray-700 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group h-full">
                    <div className="relative overflow-hidden">
                      <SafeImage
                        src={relatedArticle.featuredImage.url}
                        alt={relatedArticle.featuredImage.alt}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-purple-600/90 text-white border-0 backdrop-blur-sm">
                          {relatedArticle.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                        <span>{formatDate(relatedArticle.publishedAt || relatedArticle.createdAt)}</span>
                        <span>{relatedArticle.readTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Don't miss out on the latest AI news and insights. Explore more articles and stay ahead of the curve.
            </p>
            <Link href="/news">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Explore More Articles
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
