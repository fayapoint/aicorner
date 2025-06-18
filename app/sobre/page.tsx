export default function Sobre() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Sobre Nós</h1>
      <p className="text-lg text-gray-300 mb-8">O Portal Tech é apaixonado por transformar negócios através da tecnologia. Nossa missão é acelerar a transformação digital de empresas de todos os portes, entregando soluções inovadoras, personalizadas e de alto impacto.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-2">Nossa História</h2>
          <p className="text-gray-400">Fundada em 2017, a Portal Tech nasceu do desejo de democratizar o acesso à tecnologia de ponta. Desde então, já ajudamos centenas de empresas a inovar, crescer e se destacar no mercado digital.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-2">Valores</h2>
          <ul className="list-disc pl-6 text-gray-400">
            <li>Inovação constante</li>
            <li>Foco no cliente</li>
            <li>Ética e transparência</li>
            <li>Excelência técnica</li>
            <li>Colaboração e diversidade</li>
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-purple-300 mb-4">Nosso Time</h2>
      <p className="text-gray-400 mb-6">Somos uma equipe multidisciplinar de especialistas em desenvolvimento, design, marketing digital, cloud, automação e inteligência artificial. Trabalhamos juntos para entregar resultados extraordinários para nossos clientes.</p>
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="bg-white/5 rounded-xl p-6 w-64 flex flex-col items-center border border-slate-700/40 shadow-lg">
          <img src="/avatar1.png" alt="CEO" className="w-20 h-20 rounded-full mb-3 border-4 border-purple-500/30" />
          <h3 className="text-lg font-bold text-purple-200">Ana Silva</h3>
          <p className="text-gray-400 text-sm">CEO & Fundadora</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 w-64 flex flex-col items-center border border-slate-700/40 shadow-lg">
          <img src="/avatar2.png" alt="CTO" className="w-20 h-20 rounded-full mb-3 border-4 border-pink-500/30" />
          <h3 className="text-lg font-bold text-pink-200">Carlos Souza</h3>
          <p className="text-gray-400 text-sm">CTO & Cofundador</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 w-64 flex flex-col items-center border border-slate-700/40 shadow-lg">
          <img src="/avatar3.png" alt="Head de Projetos" className="w-20 h-20 rounded-full mb-3 border-4 border-blue-500/30" />
          <h3 className="text-lg font-bold text-blue-200">Marina Lima</h3>
          <p className="text-gray-400 text-sm">Head de Projetos</p>
        </div>
      </div>
    </div>
  );
}
