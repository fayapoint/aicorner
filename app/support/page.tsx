"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Book, 
  Video, 
  Mail, 
  Phone, 
  Clock, 
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Shield,
  Zap,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  FileText,
  Download,
  Play,
  Calendar,
  Globe,
  Headphones,
  MessageCircle,
  Send
} from "lucide-react";

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our AI experts",
      availability: "24/7",
      responseTime: "< 2 minutes",
      icon: MessageCircle,
      gradient: "from-blue-500 to-cyan-500",
      action: "Start Chat"
    },
    {
      title: "Email Support",
      description: "Detailed help for complex questions",
      availability: "24/7",
      responseTime: "< 4 hours",
      icon: Mail,
      gradient: "from-green-500 to-emerald-500",
      action: "Send Email"
    },
    {
      title: "Video Call",
      description: "One-on-one screen sharing sessions",
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Same day",
      icon: Video,
      gradient: "from-purple-500 to-pink-500",
      action: "Schedule Call"
    },
    {
      title: "Phone Support",
      description: "Direct phone support for urgent issues",
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Immediate",
      icon: Phone,
      gradient: "from-orange-500 to-red-500",
      action: "Call Now"
    }
  ];

  const faqCategories = [
    { id: "all", name: "All Questions", count: 24 },
    { id: "getting-started", name: "Getting Started", count: 8 },
    { id: "billing", name: "Billing & Plans", count: 6 },
    { id: "technical", name: "Technical", count: 5 },
    { id: "ai-tools", name: "AI Tools", count: 5 }
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I get started with AI Corner?",
      answer: "Getting started is simple! Sign up for our free 14-day trial, complete the onboarding questionnaire to help us understand your needs, and we'll recommend the perfect AI solutions for your business. Our team will guide you through the setup process step by step.",
      popular: true
    },
    {
      id: 2,
      category: "getting-started",
      question: "I'm completely new to AI. Is this platform right for me?",
      answer: "Absolutely! AI Corner is specifically designed for beginners. We provide simple explanations, step-by-step tutorials, and a supportive community. You don't need any technical background - we'll teach you everything you need to know.",
      popular: true
    },
    {
      id: 3,
      category: "billing",
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences. There are no long-term contracts or cancellation fees.",
      popular: true
    },
    {
      id: 4,
      category: "billing",
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied, contact our support team for a full refund. No questions asked.",
      popular: false
    },
    {
      id: 5,
      category: "technical",
      question: "What if I need help implementing AI solutions?",
      answer: "We provide comprehensive implementation support including step-by-step guides, video tutorials, live chat support, and even one-on-one consultation calls. Our expert team will ensure you succeed with your AI implementation.",
      popular: true
    },
    {
      id: 6,
      category: "technical",
      question: "How secure is my data?",
      answer: "Data security is our top priority. We use enterprise-grade encryption, comply with GDPR and SOC 2 standards, and never share your data with third parties. All AI processing happens in secure, isolated environments.",
      popular: false
    },
    {
      id: 7,
      category: "ai-tools",
      question: "Which AI tools are included in each plan?",
      answer: "Our Starter plan includes 10+ basic AI tools, Growth plan includes 30+ advanced tools, Professional includes custom AI development, and Enterprise includes unlimited tools with dedicated support. Check our pricing page for detailed comparisons.",
      popular: true
    },
    {
      id: 8,
      category: "ai-tools",
      question: "Can I integrate AI tools with my existing software?",
      answer: "Yes! We offer integrations with popular business tools like CRM systems, email platforms, e-commerce solutions, and more. Our API allows custom integrations, and our team can help with setup.",
      popular: false
    }
  ];

  const knowledgeBaseArticles = [
    {
      title: "Complete Beginner's Guide to AI",
      description: "Everything you need to know to start your AI journey",
      category: "Getting Started",
      readTime: "15 min",
      views: "25,000+",
      rating: 4.9,
      icon: Lightbulb
    },
    {
      title: "Setting Up Your First AI Chatbot",
      description: "Step-by-step tutorial for creating intelligent chatbots",
      category: "Tutorials",
      readTime: "20 min",
      views: "18,000+",
      rating: 4.8,
      icon: MessageSquare
    },
    {
      title: "AI Security Best Practices",
      description: "Keep your AI implementations safe and compliant",
      category: "Security",
      readTime: "12 min",
      views: "12,000+",
      rating: 4.9,
      icon: Shield
    },
    {
      title: "Measuring AI ROI",
      description: "How to calculate and track your AI investment returns",
      category: "Business",
      readTime: "18 min",
      views: "15,000+",
      rating: 4.7,
      icon: Zap
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              🤝 We're Here to Help 24/7
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Support Center
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Always Here for You
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Get the help you need, when you need it. From quick answers to detailed guidance, our support team is dedicated to your success.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/50 border border-gray-600 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
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
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get Help Your Way
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the support channel that works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportChannels.map((channel, index) => {
              const IconComponent = channel.icon;
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
                      <div className={`w-16 h-16 bg-gradient-to-r ${channel.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{channel.title}</h3>
                      <p className="text-gray-300 mb-4">{channel.description}</p>
                      
                      <div className="space-y-2 mb-6 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{channel.availability}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Zap className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">Response: {channel.responseTime}</span>
                        </div>
                      </div>
                      
                      <Button className={`w-full bg-gradient-to-r ${channel.gradient} hover:opacity-90 text-white`}>
                        {channel.action}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-800/50 p-2 rounded-2xl max-w-md mx-auto">
              <TabsTrigger value="faq" className="text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
                FAQ
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
                Knowledge Base
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
                Contact Us
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-8">
              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="max-w-4xl mx-auto space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300">
                      <CardContent className="p-0">
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            {faq.popular && (
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                Popular
                              </Badge>
                            )}
                            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                          </div>
                          {expandedFAQ === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        
                        {expandedFAQ === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 pb-6"
                          >
                            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {knowledgeBaseArticles.map((article, index) => {
                  const IconComponent = article.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {article.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-white">{article.title}</CardTitle>
                          <CardDescription className="text-gray-300">
                            {article.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{article.views}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{article.rating}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white text-center">Send us a Message</CardTitle>
                    <CardDescription className="text-gray-300 text-center">
                      Can't find what you're looking for? Send us a message and we'll get back to you within 4 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject
                        </label>
                        <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>General Question</option>
                          <option>Technical Support</option>
                          <option>Billing Issue</option>
                          <option>Feature Request</option>
                          <option>Partnership Inquiry</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          rows={6}
                          className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 text-lg">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
