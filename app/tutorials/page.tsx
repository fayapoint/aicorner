"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlayCircle, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  Video,
  Code,
  Lightbulb,
  Target,
  Zap,
  Brain,
  MessageSquare,
  Image,
  BarChart3,
  Globe,
  Shield
} from "lucide-react";

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = [
    { id: "all", name: "All Tutorials", count: 24 },
    { id: "getting-started", name: "Getting Started", count: 6 },
    { id: "chatbots", name: "Chatbots", count: 5 },
    { id: "content", name: "Content Generation", count: 4 },
    { id: "analysis", name: "Data Analysis", count: 4 },
    { id: "integrations", name: "Integrations", count: 3 },
    { id: "advanced", name: "Advanced", count: 2 }
  ];

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  const featuredTutorials = [
    {
      id: 1,
      title: "Build Your First AI Chatbot",
      description: "Learn to create an intelligent chatbot from scratch using AI Corner's API",
      category: "chatbots",
      level: "beginner",
      duration: "45 min",
      students: "12,500+",
      rating: 4.9,
      thumbnail: "/api/placeholder/400/225",
      instructor: "Sarah Chen",
      tags: ["Chatbot", "API", "Beginner"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Advanced Content Generation Pipeline",
      description: "Build a complete content generation system with custom prompts and optimization",
      category: "content",
      level: "advanced",
      duration: "90 min",
      students: "8,200+",
      rating: 4.8,
      thumbnail: "/api/placeholder/400/225",
      instructor: "Marcus Rodriguez",
      tags: ["Content", "Pipeline", "Advanced"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Sentiment Analysis for Business",
      description: "Analyze customer feedback and social media sentiment using AI",
      category: "analysis",
      level: "intermediate",
      duration: "60 min",
      students: "9,800+",
      rating: 4.7,
      thumbnail: "/api/placeholder/400/225",
      instructor: "Emily Watson",
      tags: ["Analysis", "Business", "Sentiment"],
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const allTutorials = [
    {
      id: 4,
      title: "Getting Started with AI Corner API",
      description: "Your first steps into the world of AI development",
      category: "getting-started",
      level: "beginner",
      duration: "30 min",
      students: "15,000+",
      rating: 4.9,
      type: "video",
      free: true
    },
    {
      id: 5,
      title: "Authentication and API Keys",
      description: "Secure your AI applications with proper authentication",
      category: "getting-started",
      level: "beginner",
      duration: "20 min",
      students: "11,200+",
      rating: 4.8,
      type: "video",
      free: true
    },
    {
      id: 6,
      title: "Building a Customer Support Bot",
      description: "Create an intelligent support system for your business",
      category: "chatbots",
      level: "intermediate",
      duration: "75 min",
      students: "7,500+",
      rating: 4.7,
      type: "interactive",
      free: false
    },
    {
      id: 7,
      title: "Multi-language Translation App",
      description: "Build a real-time translation application",
      category: "integrations",
      level: "intermediate",
      duration: "50 min",
      students: "6,800+",
      rating: 4.6,
      type: "code",
      free: false
    },
    {
      id: 8,
      title: "AI-Powered Content Optimization",
      description: "Optimize your content for better engagement using AI",
      category: "content",
      level: "intermediate",
      duration: "65 min",
      students: "5,900+",
      rating: 4.8,
      type: "interactive",
      free: false
    },
    {
      id: 9,
      title: "Advanced Prompt Engineering",
      description: "Master the art of crafting effective AI prompts",
      category: "advanced",
      level: "advanced",
      duration: "120 min",
      students: "3,200+",
      rating: 4.9,
      type: "workshop",
      free: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "interactive": return PlayCircle;
      case "code": return Code;
      case "workshop": return Users;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Tutorials</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Master AI development with our comprehensive tutorials. From beginner basics to advanced techniques.
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tutorials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  />
                </div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-400"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Tutorials</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hand-picked tutorials to accelerate your AI development journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {featuredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-orange-400/40 transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <div className={`h-48 bg-gradient-to-r ${tutorial.gradient} flex items-center justify-center`}>
                      <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{tutorial.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">{tutorial.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">by {tutorial.instructor}</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{tutorial.students}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutorial.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className={`w-full bg-gradient-to-r ${tutorial.gradient} hover:opacity-90 text-white`}>
                      Start Tutorial <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* All Tutorials Grid */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-8">All Tutorials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTutorials.map((tutorial, index) => {
                const TypeIcon = getTypeIcon(tutorial.type);
                return (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-orange-400/40 transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <TypeIcon className="w-5 h-5 text-orange-400" />
                          <div className="flex items-center space-x-2">
                            {tutorial.free && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                Free
                              </Badge>
                            )}
                            <Badge className={getLevelColor(tutorial.level)}>
                              {tutorial.level}
                            </Badge>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {tutorial.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">{tutorial.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{tutorial.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{tutorial.students}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{tutorial.rating}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-orange-500/10 hover:border-orange-400">
                          {tutorial.free ? 'Watch Free' : 'Start Learning'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600/10 to-red-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of developers mastering AI. Start with our free tutorials today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Free Tutorials <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-orange-400 text-orange-300 hover:bg-orange-500/10 px-8 py-4 text-lg rounded-xl">
                <BookOpen className="mr-2 w-5 h-5" />
                Browse All Courses
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
