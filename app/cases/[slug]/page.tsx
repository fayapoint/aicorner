import { notFound } from "next/navigation";

const cases = [
  {
    slug: "startupx",
    title: "StartupX: Plataforma SaaS",
    description: "Desenvolvemos uma plataforma SaaS escalável para a StartupX, resultando em aumento de 300% na base de usuários e redução de custos operacionais.",
    details: "A StartupX nos procurou com o desafio de criar uma solução SaaS robusta, escalável e segura. Desenvolvemos toda a arquitetura cloud, frontend e backend, além de um painel de analytics customizado. O resultado foi um crescimento exponencial e reconhecimento no setor de tecnologia.",
    tag: "SaaS",
    color: "purple-300"
  },
  {
    slug: "agropro",
    title: "AgroPro: App Mobile",
    description: "Criamos um aplicativo mobile para gestão agrícola, facilitando o controle de safras e logística para produtores rurais em todo o Brasil.",
    details: "O AgroPro precisava digitalizar o campo. Desenvolvemos um app multiplataforma, com integração a sensores IoT, mapas e funcionalidades offline-first. O app foi adotado por centenas de produtores e premiado em eventos de inovação.",
    tag: "Mobile",
    color: "pink-300"
  },
  {
    slug: "finbank",
    title: "FinBank: Transformação Digital",
    description: "Lideramos a transformação digital do FinBank, integrando IA e automação em processos bancários, aumentando a eficiência em 40%.",
    details: "O projeto envolveu automação de processos internos, integração com APIs bancárias e implementação de chatbots para atendimento ao cliente. A eficiência operacional saltou, e o banco ganhou destaque em rankings de inovação.",
    tag: "Fintech",
    color: "blue-300"
  },
  {
    slug: "ecolog",
    title: "EcoLog: Cloud & DevOps",
    description: "Migramos toda a infraestrutura da EcoLog para a nuvem, com CI/CD e DevOps, garantindo alta disponibilidade e escalabilidade.",
    details: "A EcoLog enfrentava gargalos de infraestrutura. Implementamos pipelines de CI/CD, monitoramento avançado e automação de deploys. O uptime subiu para 99,99% e a empresa reduziu custos com TI.",
    tag: "Cloud",
    color: "green-300"
  }
];

export default function CasePage({ params }: { params: { slug: string } }) {
  const item = cases.find(c => c.slug === params.slug);
  if (!item) return notFound();
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className={`text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4`}>{item.title}</h1>
      <span className={`inline-block bg-${item.color}/20 text-${item.color} px-3 py-1 rounded-full text-xs mb-4`}>{item.tag}</span>
      <p className="text-lg text-gray-300 mb-8">{item.description}</p>
      <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-300 mb-2">Detalhes do Projeto</h2>
        <p className="text-gray-400 text-base">{item.details}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }));
}
