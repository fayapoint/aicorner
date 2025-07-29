"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  ArrowRight,
  CheckCircle,
  FileText,
  Globe,
  Server,
  Database,
  Users,
  AlertTriangle,
  Download,
  ExternalLink,
  Award,
  Zap,
  Clock,
  Activity
} from "lucide-react";

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256 encryption",
      status: "Active"
    },
    {
      icon: Key,
      title: "API Key Management",
      description: "Secure API key generation with granular permissions and rotation",
      status: "Active"
    },
    {
      icon: Eye,
      title: "Zero Data Retention",
      description: "We don't store your prompts or generated content beyond processing",
      status: "Active"
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "SOC 2 Type II compliant infrastructure with 24/7 monitoring",
      status: "Active"
    },
    {
      icon: Users,
      title: "Access Controls",
      description: "Role-based access control with multi-factor authentication",
      status: "Active"
    },
    {
      icon: Activity,
      title: "Audit Logging",
      description: "Comprehensive audit trails for all API calls and system access",
      status: "Active"
    }
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls",
      icon: Award,
      status: "Certified",
      validUntil: "Dec 2024"
    },
    {
      name: "ISO 27001",
      description: "Information security management system",
      icon: Shield,
      status: "Certified",
      validUntil: "Mar 2025"
    },
    {
      name: "GDPR Compliant",
      description: "European data protection regulation compliance",
      icon: Globe,
      status: "Compliant",
      validUntil: "Ongoing"
    },
    {
      name: "HIPAA Ready",
      description: "Healthcare data protection standards",
      icon: FileText,
      status: "Ready",
      validUntil: "Ongoing"
    }
  ];

  const securityPractices = [
    {
      category: "Data Protection",
      practices: [
        "AES-256 encryption for data at rest",
        "TLS 1.3 for data in transit",
        "Zero-knowledge architecture",
        "Automatic data purging",
        "Geographic data residency options"
      ]
    },
    {
      category: "Access Security",
      practices: [
        "Multi-factor authentication (MFA)",
        "Single Sign-On (SSO) integration",
        "Role-based access control (RBAC)",
        "API key rotation policies",
        "Session management and timeouts"
      ]
    },
    {
      category: "Infrastructure",
      practices: [
        "24/7 security monitoring",
        "Intrusion detection systems",
        "Regular penetration testing",
        "Vulnerability scanning",
        "Incident response procedures"
      ]
    },
    {
      category: "Compliance",
      practices: [
        "Regular security audits",
        "Employee security training",
        "Vendor security assessments",
        "Data processing agreements",
        "Privacy impact assessments"
      ]
    }
  ];

  const incidentHistory = [
    {
      date: "2024-01-15",
      type: "Maintenance",
      severity: "Low",
      description: "Scheduled security update deployment",
      status: "Resolved",
      duration: "30 minutes"
    },
    {
      date: "2023-11-22",
      type: "Security",
      severity: "Medium",
      description: "Suspicious activity detected and blocked",
      status: "Resolved",
      duration: "2 hours"
    },
    {
      date: "2023-09-08",
      type: "Maintenance",
      severity: "Low",
      description: "Certificate renewal and security patches",
      status: "Resolved",
      duration: "45 minutes"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Security & <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Compliance</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Enterprise-grade security built into every layer of our AI platform. Your data is protected with industry-leading standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Security Overview <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-400 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg rounded-xl">
                <Download className="mr-2 w-5 h-5" />
                Security Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Security <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive security measures protecting your data and applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-green-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {feature.status}
                      </Badge>
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

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Certifications & <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Compliance</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Independently verified security and compliance standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600 hover:border-green-400/40 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <cert.icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{cert.description}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">
                      {cert.status}
                    </Badge>
                    <p className="text-xs text-gray-400">Valid until {cert.validUntil}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPractices.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.practices.map((practice, practiceIndex) => (
                        <div key={practiceIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Security <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Transparency</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete transparency about security incidents and maintenance
            </p>
          </motion.div>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-gray-600">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Recent Security Events</CardTitle>
              <CardDescription className="text-gray-300">
                All security-related incidents and maintenance activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidentHistory.map((incident, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{incident.date}</span>
                      </div>
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                      <span className="text-white font-medium">{incident.description}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">{incident.duration}</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600/10 to-emerald-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Questions About Security?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Our security team is here to help. Get detailed information about our security practices and compliance.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                Contact Security Team <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-400 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg rounded-xl">
                <ExternalLink className="mr-2 w-5 h-5" />
                Security Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
