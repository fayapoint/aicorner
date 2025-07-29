"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Brain, 
  Code, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Filter,
  Search,
  Star,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Target,
  Lightbulb,
  Globe,
  Smartphone,
  BarChart3,
  MessageSquare,
  Settings,
  Rocket
} from "lucide-react";

export default function SolutionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const solutions = [
    {
      id: 1,
      title: "ChatFlow AI",
      category: "automation",
      description: "Intelligent chatbot automation for WhatsApp, Instagram, and Facebook",
      features: ["24/7 Customer Support", "Lead Qualification", "Multi-platform Integration", "Analytics Dashboard"],
      pricing: "Starting at $67/month",
      rating: 4.9,
      clients: "2,500+",
      savings: "70% cost reduction",
      icon: MessageSquare,
      gradient: "from-blue-500 to-cyan-500",
      popular: true
    },
    {
      id: 2,
      title: "LocalSEO Master",
      category: "marketing",
      description: "Automated local SEO optimization for Google Maps and local search rankings",
      features: ["Google My Business Optimization", "Local Content Creation", "Competitor Monitoring", "Review Management"],
      pricing: "Starting at $127/month",
      rating: 4.8,
      clients: "1,800+",
      savings: "300% ROI increase",
      icon: Globe,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "WebBuilder Pro",
      category: "development",
      description: "AI-powered website builder specifically designed for real estate professionals",
      features: ["Industry-Specific Templates", "Property Listings Integration", "Lead Capture Forms", "Mobile Optimization"],
      pricing: "Starting at $97/month",
      rating: 4.7,
      clients: "3,200+",
      savings: "80% faster deployment",
      icon: Code,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "AI Content Studio",
      category: "content",
      description: "Professional content generation for social media, blogs, and marketing materials",
      features: ["Multi-format Content", "Brand Voice Training", "SEO Optimization", "Content Calendar"],
      pricing: "Starting at $47/month",
      rating: 4.9,
      clients: "5,000+",
      savings: "90% time savings",
      icon: Brain,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Business Intelligence AI",
      category: "analytics",
      description: "Advanced data analytics and business insights powered by artificial intelligence",
      features: ["Predictive Analytics", "Custom Dashboards", "Automated Reports", "Data Integration"],
      pricing: "Starting at $197/month",
      rating: 4.8,
      clients: "1,200+",
      savings: "250% better decisions",
      icon: BarChart3,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "AI Customer Success",
      category: "support",
      description: "Intelligent customer success platform with predictive churn prevention",
      features: ["Churn Prediction", "Customer Health Scoring", "Automated Outreach", "Success Metrics"],
      pricing: "Starting at $147/month",
      rating: 4.7,
      clients: "900+",
      savings: "40% churn reduction",
      icon: Users,
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const categories = [
    { id: "all", name: "All Solutions", count: solutions.length },
    { id: "automation", name: "Automation", count: solutions.filter(s => s.category === "automation").length },
    { id: "marketing", name: "Marketing", count: solutions.filter(s => s.category === "marketing").length },
    { id: "development", name: "Development", count: solutions.filter(s => s.category === "development").length },
    { id: "content", name: "Content", count: solutions.filter(s => s.category === "content").length },
    { id: "analytics", name: "Analytics", count: solutions.filter(s => s.category === "analytics").length },
    { id: "support", name: "Support", count: solutions.filter(s => s.category === "support").length }
  ];

  const filteredSolutions = solutions.filter(solution => {
    const matchesCategory = selectedCategory === "all" || solution.category === selectedCategory;
    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🚀 AI Solutions That Actually Work
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                AI Solutions
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                For Every Business
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From automation to analytics, discover AI solutions that transform your business operations and drive real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <a href="/book-consultation">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
                  Book Consultation
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredSolutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 h-full ${
                    solution.popular ? "ring-2 ring-purple-500/50" : ""
                  }`}>
                    {solution.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs">
                          MOST POPULAR
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-2xl text-white">{solution.title}</CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{solution.rating}</span>
                        </div>
                      </div>
                      
                      <CardDescription className="text-gray-300 text-base">
                        {solution.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">{solution.clients} clients</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{solution.savings}</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2">
                          {solution.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{solution.pricing}</div>
                        </div>
                        <Button className={`bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white`}>
                          Learn More
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

      {/* Why Choose Our Solutions */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
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
                Why Choose AI Corner Solutions?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just provide AI tools - we deliver complete solutions with ongoing support and guaranteed results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Proven Results",
                description: "97% success rate with measurable ROI within 90 days",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Dedicated AI specialists guide your implementation",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "Rapid Deployment",
                description: "Get up and running in days, not months",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Target,
                title: "Custom Integration",
                description: "Tailored to fit your existing business processes",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((benefit, index) => {
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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 h-full text-center">
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

      {/* Implementation Process */}
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
                Simple Implementation Process
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From consultation to deployment, we make AI implementation seamless and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery Call",
                description: "We analyze your business needs and identify the best AI solutions",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "Custom Strategy",
                description: "Develop a tailored implementation plan with clear timelines",
                icon: Target
              },
              {
                step: "03",
                title: "Implementation",
                description: "Deploy and integrate AI solutions with minimal disruption",
                icon: Settings
              },
              {
                step: "04",
                title: "Optimization",
                description: "Monitor performance and continuously improve results",
                icon: TrendingUp
              }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>

                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-x-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🎯 Ready to Transform Your Business?
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Start Your AI Journey
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Today
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of businesses already using AI to save time, reduce costs, and accelerate growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/book-consultation">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                  Book Free Consultation <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </a>
              <a href="/pricing">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
                  View Pricing
                </Button>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">15,000+</div>
                <div className="text-gray-300">Businesses Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">97%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">$2.5M+</div>
                <div className="text-gray-300">Client Savings</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
