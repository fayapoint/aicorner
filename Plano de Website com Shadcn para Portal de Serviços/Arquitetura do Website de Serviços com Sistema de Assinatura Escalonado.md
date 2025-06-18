# Arquitetura do Website de Serviços com Sistema de Assinatura Escalonado

## 1. Conceito Estratégico

O website será estruturado como um portal de serviços de TI com foco em fidelização através de um modelo de assinatura escalonado. A estratégia principal é atrair usuários com um plano inicial extremamente acessível (R$ 3,00) que oferece valor real, criando um vínculo de confiança que naturalmente evolui para planos mais robustos e lucrativos.

### 1.1 Filosofia do Produto

O portal funcionará como um "Netflix dos Serviços de TI", onde o usuário paga uma pequena mensalidade e tem acesso a uma biblioteca crescente de recursos, ferramentas e conteúdos exclusivos. A progressão natural será dos recursos básicos para serviços personalizados e consultoria especializada.

### 1.2 Proposta de Valor Central

"Transforme sua presença digital sem quebrar o orçamento - comece com R$ 3 e evolua conforme seu negócio cresce."

## 2. Estrutura de Planos de Assinatura

### 2.1 Plano Starter (R$ 3,00/mês)
**Objetivo:** Fidelização e entrada no funil de vendas

**Benefícios Inclusos:**
- Acesso à biblioteca de templates (landing pages, e-mails, posts para redes sociais)
- Guias em PDF sobre SEO básico, marketing digital e automação
- Calculadoras online (ROI de marketing, custo por lead, análise de concorrência)
- Newsletter semanal com dicas exclusivas
- Acesso ao grupo privado no Telegram/Discord
- 1 consultoria mensal de 15 minutos via chat
- Banco de imagens e ícones para uso comercial (50 downloads/mês)

**Estratégia de Valor:**
Mesmo sendo apenas R$ 3, o plano oferece recursos que normalmente custariam R$ 50-100 em outras plataformas. O objetivo é criar uma percepção de "barganha irresistível" que torna o cancelamento psicologicamente difícil.

### 2.2 Plano Growth (R$ 47,00/mês)
**Objetivo:** Monetização principal para pequenos negócios

**Benefícios Inclusos:**
- Tudo do plano Starter
- Acesso a ferramentas SaaS básicas (construtor de landing pages, automação de e-mail)
- Templates premium e personalizáveis
- 2 horas de consultoria mensal via videochamada
- Análise mensal gratuita do site/redes sociais
- Acesso prioritário a novos recursos
- Banco de imagens ilimitado
- Suporte via WhatsApp (horário comercial)
- Webinars mensais exclusivos

**Diferencial Competitivo:**
Combina ferramentas que normalmente são vendidas separadamente (Mailchimp + Canva + consultoria) por um preço menor que a soma das partes.

### 2.3 Plano Professional (R$ 147,00/mês)
**Objetivo:** Atender negócios em crescimento e agências pequenas

**Benefícios Inclusos:**
- Tudo dos planos anteriores
- Acesso completo às ferramentas SaaS avançadas
- 6 horas de consultoria mensal
- Desenvolvimento de 1 landing page personalizada por mês
- Configuração de automações básicas (chatbot, e-mail marketing)
- Relatórios mensais detalhados
- Suporte prioritário 24/7
- Acesso a cursos online exclusivos
- White-label de algumas ferramentas

### 2.4 Plano Enterprise (R$ 497,00/mês)
**Objetivo:** Grandes clientes e parcerias estratégicas

**Benefícios Inclusos:**
- Tudo dos planos anteriores
- Consultoria ilimitada
- Desenvolvimento personalizado (sites, sistemas, automações)
- Gerente de conta dedicado
- Implementação de projetos complexos
- Acesso a APIs e integrações avançadas
- Treinamento da equipe do cliente
- Suporte técnico dedicado

### 2.5 Plano Custom (Sob Consulta)
**Objetivo:** Projetos específicos e grandes corporações

**Características:**
- Soluções completamente personalizadas
- Equipe dedicada
- SLA garantido
- Desenvolvimento de produtos exclusivos

## 3. Arquitetura do Website

### 3.1 Estrutura de Navegação Principal

#### Header
- Logo + Tagline
- Menu Principal: Início | Serviços | Planos | Recursos | Blog | Contato
- Botão CTA: "Começar por R$ 3"
- Área de Login para assinantes

#### Páginas Principais

