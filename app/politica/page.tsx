const LAST_UPDATE = "10 de novembro de 2025";

export default function Politica() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-10 text-gray-300">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-purple-300">Política de Privacidade</p>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Como protegemos seus dados com Ricardo Faya
        </h1>
        <p className="text-sm text-gray-400">Última atualização: {LAST_UPDATE}</p>
      </header>

      <section className="bg-slate-800/60 border border-slate-700/40 rounded-3xl p-8 space-y-5">
        <h2 className="text-2xl font-semibold text-white">1. Quem somos</h2>
        <p>
          Esta política descreve como <strong>Ricardo Faya Consultoria Digital</strong> ("nós", "nosso") coleta,
          utiliza e protege os dados pessoais de clientes, leads e visitantes do site. Nosso objetivo é garantir
          transparência total e segurança em cada interação.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">2. Dados que coletamos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-200 mb-3">Informações fornecidas diretamente</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Nome completo e dados de contato (e-mail, telefone, WhatsApp)</li>
              <li>Informações sobre empresa, cargo e objetivos do projeto</li>
              <li>Mensagens enviadas pelos formulários e canais sociais</li>
            </ul>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-200 mb-3">Dados coletados automaticamente</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Logs de acesso, endereço IP e dados de dispositivo</li>
              <li>Informações de navegação para melhorias de experiência</li>
              <li>Cookies essenciais, analíticos e de remarketing (quando autorizados)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">3. Como usamos seus dados</h2>
        <p>
          Utilizamos seus dados para responder solicitações, desenvolver propostas personalizadas, prestar serviços,
          otimizar campanhas e enviar comunicações relevantes sobre soluções de crescimento digital. Só enviamos
          e-mails e mensagens com consentimento prévio e você pode cancelar a qualquer momento.
        </p>
        <p>
          Quando necessário, dados poderão ser compartilhados com parceiros estratégicos (por exemplo, plataformas de
          automação ou análise) sempre sob contrato e conforme a LGPD, garantindo confidencialidade e finalidade legítima.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">4. Seus direitos</h2>
        <p>Você pode, a qualquer momento:</p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Solicitar confirmação da existência de tratamento de dados</li>
          <li>Corrigir ou atualizar informações pessoais</li>
          <li>Requerer a portabilidade ou exclusão dos dados</li>
          <li>Revogar consentimentos e limitar comunicações comerciais</li>
        </ul>
        <p>
          Para exercer qualquer direito, entre em contato através dos canais abaixo. Responderemos em até 15 dias
          úteis, conforme previsto na LGPD.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">5. Segurança das informações</h2>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo armazenamento seguro,
          controles de acesso e criptografia quando aplicável. Em caso de incidente de segurança, notificaremos os
          usuários afetados e a ANPD seguindo os requisitos legais.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">6. Contato do encarregado</h2>
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-3xl p-8 space-y-2 text-sm">
          <p><strong>Encarregado (DPO):</strong> Ricardo Faya</p>
          <p><strong>E-mail:</strong> <a href="mailto:ricardofaya@gmail.com" className="text-purple-300 hover:text-purple-200">ricardofaya@gmail.com</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/5521971908530" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200">+55 (21) 97190-8530</a></p>
          <p><strong>Endereço de referência:</strong> Atendimento remoto a partir do Rio de Janeiro, Brasil</p>
        </div>
      </section>

      <footer className="text-xs text-gray-500 text-center">
        Esta política será revisada periodicamente para refletir novos serviços, fornecedores ou exigências legais.
        Recomendamos que você retorne a esta página para manter-se informado.
      </footer>
    </div>
  );
}
