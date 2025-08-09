"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Target,
  Zap,
  Award,
  TrendingUp,
  Globe,
  Code,
  BarChart3,
  MessageSquare,
  Shield,
  Lightbulb,
  Rocket,
  Video,
  FileText,
  Download
} from "lucide-react";

// Consistent number formatting function to avoid hydration errors
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function LearnPage() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const learningPaths = [
    {
      id: "beginner",
      title: "AI Fundamentals",
      description: "Start your AI journey from zero to confident user",
      level: "Beginner",
      duration: "4 weeks",
      courses: 8,
      students: 12500,
      rating: 4.9,
      progress: 0,
      gradient: "from-green-500 to-emerald-500",
      icon: Lightbulb
    },
    {
      id: "business",
      title: "AI for Business",
      description: "Implement AI solutions in your business operations",
      level: "Intermediate",
      duration: "6 weeks",
      courses: 12,
      students: 8200,
      rating: 4.8,
      progress: 25,
      gradient: "from-blue-500 to-cyan-500",
      icon: Target
    },
    {
      id: "advanced",
      title: "AI Strategy & Leadership",
      description: "Lead AI transformation in your organization",
      level: "Advanced",
      duration: "8 weeks",
      courses: 15,
      students: 3400,
      rating: 4.9,
      progress: 0,
      gradient: "from-purple-500 to-pink-500",
      icon: Brain
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to Artificial Intelligence",
      description: "Learn the basics of AI, machine learning, and how they can benefit your business",
      instructor: "Dr. Sarah Chen",
      duration: "2.5 hours",
      lessons: 12,
      students: 15420,
      rating: 4.9,
      level: "Beginner",
      category: "Fundamentals",
      price: "Free",
      thumbnail: "/api/placeholder/300/200",
      tags: ["AI Basics", "Machine Learning", "Business Applications"],
      isNew: true,
      progress: 0
    },
    {
      id: 2,
      title: "ChatGPT for Business Productivity",
      description: "Master ChatGPT and AI writing tools to boost your productivity by 300%",
      instructor: "Marcus Rodriguez",
      duration: "3 hours",
      lessons: 18,
      students: 22100,
      rating: 4.8,
      level: "Beginner",
      category: "Tools",
      price: "Included",
      thumbnail: "/api/placeholder/300/200",
      tags: ["ChatGPT", "Productivity", "Writing"],
      isNew: false,
      progress: 45
    },
    {
      id: 3,
      title: "Building AI Chatbots Without Code",
      description: "Create intelligent chatbots for customer service and lead generation",
      instructor: "Emily Watson",
      duration: "4 hours",
      lessons: 24,
      students: 8900,
      rating: 4.7,
      level: "Intermediate",
      category: "Automation",
      price: "Included",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Chatbots", "No-Code", "Customer Service"],
      isNew: false,
      progress: 0
    },
    {
      id: 4,
      title: "AI-Powered Data Analysis",
      description: "Use AI to analyze data, create insights, and make better business decisions",
      instructor: "Dr. James Liu",
      duration: "5 hours",
      lessons: 30,
      students: 6700,
      rating: 4.9,
      level: "Intermediate",
      category: "Analytics",
      price: "Pro Plan",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Data Analysis", "Business Intelligence", "Decision Making"],
      isNew: true,
      progress: 0
    },
    {
      id: 5,
      title: "AI Ethics and Responsible Implementation",
      description: "Learn to implement AI responsibly with proper ethics and governance",
      instructor: "Dr. Maria Santos",
      duration: "3.5 hours",
      lessons: 20,
      students: 4200,
      rating: 4.8,
      level: "Advanced",
      category: "Ethics",
      price: "Pro Plan",
      thumbnail: "/api/placeholder/300/200",
      tags: ["AI Ethics", "Governance", "Responsible AI"],
      isNew: false,
      progress: 0
    },
    {
      id: 6,
      title: "Enterprise AI Strategy",
      description: "Develop comprehensive AI strategies for large-scale implementations",
      instructor: "Robert Johnson",
      duration: "6 hours",
      lessons: 35,
      students: 2100,
      rating: 4.9,
      level: "Advanced",
      category: "Strategy",
      price: "Enterprise",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Enterprise", "Strategy", "Implementation"],
      isNew: false,
      progress: 0
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", count: courses.length },
    { id: "fundamentals", name: "Fundamentals", count: courses.filter(c => c.category === "Fundamentals").length },
    { id: "tools", name: "Tools", count: courses.filter(c => c.category === "Tools").length },
    { id: "automation", name: "Automation", count: courses.filter(c => c.category === "Automation").length },
    { id: "analytics", name: "Analytics", count: courses.filter(c => c.category === "Analytics").length },
    { id: "ethics", name: "Ethics", count: courses.filter(c => c.category === "Ethics").length },
    { id: "strategy", name: "Strategy", count: courses.filter(c => c.category === "Strategy").length }
  ];

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    const matchesCategory = selectedCategory === "all" || course.category.toLowerCase() === selectedCategory;
    return matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 text-sm font-medium mb-6">
              📚 Learn AI at Your Own Pace
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
                AI Learning
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From complete beginner to AI expert - structured learning paths, hands-on projects, and expert guidance every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/courses">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
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
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Structured Learning Paths
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our expertly designed learning paths to master AI step by step
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => {
              const IconComponent = path.icon;
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${path.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-2xl text-white">{path.title}</CardTitle>
                        <Badge className={`bg-gradient-to-r ${path.gradient} text-white`}>
                          {path.level}
                        </Badge>
                      </div>
                      
                      <CardDescription className="text-gray-300 text-base">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">{path.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{path.courses} courses</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">{formatNumber(path.students)} students</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-gray-300">{path.rating}</span>
                          </div>
                        </div>
                        
                        {path.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                              <span>Progress</span>
                              <span>{path.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                                style={{ width: `${path.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button className={`w-full bg-gradient-to-r ${path.gradient} hover:opacity-90 text-white`}>
                        {path.progress > 0 ? "Continue Learning" : "Start Path"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Filters */}
      <section className="py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">All Courses</h3>
              <p className="text-gray-300">Choose from {courses.length} expert-designed courses</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2">
                <span className="text-sm text-gray-300 self-center">Level:</span>
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedLevel === level.id
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <span className="text-sm text-gray-300 self-center">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-700 text-gray-300 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-r from-slate-700 to-slate-600 rounded-t-lg flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/50" />
                    </div>

                    <div className="absolute top-4 left-4 flex gap-2">
                      {course.isNew && (
                        <Badge className="bg-green-500 text-white">NEW</Badge>
                      )}
                      <Badge className={`${
                        course.price === "Free" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                        course.price === "Included" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                        "bg-purple-500/20 text-purple-400 border-purple-500/30"
                      }`}>
                        {course.price}
                      </Badge>
                    </div>

                    {course.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-1 w-full bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {course.level}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{course.rating}</span>
                      </div>
                    </div>

                    <CardTitle className="text-xl text-white leading-tight">
                      {course.title}
                    </CardTitle>

                    <CardDescription className="text-gray-300 text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4 mb-6">
                      <div className="text-sm text-gray-400">
                        by {course.instructor}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">{formatNumber(course.students)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">Certificate</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                        {course.progress > 0 ? "Continue" : "Start Course"}
                      </Button>
                      {course.price !== "Free" && (
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Benefits */}
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
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Why Learn AI with Us?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We make AI learning accessible, practical, and results-driven for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Expert-Led Content",
                description: "Learn from industry leaders and AI practitioners with real-world experience",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Target,
                title: "Practical Projects",
                description: "Build real AI solutions you can use immediately in your work or business",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Get help from 15,000+ learners and AI experts in our supportive community",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Award,
                title: "Industry Certificates",
                description: "Earn recognized certificates to showcase your AI skills to employers",
                gradient: "from-yellow-500 to-orange-500"
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
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-blue-400/40 transition-all duration-300 h-full text-center">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🎓 Start Learning Today
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
                Master AI Skills
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Transform Your Career
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who've already transformed their careers with AI. Start with free courses and upgrade as you grow.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Free Course <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg rounded-xl">
                View All Courses
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-300">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">25,000+</div>
                <div className="text-gray-300">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">4.9★</div>
                <div className="text-gray-300">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
