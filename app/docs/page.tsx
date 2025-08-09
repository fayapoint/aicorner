"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Code, 
  Zap, 
  ArrowRight,
  Search,
  FileText,
  Video,
  Download,
  ExternalLink,
  Lightbulb,
  Settings,
  Shield,
  Globe,
  Cpu,
  Database,
  Terminal,
  PlayCircle
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Docs", count: 45 },
    { id: "getting-started", name: "Getting Started", count: 8 },
    { id: "api", name: "API Reference", count: 12 },
    { id: "tutorials", name: "Tutorials", count: 15 },
    { id: "integrations", name: "Integrations", count: 6 },
    { id: "security", name: "Security", count: 4 }
  ];

  const documentSections = [
    {
      title: "Getting Started",
      description: "Everything you need to begin your AI journey",
      icon: Lightbulb,
      gradient: "from-green-500 to-emerald-500",
      docs: [
        { title: "Quick Start Guide", type: "guide", readTime: "5 min", difficulty: "Beginner" },
        { title: "Authentication Setup", type: "guide", readTime: "3 min", difficulty: "Beginner" },
        { title: "Your First API Call", type: "tutorial", readTime: "10 min", difficulty: "Beginner" },
        { title: "Understanding Rate Limits", type: "guide", readTime: "7 min", difficulty: "Intermediate" }
      ]
    },
    {
      title: "API Reference",
      description: "Complete documentation for all endpoints",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      docs: [
        { title: "Chat Completions", type: "reference", readTime: "15 min", difficulty: "Intermediate" },
        { title: "Text Generation", type: "reference", readTime: "12 min", difficulty: "Intermediate" },
        { title: "Image Generation", type: "reference", readTime: "10 min", difficulty: "Intermediate" },
        { title: "Error Handling", type: "guide", readTime: "8 min", difficulty: "Advanced" }
      ]
    },
    {
      title: "Tutorials & Guides",
      description: "Step-by-step tutorials for common use cases",
      icon: PlayCircle,
      gradient: "from-purple-500 to-pink-500",
      docs: [
        { title: "Building a Chatbot", type: "tutorial", readTime: "30 min", difficulty: "Intermediate" },
        { title: "Content Generation Pipeline", type: "tutorial", readTime: "25 min", difficulty: "Advanced" },
        { title: "Sentiment Analysis App", type: "tutorial", readTime: "20 min", difficulty: "Intermediate" },
        { title: "Multi-language Translation", type: "tutorial", readTime: "15 min", difficulty: "Beginner" }
      ]
    },
    {
      title: "Integrations",
      description: "Connect AInSeconds with your favorite tools",
      icon: Settings,
      gradient: "from-orange-500 to-red-500",
      docs: [
        { title: "Zapier Integration", type: "integration", readTime: "10 min", difficulty: "Beginner" },
        { title: "Slack Bot Setup", type: "integration", readTime: "15 min", difficulty: "Intermediate" },
        { title: "WordPress Plugin", type: "integration", readTime: "12 min", difficulty: "Beginner" },
        { title: "Custom Webhooks", type: "integration", readTime: "20 min", difficulty: "Advanced" }
      ]
    },
    {
      title: "Security & Compliance",
      description: "Best practices for secure AI implementation",
      icon: Shield,
      gradient: "from-teal-500 to-blue-500",
      docs: [
        { title: "API Key Management", type: "security", readTime: "8 min", difficulty: "Intermediate" },
        { title: "Data Privacy Guidelines", type: "security", readTime: "12 min", difficulty: "Intermediate" },
        { title: "GDPR Compliance", type: "security", readTime: "15 min", difficulty: "Advanced" },
        { title: "SOC 2 Certification", type: "security", readTime: "10 min", difficulty: "Advanced" }
      ]
    },
    {
      title: "SDKs & Libraries",
      description: "Official libraries for popular programming languages",
      icon: Terminal,
      gradient: "from-indigo-500 to-purple-500",
      docs: [
        { title: "Python SDK", type: "sdk", readTime: "20 min", difficulty: "Intermediate" },
        { title: "Node.js Library", type: "sdk", readTime: "18 min", difficulty: "Intermediate" },
        { title: "PHP Integration", type: "sdk", readTime: "15 min", difficulty: "Intermediate" },
        { title: "Go Client", type: "sdk", readTime: "12 min", difficulty: "Advanced" }
      ]
    }
  ];

  const quickLinks = [
    { title: "API Keys", icon: Code, href: "/docs/api-keys" },
    { title: "Rate Limits", icon: Zap, href: "/docs/rate-limits" },
    { title: "Status Page", icon: Globe, href: "/status" },
    { title: "Support", icon: FileText, href: "/support" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide": return FileText;
      case "tutorial": return PlayCircle;
      case "reference": return Code;
      case "integration": return Settings;
      case "security": return Shield;
      case "sdk": return Terminal;
      default: return FileText;
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
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                <Book className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI Corner <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Docs</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive documentation, tutorials, and guides to help you build amazing AI-powered applications.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.href}>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-purple-400"
                  >
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.title}
                  </Button>
                </a>
              ))}
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

      {/* Documentation Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            {documentSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center mb-8">
                  <div className={`bg-gradient-to-r ${section.gradient} p-3 rounded-xl mr-4`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                    <p className="text-gray-300">{section.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.docs.map((doc, docIndex) => {
                    const TypeIcon = getTypeIcon(doc.type);
                    const getDocHref = (title: string) => {
                      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      switch (section.title) {
                        case "Getting Started":
                          if (title === "Quick Start Guide") return "/docs/quick-start";
                          if (title === "Authentication Setup") return "/docs/authentication";
                          if (title === "Your First API Call") return "/docs/first-api-call";
                          if (title === "Understanding Rate Limits") return "/docs/rate-limits";
                          break;
                        case "API Reference":
                          if (title === "Chat Completions") return "/docs/api/chat-completions";
                          if (title === "Text Generation") return "/docs/api/text-generation";
                          if (title === "Image Generation") return "/docs/api/image-generation";
                          if (title === "Error Handling") return "/docs/api/error-handling";
                          break;
                        case "Tutorials & Guides":
                          if (title === "Building a Chatbot") return "/docs/tutorials/building-chatbot";
                          if (title === "Content Generation Pipeline") return "/docs/tutorials/content-pipeline";
                          if (title === "Sentiment Analysis App") return "/docs/tutorials/sentiment-analysis";
                          if (title === "Multi-language Translation") return "/docs/tutorials/translation";
                          break;
                        case "Integrations":
                          return `/docs/integrations/${slug}`;
                        case "Security & Compliance":
                          return `/docs/security/${slug}`;
                        case "SDKs & Libraries":
                          return `/docs/sdks/${slug}`;
                      }
                      return `/docs/${slug}`;
                    };

                    return (
                      <a key={docIndex} href={getDocHref(doc.title)}>
                        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group h-full">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <TypeIcon className="w-5 h-5 text-purple-400" />
                              <Badge className={getDifficultyColor(doc.difficulty)}>
                                {doc.difficulty}
                              </Badge>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                              {doc.title}
                            </h3>

                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <span>{doc.readTime}</span>
                              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                                {doc.type}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need More Help?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/support">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                  Contact Support <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
                  <Video className="mr-2 w-5 h-5" />
                  Watch Tutorials
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
