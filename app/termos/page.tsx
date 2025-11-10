const LAST_UPDATE = "10 de novembro de 2025";

export default function Termos() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-10 text-gray-300">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-purple-300">Termos de Uso</p>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Condições para trabalhar com Ricardo Faya
        </h1>
        <p className="text-sm text-gray-400">Última atualização: {LAST_UPDATE}</p>
      </header>

      <section className="bg-slate-800/60 border border-slate-700/40 rounded-3xl p-8 space-y-5">
        <h2 className="text-2xl font-semibold text-white">1. Aceitação dos termos</h2>
        <p>
          Ao acessar os conteúdos e solicitar serviços de consultoria, estratégias ou implementações com <strong>Ricardo Faya Consultoria Digital</strong>,
          você concorda em cumprir estes Termos de Uso. Caso não concorde com alguma condição, pedimos que interrompa o uso dos nossos canais.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">2. Escopo dos serviços</h2>
        <p>
          Oferecemos consultorias, mentorias, workshops, projetos de growth, branding, automação e transformação digital. Cada proposta comercial
          detalhará escopo, prazos, investimentos e responsáveis. Alterações serão tratadas via aditivos aprovados entre as partes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">3. Propriedade intelectual</h2>
        <p>
          Materiais produzidos especificamente para o cliente (dashboards, automações, playbooks, campanhas) serão transferidos conforme combinado
          em contrato, após quitação das etapas acordadas. Conteúdos educacionais, frameworks proprietários e métodos de Ricardo Faya permanecem
          protegidos por direitos autorais, sendo vedada a reprodução sem autorização.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">4. Confidencialidade</h2>
        <p>
          Todas as informações recebidas dos clientes, inclusive dados sensíveis e estratégicos, serão tratadas com confidencialidade. Utilizaremos
          essas informações apenas para cumprir o escopo contratado. Podemos compartilhar dados com parceiros de execução sob acordos de confidencialidade.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">5. Responsabilidades do cliente</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Disponibilizar insumos, acessos e aprovações dentro dos prazos combinados;</li>
          <li>Garantir licenças e conformidade de dados compartilhados para execução;</li>
          <li>Manter comunicação clara e pontual com a equipe de Ricardo Faya;</li>
          <li>Honrar pagamentos conforme cronograma definido na proposta.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">6. Limitação de responsabilidade</h2>
        <p>
          Empregaremos melhores práticas para alcançar os resultados previstos, porém não garantimos faturamento específico ou crescimento,
          pois dependemos de fatores externos, execução interna do cliente e cenário de mercado. Em nenhum caso seremos responsáveis por danos indiretos
          ou lucros cessantes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">7. Cancelamento e reembolsos</h2>
        <p>
          Projetos e mentorias podem ser cancelados com aviso prévio de 15 dias corridos. Valores de atividades já executadas não são reembolsáveis.
          Quando possível, iremos reaproveitar horas remanescentes em outras frentes de trabalho.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">8. Foro e legislação</h2>
        <p>
          Estes Termos são regidos pelas leis brasileiras, especialmente a LGPD e o Código Civil. Fica eleito o foro da Comarca do Rio de Janeiro/RJ
          para dirimir eventuais conflitos, com renúncia a qualquer outro, por mais privilegiado que seja.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">9. Contato</h2>
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-3xl p-8 space-y-2 text-sm">
          <p><strong>Responsável:</strong> Ricardo Faya</p>
          <p><strong>E-mail:</strong> <a href="mailto:ricardofaya@gmail.com" className="text-purple-300 hover:text-purple-200">ricardofaya@gmail.com</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/5521971908530" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200">+55 (21) 97190-8530</a></p>
          <p><strong>Atendimento:</strong> Segunda a sexta, das 8h às 18h (horário de Brasília)</p>
        </div>
      </section>

      <footer className="text-xs text-gray-500 text-center">
        Estes termos podem ser atualizados sempre que novos serviços, políticas ou obrigações legais entrarem em vigor. Consulte esta página regularmente.
      </footer>
    </div>
  );
}
