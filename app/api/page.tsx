"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Key, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  Copy,
  CheckCircle,
  ExternalLink,
  Book,
  Terminal,
  Cpu,
  Database,
  Cloud,
  Lock,
  Activity,
  Settings
} from "lucide-react";

export default function APIPage() {
  const [activeEndpoint, setActiveEndpoint] = useState("chat");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const apiEndpoints = [
    {
      id: "chat",
      name: "Chat Completion",
      method: "POST",
      endpoint: "/v1/chat/completions",
      description: "Generate AI-powered chat responses",
      category: "Core AI",
      rateLimit: "1000/hour",
      pricing: "$0.002/1K tokens"
    },
    {
      id: "text",
      name: "Text Generation",
      method: "POST", 
      endpoint: "/v1/completions",
      description: "Generate and complete text content",
      category: "Core AI",
      rateLimit: "1000/hour",
      pricing: "$0.002/1K tokens"
    },
    {
      id: "image",
      name: "Image Generation",
      method: "POST",
      endpoint: "/v1/images/generations",
      description: "Create images from text descriptions",
      category: "Creative AI",
      rateLimit: "100/hour",
      pricing: "$0.02/image"
    },
    {
      id: "analysis",
      name: "Content Analysis",
      method: "POST",
      endpoint: "/v1/analyze",
      description: "Analyze sentiment, topics, and insights",
      category: "Analytics",
      rateLimit: "500/hour",
      pricing: "$0.001/request"
    },
    {
      id: "translation",
      name: "Translation",
      method: "POST",
      endpoint: "/v1/translate",
      description: "Translate text between 100+ languages",
      category: "Language",
      rateLimit: "2000/hour",
      pricing: "$0.001/1K chars"
    },
    {
      id: "speech",
      name: "Speech to Text",
      method: "POST",
      endpoint: "/v1/audio/transcriptions",
      description: "Convert audio to accurate text transcriptions",
      category: "Audio",
      rateLimit: "200/hour",
      pricing: "$0.006/minute"
    }
  ];

  const codeExamples = {
    chat: `curl -X POST "https://api.aicorner.com/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4-turbo",
    "messages": [
      {
        "role": "user",
        "content": "Explain quantum computing in simple terms"
      }
    ],
    "max_tokens": 150,
    "temperature": 0.7
  }'`,
    text: `curl -X POST "https://api.aicorner.com/v1/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-davinci-003",
    "prompt": "Write a professional email about",
    "max_tokens": 200,
    "temperature": 0.8
  }'`,
    image: `curl -X POST "https://api.aicorner.com/v1/images/generations" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A futuristic city with flying cars at sunset",
    "n": 1,
    "size": "1024x1024",
    "quality": "hd"
  }'`
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times with global CDN"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "99.9% uptime with worldwide infrastructure"
    },
    {
      icon: Key,
      title: "Simple Authentication",
      description: "Secure API keys with granular permissions"
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
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI Corner <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">API</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Integrate powerful AI capabilities into your applications with our comprehensive REST API. 
              Simple, fast, and built for scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Get API Key <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                <Book className="mr-2 w-5 h-5" />
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Endpoints</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access cutting-edge AI models through our simple and intuitive REST API
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveEndpoint(endpoint.id)}
                className="cursor-pointer"
              >
                <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 ${
                  activeEndpoint === endpoint.id ? 'border-blue-400/60 bg-blue-500/5' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                        {endpoint.method}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {endpoint.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{endpoint.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{endpoint.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate Limit:</span>
                        <span className="text-blue-400">{endpoint.rateLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pricing:</span>
                        <span className="text-green-400">{endpoint.pricing}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Code Example */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">Code Example</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(codeExamples[activeEndpoint as keyof typeof codeExamples] || '', activeEndpoint)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {copiedCode === activeEndpoint ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {copiedCode === activeEndpoint ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{codeExamples[activeEndpoint as keyof typeof codeExamples] || codeExamples.chat}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-cyan-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build with AI?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Get started with our API today. Free tier includes 1,000 requests per month.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Get Started Free <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                <ExternalLink className="mr-2 w-5 h-5" />
                API Reference
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
