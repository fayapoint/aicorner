"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  X, 
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Target,
  Brain,
  Bot,
  BarChart3,
  MessageSquare,
  Globe,
  Code,
  Heart,
  Award,
  Lightbulb,
  TrendingUp
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for AI beginners who want to explore safely",
      monthlyPrice: 3,
      annualPrice: 30,
      originalPrice: 6,
      discount: "50% OFF",
      popular: true,
      gradient: "from-green-500 to-emerald-500",
      features: [
        { name: "Access to 10+ basic AI tools", included: true },
        { name: "Community support", included: true },
        { name: "Weekly AI tips & tutorials", included: true },
        { name: "Basic templates library", included: true },
        { name: "Email support", included: true },
        { name: "Quick consultations (15 min)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Advanced AI tools", included: false },
        { name: "Priority support", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
        { name: "White-label solutions", included: false }
      ],
      benefits: [
        "Perfect for beginners",
        "Risk-free exploration",
        "Supportive community",
        "Learn at your pace"
      ]
    },
    {
      id: "growth",
      name: "Growth",
      description: "For businesses ready to implement AI solutions",
      monthlyPrice: 47,
      annualPrice: 470,
      originalPrice: 97,
      discount: "52% OFF",
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        { name: "Access to 10+ basic AI tools", included: true },
        { name: "Community support", included: true },
        { name: "Weekly AI tips & tutorials", included: true },
        { name: "Basic templates library", included: true },
        { name: "Email support", included: true },
        { name: "Quick consultations (15 min)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Advanced AI tools (30+)", included: true },
        { name: "Priority support", included: true },
        { name: "Custom integrations", included: true },
        { name: "Monthly strategy calls", included: true },
        { name: "Analytics dashboard", included: true },
        { name: "Dedicated account manager", included: false },
        { name: "White-label solutions", included: false }
      ],
      benefits: [
        "Scale your business",
        "Advanced automation",
        "Priority support",
        "Custom solutions"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      description: "For serious businesses scaling with AI",
      monthlyPrice: 147,
      annualPrice: 1470,
      originalPrice: 297,
      discount: "51% OFF",
      popular: false,
      gradient: "from-purple-500 to-pink-500",
      features: [
        { name: "Access to 10+ basic AI tools", included: true },
        { name: "Community support", included: true },
        { name: "Weekly AI tips & tutorials", included: true },
        { name: "Basic templates library", included: true },
        { name: "Email support", included: true },
        { name: "Quick consultations (15 min)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Advanced AI tools (30+)", included: true },
        { name: "Priority support", included: true },
        { name: "Custom integrations", included: true },
        { name: "Monthly strategy calls", included: true },
        { name: "Analytics dashboard", included: true },
        { name: "Custom AI development", included: true },
        { name: "Weekly consultations", included: true },
        { name: "Advanced automations", included: true },
        { name: "White-label solutions", included: true },
        { name: "Dedicated account manager", included: false }
      ],
      benefits: [
        "Custom AI development",
        "Weekly consultations",
        "White-label options",
        "Advanced features"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with complex AI needs",
      monthlyPrice: 497,
      annualPrice: 4970,
      originalPrice: 997,
      discount: "50% OFF",
      popular: false,
      gradient: "from-yellow-500 to-orange-500",
      features: [
        { name: "Everything in Professional", included: true },
        { name: "Unlimited consultations", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom AI architecture", included: true },
        { name: "24/7 priority support", included: true },
        { name: "SLA guarantees", included: true },
        { name: "On-site training", included: true },
        { name: "Custom reporting", included: true }
      ],
      benefits: [
        "Enterprise-grade solutions",
        "Dedicated support team",
        "Custom architecture",
        "SLA guarantees"
      ]
    }
  ];

  const getCurrentPrice = (plan: typeof plans[0]) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  };

  const getOriginalPrice = (plan: typeof plans[0]) => {
    return billingCycle === "monthly" ? plan.originalPrice : plan.originalPrice * 10;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-medium mb-6">
              💰 Limited Time: 50% Off All Plans
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Simple Pricing
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Real Results
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Start small, scale big. Choose the perfect plan for your AI journey with no hidden fees and cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-slate-800/50 rounded-2xl p-2 flex items-center">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    billingCycle === "annual"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Annual
                  <Badge className="ml-2 bg-green-500 text-white text-xs">Save 17%</Badge>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-purple-400/40 transition-all duration-300 h-full ${
                  plan.popular ? "ring-2 ring-purple-500/50" : ""
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-3xl text-white mb-2">{plan.name}</CardTitle>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-5xl font-bold text-white">
                          ${getCurrentPrice(plan)}
                        </span>
                        <div className="text-left">
                          <div className="text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</div>
                          <div className="text-sm text-gray-500 line-through">
                            ${getOriginalPrice(plan)}
                          </div>
                        </div>
                      </div>
                      <Badge className={`bg-gradient-to-r ${plan.gradient} text-white px-3 py-1`}>
                        {plan.discount}
                      </Badge>
                    </div>
                    
                    <CardDescription className="text-gray-300 text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4 mb-8">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {plan.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-gray-300">
                            <CheckCircle className="w-3 h-3 text-green-400 mr-1 flex-shrink-0" />
                            <span className="text-xs">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white mb-4`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.id === "starter" ? "Start Free Trial" : "Choose Plan"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    
                    <div className="text-center text-sm text-gray-400">
                      {plan.id === "starter" ? "14-day free trial" : "No setup fees"}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Compare All Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See exactly what's included in each plan to make the best choice for your needs.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-slate-900/50 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-slate-800">
                  <th className="text-left p-6 text-white font-semibold">Features</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center p-6 text-white font-semibold min-w-[150px]">
                      <div className="flex flex-col items-center">
                        <span>{plan.name}</span>
                        <span className="text-2xl font-bold mt-2">${getCurrentPrice(plan)}</span>
                        <span className="text-sm text-gray-400">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((feature, index) => (
                  <tr key={index} className="border-t border-slate-700">
                    <td className="p-6 text-gray-300 font-medium">{feature.name}</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="p-6 text-center">
                        {plan.features[index]?.included ? (
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-gray-500 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about our pricing and plans.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
              },
              {
                question: "Is there a free trial?",
                answer: "Absolutely! All plans come with a 14-day free trial. No credit card required for the Starter plan trial."
              },
              {
                question: "What happens if I cancel?",
                answer: "You can cancel anytime with no penalties. You'll retain access to your plan features until the end of your billing period."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full."
              },
              {
                question: "Are there any setup fees?",
                answer: "No setup fees, no hidden costs. The price you see is exactly what you pay."
              },
              {
                question: "Can I get a custom plan?",
                answer: "For Enterprise customers, we offer custom plans tailored to your specific needs. Contact our sales team for details."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-medium mb-6">
              🚀 Join 15,000+ Businesses Already Using AI
            </Badge>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Start Your AI Journey
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Risk-Free Today
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose any plan and start transforming your business with AI. 14-day free trial, no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Start Free Trial <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-xl">
                Talk to Sales
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Cancel anytime
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                30-day money-back guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
