import { redirect } from "next/navigation";

const posts = [
  {
    slug: "transformacao-digital",
    title: "Transformação Digital: O Guia Completo",
    excerpt: "Descubra como empresas estão revolucionando seus negócios com tecnologia e inovação.",
    content: `A transformação digital é um processo que utiliza tecnologia para melhorar o desempenho, ampliar o alcance e garantir melhores resultados para empresas de todos os setores. Neste guia, exploramos os principais pilares, cases de sucesso e estratégias para implementar a transformação digital em organizações brasileiras.`,
    color: "purple-300"
  },
  {
    slug: "ux-ui-tendencias",
    title: "Tendências de UX/UI para 2025",
    excerpt: "Conheça as principais tendências em design de experiência e interfaces para o futuro.",
    content: `O design de experiência do usuário (UX) e de interfaces (UI) está em constante evolução. Em 2025, veremos a ascensão de interfaces conversacionais, microinterações inteligentes, acessibilidade avançada e integração de IA para personalização de experiências digitais.`,
    color: "pink-300"
  },
  {
    slug: "cloud-estrategica",
    title: "Cloud Computing Estratégica",
    excerpt: "Como a nuvem está mudando o cenário corporativo e acelerando o crescimento.",
    content: `A adoção de cloud computing permite escalabilidade, redução de custos e aumento de segurança para empresas. Neste artigo, detalhamos estratégias para migração, gestão de ambientes multicloud e melhores práticas de DevOps em nuvem.`,
    color: "blue-300"
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligência Artificial na Prática",
    excerpt: "Casos reais de aplicação de IA em negócios brasileiros.",
    content: `A IA está revolucionando setores como saúde, finanças, varejo e logística. Apresentamos exemplos reais de uso de machine learning, automação de processos e chatbots, mostrando o impacto direto nos resultados das empresas.`,
    color: "green-300"
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  redirect(`/news/${params.slug}`);
}

// No static params needed; this route now redirects at runtime.
