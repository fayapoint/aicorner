"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  PlayCircle,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Target,
  TrendingUp,
  Brain,
  Code,
  BarChart3,
  Sparkles,
  Lock,
  Unlock
} from "lucide-react";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = [
    { id: "all", name: "All Courses", count: 24 },
    { id: "fundamentals", name: "AI Fundamentals", count: 8 },
    { id: "business", name: "Business AI", count: 6 },
    { id: "technical", name: "Technical", count: 5 },
    { id: "marketing", name: "AI Marketing", count: 5 }
  ];

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  const courses = [
    {
      id: 1,
      title: "AI Fundamentals for Everyone",
      description: "Master the basics of artificial intelligence with no technical background required",
      category: "fundamentals",
      level: "beginner",
      duration: "4 hours",
      lessons: 12,
      students: 2847,
      rating: 4.9,
      price: "Free",
      instructor: "Dr. Sarah Chen",
      image: "/api/placeholder/400/250",
      tags: ["Machine Learning", "AI Basics", "No Code"],
      isPremium: false,
      featured: true
    },
    {
      id: 2,
      title: "Business AI Strategy & Implementation",
      description: "Learn how to identify AI opportunities and implement solutions in your business",
      category: "business",
      level: "intermediate",
      duration: "6 hours",
      lessons: 18,
      students: 1923,
      rating: 4.8,
      price: "$97",
      instructor: "Mark Rodriguez",
      image: "/api/placeholder/400/250",
      tags: ["Strategy", "ROI", "Implementation"],
      isPremium: true,
      featured: true
    },
    {
      id: 3,
      title: "AI-Powered Marketing Automation",
      description: "Automate your marketing with AI tools and increase conversions by 300%",
      category: "marketing",
      level: "intermediate",
      duration: "5 hours",
      lessons: 15,
      students: 3421,
      rating: 4.9,
      price: "$67",
      instructor: "Lisa Thompson",
      image: "/api/placeholder/400/250",
      tags: ["Marketing", "Automation", "Conversion"],
      isPremium: true,
      featured: false
    },
    {
      id: 4,
      title: "Python for AI Development",
      description: "Build AI applications from scratch using Python and popular ML libraries",
      category: "technical",
      level: "advanced",
      duration: "12 hours",
      lessons: 32,
      students: 1567,
      rating: 4.7,
      price: "$147",
      instructor: "Alex Kumar",
      image: "/api/placeholder/400/250",
      tags: ["Python", "TensorFlow", "Development"],
      isPremium: true,
      featured: false
    },
    {
      id: 5,
      title: "ChatGPT for Business Productivity",
      description: "Master ChatGPT and AI prompting to 10x your productivity and efficiency",
      category: "business",
      level: "beginner",
      duration: "3 hours",
      lessons: 10,
      students: 4521,
      rating: 4.8,
      price: "Free",
      instructor: "Jennifer Park",
      image: "/api/placeholder/400/250",
      tags: ["ChatGPT", "Productivity", "Prompting"],
      isPremium: false,
      featured: true
    },
    {
      id: 6,
      title: "AI Data Analysis & Visualization",
      description: "Use AI to analyze data, create insights, and build stunning visualizations",
      category: "technical",
      level: "intermediate",
      duration: "8 hours",
      lessons: 24,
      students: 2134,
      rating: 4.6,
      price: "$97",
      instructor: "David Wilson",
      image: "/api/placeholder/400/250",
      tags: ["Data Analysis", "Visualization", "Insights"],
      isPremium: true,
      featured: false
    }
  ];

  const learningPaths = [
    {
      id: 1,
      title: "Complete AI Beginner Path",
      description: "Go from zero to AI-powered in 30 days",
      courses: 4,
      duration: "15 hours",
      students: 1847,
      price: "Free",
      color: "green"
    },
    {
      id: 2,
      title: "Business AI Transformation",
      description: "Transform your business with AI strategy and tools",
      courses: 6,
      duration: "25 hours",
      students: 923,
      price: "$197",
      color: "blue"
    },
    {
      id: 3,
      title: "AI Developer Certification",
      description: "Become a certified AI developer with hands-on projects",
      courses: 8,
      duration: "40 hours",
      students: 567,
      price: "$397",
      color: "purple"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

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
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              24 Courses Available
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
                Master AI Skills
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Transform Your Career
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From complete beginner to AI expert - structured learning paths, hands-on projects, and expert guidance every step of the way.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-12">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>15,000+ students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.8 average rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Certificates included</span>
              </div>
            </div>
          </motion.div>

          {/* Learning Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              🎯 Structured Learning Paths
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningPaths.map((path) => (
                <Card key={path.id} className={`bg-gradient-to-br from-${path.color}-500/20 to-${path.color}-600/20 border-${path.color}-500/50 hover:scale-105 transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`bg-${path.color}-500 text-white`}>
                        Learning Path
                      </Badge>
                      <span className={`text-${path.color}-400 font-bold text-lg`}>
                        {path.price}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-white">{path.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{path.courses} courses</span>
                      <span>{path.duration}</span>
                      <span>{path.students} students</span>
                    </div>
                    
                    <Button className={`w-full bg-gradient-to-r from-${path.color}-600 to-${path.color}-700 hover:from-${path.color}-700 hover:to-${path.color}-800`}>
                      Start Learning Path
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-white font-medium mr-4">Category:</span>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "border-slate-600 text-gray-300 hover:bg-slate-800"
                    }`}
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-white font-medium mr-4">Level:</span>
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level.id)}
                    className={`${
                      selectedLevel === level.id
                        ? "bg-green-600 text-white"
                        : "border-slate-600 text-gray-300 hover:bg-slate-800"
                    }`}
                  >
                    {level.name}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Courses Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                {course.featured && (
                  <div className="absolute -top-3 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {course.isPremium && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-purple-500 text-white">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                      {course.level}
                    </Badge>
                    <span className="text-lg font-bold text-white">
                      {course.price}
                    </span>
                  </div>
                  
                  <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-400 text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{course.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">by {course.instructor}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      course.isPremium 
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
                        : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    }`}
                  >
                    {course.isPremium ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Enroll Now
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 mr-2" />
                        Start Free
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Start Your AI Journey?
                </h3>
                <p className="text-gray-300 mb-6">
                  Join thousands of professionals who've already transformed their careers with AI. Start with free courses and upgrade as you grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Free Course
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-500/10">
                    View All Courses
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
