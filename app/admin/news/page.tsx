"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  MoreHorizontal,
  FileText,
  Star,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SafeImage } from "@/components/safe-image";
import { NewsArticle } from "@/types/news";

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, selectedStatus, currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        sortBy: "createdAt",
        sortOrder: "desc"
      });

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      if (selectedStatus !== "all") {
        params.append("status", selectedStatus);
      }

      const response = await fetch(`/api/news?${params}`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      } else {
        console.error('Failed to fetch articles:', response.status);
        setArticles([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/news-single?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchArticles();
      } else {
        alert("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article");
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFeaturePageName = (order: number | undefined) => {
    if (!order) return null;
    const featurePages = {
      1: "Homepage Hero",
      2: "Homepage Secondary", 
      3: "Homepage Tertiary",
      4: "Featured Section #1",
      5: "Featured Section #2",
      6: "Featured Section #3"
    };
    return featurePages[order as keyof typeof featurePages] || `Feature Page ${order}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">News Articles</h1>
            <p className="text-gray-400 mt-2">Manage your news articles and content</p>
          </div>
          <Link href="/admin/news/new">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {["all", "published", "draft"].map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className={
                      selectedStatus === status
                        ? "bg-purple-600 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-400">
                {totalCount} articles total
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-24 h-16 bg-gray-700 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-gray-700 hover:border-purple-400/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                        {article.featuredImage?.url ? (
                          <SafeImage
                            src={article.featuredImage.url}
                            alt={article.featuredImage.alt || 'Article image'}
                            width={96}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white line-clamp-1 mb-2">
                              {article.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{article.author?.name || 'AInSeconds Team'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(article.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{article.views} views</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4 flex-wrap">
                            <Badge
                              className={
                                article.status === "published"
                                  ? "bg-green-600/20 text-green-400 border-green-600/30"
                                  : "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                              }
                            >
                              {article.status}
                            </Badge>
                            
                            {/* Featured status indicator */}
                            {article.featured?.isFeatured && (
                              <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                Featured
                              </Badge>
                            )}
                            
                            {/* Feature page indicator */}
                            {article.featured?.isFeatured && article.featured?.order && (
                              <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30 flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                {getFeaturePageName(article.featured.order)}
                              </Badge>
                            )}
                            
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              {article.category}
                            </Badge>
                            <div className="flex gap-1">
                              <Link href={`/news/${article.slug}`} target="_blank">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/news/${article._id}/edit`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(article._id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Articles Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first article."
                }
              </p>
              <Link href="/admin/news/new">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
