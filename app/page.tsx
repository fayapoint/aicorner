"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {
  Menu,
  X,
  ChevronRight,
  Play,
  Zap,
  Smartphone,
  Globe,
  BarChart3,
  Users,
  Shield,
  Rocket,
  Brain,
  Database,
  Cloud,
  Workflow,
  Bot,
  MessageSquare,
  Calendar,
  Headphones,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 12)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Desenvolvimento Web Avançado",
      description:
        "Sites responsivos, PWAs, e-commerce, landing pages otimizadas para conversão com tecnologias modernas",
      features: ["React/Next.js", "SEO Avançado", "Performance 100%", "Mobile First"],
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Automação & Chatbots IA",
      description: "Bots inteligentes para WhatsApp, Telegram, atendimento 24/7 com IA conversacional avançada",
      features: ["GPT Integration", "Multi-plataforma", "Analytics", "CRM Integration"],
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Consultoria Estratégica Digital",
      description:
        "Diagnóstico completo, estratégias personalizadas, mentoria executiva e acompanhamento de resultados",
      features: ["Análise 360°", "Roadmap Personalizado", "KPIs Definidos", "Suporte Contínuo"],
      color: "from-purple-500 to-violet-500",
      gradient: "bg-gradient-to-br from-purple-50 to-violet-50",
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "Gestão de Projetos Inteligente",
      description: "Sistemas completos de gestão com automações, relatórios em tempo real e integração total",
      features: ["Kanban Avançado", "Time Tracking", "Relatórios BI", "API Integrations"],
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-50 to-red-50",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Soluções em Dados & Analytics",
      description: "Dashboards interativos, análise preditiva, Big Data e inteligência de negócios avançada",
      features: ["Power BI", "Machine Learning", "Data Mining", "Visualizações"],
      color: "from-indigo-500 to-blue-500",
      gradient: "bg-gradient-to-br from-indigo-50 to-blue-50",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Infraestrutura Cloud & DevOps",
      description: "Migração para nuvem, CI/CD, monitoramento, escalabilidade automática e segurança avançada",
      features: ["AWS/Azure", "Docker/K8s", "Monitoring", "Auto-scaling"],
      color: "from-teal-500 to-green-500",
      gradient: "bg-gradient-to-br from-teal-50 to-green-50",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Aplicativos Mobile Nativos",
      description: "Apps iOS/Android, React Native, Flutter, integração com APIs e sistemas existentes",
      features: ["Cross-platform", "Push Notifications", "Offline Mode", "App Store"],
      color: "from-pink-500 to-rose-500",
      gradient: "bg-gradient-to-br from-pink-50 to-rose-50",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança & Compliance",
      description: "Auditoria de segurança, implementação LGPD, pentest, monitoramento de ameaças 24/7",
      features: ["LGPD Compliance", "Pentest", "Monitoring", "Backup Seguro"],
      color: "from-gray-600 to-gray-800",
      gradient: "bg-gradient-to-br from-gray-50 to-slate-50",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Integração de Sistemas",
      description: "APIs customizadas, webhooks, sincronização de dados, middleware e arquitetura de microsserviços",
      features: ["REST/GraphQL", "Webhooks", "Real-time", "Microservices"],
      color: "from-yellow-500 to-orange-500",
      gradient: "bg-gradient-to-br from-yellow-50 to-orange-50",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Marketing Digital & Growth",
      description: "SEO/SEM, automação de marketing, funis de conversão, análise de performance e growth hacking",
      features: ["SEO/SEM", "Marketing Automation", "A/B Testing", "Growth Hacking"],
      color: "from-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-br from-emerald-50 to-teal-50",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Treinamento & Capacitação",
      description: "Cursos personalizados, workshops, certificações, plataforma EAD e acompanhamento pedagógico",
      features: ["LMS Customizado", "Certificações", "Gamificação", "Progress Tracking"],
      color: "from-violet-500 to-purple-500",
      gradient: "bg-gradient-to-br from-violet-50 to-purple-50",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Suporte Premium 24/7",
      description: "Atendimento especializado, SLA garantido, suporte proativo, monitoramento contínuo",
      features: ["24/7 Support", "SLA 99.9%", "Proactive Care", "Dedicated Team"],
      color: "from-cyan-500 to-blue-500",
      gradient: "bg-gradient-to-br from-cyan-50 to-blue-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Sistema Online
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              +500 Projetos Entregues
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Certificado ISO 27001
            </Badge>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Transformação Digital
            </span>
            <br />
            <span className="text-white">Sem Limites</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Soluções tecnológicas completas para empresas que querem liderar o futuro.
            <span className="text-purple-400 font-semibold"> IA, automação, cloud e muito mais.</span>
          </p>

          {/* Interactive demo preview */}
          <div className="relative mb-12 animate-fade-in-up animation-delay-400">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Análise Completa</h3>
                    <p className="text-gray-400 text-sm">Diagnóstico 360° do seu negócio</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Implementação</h3>
                    <p className="text-gray-400 text-sm">Soluções personalizadas e escaláveis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Resultados</h3>
                    <p className="text-gray-400 text-sm">Crescimento sustentável garantido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Ver Demonstração
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 px-8 py-4 text-lg rounded-xl"
            >
              Consultoria Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 animate-fade-in-up animation-delay-800">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Segurança Garantida</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Suporte 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-sm">ROI Comprovado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nossas Soluções
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnologias de ponta para transformar completamente seu negócio digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  activeService === index ? "ring-2 ring-purple-500 shadow-2xl shadow-purple-500/25" : ""
                }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-700/50 text-gray-300 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 group-hover:bg-purple-500/20 transition-all"
                  >
                    Saiba Mais
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Tecnologias de Ponta
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Node.js", icon: "🟢" },
              { name: "Python", icon: "🐍" },
              { name: "AWS", icon: "☁️" },
              { name: "Docker", icon: "🐳" },
              { name: "AI/ML", icon: "🤖" },
              { name: "Blockchain", icon: "⛓️" },
              { name: "IoT", icon: "📡" },
              { name: "GraphQL", icon: "📊" },
              { name: "Kubernetes", icon: "☸️" },
              { name: "MongoDB", icon: "🍃" },
              { name: "Redis", icon: "🔴" },
            ].map((tech, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-4 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 transition-all duration-300 hover:scale-110"
              >
                <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">{tech.icon}</div>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Perguntas Frequentes
              </span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Como funciona o processo de desenvolvimento?",
                answer:
                  "Seguimos uma metodologia ágil com sprints de 2 semanas, entregas incrementais e feedback contínuo. Você acompanha todo o progresso em tempo real através do nosso dashboard.",
              },
              {
                question: "Qual o prazo médio para entrega dos projetos?",
                answer:
                  "Varia conforme a complexidade: sites simples (1-2 semanas), sistemas complexos (2-6 meses), automações (1-4 semanas). Sempre com cronograma detalhado e marcos bem definidos.",
              },
              {
                question: "Vocês oferecem suporte pós-entrega?",
                answer:
                  "Sim! Todos os projetos incluem 3 meses de suporte gratuito. Depois oferecemos planos de manutenção com SLA garantido e suporte 24/7 para sistemas críticos.",
              },
              {
                question: "Como garantem a segurança dos dados?",
                answer:
                  "Seguimos as melhores práticas de segurança: criptografia end-to-end, compliance LGPD, auditorias regulares, backups automatizados e monitoramento 24/7.",
              },
              {
                question: "Trabalham com empresas de todos os portes?",
                answer:
                  "Sim! Atendemos desde startups até grandes corporações. Nossas soluções são escaláveis e se adaptam ao crescimento do seu negócio.",
              },
            ].map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-700 rounded-xl bg-slate-800/30 px-6"
              >
                <AccordionTrigger className="text-left text-white hover:text-purple-400 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Pronto para Transformar seu Negócio?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Agende uma consultoria gratuita e descubra como podemos acelerar seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consultoria
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 px-8 py-4 text-lg rounded-xl"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
