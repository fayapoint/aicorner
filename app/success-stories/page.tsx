"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Quote,
  BarChart3,
  Target,
  Zap,
  Award,
  Building,
  ShoppingCart,
  Stethoscope,
  Home,
  Briefcase,
  Coffee,
  Play,
  CheckCircle,
  Calendar,
  MapPin,
  X
} from "lucide-react";

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const successStories = [
    {
      id: 1,
      company: "Sweet Delights Bakery",
      industry: "Food & Beverage",
      size: "Small Business",
      location: "Portland, OR",
      owner: "Maria Santos",
      avatar: "/api/placeholder/64/64",
      challenge: "Manual inventory management and unpredictable demand forecasting",
      solution: "AI-powered inventory optimization and demand prediction system",
      results: {
        revenue: "+40%",
        costs: "-25%",
        time: "15 hours/week saved",
        satisfaction: "98% customer satisfaction"
      },
      metrics: [
        { label: "Revenue Increase", value: "40%", icon: TrendingUp },
        { label: "Cost Reduction", value: "25%", icon: DollarSign },
        { label: "Time Saved", value: "15h/week", icon: Clock },
        { label: "ROI", value: "320%", icon: Target }
      ],
      testimonial: "I was terrified of AI, but AI Corner made it so simple. Now my bakery runs like clockwork, and I've increased profits by 40% while working fewer hours. It's been life-changing!",
      timeline: "3 months",
      category: "small-business",
      featured: true,
      videoUrl: "/api/placeholder/video",
      beforeAfter: {
        before: "Manual spreadsheets, frequent stockouts, 60-hour work weeks",
        after: "Automated inventory, predictive ordering, 45-hour work weeks with higher profits"
      }
    },
    {
      id: 2,
      company: "TechFlow Marketing",
      industry: "Marketing Agency",
      size: "Medium Business",
      location: "Austin, TX",
      owner: "João Silva",
      avatar: "/api/placeholder/64/64",
      challenge: "Time-consuming content creation and client reporting processes",
      solution: "AI content generation and automated reporting dashboard",
      results: {
        revenue: "+65%",
        costs: "-30%",
        time: "25 hours/week saved",
        satisfaction: "95% client retention"
      },
      metrics: [
        { label: "Revenue Growth", value: "65%", icon: TrendingUp },
        { label: "Efficiency Gain", value: "300%", icon: Zap },
        { label: "Client Capacity", value: "+150%", icon: Users },
        { label: "Time Saved", value: "25h/week", icon: Clock }
      ],
      testimonial: "The custom AI solutions saved my company $50k annually and allowed us to take on 150% more clients. The team understood exactly what we needed and delivered beyond expectations.",
      timeline: "4 months",
      category: "marketing",
      featured: true,
      videoUrl: "/api/placeholder/video",
      beforeAfter: {
        before: "Manual content creation, 3-day report generation, 20 clients max",
        after: "AI-assisted content, instant reports, 50+ clients with same team size"
      }
    },
    {
      id: 3,
      company: "HealthFirst Clinic",
      industry: "Healthcare",
      size: "Medium Business",
      location: "Miami, FL",
      owner: "Dr. Ana Costa",
      avatar: "/api/placeholder/64/64",
      challenge: "Patient scheduling conflicts and administrative overhead",
      solution: "AI-powered scheduling optimization and patient communication system",
      results: {
        revenue: "+35%",
        costs: "-20%",
        time: "20 hours/week saved",
        satisfaction: "99% patient satisfaction"
      },
      metrics: [
        { label: "Patient Capacity", value: "+35%", icon: Users },
        { label: "No-shows Reduced", value: "60%", icon: Calendar },
        { label: "Admin Time Saved", value: "20h/week", icon: Clock },
        { label: "Patient Satisfaction", value: "99%", icon: Star }
      ],
      testimonial: "Even as an AI expert, I found incredible value in the community and cutting-edge research access. The implementation support was outstanding, and our patient satisfaction scores have never been higher.",
      timeline: "5 months",
      category: "healthcare",
      featured: false,
      videoUrl: "/api/placeholder/video",
      beforeAfter: {
        before: "Double bookings, high no-show rates, overwhelmed staff",
        after: "Optimized scheduling, automated reminders, happy patients and staff"
      }
    },
    {
      id: 4,
      company: "Elite Properties",
      industry: "Real Estate",
      size: "Small Business",
      location: "Denver, CO",
      owner: "Michael Chen",
      avatar: "/api/placeholder/64/64",
      challenge: "Lead qualification and property matching inefficiencies",
      solution: "AI chatbot for lead qualification and automated property recommendations",
      results: {
        revenue: "+80%",
        costs: "-15%",
        time: "30 hours/week saved",
        satisfaction: "92% client satisfaction"
      },
      metrics: [
        { label: "Sales Increase", value: "80%", icon: TrendingUp },
        { label: "Lead Quality", value: "+200%", icon: Target },
        { label: "Response Time", value: "Instant", icon: Zap },
        { label: "Conversion Rate", value: "+150%", icon: BarChart3 }
      ],
      testimonial: "The AI chatbot handles initial client inquiries 24/7, qualifying leads while I sleep. My sales have increased 80% and I'm working smarter, not harder.",
      timeline: "2 months",
      category: "real-estate",
      featured: false,
      videoUrl: "/api/placeholder/video",
      beforeAfter: {
        before: "Manual lead follow-up, missed opportunities, low conversion rates",
        after: "24/7 lead qualification, instant responses, 150% higher conversion"
      }
    },
    {
      id: 5,
      company: "Global Manufacturing Inc",
      industry: "Manufacturing",
      size: "Enterprise",
      location: "Detroit, MI",
      owner: "Sarah Johnson",
      avatar: "/api/placeholder/64/64",
      challenge: "Predictive maintenance and quality control across multiple facilities",
      solution: "Enterprise AI platform for predictive maintenance and quality assurance",
      results: {
        revenue: "+25%",
        costs: "-40%",
        time: "200 hours/week saved",
        satisfaction: "99.5% uptime"
      },
      metrics: [
        { label: "Downtime Reduced", value: "75%", icon: Clock },
        { label: "Maintenance Costs", value: "-40%", icon: DollarSign },
        { label: "Quality Defects", value: "-85%", icon: CheckCircle },
        { label: "Productivity", value: "+25%", icon: TrendingUp }
      ],
      testimonial: "The enterprise AI implementation transformed our entire operation. We've reduced downtime by 75% and maintenance costs by 40% across all facilities. The ROI was evident within the first quarter.",
      timeline: "8 months",
      category: "enterprise",
      featured: true,
      videoUrl: "/api/placeholder/video",
      beforeAfter: {
        before: "Reactive maintenance, frequent breakdowns, quality issues",
        after: "Predictive maintenance, 99.5% uptime, zero quality defects"
      }
    }
  ];

  const categories = [
    { id: "all", name: "All Stories", count: successStories.length },
    { id: "small-business", name: "Small Business", count: successStories.filter(s => s.category === "small-business").length },
    { id: "marketing", name: "Marketing", count: successStories.filter(s => s.category === "marketing").length },
    { id: "healthcare", name: "Healthcare", count: successStories.filter(s => s.category === "healthcare").length },
    { id: "real-estate", name: "Real Estate", count: successStories.filter(s => s.category === "real-estate").length },
    { id: "enterprise", name: "Enterprise", count: successStories.filter(s => s.category === "enterprise").length }
  ];

  const filteredStories = successStories.filter(story => 
    selectedCategory === "all" || story.category === selectedCategory
  );

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case "Food & Beverage": return Coffee;
      case "Marketing Agency": return BarChart3;
      case "Healthcare": return Stethoscope;
      case "Real Estate": return Home;
      case "Manufacturing": return Building;
      default: return Briefcase;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
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
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🏆 Real Results from Real Businesses
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
                Success Stories
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                That Inspire
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover how businesses like yours have transformed their operations, increased profits, and achieved remarkable growth with AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Read Success Stories <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-400 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg rounded-xl">
                Start Your Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Businesses Transformed", value: "15,000+", icon: Building },
              { label: "Average Revenue Increase", value: "47%", icon: TrendingUp },
              { label: "Total Cost Savings", value: "$2.5M+", icon: DollarSign },
              { label: "Success Rate", value: "97%", icon: Award }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredStories.map((story, index) => {
              const IndustryIcon = getIndustryIcon(story.industry);
              return (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-green-400/40 transition-all duration-300 h-full ${
                    story.featured ? "ring-2 ring-green-500/50" : ""
                  }`}>
                    {story.featured && (
                      <div className="absolute -top-3 left-6">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
                          FEATURED
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {story.owner[0]}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{story.company}</h3>
                            <p className="text-gray-300">{story.owner}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <IndustryIcon className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-gray-400">{story.industry}</span>
                              <span className="text-gray-500">•</span>
                              <MapPin className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-gray-400">{story.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {story.size}
                        </Badge>
                      </div>

                      <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                        <Quote className="w-6 h-6 text-green-400 mb-2" />
                        <p className="text-gray-300 italic">"{story.testimonial}"</p>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {story.metrics.map((metric, idx) => {
                          const MetricIcon = metric.icon;
                          return (
                            <div key={idx} className="text-center">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <MetricIcon className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-2xl font-bold text-white">{metric.value}</div>
                              <div className="text-xs text-gray-400">{metric.label}</div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-3 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-1">Challenge:</h4>
                          <p className="text-sm text-gray-400">{story.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-1">Solution:</h4>
                          <p className="text-sm text-gray-400">{story.solution}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-400">Implementation: {story.timeline}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedStory(story.id)}
                            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Watch Story
                          </Button>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                        Read Full Case Study
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Before & After Showcase */}
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
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Transformation in Action
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See the dramatic before and after results our clients have achieved
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.slice(0, 3).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Building className="w-6 h-6 mr-2 text-green-400" />
                      {story.company}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {story.industry} • {story.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                          <X className="w-4 h-4 mr-2" />
                          Before AI
                        </h4>
                        <p className="text-gray-300 text-sm">{story.beforeAfter.before}</p>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          After AI
                        </h4>
                        <p className="text-gray-300 text-sm">{story.beforeAfter.after}</p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">
                          {story.results.revenue}
                        </div>
                        <div className="text-sm text-gray-400">Revenue Growth</div>
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
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🚀 Ready to Write Your Success Story?
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
                Your Success Story
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of businesses that have transformed their operations with AI. Start your journey today and become our next success story.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Your Transformation <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-400 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg rounded-xl">
                Book Free Consultation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">97%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">3 Months</div>
                <div className="text-gray-300">Average ROI Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-300">Expert Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