**3.1.1 Homepage**
- Hero Section com proposta de valor clara
- Demonstração dos 3 pilares: Economia, Qualidade, Suporte
- Seção de planos com destaque para o Starter
- Depoimentos e casos de sucesso
- FAQ sobre o modelo de assinatura
- Footer com links úteis e informações legais

**3.1.2 Página de Serviços**
Organizada por categorias:
- Desenvolvimento Web
- Marketing Digital
- Automação e IA
- Consultoria Estratégica
- Design e Branding

**3.1.3 Página de Planos**
- Comparativo detalhado dos planos
- Calculadora de ROI
- Botões de assinatura com integração Stripe/PagSeguro
- Seção "Perguntas Frequentes"

**3.1.4 Área do Assinante (Dashboard)**
- Painel personalizado por plano
- Biblioteca de recursos
- Agendamento de consultorias
- Histórico de downloads e uso
- Central de suporte

**3.1.5 Blog/Centro de Conhecimento**
- Artigos técnicos
- Tutoriais passo a passo
- Estudos de caso
- Tendências do mercado

### 3.2 Funcionalidades Técnicas

#### Sistema de Autenticação
- Login social (Google, LinkedIn)
- Recuperação de senha
- Perfil do usuário com histórico

#### Sistema de Pagamentos
- Integração com Stripe e PagSeguro
- Cobrança recorrente automática
- Gestão de upgrades/downgrades
- Período de teste gratuito de 7 dias

#### Sistema de Conteúdo
- CMS para gerenciar recursos
- Sistema de tags e categorias
- Controle de acesso por plano
- Versionamento de arquivos

#### Analytics e Métricas
- Tracking de uso por usuário
- Métricas de engajamento
- Funil de conversão
- Churn analysis

## 4. Design System com Shadcn

