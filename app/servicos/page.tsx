import Link from "next/link";

const services = [
  {
    slug: "webdev",
    title: "Desenvolvimento Web",
    description: "Sites, sistemas e portais modernos, responsivos e de alta performance.",
    color: "purple-300"
  },
  {
    slug: "mobile",
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos para Android e iOS, com UX impecável.",
    color: "pink-300"
  },
  {
    slug: "automacao-ia",
    title: "Automação & IA",
    description: "Inteligência artificial, automação de processos e bots inteligentes.",
    color: "blue-300"
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Infraestrutura escalável, CI/CD, monitoramento e alta disponibilidade.",
    color: "green-300"
  },
  {
    slug: "consultoria",
    title: "Consultoria Digital",
    description: "Diagnóstico, estratégia e transformação digital sob medida.",
    color: "yellow-300"
  },
  {
    slug: "suporte",
    title: "Suporte 24/7",
    description: "Atendimento técnico especializado, SLA garantido e suporte contínuo.",
    color: "red-300"
  },
];

export default function Servicos() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">Nossos Serviços</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map(service => (
          <div key={service.slug} className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className={`text-xl font-bold text-${service.color} mb-2`}>{service.title}</h2>
              <p className="text-gray-400 mb-2">{service.description}</p>
            </div>
            <Link href={`/servicos/${service.slug}`} className={`mt-4 inline-block font-semibold text-${service.color} hover:text-white underline transition`}>
              Saiba mais &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

