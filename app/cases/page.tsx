"use client";

import Link from "next/link";

export default function Cases() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">Cases de Sucesso</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg flex flex-col justify-between">
  <div>
    <h2 className="text-xl font-bold text-purple-300 mb-2">StartupX: Plataforma SaaS</h2>
    <p className="text-gray-400 mb-2">Desenvolvemos uma plataforma SaaS escalável para a StartupX, resultando em aumento de 300% na base de usuários e redução de custos operacionais.</p>
    <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs mb-4">SaaS</span>
  </div>
  <Link href="/cases/startupx" className="mt-4 inline-block font-semibold text-purple-300 hover:text-white underline transition">Saiba mais &rarr;</Link>
</div>
        <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg flex flex-col justify-between">
  <div>
    <h2 className="text-xl font-bold text-pink-300 mb-2">AgroPro: App Mobile</h2>
    <p className="text-gray-400 mb-2">Criamos um aplicativo mobile para gestão agrícola, facilitando o controle de safras e logística para produtores rurais em todo o Brasil.</p>
    <span className="inline-block bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs mb-4">Mobile</span>
  </div>
  <Link href="/cases/agropro" className="mt-4 inline-block font-semibold text-pink-300 hover:text-white underline transition">Saiba mais &rarr;</Link>
</div>
        <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg flex flex-col justify-between">
  <div>
    <h2 className="text-xl font-bold text-blue-300 mb-2">FinBank: Transformação Digital</h2>
    <p className="text-gray-400 mb-2">Lideramos a transformação digital do FinBank, integrando IA e automação em processos bancários, aumentando a eficiência em 40%.</p>
    <span className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs mb-4">Fintech</span>
  </div>
  <Link href="/cases/finbank" className="mt-4 inline-block font-semibold text-blue-300 hover:text-white underline transition">Saiba mais &rarr;</Link>
</div>
        <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg flex flex-col justify-between">
  <div>
    <h2 className="text-xl font-bold text-green-300 mb-2">EcoLog: Cloud & DevOps</h2>
    <p className="text-gray-400 mb-2">Migramos toda a infraestrutura da EcoLog para a nuvem, com CI/CD e DevOps, garantindo alta disponibilidade e escalabilidade.</p>
    <span className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs mb-4">Cloud</span>
  </div>
  <Link href="/cases/ecolog" className="mt-4 inline-block font-semibold text-green-300 hover:text-white underline transition">Saiba mais &rarr;</Link>
</div>
      </div>
    </div>
  );
}