### 4.1 Paleta de Cores
- **Primária:** Azul profissional (#2563eb) - confiança e tecnologia
- **Secundária:** Verde crescimento (#16a34a) - sucesso e crescimento
- **Accent:** Laranja energia (#ea580c) - CTAs e destaques
- **Neutros:** Escala de cinzas para textos e backgrounds

### 4.2 Tipografia
- **Headings:** Inter Bold - moderna e legível
- **Body:** Inter Regular - excelente para leitura
- **Code:** JetBrains Mono - para elementos técnicos

### 4.3 Componentes Shadcn Utilizados

#### Cards de Planos
```jsx
<Card className="relative overflow-hidden">
  <CardHeader>
    <Badge variant="secondary">Mais Popular</Badge>
    <CardTitle>Plano Growth</CardTitle>
    <CardDescription>Para negócios em crescimento</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">R$ 47<span className="text-sm">/mês</span></div>
    <Button className="w-full mt-4">Começar Agora</Button>
  </CardContent>
</Card>
```

#### Dashboard de Usuário
```jsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Downloads Restantes</CardTitle>
      <Download className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">45</div>
      <p className="text-xs text-muted-foreground">de 50 este mês</p>
    </CardContent>
  </Card>
</div>
```

#### Sistema de Navegação
```jsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          <NavigationMenuLink>Desenvolvimento Web</NavigationMenuLink>
          <NavigationMenuLink>Marketing Digital</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### 4.4 Micro-interações e Animações

#### Hover States
- Cards com elevação suave
- Botões com mudança de cor gradual
- Links com underline animado

#### Loading States
- Skeleton screens para carregamento
- Progress bars para uploads
- Spinners para ações assíncronas

#### Feedback Visual
- Toasts para confirmações
- Badges para status
- Progress indicators para onboarding

## 5. Estratégia de Conversão

### 5.1 Funil de Aquisição

**Topo do Funil (Awareness)**
- Blog com conteúdo SEO-otimizado
- Redes sociais com dicas gratuitas
- Webinars e lives educativas

**Meio do Funil (Consideration)**
- Calculadoras e ferramentas gratuitas
- E-books e guias detalhados
- Casos de sucesso e depoimentos

**Fundo do Funil (Decision)**
- Trial gratuito de 7 dias
- Demonstrações personalizadas
- Garantia de satisfação

### 5.2 Estratégias de Retenção

**Onboarding Progressivo**
- Tutorial interativo no primeiro login
- Checklist de primeiros passos
- E-mails de boas-vindas sequenciais

**Gamificação**
- Sistema de pontos por uso
- Badges por conquistas
- Ranking de usuários mais ativos

**Comunicação Contínua**
- Newsletter semanal com valor
- Notificações de novos recursos
- Pesquisas de satisfação regulares

### 5.3 Estratégias de Upgrade

**Soft Selling**
- Mostrar recursos premium em uso
- Notificações de limites atingidos
- Comparações sutis entre planos

**Timing Inteligente**
- Ofertas baseadas em comportamento
- Upgrades sazonais com desconto
- Momentos de alto engajamento

## 6. Tecnologias e Stack Técnico

### 6.1 Frontend
- **Framework:** Next.js 14 com App Router
- **Styling:** Tailwind CSS + Shadcn/ui
- **State Management:** Zustand ou React Query
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

### 6.2 Backend
- **API:** Next.js API Routes ou Fastify
- **Database:** PostgreSQL com Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe + PagSeguro
- **File Storage:** AWS S3 ou Cloudinary

### 6.3 Infraestrutura
- **Hosting:** Vercel ou AWS
- **CDN:** CloudFlare
- **Monitoring:** Sentry + Analytics
- **Email:** Resend ou SendGrid

## 7. Métricas de Sucesso

### 7.1 KPIs Principais
- **Taxa de Conversão:** Visitante → Trial → Pago
- **Churn Rate:** Meta <5% mensal
- **LTV/CAC Ratio:** Meta >3:1
- **NPS:** Meta >50

### 7.2 Métricas Operacionais
- **Tempo de Resposta:** <2s para páginas principais
- **Uptime:** >99.9%
- **Satisfação do Cliente:** >4.5/5
- **Tempo de Resolução:** <24h para suporte

## 8. Roadmap de Implementação

### 8.1 Fase 1 (Mês 1-2): MVP
- Landing page principal
- Sistema de pagamentos básico
- Plano Starter funcional
- Dashboard simples

### 8.2 Fase 2 (Mês 3-4): Expansão
- Planos Growth e Professional
- Biblioteca de recursos completa
- Sistema de suporte integrado
- Analytics básico

### 8.3 Fase 3 (Mês 5-6): Otimização
- Plano Enterprise
- Automações avançadas
- Mobile app (PWA)
- Integrações com terceiros

### 8.4 Fase 4 (Mês 7+): Escala
- IA para recomendações
- Marketplace de parceiros
- API pública
- Expansão internacional

Este plano estruturado fornece uma base sólida para criar um website de serviços que não apenas atrai clientes com um preço irresistível, mas os mantém engajados e os conduz naturalmente para planos mais lucrativos, criando um negócio sustentável e escalável.


## 9. Especificações Técnicas Detalhadas

### 9.1 Estrutura de Banco de Dados

#### Tabela de Usuários (users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  plan_id UUID REFERENCES subscription_plans(id),
  subscription_status ENUM('active', 'canceled', 'past_due', 'trialing') DEFAULT 'trialing',
  trial_ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela de Planos (subscription_plans)
```sql
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2),
  features JSONB NOT NULL,
  limits JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela de Recursos (resources)
```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('template', 'guide', 'tool', 'image', 'video') NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  required_plan_level INTEGER DEFAULT 1,
  download_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela de Downloads (user_downloads)
```sql
CREATE TABLE user_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);
```

### 9.2 API Endpoints

#### Autenticação
```typescript
// POST /api/auth/register
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// GET /api/auth/me
interface UserResponse {
  id: string;
  name: string;
  email: string;
  plan: SubscriptionPlan;
  usage: UserUsage;
}
```

#### Planos e Assinaturas
```typescript
// GET /api/plans
interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  priceMonthly: number;
  priceYearly?: number;
  features: string[];
  limits: {
    downloads: number;
    consultingHours: number;
    supportLevel: 'basic' | 'priority' | 'dedicated';
  };
}

