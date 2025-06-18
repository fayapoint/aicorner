export default function Carreiras() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Trabalhe Conosco</h1>
      <p className="text-lg text-gray-300 mb-8">Faça parte do time Portal Tech! Buscamos pessoas apaixonadas por inovação, tecnologia e impacto positivo. Confira nossas oportunidades e venha transformar o futuro conosco.</p>
      <div className="space-y-8">
        <div className="bg-white/5 rounded-xl p-6 border border-slate-700/40 shadow-lg">
          <h2 className="text-xl font-bold text-purple-300 mb-2">Desenvolvedor(a) Full Stack</h2>
          <p className="text-gray-400 mb-2">Atue em projetos inovadores, utilizando as tecnologias mais modernas do mercado.</p>
          <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs mb-4">Remoto</span>
          <a href="/carreiras/fullstack" className="inline-block font-semibold text-purple-300 hover:text-white underline transition">Saiba mais &rarr;</a>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-slate-700/40 shadow-lg">
          <h2 className="text-xl font-bold text-pink-300 mb-2">Designer de Produto</h2>
          <p className="text-gray-400 mb-2">Crie experiências incríveis para usuários de todo o Brasil.</p>
          <span className="inline-block bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs mb-4">Híbrido</span>
          <a href="/carreiras/designer" className="inline-block font-semibold text-pink-300 hover:text-white underline transition">Saiba mais &rarr;</a>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-slate-700/40 shadow-lg">
          <h2 className="text-xl font-bold text-blue-300 mb-2">Especialista em Cloud & DevOps</h2>
          <p className="text-gray-400 mb-2">Implemente e gerencie infraestruturas modernas e escaláveis.</p>
          <span className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs mb-4">Remoto</span>
          <a href="/carreiras/cloud" className="inline-block font-semibold text-blue-300 hover:text-white underline transition">Saiba mais &rarr;</a>
        </div>
      </div>
    </div>
  );
}
