"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Star,
  Zap,
  Users,
  Building,
  Crown,
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Headphones,
  Rocket,
  Target,
  Award,
  MessageSquare,
  ArrowRight,
  X
} from "lucide-react"

export default function Planos() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [showROICalculator, setShowROICalculator] = useState(false)
  const [roiInputs, setRoiInputs] = useState({
    monthlyRevenue: 10000,
    currentMarketingCost: 2000,
    expectedGrowth: 30
  })

  const plans = [
    {
      id: 'starter',
      name: "Starter",
      subtitle: "Perfeito para começar",
      price: { monthly: 3, yearly: 97 },
      originalPrice: { monthly: 97, yearly: 1164 },
      description: "Ideal para empreendedores e pequenos negócios que querem começar sua transformação digital",
      popular: false,
      highlight: "Primeiro mês por apenas R$ 3!",
      color: "from-blue-500 to-cyan-500",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Biblioteca de templates premium (50+ modelos)",
        "Guias em PDF sobre SEO, marketing e automação",
        "Calculadoras online (ROI, análise de concorrência)",
        "Newsletter semanal com dicas exclusivas",
        "Grupo privado no Telegram com +1000 membros",
        "1 consultoria mensal de 15 minutos via chat",
        "Banco de imagens e ícones (50 downloads/mês)",
        "Suporte via chat (horário comercial)",
        "Acesso a webinars mensais"
      ],
      notIncluded: [
        "Ferramentas SaaS avançadas",
        "Consultoria por videochamada",
        "Desenvolvimento personalizado"
      ],
      cta: "Começar por R$ 3",
      guarantee: "7 dias grátis + garantia de 30 dias"
    },
    {
      id: 'growth',
      name: "Growth",
      subtitle: "Para negócios em crescimento",
      price: { monthly: 47, yearly: 470 },
      originalPrice: { monthly: 297, yearly: 3564 },
      description: "Solução completa para PMEs que querem acelerar o crescimento com tecnologia",
      popular: true,
      highlight: "Mais escolhido por PMEs",
      color: "from-purple-500 to-pink-500",
      icon: <TrendingUp className="w-6 h-6" />,
      features: [
        "Tudo do plano Starter",
        "WebBuilder Pro - Construtor de sites profissionais",
        "ChatFlow AI - Automação básica de atendimento",
        "LocalSEO Master - Otimização para Google Maps",
        "Templates premium personalizáveis (200+ modelos)",
        "2 horas de consultoria mensal via videochamada",
        "Análise mensal gratuita do site/redes sociais",
        "Banco de imagens ilimitado",
        "Suporte WhatsApp prioritário",
        "Webinars mensais exclusivos com especialistas",
        "Acesso antecipado a novos recursos"
      ],
      notIncluded: [
        "Desenvolvimento personalizado",
        "Gerente de conta dedicado",
        "SLA garantido"
      ],
      cta: "Escolher Growth",
      guarantee: "14 dias grátis + garantia de 60 dias"
    },
    {
      id: 'professional',
      name: "Professional",
      subtitle: "Solução empresarial completa",
      price: { monthly: 147, yearly: 1470 },
      originalPrice: { monthly: 497, yearly: 5964 },
      description: "Para empresas sérias que querem dominar o mercado digital com soluções avançadas",
      popular: false,
      highlight: "ROI médio de 300% em 6 meses",
      color: "from-emerald-500 to-teal-500",
      icon: <Target className="w-6 h-6" />,
      features: [
        "Tudo dos planos anteriores",
        "Ferramentas SaaS avançadas completas",
        "6 horas de consultoria mensal com especialistas",
        "1 landing page personalizada por mês",
        "Configuração de automações avançadas",
        "Relatórios mensais detalhados com insights",
        "Suporte prioritário 24/7",
        "Cursos online exclusivos (valor R$ 2.000)",
        "White-label de algumas ferramentas",
        "Integração com CRM e sistemas existentes",
        "Análise de concorrência mensal"
      ],
      notIncluded: [
        "Desenvolvimento de sistemas complexos",
        "Equipe dedicada",
        "SLA enterprise"
      ],
      cta: "Escolher Professional",
      guarantee: "30 dias grátis + garantia de 90 dias"
    },
    {
      id: 'enterprise',
      name: "Enterprise",
      subtitle: "Para líderes de mercado",
      price: { monthly: 497, yearly: 4970 },
      originalPrice: { monthly: 1497, yearly: 17964 },
      description: "Solução premium para grandes empresas que querem resultados extraordinários",
      popular: false,
      highlight: "Resultados garantidos ou dinheiro de volta",
      color: "from-yellow-500 to-orange-500",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Tudo dos planos anteriores",
        "Consultoria ilimitada com time de especialistas",
        "Desenvolvimento personalizado mensal",
        "Gerente de conta dedicado",
        "Implementação de projetos complexos",
        "APIs e integrações avançadas",
        "Treinamento completo da equipe",
        "SLA garantido de 99.9%",
        "Suporte técnico dedicado 24/7",
        "Relatórios executivos semanais",
        "Acesso a beta de novos produtos",
        "Consultoria estratégica trimestral"
      ],
      notIncluded: [],
      cta: "Falar com Especialista",
      guarantee: "Resultados garantidos em 90 dias"
    }
  ]

  const calculateROI = () => {
    const { monthlyRevenue, currentMarketingCost, expectedGrowth } = roiInputs
    const planCost = 147 // Professional plan
    const projectedIncrease = (monthlyRevenue * expectedGrowth) / 100
    const totalCost = currentMarketingCost + planCost
    const roi = ((projectedIncrease - planCost) / planCost) * 100
    const paybackMonths = planCost / (projectedIncrease / 12)
    
    return {
      monthlyIncrease: projectedIncrease,
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      yearlyProfit: projectedIncrease * 12 - planCost * 12
    }
  }

  const roiResults = calculateROI()

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Planos que Crescem com Você
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Comece pequeno, sonhe grande. Nossos planos são projetados para evoluir junto com seu negócio.
        </p>
        
        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 max-w-4xl mx-auto border border-green-500/30 mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-green-300">Oferta Especial de Lançamento</h3>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-green-300 font-semibold text-lg mb-2">
            🎉 Primeiro mês por apenas R$ 3,00 em qualquer plano!
          </p>
          <p className="text-green-200 text-sm">
            Válido apenas para os primeiros 100 clientes. Sem compromisso, cancele quando quiser.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-gray-400'}`}>
            Mensal
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-slate-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white font-semibold' : 'text-gray-400'}`}>
            Anual
          </span>
          {billingCycle === 'yearly' && (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              2 meses grátis
            </Badge>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden border-0 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              plan.popular ? "ring-2 ring-purple-500 shadow-2xl shadow-purple-500/25 scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5`}></div>

            <CardHeader className="relative z-10 text-center pb-4">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                <div className="text-white">{plan.icon}</div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
              <p className="text-purple-300 font-semibold mb-2">{plan.subtitle}</p>
              <CardDescription className="text-gray-400 text-sm mb-4">{plan.description}</CardDescription>
              
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-black text-white">
                    R$ {plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mês' : 'ano'}</span>
                </div>
                
                {plan.originalPrice && (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 line-through">
                      R$ {plan.originalPrice[billingCycle]}
                    </span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      {Math.round((1 - plan.price[billingCycle] / plan.originalPrice[billingCycle]) * 100)}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              {plan.highlight && (
                <div className="bg-purple-500/20 rounded-lg p-3 mb-4">
                  <p className="text-purple-300 text-sm font-semibold">{plan.highlight}</p>
                </div>
              )}
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Incluído no plano:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 6).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-xs">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 6 && (
                      <li className="text-purple-300 text-xs font-semibold">
                        + {plan.features.length - 6} recursos adicionais
                      </li>
                    )}
                  </ul>
                </div>

                {plan.notIncluded.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                      <X className="w-3 h-3" />
                      Não incluído:
                    </h4>
                    <ul className="space-y-1">
                      {plan.notIncluded.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">{plan.guarantee}</p>
              </div>
              
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "bg-slate-700 hover:bg-slate-600"
                } text-white font-semibold py-3 rounded-xl transition-all duration-300`}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROI Calculator */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Calculadora de ROI</h2>
          <p className="text-gray-300">Veja quanto você pode economizar e ganhar com nossos planos</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-slate-800/50 border-slate-700/40">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calcule seu Retorno sobre Investimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Faturamento mensal atual (R$)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.monthlyRevenue}
                    onChange={(e) => setRoiInputs({...roiInputs, monthlyRevenue: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gasto atual com marketing (R$)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.currentMarketingCost}
                    onChange={(e) => setRoiInputs({...roiInputs, currentMarketingCost: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Crescimento esperado (%)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.expectedGrowth}
                    onChange={(e) => setRoiInputs({...roiInputs, expectedGrowth: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Resultados Projetados</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Aumento mensal:</span>
                    <span className="text-green-400 font-bold">R$ {roiInputs.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROI:</span>
                    <span className="text-green-400 font-bold">{roiResults.roi}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Payback:</span>
                    <span className="text-green-400 font-bold">{roiResults.paybackMonths} meses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lucro anual:</span>
                    <span className="text-green-400 font-bold">R$ {roiResults.yearlyProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Comparação Detalhada</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-slate-800/50 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-700/50">
                <th className="text-left p-4 text-white font-semibold">Recursos</th>
                {plans.map(plan => (
                  <th key={plan.id} className="text-center p-4 text-white font-semibold">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "Templates premium",
                "Consultoria mensal",
                "Ferramentas SaaS",
                "Suporte 24/7",
                "Desenvolvimento personalizado",
                "Gerente dedicado"
              ].map((feature, index) => (
                <tr key={index} className="border-t border-slate-700/50">
                  <td className="p-4 text-gray-300">{feature}</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center p-4">
                      {index < 2 || (index === 2 && plan.id !== 'starter') || 
                       (index === 3 && ['professional', 'enterprise'].includes(plan.id)) ||
                       (index === 4 && ['enterprise'].includes(plan.id)) ||
                       (index === 5 && plan.id === 'enterprise') ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Plan CTA */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Precisa de Algo Personalizado?</CardTitle>
            <CardDescription className="text-gray-300">
              Criamos soluções sob medida para grandes empresas e necessidades específicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar com Especialista
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                Ver Cases de Sucesso
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}