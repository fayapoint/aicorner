import { notFound } from "next/navigation";

const services = [
  {
    slug: "webdev",
    title: "Desenvolvimento Web",
    description: "Sites, sistemas e portais modernos, responsivos e de alta performance.",
    details: "Construímos plataformas web sob medida, com foco em performance, segurança e experiência do usuário. Utilizamos as melhores práticas de frontend e backend, integração com APIs e cloud, além de design responsivo para todos os dispositivos.",
    color: "purple-300"
  },
  {
    slug: "mobile",
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos para Android e iOS, com UX impecável.",
    details: "Desenvolvemos aplicativos mobile utilizando tecnologias modernas como React Native, Flutter e Swift. Foco em usabilidade, integração com sistemas legados e publicação nas principais lojas.",
    color: "pink-300"
  },
  {
    slug: "automacao-ia",
    title: "Automação & IA",
    description: "Inteligência artificial, automação de processos e bots inteligentes.",
    details: "Implementação de soluções de IA, machine learning, automação de processos repetitivos e criação de chatbots para atendimento e suporte.",
    color: "blue-300"
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Infraestrutura escalável, CI/CD, monitoramento e alta disponibilidade.",
    details: "Migração para cloud, automação de deploys, pipelines CI/CD, monitoramento e gestão de ambientes AWS, Azure e Google Cloud.",
    color: "green-300"
  },
  {
    slug: "consultoria",
    title: "Consultoria Digital",
    description: "Diagnóstico, estratégia e transformação digital sob medida.",
    details: "Ajudamos empresas a definir estratégias digitais, mapear processos, escolher tecnologias e implementar soluções inovadoras.",
    color: "yellow-300"
  },
  {
    slug: "suporte",
    title: "Suporte 24/7",
    description: "Atendimento técnico especializado, SLA garantido e suporte contínuo.",
    details: "Equipe pronta para atender demandas técnicas, monitoramento proativo, resolução de incidentes e acompanhamento pós-projeto.",
    color: "red-300"
  },
];

export default function ServicoPage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);
  if (!service) return notFound();
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className={`text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4`}>{service.title}</h1>
      <span className={`inline-block bg-${service.color}/20 text-${service.color} px-3 py-1 rounded-full text-xs mb-4`}>Serviço</span>
      <p className="text-lg text-gray-300 mb-8">{service.description}</p>
      <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-300 mb-2">Detalhes do Serviço</h2>
        <p className="text-gray-400 text-base">{service.details}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}
