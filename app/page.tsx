"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomepageNews } from "@/components/homepage-news";
import {
  Shield,
  Brain,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Bot,
  Code,
  BarChart3,
  Heart,
  Lightbulb,
  Target,
  TrendingUp,
  Award,
  Clock,
  DollarSign
} from "lucide-react";

export default function Home() {

  // Hero Section with Strong Value Proposition
  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-medium">
            🛡️ Your AI Safety Haven
          </Badge>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8">
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            AI Solutions
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            For Everyone
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Whether you're afraid of AI or you're an expert - this is your safe space to explore, learn, and implement AI solutions that actually work.
          <span className="text-purple-300 font-semibold"> Join thousands who've transformed their lives and businesses with AI.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <a href="/trial">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
              Start Your AI Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="/solutions">
            <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
              Explore Solutions
            </Button>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div className="text-center">
              <span className="text-gray-300 font-medium block">100% Safe & Secure</span>
              <span className="text-gray-500 text-sm">No scary tech jargon</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div className="text-center">
              <span className="text-gray-300 font-medium block">15,000+ Success Stories</span>
              <span className="text-gray-500 text-sm">From beginners to experts</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Award className="w-8 h-8 text-yellow-400" />
            <div className="text-center">
              <span className="text-gray-300 font-medium block">97% Success Rate</span>
              <span className="text-gray-500 text-sm">Real results guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Skill Level Navigation
  const SkillLevelSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Find Your Perfect Fit
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No matter where you are in your AI journey, we have the right solution waiting for you
          </p>
        </div>

        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-800/50 p-2 rounded-2xl">
            <TabsTrigger value="beginner" className="text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500">
              🌱 AI Beginner
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500">
              🚀 Growing Fast
            </TabsTrigger>
            <TabsTrigger value="expert" className="text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              🎯 AI Expert
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beginner" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">AI Basics Course</CardTitle>
                  <CardDescription className="text-gray-300">
                    Start from zero. Learn what AI really is and how it can help you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Simple explanations</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Hands-on practice</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Personal guidance</li>
                  </ul>
                  <a href="/courses">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      Start Learning
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Ready-Made AI Tools</CardTitle>
                  <CardDescription className="text-gray-300">
                    Use powerful AI tools without any technical knowledge required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> One-click solutions</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> No coding needed</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Instant results</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Try Tools
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Safe Space Community</CardTitle>
                  <CardDescription className="text-gray-300">
                    Join thousands learning AI in a supportive, judgment-free environment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Ask any question</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Get real help</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Make friends</li>
                  </ul>
                  <a href="/community">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      Join Community
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="intermediate" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Custom AI Solutions</CardTitle>
                  <CardDescription className="text-gray-300">
                    Tailored AI implementations for your specific business needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Business analysis</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Custom development</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Full support</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Get Custom Solution
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Scale Your Business</CardTitle>
                  <CardDescription className="text-gray-300">
                    Advanced automation and AI integration for growing companies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Process automation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> AI integration</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> ROI tracking</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Scale Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Advanced Training</CardTitle>
                  <CardDescription className="text-gray-300">
                    Deep-dive courses for serious AI implementation and strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Expert mentorship</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Real projects</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Certification</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Advanced Training
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expert" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Enterprise AI Architecture</CardTitle>
                  <CardDescription className="text-gray-300">
                    Complex AI system design and implementation for large organizations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> System architecture</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Team leadership</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Strategic planning</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Enterprise Solutions
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Expert Network</CardTitle>
                  <CardDescription className="text-gray-300">
                    Connect with top AI professionals and collaborate on cutting-edge projects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Exclusive network</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> High-value projects</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Industry insights</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Join Network
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Cutting-Edge Research</CardTitle>
                  <CardDescription className="text-gray-300">
                    Access to latest AI research, beta tools, and experimental technologies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Early access</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Research collaboration</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Innovation labs</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Access Research
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );

  // Testimonials Section
  const TestimonialsSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Real People, Real Results
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how AI Corner has transformed lives and businesses across the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Maria Santos</h4>
                  <p className="text-gray-400 text-sm">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "I was terrified of AI, but AI Corner made it so simple. Now my bakery uses AI for inventory and I've increased profits by 40%!"
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">João Silva</h4>
                  <p className="text-gray-400 text-sm">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The custom AI solutions saved my company $50k annually. The team understood exactly what we needed."
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Ana Costa</h4>
                  <p className="text-gray-400 text-sm">AI Consultant</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Even as an AI expert, I found incredible value in the community and cutting-edge research access."
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">15,000+</div>
              <div className="text-gray-300">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">97%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">$2.5M+</div>
              <div className="text-gray-300">Saved by Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Why Choose AI Corner Section
  const WhyChooseSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Safe Haven in the AI World
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We understand AI can feel overwhelming. That's why we created a judgment-free space where everyone can learn and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">No Judgment Zone</CardTitle>
              <CardDescription className="text-gray-300">
                Ask any question, no matter how basic. Our community celebrates every step of your AI journey.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Human-First Approach</CardTitle>
              <CardDescription className="text-gray-300">
                Real humans behind every solution. We explain AI in simple terms and always put your needs first.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Start Small, Dream Big</CardTitle>
              <CardDescription className="text-gray-300">
                Begin with just $3/month and grow at your own pace. No pressure, no overwhelming commitments.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Practical Solutions</CardTitle>
              <CardDescription className="text-gray-300">
                No theoretical fluff. Every tool and lesson is designed to solve real problems and create real value.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border-pink-500/20 hover:border-pink-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Supportive Community</CardTitle>
              <CardDescription className="text-gray-300">
                Connect with like-minded people on the same journey. Share wins, get help, make friends.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Proven ROI</CardTitle>
              <CardDescription className="text-gray-300">
                Our clients typically see 300%+ return on investment within 90 days. Your success is our success.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );

  // Comprehensive Services Section
  const ServicesSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Complete AI Solutions Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to succeed with AI - from your first steps to enterprise-level implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Ready-Made AI Tools */}
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Ready-Made AI Tools</CardTitle>
              <CardDescription className="text-gray-300">
                Plug-and-play AI solutions you can use immediately - no technical knowledge required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> ChatFlow AI - WhatsApp automation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> LocalSEO Master - Google ranking</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> WebBuilder Pro - Instant websites</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Content Generator - AI writing</li>
              </ul>
              <a href="/tools-dashboard">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  Try Free Tools
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Custom AI Development */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Custom AI Development</CardTitle>
              <CardDescription className="text-gray-300">
                Tailored AI solutions built specifically for your business needs and challenges.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Business process automation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Custom chatbots & AI assistants</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Data analysis & insights</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> API integrations</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Get Custom Solution
              </Button>
            </CardContent>
          </Card>

          {/* AI Training & Education */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">AI Training & Education</CardTitle>
              <CardDescription className="text-gray-300">
                Comprehensive learning programs from absolute beginner to AI expert level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> AI Basics for beginners</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Business AI implementation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Advanced AI strategies</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Certification programs</li>
              </ul>
              <a href="/courses">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Start Learning
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Consulting Services */}
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">AI Consulting</CardTitle>
              <CardDescription className="text-gray-300">
                Strategic guidance from AI experts to transform your business with artificial intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> AI strategy development</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> Implementation roadmaps</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> ROI optimization</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> Team training</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                Book Consultation
              </Button>
            </CardContent>
          </Card>

          {/* Community Access */}
          <Card className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Exclusive Community</CardTitle>
              <CardDescription className="text-gray-300">
                Join our supportive community of AI enthusiasts, beginners, and experts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-pink-400 mr-2" /> 24/7 community support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-pink-400 mr-2" /> Weekly expert Q&A sessions</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-pink-400 mr-2" /> Exclusive resources</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-pink-400 mr-2" /> Networking opportunities</li>
              </ul>
              <a href="/community">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
                  Join Community
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Enterprise Solutions */}
          <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Enterprise Solutions</CardTitle>
              <CardDescription className="text-gray-300">
                Large-scale AI implementations with dedicated support and custom architecture.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-400 mr-2" /> Dedicated account manager</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-400 mr-2" /> Custom AI architecture</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-400 mr-2" /> Priority support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-400 mr-2" /> Scalable solutions</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );

  // Pricing Section
  const PricingSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Start Small, Scale Big
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Begin your AI journey for just $3/month and grow at your own pace. No long-term commitments, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Starter Plan */}
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1">
                MOST POPULAR
              </Badge>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl text-white mb-2">Starter</CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-bold text-green-400">$3</span>
                <span className="text-gray-400">/month</span>
              </div>
              <CardDescription className="text-gray-300">
                Perfect for AI beginners who want to dip their toes in the water
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Access to basic AI tools</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Community support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Weekly AI tips</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Basic templates</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Quick consultations</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Growth Plan */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">Growth</CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-bold text-blue-400">$47</span>
                <span className="text-gray-400">/month</span>
              </div>
              <CardDescription className="text-gray-300">
                For businesses ready to implement AI solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Everything in Starter</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Advanced AI tools</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Priority support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Monthly consultations</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Custom integrations</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Analytics dashboard</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Upgrade to Growth
              </Button>
            </CardContent>
          </Card>

          {/* Professional Plan */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">Professional</CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-bold text-purple-400">$147</span>
                <span className="text-gray-400">/month</span>
              </div>
              <CardDescription className="text-gray-300">
                For serious businesses scaling with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Everything in Growth</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Custom AI development</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Dedicated support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Weekly consultations</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> Advanced automations</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-400 mr-2" /> White-label solutions</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Go Professional
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">Enterprise</CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-bold text-yellow-400">$497</span>
                <span className="text-gray-400">/month</span>
              </div>
              <CardDescription className="text-gray-300">
                For large organizations with complex AI needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> Everything in Professional</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> Unlimited consultations</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> Account manager</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> Custom architecture</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> 24/7 priority support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-yellow-400 mr-2" /> SLA guarantees</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Not Sure Which Plan is Right?</h3>
            <p className="text-gray-300 mb-6">
              Start with our $3 Starter plan and upgrade anytime as your needs grow. No penalties, no hassles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Start Free 14-Day Trial
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // AI Tools Demo Section
  const ToolsDemoSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Try Our AI Tools Right Now
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - experience the power of AI with these free interactive demos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ROI Calculator */}
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">AI ROI Calculator</CardTitle>
              <CardDescription className="text-gray-300">
                Calculate how much money AI can save your business in the first year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Monthly Revenue ($)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Employees</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold text-xl">Potential Savings:</div>
                  <div className="text-white text-2xl font-bold">$24,000/year</div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Get Detailed Report
              </Button>
            </CardContent>
          </Card>

          {/* Content Generator */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">AI Content Generator</CardTitle>
              <CardDescription className="text-gray-300">
                Generate professional content for your business in seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Content Type</label>
                  <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <option>Social Media Post</option>
                    <option>Email Subject Line</option>
                    <option>Product Description</option>
                    <option>Blog Title</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Topic</label>
                  <input
                    type="text"
                    placeholder="AI for small businesses"
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 font-bold text-sm mb-2">Generated Content:</div>
                  <div className="text-white text-sm">"Transform your small business with AI - Start saving time and money today! 🚀 #AIForBusiness"</div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Generate More Content
              </Button>
            </CardContent>
          </Card>

          {/* Business Automation Planner */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Automation Planner</CardTitle>
              <CardDescription className="text-gray-300">
                Discover which business processes you can automate with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Business Type</label>
                  <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <option>E-commerce</option>
                    <option>Service Business</option>
                    <option>Restaurant</option>
                    <option>Real Estate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Biggest Challenge</label>
                  <select className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <option>Customer Support</option>
                    <option>Lead Generation</option>
                    <option>Inventory Management</option>
                    <option>Scheduling</option>
                  </select>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-purple-400 font-bold text-sm mb-2">Recommended Automation:</div>
                  <div className="text-white text-sm">AI Chatbot for 24/7 customer support - Save 15 hours/week</div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Get Full Automation Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-gray-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to See What AI Can Do for You?</h3>
            <p className="text-gray-300 mb-6">
              These are just a taste of the 50+ AI tools available to our members. Start your free trial and unlock the full suite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/trial">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Access All Tools - Start $3 Trial
                </Button>
              </a>
              <a href="/tools-dashboard">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
                  View All 50+ Tools
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Community & Support Section
  const CommunitySection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              You're Never Alone in Your AI Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our supportive community where questions are welcomed, success is celebrated, and everyone helps each other grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Community Features */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Supportive Community</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">15,000+ Active Members</h4>
                  <p className="text-gray-300">Connect with AI enthusiasts from beginners to experts, all learning and growing together.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">No Judgment Zone</h4>
                  <p className="text-gray-300">Ask any question, share any concern. Our community celebrates every step of your journey.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">24/7 Support</h4>
                  <p className="text-gray-300">Get help anytime with our round-the-clock community support and expert moderators.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Multiple Support Channels</h3>
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">💬</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Live Chat Support</h4>
                      <p className="text-gray-300 text-sm">Instant help when you need it most</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">📚</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Knowledge Base</h4>
                      <p className="text-gray-300 text-sm">Comprehensive guides and tutorials</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">🎯</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Expert Consultations</h4>
                      <p className="text-gray-300 text-sm">One-on-one guidance from AI specialists</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">🎥</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Weekly Webinars</h4>
                      <p className="text-gray-300 text-sm">Live sessions with AI experts and Q&A</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-3">Is AI really safe for my business?</h4>
                <p className="text-gray-300 text-sm">Absolutely! We only recommend proven, secure AI solutions and guide you through safe implementation practices. Your data security is our top priority.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-3">I know nothing about AI. Can I still benefit?</h4>
                <p className="text-gray-300 text-sm">Perfect! That's exactly who we built this for. Our beginner-friendly approach means you'll be using AI confidently within days, not months.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-3">What if I need help implementing solutions?</h4>
                <p className="text-gray-300 text-sm">We provide step-by-step guidance, live support, and even done-for-you implementation services. You're never left to figure things out alone.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-3">Can I cancel anytime?</h4>
                <p className="text-gray-300 text-sm">Yes! No long-term contracts or cancellation fees. We're confident you'll love the value, but you're free to leave anytime.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Our AI Family?</h3>
            <p className="text-gray-300 mb-6">
              Start with our $3 trial and experience the most supportive AI community on the internet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/trial">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Join Community - $3 Trial
                </Button>
              </a>
              <a href="/community">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
                  Browse Community
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Final CTA Section
  const FinalCTASection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="mb-8">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-medium mb-6">
            🚀 Limited Time: 50% Off First Month
          </Badge>
        </div>

        <h2 className="text-5xl md:text-6xl font-black mb-8">
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Your AI Journey
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Starts Today
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Don't let AI pass you by. Join thousands who've already transformed their lives and businesses.
          <span className="text-purple-300 font-semibold"> Start for just $1.50/month (50% off) - cancel anytime.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <a href="/trial">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Start Your $1.50 Trial Now <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </a>
          <div className="text-center">
            <div className="text-gray-400 text-sm">✓ No credit card required</div>
            <div className="text-gray-400 text-sm">✓ Cancel anytime</div>
            <div className="text-gray-400 text-sm">✓ 14-day money-back guarantee</div>
          </div>
        </div>

        {/* Urgency Elements */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Clock className="w-6 h-6 text-red-400" />
            <span className="text-red-400 font-bold text-lg">Limited Time Offer</span>
          </div>
          <p className="text-gray-300">
            This 50% discount expires in <span className="text-red-400 font-bold">48 hours</span>.
            Over 500 people joined yesterday - don't miss out!
          </p>
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">15,000+</div>
            <div className="text-gray-300">Members Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">$2.5M+</div>
            <div className="text-gray-300">Saved by Our Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">97%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>

        {/* Final Reassurance */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Still not sure? Here's what you get with zero risk:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              Money-back guarantee
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <HeroSection />
      <HomepageNews />
      <SkillLevelSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <ServicesSection />
      <PricingSection />
      <ToolsDemoSection />
      <CommunitySection />
      <FinalCTASection />
    </div>
  );
}
