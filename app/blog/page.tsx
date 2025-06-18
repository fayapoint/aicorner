import Link from "next/link";

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
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">Blog & Centro de Conhecimento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <div key={post.slug} className="bg-white/5 rounded-xl p-8 border border-slate-700/40 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className={`text-xl font-bold text-${post.color} mb-2`}>{post.title}</h2>
              <p className="text-gray-400 mb-2">{post.excerpt}</p>
            </div>
            <Link href={`/blog/${post.slug}`} className={`mt-4 inline-block font-semibold text-${post.color} hover:text-white underline transition`}>
              Saiba mais &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

