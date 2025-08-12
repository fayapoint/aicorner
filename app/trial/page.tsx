"use client";

import { useState } from "react";

// Force dynamic rendering to prevent SSG context issues
export const dynamic = 'force-dynamic';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  CreditCard,
  Lock,
  Users,
  Zap,
  Clock,
  Star,
  Gift
} from "lucide-react";

export default function TrialPage() {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });

  const plans = [
    {
      id: "starter",
      name: "Starter Trial",
      price: "$3",
      originalPrice: "$29",
      period: "first month",
      description: "Perfect for trying AI tools",
      features: [
        "Access to 20+ AI tools",
        "Community support",
        "Basic templates",
        "Email support",
        "Cancel anytime"
      ],
      color: "green",
      popular: true
    },
    {
      id: "growth",
      name: "Growth Trial",
      price: "$14",
      originalPrice: "$47",
      period: "first month",
      description: "For growing businesses",
      features: [
        "Everything in Starter",
        "50+ advanced AI tools",
        "Priority support",
        "Custom integrations",
        "Analytics dashboard",
        "API access"
      ],
      color: "blue",
      popular: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your payment processor
    console.log("Trial signup:", { plan: selectedPlan, ...formData });
    // Redirect to payment or dashboard
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
              <Gift className="w-4 h-4 mr-2" />
              🎉 Limited Time Offer
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Start Your AI Journey
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Risk-Free Trial
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get instant access to our complete AI toolkit. No commitments, cancel anytime.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>14-day money back</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>15,000+ happy users</span>
              </div>
            </div>
          </motion.div>

          {/* Plan Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? `bg-gradient-to-br from-${plan.color}-500/20 to-${plan.color}-600/20 border-${plan.color}-500/50 scale-105`
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <div className="text-left">
                        <div className="text-gray-400 line-through text-sm">{plan.originalPrice}</div>
                        <div className="text-gray-400 text-sm">/{plan.period}</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold text-sm">
                      Save {Math.round((1 - parseInt(plan.price.slice(1)) / parseInt(plan.originalPrice.slice(1))) * 100)}%
                    </div>
                  </div>
                  <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircle className={`w-4 h-4 text-${plan.color}-400 mr-3 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white mb-2">Start Your Trial</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your details to begin your AI journey
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Label htmlFor="company" className="text-white">Company (Optional)</Label>
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
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone (Optional)</Label>
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
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <div className="flex items-center gap-3 mb-3">
                      <Lock className="w-5 h-5 text-green-400" />
                      <span className="text-white font-semibold">Secure & Risk-Free</span>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• No credit card required for trial</li>
                      <li>• Cancel anytime with one click</li>
                      <li>• 14-day money-back guarantee</li>
                      <li>• Your data is encrypted and secure</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Start My Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    By starting your trial, you agree to our Terms of Service and Privacy Policy.
                    You can cancel anytime before your trial ends.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
