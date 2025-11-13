"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlassGallery } from "@/components/glass-gallery"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Award,
  Calendar,
  Globe,
  Share2
} from "lucide-react"

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'consultoria',
    message: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const galleryItems = useMemo(() => ([
    {
      src: "/images/rwx1.jpg",
      alt: "Ricardo Faya apresentando soluções digitais no Web Summit Rio",
      title: "Experiências Imersivas",
      description: "Demonstrando estratégias e experiências digitais ao vivo, com foco em engajamento humano e resultados tangíveis.",
      badge: "Web Summit Rio",
      stats: [
        { label: "Pessoas impactadas", value: "+50" },
        { label: "Horas de conteúdo", value: "12h" },
        { label: "Feedback 5★", value: "80%" }
      ]
    },
    {
      src: "/images/rwx2.jpg",
      alt: "Ricardo Faya no pavilhão principal do Web Summit",
      title: "Networking Estratégico",
      description: "Conversas com líderes do mercado para gerar parcerias e oportunidades alinhadas à transformação digital.",
      badge: "Connections",
      stats: [
        { label: "Novas conexões", value: "+120" },
        { label: "Startups mapeadas", value: "37" },
        { label: "Workshops", value: "4" }
      ]
    },
    {
      src: "/images/rwx3.jpg",
      alt: "Painel destacando a Ultimate Social Suite no evento",
      title: "Curadoria & Estratégia",
      description: "Planejamento e execução de jornadas digitais que colocam pessoas no centro de cada experiência.",
      badge: "Curadoria",
      stats: [
        { label: "Campanhas ativas", value: "18" },
        { label: "ROI médio", value: "316%" },
        { label: "Mercados", value: "7" }
      ]
    }
  ]), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Mensagem Enviada com Sucesso!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Recebemos sua mensagem e entraremos em contato em até 2 horas úteis.
          </p>
          <div className="bg-slate-800/50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Próximos Passos:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <span className="text-gray-300">Análise da sua solicitação pela nossa equipe</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <span className="text-gray-300">Contato via WhatsApp (+55 21 97190-8530) ou telefone em até 2h</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <span className="text-gray-300">Agendamento de consultoria gratuita</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Enviar Nova Mensagem
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 space-y-16">
      {/* Hero Spotlight */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/70 shadow-[0_35px_120px_-35px_rgba(124,58,237,0.6)] backdrop-blur-3xl">
        <div className="pointer-events-none absolute -top-32 left-10 h-80 w-80 rounded-full bg-purple-500/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-[140px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] p-10 md:p-14">
          <div className="flex flex-col justify-center space-y-6">
            <Badge className="w-fit bg-white/10 text-purple-100 backdrop-blur">
              Evento • Web Summit Rio 2024
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl">
              Conectando marcas a pessoas com experiências memoráveis
            </h1>
            <p className="text-lg text-slate-200/85 leading-relaxed">
              Cada projeto começa com conversas reais. Estive no Web Summit Rio apresentando caminhos para transformar ideias em vivências digitais inesquecíveis. Vamos criar algo extraordinário juntos?
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Consultorias", value: "+200" },
                { label: "Workshops", value: "38" },
                { label: "Anos de experiência", value: "15" }
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-slate-100 shadow-inner">
                  <div className="text-sm font-semibold text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wide text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_25px_80px_-40px_rgba(168,85,247,0.9)]">
            <Image
              src="/images/rwx6.jpg"
              alt="Ricardo Faya e equipe no Web Summit Rio segurando o destaque do evento"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/10 px-5 py-3 text-sm text-white backdrop-blur">
              <span className="font-medium">Web Summit Rio • Experiências Digitais</span>
              <span className="text-white/70">2024</span>
            </div>
          </div>
        </div>
      </section>

      <GlassGallery
        title="Momentos que inspiram novas jornadas"
        subtitle="Bastidores reais que mostram como criatividade, estratégia e tecnologia caminham juntas em cada parceria."
        items={galleryItems}
      />

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Vamos Conversar?
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Fale diretamente com Ricardo Faya e descubra como podemos acelerar o crescimento do seu negócio.
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            Resposta em 2h
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Consultoria Gratuita
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            +500 Projetos
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700/40">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Fale com Ricardo Faya
              </CardTitle>
              <p className="text-gray-400">
                Preencha o formulário abaixo e Ricardo retornará pessoalmente em poucas horas.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Assunto *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="consultoria">Consultoria Gratuita</option>
                      <option value="desenvolvimento">Desenvolvimento Web</option>
                      <option value="automacao">Automação & Chatbots</option>
                      <option value="seo">SEO & Marketing Digital</option>
                      <option value="mobile">Aplicativo Mobile</option>
                      <option value="cloud">Cloud & DevOps</option>
                      <option value="suporte">Suporte Técnico</option>
                      <option value="parceria">Parceria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Orçamento Estimado
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecione uma faixa</option>
                      <option value="ate-5k">Até R$ 5.000</option>
                      <option value="5k-15k">R$ 5.000 - R$ 15.000</option>
                      <option value="15k-50k">R$ 15.000 - R$ 50.000</option>
                      <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                      <option value="acima-100k">Acima de R$ 100.000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Conte-nos sobre seu projeto, necessidades e objetivos..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  Ao enviar este formulário, você concorda com nossa política de privacidade e termos de uso.
                </p>
              </form>

              <div className="flex items-start gap-3 mt-10">
                <Share2 className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Redes Sociais</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                    <a
                      href="https://www.facebook.com/rfaya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Facebook
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://www.instagram.com/ricardofaya/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Instagram
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://twitter.com/ricardofaya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Twitter
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://www.linkedin.com/in/ricardo-faya-04555a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://www.youtube.com/channel/UCK6067oss263F0lOX252f1g"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      YouTube (Canal)
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://www.youtube.com/ricardofaya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      YouTube /ricardofaya
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://dribbble.com/rfaya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Dribbble
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          {/* Contact Information */}
          <Card className="bg-slate-800/50 border-slate-700/40">
            <CardHeader>
              <CardTitle className="text-xl text-white">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Endereço</p>
                  <p className="text-gray-400 text-sm">
                    Rio de Janeiro - RJ<br />
                    Brasil<br />
                    Atendimento consultivo remoto
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Telefone &amp; WhatsApp</p>
                  <div className="text-gray-400 text-sm space-y-1">
                    <a
                      href="tel:+5521971908530"
                      className="hover:text-purple-300 transition-colors"
                    >
                      +55 (21) 97190-8530
                    </a>
                    <a
                      href="https://wa.me/5521971908530"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Conversar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">E-mail</p>
                  <a
                    href="mailto:ricardofaya@gmail.com"
                    className="text-gray-400 text-sm hover:text-purple-300 transition-colors"
                  >
                    ricardofaya@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Horário de Atendimento</p>
                  <p className="text-gray-400 text-sm">
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 9h às 13h<br />
                    Suporte 24/7 para clientes Enterprise
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                <a
                  href="https://wa.me/5521971908530"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conversar diretamente pelo WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Conversar no WhatsApp
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                <a href="mailto:ricardofaya@gmail.com?subject=Agendar%20Consultoria" aria-label="Enviar e-mail para agendar consultoria">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Consultoria
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                <a
                  href="https://ricardofaya9.wixsite.com/ricardo-faya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar portfólio de Ricardo Faya"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Visitar Portfólio
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <Card className="bg-slate-800/50 border-slate-700/40">
            <CardHeader>
              <CardTitle className="text-xl text-white">Por que nos escolher?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">+500 Clientes</p>
                  <p className="text-gray-400 text-sm">Satisfeitos em todo Brasil</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Resposta Rápida</p>
                  <p className="text-gray-400 text-sm">Até 2 horas úteis</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Avaliação 4.9/5</p>
                  <p className="text-gray-400 text-sm">Baseado em 200+ reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}