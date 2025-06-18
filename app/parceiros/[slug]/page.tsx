import { notFound } from "next/navigation";

const partners = [
  {
    slug: "techcloud",
    name: "TechCloud",
    description: "Parceiro estratégico em soluções de cloud, infraestrutura e DevOps.",
    details: "A TechCloud é líder em soluções de nuvem pública e privada, apoiando nossos projetos com infraestrutura escalável, consultoria em DevOps e suporte 24/7. Juntos, já entregamos dezenas de projetos de alta complexidade para clientes de diversos setores.",
    logo: "/partner1.png",
    color: "purple-300"
  },
  {
    slug: "datagenius",
    name: "DataGenius",
    description: "Especialistas em IA, analytics e big data para projetos inovadores.",
    details: "A DataGenius colabora conosco em projetos de inteligência artificial, machine learning e análise de dados em larga escala. Sua expertise acelera a inovação e entrega de valor para nossos clientes.",
    logo: "/partner2.png",
    color: "pink-300"
  }
];

export default function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = partners.find(p => p.slug === params.slug);
  if (!partner) return notFound();
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col items-center">
      <img src={partner.logo} alt={partner.name} className="w-32 h-32 object-contain mb-6" />
      <h1 className={`text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4`}>{partner.name}</h1>
      <span className={`inline-block bg-${partner.color}/20 text-${partner.color} px-3 py-1 rounded-full text-xs mb-4`}>Parceiro</span>
      <p className="text-lg text-gray-300 mb-8 text-center">{partner.description}</p>
      <div className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg w-full">
        <h2 className="text-2xl font-bold text-purple-300 mb-2">Sobre o Parceiro</h2>
        <p className="text-gray-400 text-base">{partner.details}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return partners.map(p => ({ slug: p.slug }));
}
