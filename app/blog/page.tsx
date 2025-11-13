import { redirect } from "next/navigation";

const posts = [
  {
    slug: "transformacao-digital",
    title: "Transformação Digital: O Guia Completo",
    excerpt: "Descubra como empresas estão revolucionando seus negócios com tecnologia e inovação.",
    color: "purple-300"
  },
  {
    slug: "ux-ui-tendencias",
    title: "Tendências de UX/UI para 2025",
    excerpt: "Conheça as principais tendências em design de experiência e interfaces para o futuro.",
    color: "pink-300"
  },
  {
    slug: "cloud-estrategica",
    title: "Cloud Computing Estratégica",
    excerpt: "Como a nuvem está mudando o cenário corporativo e acelerando o crescimento.",
    color: "blue-300"
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligência Artificial na Prática",
    excerpt: "Casos reais de aplicação de IA em negócios brasileiros.",
    color: "green-300"
  }
];

export default function Blog() {
  redirect('/news');
}

