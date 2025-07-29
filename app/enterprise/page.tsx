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
  Activity,
  Briefcase,
  Award,
  Crown,
  Gem,
  Rocket,
  Building,
  Factory,
  Cog,
  Monitor,
  Server,
  Cloud,
  Fingerprint,
  Eye,
  Radar,
  Satellite,
  Microscope,
  Atom,
  Dna,
  Beaker,
  Sparkles,
  Infinity,
  Wand2,
  Orbit,
  Hexagon,
  Triangle,
  Zap as Lightning,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Stars,
  Scale
} from "lucide-react";

export default function EnterpriseTierPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const enterpriseFeatures = [
    {
      title: "Cutting-Edge AI Technologies",
      description: "Access to the latest AI models including Veo 3, GPT-5, Claude 4, and exclusive beta technologies",
      icon: Sparkles,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Custom AI Architecture",
      description: "Dedicated AI infrastructure designed specifically for your enterprise needs",
      icon: Cpu,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Unlimited Everything",
      description: "Unlimited API calls, storage, users, and access to all current and future AI tools",
      icon: Infinity,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "24/7 Dedicated Team",
      description: "Your own team of AI specialists, engineers, and strategists available around the clock",
      icon: Users,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const cuttingEdgeTools = [
    {
      id: 1,
      name: "Veo 3 Video Generator",
      description: "Google's most advanced video generation AI - create Hollywood-quality videos from text",
      category: "video",
      icon: FileVideo,
      gradient: "from-red-600 to-pink-600",
      features: ["4K video generation", "Photorealistic quality", "Advanced physics", "Character consistency", "Scene transitions"],
      tutorial: "90-min masterclass",
      difficulty: "Enterprise",
      popular: true,
      roi: "10,000% content creation efficiency",
      exclusive: true,
      newTech: true
    },
    {
      id: 2,
      name: "GPT-5 Advanced Reasoning",
      description: "OpenAI's next-generation model with unprecedented reasoning capabilities",
      category: "language",
      icon: Brain,
      gradient: "from-purple-600 to-indigo-600",
      features: ["Advanced reasoning", "Multi-modal understanding", "Code generation", "Scientific analysis", "Creative writing"],
      tutorial: "120-min deep dive",
      difficulty: "Enterprise",
      popular: true,
      roi: "Unlimited problem solving",
      exclusive: true,
      newTech: true
    },
    {
      id: 3,
      name: "Claude 4 Enterprise",
      description: "Anthropic's most capable AI with enhanced safety and enterprise features",
      category: "language",
      icon: Shield,
      gradient: "from-blue-600 to-cyan-600",
      features: ["Constitutional AI", "Long context", "Code analysis", "Research assistance", "Safety guarantees"],
      tutorial: "75-min enterprise guide",
      difficulty: "Enterprise",
      popular: false,
      roi: "100% safe AI deployment",
      exclusive: true,
      newTech: true
    },
    {
      id: 4,
      name: "Quantum AI Optimizer",
      description: "Quantum-enhanced AI for complex optimization problems",
      category: "quantum",
      icon: Atom,
      gradient: "from-cyan-600 to-blue-600",
      features: ["Quantum algorithms", "Complex optimization", "Financial modeling", "Supply chain", "Resource allocation"],
      tutorial: "180-min quantum workshop",
      difficulty: "Enterprise",
      popular: false,
      roi: "1000% optimization efficiency",
      exclusive: true,
      newTech: true
    },
    {
      id: 5,
      name: "Neural Architecture Search",
      description: "Automatically design optimal neural networks for your specific use cases",
      category: "development",
      icon: Network,
      gradient: "from-green-600 to-teal-600",
      features: ["Auto architecture design", "Performance optimization", "Hardware adaptation", "Efficiency tuning", "Custom deployment"],
      tutorial: "150-min architecture deep dive",
      difficulty: "Enterprise",
      popular: false,
      roi: "500% model performance",
      exclusive: true,
      newTech: true
    },
    {
      id: 6,
      name: "Multimodal AI Fusion",
      description: "Combine text, image, video, and audio AI in unified workflows",
      category: "multimodal",
      icon: Layers,
      gradient: "from-purple-600 to-pink-600",
      features: ["Cross-modal understanding", "Unified processing", "Content synthesis", "Real-time analysis", "Custom pipelines"],
      tutorial: "100-min multimodal mastery",
      difficulty: "Enterprise",
      popular: true,
      roi: "Unlimited creative possibilities",
      exclusive: true,
      newTech: true
    },
    {
      id: 7,
      name: "AI-Powered Digital Twin",
      description: "Create digital twins of your entire business operations",
      category: "simulation",
      icon: Orbit,
      gradient: "from-indigo-600 to-purple-600",
      features: ["Business simulation", "Predictive modeling", "Scenario planning", "Risk analysis", "Optimization recommendations"],
      tutorial: "200-min digital twin workshop",
      difficulty: "Enterprise",
      popular: false,
      roi: "50% operational efficiency",
      exclusive: true,
      newTech: true
    },
    {
      id: 8,
      name: "Autonomous AI Agents",
      description: "Deploy fully autonomous AI agents that can complete complex tasks independently",
      category: "agents",
      icon: Bot,
      gradient: "from-orange-600 to-red-600",
      features: ["Task automation", "Decision making", "Learning adaptation", "Multi-agent coordination", "Goal achievement"],
      tutorial: "120-min agent deployment",
      difficulty: "Enterprise",
      popular: true,
      roi: "Unlimited task automation",
      exclusive: true,
      newTech: true
    },
    {
      id: 9,
      name: "Synthetic Data Generator",
      description: "Generate unlimited high-quality synthetic data for training and testing",
      category: "data",
      icon: Database,
      gradient: "from-teal-600 to-cyan-600",
      features: ["Privacy-preserving", "Unlimited generation", "Custom distributions", "Quality validation", "Bias mitigation"],
      tutorial: "90-min data generation",
      difficulty: "Enterprise",
      popular: false,
      roi: "Infinite training data",
      exclusive: true,
      newTech: true
    },
    {
      id: 10,
      name: "Real-Time AI Inference Engine",
      description: "Ultra-low latency AI inference for real-time applications",
      category: "infrastructure",
      icon: Lightning,
      gradient: "from-yellow-600 to-orange-600",
      features: ["Sub-millisecond latency", "Edge deployment", "Auto-scaling", "Load balancing", "Performance monitoring"],
      tutorial: "60-min inference optimization",
      difficulty: "Enterprise",
      popular: false,
      roi: "Real-time AI capabilities",
      exclusive: true,
      newTech: true
    },
    {
      id: 11,
      name: "AI Ethics & Governance Platform",
      description: "Comprehensive AI governance, ethics monitoring, and compliance management",
      category: "governance",
      icon: Scale,
      gradient: "from-blue-600 to-indigo-600",
      features: ["Bias detection", "Fairness monitoring", "Compliance tracking", "Audit trails", "Risk assessment"],
      tutorial: "45-min governance setup",
      difficulty: "Enterprise",
      popular: false,
      roi: "100% ethical AI deployment",
      exclusive: true,
      newTech: false
    },
    {
      id: 12,
      name: "Federated Learning Network",
      description: "Train AI models across distributed data without centralizing sensitive information",
      category: "privacy",
      icon: Network,
      gradient: "from-green-600 to-emerald-600",
      features: ["Privacy preservation", "Distributed training", "Secure aggregation", "Cross-organization learning", "Compliance ready"],
      tutorial: "180-min federated learning",
      difficulty: "Enterprise",
      popular: false,
      roi: "Secure collaborative AI",
      exclusive: true,
      newTech: true
    }
  ];

  const categories = [
    { id: "all", name: "All Technologies", count: cuttingEdgeTools.length },
    { id: "video", name: "Video Generation", count: cuttingEdgeTools.filter(t => t.category === "video").length },
    { id: "language", name: "Language Models", count: cuttingEdgeTools.filter(t => t.category === "language").length },
    { id: "quantum", name: "Quantum AI", count: cuttingEdgeTools.filter(t => t.category === "quantum").length },
    { id: "development", name: "AI Development", count: cuttingEdgeTools.filter(t => t.category === "development").length },
    { id: "multimodal", name: "Multimodal AI", count: cuttingEdgeTools.filter(t => t.category === "multimodal").length },
    { id: "simulation", name: "Simulation", count: cuttingEdgeTools.filter(t => t.category === "simulation").length },
    { id: "agents", name: "AI Agents", count: cuttingEdgeTools.filter(t => t.category === "agents").length },
    { id: "infrastructure", name: "Infrastructure", count: cuttingEdgeTools.filter(t => t.category === "infrastructure").length }
  ];

  const filteredTools = cuttingEdgeTools.filter(tool => 
    activeCategory === "all" || tool.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🌟 The Ultimate AI Experience
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Enterprise Plan
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                $497/Month
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Access 120+ cutting-edge AI technologies including Veo 3, GPT-5, and exclusive beta tools. Built for enterprises that demand the absolute best.
              <span className="text-yellow-300 font-semibold"> Everything in Professional plus future AI technologies.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Contact Enterprise Sales <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-yellow-400 text-yellow-300 hover:bg-yellow-500/10 px-8 py-4 text-lg rounded-xl">
                Schedule Demo
              </Button>
            </div>

            {/* Enterprise Value Proposition */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">120+</div>
                  <div className="text-gray-300 text-sm">AI Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">Unlimited</div>
                  <div className="text-gray-300 text-sm">Usage & Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">Custom</div>
                  <div className="text-gray-300 text-sm">Architecture</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">24/7</div>
                  <div className="text-gray-300 text-sm">Dedicated Team</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">Future</div>
                  <div className="text-gray-300 text-sm">AI Access</div>
                </div>
              </div>
              <p className="text-gray-300 text-center">
                The most advanced AI platform on Earth • Custom pricing available for large enterprises
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Features */}
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
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Enterprise-Exclusive Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Capabilities that only the Enterprise plan can provide - built for organizations that need the absolute cutting edge
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-yellow-400/40 transition-all duration-300 h-full text-center">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
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
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cutting-Edge AI Technologies */}
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
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Cutting-Edge AI Technologies
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access the most advanced AI technologies on the planet, including exclusive beta access to future AI models
            </p>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTools.slice(0, 9).map((tool, index) => {
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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-yellow-400/40 transition-all duration-300 h-full relative">
                    <div className="absolute -top-3 -right-3 flex gap-2">
                      {tool.newTech && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          NEW
                        </Badge>
                      )}
                      {tool.exclusive && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          EXCLUSIVE
                        </Badge>
                      )}
                    </div>

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
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
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
                            <Video className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300">{tool.tutorial}</span>
                          </div>
                          <div className="text-green-400 font-semibold text-xs">{tool.roi}</div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Capabilities:</h4>
                          <ul className="space-y-1">
                            {tool.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                            {tool.features.length > 3 && (
                              <li className="text-sm text-gray-500">
                                +{tool.features.length - 3} more capabilities
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className={`flex-1 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white`}>
                          <Play className="w-4 h-4 mr-2" />
                          Access Now
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredTools.length > 9 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-yellow-400 text-yellow-300 hover:bg-yellow-500/10">
                View All {filteredTools.length} Technologies
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Veo 3 Spotlight */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-medium mb-6">
                🎬 Exclusive Access: Google Veo 3
              </Badge>

              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Hollywood-Quality
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Video Generation
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                Be among the first to access Google's revolutionary Veo 3 video generation AI. Create photorealistic videos that rival Hollywood productions, directly from text descriptions.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: FileVideo,
                    title: "4K Video Generation",
                    desc: "Create stunning 4K videos up to 2 minutes long",
                    highlight: "Industry-leading quality"
                  },
                  {
                    icon: Sparkles,
                    title: "Photorealistic Quality",
                    desc: "Indistinguishable from real footage",
                    highlight: "Hollywood-grade realism"
                  },
                  {
                    icon: Layers,
                    title: "Advanced Physics",
                    desc: "Realistic lighting, shadows, and movement",
                    highlight: "Perfect physics simulation"
                  },
                  {
                    icon: Users,
                    title: "Character Consistency",
                    desc: "Maintain character appearance across scenes",
                    highlight: "Seamless storytelling"
                  }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                            {item.highlight}
                          </Badge>
                        </div>
                        <p className="text-gray-300">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Veo 3 Demo Request</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Video Concept
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the video you want to create..."
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration
                    </label>
                    <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option>30 seconds</option>
                      <option>1 minute</option>
                      <option>2 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Style
                    </label>
                    <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option>Cinematic</option>
                      <option>Documentary</option>
                      <option>Animation</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Estimated Output</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Resolution:</span>
                      <span className="text-white font-semibold">4K (3840x2160)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Frame Rate:</span>
                      <span className="text-white font-semibold">60 FPS</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Generation Time:</span>
                      <span className="text-white font-semibold">~5 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Quality Score:</span>
                      <span className="text-green-400 font-semibold">99.8% Photorealistic</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                  <Play className="w-5 h-5 mr-2" />
                  Generate Video with Veo 3
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Support */}
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
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                White-Glove Enterprise Support
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your dedicated team of AI specialists, available 24/7 to ensure your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Dedicated AI Team",
                description: "Your own team of 5+ AI specialists assigned exclusively to your account",
                icon: Users,
                features: ["AI Strategist", "Technical Lead", "Implementation Specialist", "Data Scientist", "Success Manager"]
              },
              {
                title: "24/7 Priority Support",
                description: "Round-the-clock support with guaranteed response times",
                icon: Clock,
                features: ["< 15 min response", "Direct phone line", "Emergency escalation", "Weekend support", "Holiday coverage"]
              },
              {
                title: "Custom Development",
                description: "Unlimited custom AI development included in your plan",
                icon: Code,
                features: ["Custom models", "API development", "Integration work", "Performance optimization", "Security hardening"]
              }
            ].map((support, index) => {
              const IconComponent = support.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{support.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {support.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {support.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Enterprise Success Guarantee</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                <div className="text-gray-300 text-sm">Success Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">90 Days</div>
                <div className="text-gray-300 text-sm">Implementation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">500%+</div>
                <div className="text-gray-300 text-sm">Average ROI</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">$1M+</div>
                <div className="text-gray-300 text-sm">Avg Annual Value</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              We guarantee measurable results within 90 days or we'll work for free until you achieve them.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
              Schedule Enterprise Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🌟 Ready for the Ultimate AI Experience?
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Transform Your Enterprise
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                With Cutting-Edge AI
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the world's most innovative enterprises using our platform. Get exclusive access to Veo 3, GPT-5, and technologies that don't exist anywhere else.
              <span className="text-yellow-300 font-semibold"> The future of AI is here.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Contact Enterprise Sales <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-yellow-400 text-yellow-300 hover:bg-yellow-500/10 px-8 py-4 text-lg rounded-xl">
                Schedule Private Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                120+ cutting-edge AI tools
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                Exclusive Veo 3 access
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                Dedicated AI team
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                100% success guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
