"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Zap, 
  ArrowRight,
  Search,
  Filter,
  Plus,
  Bug,
  Settings,
  Shield,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Code,
  Globe,
  Users,
  Database,
  Cpu
} from "lucide-react";

export default function ChangelogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Updates", count: 45 },
    { id: "features", name: "New Features", count: 18 },
    { id: "improvements", name: "Improvements", count: 15 },
    { id: "fixes", name: "Bug Fixes", count: 8 },
    { id: "security", name: "Security", count: 4 }
  ];

  const changelogEntries = [
    {
      version: "v2.4.0",
      date: "2024-01-15",
      type: "major",
      title: "Advanced Image Generation & Multi-Modal AI",
      description: "Introducing next-generation image creation with DALL-E 3 integration and multi-modal AI capabilities.",
      changes: [
        {
          type: "feature",
          title: "DALL-E 3 Integration",
          description: "High-quality image generation with improved prompt understanding"
        },
        {
          type: "feature", 
          title: "Multi-Modal AI Chat",
          description: "Upload and analyze images within chat conversations"
        },
        {
          type: "feature",
          title: "Image Editing Tools",
          description: "In-browser image editing with AI-powered enhancements"
        },
        {
          type: "improvement",
          title: "Faster API Response Times",
          description: "40% improvement in average response times across all endpoints"
        }
      ],
      highlights: ["🎨 Advanced image generation", "🔍 Multi-modal AI", "⚡ 40% faster responses"]
    },
    {
      version: "v2.3.2",
      date: "2024-01-08",
      type: "minor",
      title: "Enhanced Security & Performance Updates",
      description: "Critical security improvements and performance optimizations for better user experience.",
      changes: [
        {
          type: "security",
          title: "Enhanced API Key Security",
          description: "Improved encryption and rotation policies for API keys"
        },
        {
          type: "improvement",
          title: "Rate Limiting Optimization",
          description: "Smarter rate limiting with burst capacity for premium users"
        },
        {
          type: "fix",
          title: "Webhook Delivery Issues",
          description: "Fixed intermittent webhook delivery failures"
        }
      ],
      highlights: ["🔒 Enhanced security", "📈 Better performance", "🔧 Bug fixes"]
    },
    {
      version: "v2.3.1",
      date: "2024-01-02",
      type: "patch",
      title: "Holiday Season Stability Improvements",
      description: "Stability improvements and bug fixes to handle increased holiday traffic.",
      changes: [
        {
          type: "improvement",
          title: "Load Balancing Improvements",
          description: "Better traffic distribution during peak usage periods"
        },
        {
          type: "fix",
          title: "Chat Completion Timeouts",
          description: "Resolved timeout issues with long-running chat completions"
        },
        {
          type: "fix",
          title: "Dashboard Loading Issues",
          description: "Fixed slow loading times in the user dashboard"
        }
      ],
      highlights: ["🚀 Better stability", "⏱️ Faster loading", "🔧 Bug fixes"]
    },
    {
      version: "v2.3.0",
      date: "2023-12-18",
      type: "major",
      title: "GPT-4 Turbo & Advanced Analytics",
      description: "Major update featuring GPT-4 Turbo integration and comprehensive usage analytics.",
      changes: [
        {
          type: "feature",
          title: "GPT-4 Turbo Support",
          description: "Access to the latest GPT-4 Turbo model with 128k context window"
        },
        {
          type: "feature",
          title: "Advanced Analytics Dashboard",
          description: "Detailed usage analytics with cost tracking and optimization suggestions"
        },
        {
          type: "feature",
          title: "Custom Model Fine-tuning",
          description: "Beta access to custom model fine-tuning for enterprise customers"
        },
        {
          type: "improvement",
          title: "Improved Error Handling",
          description: "Better error messages and automatic retry mechanisms"
        }
      ],
      highlights: ["🧠 GPT-4 Turbo", "📊 Advanced analytics", "🎯 Custom fine-tuning"]
    },
    {
      version: "v2.2.5",
      date: "2023-12-10",
      type: "minor",
      title: "Integration Marketplace Launch",
      description: "Launched the integration marketplace with 50+ pre-built integrations.",
      changes: [
        {
          type: "feature",
          title: "Integration Marketplace",
          description: "Browse and install 50+ pre-built integrations"
        },
        {
          type: "feature",
          title: "Zapier Advanced Workflows",
          description: "Support for complex multi-step Zapier automations"
        },
        {
          type: "improvement",
          title: "API Documentation Updates",
          description: "Comprehensive API documentation with interactive examples"
        }
      ],
      highlights: ["🔌 50+ integrations", "⚡ Zapier workflows", "📚 Better docs"]
    },
    {
      version: "v2.2.4",
      date: "2023-12-03",
      type: "patch",
      title: "Mobile Experience Improvements",
      description: "Enhanced mobile responsiveness and touch interactions across the platform.",
      changes: [
        {
          type: "improvement",
          title: "Mobile Dashboard Redesign",
          description: "Optimized dashboard layout for mobile devices"
        },
        {
          type: "improvement",
          title: "Touch-Friendly Controls",
          description: "Improved touch interactions for mobile users"
        },
        {
          type: "fix",
          title: "Mobile Chat Interface",
          description: "Fixed chat interface issues on smaller screens"
        }
      ],
      highlights: ["📱 Mobile optimized", "👆 Better touch controls", "💬 Improved chat"]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "improvement": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "fix": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "security": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature": return Plus;
      case "improvement": return TrendingUp;
      case "fix": return Bug;
      case "security": return Shield;
      default: return Settings;
    }
  };

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case "major": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "minor": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "patch": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Product <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Changelog</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stay up to date with the latest features, improvements, and fixes to the AI Corner platform.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Latest Updates <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg rounded-xl">
                <Star className="mr-2 w-5 h-5" />
                Subscribe to Updates
              </Button>
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
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {changelogEntries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-cyan-400/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Badge className={getVersionTypeColor(entry.type)}>
                          {entry.version}
                        </Badge>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{entry.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl text-white mb-2">{entry.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-base">
                      {entry.description}
                    </CardDescription>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {entry.highlights.map((highlight, highlightIndex) => (
                        <Badge key={highlightIndex} variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {entry.changes.map((change, changeIndex) => {
                        const TypeIcon = getTypeIcon(change.type);
                        return (
                          <div key={changeIndex} className="flex items-start space-x-4 p-4 bg-slate-900/30 rounded-lg">
                            <div className="flex-shrink-0">
                              <div className={`p-2 rounded-lg ${change.type === 'feature' ? 'bg-blue-500/20' : 
                                change.type === 'improvement' ? 'bg-green-500/20' : 
                                change.type === 'fix' ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                                <TypeIcon className={`w-4 h-4 ${change.type === 'feature' ? 'text-blue-400' : 
                                  change.type === 'improvement' ? 'text-green-400' : 
                                  change.type === 'fix' ? 'text-yellow-400' : 'text-red-400'}`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-white">{change.title}</h4>
                                <Badge className={getTypeColor(change.type)}>
                                  {change.type}
                                </Badge>
                              </div>
                              <p className="text-gray-300 text-sm">{change.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Never miss an update. Subscribe to our changelog and get notified about new features and improvements.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Subscribe to Updates <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg rounded-xl">
                <Code className="mr-2 w-5 h-5" />
                API Changelog
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
