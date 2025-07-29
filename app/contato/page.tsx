"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Headphones
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
                <span className="text-gray-300">Contato via WhatsApp ou telefone em até 2h</span>
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
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Vamos Conversar?
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Estamos aqui para transformar suas ideias em realidade digital. Entre em contato e descubra como podemos acelerar o crescimento do seu negócio.
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
                Fale Conosco
              </CardTitle>
              <p className="text-gray-400">
                Preencha o formulário abaixo e nossa equipe entrará em contato rapidamente.
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
            </CardContent>
          </Card>
        </div>

        {/* Contact Info & Quick Actions */}
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
                    Av. Paulista, 1000 - Sala 1001<br />
                    Bela Vista, São Paulo - SP<br />
                    CEP: 01310-100
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Telefone</p>
                  <p className="text-gray-400 text-sm">+55 (11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">E-mail</p>
                  <p className="text-gray-400 text-sm">contato@portaltech.com.br</p>
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
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Direto
              </Button>
              
              <Button variant="outline" className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consultoria
              </Button>
              
              <Button variant="outline" className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                <Headphones className="w-4 h-4 mr-2" />
                Suporte Técnico
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