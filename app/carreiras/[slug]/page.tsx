import { notFound } from "next/navigation";

const vagas = [
  {
    slug: "fullstack",
    title: "Desenvolvedor(a) Full Stack",
    description: "Atue em projetos inovadores, utilizando as tecnologias mais modernas do mercado.",
    details: "Você irá atuar no desenvolvimento de aplicações web e mobile, participando de todo o ciclo de vida do produto, desde a concepção até a entrega. Buscamos profissionais com experiência em React, Node.js, bancos de dados relacionais e cloud.",
    tag: "Remoto",
    color: "purple-300"
  },
  {
    slug: "designer",
    title: "Designer de Produto",
    description: "Crie experiências incríveis para usuários de todo o Brasil.",
    details: "Responsável pelo design de interfaces e experiências, prototipação de soluções e testes com usuários. É desejável experiência com Figma, Design System e metodologias ágeis.",
    tag: "Híbrido",
    color: "pink-300"
  },
  {
    slug: "cloud",
    title: "Especialista em Cloud & DevOps",
    description: "Implemente e gerencie infraestruturas modernas e escaláveis.",
    details: "Desenvolvimento e automação de pipelines de CI/CD, monitoramento de infraestrutura, gestão de ambientes cloud (AWS, Azure ou GCP) e cultura DevOps.",
    tag: "Remoto",
    color: "blue-300"
  }
];

export default function VagaPage({ params }: { params: { slug: string } }) {
  const vaga = vagas.find(v => v.slug === params.slug);
  if (!vaga) return notFound();
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className={`text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4`}>{vaga.title}</h1>
      <span className={`inline-block bg-${vaga.color}/20 text-${vaga.color} px-3 py-1 rounded-full text-xs mb-4`}>{vaga.tag}</span>
      <p className="text-lg text-gray-300 mb-8">{vaga.description}</p>
      <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-300 mb-2">Detalhes da Vaga</h2>
        <p className="text-gray-400 text-base">{vaga.details}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return vagas.map(v => ({ slug: v.slug }));
}
