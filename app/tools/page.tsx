"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Play,
  Download,
  Star,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Code,
  Palette,
  Target,
  Clock,
  DollarSign,
  Lightbulb,
  Settings,
  FileText,
  Image,
  Mail
} from "lucide-react";

export default function ToolsPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    revenue: "",
    employees: "",
    industry: "ecommerce"
  });

  const tools = [
    {
      id: "roi-calculator",
      title: "AI ROI Calculator",
      category: "analytics",
      description: "Calculate potential savings and ROI from AI implementation",
      icon: Calculator,
      gradient: "from-green-500 to-emerald-500",
      users: "25,000+",
      rating: 4.9,
      interactive: true,
      demo: true
    },
    {
      id: "content-generator",
      title: "AI Content Generator",
      category: "content",
      description: "Generate professional content for social media, blogs, and marketing",
      icon: Brain,
      gradient: "from-blue-500 to-cyan-500",
      users: "50,000+",
      rating: 4.8,
      interactive: true,
      demo: true
    },
    {
      id: "chatbot-builder",
      title: "Chatbot Builder",
      category: "automation",
      description: "Create intelligent chatbots without coding",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500",
      users: "15,000+",
      rating: 4.7,
      interactive: true,
      demo: true
    },
    {
      id: "seo-analyzer",
      title: "SEO Analyzer",
      category: "marketing",
      description: "Analyze and optimize your website's SEO performance",
      icon: Globe,
      gradient: "from-orange-500 to-red-500",
      users: "30,000+",
      rating: 4.9,
      interactive: true,
      demo: false
    },
    {
      id: "email-optimizer",
      title: "Email Subject Optimizer",
      category: "marketing",
      description: "Optimize email subject lines for better open rates",
      icon: Mail,
      gradient: "from-teal-500 to-blue-500",
      users: "20,000+",
      rating: 4.6,
      interactive: true,
      demo: true
    },
    {
      id: "image-generator",
      title: "AI Image Generator",
      category: "design",
      description: "Create professional images and graphics with AI",
      icon: Image,
      gradient: "from-pink-500 to-rose-500",
      users: "40,000+",
      rating: 4.8,
      interactive: true,
      demo: false
    }
  ];

  const categories = [
    { id: "all", name: "All Tools", count: tools.length },
    { id: "analytics", name: "Analytics", count: tools.filter(t => t.category === "analytics").length },
    { id: "content", name: "Content", count: tools.filter(t => t.category === "content").length },
    { id: "automation", name: "Automation", count: tools.filter(t => t.category === "automation").length },
    { id: "marketing", name: "Marketing", count: tools.filter(t => t.category === "marketing").length },
    { id: "design", name: "Design", count: tools.filter(t => t.category === "design").length }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = tools.filter(tool => 
    selectedCategory === "all" || tool.category === selectedCategory
  );

  const calculateROI = () => {
    const revenue = parseFloat(calculatorInputs.revenue) || 0;
    const employees = parseFloat(calculatorInputs.employees) || 0;
    
    // Simple ROI calculation based on industry averages
    const baseMultiplier = calculatorInputs.industry === "ecommerce" ? 0.25 : 
                          calculatorInputs.industry === "service" ? 0.20 : 0.15;
    
    const monthlySavings = (revenue * baseMultiplier) + (employees * 500);
    const annualSavings = monthlySavings * 12;
    const implementationCost = 5000; // Average implementation cost
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100;
    
    return {
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      roi: Math.round(roi)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🛠️ Free AI Tools - No Signup Required
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
                Free AI Tools
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Try Before You Buy
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the power of AI with our collection of free tools. No registration required - just instant results.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/tools-dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Try Tools Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                  View All Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{tool.rating}</span>
                        </div>
                      </div>
                      
                      <CardDescription className="text-gray-300">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{tool.users} users</span>
                        </div>
                        {tool.demo && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Live Demo
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className={`flex-1 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white`}
                          onClick={() => setActiveDemo(tool.id)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Try Now
                        </Button>
                        {tool.interactive && (
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      {activeDemo && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="py-16 bg-slate-800/50"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white">
                Interactive Demo: {tools.find(t => t.id === activeDemo)?.title}
              </h3>
              <Button
                variant="outline"
                onClick={() => setActiveDemo(null)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Close Demo
              </Button>
            </div>

            {activeDemo === "roi-calculator" && (
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Calculator className="w-8 h-8 mr-3 text-green-400" />
                    AI ROI Calculator
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Calculate your potential savings from AI implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Monthly Revenue ($)
                        </label>
                        <input
                          type="number"
                          placeholder="50000"
                          value={calculatorInputs.revenue}
                          onChange={(e) => setCalculatorInputs({...calculatorInputs, revenue: e.target.value})}
                          className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Number of Employees
                        </label>
                        <input
                          type="number"
                          placeholder="25"
                          value={calculatorInputs.employees}
                          onChange={(e) => setCalculatorInputs({...calculatorInputs, employees: e.target.value})}
                          className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Industry Type
                        </label>
                        <select
                          value={calculatorInputs.industry}
                          onChange={(e) => setCalculatorInputs({...calculatorInputs, industry: e.target.value})}
                          className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="ecommerce">E-commerce</option>
                          <option value="service">Service Business</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-white mb-6">Projected Results</h4>
                      {calculatorInputs.revenue && calculatorInputs.employees ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Monthly Savings:</span>
                            <span className="text-2xl font-bold text-green-400">
                              ${calculateROI().monthlySavings.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Annual Savings:</span>
                            <span className="text-2xl font-bold text-green-400">
                              ${calculateROI().annualSavings.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">ROI:</span>
                            <span className="text-2xl font-bold text-green-400">
                              {calculateROI().roi}%
                            </span>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-600">
                            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                              Get Detailed Report
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400">Enter your details to see projected results</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeDemo === "content-generator" && (
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Brain className="w-8 h-8 mr-3 text-blue-400" />
                    AI Content Generator
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Generate professional content for your business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Content Type
                        </label>
                        <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Social Media Post</option>
                          <option>Email Subject Line</option>
                          <option>Product Description</option>
                          <option>Blog Title</option>
                          <option>Ad Copy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Topic/Keywords
                        </label>
                        <input
                          type="text"
                          placeholder="AI for small businesses"
                          className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tone
                        </label>
                        <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Professional</option>
                          <option>Casual</option>
                          <option>Friendly</option>
                          <option>Authoritative</option>
                          <option>Playful</option>
                        </select>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                        Generate Content
                      </Button>
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-white mb-4">Generated Content</h4>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                        <p className="text-white">
                          "🚀 Transform your small business with AI! Discover how artificial intelligence can automate tasks, boost productivity, and drive growth. Start your AI journey today and stay ahead of the competition! #AIForBusiness #SmallBusiness #Innovation"
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeDemo === "chatbot-builder" && (
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <MessageSquare className="w-8 h-8 mr-3 text-purple-400" />
                    Chatbot Builder
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Create intelligent chatbots without coding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Business Type
                        </label>
                        <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>E-commerce Store</option>
                          <option>Restaurant</option>
                          <option>Real Estate</option>
                          <option>Healthcare</option>
                          <option>Service Business</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Primary Goal
                        </label>
                        <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>Customer Support</option>
                          <option>Lead Generation</option>
                          <option>Appointment Booking</option>
                          <option>Product Recommendations</option>
                          <option>FAQ Automation</option>
                        </select>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Build Chatbot
                      </Button>
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-white mb-4">Chatbot Preview</h4>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-3">
                        <div className="bg-purple-500 text-white p-3 rounded-lg max-w-xs">
                          Hi! I'm your AI assistant. How can I help you today?
                        </div>
                        <div className="bg-slate-700 text-white p-3 rounded-lg max-w-xs ml-auto">
                          I need help with my order
                        </div>
                        <div className="bg-purple-500 text-white p-3 rounded-lg max-w-xs">
                          I'd be happy to help! Can you provide your order number?
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                          Customize
                        </Button>
                        <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🎯 Ready for More Advanced Tools?
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
                Unlock Premium
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get access to 50+ advanced AI tools, custom integrations, and priority support starting at just $3/month.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start $3 Trial <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                View All Tools
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-300">Premium Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
                <div className="text-gray-300">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-300">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
