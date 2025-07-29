"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronDown,
  Book,
  Code,
  PlayCircle,
  Settings,
  Shield,
  Terminal,
  Lightbulb,
  Search,
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  icon: any;
  items: {
    id: string;
    title: string;
    href: string;
    difficulty?: string;
    type?: string;
  }[];
}

interface DocsLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  title?: string;
  description?: string;
  difficulty?: string;
  readTime?: string;
  lastUpdated?: string;
}

export function DocsLayout({ 
  children, 
  currentPath = "",
  title = "Documentation",
  description = "",
  difficulty = "Beginner",
  readTime = "5 min",
  lastUpdated = "2024-01-15"
}: DocsLayoutProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);
  const [searchQuery, setSearchQuery] = useState("");

  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Lightbulb,
      items: [
        { id: "quick-start", title: "Quick Start Guide", href: "/docs/quick-start", difficulty: "Beginner", type: "guide" },
        { id: "authentication", title: "Authentication Setup", href: "/docs/authentication", difficulty: "Beginner", type: "guide" },
        { id: "first-api-call", title: "Your First API Call", href: "/docs/first-api-call", difficulty: "Beginner", type: "tutorial" },
        { id: "rate-limits", title: "Understanding Rate Limits", href: "/docs/rate-limits", difficulty: "Intermediate", type: "guide" }
      ]
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: Code,
      items: [
        { id: "chat-completions", title: "Chat Completions", href: "/docs/api/chat-completions", difficulty: "Intermediate", type: "reference" },
        { id: "text-generation", title: "Text Generation", href: "/docs/api/text-generation", difficulty: "Intermediate", type: "reference" },
        { id: "image-generation", title: "Image Generation", href: "/docs/api/image-generation", difficulty: "Intermediate", type: "reference" },
        { id: "error-handling", title: "Error Handling", href: "/docs/api/error-handling", difficulty: "Advanced", type: "guide" }
      ]
    },
    {
      id: "tutorials",
      title: "Tutorials & Guides",
      icon: PlayCircle,
      items: [
        { id: "building-chatbot", title: "Building a Chatbot", href: "/docs/tutorials/building-chatbot", difficulty: "Intermediate", type: "tutorial" },
        { id: "content-pipeline", title: "Content Generation Pipeline", href: "/docs/tutorials/content-pipeline", difficulty: "Advanced", type: "tutorial" },
        { id: "sentiment-analysis", title: "Sentiment Analysis App", href: "/docs/tutorials/sentiment-analysis", difficulty: "Intermediate", type: "tutorial" },
        { id: "translation", title: "Multi-language Translation", href: "/docs/tutorials/translation", difficulty: "Beginner", type: "tutorial" }
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Settings,
      items: [
        { id: "zapier", title: "Zapier Integration", href: "/docs/integrations/zapier", difficulty: "Beginner", type: "integration" },
        { id: "slack-bot", title: "Slack Bot Setup", href: "/docs/integrations/slack-bot", difficulty: "Intermediate", type: "integration" },
        { id: "wordpress", title: "WordPress Plugin", href: "/docs/integrations/wordpress", difficulty: "Beginner", type: "integration" },
        { id: "webhooks", title: "Custom Webhooks", href: "/docs/integrations/webhooks", difficulty: "Advanced", type: "integration" }
      ]
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: Shield,
      items: [
        { id: "api-keys", title: "API Key Management", href: "/docs/security/api-keys", difficulty: "Intermediate", type: "security" },
        { id: "data-privacy", title: "Data Privacy Guidelines", href: "/docs/security/data-privacy", difficulty: "Intermediate", type: "security" },
        { id: "gdpr", title: "GDPR Compliance", href: "/docs/security/gdpr", difficulty: "Advanced", type: "security" },
        { id: "soc2", title: "SOC 2 Certification", href: "/docs/security/soc2", difficulty: "Advanced", type: "security" }
      ]
    },
    {
      id: "sdks",
      title: "SDKs & Libraries",
      icon: Terminal,
      items: [
        { id: "python-sdk", title: "Python SDK", href: "/docs/sdks/python", difficulty: "Intermediate", type: "sdk" },
        { id: "nodejs", title: "Node.js Library", href: "/docs/sdks/nodejs", difficulty: "Intermediate", type: "sdk" },
        { id: "php", title: "PHP Integration", href: "/docs/sdks/php", difficulty: "Intermediate", type: "sdk" },
        { id: "go", title: "Go Client", href: "/docs/sdks/go", difficulty: "Advanced", type: "sdk" }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-slate-800/50 border-r border-slate-700 min-h-screen fixed left-0 top-0 pt-20 overflow-y-auto">
          <div className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-sm"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {docSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full p-3 text-left text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <section.icon className="w-4 h-4 mr-3" />
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedSections.includes(section.id) && (
                    <div className="ml-7 mt-2 space-y-1">
                      {section.items.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          className={`block p-2 text-sm rounded-md transition-all duration-200 ${
                            currentPath === item.href
                              ? "bg-purple-500/20 text-purple-300 border-l-2 border-purple-400"
                              : "text-gray-400 hover:text-white hover:bg-slate-700/30"
                          }`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-80">
          <div className="pt-20">
            {/* Header */}
            <div className="bg-slate-800/30 border-b border-slate-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold text-white">{title}</h1>
                    <Badge className={getDifficultyColor(difficulty)}>
                      {difficulty}
                    </Badge>
                  </div>
                  {description && (
                    <p className="text-gray-300 text-lg">{description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span>📖 {readTime} read</span>
                    <span>📅 Updated {lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Edit on GitHub
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <div className="max-w-4xl">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
