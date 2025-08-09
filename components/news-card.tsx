"use client";

import { NewsArticle } from "@/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";
import Link from "next/link";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  variant?: "default" | "featured";
}

export function NewsCard({ article, index = 0, variant = "default" }: NewsCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/news/${article.slug}`}>
        <Card
          className={
            `relative bg-gradient-to-br from-slate-900/60 to-slate-800/50 border-white/10 hover:border-fuchsia-400/30 
             transition-all duration-300 cursor-pointer group h-full overflow-hidden backdrop-blur-md 
             ${variant === 'featured' ? 'ring-1 ring-fuchsia-300/20 shadow-xl' : ''}`
          }
        >
          <div className="relative overflow-hidden">
            <SafeImage
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              width={variant === 'featured' ? 1200 : 400}
              height={variant === 'featured' ? 600 : 240}
              className={
                `w-full ${variant === 'featured' ? 'h-72 md:h-80' : 'h-48'} object-cover 
                 transition-transform duration-300 group-hover:scale-105`
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300 bg-gradient-to-r from-fuchsia-500/10 to-sky-500/10" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-fuchsia-600/90 text-white border-0 backdrop-blur-sm">
                {article.category}
              </Badge>
            </div>

            {/* Reading Time */}
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
                <Clock className="w-3 h-3 mr-1" />
                {article.readTime} min
              </Badge>
            </div>
          </div>

          <CardContent className={variant === 'featured' ? 'p-6 md:p-8' : 'p-6'}>
            <div className="space-y-3">
              {/* Title */}
              <h3 className={`${variant === 'featured' ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-white group-hover:text-fuchsia-300 transition-colors duration-300 ${variant === 'featured' ? 'line-clamp-3' : 'line-clamp-2'}`}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className={`${variant === 'featured' ? 'text-base' : 'text-sm'} text-gray-300 ${variant === 'featured' ? 'line-clamp-4' : 'line-clamp-3'} leading-relaxed`}>
                {article.excerpt}
              </p>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, variant === 'featured' ? 6 : 3).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs border-white/15 text-gray-300 hover:border-fuchsia-400/40 hover:text-fuchsia-200 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > (variant === 'featured' ? 6 : 3) && (
                    <Badge
                      variant="outline"
                      className="text-xs border-white/15 text-gray-300"
                    >
                      +{article.tags.length - (variant === 'featured' ? 6 : 3)}
                    </Badge>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {article.author?.avatar && (
                      <SafeImage
                        src={article.author.avatar}
                        alt={article.author.name || 'Author'}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-xs text-gray-400">{article.author?.name || 'AInSeconds Team'}</span>
                  </div>

                  {/* Source Attribution */}
                  {(article as any).source?.platform && (article as any).source.platform !== 'manual' && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ExternalLink className="w-3 h-3" />
                      <span className="capitalize">
                        {(article as any).source.platform === 'newsapi' ? 'NewsAPI' :
                         (article as any).source.platform === 'google-news' ? 'Google News' :
                         (article as any).source.platform === 'google-ai' ? 'Google AI' :
                         (article as any).source.platform === 'rss' ? 'RSS Feed' :
                         (article as any).source.platform}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
