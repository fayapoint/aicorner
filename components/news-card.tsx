"use client";

import { NewsArticle } from "@/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

export function NewsCard({ article, index = 0 }: NewsCardProps) {
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
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group h-full overflow-hidden backdrop-blur-sm">
          <div className="relative overflow-hidden">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              width={400}
              height={240}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-600/90 text-white border-0 backdrop-blur-sm">
                {article.category}
              </Badge>
            </div>

            {/* Reading Time */}
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-black/50 text-white border-gray-400/30 backdrop-blur-sm">
                <Clock className="w-3 h-3 mr-1" />
                {article.readTime} min
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-3">
              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs border-gray-600 text-gray-400 hover:border-purple-400/40 hover:text-purple-300 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-600 text-gray-400"
                    >
                      +{article.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
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

                <div className="flex items-center gap-2">
                  {article.author.avatar && (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-xs text-gray-400">{article.author.name}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
