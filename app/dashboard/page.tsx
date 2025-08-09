import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  CalendarClock,
  LifeBuoy,
  UserCog,
  Rocket,
  BellRing,
  Gamepad2,
} from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || session?.user?.email || "Visitante";
  const role = (session?.user as any)?.role || "user";

  return (
    <div className="space-y-10">
      <header>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-sky-500/10 p-6 shadow-lg backdrop-blur-md">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative">
            <h1 className="text-2xl font-semibold tracking-tight">Olá, {name}</h1>
            <p className="mt-1 text-sm text-gray-300/90">Plano/Perfil: {role}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Bem-vindo ao seu painel — explore recursos, notícias e automações
            </div>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-medium mb-3">Ações rápidas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard href="/dashboard/uss" title="USS Hub" desc="Seus dados e recursos USS" icon={LayoutDashboard} />
          <DashboardCard href="/dashboard/recursos" title="Recursos" desc="Biblioteca e templates" icon={FolderKanban} />
          <DashboardCard href="/dashboard/noticias" title="Notícias" desc="Feed personalizado de IA" icon={Newspaper} />
          <DashboardCard href="/dashboard/arena" title="Arena 3D" desc="Interface gamificada" icon={Gamepad2} />
          <DashboardCard href="/dashboard/consultorias" title="Consultorias" desc="Agende com especialistas" icon={CalendarClock} />
          <DashboardCard href="/dashboard/suporte" title="Suporte" desc="Ajuda e tickets" icon={LifeBuoy} />
          <DashboardCard href="/dashboard/conta" title="Conta" desc="Perfil e billing" icon={UserCog} />
          <DashboardCard href="/dashboard/onboarding" title="Onboarding" desc="Comece aqui" icon={Rocket} />
          <DashboardCard href="/dashboard/notificacoes" title="Notificações" desc="Alertas e updates" icon={BellRing} />
        </div>
      </section>
    </div>
  );
}

function DashboardCard({ href, title, desc, icon: Icon }: { href: string; title: string; desc: string; icon?: LucideIcon }) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/40 to-slate-800/40 p-4 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-fuchsia-500/10 hover:ring-fuchsia-400/30 backdrop-blur-md"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="rounded-md border border-white/10 bg-white/5 p-2 text-fuchsia-300">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <div className="font-medium tracking-tight text-white/90">{title}</div>
          <div className="text-sm text-gray-400">{desc}</div>
        </div>
      </div>
    </Link>
  );
}
