"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Star, 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowRight,
  Shield,
  Award,
  Lightbulb,
  Target,
  Zap,
  Globe,
  BookOpen,
  Video,
  Coffee,
  Mic,
  ThumbsUp,
  Eye,
  Reply,
  Share
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");

  const communityStats = [
    { label: "Active Members", value: "15,247", icon: Users, color: "text-blue-400" },
    { label: "Daily Discussions", value: "1,200+", icon: MessageSquare, color: "text-green-400" },
    { label: "Success Stories", value: "3,500+", icon: TrendingUp, color: "text-purple-400" },
    { label: "Expert Mentors", value: "150+", icon: Award, color: "text-yellow-400" }
  ];

  const experts = [
    {
      name: "Dr. Sarah Chen",
      title: "AI Research Director",
      company: "TechCorp",
      avatar: "/api/placeholder/64/64",
      expertise: ["Machine Learning", "NLP", "Computer Vision"],
      rating: 4.9,
      sessions: 250,
      badge: "Top Mentor"
    },
    {
      name: "Marcus Rodriguez",
      title: "AI Implementation Specialist",
      company: "InnovateLabs",
      avatar: "/api/placeholder/64/64",
      expertise: ["Business AI", "Automation", "Strategy"],
      rating: 4.8,
      sessions: 180,
      badge: "Community Leader"
    },
    {
      name: "Emily Watson",
      title: "Data Science Manager",
      company: "DataFlow Inc",
      avatar: "/api/placeholder/64/64",
      expertise: ["Data Analytics", "Predictive Models", "AI Ethics"],
      rating: 4.9,
      sessions: 320,
      badge: "Expert Contributor"
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "How to implement AI chatbots for small businesses?",
      author: "John Smith",
      avatar: "/api/placeholder/40/40",
      category: "Automation",
      replies: 23,
      views: 1200,
      likes: 45,
      timeAgo: "2 hours ago",
      isHot: true,
      tags: ["chatbots", "small-business", "automation"]
    },
    {
      id: 2,
      title: "Best practices for AI data privacy and security",
      author: "Maria Garcia",
      avatar: "/api/placeholder/40/40",
      category: "Ethics & Security",
      replies: 18,
      views: 890,
      likes: 32,
      timeAgo: "4 hours ago",
      isHot: false,
      tags: ["privacy", "security", "ethics"]
    },
    {
      id: 3,
      title: "ROI calculation for AI implementation - Template included",
      author: "David Kim",
      avatar: "/api/placeholder/40/40",
      category: "Business Strategy",
      replies: 41,
      views: 2100,
      likes: 78,
      timeAgo: "6 hours ago",
      isHot: true,
      tags: ["roi", "business", "template"]
    },
    {
      id: 4,
      title: "Beginner's guide to understanding machine learning",
      author: "Lisa Chen",
      avatar: "/api/placeholder/40/40",
      category: "Learning",
      replies: 15,
      views: 650,
      likes: 28,
      timeAgo: "8 hours ago",
      isHot: false,
      tags: ["beginner", "machine-learning", "guide"]
    }
  ];

  const upcomingEvents = [
    {
      title: "AI for E-commerce: Boost Your Sales",
      date: "Tomorrow",
      time: "2:00 PM EST",
      speaker: "Dr. Sarah Chen",
      attendees: 245,
      type: "Webinar"
    },
    {
      title: "Weekly AI Q&A Session",
      date: "Friday",
      time: "11:00 AM EST",
      speaker: "Marcus Rodriguez",
      attendees: 180,
      type: "Live Q&A"
    },
    {
      title: "AI Implementation Workshop",
      date: "Next Monday",
      time: "3:00 PM EST",
      speaker: "Emily Watson",
      attendees: 95,
      type: "Workshop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 text-sm font-medium mb-6">
              👥 Join 15,000+ AI Enthusiasts
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                AI Community
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Safe Haven
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with like-minded AI enthusiasts, get expert guidance, and grow your knowledge in a supportive, judgment-free environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Join Community <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                Browse Discussions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Discussions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Recent Discussions</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Latest
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Hot
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Trending
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                            {discussion.author[0]}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-white hover:text-blue-400 cursor-pointer">
                                {discussion.title}
                              </h3>
                              {discussion.isHot && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                  HOT
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.timeAgo}</span>
                              <span>•</span>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {discussion.category}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Reply className="w-4 h-4" />
                                <span>{discussion.replies} replies</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{discussion.views} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{discussion.likes} likes</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {discussion.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Expert Mentors */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Award className="w-6 h-6 mr-2 text-yellow-400" />
                    Expert Mentors
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Get guidance from AI industry leaders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experts.slice(0, 3).map((expert, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {expert.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-white text-sm">{expert.name}</h4>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              {expert.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400">{expert.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-400">{expert.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{expert.sessions} sessions</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    View All Mentors
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-blue-400" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Join live sessions and workshops
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-white text-sm">{event.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">by {event.speaker}</span>
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            {event.attendees} attending
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
