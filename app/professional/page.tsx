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
  Beaker
} from "lucide-react";

export default function ProfessionalTierPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const professionalFeatures = [
    {
      title: "Custom AI Development",
      description: "Bespoke AI solutions tailored to your specific business needs",
      icon: Code,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "White-Label Solutions",
      description: "Rebrand and resell our AI tools under your own company name",
      icon: Crown,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Enterprise Integration",
      description: "Seamless integration with enterprise systems and workflows",
      icon: Network,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Dedicated AI Specialist",
      description: "Personal AI expert for strategy, implementation, and optimization",
      icon: Users,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const exclusiveTools = [
    {
      id: 1,
      name: "AI Model Training Platform",
      description: "Train custom AI models on your proprietary data",
      category: "development",
      icon: Brain,
      gradient: "from-purple-600 to-pink-600",
      features: ["Custom datasets", "Model fine-tuning", "Performance optimization", "Deployment automation", "Version control"],
      tutorial: "60-min deep dive",
      difficulty: "Expert",
      popular: true,
      roi: "500% competitive advantage",
      exclusive: true
    },
    {
      id: 2,
      name: "Enterprise Chatbot Orchestrator",
      description: "Manage multiple AI agents across departments and channels",
      category: "automation",
      icon: Bot,
      gradient: "from-blue-600 to-indigo-600",
      features: ["Multi-agent coordination", "Department routing", "Escalation management", "Performance analytics", "Custom integrations"],
      tutorial: "45-min enterprise setup",
      difficulty: "Expert",
      popular: true,
      roi: "80% support cost reduction",
      exclusive: true
    },
    {
      id: 3,
      name: "AI-Powered Business Intelligence",
      description: "Advanced predictive analytics with real-time insights",
      category: "analytics",
      icon: Radar,
      gradient: "from-cyan-600 to-teal-600",
      features: ["Predictive modeling", "Real-time dashboards", "Anomaly detection", "Automated insights", "Executive reporting"],
      tutorial: "50-min BI mastery",
      difficulty: "Expert",
      popular: false,
      roi: "400% better decision making",
      exclusive: true
    },
    {
      id: 4,
      name: "Custom AI API Gateway",
      description: "Build and deploy custom AI APIs for your applications",
      category: "development",
      icon: Server,
      gradient: "from-green-600 to-emerald-600",
      features: ["API development", "Rate limiting", "Authentication", "Monitoring", "Scaling"],
      tutorial: "40-min API workshop",
      difficulty: "Expert",
      popular: false,
      roi: "300% development efficiency",
      exclusive: true
    },
    {
      id: 5,
      name: "AI Security & Compliance Suite",
      description: "Enterprise-grade security and compliance for AI implementations",
      category: "security",
      icon: Shield,
      gradient: "from-red-600 to-pink-600",
      features: ["Data encryption", "Audit trails", "Compliance reporting", "Access controls", "Threat detection"],
      tutorial: "35-min security briefing",
      difficulty: "Expert",
      popular: false,
      roi: "100% compliance assurance",
      exclusive: true
    },
    {
      id: 6,
      name: "Advanced Computer Vision Platform",
      description: "Custom image and video analysis for industrial applications",
      category: "vision",
      icon: Eye,
      gradient: "from-indigo-600 to-purple-600",
      features: ["Object detection", "Quality inspection", "Facial recognition", "Motion tracking", "Custom models"],
      tutorial: "55-min vision workshop",
      difficulty: "Expert",
      popular: true,
      roi: "250% quality improvement",
      exclusive: true
    },
    {
      id: 7,
      name: "AI-Driven Supply Chain Optimizer",
      description: "Optimize entire supply chain with predictive AI",
      category: "operations",
      icon: Truck,
      gradient: "from-orange-600 to-red-600",
      features: ["Demand forecasting", "Route optimization", "Inventory management", "Supplier analysis", "Risk assessment"],
      tutorial: "45-min supply chain mastery",
      difficulty: "Expert",
      popular: false,
      roi: "35% cost reduction",
      exclusive: true
    },
    {
      id: 8,
      name: "Natural Language Processing Engine",
      description: "Advanced NLP for document analysis and content understanding",
      category: "nlp",
      icon: FileText,
      gradient: "from-teal-600 to-cyan-600",
      features: ["Document analysis", "Sentiment analysis", "Entity extraction", "Language translation", "Content summarization"],
      tutorial: "50-min NLP deep dive",
      difficulty: "Expert",
      popular: true,
      roi: "400% document processing speed",
      exclusive: true
    },
    {
      id: 9,
      name: "AI-Powered Financial Modeling",
      description: "Advanced financial modeling and risk analysis",
      category: "finance",
      icon: DollarSign,
      gradient: "from-yellow-600 to-orange-600",
      features: ["Risk modeling", "Portfolio optimization", "Fraud detection", "Credit scoring", "Market analysis"],
      tutorial: "60-min financial AI",
      difficulty: "Expert",
      popular: false,
      roi: "200% risk reduction",
      exclusive: true
    },
    {
      id: 10,
      name: "Enterprise Workflow Automation",
      description: "Complex multi-department workflow automation",
      category: "automation",
      icon: Workflow,
      gradient: "from-purple-600 to-indigo-600",
      features: ["Cross-department flows", "Approval chains", "Conditional logic", "Integration hub", "Performance monitoring"],
      tutorial: "40-min workflow mastery",
      difficulty: "Expert",
      popular: true,
      roi: "500% process efficiency",
      exclusive: true
    }
  ];

  const categories = [
    { id: "all", name: "All Tools", count: exclusiveTools.length },
    { id: "development", name: "AI Development", count: exclusiveTools.filter(t => t.category === "development").length },
    { id: "automation", name: "Enterprise Automation", count: exclusiveTools.filter(t => t.category === "automation").length },
    { id: "analytics", name: "Advanced Analytics", count: exclusiveTools.filter(t => t.category === "analytics").length },
    { id: "security", name: "Security & Compliance", count: exclusiveTools.filter(t => t.category === "security").length },
    { id: "vision", name: "Computer Vision", count: exclusiveTools.filter(t => t.category === "vision").length },
    { id: "nlp", name: "Natural Language", count: exclusiveTools.filter(t => t.category === "nlp").length },
    { id: "operations", name: "Operations", count: exclusiveTools.filter(t => t.category === "operations").length },
    { id: "finance", name: "Financial AI", count: exclusiveTools.filter(t => t.category === "finance").length }
  ];

  const filteredTools = exclusiveTools.filter(tool => 
    activeCategory === "all" || tool.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-medium mb-6">
              👑 Enterprise-Grade AI Solutions
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Professional Plan
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                $147/Month
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Unlock 70+ premium AI tools, custom development, and white-label solutions. Built for serious businesses scaling with AI.
              <span className="text-purple-300 font-semibold"> Everything in Growth plus exclusive enterprise features.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Upgrade to Professional <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
                Schedule Consultation
              </Button>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">70+</div>
                  <div className="text-gray-300 text-sm">Premium Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">Custom</div>
                  <div className="text-gray-300 text-sm">AI Development</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">White-Label</div>
                  <div className="text-gray-300 text-sm">Solutions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">Dedicated</div>
                  <div className="text-gray-300 text-sm">AI Specialist</div>
                </div>
              </div>
              <p className="text-gray-300 text-center">
                Advanced AI capabilities for serious businesses • Includes everything from Growth plan
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Features */}
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Professional-Grade Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced capabilities that set the Professional plan apart from standard AI tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionalFeatures.map((feature, index) => {
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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 h-full text-center">
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
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Professional Tools */}
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Exclusive Professional Tools
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI tools available only to Professional plan members
            </p>
          </motion.div>

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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 h-full relative">
                    {tool.exclusive && (
                      <div className="absolute -top-3 -right-3">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          EXCLUSIVE
                        </Badge>
                      </div>
                    )}

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
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
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
                            <Video className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">{tool.tutorial}</span>
                          </div>
                          <div className="text-green-400 font-semibold text-xs">{tool.roi}</div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Advanced Features:</h4>
                          <ul className="space-y-1">
                            {tool.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-3 h-3 text-purple-400 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                            {tool.features.length > 3 && (
                              <li className="text-sm text-gray-500">
                                +{tool.features.length - 3} more advanced features
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className={`flex-1 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white`}>
                          <Play className="w-4 h-4 mr-2" />
                          Access Tool
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
        </div>
      </section>

      {/* Custom Development Section */}
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
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Custom AI Development
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get bespoke AI solutions built specifically for your business needs. Our team of AI experts will create custom tools that give you a competitive advantage.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Brain,
                    title: "Custom AI Models",
                    desc: "Train AI models on your proprietary data for unique insights",
                    timeline: "4-6 weeks"
                  },
                  {
                    icon: Code,
                    title: "API Development",
                    desc: "Custom APIs that integrate seamlessly with your systems",
                    timeline: "2-3 weeks"
                  },
                  {
                    icon: Network,
                    title: "Enterprise Integration",
                    desc: "Connect AI tools with your existing enterprise software",
                    timeline: "3-4 weeks"
                  },
                  {
                    icon: Shield,
                    title: "Security & Compliance",
                    desc: "Enterprise-grade security meeting all compliance requirements",
                    timeline: "1-2 weeks"
                  }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                            {item.timeline}
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
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Development Process</h3>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Discovery & Planning", desc: "Understand your needs and design the solution" },
                  { step: "02", title: "Development & Testing", desc: "Build and rigorously test your custom AI solution" },
                  { step: "03", title: "Integration & Deployment", desc: "Seamlessly integrate with your existing systems" },
                  { step: "04", title: "Training & Support", desc: "Train your team and provide ongoing support" }
                ].map((phase, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {phase.step}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{phase.title}</h4>
                      <p className="text-gray-300 text-sm">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-slate-900/50 rounded-lg">
                <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Source code
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Documentation
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Training materials
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    90-day support
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* White-Label Solutions */}
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                White-Label AI Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rebrand and resell our AI tools under your own company name. Perfect for agencies and consultants.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Complete Rebranding",
                description: "Use your logo, colors, and branding across all AI tools",
                icon: Palette,
                features: ["Custom branding", "Your domain", "Branded emails", "Custom onboarding"]
              },
              {
                title: "Client Management",
                description: "Manage multiple clients with separate accounts and billing",
                icon: Users,
                features: ["Multi-tenant setup", "Client dashboards", "Usage tracking", "Billing integration"]
              },
              {
                title: "Revenue Sharing",
                description: "Earn recurring revenue from every client you bring",
                icon: DollarSign,
                features: ["70% revenue share", "Monthly payouts", "Performance bonuses", "Growth incentives"]
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
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
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Partner Program Benefits</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">70%</div>
                <div className="text-gray-300 text-sm">Revenue Share</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">$50k+</div>
                <div className="text-gray-300 text-sm">Avg Annual Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Partner Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
                <div className="text-gray-300 text-sm">Active Partners</div>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Apply for Partner Program
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-medium mb-6">
              👑 Ready for Professional AI?
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Upgrade to Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Unlock Everything
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get access to exclusive tools, custom development, and white-label solutions.
              <span className="text-purple-300 font-semibold"> Built for businesses serious about AI.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Upgrade Now - $147/month <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
                Book Strategy Call
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                70+ premium tools
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                Custom development included
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                White-label solutions
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                Dedicated AI specialist
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
