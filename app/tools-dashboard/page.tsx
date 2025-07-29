"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  MessageSquare,
  FileText,
  Image,
  Code,
  BarChart3,
  Globe,
  Mail,
  Sparkles,
  Play,
  Download,
  Copy,
  CheckCircle,
  Wand2,
  Brain,
  Target,
  TrendingUp
} from "lucide-react";

export default function ToolsDashboard() {
  const [activeCategory, setActiveCategory] = useState("content");
  const [results, setResults] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: "content", name: "Content Creation", icon: FileText, count: 12 },
    { id: "marketing", name: "Marketing", icon: TrendingUp, count: 8 },
    { id: "business", name: "Business", icon: Target, count: 10 },
    { id: "development", name: "Development", icon: Code, count: 6 },
    { id: "design", name: "Design", icon: Image, count: 7 },
    { id: "analytics", name: "Analytics", icon: BarChart3, count: 5 }
  ];

  const tools = {
    content: [
      {
        id: "blog-writer",
        name: "AI Blog Writer",
        description: "Generate high-quality blog posts on any topic",
        icon: FileText,
        inputs: [
          { name: "topic", label: "Blog Topic", type: "text", placeholder: "Enter your blog topic..." },
          { name: "tone", label: "Writing Tone", type: "select", options: ["Professional", "Casual", "Friendly", "Technical"] },
          { name: "length", label: "Word Count", type: "select", options: ["500 words", "1000 words", "1500 words", "2000 words"] }
        ]
      },
      {
        id: "social-posts",
        name: "Social Media Posts",
        description: "Create engaging posts for all social platforms",
        icon: MessageSquare,
        inputs: [
          { name: "platform", label: "Platform", type: "select", options: ["Twitter", "LinkedIn", "Facebook", "Instagram"] },
          { name: "topic", label: "Post Topic", type: "text", placeholder: "What's your post about?" },
          { name: "style", label: "Style", type: "select", options: ["Engaging", "Professional", "Humorous", "Inspirational"] }
        ]
      },
      {
        id: "email-writer",
        name: "Email Generator",
        description: "Write professional emails that get responses",
        icon: Mail,
        inputs: [
          { name: "type", label: "Email Type", type: "select", options: ["Sales", "Follow-up", "Cold Outreach", "Newsletter"] },
          { name: "subject", label: "Subject", type: "text", placeholder: "Email subject..." },
          { name: "context", label: "Context", type: "textarea", placeholder: "Provide context for your email..." }
        ]
      }
    ],
    marketing: [
      {
        id: "ad-copy",
        name: "Ad Copy Generator",
        description: "Create compelling ad copy that converts",
        icon: Target,
        inputs: [
          { name: "product", label: "Product/Service", type: "text", placeholder: "What are you advertising?" },
          { name: "audience", label: "Target Audience", type: "text", placeholder: "Who is your target audience?" },
          { name: "platform", label: "Platform", type: "select", options: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Twitter Ads"] }
        ]
      },
      {
        id: "seo-optimizer",
        name: "SEO Content Optimizer",
        description: "Optimize your content for search engines",
        icon: TrendingUp,
        inputs: [
          { name: "keyword", label: "Target Keyword", type: "text", placeholder: "Enter your target keyword..." },
          { name: "content", label: "Content", type: "textarea", placeholder: "Paste your content here..." },
          { name: "type", label: "Content Type", type: "select", options: ["Blog Post", "Product Page", "Landing Page", "Article"] }
        ]
      }
    ],
    business: [
      {
        id: "business-plan",
        name: "Business Plan Generator",
        description: "Create comprehensive business plans",
        icon: FileText,
        inputs: [
          { name: "business", label: "Business Idea", type: "text", placeholder: "Describe your business idea..." },
          { name: "industry", label: "Industry", type: "text", placeholder: "What industry are you in?" },
          { name: "market", label: "Target Market", type: "text", placeholder: "Who is your target market?" }
        ]
      },
      {
        id: "swot-analysis",
        name: "SWOT Analysis",
        description: "Generate detailed SWOT analysis for your business",
        icon: BarChart3,
        inputs: [
          { name: "company", label: "Company/Product", type: "text", placeholder: "Enter company or product name..." },
          { name: "industry", label: "Industry", type: "text", placeholder: "What industry?" },
          { name: "context", label: "Additional Context", type: "textarea", placeholder: "Any additional context..." }
        ]
      }
    ]
  };

  const handleToolSubmit = async (toolId: string, inputs: { [key: string]: string }) => {
    setLoading({ ...loading, [toolId]: true });
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = {
        "blog-writer": `# ${inputs.topic || "Your Blog Topic"}

## Introduction
This comprehensive guide explores the fascinating world of ${inputs.topic?.toLowerCase() || "your chosen topic"}. In today's rapidly evolving landscape, understanding this subject is crucial for success.

## Key Points
1. **Foundation Knowledge**: Understanding the basics is essential for building expertise
2. **Practical Applications**: Real-world implementation strategies that work
3. **Best Practices**: Industry-proven methods for optimal results
4. **Future Trends**: What to expect in the coming years

## Conclusion
By implementing these strategies and staying informed about developments in ${inputs.topic?.toLowerCase() || "this field"}, you'll be well-positioned for success.

*Generated with AI Corner's Blog Writer tool*`,
        
        "social-posts": `🚀 Exciting news about ${inputs.topic || "your topic"}! 

${inputs.platform === "LinkedIn" ? "As professionals, we need to stay ahead of the curve." : "This is a game-changer!"} 

Key takeaways:
✅ Innovation drives success
✅ Staying informed is crucial  
✅ Action beats perfection

What are your thoughts? Share in the comments! 👇

#Innovation #Success #Growth`,

        "email-writer": `Subject: ${inputs.subject || "Your Email Subject"}

Hi [Name],

I hope this email finds you well. I'm reaching out regarding ${inputs.subject?.toLowerCase() || "the topic you mentioned"}.

Based on your recent interest, I thought you might find value in our solution that helps businesses like yours achieve better results.

Here's what makes us different:
• Proven track record with 500+ satisfied clients
• 24/7 support and guidance
• Risk-free trial period

Would you be available for a brief 15-minute call this week to discuss how we can help you achieve your goals?

Best regards,
[Your Name]`,

        "ad-copy": `🎯 **Headline**: Transform Your ${inputs.product || "Business"} Today!

**Description**: 
Discover how ${inputs.audience || "smart business owners"} are using our proven system to achieve remarkable results. Join thousands who've already transformed their approach.

✅ Proven results in 30 days
✅ No long-term commitments  
✅ Expert support included

**Call-to-Action**: Start Your Free Trial Now!

*Optimized for ${inputs.platform || "your chosen platform"}*`,

        "seo-optimizer": `📈 **SEO Optimization Report for "${inputs.keyword || "your keyword"}"**

**Content Score**: 85/100

**Improvements Made**:
• Keyword density optimized to 1.5%
• Added semantic keywords: related terms, synonyms
• Improved meta description
• Enhanced readability score
• Added internal linking opportunities

**Recommended Changes**:
1. Add more long-tail variations
2. Include FAQ section
3. Optimize images with alt text
4. Add schema markup

**Optimized Content Preview**:
[Your content has been optimized for better search engine visibility while maintaining natural readability...]`,

        "business-plan": `# Business Plan: ${inputs.business || "Your Business"}

## Executive Summary
${inputs.business || "Your innovative business concept"} addresses a significant market opportunity in the ${inputs.industry || "target industry"} sector.

## Market Analysis
- **Target Market**: ${inputs.market || "Your defined target market"}
- **Market Size**: Estimated $X billion opportunity
- **Growth Rate**: X% annual growth projected

## Business Model
- Revenue streams clearly defined
- Scalable operations structure
- Competitive advantages identified

## Financial Projections
- Year 1: $X revenue target
- Break-even: Month X
- ROI: X% projected

## Next Steps
1. Secure initial funding
2. Develop MVP
3. Launch pilot program
4. Scale operations

*Generated with AI Corner's Business Plan tool*`,

        "swot-analysis": `# SWOT Analysis: ${inputs.company || "Your Company"}

## Strengths 💪
• Strong brand recognition in ${inputs.industry || "the market"}
• Experienced leadership team
• Innovative product/service offering
• Loyal customer base
• Efficient operations

## Weaknesses ⚠️
• Limited market presence in new segments
• Dependency on key personnel
• Higher costs compared to competitors
• Limited digital marketing presence

## Opportunities 🚀
• Growing market demand in ${inputs.industry || "your industry"}
• Potential for strategic partnerships
• Expansion into new geographic markets
• Technology integration possibilities
• Emerging customer segments

## Threats ⚡
• Increasing competition
• Economic uncertainty
• Regulatory changes
• Technology disruption
• Changing consumer preferences

## Strategic Recommendations
1. Leverage strengths to capitalize on opportunities
2. Address weaknesses through targeted improvements
3. Develop contingency plans for identified threats
4. Focus on sustainable competitive advantages`
      };

      setResults({ ...results, [toolId]: mockResults[toolId as keyof typeof mockResults] || "Result generated successfully!" });
      setLoading({ ...loading, [toolId]: false });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              50+ AI Tools Available
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
                AI Tools Dashboard
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Access powerful AI tools to automate your work, boost productivity, and create amazing content in seconds.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "border-slate-600 text-gray-300 hover:bg-slate-800"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {tools[activeCategory as keyof typeof tools]?.map((tool) => (
              <Card key={tool.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const inputs: { [key: string]: string } = {};
                      tool.inputs.forEach(input => {
                        inputs[input.name] = formData.get(input.name) as string;
                      });
                      handleToolSubmit(tool.id, inputs);
                    }}
                    className="space-y-4"
                  >
                    {tool.inputs.map((input) => (
                      <div key={input.name}>
                        <label className="text-white text-sm font-medium mb-2 block">
                          {input.label}
                        </label>
                        {input.type === "text" && (
                          <Input
                            name={input.name}
                            placeholder={input.placeholder}
                            className="bg-slate-700 border-slate-600 text-white"
                            required
                          />
                        )}
                        {input.type === "textarea" && (
                          <Textarea
                            name={input.name}
                            placeholder={input.placeholder}
                            className="bg-slate-700 border-slate-600 text-white"
                            rows={3}
                            required
                          />
                        )}
                        {input.type === "select" && (
                          <select
                            name={input.name}
                            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                            required
                          >
                            <option value="">Select {input.label}</option>
                            {input.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="submit"
                      disabled={loading[tool.id]}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {loading[tool.id] ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Results */}
                  {results[tool.id] && (
                    <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Generated Result
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(results[tool.id])}
                          className="border-slate-600 text-gray-300 hover:bg-slate-600"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="text-gray-300 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                        {results[tool.id]}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Upgrade CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Unlock All 50+ AI Tools
                </h3>
                <p className="text-gray-300 mb-6">
                  Get unlimited access to our complete AI toolkit, advanced features, and priority support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Upgrade to Pro - $47/month
                  </Button>
                  <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
                    View All Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
