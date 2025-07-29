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
  Search
} from "lucide-react";

export default function StarterTierPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const starterTools = [
    {
      id: 1,
      name: "AI Writing Assistant",
      description: "Generate professional content, emails, and social media posts",
      category: "content",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Blog posts", "Social media", "Emails", "Product descriptions"],
      tutorial: "5-min video guide",
      difficulty: "Beginner",
      popular: true
    },
    {
      id: 2,
      name: "Smart Chatbot Builder",
      description: "Create simple chatbots for customer service without coding",
      category: "automation",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-500",
      features: ["FAQ automation", "Lead capture", "Basic responses", "WhatsApp integration"],
      tutorial: "10-min tutorial",
      difficulty: "Beginner",
      popular: true
    },
    {
      id: 3,
      name: "AI Image Generator",
      description: "Create stunning images and graphics for your business",
      category: "design",
      icon: Image,
      gradient: "from-purple-500 to-pink-500",
      features: ["Logo creation", "Social graphics", "Product images", "Marketing visuals"],
      tutorial: "8-min guide",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 4,
      name: "Email Subject Optimizer",
      description: "Boost email open rates with AI-optimized subject lines",
      category: "marketing",
      icon: Mail,
      gradient: "from-orange-500 to-red-500",
      features: ["A/B testing", "Open rate prediction", "Industry templates", "Performance tracking"],
      tutorial: "3-min quickstart",
      difficulty: "Beginner",
      popular: true
    },
    {
      id: 5,
      name: "Business ROI Calculator",
      description: "Calculate potential savings and returns from AI implementation",
      category: "analytics",
      icon: Calculator,
      gradient: "from-teal-500 to-blue-500",
      features: ["Cost analysis", "ROI projections", "Industry benchmarks", "Custom reports"],
      tutorial: "5-min demo",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 6,
      name: "Social Media Scheduler",
      description: "Plan and schedule social media posts across platforms",
      category: "marketing",
      icon: Globe,
      gradient: "from-indigo-500 to-purple-500",
      features: ["Multi-platform posting", "Content calendar", "Best time suggestions", "Hashtag optimization"],
      tutorial: "12-min walkthrough",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 7,
      name: "Voice-to-Text Converter",
      description: "Convert audio recordings to accurate text transcriptions",
      category: "productivity",
      icon: Headphones,
      gradient: "from-pink-500 to-rose-500",
      features: ["Multiple languages", "Speaker identification", "Timestamp markers", "Export options"],
      tutorial: "4-min guide",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 8,
      name: "AI Resume Builder",
      description: "Create professional resumes tailored to specific job roles",
      category: "productivity",
      icon: PenTool,
      gradient: "from-yellow-500 to-orange-500",
      features: ["ATS optimization", "Industry templates", "Skill matching", "Cover letter generation"],
      tutorial: "15-min complete guide",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 9,
      name: "Keyword Research Tool",
      description: "Find the best keywords for SEO and content marketing",
      category: "marketing",
      icon: Search,
      gradient: "from-green-600 to-teal-500",
      features: ["Search volume data", "Competition analysis", "Long-tail suggestions", "Trend tracking"],
      tutorial: "7-min tutorial",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 10,
      name: "Simple Analytics Dashboard",
      description: "Track website and business metrics in one place",
      category: "analytics",
      icon: BarChart3,
      gradient: "from-blue-600 to-indigo-500",
      features: ["Website analytics", "Social media metrics", "Goal tracking", "Custom reports"],
      tutorial: "10-min setup guide",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 11,
      name: "AI Language Translator",
      description: "Translate text and documents into 100+ languages",
      category: "productivity",
      icon: Globe,
      gradient: "from-emerald-500 to-green-600",
      features: ["Document translation", "Real-time chat", "Context preservation", "Bulk processing"],
      tutorial: "6-min overview",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 12,
      name: "Meeting Notes AI",
      description: "Automatically generate meeting summaries and action items",
      category: "productivity",
      icon: FileText,
      gradient: "from-violet-500 to-purple-600",
      features: ["Auto transcription", "Action item extraction", "Participant tracking", "Calendar integration"],
      tutorial: "8-min demo",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 13,
      name: "Price Comparison Bot",
      description: "Monitor competitor prices and market trends automatically",
      category: "business",
      icon: TrendingUp,
      gradient: "from-red-500 to-pink-600",
      features: ["Competitor tracking", "Price alerts", "Market analysis", "Trend reports"],
      tutorial: "9-min setup",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 14,
      name: "AI Form Builder",
      description: "Create intelligent forms that adapt based on user responses",
      category: "automation",
      icon: Code,
      gradient: "from-cyan-500 to-blue-600",
      features: ["Conditional logic", "Auto-validation", "Integration ready", "Response analytics"],
      tutorial: "11-min guide",
      difficulty: "Beginner",
      popular: false
    },
    {
      id: 15,
      name: "Content Idea Generator",
      description: "Never run out of content ideas for your blog or social media",
      category: "content",
      icon: Lightbulb,
      gradient: "from-amber-500 to-yellow-600",
      features: ["Trending topics", "Industry-specific ideas", "Content calendar", "Viral potential scoring"],
      tutorial: "5-min quickstart",
      difficulty: "Beginner",
      popular: false
    }
  ];

  const categories = [
    { id: "all", name: "All Tools", count: starterTools.length },
    { id: "content", name: "Content Creation", count: starterTools.filter(t => t.category === "content").length },
    { id: "marketing", name: "Marketing", count: starterTools.filter(t => t.category === "marketing").length },
    { id: "automation", name: "Automation", count: starterTools.filter(t => t.category === "automation").length },
    { id: "productivity", name: "Productivity", count: starterTools.filter(t => t.category === "productivity").length },
    { id: "analytics", name: "Analytics", count: starterTools.filter(t => t.category === "analytics").length }
  ];

  const filteredTools = starterTools.filter(tool => 
    activeCategory === "all" || tool.category === activeCategory
  );

  const starterBenefits = [
    {
      title: "Perfect for AI Beginners",
      description: "Start your AI journey with confidence using our beginner-friendly tools",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "No Technical Skills Required",
      description: "All tools are designed for non-technical users with simple interfaces",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Step-by-Step Tutorials",
      description: "Learn how to use every tool with our comprehensive video guides",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Community Support",
      description: "Get help from 15,000+ members in our supportive AI community",
      icon: Users,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🌱 Perfect for AI Beginners
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
                Starter Plan
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Just $3/Month
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Begin your AI journey with 15+ essential tools, comprehensive tutorials, and a supportive community. 
              <span className="text-green-300 font-semibold"> Perfect for those new to AI who want to start safely.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Free Trial <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-400 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg rounded-xl">
                View All Tools
              </Button>
            </div>

            {/* Pricing Highlight */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">$3</div>
                  <div className="text-gray-300">per month</div>
                </div>
                <div className="text-gray-400">•</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">15+</div>
                  <div className="text-gray-300">AI Tools</div>
                </div>
                <div className="text-gray-400">•</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400">24/7</div>
                  <div className="text-gray-300">Support</div>
                </div>
              </div>
              <p className="text-gray-300 text-center">
                14-day free trial • Cancel anytime • No setup fees
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Starter */}
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
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Why Start Here?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Starter plan is designed specifically for AI beginners who want to explore safely
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {starterBenefits.map((benefit, index) => {
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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-green-400/40 transition-all duration-300 h-full text-center">
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
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Grid */}
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
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                15+ Essential AI Tools
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to start your AI journey, with step-by-step tutorials for each tool
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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-green-400/40 transition-all duration-300 h-full">
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
                          <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
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
                        <div className="flex items-center space-x-2 text-sm">
                          <Video className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{tool.tutorial}</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {tool.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
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
                          Try Now
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
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Your AI Learning Journey
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our structured path from AI beginner to confident user in just 30 days
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                week: "Week 1",
                title: "AI Foundations",
                description: "Learn AI basics and set up your first tools",
                tools: ["AI Writing Assistant", "Email Optimizer", "ROI Calculator"],
                progress: 100
              },
              {
                week: "Week 2",
                title: "Content Creation",
                description: "Master AI-powered content and design tools",
                tools: ["Image Generator", "Content Ideas", "Social Scheduler"],
                progress: 75
              },
              {
                week: "Week 3",
                title: "Business Automation",
                description: "Automate repetitive tasks with AI",
                tools: ["Chatbot Builder", "Form Builder", "Meeting Notes"],
                progress: 25
              },
              {
                week: "Week 4",
                title: "Advanced Features",
                description: "Explore analytics and optimization tools",
                tools: ["Analytics Dashboard", "Price Monitor", "Keyword Research"],
                progress: 0
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {phase.week}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{phase.progress}%</div>
                        <div className="text-xs text-gray-400">Complete</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white">{phase.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {phase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="text-sm font-semibold text-gray-300">Tools You'll Master:</div>
                      {phase.tools.map((tool, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                          {tool}
                        </div>
                      ))}
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                    <Button
                      variant={phase.progress > 0 ? "default" : "outline"}
                      className={`w-full ${phase.progress > 0 ? "bg-gradient-to-r from-green-500 to-emerald-500" : "border-gray-600 text-gray-300"}`}
                    >
                      {phase.progress > 0 ? "Continue" : "Start Week"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Support */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  You're Never Alone
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join our supportive community of 15,000+ AI beginners and experts. Get help, share wins, and learn together.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Users, title: "15,000+ Members", desc: "Active community always ready to help" },
                  { icon: MessageSquare, title: "24/7 Support", desc: "Get answers to your questions anytime" },
                  { icon: BookOpen, title: "Weekly Workshops", desc: "Live training sessions with AI experts" },
                  { icon: Heart, title: "Beginner-Friendly", desc: "No question is too basic in our community" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
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
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">What Our Starter Members Say</h3>

              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Sarah M.</h4>
                      <p className="text-gray-400 text-sm">Small Business Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "I was terrified of AI, but the Starter plan made it so approachable. The tutorials are amazing and the community is so supportive!"
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Mike R.</h4>
                      <p className="text-gray-400 text-sm">Marketing Manager</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "For just $3, I got tools that save me hours every week. The AI writing assistant alone is worth 10x the price!"
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🚀 Start Your AI Journey Today
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
                Ready to Begin?
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Just $3 to Start
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of beginners who've successfully started their AI journey with our Starter plan.
              <span className="text-green-300 font-semibold"> 14-day free trial, cancel anytime.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Free Trial <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-400 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg rounded-xl">
                View Growth Plan
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Cancel anytime
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                30-day money-back guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
