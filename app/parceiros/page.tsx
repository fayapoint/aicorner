export default function Parceiros() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Nossos Parceiros</h1>
      <p className="text-lg text-gray-300 mb-8">O Portal Tech acredita na força das parcerias para impulsionar a inovação e o sucesso dos nossos clientes. Conheça algumas das empresas e organizações que caminham conosco nessa jornada.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-slate-700/40 shadow-lg">
          <img src="/partner1.png" alt="TechCloud" className="w-24 h-24 object-contain mb-4" />
          <h2 className="text-xl font-bold text-purple-300 mb-2">TechCloud</h2>
          <p className="text-gray-400 text-center">Parceiro estratégico em soluções de cloud, infraestrutura e DevOps.</p>
          <a href="/parceiros/techcloud" className="mt-4 inline-block font-semibold text-purple-300 hover:text-white underline transition">Saiba mais &rarr;</a>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-slate-700/40 shadow-lg">
          <img src="/partner2.png" alt="DataGenius" className="w-24 h-24 object-contain mb-4" />
          <h2 className="text-xl font-bold text-pink-300 mb-2">DataGenius</h2>
          <p className="text-gray-400 text-center">Especialistas em IA, analytics e big data para projetos inovadores.</p>
          <a href="/parceiros/datagenius" className="mt-4 inline-block font-semibold text-pink-300 hover:text-white underline transition">Saiba mais &rarr;</a>
        </div>
      </div>
    </div>
  );
}