// POST /api/subscriptions/create
interface CreateSubscriptionRequest {
  planId: string;
  paymentMethod: 'stripe' | 'pagseguro';
  billingCycle: 'monthly' | 'yearly';
}
```

#### Recursos e Downloads
```typescript
// GET /api/resources
interface ResourcesQuery {
  category?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// POST /api/resources/:id/download
interface DownloadResponse {
  downloadUrl: string;
  expiresAt: string;
}
```

### 9.3 Componentes React com Shadcn

#### Card de Plano de Assinatura
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

interface PlanCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  currentPlan?: boolean;
}

export function PlanCard({ plan, isPopular, currentPlan }: PlanCardProps) {
  return (
    <Card className={`relative ${isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {isPopular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <Star className="w-3 h-3 mr-1" />
          Mais Popular
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {plan.name}
          {currentPlan && <Badge variant="secondary">Atual</Badge>}
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-3xl font-bold mb-4">
          R$ {plan.priceMonthly}
          <span className="text-sm font-normal text-muted-foreground">/mês</span>
        </div>
        
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant={currentPlan ? "outline" : "default"}
          disabled={currentPlan}
        >
          {currentPlan ? "Plano Atual" : "Assinar Agora"}
        </Button>
      </CardFooter>
    </Card>
  )
}
```

#### Dashboard de Usuário
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Download, Clock, Users, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  usage: {
    downloadsUsed: number;
    downloadsLimit: number;
    consultingHoursUsed: number;
    consultingHoursLimit: number;
  };
}

export function DashboardStats({ usage }: DashboardStatsProps) {
  const downloadProgress = (usage.downloadsUsed / usage.downloadsLimit) * 100;
  const consultingProgress = (usage.consultingHoursUsed / usage.consultingHoursLimit) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Downloads</CardTitle>
          <Download className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usage.downloadsUsed}</div>
          <p className="text-xs text-muted-foreground">
            de {usage.downloadsLimit} este mês
          </p>
          <Progress value={downloadProgress} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Consultoria</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usage.consultingHoursUsed}h</div>
          <p className="text-xs text-muted-foreground">
            de {usage.consultingHoursLimit}h este mês
          </p>
          <Progress value={consultingProgress} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Economia</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 847</div>
          <p className="text-xs text-muted-foreground">
            economizados este mês
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Suporte</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24/7</div>
          <p className="text-xs text-muted-foreground">
            resposta em 2h
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

#### Biblioteca de Recursos
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter } from "lucide-react"

interface ResourceLibraryProps {
  resources: Resource[];
  onDownload: (resourceId: string) => void;
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
}

export function ResourceLibrary({ resources, onDownload, onSearch, onFilter }: ResourceLibraryProps) {
  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar recursos..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="templates">Templates</SelectItem>
            <SelectItem value="guides">Guias</SelectItem>
            <SelectItem value="tools">Ferramentas</SelectItem>
            <SelectItem value="images">Imagens</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de Recursos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-md mb-2 overflow-hidden">
                {resource.thumbnailUrl && (
                  <img 
                    src={resource.thumbnailUrl} 
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                <Badge variant="secondary">{resource.type}</Badge>
              </div>
              
              <CardDescription className="line-clamp-2">
                {resource.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {resource.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  size="sm" 
                  onClick={() => onDownload(resource.id)}
                  className="shrink-0"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### 9.4 Sistema de Pagamentos

#### Integração com Stripe
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createSubscription(customerId: string, priceId: string) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
}

export async function createCustomer(email: string, name: string) {
  const customer = await stripe.customers.create({
    email,
    name,
  });

  return customer;
}
```

#### Webhook Handler
```typescript
// pages/api/webhooks/stripe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;
  }

  res.json({ received: true });
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Atualizar status da assinatura no banco de dados
  // Enviar email de boas-vindas
  // Configurar acesso aos recursos
}
```

### 9.5 Sistema de Autenticação

#### NextAuth.js Configuration
```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { subscriptionPlan: true }
        });

        if (!user || !await bcrypt.compare(credentials.password, user.passwordHash)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.subscriptionPlan
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = user.plan;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.plan = token.plan;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  }
});
```

### 9.6 Middleware de Autorização

#### Proteção de Rotas por Plano
```typescript
// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PLAN_LEVELS = {
  starter: 1,
  growth: 2,
  professional: 3,
  enterprise: 4
};

export async function withAuth(
  req: NextRequest,
  requiredPlanLevel: number = 1
) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  const userPlanLevel = PLAN_LEVELS[token.plan?.slug as keyof typeof PLAN_LEVELS] || 0;

  if (userPlanLevel < requiredPlanLevel) {
    return NextResponse.redirect(new URL('/upgrade', req.url));
  }

  return NextResponse.next();
}

// Uso em API routes
export function requirePlan(planLevel: number) {
  return async (req: NextRequest, res: NextResponse) => {
    const authResult = await withAuth(req, planLevel);
    if (authResult.status !== 200) {
      return authResult;
    }
    // Continue com a lógica da API
  };
}
```

### 9.7 Sistema de Analytics

#### Tracking de Eventos
```typescript
// lib/analytics.ts
interface AnalyticsEvent {
  event: string;
  userId?: string;
  properties?: Record<string, any>;
}

export class Analytics {
  static track({ event, userId, properties }: AnalyticsEvent) {
    // Enviar para Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        user_id: userId,
        ...properties
      });
    }

    // Enviar para banco de dados interno
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, userId, properties })
    });
  }

  static trackDownload(resourceId: string, userId: string) {
    this.track({
      event: 'resource_downloaded',
      userId,
      properties: { resourceId }
    });
  }

  static trackUpgrade(fromPlan: string, toPlan: string, userId: string) {
    this.track({
      event: 'plan_upgraded',
      userId,
      properties: { fromPlan, toPlan }
    });
  }

  static trackPageView(page: string, userId?: string) {
    this.track({
      event: 'page_view',
      userId,
      properties: { page }
    });
  }
}
```

### 9.8 Sistema de Notificações

#### Email Templates
```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  static async sendWelcomeEmail(userEmail: string, userName: string) {
    await resend.emails.send({
      from: 'noreply@seudominio.com',
      to: userEmail,
      subject: 'Bem-vindo ao Portal de Serviços!',
      html: `
        <h1>Olá, ${userName}!</h1>
        <p>Bem-vindo ao nosso portal de serviços. Você agora tem acesso a:</p>
        <ul>
          <li>Biblioteca de templates</li>
          <li>Guias exclusivos</li>
          <li>Suporte especializado</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">
          Acessar Dashboard
        </a>
      `
    });
  }

  static async sendUpgradeConfirmation(userEmail: string, planName: string) {
    await resend.emails.send({
      from: 'noreply@seudominio.com',
      to: userEmail,
      subject: `Upgrade confirmado para ${planName}`,
      html: `
        <h1>Upgrade realizado com sucesso!</h1>
        <p>Seu plano foi atualizado para <strong>${planName}</strong>.</p>
        <p>Novos recursos disponíveis em seu dashboard.</p>
      `
    });
  }

  static async sendUsageLimitWarning(userEmail: string, limitType: string) {
    await resend.emails.send({
      from: 'noreply@seudominio.com',
      to: userEmail,
      subject: 'Limite de uso atingido',
      html: `
        <h1>Atenção: Limite atingido</h1>
        <p>Você atingiu 80% do seu limite de ${limitType} este mês.</p>
        <p>Considere fazer upgrade para continuar aproveitando todos os recursos.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/upgrade">
          Ver Planos
        </a>
      `
    });
  }
}
```

### 9.9 Testes Automatizados

#### Testes de Componentes
```typescript
// __tests__/components/PlanCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PlanCard } from '@/components/PlanCard';

const mockPlan = {
  id: '1',
  name: 'Starter',
  slug: 'starter',
  priceMonthly: 3,
  description: 'Plano básico',
  features: ['Feature 1', 'Feature 2'],
  limits: { downloads: 50 }
};

describe('PlanCard', () => {
  it('renders plan information correctly', () => {
    render(<PlanCard plan={mockPlan} />);
    
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('R$ 3')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });

  it('shows popular badge when isPopular is true', () => {
    render(<PlanCard plan={mockPlan} isPopular />);
    
    expect(screen.getByText('Mais Popular')).toBeInTheDocument();
  });

  it('disables button when currentPlan is true', () => {
    render(<PlanCard plan={mockPlan} currentPlan />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Plano Atual');
  });
});
```

#### Testes de API
```typescript
// __tests__/api/subscriptions.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/subscriptions/create';

describe('/api/subscriptions/create', () => {
  it('creates subscription successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        planId: 'plan_123',
        paymentMethod: 'stripe',
        billingCycle: 'monthly'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('subscriptionId');
  });

  it('returns 400 for invalid plan', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        planId: 'invalid_plan',
        paymentMethod: 'stripe',
        billingCycle: 'monthly'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
```

### 9.10 Deployment e DevOps

#### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'
      
      - run: yarn install --frozen-lockfile
      - run: yarn test
      - run: yarn build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 9.11 Monitoramento e Observabilidade

#### Sentry Configuration
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

#### Health Check Endpoint
```typescript
// pages/api/health.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check external services
    const stripeHealthy = await checkStripeHealth();
    const emailHealthy = await checkEmailService();
    
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        stripe: stripeHealthy ? 'healthy' : 'unhealthy',
        email: emailHealthy ? 'healthy' : 'unhealthy'
      }
    };
    
    res.status(200).json(status);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}
```

Este plano técnico detalhado fornece uma base sólida para implementar o website de serviços com sistema de assinatura escalonado, utilizando as melhores práticas de desenvolvimento moderno e garantindo escalabilidade, segurança e uma excelente experiência do usuário.

