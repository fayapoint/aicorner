"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  MessageSquare, 
  FileText, 
  Image, 
  Mail, 
  Calculator,
  Users,
  BookOpen,
  Video,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Clock,
  Zap,
  Shield,
  Heart,
  Lightbulb,
  Target,
  TrendingUp,
  Globe,
  Smartphone,
  Code,
  BarChart3,
  Headphones,
  PenTool,
  Search,
  Bot,
  Workflow,
  Database,
  Settings,
  Palette,
  Camera,
  Mic,
  FileVideo,
  Layers,
  GitBranch,
  Cpu,
  Network,
  Lock,
  DollarSign,
  Calendar,
  Phone,
  ShoppingCart,
  Truck,
  CreditCard,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";

export default function GrowthTierPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const growthTools = [
    // All Starter Tools Plus Advanced Ones
    {
      id: 1,
      name: "Advanced AI Copywriter",
      description: "Professional copywriting for sales pages, ads, and marketing campaigns",
      category: "content",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Sales copy", "Ad campaigns", "Email sequences", "Landing pages", "A/B testing"],
      tutorial: "15-min masterclass",
      difficulty: "Intermediate",
      popular: true,
      roi: "300% conversion boost"
    },
    {
      id: 2,
      name: "Multi-Platform Chatbot",
      description: "Deploy intelligent chatbots across WhatsApp, Facebook, Instagram, and web",
      category: "automation",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-500",
      features: ["Multi-platform", "Advanced NLP", "CRM integration", "Analytics", "Lead scoring"],
      tutorial: "20-min setup guide",
      difficulty: "Intermediate",
      popular: true,
      roi: "70% support cost reduction"
    },
    {
      id: 3,
      name: "AI Video Generator",
      description: "Create professional marketing videos with AI avatars and voiceovers",
      category: "content",
      icon: FileVideo,
      gradient: "from-purple-500 to-pink-500",
      features: ["AI avatars", "Voice synthesis", "Auto subtitles", "Brand templates", "HD export"],
      tutorial: "25-min workshop",
      difficulty: "Intermediate",
      popular: true,
      roi: "500% engagement increase"
    },
    {
      id: 4,
      name: "Smart Email Marketing",
      description: "AI-powered email campaigns with personalization and optimization",
      category: "marketing",
      icon: Mail,
      gradient: "from-orange-500 to-red-500",
      features: ["Personalization", "Send time optimization", "Subject line testing", "Segmentation", "Automation"],
      tutorial: "18-min deep dive",
      difficulty: "Intermediate",
      popular: false,
      roi: "45% open rate improvement"
    },
    {
      id: 5,
      name: "Business Intelligence AI",
      description: "Advanced analytics and predictive insights for business decisions",
      category: "analytics",
      icon: BarChart3,
      gradient: "from-teal-500 to-blue-500",
      features: ["Predictive analytics", "Custom dashboards", "Automated reports", "Data visualization", "Forecasting"],
      tutorial: "30-min training",
      difficulty: "Intermediate",
      popular: false,
      roi: "250% better decisions"
    },
    {
      id: 6,
      name: "AI Social Media Manager",
      description: "Complete social media automation with content creation and scheduling",
      category: "marketing",
      icon: Globe,
      gradient: "from-indigo-500 to-purple-500",
      features: ["Content generation", "Optimal posting", "Hashtag research", "Competitor analysis", "Growth tracking"],
      tutorial: "22-min masterclass",
      difficulty: "Intermediate",
      popular: true,
      roi: "400% follower growth"
    },
    {
      id: 7,
      name: "Voice AI Assistant",
      description: "Custom voice assistants for customer service and internal operations",
      category: "automation",
      icon: Mic,
      gradient: "from-pink-500 to-rose-500",
      features: ["Natural speech", "Multi-language", "Custom training", "Phone integration", "Call analytics"],
      tutorial: "35-min setup",
      difficulty: "Advanced",
      popular: false,
      roi: "60% call handling efficiency"
    },
    {
      id: 8,
      name: "AI Design Studio",
      description: "Professional graphic design with AI-powered creativity tools",
      category: "design",
      icon: Palette,
      gradient: "from-yellow-500 to-orange-500",
      features: ["Logo design", "Brand assets", "Marketing materials", "Web graphics", "Print designs"],
      tutorial: "28-min creative workshop",
      difficulty: "Intermediate",
      popular: false,
      roi: "80% design cost savings"
    },
    {
      id: 9,
      name: "SEO Optimization Engine",
      description: "Complete SEO automation with content optimization and ranking tracking",
      category: "marketing",
      icon: Search,
      gradient: "from-green-600 to-teal-500",
      features: ["Content optimization", "Keyword tracking", "Competitor analysis", "Technical SEO", "Rank monitoring"],
      tutorial: "25-min SEO mastery",
      difficulty: "Intermediate",
      popular: true,
      roi: "300% organic traffic increase"
    },
    {
      id: 10,
      name: "Advanced Analytics Suite",
      description: "Comprehensive business analytics with AI-powered insights",
      category: "analytics",
      icon: PieChart,
      gradient: "from-blue-600 to-indigo-500",
      features: ["Multi-source data", "Custom metrics", "Predictive modeling", "Automated alerts", "Executive reports"],
      tutorial: "40-min analytics deep dive",
      difficulty: "Advanced",
      popular: false,
      roi: "200% data-driven decisions"
    },
    {
      id: 11,
      name: "AI Customer Support",
      description: "Intelligent customer support system with ticket routing and resolution",
      category: "automation",
      icon: Headphones,
      gradient: "from-emerald-500 to-green-600",
      features: ["Smart routing", "Auto-responses", "Sentiment analysis", "Escalation rules", "Performance metrics"],
      tutorial: "30-min support optimization",
      difficulty: "Intermediate",
      popular: false,
      roi: "50% faster resolution times"
    },
    {
      id: 12,
      name: "E-commerce AI Optimizer",
      description: "Boost online sales with AI-powered product recommendations and pricing",
      category: "business",
      icon: ShoppingCart,
      gradient: "from-violet-500 to-purple-600",
      features: ["Product recommendations", "Dynamic pricing", "Inventory optimization", "Customer segmentation", "Sales forecasting"],
      tutorial: "35-min e-commerce mastery",
      difficulty: "Advanced",
      popular: true,
      roi: "150% revenue increase"
    },
    {
      id: 13,
      name: "AI Financial Advisor",
      description: "Automated financial planning and investment recommendations",
      category: "business",
      icon: DollarSign,
      gradient: "from-red-500 to-pink-600",
      features: ["Portfolio analysis", "Risk assessment", "Investment suggestions", "Budget optimization", "Financial forecasting"],
      tutorial: "45-min financial planning",
      difficulty: "Advanced",
      popular: false,
      roi: "25% better investment returns"
    },
    {
      id: 14,
      name: "Smart Appointment System",
      description: "AI-powered scheduling with automatic booking and reminders",
      category: "automation",
      icon: Calendar,
      gradient: "from-cyan-500 to-blue-600",
      features: ["Auto-scheduling", "Smart reminders", "Calendar sync", "No-show prediction", "Resource optimization"],
      tutorial: "20-min scheduling setup",
      difficulty: "Intermediate",
      popular: false,
      roi: "40% booking efficiency"
    },
    {
      id: 15,
      name: "AI Sales Assistant",
      description: "Intelligent sales support with lead scoring and follow-up automation",
      category: "business",
      icon: Target,
      gradient: "from-amber-500 to-yellow-600",
      features: ["Lead scoring", "Follow-up automation", "Sales forecasting", "Pipeline management", "Performance tracking"],
      tutorial: "30-min sales optimization",
      difficulty: "Intermediate",
      popular: true,
      roi: "180% sales conversion"
    },
    {
      id: 16,
      name: "Content Performance Analyzer",
      description: "Track and optimize content performance across all channels",
      category: "analytics",
      icon: Activity,
      gradient: "from-lime-500 to-green-600",
      features: ["Multi-channel tracking", "Performance metrics", "Content optimization", "Trend analysis", "ROI measurement"],
      tutorial: "25-min content analytics",
      difficulty: "Intermediate",
      popular: false,
      roi: "120% content effectiveness"
    },
    {
      id: 17,
      name: "AI Workflow Automator",
      description: "Automate complex business workflows with intelligent decision making",
      category: "automation",
      icon: Workflow,
      gradient: "from-indigo-600 to-purple-700",
      features: ["Visual workflow builder", "Smart triggers", "Conditional logic", "Integration hub", "Performance monitoring"],
      tutorial: "40-min automation mastery",
      difficulty: "Advanced",
      popular: true,
      roi: "300% process efficiency"
    },
    {
      id: 18,
      name: "Smart Inventory Manager",
      description: "AI-powered inventory optimization with demand forecasting",
      category: "business",
      icon: Database,
      gradient: "from-teal-600 to-cyan-700",
      features: ["Demand forecasting", "Auto-reordering", "Supplier optimization", "Cost analysis", "Stock alerts"],
      tutorial: "35-min inventory optimization",
      difficulty: "Advanced",
      popular: false,
      roi: "30% inventory cost reduction"
    },
    {
      id: 19,
      name: "AI Brand Monitor",
      description: "Monitor brand mentions and sentiment across the internet",
      category: "marketing",
      icon: Shield,
      gradient: "from-rose-500 to-red-600",
      features: ["Mention tracking", "Sentiment analysis", "Competitor monitoring", "Crisis alerts", "Reputation reports"],
      tutorial: "20-min brand monitoring",
      difficulty: "Intermediate",
      popular: false,
      roi: "90% faster crisis response"
    },
    {
      id: 20,
      name: "Customer Journey Mapper",
      description: "Visualize and optimize customer journeys with AI insights",
      category: "analytics",
      icon: GitBranch,
      gradient: "from-purple-600 to-pink-700",
      features: ["Journey visualization", "Touchpoint analysis", "Conversion optimization", "Behavior prediction", "Experience scoring"],
      tutorial: "30-min journey optimization",
      difficulty: "Advanced",
      popular: false,
      roi: "200% customer experience improvement"
    }
  ];

  const categories = [
    { id: "all", name: "All Tools", count: growthTools.length },
    { id: "content", name: "Content Creation", count: growthTools.filter(t => t.category === "content").length },
    { id: "marketing", name: "Marketing", count: growthTools.filter(t => t.category === "marketing").length },
    { id: "automation", name: "Automation", count: growthTools.filter(t => t.category === "automation").length },
    { id: "business", name: "Business", count: growthTools.filter(t => t.category === "business").length },
    { id: "analytics", name: "Analytics", count: growthTools.filter(t => t.category === "analytics").length },
    { id: "design", name: "Design", count: growthTools.filter(t => t.category === "design").length }
  ];

  const filteredTools = growthTools.filter(tool => 
    activeCategory === "all" || tool.category === activeCategory
  );

  const growthBenefits = [
    {
      title: "Scale Your Business",
      description: "Advanced tools designed to grow your business and increase revenue",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Priority Support",
      description: "Get faster responses and dedicated support from our AI experts",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Advanced Integrations",
      description: "Connect with your existing tools and create powerful workflows",
      icon: Network,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "ROI Optimization",
      description: "Tools specifically designed to maximize your return on investment",
      icon: Target,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🚀 Scale Your Business with AI
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Growth Plan
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                $47/Month
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Unlock 40+ advanced AI tools designed for growing businesses. Automate operations, boost sales, and scale efficiently.
              <span className="text-blue-300 font-semibold"> Everything in Starter plus powerful business tools.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Upgrade to Growth <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                Compare Plans
              </Button>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">40+</div>
                  <div className="text-gray-300 text-sm">Advanced Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">300%</div>
                  <div className="text-gray-300 text-sm">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$50k+</div>
                  <div className="text-gray-300 text-sm">Annual Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">24/7</div>
                  <div className="text-gray-300 text-sm">Priority Support</div>
                </div>
              </div>
              <p className="text-gray-300 text-center">
                Most businesses see ROI within 30 days • Includes everything from Starter plan
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Upgrade to Growth */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Built for Growing Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Growth plan provides everything you need to scale your business with AI automation and advanced tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {growthBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full text-center">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                      <p className="text-gray-300">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Category Filter */}
      <section className="py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced AI Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                40+ Advanced AI Tools
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade AI tools designed to scale your business and maximize ROI
            </p>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTools.slice(0, 12).map((tool, index) => {
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
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex gap-2">
                          {tool.popular && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              Popular
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            {tool.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <CardTitle className="text-xl text-white">{tool.name}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Video className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">{tool.tutorial}</span>
                          </div>
                          <div className="text-green-400 font-semibold">{tool.roi}</div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {tool.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-3 h-3 text-blue-400 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                            {tool.features.length > 3 && (
                              <li className="text-sm text-gray-500">
                                +{tool.features.length - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className={`flex-1 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white`}>
                          <Play className="w-4 h-4 mr-2" />
                          Launch Tool
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredTools.length > 12 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10">
                View All {filteredTools.length} Tools
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Calculate Your ROI
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                See how much the Growth plan can save your business. Most clients see 300%+ ROI within 90 days.
              </p>

              <div className="space-y-6">
                {[
                  { metric: "Average Time Saved", value: "25 hours/week", desc: "Automation handles repetitive tasks" },
                  { metric: "Cost Reduction", value: "40-60%", desc: "Reduce operational and marketing costs" },
                  { metric: "Revenue Increase", value: "150%+", desc: "Better leads, sales, and customer retention" },
                  { metric: "Payback Period", value: "30 days", desc: "Most businesses break even in first month" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-white">{item.metric}:</h3>
                        <span className="text-2xl font-bold text-blue-400">{item.value}</span>
                      </div>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Growth Plan ROI Calculator</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Revenue ($)
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Size
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry
                  </label>
                  <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>E-commerce</option>
                    <option>SaaS</option>
                    <option>Professional Services</option>
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                  </select>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Projected Annual Savings</h4>
                  <div className="text-4xl font-bold text-green-400 mb-2">$127,000</div>
                  <div className="text-sm text-gray-300 mb-4">ROI: 2,700% annually</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Time savings:</span>
                      <span className="text-white">$78,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Cost reduction:</span>
                      <span className="text-white">$32,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Revenue increase:</span>
                      <span className="text-white">$17,000</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Get Detailed ROI Report
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Growth Plan Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how businesses like yours have scaled with our Growth plan tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                company: "TechFlow Marketing",
                owner: "João Silva",
                industry: "Marketing Agency",
                results: { revenue: "+65%", costs: "-30%", time: "25h/week saved" },
                story: "The custom AI solutions saved my company $50k annually and allowed us to take on 150% more clients. The team understood exactly what we needed.",
                tools: ["AI Copywriter", "Multi-Platform Chatbot", "Analytics Suite"]
              },
              {
                company: "GrowthCorp Solutions",
                owner: "Maria Rodriguez",
                industry: "SaaS Company",
                results: { revenue: "+180%", costs: "-45%", time: "35h/week saved" },
                story: "The Growth plan transformed our entire sales process. We automated lead qualification and increased our conversion rate by 300%.",
                tools: ["Sales Assistant", "Email Marketing", "Customer Support AI"]
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {story.owner[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{story.company}</h3>
                        <p className="text-gray-300">{story.owner} • {story.industry}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{story.results.revenue}</div>
                        <div className="text-xs text-gray-400">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{story.results.costs}</div>
                        <div className="text-xs text-gray-400">Costs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{story.results.time}</div>
                        <div className="text-xs text-gray-400">Time Saved</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <blockquote className="text-gray-300 italic mb-6">
                      "{story.story}"
                    </blockquote>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Tools Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {story.tools.map((tool, idx) => (
                          <Badge key={idx} variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🚀 Ready to Scale Your Business?
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Upgrade to Growth
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                See Results in 30 Days
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of growing businesses using AI to scale efficiently.
              <span className="text-blue-300 font-semibold"> Most see 300%+ ROI within 90 days.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Upgrade Now - $47/month <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                Schedule Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                Instant access to all tools
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                Priority support included
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                Cancel anytime
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                30-day money-back guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
