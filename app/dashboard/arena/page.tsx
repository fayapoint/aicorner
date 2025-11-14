import Link from "next/link";

export const metadata = {
  title: "Arena",
};

export default function ArenaPage() {
  return (
    <section className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-fuchsia-300">Arena</p>
        <h1 className="text-2xl font-semibold">Modo imersivo indisponível</h1>
      </div>
      <p className="text-sm text-gray-400">
        A experiência 3D da Arena e todos os recursos relacionados foram removidos temporariamente para garantir estabilidade do
        site e desbloquear o deploy. Em breve traremos uma alternativa mais leve e compatível com nossa infraestrutura atual.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard" className="rounded-md border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10">
          ← Voltar ao Dashboard
        </Link>
        <Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10">
          Ir para a Home
        </Link>
      </div>
    </section>
  );
}
