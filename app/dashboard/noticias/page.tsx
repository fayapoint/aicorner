import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import PersonalizedNews from "@/components/dashboard/personalized-news";
import { Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardNoticiasPage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || session?.user?.email || "Visitante";

  return (
    <div className="space-y-8">
      <header>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-600/20 via-violet-500/10 to-sky-500/10 p-6 shadow-lg backdrop-blur-md">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <div className="rounded-md border border-white/10 bg-white/5 p-2 text-fuchsia-300">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Notícias para você</h1>
              <p className="mt-1 text-sm text-gray-300/90">Curadoria dinâmica com base no seu perfil ({name})</p>
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <PersonalizedNews />
      </section>
    </div>
  );
}
