"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Puzzle,
  Zap,
  ArrowRight,
  Search,
  Star,
  Download,
  ExternalLink,
  CheckCircle,
  Settings,
  Globe,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  ShoppingCart,
  Users,
  Code,
  Smartphone,
  Cloud,
  Database
} from "lucide-react";

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Integrations", count: 50 },
    { id: "communication", name: "Communication", count: 12 },
    { id: "productivity", name: "Productivity", count: 15 },
    { id: "ecommerce", name: "E-commerce", count: 8 },
    { id: "analytics", name: "Analytics", count: 7 },
    { id: "development", name: "Development", count: 8 }
  ];

  const featuredIntegrations = [
    {
      id: 1,
      name: "Slack",
      description: "Bring AI-powered assistance directly to your Slack workspace",
      category: "communication",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500",
      rating: 4.9,
      installs: "25,000+",
      verified: true,
      features: ["Real-time AI responses", "Custom bot commands", "Team analytics"],
      setupTime: "5 minutes"
    },
    {
      id: 2,
      name: "Zapier",
      description: "Connect AInSeconds with 5,000+ apps through automated workflows",
      category: "productivity",
      icon: Zap,
      gradient: "from-orange-500 to-red-500",
      rating: 4.8,
      installs: "40,000+",
      verified: true,
      features: ["No-code automation", "Multi-step workflows", "Real-time triggers"],
      setupTime: "10 minutes"
    },
    {
      id: 3,
      name: "Shopify",
      description: "Enhance your e-commerce store with AI-powered product descriptions",
      category: "ecommerce",
      icon: ShoppingCart,
      gradient: "from-green-500 to-emerald-500",
      rating: 4.7,
      installs: "15,000+",
      verified: true,
      features: ["Auto product descriptions", "SEO optimization", "Bulk processing"],
      setupTime: "15 minutes"
    }
  ];

  const allIntegrations = [
    {
      name: "Discord",
      description: "AI bot for Discord servers",
      category: "communication",
      icon: MessageSquare,
      rating: 4.6,
      installs: "18,000+",
      verified: true,
      free: true
    },
    {
      name: "WordPress",
      description: "AI content generation for WordPress",
      category: "productivity",
      icon: Globe,
      rating: 4.8,
      installs: "22,000+",
      verified: true,
      free: false
    },
    {
      name: "Google Sheets",
      description: "AI data analysis in spreadsheets",
      category: "analytics",
      icon: BarChart3,
      rating: 4.7,
      installs: "12,000+",
      verified: true,
      free: true
    },
    {
      name: "Notion",
      description: "Smart content generation for Notion",
      category: "productivity",
      icon: FileText,
      rating: 4.5,
      installs: "8,500+",
      verified: false,
      free: false
    },
    {
      name: "GitHub",
      description: "AI code review and documentation",
      category: "development",
      icon: Code,
      rating: 4.9,
      installs: "14,000+",
      verified: true,
      free: true
    },
    {
      name: "Mailchimp",
      description: "AI-powered email campaigns",
      category: "communication",
      icon: Mail,
      rating: 4.4,
      installs: "9,200+",
      verified: true,
      free: false
    },
    {
      name: "Trello",
      description: "Smart project management with AI",
      category: "productivity",
      icon: Calendar,
      rating: 4.6,
      installs: "11,000+",
      verified: false,
      free: true
    },
    {
      name: "WooCommerce",
      description: "AI product optimization",
      category: "ecommerce",
      icon: ShoppingCart,
      rating: 4.3,
      installs: "7,800+",
      verified: true,
      free: false
    },
    {
      name: "Telegram",
      description: "AI chatbot for Telegram",
      category: "communication",
      icon: Smartphone,
      rating: 4.7,
      installs: "16,500+",
      verified: true,
      free: true
    }
  ];

  const developmentTools = [
    {
      name: "REST API",
      description: "Direct API integration for custom applications",
      icon: Code,
      docs: "/docs/api"
    },
    {
      name: "Webhooks",
      description: "Real-time event notifications",
      icon: Settings,
      docs: "/docs/webhooks"
    },
    {
      name: "SDKs",
      description: "Official libraries for popular languages",
      icon: Database,
      docs: "/docs/sdks"
    },
    {
      name: "GraphQL",
      description: "Flexible query language for APIs",
      icon: Globe,
      docs: "/docs/graphql"
    }
  ];

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
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Integrations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect AInSeconds with your favorite tools and platforms. Seamless integration, powerful automation.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Browse Integrations <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 px-8 py-4 text-lg rounded-xl">
                <Code className="mr-2 w-5 h-5" />
                Developer Docs
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
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Integrations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Popular integrations trusted by thousands of users worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {featuredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-indigo-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`bg-gradient-to-r ${integration.gradient} p-3 rounded-xl`}>
                        <integration.icon className="w-6 h-6 text-white" />
                      </div>
                      {integration.verified && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{integration.name}</h3>
                    <p className="text-gray-300 mb-4">{integration.description}</p>
                    
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{integration.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">{integration.installs}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {integration.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">Setup time: {integration.setupTime}</span>
                    </div>
                    
                    <Button className={`w-full bg-gradient-to-r ${integration.gradient} hover:opacity-90 text-white`}>
                      Install Integration <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* All Integrations Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">All Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allIntegrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-indigo-400/40 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <integration.icon className="w-8 h-8 text-indigo-400" />
                        <div className="flex items-center space-x-2">
                          {integration.free && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              Free
                            </Badge>
                          )}
                          {integration.verified && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {integration.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">{integration.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{integration.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{integration.installs}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-indigo-500/10 hover:border-indigo-400">
                        Install
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Developer Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {developmentTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-indigo-400/40 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <tool.icon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-indigo-500/10 hover:border-indigo-400">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Docs
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Build Custom Integrations
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Don't see your favorite tool? Build custom integrations with our comprehensive API and developer tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Building <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 px-8 py-4 text-lg rounded-xl">
                <ExternalLink className="mr-2 w-5 h-5" />
                API Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
