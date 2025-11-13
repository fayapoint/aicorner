import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import Link from "next/link";

export const metadata = {
  title: "Arena",
};

export const dynamic = "force-dynamic";

export default async function ArenaPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email || "Visitante";

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-8 shadow-lg backdrop-blur">
      <header>
        <p className="text-sm uppercase tracking-wide text-fuchsia-300">Arena</p>
        <h1 className="text-3xl font-semibold text-white">Modo imersivo indisponível</h1>
      </header>
      <p className="text-base text-gray-300">
        Olá, {userName}! A experiência 3D da Arena foi desativada temporariamente para garantir estabilidade enquanto preparamos
        uma versão mais leve e compatível com nossa infraestrutura atual.
      </p>
      <p className="text-sm text-gray-400">
        Assim que o novo modo imersivo estiver pronto, avisaremos por e-mail e dentro do dashboard. Obrigado por acompanhar!
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="rounded-md border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          ← Voltar ao Dashboard
        </Link>
        <Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10">
          Ir para a Home
        </Link>
      </div>
    </section>
  );
}
