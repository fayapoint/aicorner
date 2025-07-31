"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Video, 
  Eye, 
  TrendingUp, 
  Users, 
  Calendar,
  Plus,
  BarChart3,
  Activity,
  Clock,
  Bot
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface DashboardStats {
  totalNews: number;
  totalVideos: number;
  totalViews: number;
  recentActivity: number;
}

interface RecentItem {
  _id: string;
  title: string;
  type: 'news' | 'video';
  createdAt: string;
  views: number;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalNews: 0,
    totalVideos: 0,
    totalViews: 0,
    recentActivity: 0
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("admin_token");

      // Fetch news stats
      const newsResponse = await fetch("/api/news?limit=1000");
      const newsData = newsResponse.ok ? await newsResponse.json() : { articles: [], totalCount: 0 };

      // Fetch video stats
      const videosResponse = await fetch("/api/videos?limit=1000");
      const videosData = videosResponse.ok ? await videosResponse.json() : { videos: [], totalCount: 0 };

      // Calculate stats
      const totalViews = [
        ...(newsData.articles || []),
        ...(videosData.videos || [])
      ].reduce((sum, item) => sum + (item.views || 0), 0);

      setStats({
        totalNews: newsData.totalCount || 0,
        totalVideos: videosData.totalCount || 0,
        totalViews,
        recentActivity: (newsData.articles || []).filter((item: any) => 
          new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length
      });

      // Combine and sort recent items
      const allItems = [
        ...(newsData.articles || []).map((item: any) => ({ ...item, type: 'news' as const })),
        ...(videosData.videos || []).map((item: any) => ({ ...item, type: 'video' as const }))
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
       .slice(0, 5);

      setRecentItems(allItems);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statCards = [
    {
      title: "Total Articles",
      value: stats.totalNews,
      icon: FileText,
      color: "from-blue-600 to-blue-700",
      href: "/admin/news"
    },
    {
      title: "Total Videos",
      value: stats.totalVideos,
      icon: Video,
      color: "from-purple-600 to-purple-700",
      href: "/admin/videos"
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "from-green-600 to-green-700",
      href: "#"
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      icon: Activity,
      color: "from-orange-600 to-orange-700",
      href: "#"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your content.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/news/new">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </Link>
            <Link href="/admin/videos/new">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                New Video
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={card.href}>
                  <Card className="bg-slate-800/50 border-gray-700 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {card.title}
                      </CardTitle>
                      <div className={`bg-gradient-to-r ${card.color} p-2 rounded-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{card.value}</div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Content
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Latest articles and videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : recentItems.length > 0 ? (
                  <div className="space-y-4">
                    {recentItems.map((item) => (
                      <div key={item._id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            item.type === 'news' 
                              ? 'bg-blue-600/20 text-blue-400' 
                              : 'bg-purple-600/20 text-purple-400'
                          }`}>
                            {item.type === 'news' ? (
                              <FileText className="w-4 h-4" />
                            ) : (
                              <Video className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-sm line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {formatDate(item.createdAt)} • {item.views} views
                            </p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          item.status === 'published' 
                            ? 'bg-green-600/20 text-green-400' 
                            : 'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No recent content</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/admin/news/new">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      <FileText className="w-4 h-4 mr-3" />
                      Create New Article
                    </Button>
                  </Link>
                  <Link href="/admin/videos/new">
                    <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      <Video className="w-4 h-4 mr-3" />
                      Upload New Video
                    </Button>
                  </Link>
                  <Link href="/admin/news">
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                      <BarChart3 className="w-4 h-4 mr-3" />
                      View Analytics
                    </Button>
                  </Link>
                  <Link href="/admin/aggregation-enhanced">
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Bot className="w-4 h-4 mr-3" />
                      Content Aggregation
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Users className="w-4 h-4 mr-3" />
                      Manage Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
