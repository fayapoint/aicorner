"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Target,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

export default function BookConsultation() {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    goals: "",
    budget: "",
    timeline: ""
  });

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const consultationTypes = [
    {
      id: "strategy",
      name: "AI Strategy Session",
      duration: "60 minutes",
      price: "Free",
      description: "Comprehensive AI roadmap for your business",
      features: [
        "Business analysis & AI opportunities",
        "Custom implementation roadmap",
        "ROI projections & timeline",
        "Technology recommendations",
        "Next steps planning"
      ],
      icon: Target,
      popular: true
    },
    {
      id: "demo",
      name: "Product Demo",
      duration: "30 minutes", 
      price: "Free",
      description: "See our AI tools in action",
      features: [
        "Live tool demonstrations",
        "Use case examples",
        "Q&A session",
        "Pricing discussion",
        "Trial setup"
      ],
      icon: Zap,
      popular: false
    },
    {
      id: "technical",
      name: "Technical Deep Dive",
      duration: "90 minutes",
      price: "Free",
      description: "Technical implementation discussion",
      features: [
        "API integration planning",
        "Technical architecture review",
        "Security & compliance",
        "Development timeline",
        "Support & maintenance"
      ],
      icon: Users,
      popular: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consultation booking:", {
      date: selectedDate,
      time: selectedTime,
      ...formData
    });
    // Here you would integrate with your booking system
  };

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-medium mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Free Consultation Available
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Book Your Free
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Consultation
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Get personalized AI strategy and implementation guidance from our experts. 
              <span className="text-purple-300 font-semibold"> 100% free, no strings attached.</span>
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Completely free</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>30-90 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Expert consultants</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Consultation Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Choose Your Session Type</h2>
              
              <div className="space-y-6">
                {consultationTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      type.popular
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 ring-2 ring-purple-500/30'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {type.popular && (
                      <div className="absolute -top-3 left-4">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-white">{type.name}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {type.duration}
                            </span>
                            <span className="text-green-400 font-semibold">{type.price}</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-gray-300 mt-3">
                        {type.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2">
                        {type.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-2">Schedule Your Session</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-white">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-white">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company" className="text-white">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Project Details</h3>
                      
                      <div>
                        <Label htmlFor="goals" className="text-white">What are your AI goals? *</Label>
                        <Textarea
                          id="goals"
                          name="goals"
                          required
                          value={formData.goals}
                          onChange={handleInputChange}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Tell us about your AI objectives, challenges, or specific use cases..."
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget" className="text-white">Budget Range</Label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                          >
                            <option value="">Select budget range</option>
                            <option value="under-1k">Under $1,000</option>
                            <option value="1k-5k">$1,000 - $5,000</option>
                            <option value="5k-10k">$5,000 - $10,000</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-plus">$25,000+</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="timeline" className="text-white">Timeline</Label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                          >
                            <option value="">Select timeline</option>
                            <option value="asap">ASAP</option>
                            <option value="1-month">Within 1 month</option>
                            <option value="3-months">Within 3 months</option>
                            <option value="6-months">Within 6 months</option>
                            <option value="exploring">Just exploring</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Preferred Time</h3>
                      <div className="text-sm text-gray-400 mb-4">
                        Select your preferred date and time. We'll confirm availability within 24 hours.
                      </div>
                      
                      <div>
                        <Label className="text-white">Preferred Date</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                          {getAvailableDates().slice(0, 10).map((date) => (
                            <Button
                              key={date.toISOString()}
                              type="button"
                              variant={selectedDate === date.toDateString() ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedDate(date.toDateString())}
                              className={`text-xs ${
                                selectedDate === date.toDateString()
                                  ? "bg-purple-600 text-white"
                                  : "border-slate-600 text-gray-300 hover:bg-slate-700"
                              }`}
                            >
                              {date.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white">Preferred Time (EST)</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className={`text-xs ${
                                selectedTime === time
                                  ? "bg-purple-600 text-white"
                                  : "border-slate-600 text-gray-300 hover:bg-slate-700"
                              }`}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book My Free Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      By booking a consultation, you agree to our Terms of Service and Privacy Policy.
                      We'll send you a calendar invite with meeting details.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Shield className="w-8 h-8 text-green-400" />
                <div className="text-center">
                  <span className="text-gray-300 font-medium block">100% Free</span>
                  <span className="text-gray-500 text-sm">No hidden costs</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div className="text-center">
                  <span className="text-gray-300 font-medium block">Expert Consultants</span>
                  <span className="text-gray-500 text-sm">10+ years experience</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                <div className="text-center">
                  <span className="text-gray-300 font-medium block">Proven Results</span>
                  <span className="text-gray-500 text-sm">500+ successful projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
