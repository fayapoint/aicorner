# Design System com shadcn/ui

## Paleta de Cores
- **Primária:** Azul (#2563eb)
- **Secundária:** Verde (#16a34a)
- **Accent:** Laranja (#ea580c)
- **Neutros:** Escala de cinzas

## Tipografia
- **Headings:** Inter Bold
- **Body:** Inter Regular
- **Code:** JetBrains Mono

## Componentes shadcn/ui
- Header responsivo com menu e CTA
- Cards de planos (com badge, preço, botão de ação)
- Tabela comparativa (Table, Badge, Tooltip)
- Dashboard com cards e gráficos (Chart.js ou Recharts)
- Botões modernos, modais, toasts para feedbacks
- Formulários com validação elegante
- Avatar, Progress, Tabs, Accordion, Tooltip, AlertDialog, etc.

## Exemplos de Componentes (JSX)

### Card de Plano
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

### Dashboard de Usuário
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
