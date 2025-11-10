export default function Sobre() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <section className="mb-12 text-center">
        <p className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-4">
          Sobre Ricardo Faya
        </p>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Conectando estratégia, tecnologia e crescimento real
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Sou Ricardo Faya, consultor digital e estrategista de crescimento. Há mais de 15 anos ajudo marcas a escalar resultados usando tecnologia, automação, branding e marketing orientado por dados. Minha missão é transformar ideias em operações lucrativas e sustentáveis.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[{
          title: "+500 projetos entregues",
          description: "Produtos digitais, plataformas SaaS, funis de vendas e experiências omnichannel."
        }, {
          title: "15+ anos liderando times",
          description: "Atuação em agências, startups e consultorias com foco em performance e inovação."
        }, {
          title: "Tecnologia & storytelling",
          description: "Integro dados, automação e narrativas de marca para gerar conexão e conversão."
        }].map((item, index) => (
          <div
            key={index}
            className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-6 shadow-lg shadow-purple-900/20"
          >
            <h3 className="text-xl font-semibold text-purple-200 mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Minha jornada</h2>
            <p className="text-gray-300 leading-relaxed">
              Comecei como designer e desenvolvedor front-end, evoluí para liderar squads multidisciplinares e hoje atuo como consultor hands-on. Já liderei lançamentos de produtos em larga escala, construí times de growth e implantei rotinas de automação que destravaram milhões em receita.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-200">Especialidades</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Estratégia digital e posicionamento de marca</li>
              <li>• Product discovery, UX e crescimento orientado a dados</li>
              <li>• Automação de marketing, CRM e jornadas omnichannel</li>
              <li>• Monetização, lançamento de ofertas e playbooks comerciais</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-semibold text-white">Como trabalho</h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <p className="font-semibold text-purple-200">Diagnóstico profundo</p>
              <p className="text-sm leading-relaxed">Entendo o negócio, os números e a cultura para definir prioridades claras.</p>
            </div>
            <div>
              <p className="font-semibold text-purple-200">Estratégias acionáveis</p>
              <p className="text-sm leading-relaxed">Transformo visão em planos de execução com owners, metas e rituais definidos.</p>
            </div>
            <div>
              <p className="font-semibold text-purple-200">Acompanhamento contínuo</p>
              <p className="text-sm leading-relaxed">Caminho junto com o time para garantir implementação, aprendizado e escala.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-purple-500/20 rounded-3xl p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Vamos construir o próximo case juntos?</h2>
        <p className="text-gray-200 max-w-2xl mx-auto mb-8">
          Seja para lançar um novo produto, acelerar vendas, otimizar campanhas ou profissionalizar sua operação digital, conte comigo para liderar a estratégia e entregar resultado.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-8 py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          >
            Falar com Ricardo
          </a>
          <a
            href="https://www.linkedin.com/in/ricardo-faya-04555a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-8 py-4 text-lg border border-purple-400/60 text-purple-200 hover:bg-purple-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          >
            Ver perfil no LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
